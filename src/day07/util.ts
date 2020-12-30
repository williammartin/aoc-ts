type Bag = {
  colour: string;
  canContain: Map<string, number>;
};

export const parseRule = (encodedRule: string): Bag => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
  const { colour, others } = encodedRule.match(
    /^(?<colour>\w+ \w+\b) bags contain (?<others>.*$)/
  )?.groups!;

  return {
    colour,
    canContain: Array.from(
      others.matchAll(/(?<quantity>\d) (?<colour>\w+ \w+\b) bag/g)
    ).reduce((canContain, match) => {
      const { quantity, colour } = match.groups!;
      canContain.set(colour, Number(quantity));
      return canContain;
    }, new Map<string, number>()),
  };
};

export const findAncestorColours = (needle: string, bags: Bag[]): string[] => {
  if (bags.length === 0) {
    return [];
  }

  return findAllReachableNodes(needle, createGraph(bags));
};

export const countNestedBags = (needle: string, bags: Bag[]): number =>
  costOfSubtree(
    needle,
    createReachableSubGraph(needle, transposeGraph(createGraph(bags)))
  ) - 1;

// TODO: Consider extracting graph utilities to shared location.
type Graph = Map<string, Edge[]>;
type Edge = { id: string; weight: number };

export const createGraph = (bags: Bag[]): Graph => {
  // create all nodes in the graph with no edges
  const graph = new Map<string, Edge[]>([
    ...bags.map((bag): [string, Edge[]] => [bag.colour, []]),
  ]);

  // then let's create the edges
  // for every bag
  bags.forEach((bag) => {
    // for every containable bag
    bag.canContain.forEach((quantity, colour) => {
      // find the node for the colour and add an edge
      graph.set(colour, [
        ...graph.get(colour)!,
        { id: bag.colour, weight: quantity },
      ]);
    });
  });

  return graph;
};

export const findAllReachableNodes = (start: string, graph: Graph): string[] =>
  Array.from(createReachableSubGraph(start, graph).keys()).filter(
    (id) => id !== start
  );

export const createReachableSubGraph = (
  start: string,
  superGraph: Graph
): Graph =>
  superGraph.get(start)!.reduce(
    (subGraph, edge): Graph =>
      mergeGraphs(subGraph, createReachableSubGraph(edge.id, superGraph)),
    new Map<string, Edge[]>([[start, superGraph.get(start)!]])
  );

const costOfSubtree = (start: string, superGraph: Graph): number =>
  superGraph.get(start)!.reduce((subgraphCost, edge): number => {
    const cost = costOfSubtree(edge.id, superGraph);
    return subgraphCost + edge.weight * cost;
  }, 1);

export const transposeGraph = (graph: Graph): Graph => {
  const newGraph = new Map<string, Edge[]>(
    [...graph.keys()].map((id) => [id, []])
  );
  graph.forEach((edges, id) => {
    edges.forEach((edge) => {
      newGraph.set(edge.id, [
        ...newGraph.get(edge.id)!,
        { id, weight: edge.weight },
      ]);
    });
  });

  return newGraph;
};

const mergeGraphs = (graphA: Graph, graphB: Graph): Graph =>
  new Map([...graphA, ...graphB]);
