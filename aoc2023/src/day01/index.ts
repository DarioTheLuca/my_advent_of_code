import run from "aocrunner";

const parseInput = (rawInput: string) => {
  return rawInput.split("\n");
};

const map: { [key: string]: number } = {
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
};

const part1 = (rawInput: string) => {
  const rows = parseInput(rawInput);
  let sum = 0;

  for (const row of rows) {
    const number = findUnionMostLeftAndRightNumber(row);
    sum = sum + number;
  }

  return sum;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const rows = input.map((row) =>
    row
      .replaceAll("one", "o1e")
      .replaceAll("two", "t2o")
      .replaceAll("three", "t3e")
      .replaceAll("four", "f4r")
      .replaceAll("five", "f5e")
      .replaceAll("six", "s6x")
      .replaceAll("seven", "s7n")
      .replaceAll("eight", "e8t")
      .replaceAll("nine", "n9e"),
  );

  let sum = 0;

  for (const row of rows) {
    const number = findUnionMostLeftAndRightNumber(row);
    sum = sum + number;
  }
  return sum;
};
function findUnionMostLeftAndRightNumber(row: string): number {
  const len = row.length;
  let charLeft = 0;
  let charRight = 0;
  for (let i = 0; i < len; i++) {
    const charL = map[row[i]];
    const charR = map[row[len - 1 - i]];
    if (!charLeft && charL) {
      charLeft = charL;
    }
    if (!charRight && charR) {
      charRight = charR;
    }
  }
  return charLeft * 10 + charRight;
}

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
