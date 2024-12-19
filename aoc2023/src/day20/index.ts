import run from "aocrunner";

const parseInput = (rawInput: string) => {
  return rawInput.split("\n").map((r) => r.split(" -> "));
};

const part1 = (rawInput: string) => {
  const rows = parseInput(rawInput);
  let map = new Map<
    string,
    {
      type: string;
      state: boolean;
      to: Set<string>;
      input?: { [from: string]: boolean };
    }
  >();
  const cM = new Set<string>();
  rows.forEach(([name, to]) => {
    const toArr = new Set(to.split(", "));
    if (name === "broadcaster") {
      map.set(name, { type: name, state: false, to: toArr });
    } else {
      const type = name[0];
      const key = name.substring(1);
      map.set(key, { type: type, state: false, to: toArr });
      if (type === "&") cM.add(key);
    }
  });

  Array.from(map.keys()).forEach((k) => {
    const obj = map.get(k)!;
    const to = obj.to;
    cM.forEach((c) => {
      if (to.has(c)) {
        const cm = map.get(c)!;
        const newCm = {
          ...cm,
          input: { ...cm?.input, [k]: false },
        };
        map.set(c, newCm);
      }
    });
  });
  let countLoop = 0;
  let countHigh = 0;
  let countLow = 0;

  let limit = 1000;
  while ((!verifyAllFalse(map) || countLoop === 0) && countLoop < limit) {
    const [cH, cL, map2] = emit(map);
    map = map2;
    countHigh += cH;
    countLow += cL;
    countLoop++;
  }
  const times = 1000 / countLoop;

  return times * times * countHigh * countLow;
};

function verifyAllFalse(
  map: Map<
    string,
    {
      type: string;
      state: boolean;
      to: Set<string>;
      input?: { [from: string]: boolean };
    }
  >,
) {
  return Array.from(map.keys()).every((k) => {
    if (map.get(k)?.state === false) return true;
    return false;
  });
}

