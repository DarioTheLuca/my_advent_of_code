import run from "aocrunner";

const parseInput = (rawInput: string) => {
  return rawInput.split("\n");
};
function transpose(matrix: string[]) {
  return matrix[0]
    .split("")
    .map((_, i) => matrix.map((row) => row[i]).join(""));
}
const part1 = (rawInput: string) => {
  const rows = parseInput(rawInput);
  let transposedMatrix: string[] = transpose(rows);

  const len = transposedMatrix[0].length;
  const n = transposedMatrix.map((r) => {
    let a = r;

    let end = false;
    while (!end) {
      if (!a.includes(".O")) {
        end = true;
      } else {
        a = a.replaceAll(".O", "O.");
      }
    }

    return a;
  });

  let sum = 0;

  n.forEach((r) => {
    r.split("").forEach((e, i) => {
      if (e === "O") {
        sum = sum + len - i;
      }
    });
  });

  return sum;
};

function cycle(m: string[]) {
  const n = transpose(m).map((r) => {
    let a = r;
    let end = false;
    while (!end) {
      if (!a.includes(".O")) {
        end = true;
      } else {
        a = a.replaceAll(".O", "O.");
      }
    }
    return a;
  });
  const w = transpose(n).map((r) => {
    let a = r;
    let end = false;
    while (!end) {
      if (!a.includes(".O")) {
        end = true;
      } else {
        a = a.replaceAll(".O", "O.");
      }
    }
    return a;
  });
  const s = transpose(w).map((r) => {
    let a = r;
    let end = false;
    while (!end) {
      if (!a.includes("O.")) {
        end = true;
      } else {
        a = a.replaceAll("O.", ".O");
      }
    }
    return a;
  });
  const e = transpose(s).map((r) => {
    let a = r;
    let end = false;
    while (!end) {
      if (!a.includes("O.")) {
        end = true;
      } else {
        a = a.replaceAll("O.", ".O");
      }
    }
    return a;
  });
  return e;
}
const part2 = (rawInput: string) => {
  const rows = parseInput(rawInput);

  let cycleCount = 0;
  const map = new Map<string, number>();
  let finalM = rows;
  while (!map.has(JSON.stringify(finalM))) {
    const t = cycle(finalM);
    map.set(JSON.stringify(finalM), cycleCount);
    cycleCount++;
    finalM = t;
  }
  let indexLoopStart = map.get(JSON.stringify(finalM))!;

  let numCycles = 1_000_000_000;

  let loopLength = cycleCount - indexLoopStart;
  while (numCycles - loopLength > indexLoopStart) {
    numCycles = numCycles - loopLength;
  }

  let matrixAfterNumCycles = JSON.parse(
    Array.from(map.keys()).find((k) => map.get(k) === numCycles)!,
  );
  let sum = 0;
  const len = transpose(matrixAfterNumCycles)![0].length;
  transpose(matrixAfterNumCycles)!.forEach((r: any) => {
    r.split("").forEach((e: any, i: any) => {
      if (e === "O") {
        sum = sum + len - i;
      }
    });
  });

  return sum;
};

run({
  part1: {
    tests: [
      // {
      //   input: `
      //   O....#....
      //   O.OO#....#
      //   .....##...
      //   OO.#O....O
      //   .O.....O#.
      //   O.#..O.#.#
      //   ..O..#O..O
      //   .......O..
      //   #....###..
      //   #OO..#....`,
      //   expected: 136,
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: `
      //   O....#....
      //   O.OO#....#
      //   .....##...
      //   OO.#O....O
      //   .O.....O#.
      //   O.#..O.#.#
      //   ..O..#O..O
      //   .......O..
      //   #....###..
      //   #OO..#....`,
      //   expected: 64,
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
