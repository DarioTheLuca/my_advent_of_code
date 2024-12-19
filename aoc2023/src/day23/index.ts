import run from "aocrunner";

const parseInput = (rawInput: string) => {
  return rawInput.split("\n");
};

const part1 = (rawInput: string) => {
  const rows = parseInput(rawInput);
  const rlen = rows.length;
  const clen = rows[0].length;
  const startY = rows[0].indexOf(".");
  const start = [0, startY];
  const endY = rows[rlen - 1].indexOf(".");
  const end = [rlen - 1, endY];
  let max = 0;

  const queue = new Stack();
  const map = new Map<string, number>();

  queue.enQueue({
    r: start[0],
    c: start[1],
    from: "up",
    count: 0,
    prev: [start[0] + "-" + start[1]],
  });
  map.set(JSON.stringify({ r: start[0], c: start[1], from: "up" }), 0);

  while (queue.getSize() > 0) {
    const curr = queue.deQueue();
    if (curr !== -1) {
      // const key = JSON.stringify({r:curr.r,c:curr.c,from:curr.from,prev:curr.prev})
      // console.log("curr",curr)
      if (curr.c === end[1] && curr.r === end[0]) {
        // console.log("qui")
        max = Math.max(max, curr.count);
        continue;
      }
      const nexts = getNexts(rows, rlen, clen, curr);
      nexts.forEach((n) => {
        const key = JSON.stringify({ r: n.r, c: n.c, from: n.from });
        if (map.has(key)) {
          map.get(key)! < n.count && queue.enQueue(n);
        } else {
          map.set(key, n.count);
          queue.enQueue(n);
        }
      });
    }
  }

  // console.log("s-e", start, end);

  // console.log("rows", rows);
  return max;
};

function getNexts(
  matrix: string[],
  rlen: number,
  clen: number,
  point: { r: number; c: number; from: string; count: number; prev: string[] },
) {
  const { r, c, from, count, prev } = point;
  const topCell =
    r - 1 >= 0 && !prev.includes(r - 1 + "-" + c) ? matrix[r - 1][c] : 0;
  const bottomCell =
    r + 1 < rlen && !prev.includes(r + 1 + "-" + c) ? matrix[r + 1][c] : 0;
  const leftCell =
    c - 1 >= 0 && !prev.includes(r + "-" + (c - 1)) ? matrix[r][c - 1] : 0;
  const rightCell =
    c + 1 < clen && !prev.includes(r + "-" + (c + 1)) ? matrix[r][c + 1] : 0;

  const currCell = matrix[r][c];
  const result: {
    r: number;
    c: number;
    from: string;
    count: number;
    prev: string[];
  }[] = [];

  if (currCell === ">" && rightCell)
    return [
      {
        r: r,
        c: c + 1,
        from: "left",
        count: count + 1,
        prev: prev.concat(r + "-" + (c + 1)),
      },
    ];
  if (currCell === "<" && leftCell)
    return [
      {
        r: r,
        c: c - 1,
        from: "right",
        count: count + 1,
        prev: prev.concat(r + "-" + (c - 1)),
      },
    ];
  if (currCell === "v" && bottomCell)
    return [
      {
        r: r + 1,
        c: c,
        from: "up",
        count: count + 1,
        prev: prev.concat(r + 1 + "-" + c),
      },
    ];
  if (currCell === "^" && topCell)
    return [
      {
        r: r - 1,
        c: c,
        from: "down",
        count: count + 1,
        prev: prev.concat(r - 1 + "-" + c),
      },
    ];

  if (currCell === ".") {
    if (from === "left") {
      topCell &&
        topCell !== "#" &&
        result.push({
          r: r - 1,
          c: c,
          from: "down",
          count: count + 1,
          prev: prev.concat(r - 1 + "-" + c),
        });
      bottomCell &&
        bottomCell !== "#" &&
        result.push({
          r: r + 1,
          c: c,
          from: "up",
          count: count + 1,
          prev: prev.concat(r + 1 + "-" + c),
        });
      rightCell &&
        rightCell !== "#" &&
        result.push({
          r: r,
          c: c + 1,
          from: from,
          count: count + 1,
          prev: prev.concat(r + "-" + (c + 1)),
        });
    } else if (from === "right") {
      topCell &&
        topCell !== "#" &&
        result.push({
          r: r - 1,
          c: c,
          from: "down",
          count: count + 1,
          prev: prev.concat(r - 1 + "-" + c),
        });
      bottomCell &&
        bottomCell !== "#" &&
        result.push({
          r: r + 1,
          c: c,
          from: "up",
          count: count + 1,
          prev: prev.concat(r + 1 + "-" + c),
        });
      leftCell &&
        leftCell !== "#" &&
        result.push({
          r: r,
          c: c - 1,
          from: from,
          count: count + 1,
          prev: prev.concat(r + "-" + (c - 1)),
        });
    } else if (from === "down") {
      topCell &&
        topCell !== "#" &&
        result.push({
          r: r - 1,
          c: c,
          from: from,
          count: count + 1,
          prev: prev.concat(r - 1 + "-" + c),
        });
      leftCell &&
        leftCell !== "#" &&
        result.push({
          r: r,
          c: c - 1,
          from: "right",
          count: count + 1,
          prev: prev.concat(r + "-" + (c - 1)),
        });
      rightCell &&
        rightCell !== "#" &&
        result.push({
          r: r,
          c: c + 1,
          from: "left",
          count: count + 1,
          prev: prev.concat(r + "-" + (c + 1)),
        });
    } else if (from === "up") {
      bottomCell &&
        bottomCell !== "#" &&
        result.push({
          r: r + 1,
          c: c,
          from: from,
          count: count + 1,
          prev: prev.concat(r + 1 + "-" + c),
        });
      leftCell &&
        leftCell !== "#" &&
        result.push({
          r: r,
          c: c - 1,
          from: "right",
          count: count + 1,
          prev: prev.concat(r + "-" + (c - 1)),
        });
      rightCell &&
        rightCell !== "#" &&
        result.push({
          r: r,
          c: c + 1,
          from: "left",
          count: count + 1,
          prev: prev.concat(r + "-" + (c + 1)),
        });
    }
  }

  return result;
}

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

