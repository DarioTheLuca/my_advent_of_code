import run from "aocrunner";

const parseInput = (rawInput: string) => {
  return rawInput.split("\n");
};
function p(sPos: { i: number; j: number }, steps: number, rows: string[]) {
  const rlen = rows.length;
  const clen = rows[0].length;
  const queue = new Queue<{ i: number; j: number; n: number }>();
  let result = findNextSteps(rows, sPos!.i, sPos!.j, rlen, clen);
  result.forEach((r) => queue.enQueue({ i: r.i, j: r.j, n: 1 }));
  let count = 1;
  while (queue.getSize() > 0) {
    let curr = queue.deQueue();
    if (curr !== -1) {
      let n = curr.n;
      if (n > steps) break;
      if (n === steps) count++;
      let result = findNextSteps(rows, curr.i, curr.j, rlen, clen);

      result.forEach((r) => queue.enQueue({ i: r.i, j: r.j, n: n + 1 }));
    }
  }
  return count;
}
const part1 = (rawInput: string) => {
  const rows = parseInput(rawInput);
  let steps = 6;
  const rlen = rows.length;
  const x = (rlen - 1) / 2;
  let sPos = { i: x, j: x };

  return p(sPos, steps, rows);
};
class Queue<T> {
  private map: Map<number, T>;
  private first: number;
  private last: number;
  private size: number;
  private set: Set<string>;

  constructor() {
    this.map = new Map();
    this.first = -1;
    this.last = -1;
    this.size = 0;
    this.set = new Set();
  }

  enQueue(a: T) {
    if (!this.set.has(JSON.stringify(a))) {
      this.map.set(this.last + 1, a);
      this.set.add(JSON.stringify(a));
      if (this.size === 0) {
        this.first++;
      }
      this.last++;
      this.size++;
    }
  }

  deQueue(): T | -1 {
    const result = this.size > 0 ? this.map.get(this.first)! : -1;
    result !== -1 && this.set.delete(JSON.stringify(this.map.get(this.first)!));
    this.map.delete(this.first);
    this.size--;
    if (this.size > 0) {
      this.first++;
    } else {
      this.first = -1;
      this.last = -1;
    }
    return result;
  }

  getSize() {
    return this.size;
  }

  has(a: T) {
    return this.set.has(JSON.stringify(a));
  }
}
function findNextSteps(
  matrix: string[],
  r: number,
  c: number,
  rlen: number,
  clen: number,
) {
  let nextSteps: { i: number; j: number }[] = [];
  if (r - 1 >= 0 && matrix[r - 1][c] === ".")
    nextSteps.push({ i: r - 1, j: c });
  if (r + 1 < rlen && matrix[r + 1][c] === ".")
    nextSteps.push({ i: r + 1, j: c });
  if (c - 1 >= 0 && matrix[r][c - 1] === ".")
    nextSteps.push({ i: r, j: c - 1 });
  if (c + 1 < clen && matrix[r][c + 1] === ".")
    nextSteps.push({ i: r, j: c + 1 });
  return nextSteps;
}

const part2 = (rawInput: string) => {
  const rows = parseInput(rawInput);
  // let steps =50;
  const D = 26501365;
  //result 594606492802848
  const w = rows.length;
  const x = (w - 1) / 2;
  let sPos = { i: x, j: x };

  const N = (D - x) / w;
  const E = p(sPos, 3 * w, rows);
  const O = p(sPos, 3 * w + 1, rows);

  const sA = (3 * w - 3) / 2;
  const sB = (w - 3) / 2;
  // const sT = x;

  const A =
    p({ i: 0, j: 0 }, sA, rows) +
    p({ i: 0, j: w - 1 }, sA, rows) +
    p({ i: w - 1, j: 0 }, sA, rows) +
    p({ i: w - 1, j: w - 1 }, sA, rows);
  const B =
    p({ i: 0, j: 0 }, sB, rows) +
    p({ i: 0, j: w - 1 }, sB, rows) +
    p({ i: w - 1, j: 0 }, sB, rows) +
    p({ i: w - 1, j: w - 1 }, sB, rows);
  const T =
    p({ i: 0, j: x }, w, rows) +
    p({ i: x, j: 0 }, w, rows) +
    p({ i: w - 1, j: x }, w, rows) +
    p({ i: x, j: w - 1 }, w, rows);

  const result = O * ((N - 1) ^ 2) + E * (N ^ 2) + (N - 1) * A + N * B + T;

  return result;
};

run({
  part1: {
    tests: [
      {
        input: `
        ...........
        .....###.#.
        .###.##..#.
        ..#.#...#..
        ....#.#....
        .##..S####.
        .##..#...#.
        .......##..
        .##.#.####.
        .##..##.##.
        ...........`,
        expected: 16,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: `
      //   ...........
      //   .....###.#.
      //   .###.##..#.
      //   ..#.#...#..
      //   ....#.#....
      //   .##..S####.
      //   .##..#...#.
      //   .......##..
      //   .##.#.####.
      //   .##..##.##.
      //   ...........`,
      //   expected: 1594,
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
