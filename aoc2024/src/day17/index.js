import run from "aocrunner";

const parseInput = (rawInput) =>
  rawInput
    .split("\n\n")
    .map((el) =>
      el
        .split("\n")
        .map((el) =>
          el
            .replace("Program: ", "")
            .replace("Register A: ", "")
            .replace("Register B: ", "")
            .replace("Register C: ", ""),
        ),
    );

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  // console.log("input", input);
  const [registers, program] = input;
  let [a, b, c] = registers;
  const p = program[0].split(",").map(Number);
  // console.log("a.b.c", a, b, c);
  const comboOpMap = (comboOp) => {
    switch (comboOp) {
      case 4:
        return a;
      case 5:
        return b;
      case 6:
        return c;
      case 7:
        return null;
      default:
        return comboOp;
    }
  };
  let i = 0;

  let output = [];

  while (i < p.length - 1) {
    const currP = p[i];
    const litOp = p[i + 1];

    if (currP === 0) {
      const comboOp = comboOpMap(litOp);
      a = Math.floor(a / Math.pow(2, comboOp));
    } else if (currP === 1) {
      b = b ^ litOp;
    } else if (currP === 2) {
      const comboOp = comboOpMap(litOp);
      b = comboOp % 8;
    } else if (currP === 3 && a !== 0) {
      i = litOp;
      continue;
    } else if (currP === 4) {
      b = b ^ c;
    } else if (currP === 5) {
      const comboOp = comboOpMap(litOp);
      output.push(comboOp % 8);
    } else if (currP === 6) {
      const comboOp = comboOpMap(litOp);
      b = Math.floor(a / Math.pow(2, comboOp));
    } else if (currP === 7) {
      const comboOp = comboOpMap(litOp);
      c = Math.floor(a / Math.pow(2, comboOp));
    }

    i = i + 2;
  }
  // console.log("a,b,c", a, b, c);
  return output.join(",");
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  // console.log("input", input);
  const [registers, programs] = input;
  let [aI, bI, cI] = registers;
  const program = programs[0].split(",").map(BigInt);
  // const [aI, bI, cI, ...program] = input.match(/\d+/g).map(BigInt);
  const out = [];

  let [a, b, c] = [BigInt(aI), BigInt(bI), BigInt(cI)];
  let ptr = 0;
  const instructions = [
    () => (a = a >> combo()),
    () => (b = b ^ program[ptr + 1]),
    () => (b = combo() & 7n),
    () => a && (ptr = Number(program[ptr + 1]) - 2),
    () => (b = b ^ c),
    () => out.push(combo() & 7n),
    () => (b = a >> combo()),
    () => (c = a >> combo()),
  ];
  const run = () => {
    out.length = 0;
    [ptr, b, c] = [0, 0n, 0n];
    while (program[ptr] != null) {
      instructions[Number(program[ptr])]();
      ptr += 2;
    }
  };


  const combo = () => [0n, 1n, 2n, 3n, a, b, c][Number(program[ptr + 1])];
  const findInitialA = (nextVal = 0n, i = program.length - 1) => {
    if (i < 0) return nextVal;
    for (let aVal = nextVal << 3n; aVal < (nextVal << 3n) + 8n; aVal++) {
      a = aVal;
      run();
      if (out[0] === program[i]) {
        const finalVal = findInitialA(aVal, i - 1);
        if (finalVal >= 0) return finalVal;
      }
    }
    return -1n;
  };

  return Number(findInitialA())
};

run({
  part1: {
    tests: [
      {
        input: `Register A: 2024
Register B: 0
Register C: 0

Program: 0,1,5,4,3,0`,
        expected: "4,2,5,6,7,7,7,7,3,1,0",
      },
      {
        input: `Register A: 0
Register B: 0
Register C: 9

Program: 2,6`,
        expected: "",
      },
      {
        input: `Register A: 10
Register B: 0
Register C: 9

Program: 5,0,5,1,5,4`,
        expected: "0,1,2",
      },
      {
        input: `Register A: 0
Register B: 29
Register C: 0

Program: 1,7`,
        expected: "",
      },
      {
        input: `Register A: 0
Register B: 2024
Register C: 43690

Program: 4,0`,
        expected: "",
      },
      {
        input: `Register A: 729
Register B: 0
Register C: 0

Program: 0,1,5,4,3,0`,
        expected: "4,6,3,5,6,3,5,2,1,0",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `Register A: 2024
Register B: 0
Register C: 0

Program: 0,3,5,4,3,0`,
        expected: 117440,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
