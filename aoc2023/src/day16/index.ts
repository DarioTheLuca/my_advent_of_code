import run from "aocrunner";

const parseInput = (rawInput: string) => {
  return rawInput.split("\n");
};

const part1 = (rawInput: string) => {
  const rows = parseInput(rawInput);
  let encounter: Set<string> = new Set();

  const t1 = performance.now();
  dfs(rows, 0, 0, "left", encounter);
  // bfs(rows,0,0,'left',encounter);
  
  const ns = new Set(
    Array.from(encounter).map((e) =>
      e
        .replace("left", "")
        .replace("right", "")
        .replace("up", "")
        .replace("down", ""),
    ),
  );

  return ns.size;
};

function dfs(
  matrix: string[],
  r: number,
  c: number,
  from: string,
  encounter: Set<string>,
) {
  if (encounter.has(r + "-" + from + c)) return;
  encounter.add(r + "-" + from + c);
  const nexts = getNext(matrix, r, c, from);
  const len = nexts.length;
  for (let i = 0; i < len; i++) {
    const curr = nexts[i];
    dfs(matrix, curr.i, curr.j, curr.from, encounter);
  }
}

function bfs(
  matrix: string[],
  r: number,
  c: number,
  from: string,
  encounter: Set<string>,
) {
  const queue = new Queue<{ i: number; j: number; from: string }>();
  queue.enQueue({ i: r, j: c, from: from });

  while (queue.getSize() > 0) {
    const curr = queue.deQueue();
    if (curr !== -1) {
      if (encounter.has(curr.i + "-" + curr.from + curr.j)) continue;
      encounter.add(curr.i + "-" + curr.from + curr.j);
      const nexts = getNext(matrix, curr.i, curr.j, curr.from);
      nexts.forEach((n) => queue.enQueue(n));
    }
  }
}

function getNext(matrix: string[], r: number, c: number, from: string) {
  let clen = matrix[0].length;
  let rlen = matrix.length;
  const currCell = matrix[r][c];
  const result = [];
  if (currCell === ".") {
    if (from === "left" && c + 1 < clen)
      result.push({ i: r, j: c + 1, from: "left" });
    if (from === "right" && c - 1 >= 0)
      result.push({ i: r, j: c - 1, from: "right" });
    if (from === "up" && r + 1 < rlen)
      result.push({ i: r + 1, j: c, from: "up" });
    if (from === "down" && r - 1 >= 0)
      result.push({ i: r - 1, j: c, from: "down" });
  } else if (currCell === "|") {
    if (from === "left" || from === "right") {
      r - 1 >= 0 && result.push({ i: r - 1, j: c, from: "down" });
      r + 1 < rlen && result.push({ i: r + 1, j: c, from: "up" });
    }
    if (from === "up" && r + 1 < rlen)
      result.push({ i: r + 1, j: c, from: "up" });
    if (from === "down" && r - 1 >= 0)
      result.push({ i: r - 1, j: c, from: "down" });
  } else if (currCell === "-") {
    if (from === "up" || from === "down") {
      c - 1 >= 0 && result.push({ i: r, j: c - 1, from: "right" });
      c + 1 < clen && result.push({ i: r, j: c + 1, from: "left" });
    }
    if (from === "left" && c + 1 < clen)
      result.push({ i: r, j: c + 1, from: "left" });
    if (from === "right" && c - 1 >= 0)
      result.push({ i: r, j: c - 1, from: "right" });
  } else if (currCell === "/") {
    if (from === "left" && r - 1 >= 0)
      result.push({ i: r - 1, j: c, from: "down" });
    if (from === "right" && r + 1 < rlen)
      result.push({ i: r + 1, j: c, from: "up" });
    if (from === "up" && c - 1 >= 0)
      result.push({ i: r, j: c - 1, from: "right" });
    if (from === "down" && c + 1 < clen)
      result.push({ i: r, j: c + 1, from: "left" });
  } else if (currCell === "!") {
    if (from === "right" && r - 1 >= 0)
      result.push({ i: r - 1, j: c, from: "down" });
    if (from === "left" && r + 1 < rlen)
      result.push({ i: r + 1, j: c, from: "up" });
    if (from === "down" && c - 1 >= 0)
      result.push({ i: r, j: c - 1, from: "right" });
    if (from === "up" && c + 1 < clen)
      result.push({ i: r, j: c + 1, from: "left" });
  }
  return result;
}

class Queue<T> {
  private map: Map<number, T>;
  private first: number;
  private last: number;
  private size: number;
  constructor() {
    this.map = new Map();
    this.first = -1;
    this.last = -1;
    this.size = 0;
  }

  enQueue(a: T) {
    this.map.set(this.last + 1, a);
    if (this.size === 0) {
      this.first++;
    }
    this.last++;
    this.size++;
  }

  deQueue(): T | -1 {
    const result = this.size > 0 ? this.map.get(this.first)! : -1;
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
}


const part2 = (rawInput: string) => {
  const rows = parseInput(rawInput);
  let max = 0;
  let encounter: Set<string> = new Set();
  for (let i = 0; i < rows.length; i++) {
    dfs(rows, i, 0, "left", encounter);
    // bfs(rows,i,0,'left',encounter)

    const ns = new Set(
      Array.from(encounter).map((e) =>
        e
          .replace("left", "")
          .replace("right", "")
          .replace("up", "")
          .replace("down", ""),
      ),
    );
    max = Math.max(max, ns.size);
    encounter = new Set();

    const t3 = performance.now();
    dfs(rows,0,rows[0].length-1,'right',encounter)
    // bfs(rows, 0, rows[0].length - 1, "right", encounter);
    const t4 = performance.now();

    const nsl = new Set(
      Array.from(encounter).map((e) =>
        e
          .replace("left", "")
          .replace("right", "")
          .replace("up", "")
          .replace("down", ""),
      ),
    );
    max = Math.max(max, nsl.size);
  }
  
  for (let i = 0; i < rows[0].length; i++) {
    encounter = new Set();
    // bfs(rows, 0, i, "up", encounter);
    dfs(rows,0,i,'up',encounter)
    const nst = new Set(
      Array.from(encounter).map((e) =>
        e
          .replace("left", "")
          .replace("right", "")
          .replace("up", "")
          .replace("down", ""),
      ),
    );
    max = Math.max(max, nst.size);
    encounter = new Set();
    // bfs(rows, rows.length - 1, i, "down", encounter);
    dfs(rows,rows.length-1,i,'down',encounter)
    const nsb = new Set(
      Array.from(encounter).map((e) =>
        e
          .replace("left", "")
          .replace("right", "")
          .replace("up", "")
          .replace("down", ""),
      ),
    );
    max = Math.max(max, nsb.size);
  }
  return max;
};

run({
  part1: {
    tests: [
      // {
      //   input: `
      //   .|...!....
      //   |.-.!.....
      //   .....|-...
      //   ........|.
      //   ..........
      //   .........!
      //   ..../.!!..
      //   .-.-/..|..
      //   .|....-|.!
      //   ..//.|....`,
      //   expected: 46,
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: `
      //   .|...!....
      //   |.-.!.....
      //   .....|-...
      //   ........|.
      //   ..........
      //   .........!
      //   ..../.!!..
      //   .-.-/..|..
      //   .|....-|.!
      //   ..//.|....`,
      //   expected: 51,
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
