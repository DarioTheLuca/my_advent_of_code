import run from "aocrunner";

const parseInput = (rawInput) =>
  rawInput.split("\n\n").map((el) => el.split("\n"));

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  // console.log("input", input);
  const locks = new Set();
  const keys = new Set();

  for (const comb of input) {
    const row = comb[0];
    const isLock = !row.includes(".");
    let col = [0, 0, 0, 0, 0];
    if (isLock) {
      for (let i = 1; i < 7; i++) {
        for (let j = 0; j < 5; j++) {
          let curr = comb[i][j];
          if (curr === "#") {
            col[j] = col[j] + 1;
          }
        }
      }
      locks.add(col.join(","));
    } else {
      for (let i = 5; i >= 0; i--) {
        for (let j = 0; j < 5; j++) {
          let curr = comb[i][j];
          if (curr === "#") {
            col[j] = col[j] + 1;
          }
        }
      }
      keys.add(col.join(","));
    }
  }
  // console.log(locks, keys);

  const uniqueLockKey = new Set();

  for (const key of Array.from(keys)) {
    const key_ = key.split(",").map(Number);
    for (const lock of Array.from(locks)) {
      const lock_ = lock.split(",").map(Number);
      let isValid = true;
      for (let i = 0; i < 5; i++) {
        if (key_[i] + lock_[i] > 5) {
          isValid = false;
          break;
        }
      }
      if (isValid) uniqueLockKey.add(key + lock);
    }
  }
  return uniqueLockKey.size;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `#####
.####
.####
.####
.#.#.
.#...
.....

#####
##.##
.#.##
...##
...#.
...#.
.....

.....
#....
#....
#...#
#.#.#
#.###
#####

.....
.....
#.#..
###..
###.#
###.#
#####

.....
.....
.....
#....
#.#..
#.#.#
#####`,
        expected: 3,
      },
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
  onlyTests: true,
});
