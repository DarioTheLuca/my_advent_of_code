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

const part2 = (rawInput: string) => {
  const map = new Map<string, string[]>();
  const rows = parseInput(rawInput)
    .map((r) => r.split(" ").map((r) => r.split(",")))
    .map((r, i) => {
      return r.map((x, i) => {
        if (i === 1) {
          const a = x.map(Number);
          return [...a, ...a, ...a, ...a, ...a];
        } else {
          const xx = x[0];
          return [xx + "?" + xx + "?" + xx + "?" + xx + "?" + xx];
        }
      });
    });

  let sum = 0;
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const [springs, order] = row as [string, number[]];

    const first = springs[0][0];

    if (first === "?") {
      rec(".", springs[0].substring(1, springs[0].length));
      rec("#", springs[0].substring(1, springs[0].length));
    } else {
      rec(first, springs[0].substring(1, springs[0].length));
    }

    function rec(spring2: string, next: string) {
      if (next === "") {
        const al = spring2.split(".").filter((e) => e);

        if (al.length === order.length) {
          if (al.every((e, i) => e.length === order[i])) {
            return sum++;
          }
        }
        return;
      }

      if (next[0] === "?") {
        const splitted = (spring2 + ".").split(".").filter((e) => e);
        if (
          splitted.every((e, i) => {
            if (i < splitted.length - 1) {
              return e.length === order[i];
            } else {
              return true;
            }
          })
        ) {
          rec(spring2 + ".", next.substring(1, next.length));
        }
        const splitted2 = (spring2 + "#").split(".").filter((e) => e);
        if (
          splitted2.every((e, i) => {
            if (i < splitted2.length - 1) {
              return e.length === order[i];
            } else {
              return true;
            }
          })
        ) {
          rec(spring2 + "#", next.substring(1, next.length));
        }
      } else {
        rec(spring2 + next[0], next.substring(1, next.length));
      }
    }
  }

  return sum;
};

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
  onlyTests: true,
});
