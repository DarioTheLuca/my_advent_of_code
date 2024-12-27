import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n");

const numberPad = [
  ["7", "8", "9"],
  ["4", "5", "6"],
  ["1", "2", "3"],
  ["#", "0", "A"],
];

const movePad = [
  ["#", "^", "A"],
  ["<", "v", ">"],
];

const directions = {
  "^": [-1, 0],
  v: [1, 0],
  "<": [0, -1],
  ">": [0, 1],
};

const directionKeys = ["^", "v", "<", ">"];

const isValidCell = (matrix, r, c) =>
  r >= 0 &&
  c >= 0 &&
  r < matrix.length &&
  c < matrix[0].length &&
  matrix[r][c] !== "#";

const findMinLen = (matrix, fromPos, toPos) => {
  let min = Infinity;
  // console.log("frompos topos", fromPos, toPos);
  const countMap = new Map();
  const queue = [[...fromPos, 0, ""]];
  while (queue.length > 0) {
    // console.log("queue",queue)
    const [r, c, count, dirs] = queue.shift();
    // console.log("r,c", r, c);
    if (r === toPos[0] && c === toPos[1]) {
      min = Math.min(count, min);
      if (countMap.has(count)) {
        countMap.get(count).push(dirs);
      } else {
        countMap.set(count, [dirs]);
      }
      continue;
    }

    if (count > 6) continue;
    if (count > min) continue;
    for (const key of directionKeys) {
      const [dr, dc] = directions[key];
      const [nr, nc] = [r + dr, c + dc];
      if (isValidCell(matrix, nr, nc)) {
        let newDirs = dirs + key;
        const next = [nr, nc, count + 1, newDirs];
        queue.push(next);
      }
    }
  }
  // console.log("countMap", countMap);
  // console.log("min", min);

  return countMap.get(min);
};

