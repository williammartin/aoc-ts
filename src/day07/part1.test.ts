import { expect } from "chai";
import {
  createGraph,
  createReachableSubGraph,
  findAllReachableNodes,
  findAncestorColours,
  parseRule,
} from "./util";

describe("part1", () => {
  describe("parsing a rule", () => {
    it("can parse bags that can't contain any other bags", () => {
      expect(parseRule("faded blue bags contain no other bags")).to.eql({
        colour: "faded blue",
        canContain: new Map<string, number>(),
      });
    });

    it("can parse bags that can contain a single quantity of one other bag", () => {
      expect(parseRule("faded blue bags contain 1 bright white bag")).to.eql({
        colour: "faded blue",
        canContain: new Map<string, number>([["bright white", 1]]),
      });
    });

    it("can parse bags that can contain multiple quantities of one other bag", () => {
      expect(parseRule("faded blue bags contain 2 bright white bag")).to.eql({
        colour: "faded blue",
        canContain: new Map<string, number>([["bright white", 2]]),
      });
    });

    it("can parse bags that can multiple quantites of multiple other bags", () => {
      expect(
        parseRule(
          "dark orange bags contain 3 bright white bags, 4 muted yellow bags."
        )
      ).to.eql({
        colour: "dark orange",
        canContain: new Map<string, number>([
          ["bright white", 3],
          ["muted yellow", 4],
        ]),
      });
    });
  });

  describe("the graph", () => {
    describe("construction", () => {
      it("creates an edge from inner to outer bag", () => {
        const bags = [
          "faded blue bags contain no other bags",
          "dark orange bags contain 1 faded blue bag",
        ].map((rule) => parseRule(rule));

        const graph = createGraph(bags);
        expect(graph.get("faded blue")).to.eql([
          { id: "dark orange", weight: 1 },
        ]);
        expect(graph.get("dark orange")).to.eql([]);
      });

      it("creates an edge from inner to outer bag to outer-outer bag", () => {
        const bags = [
          "faded blue bags contain no other bags",
          "dark orange bags contain 1 faded blue bag",
          "bright red bags contain 2 dark orange bags",
        ].map((rule) => parseRule(rule));

        const graph = createGraph(bags);
        expect(graph.get("faded blue")).to.eql([
          { id: "dark orange", weight: 1 },
        ]);
        expect(graph.get("dark orange")).to.eql([
          { id: "bright red", weight: 2 },
        ]);
        expect(graph.get("bright red")).to.eql([]);
      });

      it("creates multiple edges from a node", () => {
        const bags = [
          "faded blue bags contain no other bags",
          "dark orange bags contain 1 faded blue bag",
          "bright red bags contain 2 faded blue bags",
        ].map((rule) => parseRule(rule));

        const graph = createGraph(bags);
        expect(graph.get("faded blue")).to.eql([
          { id: "dark orange", weight: 1 },
          { id: "bright red", weight: 2 },
        ]);
        expect(graph.get("dark orange")).to.eql([]);
        expect(graph.get("bright red")).to.eql([]);
      });
    });

    describe("creating reachable subgraphs", () => {
      it("reproduces a single node graph", () => {
        const bags = ["faded blue bags contain no other bags"].map((rule) =>
          parseRule(rule)
        );

        const subgraph = createReachableSubGraph(
          "faded blue",
          createGraph(bags)
        );
        expect(subgraph.get("faded blue")).to.eql([]);
      });

      it("reproduces a parent, child graph", () => {
        const bags = [
          "faded blue bags contain no other bags",
          "dark orange bags contain 1 faded blue bag",
        ].map((rule) => parseRule(rule));

        const subgraph = createReachableSubGraph(
          "faded blue",
          createGraph(bags)
        );

        expect(subgraph.get("faded blue")).to.eql([
          { id: "dark orange", weight: 1 },
        ]);
        expect(subgraph.get("dark orange")).to.eql([]);
      });

      it("reproduces a grandparent, parent, child graph", () => {
        const bags = [
          "faded blue bags contain no other bags",
          "dark orange bags contain 1 faded blue bag",
          "bright red bags contain 2 dark orange bags",
        ].map((rule) => parseRule(rule));

        const subgraph = createReachableSubGraph(
          "faded blue",
          createGraph(bags)
        );

        expect(subgraph.get("faded blue")).to.eql([
          { id: "dark orange", weight: 1 },
        ]);
        expect(subgraph.get("dark orange")).to.eql([
          { id: "bright red", weight: 2 },
        ]);
        expect(subgraph.get("bright red")).to.eql([]);
      });

      it("reproduces a branching node graph", () => {
        const bags = [
          "faded blue bags contain no other bags",
          "dark orange bags contain 1 faded blue bag",
          "bright red bags contain 2 faded blue bags",
        ].map((rule) => parseRule(rule));

        const subgraph = createReachableSubGraph(
          "faded blue",
          createGraph(bags)
        );

        expect(subgraph.get("faded blue")).to.eql([
          { id: "dark orange", weight: 1 },
          { id: "bright red", weight: 2 },
        ]);
        expect(subgraph.get("dark orange")).to.eql([]);
        expect(subgraph.get("bright red")).to.eql([]);
      });

      it("prunes unreachable nodes", () => {
        const bags = [
          "faded blue bags contain no other bags",
          "dark orange bags contain 1 faded blue bag",
          "polka dot bags contain no other bags",
          "bright red bags contain 2 polka dot bags",
        ].map((rule) => parseRule(rule));

        const subgraph = createReachableSubGraph(
          "faded blue",
          createGraph(bags)
        );

        expect(subgraph.get("faded blue")).to.eql([
          { id: "dark orange", weight: 1 },
        ]);
        expect(subgraph.get("dark orange")).to.eql([]);
        expect(subgraph.has("polka dot")).to.be.false;
        expect(subgraph.has("bright red")).to.be.false;
      });
    });

    describe("finding reachable nodes", () => {
      it("can do multiple hops", () => {
        const bags = [
          "faded blue bags contain no other bags",
          "dark orange bags contain 1 faded blue bag",
          "bright red bags contain 2 faded blue bags",
        ].map((rule) => parseRule(rule));

        const graph = createGraph(bags);
        expect(findAllReachableNodes("faded blue", graph)).to.eql([
          "dark orange",
          "bright red",
        ]);
      });
    });
  });

  describe("finding bags that contain others", () => {
    it("can find a single bag containing another", () => {
      const bags = [
        "faded blue bags contain no other bags",
        "dark orange bags contain 1 faded blue bag",
      ].map((rule) => parseRule(rule));

      expect(findAncestorColours("faded blue", bags)).to.eql(["dark orange"]);
    });

    it("can find a grandparent bag (a bag that contains another bag that contains the desired bag)", () => {
      const bags = [
        "faded blue bags contain no other bags",
        "dark orange bags contain 1 faded blue bag",
        "bright red bags contain 1 dark orange bag",
      ].map((rule) => parseRule(rule));

      expect(findAncestorColours("faded blue", bags)).to.eql([
        "dark orange",
        "bright red",
      ]);
    });
  });
});
