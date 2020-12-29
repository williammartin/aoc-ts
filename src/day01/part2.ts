import { parseInput } from "../util";
import { findThreeNumbersThatSumToTarget, multiplyEntries } from "./util";

const input = parseInput();

const nums = findThreeNumbersThatSumToTarget(input, 2020);

export default multiplyEntries(nums);
