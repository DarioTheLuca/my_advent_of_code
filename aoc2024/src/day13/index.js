import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n").filter((el) => !!el);

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const cA = [];
  const cB = [];
  const cT = [];
  const costoA = 3;
  const costoB = 1;
  input.forEach((el) => {
    if (el.includes("Button A: ")) {
      const [x, y] = el
        .replace("Button A: ", "")
        .replace(" ", "")
        .split(",")
        .map((el) =>
          Number(el.replace("X+", "").replace("Y+", "").replace("X=", "")),
        );
      cA.push([x, y]);
    }
    if (el.includes("Prize: ")) {
      const [x, y] = el
        .replace("Prize: ", "")
        .replace(" ", "")
        .split(",")
        .map((el) => Number(el.replace("X=", "").replace("Y=", "")));
      cT.push([x, y]);
    }
    if (el.includes("Button B: ")) {
      const [x, y] = el
        .replace("Button B: ", "")
        .replace(" ", "")
        .split(",")
        .map((el) =>
          Number(el.replace("X+", "").replace("Y+", "").replace("X=", "")),
        );
      cB.push([x, y]);
    }
  });
  // console.log("input", input);
  // console.log(cA, cB, cT);
  let tokens = 0;
  for (let i = 0; i < cA.length; i++) {
    const [c1, c3] = cA[i];
    const [c2, c4] = cB[i];
    const [t1, t2] = cT[i];

    const d = c1 * c4 - c3 * c2;
    if (d === 0) continue;

    const a = (t1 * c4 - t2 * c2) / d;
    const b = (c1 * t2 - c3 * t1) / d;

    // console.log(c1, c2, c3, c4, t1, t2);
    // console.log(a, b);
    if (b >= 0 && a >= 0 && Number.isInteger(a) && Number.isInteger(b)) {
      // console.log(a, b);
      tokens = tokens + a * costoA + b * costoB;
    }
  }
  return tokens;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const offset = 10000000000000;
  const cA = [];
  const cB = [];
  const cT = [];
  const costoA = 3;
  const costoB = 1;
  input.forEach((el) => {
    if (el.includes("Button A: ")) {
      const [x, y] = el
        .replace("Button A: ", "")
        .replace(" ", "")
        .split(",")
        .map((el) =>
          Number(el.replace("X+", "").replace("Y+", "").replace("X=", "")),
        );
      cA.push([x, y]);
    }
    if (el.includes("Prize: ")) {
      const [x, y] = el
        .replace("Prize: ", "")
        .replace(" ", "")
        .split(",")
        .map((el) => Number(el.replace("X=", "").replace("Y=", "")));
      cT.push([offset + x, offset + y]);
    }
    if (el.includes("Button B: ")) {
      const [x, y] = el
        .replace("Button B: ", "")
        .replace(" ", "")
        .split(",")
        .map((el) =>
          Number(el.replace("X+", "").replace("Y+", "").replace("X=", "")),
        );
      cB.push([x, y]);
    }
  });
  // console.log("input", input);
  // console.log(cA, cB, cT);
  let tokens = 0;
  for (let i = 0; i < cA.length; i++) {
    const [c1, c3] = cA[i];
    const [c2, c4] = cB[i];
    const [t1, t2] = cT[i];

    const d = c1 * c4 - c3 * c2;
    if (d === 0) continue;

    const a = (t1 * c4 - t2 * c2) / d;
    const b = (c1 * t2 - c3 * t1) / d;

    // console.log(c1, c2, c3, c4, t1, t2);
    // console.log(a, b);
    if (b >= 0 && a >= 0 && Number.isInteger(a) && Number.isInteger(b)) {
      // console.log(a, b);
      tokens = tokens + a * costoA + b * costoB;
    }
  }
  return tokens;
};

run({
  part1: {
    tests: [
      {
        input: `Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=8400, Y=5400

Button A: X+26, Y+66
Button B: X+67, Y+21
Prize: X=12748, Y=12176

Button A: X+17, Y+86
Button B: X+84, Y+37
Prize: X=7870, Y=6450

Button A: X+69, Y+23
Button B: X+27, Y+71
Prize: X=18641, Y=10279`,
        expected: 480,
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
