import { parseInput } from "../util";
import {
  parsePassport,
  Passport,
  validateBirthYear,
  validateExpirationYear,
  validateEyeColour,
  validateHairColour,
  validateHeight,
  validateIssueYear,
  validatePassport,
  validatePid,
} from "./util";

// Looks like we need to remove some extra lines
const input = parseInput({
  split: { mapper: false, delimiter: "\n\n" },
}).map((line) => line.replace(/[\r\n]/g, " "));

type validateFn = (val: string) => boolean;
type validator = [keyof Passport, validateFn];

const validators: validator[] = [
  ["byr", (birthYear: string) => validateBirthYear(Number(birthYear))],
  ["iyr", (issueYear: string) => validateIssueYear(Number(issueYear))],
  [
    "eyr",
    (expirationYear: string) => validateExpirationYear(Number(expirationYear)),
  ],
  ["hgt", (height: string) => validateHeight(height)],
  ["hcl", (colour: string) => validateHairColour(colour)],
  ["ecl", (colour: string) => validateEyeColour(colour)],
  ["pid", (pid: string) => validatePid(pid)],
];

type Valid = {
  type: "valid";
};

type Invalid = {
  type: "invalid";
  reason: string;
};
type Validity = Valid | Invalid;

const valid: Valid = { type: "valid" };

type ValidatedPassport = {
  passport: Passport;
  validity: Validity;
};

const validatedPassports = input
  .filter((encodedPassport) => validatePassport(encodedPassport))
  .map((encodedPassport): Passport => parsePassport(encodedPassport))
  .map(
    (passport): ValidatedPassport => ({
      passport,
      validity: validators.reduce((validity: Validity, validator): Validity => {
        if (validity.type == "invalid") {
          return validity;
        }

        const isValid = validator[1](passport[validator[0]]);
        if (!isValid) {
          return {
            type: "invalid",
            reason: `Failed check on ${validator[0]} with ${
              passport[validator[0]]
            }`,
          };
        }

        return valid;
      }, valid),
    })
  );

export default validatedPassports.filter(
  (validatedPassport) => validatedPassport.validity.type === "valid"
).length;
