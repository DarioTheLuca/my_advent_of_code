import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n");

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const lList = [];
  const rList = [];
  input.map((el) => {
    const [l, r] = el.split("  ");
    lList.push(Number(l));
    rList.push(Number(r));
  });
  lList.sort((a, b) => a - b);
  rList.sort((a, b) => a - b);
  let sum = 0;
  const len = lList.length;
  for (let i = 0; i < len; i++) {
    const lCurr = lList[i];
    const rCurr = rList[i];
    sum = sum + Math.abs(lCurr - rCurr);
  }

  return sum;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const lList = [];
  const rList = [];
  input.map((el) => {
    const [l, r] = el.split("  ");
    lList.push(Number(l));
    rList.push(Number(r));
  });

  let sum = 0;
  const len = lList.length;
  const rMap = new Map();
  for (let i = 0; i < len; i++) {
    const rCurr = rList[i];
    if (rMap.has(rCurr)) {
      rMap.set(rCurr, rMap.get(rCurr) + 1);
    } else {
      rMap.set(rCurr, 1);
    }
  }

  for (let i = 0; i < len; i++) {
    const lCurr = lList[i];
    const r = rMap.has(lCurr) ? rMap.get(lCurr) : 0;

    sum = sum + lCurr * r;
  }

  return sum;
};

run({
  part1: {
    tests: [
      {
        input: `3   4
4   3
2   5
1   3
3   9
3   3`,
        expected: "11",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `3   4
4   3
2   5
1   3
3   9
3   3`,
        expected: "31",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
