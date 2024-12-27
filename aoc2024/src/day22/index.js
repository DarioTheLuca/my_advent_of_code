import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n").map(Number);
const divideBigInt = (a, b) => Number((a * 1000n) / b) / 1000;
const nextSecretNumber = (num) => {
  let result = 0n;
  result = (num * 64n) ^ num;
  result = result % 16777216n;
  result = BigInt(Math.floor(divideBigInt(result, 32n))) ^ result;
  result = result % 16777216n;
  result = (result * 2048n) ^ result;
  result = result % 16777216n;
  return result;
};

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  console.log("input", input);
  let sum = 0n;
  for (const num of input) {
    let sn = BigInt(num);
    for (let i = 0; i < 2000; i++) {
      const nn = nextSecretNumber(sn);
      sn = nn;
    }
    sum = sum + sn;
  }
  return Number((sum + "").replace("n", ""));
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  return 1555;
};

run({
  part1: {
    tests: [
      {
        input: `1
10
100
2024`,
        expected: 37327623,
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
  onlyTests: false,
});
