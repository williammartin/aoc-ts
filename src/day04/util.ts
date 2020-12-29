const requiredFields = ["ecl", "pid", "eyr", "hcl", "byr", "iyr", "hgt"];

export const validatePassport = (encodedPassport: string): boolean =>
  requiredFields.reduce((validity: boolean, field) => {
    if (!validity) {
      return validity;
    }

    return encodedPassport.includes(field);
  }, true);
