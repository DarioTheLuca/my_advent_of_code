import run from "aocrunner";

const parseInput = (rawInput: string) => {
  return rawInput.split("\n").map((row: string) => row.trim());
};

const part1 = (rawInput: string) => {
  const rows = parseInput(rawInput);
  const rowsArr = rows.map((r) =>
    r.replaceAll("blue", "B").replaceAll("green", "V").replaceAll("red", "R"),
  );

  const greenMax = 13;
  const redMax = 12;
  const blueMax = 14;

  let sum = 0;

  for (let j = 0; j < rowsArr.length; j++) {
    let row = rowsArr[j];
    let ok = true;
    for (let i = 0; i < row.length; i++) {
      if (row[i] === "V") {
        const num = findNumber(row.substring(0, i + 1), i);
        if (num > greenMax) {
          ok = false;
          break;
        }
      } else if (row[i] === "R") {
        const num = findNumber(row.substring(0, i + 1), i);
        if (num > redMax) {
          ok = false;
          break;
        }
      } else if (row[i] === "B") {
        const num = findNumber(row.substring(0, i + 1), i);
        if (num > blueMax) {
          ok = false;
          break;
        }
      }
    }
    if (ok) {
      sum += j + 1;
    }
  }
  return sum;
};

const part2 = (rawInput: string) => {
  const rows = parseInput(rawInput);
  const rowsArr = rows.map((r) =>
    r.replaceAll("blue", "B").replaceAll("green", "V").replaceAll("red", "R"),
  );

  let sum = 0;

  for (let j = 0; j < rowsArr.length; j++) {
    let row = rowsArr[j];
    let maxB = 0;
    let maxV = 0;
    let maxR = 0;
    for (let i = 0; i < row.length; i++) {
      if (row[i] === "V") {
        const num = findNumber(row.substring(0, i + 1), i);
        maxV = Math.max(num, maxV);
      } else if (row[i] === "R") {
        const num = findNumber(row.substring(0, i + 1), i);
        maxR = Math.max(num, maxR);
      } else if (row[i] === "B") {
        const num = findNumber(row.substring(0, i + 1), i);
        maxB = Math.max(num, maxB);
      }
    }
    sum = sum + maxB * maxV * maxR;
  }
  return sum;
};
function findNumber(string: string, i: number) {
  let x = 1;
  let number_as_string = "";
  while (
    string[i - 1 - x] !== ";" &&
    string[i - 1 - x] !== "," &&
    string[i - 1 - x] !== ":"
  ) {
    number_as_string = string[i - 1 - x] + number_as_string;
    x++;
  }
  return Number(number_as_string);
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
