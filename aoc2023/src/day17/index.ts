import run from "aocrunner";

const parseInput = (rawInput: string) => {
  return rawInput.split("\n");
};

const part1 = (rawInput: string) => {
  const rows = parseInput(rawInput);
  return bfs_min(rows, 0, 0, "", 0, 0);
};
function bfs_min(
  matrix: string[],
  r: number,
  c: number,
  from: string,
  heat: number,
  count: number,
) {
  let min = Infinity;
  const rlen = matrix.length;
  const clen = matrix[0].length;
  const queue = new Queue<{
    i: number;
    j: number;
    from: string;
    heat: number;
    count: number;
  }>();
  queue.enQueue({ i: r, j: c, from: from, heat: heat, count: count });
  let mh: Map<string, number> = new Map();
  mh.set(r + "-" + c, 0);

  while (queue.getSize() > 0) {
    const curr = queue.deQueue();
    if (curr !== -1) {
      if (curr.i === rlen - 1 && curr.j === clen - 1) {
        min = Math.min(min, curr.heat);
      } else {
        const nexts = getNext(
          matrix,
          curr.i,
          curr.j,
          curr.from,
          curr.heat,
          curr.count,
        );
        nexts.forEach((n) => {
          if (mh.has(n.i + n.from + n.count + "+-" + n.j)) {
            if (n.heat <= mh.get(n.i + n.from + n.count + "+-" + n.j)!) {
              queue.enQueue(n);
              mh.set(n.i + n.from + n.count + "+-" + n.j, n.heat);
            }
          } else {
            mh.set(n.i + n.from + n.count + "+-" + n.j, n.heat);
            queue.enQueue(n);
          }
        });
      }
    }
  }

  return min;
}

