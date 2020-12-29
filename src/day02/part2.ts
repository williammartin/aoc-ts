import { parseInput } from "../util";
import { parseV2PasswordPolicy, V2PasswordPolicy, v2Validate } from "./util";

type validateFn = (policy: V2PasswordPolicy) => boolean;

const countValid = (validateFn: validateFn) => (lines: string[]): number =>
  lines
    .map((line) => parseV2PasswordPolicy(line))
    .filter((policy) => validateFn(policy)).length;

const countAllValid = countValid(v2Validate);

const input = parseInput({ split: { mapper: false } });

export default countAllValid(input);
