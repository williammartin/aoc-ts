import { parseInput } from "../util";
import { findAncestorColours, parseRule } from "./util";

const input = parseInput({ split: { mapper: false } });

export default findAncestorColours(
  "shiny gold",
  input.map((line) => parseRule(line))
).length;
