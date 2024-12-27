import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n");
const merge = (...args) => args.reduce((acc, curr) => acc + curr + ",", "");
const directionsMap = {
  "0,1,": [
    [-1, 0],
    [1, 0],
  ],
  "0,-1,": [
    [-1, 0],
    [1, 0],
  ],
  "-1,0,": [
    [0, -1],
    [0, 1],
  ],
  "1,0,": [
    [0, -1],
    [0, 1],
  ],
};

const isValidCell1 = (matrix, currPos, skipCheck) =>
  currPos[0] >= 0 &&
  currPos[1] >= 0 &&
  currPos[0] < matrix.length &&
  currPos[1] < matrix[0].length &&
  (matrix[currPos[0]][currPos[1]] !== "#" || skipCheck);

const isValidCell2 = (matrix, currPos) =>
  currPos[0] >= 0 &&
  currPos[1] >= 0 &&
  currPos[0] < matrix.length &&
  currPos[1] < matrix[0].length &&
  matrix[currPos[0]][currPos[1]] !== "#";

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  let startPosition = [];
  let endPosition = [];
  const maxSkip = 1;
  // const maxSkip = 19;
  input.forEach((row, i) => {
    const s = row.indexOf("S");
    const e = row.indexOf("E");

    if (s !== -1) {
      startPosition = [i, s, maxSkip];
    } else if (e !== -1) {
      endPosition = [i, e];
    }
  });

  const queue = [];
  const seen = new Set();

  Object.keys(directionsMap).forEach((el) => {
    const [dr, dc] = el.split(",").map(Number);
    queue.push([...startPosition, [dr, dc], 0, []]);
  });
  const result = new Set();
  while (queue.length > 0) {
    const [r, c, skip, dir, count, cheetIDD] = queue.pop();
    const [dr, dc] = dir;
    // if (skip === -1) {
    //   const i = JSON.stringify([r, c, dir]);
    //   // console.log("i",i)
    //   if (seen.has(i)) continue;
    //   else seen.add(i);
    // }
    if (cheetIDD.length === 2 && result.has(JSON.stringify(cheetIDD))) continue;
    // let y = 84;
    // let diff = 12;
    let diff = 100;
    let y = 9320;
    if (count > y - diff) continue;
    if (r === endPosition[0] && c === endPosition[1]) {
      // console.log("qui");
      if (cheetIDD.length === 2) {
        const x = y - count;
        if (x >= diff) {
          result.add(JSON.stringify(cheetIDD));
        }
      }
      continue;
    }

    if (isValidCell2(input, [r + dr, c + dc])) {
      let cID;
      if (skip !== maxSkip && skip !== -1) {
        cID = [...cheetIDD, [r + dr, c + dc]];
      }
      const next = [
        r + dr,
        c + dc,
        skip !== maxSkip ? -1 : skip,
        dir,
        count + 1,
        cID ? cID : cheetIDD,
      ];
      !result.has(JSON.stringify(cID ? cID : cheetIDD)) && queue.push(next);
    } else if (skip > 0) {
      const next = [
        r + dr,
        c + dc,
        skip - 1,
        dir,
        count + 1,
        [[r + dr, c + dc]],
      ];
      queue.push(next);
    }

    const nextDirs = directionsMap[merge(dr, dc)];
    nextDirs.forEach(([dr2, dc2]) => {
      if (isValidCell2(input, [r + dr2, c + dc2])) {
        let cID;
        if (skip !== maxSkip && skip !== -1) {
          cID = [...cheetIDD, [r + dr2, c + dc2]];
        }
        const next = [
          r + dr2,
          c + dc2,
          skip !== maxSkip ? -1 : skip,
          [dr2, dc2],
          count + 1,
          cID ? cID : cheetIDD,
        ];
        queue.push(next);
      } else if (skip > 0) {
        const next = [
          r + dr2,
          c + dc2,
          skip - 1,
          [dr2, dc2],
          count + 1,
          [[r + dr2, c + dc2]],
        ];
        queue.push(next);
      }
    });
  }
  // console.log("ris", ris);
  return result.size;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  let startPosition = [];
  let endPosition = [];
  // const maxSkip = 1;
  const maxSkip = 19;
  input.forEach((row, i) => {
    const s = row.indexOf("S");
    const e = row.indexOf("E");

    if (s !== -1) {
      startPosition = [i, s, maxSkip];
    } else if (e !== -1) {
      endPosition = [i, e];
    }
  });

  const queue = [];
  const seen = new Set();

  Object.keys(directionsMap).forEach((el) => {
    const [dr, dc] = el.split(",").map(Number);
    queue.push([...startPosition, [dr, dc], 0, []]);
  });
  const result = new Set();
  while (queue.length > 0) {
    const [r, c, skip, dir, count, cheetIDD] = queue.pop();
    const [dr, dc] = dir;

    if (cheetIDD.length === 2 && result.has(JSON.stringify(cheetIDD))) continue;
    // let y = 84;
    // let diff = 12;
    let diff = 100;
    let y = 9320;
    if (count > y - diff) continue;
    if (r === endPosition[0] && c === endPosition[1]) {
      // console.log("qui");
      if (cheetIDD.length === 2) {
        const x = y - count;
        if (x >= diff) {
          result.add(JSON.stringify(cheetIDD));
        }
      }
      continue;
    }

    if (isValidCell2(input, [r + dr, c + dc])) {
      let cID;
      if (skip !== maxSkip && skip !== -1) {
        cID = [...cheetIDD, [r + dr, c + dc]];
      }
      const next = [
        r + dr,
        c + dc,
        skip !== maxSkip ? -1 : skip,
        dir,
        count + 1,
        cID ? cID : cheetIDD,
      ];
      !result.has(JSON.stringify(cID ? cID : cheetIDD)) && queue.push(next);
    } else if (skip > 0) {
      const next = [
        r + dr,
        c + dc,
        skip - 1,
        dir,
        count + 1,
        [[r + dr, c + dc]],
      ];
      queue.push(next);
    }

    const nextDirs = directionsMap[merge(dr, dc)];
    nextDirs.forEach(([dr2, dc2]) => {
      if (isValidCell2(input, [r + dr2, c + dc2])) {
        let cID;
        if (skip !== maxSkip && skip !== -1) {
          cID = [...cheetIDD, [r + dr2, c + dc2]];
        }
        const next = [
          r + dr2,
          c + dc2,
          skip !== maxSkip ? -1 : skip,
          [dr2, dc2],
          count + 1,
          cID ? cID : cheetIDD,
        ];
        queue.push(next);
      } else if (skip > 0) {
        const next = [
          r + dr2,
          c + dc2,
          skip - 1,
          [dr2, dc2],
          count + 1,
          [[r + dr2, c + dc2]],
        ];
        queue.push(next);
      }
    });
  }
  // console.log("ris", ris);
  return result.size;
};
run({
  part1: {
    tests: [
      {
        input: `###############
#...#...#.....#
#.#.#.#.#.###.#
#S#...#.#.#...#
#######.#.#.###
#######.#.#...#
#######.#.###.#
###..E#...#...#
###.#######.###
#...###...#...#
#.#####.#.###.#
#.#...#.#.#...#
#.#.#.#.#.#.###
#...#...#...###
###############`,
        expected: "",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      //       {
      //         input: `###############
      // #...#...#.....#
      // #.#.#.#.#.###.#
      // #S#...#.#.#...#
      // #######.#.#.###
      // #######.#.#...#
      // #######.#.###.#
      // ###..E#...#...#
      // ###.#######.###
      // #...###...#...#
      // #.#####.#.###.#
      // #.#...#.#.#...#
      // #.#.#.#.#.#.###
      // #...#...#...###
      // ###############`,
      //         expected: "",
      //       },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
