import { parseInput } from "../util";
import { parseV1PasswordPolicy, V1PasswordPolicy, v1Validate } from "./util";

type validateFn = (policy: V1PasswordPolicy) => boolean;

const countValid = (validateFn: validateFn) => (lines: string[]): number =>
  lines
    .map((line) => parseV1PasswordPolicy(line))
    .filter((policy) => validateFn(policy)).length;

const countAllValid = countValid(v1Validate);

const input = parseInput({ split: { mapper: false } });

export default countAllValid(input);
