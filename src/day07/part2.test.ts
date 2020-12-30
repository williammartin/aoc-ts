import { expect } from "chai";
import {
  countNestedBags,
  createGraph,
  parseRule,
  transposeGraph,
} from "./util";

describe("part2", () => {
  describe("graph transposition", () => {
    it("transposes a parent child relationship", () => {
      const bags = [
        "faded blue bags contain no other bags",
        "dark orange bags contain 1 faded blue bag",
      ].map((rule) => parseRule(rule));

      const graph = transposeGraph(createGraph(bags));

      expect(graph.get("faded blue")).to.eql([]);
      expect(graph.get("dark orange")).to.eql([
        { id: "faded blue", weight: 1 },
      ]);
    });

    it("transposes a branching relationship", () => {
      const bags = [
        "faded blue bags contain no other bags",
        "dark orange bags contain 1 faded blue bag",
        "bright red bags contain 1 faded blue bag",
      ].map((rule) => parseRule(rule));

      const graph = transposeGraph(createGraph(bags));

      expect(graph.get("faded blue")).to.eql([]);
      expect(graph.get("dark orange")).to.eql([
        { id: "faded blue", weight: 1 },
      ]);
      expect(graph.get("bright red")).to.eql([{ id: "faded blue", weight: 1 }]);
    });
  });

  it("counts the cost of a singly nested bag", () => {
    const bags = [
      "shiny gold bags contain 1 dark violet bag.",
      "dark violet bags contain no other bags.",
    ].map((rule) => parseRule(rule));

    expect(countNestedBags("shiny gold", bags)).to.eql(1);
  });

  it("counts the cost of singly nested bags", () => {
    const bags = [
      "shiny gold bags contain 2 dark violet bag.",
      "dark violet bags contain no other bags.",
    ].map((rule) => parseRule(rule));

    expect(countNestedBags("shiny gold", bags)).to.eql(2);
  });

  it("counts the cost of double nested single bags", () => {
    const bags = [
      "shiny gold bags contain 1 bright red bag.",
      "bright red bags contain 1 dark violet bag.",
      "dark violet bags contain no other bags.",
    ].map((rule) => parseRule(rule));

    expect(countNestedBags("shiny gold", bags)).to.eql(2);
  });

  it("counts the cost of double nested double bags", () => {
    const bags = [
      "shiny gold bags contain 2 bright red bag.",
      "bright red bags contain 2 dark violet bag.",
      "dark violet bags contain no other bags.",
    ].map((rule) => parseRule(rule));

    expect(countNestedBags("shiny gold", bags)).to.eql(6);
  });

  it("counts the cost of deeply nested bag", () => {
    const bags = [
      "shiny gold bags contain 2 dark red bags.",
      "dark red bags contain 2 dark orange bags.",
      "dark orange bags contain 2 dark yellow bags.",
      "dark yellow bags contain 2 dark green bags.",
      "dark green bags contain 2 dark blue bags.",
      "dark blue bags contain 2 dark violet bags.",
      "dark violet bags contain no other bags.",
    ].map((rule) => parseRule(rule));

    expect(countNestedBags("shiny gold", bags)).to.eql(126);
  });
});
