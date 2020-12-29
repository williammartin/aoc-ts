import { expect } from "chai";
import { findThreeNumbersThatSumToTarget } from "./util";

describe("part1", () => {
  it("collects numbers that add up to a target", () => {
    const foundNumbers = findThreeNumbersThatSumToTarget([1, 12, 7, 6], 20);
    expect(foundNumbers).to.eql([1, 12, 7]);
  });

  it("allows duplicates", () => {
    const foundNumbers = findThreeNumbersThatSumToTarget([1, 10, 5, 5], 20);
    expect(foundNumbers).to.eql([10, 5, 5]);
  });

  it("won't reuse the same number", () => {
    const foundNumbers = findThreeNumbersThatSumToTarget([5, 1, 10], 20);
    expect(foundNumbers).to.eql([]);
  });
});
