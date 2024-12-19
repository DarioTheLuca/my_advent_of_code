import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n").join("");

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  let sum = 0;
  const regex = /mul\(\d{1,3},\d{1,3}\)/g;
  const matches = input.match(regex);

  matches.forEach((el) => {
    const [num1s, num2s] = el.replace("mul(", "").replace(")", "").split(",");
    sum = sum + Number(num1s) * Number(num2s);
  });


  return sum;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  let sum = 0;
  const regex = /mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\)/g;
  const matches = input.match(regex);

  let can = true;
  matches.forEach((el) => {
    if (el === "do()") {
      can = true;
    } else if (el === "don't()") {
      can = false;
    } else if (el?.includes("mul") && can) {
      const [num1s, num2s] = el.replace("mul(", "").replace(")", "").split(",");
      sum = sum + Number(num1s) * Number(num2s);
    }
  });
  return sum;
};

run({
  part1: {
    tests: [
      {
        input: `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`,
        expected: 161,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`,
        expected: 48,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