function getNext(
  matrix: string[],
  r: number,
  c: number,
  from: string,
  heat: number,
  count: number,
) {
  let clen = matrix[0].length;
  let rlen = matrix.length;
  const topCell = r - 1 >= 0 ? parseInt(matrix[r - 1][c]) : 0;
  const bottomCell = r + 1 < rlen ? parseInt(matrix[r + 1][c]) : 0;
  const leftCell = c - 1 >= 0 ? parseInt(matrix[r][c - 1]) : 0;
  const rightCell = c + 1 < clen ? parseInt(matrix[r][c + 1]) : 0;

  const result: {
    i: number;
    j: number;
    from: string;
    heat: number;
    count: number;
  }[] = [];
  if (from === "") {
    return [
      {
        i: r,
        j: c + 1,
        from: "left",
        heat: heat + rightCell,
        count: 1,
      },
      { i: r + 1, j: c, from: "up", heat: heat + bottomCell, count: 1 },
    ];
  } else if (from === "left") {
    count < 3 &&
      rightCell > 0 &&
      result.push({
        i: r,
        j: c + 1,
        from: from,
        heat: heat + rightCell,
        count: count + 1,
      });

    bottomCell > 0 &&
      result.push({
        i: r + 1,
        j: c,
        from: "up",
        heat: heat + bottomCell,
        count: 1,
      });

    topCell > 0 &&
      result.push({
        i: r - 1,
        j: c,
        from: "down",
        heat: heat + topCell,
        count: 1,
      });
  } else if (from === "up") {
    count < 3 &&
      bottomCell > 0 &&
      result.push({
        i: r + 1,
        j: c,
        from: from,
        heat: heat + bottomCell,
        count: count + 1,
      });

    rightCell > 0 &&
      result.push({
        i: r,
        j: c + 1,
        from: "left",
        heat: heat + rightCell,
        count: 1,
      });

    leftCell > 0 &&
      result.push({
        i: r,
        j: c - 1,
        from: "right",
        heat: heat + leftCell,
        count: 1,
      });
  } else if (from === "down") {
    count < 3 &&
      topCell > 0 &&
      result.push({
        i: r - 1,
        j: c,
        from: from,
        heat: heat + topCell,
        count: count + 1,
      });

    rightCell > 0 &&
      result.push({
        i: r,
        j: c + 1,
        from: "left",
        heat: heat + rightCell,
        count: 1,
      });

    leftCell > 0 &&
      result.push({
        i: r,
        j: c - 1,
        from: "right",
        heat: heat + leftCell,
        count: 1,
      });
  } else if (from === "right") {
    count < 3 &&
      leftCell > 0 &&
      result.push({
        i: r,
        j: c - 1,
        from: from,
        heat: heat + leftCell,
        count: count + 1,
      });

    bottomCell > 0 &&
      result.push({
        i: r + 1,
        j: c,
        from: "up",
        heat: heat + bottomCell,
        count: 1,
      });

    topCell > 0 &&
      result.push({
        i: r - 1,
        j: c,
        from: "down",
        heat: heat + topCell,
        count: 1,
      });
  }

  return result;
}
function bfs_min2(
  matrix: string[],
  r: number,
  c: number,
  from: string,
  heat: number,
  count: number,
) {
  let min = Infinity;
  const rlen = matrix.length;
  const clen = matrix[0].length;
  const queue = new Queue<{
    i: number;
    j: number;
    from: string;
    heat: number;
    count: number;
  }>();
  queue.enQueue({ i: r, j: c, from: from, heat: heat, count: count });
  let mh: Map<string, number> = new Map();
  mh.set(r + "-" + c, 0);

  while (queue.getSize() > 0) {
    const curr = queue.deQueue();
    if (curr !== -1) {
      if (curr.i === rlen - 1 && curr.j === clen - 1 && curr.count > 3) {
        min = Math.min(min, curr.heat);
      } else {
        const nexts = getNext2(
          matrix,
          curr.i,
          curr.j,
          curr.from,
          curr.heat,
          curr.count,
        );
        nexts.forEach((n) => {
          if (mh.has(n.i + n.from + n.count + "+-" + n.j)) {
            if (n.heat <= mh.get(n.i + n.from + n.count + "+-" + n.j)!) {
              queue.enQueue(n);
              mh.set(n.i + n.from + n.count + "+-" + n.j, n.heat);
            }
          } else {
            mh.set(n.i + n.from + n.count + "+-" + n.j, n.heat);
            queue.enQueue(n);
          }
        });
      }
    }
  }

  return min;
}
function getNext2(
  matrix: string[],
  r: number,
  c: number,
  from: string,
  heat: number,
  count: number,
) {
  let clen = matrix[0].length;
  let rlen = matrix.length;
  const topCell = r - 1 >= 0 ? parseInt(matrix[r - 1][c]) : 0;
  const bottomCell = r + 1 < rlen ? parseInt(matrix[r + 1][c]) : 0;
  const leftCell = c - 1 >= 0 ? parseInt(matrix[r][c - 1]) : 0;
  const rightCell = c + 1 < clen ? parseInt(matrix[r][c + 1]) : 0;

  const result: {
    i: number;
    j: number;
    from: string;
    heat: number;
    count: number;
  }[] = [];
  if (from === "") {
    return [
      {
        i: r,
        j: c + 1,
        from: "left",
        heat: heat + rightCell,
        count: 1,
      },
      { i: r + 1, j: c, from: "up", heat: heat + bottomCell, count: 1 },
    ];
  } else if (from === "left") {
    if (count < 4) {
      rightCell > 0 &&
        result.push({
          i: r,
          j: c + 1,
          from: from,
          heat: heat + rightCell,
          count: count + 1,
        });
    } else {
      count < 10 &&
        rightCell > 0 &&
        result.push({
          i: r,
          j: c + 1,
          from: from,
          heat: heat + rightCell,
          count: count + 1,
        });
      bottomCell > 0 &&
        result.push({
          i: r + 1,
          j: c,
          from: "up",
          heat: heat + bottomCell,
          count: 1,
        });

      topCell > 0 &&
        result.push({
          i: r - 1,
          j: c,
          from: "down",
          heat: heat + topCell,
          count: 1,
        });
    }
  } else if (from === "up") {
    if (count < 4) {
      bottomCell > 0 &&
        result.push({
          i: r + 1,
          j: c,
          from: from,
          heat: heat + bottomCell,
          count: count + 1,
        });
    } else {
      count < 10 &&
        bottomCell > 0 &&
        result.push({
          i: r + 1,
          j: c,
          from: from,
          heat: heat + bottomCell,
          count: count + 1,
        });

      rightCell > 0 &&
        result.push({
          i: r,
          j: c + 1,
          from: "left",
          heat: heat + rightCell,
          count: 1,
        });

      leftCell > 0 &&
        result.push({
          i: r,
          j: c - 1,
          from: "right",
          heat: heat + leftCell,
          count: 1,
        });
    }
  } else if (from === "down") {
    if (count < 4) {
      topCell > 0 &&
        result.push({
          i: r - 1,
          j: c,
          from: from,
          heat: heat + topCell,
          count: count + 1,
        });
    } else {
      count < 10 &&
        topCell > 0 &&
        result.push({
          i: r - 1,
          j: c,
          from: from,
          heat: heat + topCell,
          count: count + 1,
        });

      rightCell > 0 &&
        result.push({
          i: r,
          j: c + 1,
          from: "left",
          heat: heat + rightCell,
          count: 1,
        });

      leftCell > 0 &&
        result.push({
          i: r,
          j: c - 1,
          from: "right",
          heat: heat + leftCell,
          count: 1,
        });
    }
  } else if (from === "right") {
    if (count < 4) {
      leftCell > 0 &&
        result.push({
          i: r,
          j: c - 1,
          from: from,
          heat: heat + leftCell,
          count: count + 1,
        });
    } else {
      count < 10 &&
        leftCell > 0 &&
        result.push({
          i: r,
          j: c - 1,
          from: from,
          heat: heat + leftCell,
          count: count + 1,
        });

      bottomCell > 0 &&
        result.push({
          i: r + 1,
          j: c,
          from: "up",
          heat: heat + bottomCell,
          count: 1,
        });

      topCell > 0 &&
        result.push({
          i: r - 1,
          j: c,
          from: "down",
          heat: heat + topCell,
          count: 1,
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

const part2 = (rawInput: string) => {
  const rows = parseInput(rawInput);

  return bfs_min2(rows, 0, 0, "", 0, 0);
};

run({
  part1: {
    tests: [
      // {
      //   input: `
      //   2413432311323
      //   3215453535623
      //   3255245654254
      //   3446585845452
      //   4546657867536
      //   1438598798454
      //   4457876987766
      //   3637877979653
      //   4654967986887
      //   4564679986453
      //   1224686865563
      //   2546548887735
      //   4322674655533`,
      //   expected: 102,
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        2413432311323
        3215453535623
        3255245654254
        3446585845452
        4546657867536
        1438598798454
        4457876987766
        3637877979653
        4654967986887
        4564679986453
        1224686865563
        2546548887735
        4322674655533`,
        expected: 94,
      },
      {
        input: `
        111111111111
        999999999991
        999999999991
        999999999991
        999999999991`,
        expected: 71,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
