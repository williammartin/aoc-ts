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

    // e.g. where right = 3 down = 1 for map:
    // [".", "."]
    // [".", "#"]
    // ["#", "."]
    // index: 0 -> indexOnSection = 0 * 3 % 2 = 0
    // index: 1 -> indexOnSection = 1 * 3 % 2 = 1
    // index: 2 -> indexOnSection = 2 * 3 % 2 = 0
    const indexOnSection = (right * index) % crossSection.length;
    return crossSection[indexOnSection] == "#" ? treesHit + 1 : treesHit;
  }, 0);
