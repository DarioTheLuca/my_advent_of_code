import run from "aocrunner";
const isReportValid = (report) => {
  const lenReport = report.length;
  const currReport = report;
  let isDecreasing = currReport[0] > currReport[1];
  let isValidReport = true;
  for (let j = 1; j < lenReport; j++) {
    const currR = currReport[j];
    const prevR = currReport[j - 1];
    const diff = Math.abs(prevR - currR);
    if (isDecreasing) {
      if (!(prevR > currR && diff <= 3 && diff > 0)) {
        isValidReport = false;
        break;
      }
    } else {
      if (!(prevR < currR && diff <= 3 && diff > 0)) {
        isValidReport = false;
        break;
      }
    }
  }
  return isValidReport;
};
const parseInput = (rawInput) =>
  rawInput.split("\n").map((el) => el.split(" ").map(Number));

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  let sum = 0;
  const numR = input.length;
  for (let i = 0; i < numR; i++) {
    const currReport = input[i];

    if (isReportValid(currReport)) sum = sum + 1;
  }
  return sum;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  let sum = 0;
  const numR = input.length;
  for (let i = 0; i < numR; i++) {
    const lenReport = input[i].length;
    const currReport = input[i];

    for (let j = 0; j < lenReport; j++) {
      if (isReportValid(currReport.filter((_, index) => index !== j))) {
        sum = sum + 1;
        break;
      }
    }
  }
  return sum;
};

run({
  part1: {
    tests: [
      {
        input: `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`,
        expected: 2,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`,
        expected: 4,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
