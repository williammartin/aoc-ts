import { expect } from "chai";
import { findTwoNumbersThatSumToTarget } from "./util";

describe("part1", () => {
  it("collects numbers that add up to a target", () => {
    const foundNumbers = findTwoNumbersThatSumToTarget(
      [1, 5, 50, 7, 6, 11, 15],
      20
    );
    expect(foundNumbers).to.eql([5, 15]);
  });
});
