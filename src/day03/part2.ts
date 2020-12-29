import { count } from "console";
import { parseInput } from "../util";
import { countTreesOnPaths, parseMap } from "./util";

const input = parseInput({ split: { mapper: false } });

const paths: [number, number][] = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2],
];

export default countTreesOnPaths(paths, parseMap(input));
