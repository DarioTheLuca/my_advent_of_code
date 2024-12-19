import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n");

const directionsMap = {
  "0,1,": [
    [-1, 0],
    [1, 0],
  ],
  "0,-1,": [
    [-1, 0],
    [1, 0],
  ],
  "-1,0,": [
    [0, -1],
    [0, 1],
  ],
  "1,0,": [
    [0, -1],
    [0, 1],
  ],
};

const merge = (...args) => args.reduce((acc, curr) => acc + curr + ",", "");

const isValidCell = (matrix, currPos) =>
  currPos.row >= 0 &&
  currPos.col >= 0 &&
  currPos.row < matrix.length &&
  currPos.col < matrix[0].length &&
  matrix[currPos.row][currPos.col] !== "#";

const nextCells = (matrix, currCell) => {
  const nextPos = [];
  const nextDirs = directionsMap[merge(...currCell.prevDir)];
  const { row, col, prevDir, count } = currCell;
  const nextCell1 = {
    row: row + prevDir[0],
    col: col + prevDir[1],
    count: count + 1,
    prevDir: prevDir,
  };
  isValidCell(matrix, nextCell1) && nextPos.push(nextCell1);
  nextDirs.forEach(([dr, dc]) => {
    const next = {
      row: row + dr,
      col: col + dc,
      count: count + 1001,
      prevDir: [dr, dc],
    };
    isValidCell(matrix, next) && nextPos.push(next);
  });

  return nextPos;
};

const part1 = (rawInput) => {
  const matrix = parseInput(rawInput);
  const position = { row: 0, col: 0, count: 0, prevDir: [0, 1] };
  matrix.forEach((r, i) => {
    r.split("").forEach((cell, j) => {
      if (cell === "S") {
        position.row = i;
        position.col = j;
      }
    });
  });

  let count = Infinity;
  const queue = [position];
  const seen = new Map();
  while (queue.length > 0) {
    const currPos = queue.pop();
    // console.log("currPos",currPos)
    const currCell = matrix[currPos.row][currPos.col];
    if (currPos.count > count) continue;
    if (currCell === "E") {
      count = Math.min(count, currPos.count);
      continue;
    }

    const id = merge(
      currPos.row,
      currPos.col,
      currPos.prevDir[0],
      currPos.prevDir[1],
    );
    if (seen.has(id)) {
      if (seen.get(id) > currPos.count) {
        seen.set(id, currPos.count);
      } else {
        continue;
      }
    } else {
      seen.set(id, currPos.count);
    }

    const nextPos = nextCells(matrix, currPos);
    nextPos?.forEach((el) => {
      queue.push(el);
    });
  }

  return count;
};
const nextCells2 = (matrix, currCell) => {
  const nextPos = [];
  const nextDirs = directionsMap[merge(...currCell.prevDir)];
  const { row, col, prevDir, path, count } = currCell;
  const nextCell1 = {
    row: row + prevDir[0],
    col: col + prevDir[1],
    path: path.concat(merge(row + prevDir[0], col + prevDir[1])),
    count: count + 1,

    prevDir: prevDir,
  };
  isValidCell(matrix, nextCell1) && nextPos.push(nextCell1);
  nextDirs.forEach(([dr, dc]) => {
    const next = {
      row: row + dr,
      col: col + dc,
      path: path.concat(merge(row + dr, col + dc)),
      count: count + 1001,

      prevDir: [dr, dc],
    };
    isValidCell(matrix, next) && nextPos.push(next);
  });

  return nextPos;
};
const part2 = (rawInput) => {
  const matrix = parseInput(rawInput);
  const position = { row: 0, col: 0, count: 0, path: [], prevDir: [0, 1] };
  matrix.forEach((r, i) => {
    r.split("").forEach((cell, j) => {
      if (cell === "S") {
        position.row = i;
        position.col = j;
      }
    });
  });

  let x = part1(rawInput); //solutione prima parte

  const queue = [position];
  const seen = new Map();
  let cell = new Set();
  while (queue.length > 0) {
    const currPos = queue.pop();
    // console.log("currPos",currPos)
    const currCell = matrix[currPos.row][currPos.col];
    if (currCell === "E") {
      if (currPos.count === x) {
        currPos.path.forEach((el) => cell.add(el));
      }

      continue;
    }

    const id = merge(
      currPos.row,
      currPos.col,
      currPos.prevDir[0],
      currPos.prevDir[1],
    );
    if (currPos.count > x) continue;
    if (seen.has(id)) {
      if (seen.get(id) >= currPos.count) {
        seen.set(id, currPos.count);
      } else {
        continue;
      }
    } else {
      seen.set(id, currPos.count);
    }

    const nextPos = nextCells2(matrix, currPos);
    nextPos?.forEach((el) => {
      queue.push(el);
    });
  }

  return cell.size + 1;
};

run({
  part1: {
    tests: [
      {
        input: `###############
#.......#....E#
#.#.###.#.###.#
#.....#.#...#.#
#.###.#####.#.#
#.#.#.......#.#
#.#.#####.###.#
#...........#.#
###.#.#####.#.#
#...#.....#.#.#
#.#.#.###.#.#.#
#.....#...#.#.#
#.###.#.#.#.#.#
#S..#.....#...#
###############`,
        expected: 7036,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `###############
#.......#....E#
#.#.###.#.###.#
#.....#.#...#.#
#.###.#####.#.#
#.#.#.......#.#
#.#.#####.###.#
#...........#.#
###.#.#####.#.#
#...#.....#.#.#
#.#.#.###.#.#.#
#.....#...#.#.#
#.###.#.#.#.#.#
#S..#.....#...#
###############`,
        expected: 45,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
