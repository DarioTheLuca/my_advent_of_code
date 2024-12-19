import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n");

const directions = {
  "<": [0, -1],
  v: [1, 0],
  ">": [0, 1],
  "^": [-1, 0],
};

const find = (matrix, dir, cell) => {
  const nextPos = { row: cell.row + dir[0], col: cell.col + dir[1] };
  const nextCell = matrix[nextPos.row][nextPos.col];
  if (nextCell === "#") return undefined;
  if (nextCell === "O") {
    return find(matrix, dir, nextPos);
  }
  if (nextCell === ".") return nextPos;
};

const find3 = (matrix, dir, cell) => {
  const nextPos = { row: cell.row + dir[0], col: cell.col + dir[1] };
  const nextCell = matrix[nextPos.row][nextPos.col];
  if (nextCell === "#") return undefined;
  if (nextCell === "[" || nextCell === "]") {
    return find3(matrix, dir, nextPos);
  }
  if (nextCell === ".") return nextPos;
};

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  let matrix = [];
  let position = { row: 0, col: 0 };
  let movements = "";
  let isMovements = false;
  for (let i = 0; i < input.length; i++) {
    const curr = input[i];
    if (curr === "") {
      isMovements = true;
      continue;
    } else if (isMovements) {
      movements = movements + curr;
    } else {
      matrix.push(curr.split(""));

      const col = curr.indexOf("@");
      if (col !== -1) {
        position.row = i;
        position.col = col;
      }
    }
  }

  movements = movements.split("").reverse();

  while (movements.length > 0) {
    const currMov = movements.pop();
    const [dr, dc] = directions[currMov];
    const nextPos = { row: position.row + dr, col: position.col + dc };
    const nextCell = matrix[nextPos.row][nextPos.col];
    if (nextCell === "#") continue;
    if (nextCell === ".") {
      matrix[position.row][position.col] = ".";
      matrix[nextPos.row][nextPos.col] = "@";
      position = nextPos;
    }
    if (nextCell === "O") {
      const npos = find(matrix, [dr, dc], nextPos);
      if (!npos) continue;
      else {
        matrix[position.row][position.col] = ".";
        matrix[nextPos.row][nextPos.col] = "@";
        matrix[npos.row][npos.col] = "O";
        position = nextPos;
      }
    }
  }

  let sum = 0;
  matrix.forEach((row, i) => {
    row.forEach((el, j) => {
      if (el === "O") {
        sum = sum + i * 100 + j;
      }
    });
  });
  return sum;
};
const merge = (...args) => args.reduce((acc, curr) => acc + curr + ",", "");
const find2 = (matrix, dir, cell) => {
  const box = [cell];
  if (matrix[cell.row][cell.col] === "]") {
    box.push({ row: cell.row, col: cell.col - 1 });
  } else {
    box.push({ row: cell.row, col: cell.col + 1 });
  }
  const boxes = [box];
  const boxesToSend = new Set();
  while (boxes.length > 0) {
    const currBox = boxes.pop();

    for (const po of currBox) {
      if (matrix[po.row + dir[0]][po.col + dir[1]] === "#") {
        return undefined;
      }
      if (matrix[po.row + dir[0]][po.col + dir[1]] === ".") continue;
      if (matrix[po.row + dir[0]][po.col + dir[1]] === "]") {
        boxes.push([
          { row: po.row + dir[0], col: po.col + dir[1] - 1 },
          { row: po.row + dir[0], col: po.col + dir[1] },
        ]);
      } else {
        boxes.push([
          { row: po.row + dir[0], col: po.col + dir[1] + 1 },
          { row: po.row + dir[0], col: po.col + dir[1] },
        ]);
      }
    }
    boxesToSend.add(
      merge(
        currBox[0].row,
        Math.min(currBox[0].col, currBox[1].col),
        currBox[1].row,
        Math.max(currBox[0].col, currBox[1].col),
      ),
    );
  }
  return boxesToSend;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  let matrix = [];
  let position = { row: 0, col: 0 };
  let movements = "";
  let isMovements = false;
  for (let i = 0; i < input.length; i++) {
    const curr = input[i];
    if (curr === "") {
      isMovements = true;
      continue;
    } else if (isMovements) {
      movements = movements + curr;
    } else {
      matrix.push(
        curr
          .split("")
          .map((el) => {
            if (el === "#") return "##";
            if (el === ".") return "..";
            if (el === "@") return "@.";
            if (el === "O") return "[]";
          })
          .join("")
          .split(""),
      );

      const col = curr.indexOf("@");
      if (col !== -1) {
        position.row = i;
        position.col = col * 2;
      }
    }
  }

  movements = movements.split("").reverse();

  while (movements.length > 0) {
    const currMov = movements.pop();

    const [dr, dc] = directions[currMov];
    const nextPos = { row: position.row + dr, col: position.col + dc };
    const nextCell = matrix[nextPos.row][nextPos.col];
    if (nextCell === "#") continue;
    if (nextCell === ".") {
      matrix[position.row][position.col] = ".";
      matrix[nextPos.row][nextPos.col] = "@";
      position = nextPos;
      continue;
    }
    if (currMov === "<" || currMov === ">") {
      const npos = find3(matrix, [0, dc], nextPos);
      if (!npos) continue;
      else {
        matrix[position.row][position.col] = ".";
        matrix[nextPos.row][nextPos.col] = "@";
        position = nextPos;
        if (currMov === "<") {
          for (let j = npos.col; j < nextPos.col; j++) {
            const cell = matrix[npos.row][j];
            matrix[npos.row][j] = cell === "." ? "[" : cell === "[" ? "]" : "[";
          }
        } else {
          for (let j = nextPos.col + 1; j <= npos.col; j++) {
            const cell = matrix[npos.row][j];
            matrix[npos.row][j] = cell === "." ? "]" : cell === "[" ? "]" : "[";
          }
        }
      }
    } else {
      let boxes = find2(matrix, [dr, 0], nextPos);
      if (!boxes) continue;

      boxes = Array.from(boxes).map((box) => {
        const [p1, p2, p3, p4] = box.split(",");
        return [
          { row: Number(p1), col: Number(p2) },
          { row: Number(p3), col: Number(p4) },
        ];
      });

      if (currMov === "^") {
        boxes.sort((box1, box2) => box1[0].row - box2[0].row);
        boxes.forEach((box) => {
          box.forEach((part) => {
            matrix[part.row - 1][part.col] = matrix[part.row][part.col];
            matrix[part.row][part.col] = ".";
          });
        });
      } else {
        boxes.sort((box1, box2) => box2[0].row - box1[0].row);
        boxes.forEach((box) => {
          box.forEach((part) => {
            matrix[part.row + 1][part.col] = matrix[part.row][part.col];
            matrix[part.row][part.col] = ".";
          });
        });
      }

      matrix[position.row][position.col] = ".";
      matrix[nextPos.row][nextPos.col] = "@";

      position = nextPos;
    }
  }

  let sum = 0;
  matrix.forEach((row, i) => {
    row.forEach((el, j) => {
      if (el === "[") {
        sum = sum + i * 100 + j;
      }
    });
  });
  return sum;
};

