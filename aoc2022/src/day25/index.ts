import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("\n");

const part1 = (rawInput: string) => {
  const rows = parseInput(rawInput);
 //single-digit addition lookup table
const sums = {
  "==":"-1", "=-":"-2", "=0":"0=", "=1":"0-", "=2":"00",
  "-=":"-2", "--":"0=", "-0":"0-", "-1":"00", "-2":"01",
  "0=":"0=", "0-":"0-", "00":"00", "01":"01", "02":"02",
  "1=":"0-", "1-":"00", "10":"01", "11":"02", "12":"1=",
  "2=":"00", "2-":"01", "20":"02", "21":"1=", "22":"1-",
}

//sum of two SNAFU numbers
function sum(x:any, y:any) {
  let output = ""
  let carry = "0"
  for (let i = 1; x.at(-i) || y.at(-i); i++) {
      let digitSum = sums[(x.at(-i) ?? "0") + (y.at(-i) ?? "0")as keyof typeof sums]
      let carrySum = sums[carry + digitSum[1]as keyof typeof sums]
      output = carrySum[1] + output
      carry = sums[digitSum[0] + carrySum[0]as keyof typeof sums][1]
  }
  if (carry !== "0")
      output = carry + output
  return output
}

let output = "0"
for (let number of rows)
  output = sum(output, number)

  return output
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
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
