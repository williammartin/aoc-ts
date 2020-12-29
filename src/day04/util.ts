const requiredFields = ["ecl", "pid", "eyr", "hcl", "byr", "iyr", "hgt"];

export const validatePassport = (encodedPassport: string): boolean =>
  requiredFields.reduce((isValid: boolean, field) => {
    if (!isValid) {
      return false;
    }

    return encodedPassport.includes(field);
  }, true);

export type Passport = {
  byr: string;
  iyr: string;
  eyr: string;
  hgt: string;
  hcl: string;
  ecl: string;
  pid: string;
  cid: string;
};

export const parsePassport = (encodedPassport: string): Passport => {
  if (!validatePassport(encodedPassport)) {
    throw new Error("invalid passport");
  }

  const fields = encodedPassport.split(" ");
  return fields.reduce((passport, field): Passport => {
    const parts = field.split(":");
    return { [parts[0]]: parts[1], ...passport };
  }, {} as Passport);
};

type ValidateYearFn = (year: number) => boolean;
const boundedNumberValidator = (
  lowerBound: number,
  upperBound: number
): ValidateYearFn => (year: number) => year >= lowerBound && year <= upperBound;

export const validateBirthYear = (birthYear: number): boolean =>
  boundedNumberValidator(1920, 2002)(birthYear);

export const validateIssueYear = (issueYear: number): boolean =>
  boundedNumberValidator(2010, 2020)(issueYear);

export const validateExpirationYear = (expirationYear: number): boolean =>
  boundedNumberValidator(2020, 2030)(expirationYear);

export const validateHeight = (height: string): boolean => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
  const match = height.match(/(?<value>\d+)(?<unit>cm|in)/)?.groups!;

  if (!match) {
    return false;
  }

  switch (match.unit) {
    case "cm":
      return boundedNumberValidator(150, 193)(Number(match.value));
    case "in":
      return boundedNumberValidator(59, 76)(Number(match.value));
  }

  throw new Error("should not be able to get here");
};

export const validateHairColour = (colour: string): boolean =>
  !!colour.match(/#[a-f\d]{6}$/);

export const validateEyeColour = (colour: string): boolean =>
  !!colour.match(/(?:amb|blu|brn|gry|grn|hzl|oth)/);

export const validatePid = (pid: string): boolean => !!pid.match(/^\d{9}$/);
