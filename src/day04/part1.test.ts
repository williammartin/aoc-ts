import { expect } from "chai";
import { validatePassport } from "./util";

describe("part1", () => {
  it("passes validation for passports that contain all fields", () => {
    const encodedPassport =
      "ecl:gry pid:860033327 eyr:2020 hcl:#fffffd byr:1937 iyr:2017 cid:147 hgt:183cm";

    expect(validatePassport(encodedPassport)).to.be.true;
  });

  it("fails validation for missing required fields", () => {
    const encodedPassport =
      "iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884 hcl:#cfa07d byr:1929";

    expect(validatePassport(encodedPassport)).to.be.false;
  });

  it("passes validation if the cid is the only field missing", () => {
    const encodedPassport =
      "hcl:#ae17e1 iyr:2013 eyr:2024 ecl:brn pid:760753108 byr:1931 hgt:179cm";

    expect(validatePassport(encodedPassport)).to.be.true;
  });

  it("fails validation even if the cid is missing, if other fields are missing", () => {
    const encodedPassport =
      "hcl:#cfa07d eyr:2025 pid:166559648 iyr:2011 ecl:brn hgt:59in";

    expect(validatePassport(encodedPassport)).to.be.false;
  });
});
