import { expect } from "chai";
import { countTrees, parseMap } from "./util";

describe("part1", () => {
  describe("parsing the map", () => {
    const lines = [".#", "#."];
    expect(parseMap(lines)).to.eql([
      [".", "#"],
      ["#", "."],
    ]);
  });

  it("returns 0 trees for an empty map", () => {
    const map: string[][] = [];
    expect(countTrees(1, 3, map)).to.eql(0);
  });

  it("returns a single tree hit moving down", () => {
    const map: string[][] = [["."], ["#"]];
    expect(countTrees(0, 1, map)).to.eql(1);
  });

  it("returns many tree hits moving down", () => {
    const map: string[][] = [
      [".", ".", "."],
      ["#", ".", "."],
      ["#", ".", "."],
    ];
    expect(countTrees(0, 1, map)).to.eql(2);
  });

  it("returns a single tree hit moving right and down", () => {
    const map: string[][] = [
      [".", "."],
      [".", "#"],
    ];
    expect(countTrees(1, 1, map)).to.eql(1);
  });

  it("returns multiple tree hits moving right and down", () => {
    const map: string[][] = [
      [".", ".", "."],
      [".", "#", "."],
      [".", ".", "#"],
    ];
    expect(countTrees(1, 1, map)).to.eql(2);
  });

  it("repeats the terrain when the next move would go over the edge", () => {
    const map: string[][] = [
      [".", "."],
      [".", "#"],
      ["#", "."],
    ];

    expect(countTrees(3, 1, map)).to.eql(2);
  });

  it("can handle moving more than 1 down and right", () => {
    const map: string[][] = [
      [".", "."],
      ["#", "."],
      ["#", "."],
    ];

    expect(countTrees(0, 2, map)).to.eql(1);
  });
});
