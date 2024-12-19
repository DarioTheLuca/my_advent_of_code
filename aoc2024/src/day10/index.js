import run from "aocrunner";

const parseInput = (rawInput) =>
  rawInput.split("\n").map((row) => row.split("").map(Number));

const isCellValid = (matrix, cell) =>
  cell.row >= 0 &&
  cell.row < matrix.length &&
  cell.col >= 0 &&
  cell.col < matrix[0].length;

const directions = [
  [0, -1],
  [0, 1],
  [-1, 0],
  [1, 0],
];

const merge = (...args) => args.reduce((acc, curr) => acc + curr + ",", "");

const count9Recursive = (matrix, currPos, clbck) => {
  const currCell = matrix[currPos.row][currPos.col];
  if (currCell === 9) {
    clbck(currPos.row, currPos.col);
  } else {
    for (const direction of directions) {
      const [diffRow, diffCol] = direction;
      const nextPos = {
        row: currPos.row + diffRow,
        col: currPos.col + diffCol,
      };
      if (
        isCellValid(matrix, nextPos) &&
        matrix[nextPos.row][nextPos.col] - currCell === 1
      ) {
        count9Recursive(matrix, nextPos, clbck);
      }
    }
  }
};

const count9 = (matrix, currPos, clbck) => {
  const queue = [currPos];
  while (queue.length > 0) {
    const currPos = queue.pop();
    const currCell = matrix[currPos.row][currPos.col];
    if (currCell === 9) {
      clbck(currPos.row, currPos.col);
    } else {
      for (const direction of directions) {
        const [diffRow, diffCol] = direction;
        const nextPos = {
          row: currPos.row + diffRow,
          col: currPos.col + diffCol,
        };
        if (
          isCellValid(matrix, nextPos) &&
          matrix[nextPos.row][nextPos.col] - currCell === 1
        ) {
          queue.push(nextPos);
        }
      }
    }
  }
};

const part1 = (rawInput) => {
  const matrix = parseInput(rawInput);
  let sum = 0;
  matrix.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (cell === 0) {
        const posSet = new Set();
        const callBack = (r, c) => posSet.add(merge(r, c));
        count9Recursive(matrix, { row: i, col: j }, callBack);
        sum = sum + posSet.size;
      }
    });
  });
  return sum;
};

const part2 = (rawInput) => {
  const matrix = parseInput(rawInput);
  let sum = 0;
  matrix.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (cell === 0) {
        const callBack = () => {
          sum = sum + 1;
        };
        count9Recursive(matrix, { row: i, col: j }, callBack);
      }
    });
  });
  return sum;
};

run({
  part1: {
    tests: [
      {
        input: `
        89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`,
        expected: 36,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`,
        expected: 81,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
