import run from "aocrunner";

const parseInput = (rawInput: string) => {
  return rawInput.split("\n").map((e) => e.split(" ").map(Number));
};
function calculateNextNumber(arr: number[]): number {
  const len = arr.length;
  const lastNum = arr[arr.length - 1];

  if (arr.every((e) => e === 0)) return lastNum + arr[len - 1];

  const diffArray = [];
  for (let i = 1; i < len; i++) {
    const currNum = arr[i];
    const prevNum = arr[i - 1];
    diffArray.push(currNum - prevNum);
  }

  return lastNum + calculateNextNumber(diffArray);
}
const part1 = (rawInput: string) => {
  const rows = parseInput(rawInput);
  let result = 0;

  for (const row of rows) {
    result += calculateNextNumber(row);
  }
  return result;
};

const part2 = (rawInput: string) => {
  const rows = parseInput(rawInput);
  let result = 0;

  for (const row of rows) {
    const reversedRow = row.reverse();
    result += calculateNextNumber(reversedRow);
  }
  return result;
};

run({
  part1: {
    tests: [
      {
        input: `
        0 3 6 9 12 15
        1 3 6 10 15 21
        10 13 16 21 30 45`,
        expected: 114,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        0 3 6 9 12 15
        1 3 6 10 15 21
        10 13 16 21 30 45`,
        expected: 2,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
