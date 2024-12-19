import run from "aocrunner";

const replaceAt = (string, index, replacement) => {
  return (
    string.substring(0, index) +
    replacement +
    string.substring(index + replacement.length)
  );
};
const movements = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
  [0, -1],
];
const movementsLen = movements.length;
let currDir = 0;

const symbol1 = "^";
const symbol2 = ".";
const parseInput = (rawInput) => rawInput.split("\n");

const nextPos = (matrix, currPos, currDir, movements) => {
  const colsLen = matrix[0].length;
  const rowsLen = matrix.length;

  const [r, c] = movements[currDir % movementsLen];

  if (
    currPos.row + r === rowsLen ||
    currPos.row + r === -1 ||
    currPos.col + c === -1 ||
    currPos.col + c === colsLen
  ) {
    return null;
  }

  if (matrix[currPos.row + r][currPos.col + c] !== ".") {
    return nextPos(matrix, currPos, currDir + 1, movements);
  }
  return {
    currPos: { row: currPos.row + r, col: currPos.col + c },
    currDir: currDir,
  };
};

const merge = (...arg) => arg.reduce((acc, curr) => `${acc}${curr},`, "");

//ritorna se il percorso è un loop, e se non lo è ritorna anche le celle percorse
const isMatrixALoop = (matrix, startingPosition, currDir, movements) => {
  const uniquePos = new Set();
  const queue = [{ currPos: startingPosition, currDir: currDir }];
  const posSet = new Set();

  while (queue.length > 0) {
    const el = queue.pop();
    const uniquePositionId = merge(
      el.currPos.row,
      el.currPos.col,
      el.currDir % movements.length,
    );
    if (uniquePos.has(uniquePositionId)) {
      return { isLoop: true };
    } else {
      uniquePos.add(uniquePositionId);
    }
    posSet.add(merge(el.currPos.row, el.currPos.col));
    const nextCoordinates = nextPos(matrix, el.currPos, el.currDir, movements);
    if (nextCoordinates) queue.push(nextCoordinates);
  }
  return { isLoop: false, posSet: posSet };
};

const findSymbolReplaceIt = (matrix, symbol1, symbol2) => {
  let startingPosition = { row: 0, col: 0 };

  const matrice = matrix.map((el, index) => {
    const col = el.indexOf(symbol1);
    if (col !== -1) {
      startingPosition.col = col;
      startingPosition.row = index;
      return replaceAt(el, col, symbol2);
    }
    return el;
  });

  return { startingPosition, matrix: matrice };
};

const part1 = (rawInput) => {
  let input = parseInput(rawInput);

  const { matrix, startingPosition } = findSymbolReplaceIt(
    input,
    symbol1,
    symbol2,
  );

  const { posSet } = isMatrixALoop(
    matrix,
    startingPosition,
    currDir,
    movements,
  );
  return posSet.size;
};

const part2 = (rawInput) => {
  let input = parseInput(rawInput);
  const { matrix, startingPosition } = findSymbolReplaceIt(
    input,
    symbol1,
    symbol2,
  );

  const { posSet } = isMatrixALoop(
    matrix,
    startingPosition,
    currDir,
    movements,
  );

  posSet.delete(merge(startingPosition.row, startingPosition.col));

  const countPos = new Set();

  for (const pos of posSet) {
    const [r, c] = pos.split(",").map(Number);
    const newMatrix = matrix.map((row, index) =>
      index === r ? replaceAt(row, c, "O") : row,
    );

    const { isLoop } = isMatrixALoop(
      newMatrix,
      startingPosition,
      currDir,
      movements,
    );
    if (isLoop) countPos.add(pos);
  }

  return countPos.size;
};

run({
  part1: {
    tests: [
      {
        input: `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`,
        expected: 41,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`,
        expected: 6,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
