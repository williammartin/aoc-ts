export const parseMap = (lines: string[]) =>
  lines.map((line) => line.split(""));

export const countTrees = (
  right: number,
  down: number,
  map: string[][]
): number =>
  map.reduce((treesHit, crossSection, index) => {
    if (index % down !== 0) {
      return treesHit;
    }

    // e.g. where right = 1 down = 2 for map:
    // [".", "."]
    // [".", "."]
    // [".", "#"]
    // index: 0 -> indexOnSection = 1 * (0 / 2) % 2 = 0
    // index: 1 -> skip
    // index: 2 -> indexOnSection = 1 * (2 / 2) % 2 = 1
    const indexOnSection = (right * (index / down)) % crossSection.length;
    return crossSection[indexOnSection] == "#" ? treesHit + 1 : treesHit;
  }, 0);

const multiply = (l: number, r: number) => l * r;

type path = [number, number];
export const countTreesOnPaths = (paths: path[], map: string[][]) =>
  paths.map((path) => countTrees(path[0], path[1], map)).reduce(multiply);