function emit(
  map: Map<
    string,
    {
      type: string;
      state: boolean;
      to: Set<string>;
      input?: { [from: string]: boolean };
    }
  >,
): [
  number,
  number,
  Map<
    string,
    {
      type: string;
      state: boolean;
      to: Set<string>;
      input?: { [from: string]: boolean };
    }
  >,
] {
  const queue = new Queue<{ impulse: boolean; curr: string; to: string[] }>();
  queue.enQueue({
    impulse: false,
    curr: "broadcaster",
    to: Array.from(map.get("broadcaster")!.to),
  });
  let countLow: number = Array.from(map.get("broadcaster")!.to).length;
  let countHigh = 0;
  while (queue.getSize() > 0) {
    const curr = queue.deQueue();
    if (curr !== -1) {
      if (!curr.impulse) {
        countLow++;
      } else {
        countHigh++;
      }
      Array.from(curr.to).forEach((t) => {
        if (map.has(t)) {
          const c = map.get(t)!;
          if (c.type === "%") {
            if (!curr.impulse) c.state = !c.state;
          }
          Array.from(c.to).forEach((e) => {
            if (c.type === "%" && !curr.impulse) {
              queue.enQueue({
                impulse: c.state,
                curr: t,
                to: [e],
              });
            } else if (c.type === "&") {
              let imp = true;
              c.input = { ...c.input, [curr.curr]: curr.impulse };
              let inV = Object.values(c.input);
              if (inV.every((v) => v)) {
                imp = false;
              }
              queue.enQueue({
                impulse: imp,
                curr: t,
                to: [e],
              });
            }
          });
        }
      });
    }
  }
  return [countHigh, countLow, map];
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
    this.map.set(this.last + 1, a);
    this.set.add(JSON.stringify(a));
    if (this.size === 0) {
      this.first++;
    }
    this.last++;
    this.size++;
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

function emit2(
  map: Map<
    string,
    {
      type: string;
      state: boolean;
      to: Set<string>;
      input?: { [from: string]: boolean };
    }
  >,
): [
  boolean,
  Map<
    string,
    {
      type: string;
      state: boolean;
      to: Set<string>;
      input?: { [from: string]: boolean };
    }
  >,
] {
  let found = false;
  const queue = new Queue<{ impulse: boolean; curr: string; to: string[] }>();
  queue.enQueue({
    impulse: false,
    curr: "broadcaster",
    to: Array.from(map.get("broadcaster")!.to),
  });

  while (queue.getSize() > 0) {
    const curr = queue.deQueue();
    if (curr !== -1) {
      if (curr.curr === "tf" && map.get("tf")!.state) return [found, map];
      Array.from(curr.to).forEach((t) => {
        if (map.has(t)) {
          const c = map.get(t)!;
          if (c.type === "%") {
            if (!curr.impulse) c.state = !c.state;
          }
          Array.from(c.to).forEach((e) => {
            if (c.type === "%" && !curr.impulse) {
              queue.enQueue({
                impulse: c.state,
                curr: t,
                to: [e],
              });
            } else if (c.type === "&") {
              let imp = true;
              c.input = { ...c.input, [curr.curr]: curr.impulse };
              let inV = Object.values(c.input);
              if (inV.every((v) => v)) {
                imp = false;
              }
              queue.enQueue({
                impulse: imp,
                curr: t,
                to: [e],
              });
            }
          });
        }
      });
    }
  }
  return [found, map];
}

const part2 = (rawInput: string) => {
  const rows = parseInput(rawInput);
  let map = new Map<
    string,
    {
      type: string;
      state: boolean;
      to: Set<string>;
      input?: { [from: string]: boolean };
    }
  >();
  const cM = new Set<string>();
  rows.forEach(([name, to]) => {
    const toArr = new Set(to.split(", "));
    if (name === "broadcaster") {
      map.set(name, { type: name, state: false, to: toArr });
    } else {
      const type = name[0];
      const key = name.substring(1);
      map.set(key, { type: type, state: false, to: toArr });
      if (type === "&") cM.add(key);
    }
  });

  Array.from(map.keys()).forEach((k) => {
    const obj = map.get(k)!;
    const to = obj.to;
    cM.forEach((c) => {
      if (to.has(c)) {
        const cm = map.get(c)!;
        const newCm = {
          ...cm,
          input: { ...cm?.input, [k]: false },
        };
        map.set(c, newCm);
      }
    });
  });
  let count1 = 0;
  let count2 = 0;
  let count3 = 0;
  let count4 = 0;
  let count = 0;

  while (count1 * count2 * count3 * count4 === 0) {
    count++;

    const queue = new Queue<{ impulse: boolean; curr: string; to: string[] }>();
    queue.enQueue({
      impulse: false,
      curr: "broadcaster",
      to: Array.from(map.get("broadcaster")!.to),
    });

    while (queue.getSize() > 0) {
      const curr = queue.deQueue();
      if (curr !== -1) {
        Array.from(curr.to).forEach((t) => {
          if (curr.curr === "tf" && curr.impulse) count1 = count;
          if (curr.curr === "vq" && curr.impulse) count2 = count;
          if (curr.curr === "db" && curr.impulse) count3 = count;
          if (curr.curr === "ln" && curr.impulse) count4 = count;
          if (map.has(t)) {
            const c = map.get(t)!;
            if (c.type === "%") {
              if (!curr.impulse) c.state = !c.state;
            }
            Array.from(c.to).forEach((e) => {
              if (c.type === "%" && !curr.impulse) {
                queue.enQueue({
                  impulse: c.state,
                  curr: t,
                  to: [e],
                });
              } else if (c.type === "&") {
                let imp = true;
                c.input = { ...c.input, [curr.curr]: curr.impulse };
                let inV = Object.values(c.input);
                if (inV.every((v) => v)) {
                  imp = false;
                }
                queue.enQueue({
                  impulse: imp,
                  curr: t,
                  to: [e],
                });
              }
            });
          }
        });
      }
    }
    // console.log("count",count)
  }
  console.log("count1", count);

  return count1 * count2 * count3 * count4;

  return;
};

run({
  part1: {
    tests: [
      // {
      //   input: `
      //   broadcaster -> a, b, c
      //   %a -> b
      //   %b -> c
      //   %c -> inv
      //   &inv -> a`,
      //   expected: 32000000,
      // },
      // {
      //   input: `
      //   broadcaster -> a
      //   %a -> inv, con
      //   &inv -> b
      //   %b -> con
      //   &con -> output`,
      //   expected: 11687500,
      // },
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
