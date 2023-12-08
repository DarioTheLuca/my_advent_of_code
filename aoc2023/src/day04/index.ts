import run from "aocrunner";

const parseInput = (rawInput: string) => {
  return rawInput
    .split("\n")
    .map((r) => {
      const p = r.split(": ")[1];
      return p.split(" | ");
    })
    .map((r) => r.map((e) => e.split(" ")).map((v) => v.filter((e) => e)));
};

const part1 = (rawInput: string) => {
  const rows = parseInput(rawInput);
  let sum = 0;

  for (const row of rows) {
    const len2 = row[0].length;
    let count = 0;
    for (let j = 0; j < len2; j++) {
      const check = row[1].includes(row[0][j]);
      if (check) count++;
    }

    let mux = 0;
    if (count > 0) mux = Math.pow(2, count - 1);

    sum = sum + mux;
  }
  return sum;
};

const part2 = (rawInput: string) => {
  const rows = parseInput(rawInput);

  const map = new Map();
  const len = rows.length;
  let sum = 0;
  for (let i = 0; i < len; i++) {
    if (map.has(i)) {
      map.set(i, map.get(i) + 1);
    } else {
      map.set(i, 1);
    }
    const len2 = rows[i][0].filter((e) => e).length;
    let count = 0;

    for (let j = 0; j < len2; j++) {
      const check = rows[i][1].includes(rows[i][0].filter((e) => e)[j]);
      if (check) count++;
    }
    for (let x = i + 1; x <= i + count; x++) {
      if (map.has(x)) {
        map.set(x, map.get(x) + 1 * map.get(i));
      } else {
        map.set(x, 1 * map.get(i));
      }
    }
  }
  sum = Array.from(map.values()).reduce((acc, e) => {
    return acc + e;
  }, 0);
  return sum;
};

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
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