run({
  part1: {
    tests: [
      {
        input: `########
#..O.O.#
##@.O..#
#...O..#
#.#.O..#
#...O..#
#......#
########

<^^>>>vv<v>>v<<`,
        expected: 2028,
      },
      {
        input: `##########
#..O..O.O#
#......O.#
#.OO..O.O#
#..O@..O.#
#O#..O...#
#O..O..O.#
#.OO.O.OO#
#....O...#
##########

<vv>^<v^>v>^vv^v>v<>v^v<v<^vv<<<^><<><>>v<vvv<>^v^>^<<<><<v<<<v^vv^v>^
vvv<<^>^v^^><<>>><>^<<><^vv^^<>vvv<>><^^v>^>vv<>v<<<<v<^v>^<^^>>>^<v<v
><>vv>v^v^<>><>>>><^^>vv>v<^^^>>v^v^<^^>v^^>v^<^v>v<>>v^v^<v>v^^<^^vv<
<<v<^>>^^^^>>>v^<>vvv^><v<<<>^^^vv^<vvv>^>v<^^^^v<>^>vvvv><>>v^<<^^^^^
^><^><>>><>^^<<^^v>>><^<v>^<vv>>v>>>^v><>^v><<<<v>>v<v<v>vvv>^<><<>^><
^>><>^v<><^vvv<^^<><v<<<<<><^v<<<><<<^^<v<^^^><^>>^<v^><<<^>>^v<v^v<v^
>^>>^v>vv>^<<^v<>><<><<v<<v><>v<^vv<<<>^^v^>^^>>><<^v>>v^v><^^>>^<>vv^
<><^^>^^^<><vvvvv^v<v<<>^v<v>v<<^><<><<><<<^^<<<^<<>><<><^^^>^^<>^>v<>
^^>vv<^v^v<vv>^<><v<^v>^^^>>>^^vvv^>vvv<>>>^<^>>>>>^<<^v>^vvv<>^<><<v>
v^^>>><<^^<>>^v^<v^vv<>v^<<>^<^v^v><^<<<><<^<v><v<>vv>>v><v^<vv<>v^<<^`,
        expected: 10092,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `##########
#..O..O.O#
#......O.#
#.OO..O.O#
#..O@..O.#
#O#..O...#
#O..O..O.#
#.OO.O.OO#
#....O...#
##########

<vv>^<v^>v>^vv^v>v<>v^v<v<^vv<<<^><<><>>v<vvv<>^v^>^<<<><<v<<<v^vv^v>^
vvv<<^>^v^^><<>>><>^<<><^vv^^<>vvv<>><^^v>^>vv<>v<<<<v<^v>^<^^>>>^<v<v
><>vv>v^v^<>><>>>><^^>vv>v<^^^>>v^v^<^^>v^^>v^<^v>v<>>v^v^<v>v^^<^^vv<
<<v<^>>^^^^>>>v^<>vvv^><v<<<>^^^vv^<vvv>^>v<^^^^v<>^>vvvv><>>v^<<^^^^^
^><^><>>><>^^<<^^v>>><^<v>^<vv>>v>>>^v><>^v><<<<v>>v<v<v>vvv>^<><<>^><
^>><>^v<><^vvv<^^<><v<<<<<><^v<<<><<<^^<v<^^^><^>>^<v^><<<^>>^v<v^v<v^
>^>>^v>vv>^<<^v<>><<><<v<<v><>v<^vv<<<>^^v^>^^>>><<^v>>v^v><^^>>^<>vv^
<><^^>^^^<><vvvvv^v<v<<>^v<v>v<<^><<><<><<<^^<<<^<<>><<><^^^>^^<>^>v<>
^^>vv<^v^v<vv>^<><v<^v>^^^>>>^^vvv^>vvv<>>>^<^>>>>>^<<^v>^vvv<>^<><<v>
v^^>>><<^^<>>^v^<v^vv<>v^<<>^<^v^v><^<<<><<^<v><v<>vv>>v><v^<vv<>v^<<^`,
        expected: 9021,
      },
      //       {
      //         input: `#######
      // #...#.#
      // #.....#
      // #..OO@#
      // #..O..#
      // #.....#
      // #######

      // <vv<<^^<<^^`,
      //         expected: 2028,
      //       },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
