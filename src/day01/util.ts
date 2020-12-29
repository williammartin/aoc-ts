export const multiplyEntries = (nums: number[]) =>
  nums.reduce((accumulated, current) => accumulated * current);

export const findTwoNumbersThatSumToTarget = (
  numbers: number[],
  target: number
): number[] => numbers.filter((x) => numbers.find((y) => x + y === target));

export const findThreeNumbersThatSumToTarget = (
  numbers: number[],
  target: number
): number[] => {
  return numbers.filter((x, xi) => {
    const numbersWithoutX = numbers.filter((_num, j) => {
      return xi != j;
    });

    return numbersWithoutX.find((y, yi) => {
      const numbersWithoutXAndY = numbersWithoutX.filter((_num, j) => {
        return yi != j;
      });

      return numbersWithoutXAndY.find((z) => x + y + z === target);
    });
  });
};
