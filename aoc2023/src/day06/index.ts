import run from "aocrunner";

const parseInput = (rawInput: string) => {
  return rawInput.split("\n");
};

const part1 = (rawInput: string) => {
  const rows = parseInput(rawInput).map((r) => {
    return r
      .split(":")[1]
      .split(" ")
      .filter((v) => v);
  });
  let mux = 1;
  const times = rows[0];
  const distances = rows[1];
  for (let i = 0; i < rows[0].length; i++) {
    const currTime = Number(times[i]);
    const currDistance = Number(distances[i]);
    let count = 0;
    for (let t = 1; t <= currTime; t++) {
      if (t * (currTime - t) > currDistance) {
        count++;
      }
    }
    mux = mux * count;
  }
  return mux;
};

const part2 = (rawInput: string) => {
  const rows = parseInput(rawInput).map((r) => {
    return Number(
      r
        .split(":")[1]
        .split(" ")
        .filter((v) => v)
        .join(""),
    );
  });

  let count = 0;
  for (let j = 1; j <= rows[0]; j++) {
    if (j * (rows[0] - j) > rows[1]) {
      count++;
    }
  }

  return count;
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
