import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n");

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  let count = 0;

  for (let i = 0; i < input.length; i++) {
    let currRow = input[i];

    for (let j = 0; j < input[0].length; j++) {
      let currCell = currRow[j];
      if (currCell === "X") {
        if (j >= 3 && currRow.substring(j - 3, j + 1) === "SAMX")
          count = count + 1;

        if (
          j + 3 <= input[0].length - 1 &&
          currRow.substring(j, j + 4) === "XMAS"
        )
          count = count + 1;

        if (
          i >= 3 &&
          currCell + input[i - 1][j] + input[i - 2][j] + input[i - 3][j] ===
            "XMAS"
        )
          count = count + 1;

        if (
          i + 3 <= input.length - 1 &&
          currCell + input[i + 1][j] + input[i + 2][j] + input[i + 3][j] ===
            "XMAS"
        )
          count = count + 1;

        if (
          j >= 3 &&
          i >= 3 &&
          currCell +
            input[i - 1][j - 1] +
            input[i - 2][j - 2] +
            input[i - 3][j - 3] ===
            "XMAS"
        ) {
          count = count + 1;
        }
        if (
          j + 3 <= input[0].length - 1 &&
          i >= 3 &&
          currCell +
            input[i - 1][j + 1] +
            input[i - 2][j + 2] +
            input[i - 3][j + 3] ===
            "XMAS"
        ) {
          count = count + 1;
        }
        if (
          j + 3 <= input[0].length - 1 &&
          i + 3 <= input.length - 1 &&
          currCell +
            input[i + 1][j + 1] +
            input[i + 2][j + 2] +
            input[i + 3][j + 3] ===
            "XMAS"
        ) {
          count = count + 1;
        }
        if (
          j >= 3 &&
          i + 3 <= input.length - 1 &&
          currCell +
            input[i + 1][j - 1] +
            input[i + 2][j - 2] +
            input[i + 3][j - 3] ===
            "XMAS"
        ) {
          count = count + 1;
        }
      }
    }
  }
  return count;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  let count = 0;

  for (let i = 0; i < input.length; i++) {
    let currRow = input[i];

    for (let j = 0; j < input[0].length; j++) {
      let currCell = currRow[j];
      if (currCell === "A") {
        if (
          i >= 1 &&
          j >= 1 &&
          j + 1 < input[0].length &&
          i + 1 < input.length &&
          (input[i - 1][j - 1] + currCell + input[i + 1][j + 1] === "MAS" ||
            input[i - 1][j - 1] + currCell + input[i + 1][j + 1] === "SAM") &&
          (input[i + 1][j - 1] + currCell + input[i - 1][j + 1] === "MAS" ||
            input[i + 1][j - 1] + currCell + input[i - 1][j + 1] === "SAM")
        )
          count = count + 1;
      }
    }
  }
  return count;
};

run({
  part1: {
    tests: [
      {
        input: `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`,
        expected: 18,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `.M.S......
..A..MSMS.
.M.S.MAA..
..A.ASMSM.
.M.S.M....
..........
S.S.S.S.S.
.A.A.A.A..
M.M.M.M.M.
..........`,
        expected: 9,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
