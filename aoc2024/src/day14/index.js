import run from "aocrunner";

const parseInput = (rawInput) =>
  rawInput.split("\n").map((s) => {
    const [p, v] = s.replace("p=", "").replace("v=", "").split(" ");
    // console.log("p", p);
    const po = p.split(",");
    const vo = v.split(",");
    return {
      p: { x: Number(po[0]), y: Number(po[1]) },
      v: { x: Number(vo[0]), y: Number(vo[1]) },
    };
  });

const nextPos = (xlen, ylen, curr, count = 100) => {
  const { p, v } = curr;
  if (count === 0) {
    return curr;
  }
  let newx = p.x + v.x;
  if (newx >= xlen) {
    newx = newx - xlen;
  } else if (newx < 0) {
    newx = xlen + newx;
  }

  let newy = p.y + v.y;
  if (newy >= ylen) {
    newy = newy - ylen;
  } else if (newy < 0) {
    newy = ylen + newy;
  }

  return nextPos(xlen, ylen, { p: { x: newx, y: newy }, v: v }, count - 1);
};

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const xlen = 101;
  const ylen = 103;
  // const xlen = 11;
  // const ylen = 7;
  const xNo = (xlen - 1) / 2;
  const yNo = (ylen - 1) / 2;
  const newPos = [];

  for (const inp of input) {
    newPos.push(nextPos(xlen, ylen, inp));
  }
  // console.log("input", input);
  // console.log("new", newPos);

  let count = [0, 0, 0, 0];

  for (const n of newPos) {
    const { p } = n;
    if (p.x < xNo && p.y < yNo) {
      count[0] = count[0] + 1;
    } else if (p.x > xNo && p.y < yNo) {
      count[1] = count[1] + 1;
    } else if (p.x < xNo && p.y > yNo) {
      count[2] = count[2] + 1;
    } else if (p.x > xNo && p.y > yNo) {
      count[3] = count[3] + 1;
    }
  }
  return count.reduce((acc, curr) => acc * curr, 1);
};
const merge = (...args) => args.reduce((acc, curr) => acc + curr + ",", "");

const part2 = (rawInput) => {
  let input = parseInput(rawInput);
  const xlen = 101;
  const ylen = 103;

  let count = 1;
  while (count < 100_000) {
    const newPos = [];

    for (const inp of input) {
      newPos.push(nextPos(xlen, ylen, inp, 1));
    }
    input = newPos;
    const seen = new Set();
    let isUnique = true;
    for (let i = 0; i < newPos.length; i++) {
      const curr = newPos[i];
      const p = curr.p;

      const id = merge(p.x, p.y);
      if (seen.has(id)) {
        isUnique = false;
        break;
      } else {
        seen.add(id);
      }
    }
    if (isUnique) break;

    count = count + 1;
  }

  return count;
};

run({
  part1: {
    tests: [
      //       {
      //         input: `p=0,4 v=3,-3
      // p=6,3 v=-1,-3
      // p=10,3 v=-1,2
      // p=2,0 v=2,-1
      // p=0,0 v=1,3
      // p=3,0 v=-2,-2
      // p=7,6 v=-1,-3
      // p=3,0 v=-1,-2
      // p=9,3 v=2,3
      // p=7,3 v=-1,2
      // p=2,4 v=2,-3
      // p=9,5 v=-3,-3`,
      //         expected: 12,
      //       },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `p=0,4 v=3,-3
p=6,3 v=-1,-3
p=10,3 v=-1,2
p=2,0 v=2,-1
p=0,0 v=1,3
p=3,0 v=-2,-2
p=7,6 v=-1,-3
p=3,0 v=-1,-2
p=9,3 v=2,3
p=7,3 v=-1,2
p=2,4 v=2,-3
p=9,5 v=-3,-3`,
        expected: "",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
