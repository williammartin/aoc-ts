import { parseInput } from "../util";

const input = parseInput({ split: { mapper: false } });

const binaryInput = input.map((line) =>
  line.replace(/F|L/g, "0").replace(/B|R/g, "1")
);

const decimalInput = binaryInput.map((line) => parseInt(line, 2));

export default decimalInput.reduce(
  (largest, curr) => (curr > largest ? curr : largest),
  0
);
