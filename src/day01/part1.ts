import { parseInput } from "../util";
import { findTwoNumbersThatSumToTarget, multiplyEntries } from "./util";

const input = parseInput();

const nums = findTwoNumbersThatSumToTarget(input, 2020);

export default multiplyEntries(nums);
