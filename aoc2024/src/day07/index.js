import run from "aocrunner";

const parseInput = (rawInput) =>
  rawInput.split("\n").map((string) => {
    const [testValue, ...nums] = string
      .split(" ")
      .map((el) => Number(el.replace(":", "")));
    return { testValue, nums };
  });

const isTestValid = (testValue, nums) => {
  const num1 = nums.pop();
  if (testValue < num1) return false;
  if (nums.length > 0) {
    const num2 = nums.pop();
    const sumValue = num1 + num2;
    const muxValue = num1 * num2;
    return (
      isTestValid(testValue, nums.concat(sumValue)) ||
      isTestValid(testValue, nums.concat(muxValue))
    );
  }
  if (nums.length === 0 && testValue === num1) return true;
  return false;
};

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  let sum = 0;
  input.forEach((el) => {
    const { testValue, nums } = el;
    if (isTestValid(testValue, nums.reverse())) {
      sum = sum + testValue;
    }
  });
  return sum;
};

const isTestValid2 = (testValue, nums) => {
  const num1 = nums.pop();
  if (testValue < num1) return false;
  if (nums.length > 0) {
    const num2 = nums.pop();
    const sumValue = num1 + num2;
    const muxValue = num1 * num2;
    const concatValue = Number(num1 + "" + num2);

    return (
      isTestValid2(testValue, nums.concat(sumValue)) ||
      isTestValid2(testValue, nums.concat(muxValue)) ||
      isTestValid2(testValue, nums.concat(concatValue))
    );
  }
  if (nums.length === 0 && testValue === num1) return true;
  return false;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  let sum = 0;
  input.forEach((el) => {
    const { testValue, nums } = el;
    if (isTestValid2(testValue, nums.reverse())) {
      sum = sum + testValue;
    }
  });
  return sum;
};

run({
  part1: {
    tests: [
      {
        input: `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`,
        expected: 3749,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`,
        expected: 11387,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
