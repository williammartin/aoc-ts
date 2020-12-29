import { expect } from "chai";
import { parseV2PasswordPolicy, v2Validate } from "./util";

describe("part2", () => {
  describe("password policy parsing", () => {
    it("parses passwords in the v2 schema", () => {
      expect(parseV2PasswordPolicy("1-3 a: abcde")).to.deep.equal({
        first_position: 1,
        second_position: 3,
        character: "a",
        password: "abcde",
      });
    });
  });

  describe("password validity checking", () => {
    it("returns true when valid", () => {
      const policy = {
        first_position: 1,
        second_position: 3,
        character: "a",
        password: "abc",
      };

      expect(v2Validate(policy)).to.be.true;
    });

    it("returns false when the character appears in neither position", () => {
      const policy = {
        first_position: 1,
        second_position: 3,
        character: "a",
        password: "bbb",
      };

      expect(v2Validate(policy)).to.be.false;
    });

    it("returns false when the character appears in both positions", () => {
      const policy = {
        first_position: 1,
        second_position: 3,
        character: "a",
        password: "aaa",
      };

      expect(v2Validate(policy)).to.be.false;
    });

    it("returns false when the character appears in some other position", () => {
      const policy = {
        first_position: 1,
        second_position: 3,
        character: "a",
        password: "bab",
      };

      expect(v2Validate(policy)).to.be.false;
    });

    it("ignores other occurences of the character re: exactly once", () => {
      const policy = {
        first_position: 1,
        second_position: 3,
        character: "a",
        password: "baa",
      };

      expect(v2Validate(policy)).to.be.true;
    });

    it("works with the given examples", () => {
      expect(
        v2Validate({
          first_position: 1,
          second_position: 3,
          character: "a",
          password: "abcde",
        })
      ).to.be.true;

      expect(
        v2Validate({
          first_position: 1,
          second_position: 3,
          character: "b",
          password: "cdefg",
        })
      ).to.be.false;

      expect(
        v2Validate({
          first_position: 2,
          second_position: 9,
          character: "c",
          password: "ccccccccc",
        })
      ).to.be.false;
    });
  });
});
