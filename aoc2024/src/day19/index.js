import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n\n");

const part1 = (rawInput) => {
  let [towels, desired] = parseInput(rawInput);
  towels = towels.split(", ");
  desired = desired.split("\n");
  let sum = 0;
  const tMap = new Map();
  towels.forEach((t) => {
    if (tMap.has(t[0])) {
      tMap.get(t[0]).push(t);
    } else {
      tMap.set(t[0], [t]);
    }
  });

  const possibleMap = new Map();

  const isPossible = (desire) => {
    if (desire.length === 0) return true;
    // console.log("desire", desire);
    const first = desire[0];
    if (!tMap.has(first)) return false;
    const possibles = tMap.get(first);
    // console.log("possibles", possibles);
    for (const possible of possibles) {
      const len = possible.length;
      if (desire.substring(0, len) === possible) {
        let res;
        if (possibleMap.has(desire.substring(len))) {
          res = possibleMap.get(desire.substring(len));
        } else {
          res = isPossible(desire.substring(len));
          possibleMap.set(desire.substring(len), res);
        }
        if (res) return true;
      }
    }
    return false;
  };

  for (const desire of desired) {
    if (isPossible(desire)) {
      sum = sum + 1;
    }
  }
  return sum;
};

const part2 = (rawInput) => {
  let [towels, desired] = parseInput(rawInput);
  towels = towels.split(", ");
  desired = desired.split("\n");
  let sum = 0;
  const tMap = new Map();
  towels.forEach((t) => {
    if (tMap.has(t[0])) {
      tMap.get(t[0]).push(t);
    } else {
      tMap.set(t[0], [t]);
    }
  });

  const possibleMap = new Map();

  const countPossible = (desire) => {
    if (desire.length === 0) return 1;
    const first = desire[0];
    if (!tMap.has(first)) return 0;
    const possibles = tMap.get(first);
    let sum = 0;
    for (const possible of possibles) {
      const len = possible.length;
      if (desire.substring(0, len) === possible) {
        let res;
        if (possibleMap.has(desire.substring(len))) {
          res = possibleMap.get(desire.substring(len));
        } else {
          res = countPossible(desire.substring(len));
          possibleMap.set(desire.substring(len), res);
        }
        if (res) sum = sum + res;
      }
    }
    return sum;
  };

  for (const desire of desired) {
    sum = sum + countPossible(desire);
  }
  return sum;
};

run({
  part1: {
    tests: [
      {
        input: `r, wr, b, g, bwu, rb, gb, br

brwrr
bggr
gbbr
rrbgbr
ubwu
bwurrg
brgr
bbrgwb
`,
        expected: 6,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `r, wr, b, g, bwu, rb, gb, br

brwrr
bggr
gbbr
rrbgbr
ubwu
bwurrg
brgr
bbrgwb`,
        expected: 16,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
