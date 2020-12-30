import { expect } from "chai";
import { collectDistinctAnswers, parseGroup } from "./util";

describe("part1", () => {
  describe("parsing groups", () => {
    it("parses a group with a single person with a single answer", () => {
      expect(parseGroup("a")).to.eql({ individualAnswers: [["a"]] });
    });

    it("parses a group with a many people (newline deliminated) with single answers", () => {
      expect(parseGroup("a\nb\nc")).to.eql({
        individualAnswers: [["a"], ["b"], ["c"]],
      });
    });

    it("parses a group with a many people (newline deliminated) with many answers", () => {
      expect(parseGroup("az\nbnb\ncob")).to.eql({
        individualAnswers: [
          ["a", "z"],
          ["b", "n", "b"],
          ["c", "o", "b"],
        ],
      });
    });
  });

  describe("collecting distinct answers for a group", () => {
    it("returns 1 when there is 1 person with 1 individual answer", () => {
      expect(collectDistinctAnswers({ individualAnswers: [["a"]] })).to.eql([
        "a",
      ]);
    });

    it("removes duplicates within an individual answer", () => {
      expect(
        collectDistinctAnswers({ individualAnswers: [["b", "b"]] })
      ).to.eql(["b"]);
    });

    it("returns multiple when there are multiple people with a single answer", () => {
      expect(
        collectDistinctAnswers({ individualAnswers: [["a", "b"], ["a"]] })
      ).to.eql(["a", "b"]);
    });
  });
});
