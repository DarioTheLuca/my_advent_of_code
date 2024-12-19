import run from "aocrunner";

const parseInput = (rawInput: string) => {
  return rawInput.split("\n");
};

const part1 = (rawInput: string) => {
  const rows = parseInput(rawInput)
    .map((r) => r.split(" ").map((r) => r.split(",")))
    .map((r, i) => {
      return r.map((x, i) => {
        if (i === 1) {
          return x.map(Number);
        } else {
          return x;
        }
      });
    });
  // console.log("rows1", rows);

  let sum = 0;
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const [springs, order] = row as [string, number[]];

    let all: any[] = [];
    for (const spring of springs[0]) {
      if (all.length === 0) {
        if (spring === "?") all.push(".", "#");
        else all.push(spring);
      } else {
        all = p(all, spring);
      }
      function p(arr: string[], spring: string): string[] {
        if (spring === "?") {
          return [...arr.map((e) => e + "."), ...arr.map((e) => e + "#")];
        } else {
          return arr.map((e) => e + spring);
        }
      }
    }

    const al = all.map((e: string) => e.split(".").filter((e) => e));

    for (const a of al) {
      if (a.length === order.length) {
        if (a.every((e, i) => e.length === order[i])) {
          sum++;
        }
      }
    }
  }

  return sum;
};

const countWays = memoize((line: string, runs: readonly number[]): number => {
  if (line.length === 0) {
    if (runs.length === 0) {
      return 1;
    }
    return 0;
  }
  if (runs.length === 0) {
    for (let i = 0; i < line.length; i++) {
      if (line[i] === "#") {
        return 0;
      }
    }
    return 1;
  }

  if (line.length < sum(runs) + runs.length - 1) {
    // The line is not long enough for all runs
    return 0;
  }

  if (line[0] === ".") {
    return countWays(line.slice(1), runs);
  }
  if (line[0] === "#") {
    const [run, ...leftoverRuns] = runs;
    for (let i = 0; i < run; i++) {
      if (line[i] === ".") {
        return 0;
      }
    }
    if (line[run] === "#") {
      return 0;
    }

    return countWays(line.slice(run + 1), leftoverRuns);
  }
  // Otherwise dunno first spot, pick
  return (
    countWays("#" + line.slice(1), runs) + countWays("." + line.slice(1), runs)
  );
});
const part2 = (rawInput: string) => {
  let t1 = performance.now();

  const map = new Map<string, string[]>();
  const rows = parseInput(rawInput);

  let sum = 0;
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const [str, numsS] = row.split(" ");
    const nums = numsS.split(",").map(toInt);

    const strExpanded = [str, str, str, str, str].join("?");
    const numsExpanded = [...nums, ...nums, ...nums, ...nums, ...nums];

    sum += countWays(strExpanded, numsExpanded);
  }
  let t2 = performance.now();
  console.log("it took", (t2 - t1) / 1000, " secondi");
  return sum;
};

export function sum(...nums: number[] | (readonly number[])[]): number {
  let tot = 0;
  for (const x of nums) {
    if (typeof x === "number") {
      tot += x;
    } else {
      for (const y of x) {
        tot += y;
      }
    }
  }
  return tot;
}

export function toInt(x: string): number {
  return parseInt(x, 10);
}

export function memoize<Args extends unknown[], Result>(
  func: (...args: Args) => Result,
): (...args: Args) => Result {
  const stored = new Map<string, Result>();

  return (...args) => {
    const k = JSON.stringify(args);
    if (stored.has(k)) {
      return stored.get(k)!;
    }
    const result = func(...args);
    stored.set(k, result);
    return result;
  };
}

run({
  part1: {
    tests: [
      // {
      //   input: `
      //   ???.### 1,1,3
      //   .??..??...?##. 1,1,3
      //   ?#?#?#?#?#?#?#? 1,3,1,6
      //   ????.#...#... 4,1,1
      //   ????.######..#####. 1,6,5
      //   ?###???????? 3,2,1`,
      //   expected: 21,
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        ???.### 1,1,3
        .??..??...?##. 1,1,3
        ?#?#?#?#?#?#?#? 1,3,1,6
        ????.#...#... 4,1,1
        ????.######..#####. 1,6,5
        ?###???????? 3,2,1`,

        expected: 525152,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