const getPossiblePaths = (matrix, code, startPos, posMap) => {
  let fromPos = startPos;
  const map = new Map();
  for (const c of code) {
    // console.log("posMap", c, posMap);
    const toPos = posMap.get(c);
    const minPaths = findMinLen(matrix, fromPos, toPos);

    map.set(map.size, minPaths);
    fromPos = toPos;
  }

  const mergeArray = (arr1, arr2) => {
    const newLen = arr1.length * arr2.length;
    const newArr = [];
    for (let i = 0; i < arr1.length; i++) {
      const curr1 = arr1[i];
      for (let j = 0; j < arr2.length; j++) {
        const curr2 = arr2[j];
        newArr.push(curr1 + "A" + curr2);
      }
    }
    return newArr;
  };

  const possiblePaths = Array.from(map.values()).reduce((acc, curr) => {
    acc = acc.length === 0 ? curr : mergeArray(acc, curr);
    return acc;
  }, []);

  return possiblePaths;
};
const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  let result = 0;
  const startCodePad = [3, 2];
  const startMovePad = [0, 2];

  const posNumberMap = new Map();
  for (let i = 0; i < numberPad.length; i++) {
    for (let j = 0; j < numberPad[0].length; j++) {
      let curr = numberPad[i][j];
      posNumberMap.set(curr, [i, j]);
    }
  }

  const posMoveMap = new Map();

  for (let i = 0; i < movePad.length; i++) {
    for (let j = 0; j < movePad[0].length; j++) {
      let curr = movePad[i][j];
      posMoveMap.set(curr, [i, j]);
    }
  }

  // console.log("posMoveMap", posMoveMap);

  for (const code of input) {
    const possiblePaths = getPossiblePaths(
      numberPad,
      code,
      startCodePad,
      posNumberMap,
    );
    let min = Infinity;
    let num = Number(code.replace("A", ""));
    // console.log("possiblePaths", possiblePaths);

    for (const possiblePath of possiblePaths.map((el) => el + "A")) {
      // console.log("posMoveMap", posMoveMap);
      const possiblePaths = getPossiblePaths(
        movePad,
        possiblePath,
        startMovePad,
        posMoveMap,
      );
      // console.log("possiblePaths", possiblePaths);

      for (const possiblePath of possiblePaths.map((el) => el + "A")) {
        const possiblePaths = getPossiblePaths(
          movePad,
          possiblePath,
          startMovePad,
          posMoveMap,
        );
        // console.log("possiblePaths", possiblePaths);

        possiblePaths.forEach((el) => {
          min = Math.min(el.length + 1, min);
        });
      }
    }
    // console.log("num,min", num, min);
    result = result + num * min;
  }

  return result;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const keycodes = input;
  const memo = {};
  const BFS_DIRECTIONS = {
    "^": { x: 0, y: -1 },
    ">": { x: 1, y: 0 },
    v: { x: 0, y: 1 },
    "<": { x: -1, y: 0 },
  };

  // normal keypad button positions
  const KEYPAD = {
    7: { x: 0, y: 0 },
    8: { x: 1, y: 0 },
    9: { x: 2, y: 0 },
    4: { x: 0, y: 1 },
    5: { x: 1, y: 1 },
    6: { x: 2, y: 1 },
    1: { x: 0, y: 2 },
    2: { x: 1, y: 2 },
    3: { x: 2, y: 2 },
    X: { x: 0, y: 3 },
    0: { x: 1, y: 3 },
    A: { x: 2, y: 3 },
  };

  // direction keypad button positions
  const DIRECTIONS = {
    X: { x: 0, y: 0 },
    "^": { x: 1, y: 0 },
    A: { x: 2, y: 0 },
    "<": { x: 0, y: 1 },
    v: { x: 1, y: 1 },
    ">": { x: 2, y: 1 },
  };

  // generate all paths from one button to another
  const getCommand = (input, start, end) => {
    const queue = [{ ...input[start], path: "" }];
    const distances = {};

    if (start === end) return ["A"];

    let allPaths = [];
    while (queue.length) {
      const current = queue.shift();
      if (current === undefined) break;

      // find all paths
      if (current.x === input[end].x && current.y === input[end].y)
        allPaths.push(current.path + "A");
      if (
        distances[`${current.x},${current.y}`] !== undefined &&
        distances[`${current.x},${current.y}`] < current.path.length
      )
        continue;

      Object.entries(BFS_DIRECTIONS).forEach(([direction, vector]) => {
        const position = { x: current.x + vector.x, y: current.y + vector.y };

        // don't allow traversal into the blank areas
        if (input.X.x === position.x && input.X.y === position.y) return;

        // only traverse if there is a button to hit
        const button = Object.values(input).find(
          (button) => button.x === position.x && button.y === position.y,
        );
        if (button !== undefined) {
          const newPath = current.path + direction;
          if (
            distances[`${position.x},${position.y}`] === undefined ||
            distances[`${position.x},${position.y}`] >= newPath.length
          ) {
            queue.push({ ...position, path: newPath });
            distances[`${position.x},${position.y}`] = newPath.length;
          }
        }
      });
    }

    // sort from smallest to largest paths
    return allPaths.sort((a, b) => a.length - b.length);
  };

  // find the smallest amount of button presses, given the robot and code to enter
  const getKeyPresses = (input, code, robot, memo) => {
    const key = `${code},${robot}`;
    if (memo[key] !== undefined) return memo[key];

    let current = "A";
    let length = 0;
    for (let i = 0; i < code.length; i++) {
      // find the smallest move for each transition
      const moves = getCommand(input, current, code[i]);
      if (robot === 0) length += moves[0].length;
      else
        length += Math.min(
          ...moves.map((move) =>
            getKeyPresses(DIRECTIONS, move, robot - 1, memo),
          ),
        );
      current = code[i];
    }

    memo[key] = length;
    return length;
  };

  return keycodes.reduce((sum, code) => {
    const numerical = parseInt(
      code
        .split("")
        .filter((character) => character.match(/\d/))
        .join(""),
    );
    return sum + numerical * getKeyPresses(KEYPAD, code, 25, memo);
  }, 0);
};

run({
  part1: {
    tests: [
      {
        input: `029A
980A
179A
456A
379A`,
        expected: 126384,
      },
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