type T = { r: number; c: number; from: string; count: number; prev: string[] };

class Stack {
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
    if (!this.set.has(a.r + "" + a.c + "" + a.prev + a.from)) {
      this.map.set(this.last + 1, a);
      this.set.add(a.r + "" + a.c + "" + a.prev + a.from);
      if (this.size === 0) {
        this.first++;
      }
      this.last++;
      this.size++;
    }
  }

  deQueue(): T | -1 {
    const result = this.size > 0 ? this.map.get(this.last)! : -1;
    result !== -1 &&
      this.set.delete(
        result.r + "" + result.c + "" + result.prev + result.from,
      );
    this.map.delete(this.last);
    this.size--;
    if (this.size > 0) {
      this.last--;
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

function getNexts2(
  matrix: string[],
  rlen: number,
  clen: number,
  point: { r: number; c: number; from: string; count: number; prev: string[] },
) {
  const { r, c, from, count, prev } = point;
  const topCell =
    r - 1 >= 0 && !prev.includes(r - 1 + "-" + c) ? matrix[r - 1][c] : 0;
  const bottomCell =
    r + 1 < rlen && !prev.includes(r + 1 + "-" + c) ? matrix[r + 1][c] : 0;
  const leftCell =
    c - 1 >= 0 && !prev.includes(r + "-" + (c - 1)) ? matrix[r][c - 1] : 0;
  const rightCell =
    c + 1 < clen && !prev.includes(r + "-" + (c + 1)) ? matrix[r][c + 1] : 0;

  const currCell = matrix[r][c];
  const result: {
    r: number;
    c: number;
    from: string;
    count: number;
    prev: string[];
  }[] = [];

  if (currCell !== "#") {
    if (from === "left") {
      topCell &&
        topCell !== "#" &&
        result.push({
          r: r - 1,
          c: c,
          from: "down",
          count: count + 1,
          prev: [...prev, r - 1 + "-" + c],
        });
      bottomCell &&
        bottomCell !== "#" &&
        result.push({
          r: r + 1,
          c: c,
          from: "up",
          count: count + 1,
          prev: [...prev, r + 1 + "-" + c],
        });
      rightCell &&
        rightCell !== "#" &&
        result.push({
          r: r,
          c: c + 1,
          from: from,
          count: count + 1,
          prev: [...prev, r + "-" + (c + 1)],
        });
    } else if (from === "right") {
      topCell &&
        topCell !== "#" &&
        result.push({
          r: r - 1,
          c: c,
          from: "down",
          count: count + 1,
          prev: [...prev, r - 1 + "-" + c],
        });
      bottomCell &&
        bottomCell !== "#" &&
        result.push({
          r: r + 1,
          c: c,
          from: "up",
          count: count + 1,
          prev: [...prev, r + 1 + "-" + c],
        });
      leftCell &&
        leftCell !== "#" &&
        result.push({
          r: r,
          c: c - 1,
          from: from,
          count: count + 1,
          prev: [...prev, r + "-" + (c - 1)],
        });
    } else if (from === "down") {
      topCell &&
        topCell !== "#" &&
        result.push({
          r: r - 1,
          c: c,
          from: from,
          count: count + 1,
          prev: [...prev, r - 1 + "-" + c],
        });
      leftCell &&
        leftCell !== "#" &&
        result.push({
          r: r,
          c: c - 1,
          from: "right",
          count: count + 1,
          prev: [...prev, r + "-" + (c - 1)],
        });
      rightCell &&
        rightCell !== "#" &&
        result.push({
          r: r,
          c: c + 1,
          from: "left",
          count: count + 1,
          prev: [...prev, r + "-" + (c + 1)],
        });
    } else if (from === "up") {
      bottomCell &&
        bottomCell !== "#" &&
        result.push({
          r: r + 1,
          c: c,
          from: from,
          count: count + 1,
          prev: [...prev, r + 1 + "-" + c],
        });
      leftCell &&
        leftCell !== "#" &&
        result.push({
          r: r,
          c: c - 1,
          from: "right",
          count: count + 1,
          prev: [...prev, r + "-" + (c - 1)],
        });
      rightCell &&
        rightCell !== "#" &&
        result.push({
          r: r,
          c: c + 1,
          from: "left",
          count: count + 1,
          prev: [...prev, r + "-" + (c + 1)],
        });
    }
  }

  return result;
}

function getNexts3(
  matrix: string[],
  rlen: number,
  clen: number,
  point: { r: number; c: number; from: string; count: number; prev: string[] },
) {
  const { r, c, from, count, prev } = point;
  const topCell =
    r - 1 >= 0 && !prev.includes(r - 1 + "-" + c) ? matrix[r - 1][c] : 0;
  const bottomCell =
    r + 1 < rlen && !prev.includes(r + 1 + "-" + c) ? matrix[r + 1][c] : 0;
  const leftCell =
    c - 1 >= 0 && !prev.includes(r + "-" + (c - 1)) ? matrix[r][c - 1] : 0;
  const rightCell =
    c + 1 < clen && !prev.includes(r + "-" + (c + 1)) ? matrix[r][c + 1] : 0;

  const currCell = matrix[r][c];
  const result: {
    r: number;
    c: number;
    from: string;
    count: number;
    prev: string[];
  }[] = [];

  if (currCell !== "#") {
    if (from === "left") {
      topCell &&
        topCell !== "#" &&
        result.push({
          r: r - 1,
          c: c,
          from: "down",
          count: count + 1,
          prev: prev.concat(r - 1 + "-" + c),
        });
      bottomCell &&
        bottomCell !== "#" &&
        result.push({
          r: r + 1,
          c: c,
          from: "up",
          count: count + 1,
          prev: prev.concat(r + 1 + "-" + c),
        });
      rightCell &&
        rightCell !== "#" &&
        result.push({
          r: r,
          c: c + 1,
          from: from,
          count: count + 1,
          prev: prev.concat(r + "-" + (c + 1)),
        });
    } else if (from === "right") {
      topCell &&
        topCell !== "#" &&
        result.push({
          r: r - 1,
          c: c,
          from: "down",
          count: count + 1,
          prev: prev.concat(r - 1 + "-" + c),
        });
      bottomCell &&
        bottomCell !== "#" &&
        result.push({
          r: r + 1,
          c: c,
          from: "up",
          count: count + 1,
          prev: prev.concat(r + 1 + "-" + c),
        });
      leftCell &&
        leftCell !== "#" &&
        result.push({
          r: r,
          c: c - 1,
          from: from,
          count: count + 1,
          prev: prev.concat(r + "-" + (c - 1)),
        });
    } else if (from === "down") {
      topCell &&
        topCell !== "#" &&
        result.push({
          r: r - 1,
          c: c,
          from: from,
          count: count + 1,
          prev: prev.concat(r - 1 + "-" + c),
        });
      leftCell &&
        leftCell !== "#" &&
        result.push({
          r: r,
          c: c - 1,
          from: "right",
          count: count + 1,
          prev: prev.concat(r + "-" + (c - 1)),
        });
      rightCell &&
        rightCell !== "#" &&
        result.push({
          r: r,
          c: c + 1,
          from: "left",
          count: count + 1,
          prev: prev.concat(r + "-" + (c + 1)),
        });
    } else if (from === "up") {
      bottomCell &&
        bottomCell !== "#" &&
        result.push({
          r: r + 1,
          c: c,
          from: from,
          count: count + 1,
          prev: prev.concat(r + 1 + "-" + c),
        });
      leftCell &&
        leftCell !== "#" &&
        result.push({
          r: r,
          c: c - 1,
          from: "right",
          count: count + 1,
          prev: prev.concat(r + "-" + (c - 1)),
        });
      rightCell &&
        rightCell !== "#" &&
        result.push({
          r: r,
          c: c + 1,
          from: "left",
          count: count + 1,
          prev: prev.concat(r + "-" + (c + 1)),
        });
    }
  }

  return result;
}

const part2 = (rawInput: string) => {
  const rows = parseInput(rawInput);
  const rlen = rows.length;
  const clen = rows[0].length;
  const startY = rows[0].indexOf(".");
  const start = [0, startY];
  const endY = rows[rlen - 1].indexOf(".");
  const end = [rlen - 1, endY];
  let max = 0;

  const queue = new Stack();
  const map = new Map<string, number>();

  queue.enQueue({
    r: start[0],
    c: start[1],
    from: "up",
    count: 0,
    prev: [start[0] + "-" + start[1]],
  });
  // map.set(start[0]+''+'up'+''+start[1],0);

  while (queue.getSize() > 0) {
    const curr = queue.deQueue();
    if (curr !== -1) {
      // const key = JSON.stringify({r:curr.r,c:curr.c,from:curr.from,prev:curr.prev})
      // console.log("curr",curr)
      if (curr.c === end[1] && curr.r === end[0]) {
        // console.log("qui")
        max = Math.max(max, curr.count);
        continue;
      }
      const nexts = getNexts3(rows, rlen, clen, curr);
      nexts.forEach((n) => {
        // const key =n.r+''+n.from+''+n.c;
        // if(map.has(key) ){
        //   map.get(key)!<n.count &&  queue.enQueue(n);
        //   map.delete(key)
        // }else{
        //   map.set(key,n.count);
        queue.enQueue(n);
        // }
      });
    }
  }

  // console.log("s-e", start, end);

  // console.log("rows", rows);
  return max;
};

run({
  part1: {
    tests: [
      {
        input: `
        #.#####################
        #.......#########...###
        #######.#########.#.###
        ###.....#.>.>.###.#.###
        ###v#####.#v#.###.#.###
        ###.>...#.#.#.....#...#
        ###v###.#.#.#########.#
        ###...#.#.#.......#...#
        #####.#.#.#######.#.###
        #.....#.#.#.......#...#
        #.#####.#.#.#########v#
        #.#...#...#...###...>.#
        #.#.#v#######v###.###v#
        #...#.>.#...>.>.#.###.#
        #####v#.#.###v#.#.###.#
        #.....#...#...#.#.#...#
        #.#########.###.#.#.###
        #...###...#...#...#.###
        ###.###.#.###v#####v###
        #...#...#.#.>.>.#.>.###
        #.###.###.#.###.#.#v###
        #.....###...###...#...#
        #####################.#`,
        expected: 94,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        #.#####################
        #.......#########...###
        #######.#########.#.###
        ###.....#.>.>.###.#.###
        ###v#####.#v#.###.#.###
        ###.>...#.#.#.....#...#
        ###v###.#.#.#########.#
        ###...#.#.#.......#...#
        #####.#.#.#######.#.###
        #.....#.#.#.......#...#
        #.#####.#.#.#########v#
        #.#...#...#...###...>.#
        #.#.#v#######v###.###v#
        #...#.>.#...>.>.#.###.#
        #####v#.#.###v#.#.###.#
        #.....#...#...#.#.#...#
        #.#########.###.#.#.###
        #...###...#...#...#.###
        ###.###.#.###v#####v###
        #...#...#.#.>.>.#.>.###
        #.###.###.#.###.#.#v###
        #.....###...###...#...#
        #####################.#`,
        expected: 154,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
