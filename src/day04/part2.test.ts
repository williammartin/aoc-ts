import { expect } from "chai";
import {
  parsePassport,
  validateBirthYear,
  validateExpirationYear,
  validateEyeColour,
  validateHairColour,
  validateHeight,
  validateIssueYear,
  validatePid,
} from "./util";

describe("part2", () => {
  describe("parsing passport info", () => {
    it("parses into a structure if valid", () => {
      expect(
        parsePassport(
          "ecl:gry pid:860033327 eyr:2020 hcl:#fffffd byr:1937 iyr:2017 cid:147 hgt:183cm"
        )
      ).to.eql({
        byr: "1937",
        iyr: "2017",
        eyr: "2020",
        hgt: "183cm",
        hcl: "#fffffd",
        ecl: "gry",
        pid: "860033327",
        cid: "147",
      });
    });

    it("throws if invalid", () => {
      expect(() => parsePassport("invalid")).to.throw("invalid passport");
    });
  });

  describe("birth year policy", () => {
    it("validates between 1920 and 2002", () => {
      expect(validateBirthYear(1919)).to.be.false;
      expect(validateBirthYear(1920)).to.be.true;
      expect(validateBirthYear(2002)).to.be.true;
      expect(validateBirthYear(2003)).to.be.false;
    });
  });

  describe("issue year policy", () => {
    it("validates between 2010 and 2020", () => {
      expect(validateIssueYear(2009)).to.be.false;
      expect(validateIssueYear(2010)).to.be.true;
      expect(validateIssueYear(2020)).to.be.true;
      expect(validateIssueYear(2021)).to.be.false;
    });
  });

  describe("expiration year policy", () => {
    it("validates between 2020 and 2030", () => {
      expect(validateExpirationYear(2019)).to.be.false;
      expect(validateExpirationYear(2020)).to.be.true;
      expect(validateExpirationYear(2030)).to.be.true;
      expect(validateExpirationYear(2031)).to.be.false;
    });
  });

  describe("heights policy", () => {
    it("requires cm or inches at the end of a number", () => {
      expect(validateHeight("182")).to.be.false;
      expect(validateHeight("182lol")).to.be.false;
    });

    it("expects cm heights to be between 150 and 192", () => {
      expect(validateHeight("149cm")).to.be.false;
      expect(validateHeight("150cm")).to.be.true;
      expect(validateHeight("193cm")).to.be.true;
      expect(validateHeight("194cm")).to.be.false;
    });

    it("expects inch heights to be between 59 and 76", () => {
      expect(validateHeight("58in")).to.be.false;
      expect(validateHeight("59in")).to.be.true;
      expect(validateHeight("76in")).to.be.true;
      expect(validateHeight("77in")).to.be.false;
    });
  });

  describe("hair colour policy", () => {
    it("expects to start with a hash", () => {
      expect(validateHairColour("000000")).to.be.false;
    });

    it("expects to follow the hash with 6 digits or chars between a-f", () => {
      expect(validateHairColour("#000000")).to.be.true;
      expect(validateHairColour("#999999")).to.be.true;
      expect(validateHairColour("#aaaaaa")).to.be.true;
      expect(validateHairColour("#ffffff")).to.be.true;

      expect(validateHairColour("#-1")).to.be.false;
      expect(validateHairColour("#zzzzzz")).to.be.false;
      expect(validateHairColour("#00000000")).to.be.false;
    });
  });

  describe("eye colour policy", () => {
    it("must be one of a set of enumerated colours", () => {
      const colours = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
      colours.forEach((colour) => expect(validateEyeColour(colour)).to.be.true);

      expect(validateEyeColour("not-valid")).to.be.false;
    });
  });

  describe("passport id policy", () => {
    it("must be exactly a nine-digit number including leading zeros", () => {
      expect(validatePid("000000000")).to.be.true;
      expect(validatePid("999999999")).to.be.true;
      expect(validatePid("012345678")).to.be.true;

      expect(validatePid("")).to.be.false;
      expect(validatePid("0000000000")).to.be.false;
    });
  });
});
