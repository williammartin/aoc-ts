import { parseInput } from "../util";
import { collectDistinctAnswers, parseGroup } from "./util";

const input = parseInput({ split: { mapper: false, delimiter: "\n\n" } });

export default input
  .map((i) => parseGroup(i))
  .map((group) => collectDistinctAnswers(group))
  .reduce((sum, distinctAnswers) => sum + distinctAnswers.length, 0);
