import { parseInput } from "../util";
import { validatePassport } from "./util";

const input = parseInput({ split: { mapper: false, delimiter: "\n\n" } });

export default input.reduce(
  (validPassports, passport) =>
    validatePassport(passport) ? validPassports + 1 : validPassports,
  0
);
