import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n");

const directions = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

const isCellValid = (matrix, cell) =>
  cell.row >= 0 &&
  cell.col >= 0 &&
  cell.row < matrix.length &&
  cell.col < matrix[0].length;

const percorriRegione = (matrix, currPos) => {
  const { row, col } = currPos;
  const currCell = matrix[row][col];
  let sameRegion = [];
  let possiblePerimeter = [];
  for (const dir of directions) {
    const [r, c] = dir;
    const next = { row: row + r, col: col + c };
    if (!isCellValid(matrix, next)) {
      possiblePerimeter.push([next, dir]);
    } else if (matrix[next.row][next.col] === currCell) {
      sameRegion.push(next);
    } else {
      possiblePerimeter.push([next, dir]);
    }
  }

  return { sameRegion, possiblePerimeter };
};

const merge = (...args) => args.reduce((acc, curr) => acc + curr + ",", "");

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  let sum = 0;

  const seen = new Set();
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[0].length; j++) {
      const id = merge(i, j);
      if (seen.has(id)) continue;
      const currPos = { row: i, col: j };
      const queue = [currPos];
      const area = new Set();

      const perimeter = new Set();
      while (queue.length > 0) {
        const curr = queue.pop();
        area.add(merge(curr.row, curr.col));
        const id = merge(curr.row, curr.col);
        const { possiblePerimeter, sameRegion } = percorriRegione(input, curr);
        sameRegion.forEach((el) => {
          const id = merge(el.row, el.col);
          area.add(merge(el.row, el.col));
          if (seen.has(id)) return;
          queue.push(el);
        });

        possiblePerimeter.forEach(([pos, dir]) => {
          const id = merge(pos.row, pos.col, dir[0], dir[1]);
          perimeter.add(id);
        });
        seen.add(id);
      }

      sum = sum + area.size * perimeter.size;
    }
  }

  return sum;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  let sum = 0;

  const seen = new Set();
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[0].length; j++) {
      const id = merge(i, j);
      if (seen.has(id)) continue;
      const currPos = { row: i, col: j };
      const queue = [currPos];
      const area = new Set();

      const perimeter = new Set();
      while (queue.length > 0) {
        const curr = queue.pop();
        area.add(merge(curr.row, curr.col));
        const id = merge(curr.row, curr.col);
        const { possiblePerimeter, sameRegion } = percorriRegione(input, curr);
        sameRegion.forEach((el) => {
          const id = merge(el.row, el.col);
          area.add(merge(el.row, el.col));
          if (seen.has(id)) return;
          queue.push(el);
        });

        possiblePerimeter.forEach(([pos, dir]) => {
          const id = merge(pos.row, pos.col, dir[0], dir[1]);
          perimeter.add(id);
        });
        seen.add(id);
      }

      let count = 0;

      const pers = Array.from(perimeter);

      const dirs = ["0,1,", "0,-1,", "-1,0,", "1,0,"];

      for (const dir of dirs) {
        let ids = new Map();
        for (const per of pers) {
          const [i, j, d1, d2] = per.split(",").map(Number);
          if (merge(d1, d2) !== dir) continue;
          if (dir === "-1,0," || dir === "1,0,") {
            if (ids.has(i)) {
              ids.get(i).push(j);
            } else {
              ids.set(i, [j]);
            }
          } else {
            if (ids.has(j)) {
              ids.get(j).push(i);
            } else {
              ids.set(j, [i]);
            }
          }
        }
        Array.from(ids.values()).forEach((arr) => {
          const newA = [...arr].sort((a, b) => a - b);
          newA.forEach((el, i) => {
            if (i === 0) {
              count = count + 1;
              return;
            }
            if (el - newA[i - 1] !== 1) {
              count = count + 1;
            }
          });
        });
      }
      sum = sum + area.size * count;
    }
  }

  return sum;
};

run({
  part1: {
    tests: [
      {
        input: `RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE`,
        expected: 1930,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE`,
        expected: 1206,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
