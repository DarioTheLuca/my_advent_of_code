import run from "aocrunner";

const parseInput = (rawInput: string) => {
  return rawInput.split("\n").filter((r) => r);
};

const part1 = (rawInput: string) => {
  const rows = parseInput(rawInput);
  const dir = rows.shift()!;
  const nR = rows.map((r) => {
    return r.substring(0, r.length - 1);
  });

  const map = new Map<string, [string, string]>();
  nR.forEach((r) => {
    let newR = r.split(" = (") as [string, string];

    map.set(newR[0], newR[1].split(", ") as [string, string]);
  });

  let result = 0;
  let find = false;
  let start = "AAA";
  while (!find) {
    for (let i = 0; i < dir.length; i++) {
      result++;
      if (dir[i] === "R") {
        start = map.get(start)![1];
        if (start === "ZZZ") {
          find = true;
          break;
        }
        continue;
      } else {
        start = map.get(start)![0];

        if (start === "ZZZ") {
          find = true;
          break;
        }
      }
    }
  }

  return result;
};

const part2 = (rawInput: string) => {
  const rows = parseInput(rawInput);

  const dir = rows.shift()!;
  const nR = rows.map((r) => {
    return r.substring(0, r.length - 1);
  });

  const map = new Map();
  nR.forEach((r) => {
    let newR = r.split(" = (");
    map.set(newR[0], newR[1].split(", "));
  });

  let result = [];
  let next = Array.from(map.keys()).filter((k) => k[2] === "A");
  for (const ne of next) {
    let p = ne;
    let find = false;
    let count = 0;
    while (!find) {
      for (let i = 0; i < dir.length; i++) {
        count++;
        if (dir[i] === "R") {
          p = map.get(p)[1];
          if (p[2] === "Z") {
            find = true;
            break;
          }
        } else {
          p = map.get(p)[0];
          if (p[2] === "Z") {
            find = true;
            break;
          }
        }
      }
    }
    result.push(count);
  }

  return lcm(result);
};

run({
  part1: {
    tests: [
      {
        input: `
        RL

        AAA = (BBB, CCC)
        BBB = (DDD, EEE)
        CCC = (ZZZ, GGG)
        DDD = (DDD, DDD)
        EEE = (EEE, EEE)
        GGG = (GGG, GGG)
        ZZZ = (ZZZ, ZZZ)`,
        expected: 2,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        LR

        11A = (11B, XXX)
        11B = (XXX, 11Z)
        11Z = (11B, XXX)
        22A = (22B, XXX)
        22B = (22C, 22C)
        22C = (22Z, 22Z)
        22Z = (22B, 22B)
        XXX = (XXX, XXX)`,
        expected: 6,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});

function gcd2(a: number, b: number) {
  // Greatest common divisor of 2 integers
  if (!b) return b === 0 ? a : NaN;
  return gcd2(b, a % b);
}
function gcd(array: number[]) {
  // Greatest common divisor of a list of integers
  var n = 0;
  for (var i = 0; i < array.length; ++i) n = gcd2(array[i], n);
  return n;
}
function lcm2(a: number, b: number) {
  // Least common multiple of 2 integers
  return (a * b) / gcd2(a, b);
}
function lcm(array: number[]) {
  // Least common multiple of a list of integers
  var n = 1;
  for (var i = 0; i < array.length; ++i) n = lcm2(array[i], n);
  return n;
}
