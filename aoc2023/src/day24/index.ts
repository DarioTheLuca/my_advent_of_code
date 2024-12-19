import run from "aocrunner";

const parseInput = (rawInput: string) => {
  return rawInput.split("\n").map((e) => {
    const s = e.split(" @ ").map((v) => v.split(", ").map(Number));
    const [x, y, z] = s[0];
    const [vx, vy, vz] = s[1];
    return { x, y, z, vx, vy, vz };
  });
};

function isIn(limitInf: number, limitSup: number, x: number, y: number) {
  return x >= limitInf && x <= limitSup && y >= limitInf && y <= limitSup;
}

const part1 = (rawInput: string) => {
  const rows = parseInput(rawInput);
  const len = rows.length;
  let count = 0;
  const limitInf = 7;
  const limitSup = 27;
  // const limitInf = 200000000000000;
  // const limitSup = 400000000000000;

  for (let i = 0; i < len; i++) {
    const curr = rows[i];
    for (let j = i + 1; j < len; j++) {
      const next = rows[j];
      const c = next.vx / (curr.vx * next.vy);
      const t1 =
        (((next.x - curr.x) / curr.vx )+ (c * (curr.y - next.y))) 
        / (1 - c * curr.vy);
      const t2 = (curr.y+t1*curr.vy-next.y)/next.vy;
      const xF = curr.x + t1 * curr.vx;
      const yF = curr.y + t1 * curr.vy;
      if (t1>=0 && t2>0 && isIn(limitInf, limitSup, xF, yF)) {
        count++;
      }
    }
  }

  // console.log("rows", rows);

  return count;
};

const part2 = (rawInput: string) => {
  const rows = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `
        19, 13, 30 @ -2,  1, -2
        18, 19, 22 @ -1, -1, -2
        20, 25, 34 @ -2, -2, -4
        12, 31, 28 @ -1, -2, -1
        20, 19, 15 @  1, -5, -3`,
        expected: 2,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        19, 13, 30 @ -2,  1, -2
        18, 19, 22 @ -1, -1, -2
        20, 25, 34 @ -2, -2, -4
        12, 31, 28 @ -1, -2, -1
        20, 19, 15 @  1, -5, -3`,
        expected: 47,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
