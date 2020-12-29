import { parseInput } from "../util";
import { countTrees, parseMap } from "./util";

const input = parseInput({ split: { mapper: false } });

export default countTrees(3, 1, parseMap(input));
