import { expect } from "chai";
import { collectIntersectedAnswers } from "./util";

describe("part2", () => {
  describe("collecting intersected answers for a group", () => {
    it("returns 1 when there is 1 person with 1 individual answer", () => {
      expect(collectIntersectedAnswers({ individualAnswers: [["a"]] })).to.eql([
        "a",
      ]);
    });

    it("returns intersected single answers across multiple groups", () => {
      expect(
        collectIntersectedAnswers({ individualAnswers: [["b", "b"]] })
      ).to.eql(["b"]);
    });

    it("returns intersected multiple answers across multiple groups", () => {
      expect(
        collectIntersectedAnswers({
          individualAnswers: [["a", "b"], ["a"], ["a", "b"]],
        })
      ).to.eql(["a"]);
    });
  });
});
