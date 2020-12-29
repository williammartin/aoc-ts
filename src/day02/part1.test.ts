import { expect } from "chai";
import { parseV1PasswordPolicy, v1Validate } from "./util";

describe("part1", () => {
  describe("password policy parsing", () => {
    it("parses passwords in the v1 schema", () => {
      expect(parseV1PasswordPolicy("4-8 n: dnjjrtclnzdnghnbnn")).to.eql({
        lower: 4,
        upper: 8,
        character: "n",
        password: "dnjjrtclnzdnghnbnn",
      });
    });
  });

  describe("password validity checking", () => {
    it("returns true when valid", () => {
      const policy = {
        lower: 1,
        upper: 3,
        character: "a",
        password: "a",
      };

      expect(v1Validate(policy)).to.be.true;
    });

    it("returns false when the lower bound is breached", () => {
      const policy = {
        lower: 1,
        upper: 3,
        character: "a",
        password: "",
      };

      expect(v1Validate(policy)).to.be.false;
    });

    it("returns false when the upper bound is breached", () => {
      const policy = {
        lower: 1,
        upper: 3,
        character: "a",
        password: "aaaa",
      };

      expect(v1Validate(policy)).to.be.false;
    });
  });
});
