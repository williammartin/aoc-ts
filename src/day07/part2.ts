import { parseInput } from "../util";
import { countNestedBags, parseRule } from "./util";

const input = parseInput({ split: { mapper: false } });

export default countNestedBags(
  "shiny gold",
  input.map((line) => parseRule(line))
);
