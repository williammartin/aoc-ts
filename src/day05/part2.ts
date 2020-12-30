import { parseInput } from "../util";

const input = parseInput({ split: { mapper: false } });

const binaryInput = input.map((line) =>
  line.replace(/F|L/g, "0").replace(/B|R/g, "1")
);

const decimalInput = binaryInput.map((line) => parseInt(line, 2));
const orderedInput = decimalInput.sort((a: number, b: number) => a - b);

export default orderedInput.find(
  (x: number) => !orderedInput.includes(x + 1)
)! + 1;
