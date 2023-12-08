import run from "aocrunner";

const parseInput = (rawInput: string) =>
  rawInput
    .split("\n\n")
    .map((i) => i.split("\n"))
    .map((a) =>
      a.reduce((acc, curr) => {
        return acc + Number(curr);
      }, 0),
    );

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let max = 0;
  for (const i of input) {
    max = Math.max(max, i);
  }

  return max;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let top: number[] = [];
  let numberTopMax = 3;

  for (const i of input) {
    if (top.length < numberTopMax) {
      top.push(i);
      top.sort((a, b) => a - b);
    } else if (i>top[0]) {
      top[0]=i;;
      top.sort((a, b) => a - b);
    }
  }
  return top.reduce((acc, curr) => {
    return acc + curr;
  }, 0);
};

run({
  part1: {
    tests: [
      {
        input: `
        1000
        2000
        3000

        4000

        5000
        6000

        7000
        8000
        9000

        10000`,
        expected: 24000,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        1000
        2000
        3000

        4000

        5000
        6000

        7000
        8000
        9000

        10000`,
        expected: 45000,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
