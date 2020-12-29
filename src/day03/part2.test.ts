import { expect } from "chai";
import { countTreesOnPaths, parseMap } from "./util";

it("multiplies together tree hits over multiple paths", () => {
  const lines = [
    "..##.......",
    "#...#...#..",
    ".#....#..#.",
    "..#.#...#.#",
    ".#...##..#.",
    "..#.##.....",
    ".#.#.#....#",
    ".#........#",
    "#.##...#...",
    "#...##....#",
    ".#..#...#.#",
  ];

  const map = parseMap(lines);

  const paths: [number, number][] = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ];

  expect(countTreesOnPaths(paths, map)).to.eql(336);
});
