import { parseInput } from "../util";
import { collectIntersectedAnswers, parseGroup } from "./util";

const input = parseInput({ split: { mapper: false, delimiter: "\n\n" } });

export default input
  .map((i) => parseGroup(i))
  .map((group) => collectIntersectedAnswers(group))
  .reduce((sum, intersectedAnswers) => sum + intersectedAnswers.length, 0);
