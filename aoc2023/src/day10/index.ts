import run from "aocrunner";

const parseInput = (rawInput: string) => {
  return rawInput.split("\n");
};

const part1 = (rawInput: string) => {
  const rows1 = parseInput(rawInput);
  const rows = rows1.map((r) => {
    return "." + r + ".";
  });
  // console.log("rows", rows);
  const rowL = rows.length;
  const colL = rows[0].length;
  const sPos = { i: 0, j: 0 };
  for (let i = 0; i < rowL; i++) {
    for (let j = 0; j < colL; j++) {
      const currCell = rows[i][j];
      if (currCell === "S") {
        sPos.i = i;
        sPos.j = j;
        break;
      }
    }
  }
  let count = 0;
  let find = false;
  let i = sPos.i;
  let j = sPos.j;
  let from = ";";
  while (!find) {
    let currC = rows[i][j];
    console.log("curr", currC);
    if (currC === "S" && count > 1) {
      find = true;
      break;
    }
    count++;
    if (currC === undefined) find = true;
    if (count === 5) find = true;
    if (currC === "L" && from === "up") {
      from = "left";
      i = i;
      j = j + 1;
    } else if (currC === "L" && from === "right") {
      from = "down";
      i = i - 1;
      j = j;
    } else if (currC === "J" && from === "left") {
      from = "down";
      i = i - 1;
      j = j;
    } else if (currC === "J" && from === "up") {
      from = "right";
      i = i;
      j = j - 1;
    } else if (currC === "F" && from === "right") {
      from = "up";
      i = i + 1;
      j = j;
    } else if (currC === "F" && from === "down") {
      from = "left";
      i = i;
      j = j + 1;
    } else if (currC === "7" && from === "down") {
      from = "right";
      i = i;
      j = j - 1;
    } else if (currC === "7" && from === "left") {
      from = "up";
      i = i + 1;
      j = j;
    } else if (currC === "|" && from === "up") {
      from = "up";
      i = i + 1;
      j = j;
    } else if (currC === "|" && from === "down") {
      from = "down";
      i = i - 1;
      j = j;
    } else if (currC === "-" && from === "right") {
      from = "right";
      i = i;
      j = j - 1;
    } else if (currC === "-" && from === "left") {
      from = "left";
      i = i;
      j = j + 1;
    }

    if (currC === "S" && count === 1) {
      const cellUp = i > 0 ? rows[i - 1][j] : ".";
      const cellBottom = i < rowL - 1 ? rows[i + 1][j] : ".";
      const cellRight = j <= colL - 1 ? rows[i][j + 1] : ".";
      const cellLeft = j > 0 ? rows[i][j - 1] : ".";
      if (cellBottom === "|" || cellBottom === "L" || cellBottom === "J") {
        from = "up";
        i = i + 1;
        j = j;
      } else if (cellUp === "|" || cellUp === "F" || cellUp === "7") {
        from = "down";
        i = i - 1;
        j = j;
      } else if (cellRight === "-" || cellRight === "7" || cellRight === "J") {
        from = "left";
        i = i;
        j = j + 1;
      } else if (cellLeft === "-" || cellLeft === "F" || cellLeft === "L") {
        from = "right";
        i = i;
        j = j - 1;
      }
    }
  }

  return count / 2;
};

const part2 = (rawInput: string) => {
  const rows1 = parseInput(rawInput);
  const rows = rows1.map((r) => {
    return "." + r + ".";
  });
  // console.log("rows", rows);
  const rowL = rows.length;
  const colL = rows[0].length;
  const sPos = { i: 0, j: 0 };
  for (let i = 0; i < rowL; i++) {
    for (let j = 0; j < colL; j++) {
      const currCell = rows[i][j];
      if (currCell === "S") {
        sPos.i = i;
        sPos.j = j;
        break;
      }
    }
  }
  let count = 0;
  let find = false;
  let i = sPos.i;
  let j = sPos.j;
  let from = ";";

  const points = new Set<string>();
  while (!find) {
    points.add(i + " " + j);
    let currC = rows[i][j];
    if (currC === "S" && count > 1) {
      find = true;
      break;
    }
    count++;
    if (currC === undefined) find = true;

    if (currC === "L" && from === "up") {
      from = "left";
      i = i;
      j = j + 1;
    } else if (currC === "L" && from === "right") {
      from = "down";
      i = i - 1;
      j = j;
    } else if (currC === "J" && from === "left") {
      from = "down";
      i = i - 1;
      j = j;
    } else if (currC === "J" && from === "up") {
      from = "right";
      i = i;
      j = j - 1;
    } else if (currC === "F" && from === "right") {
      from = "up";
      i = i + 1;
      j = j;
    } else if (currC === "F" && from === "down") {
      from = "left";
      i = i;
      j = j + 1;
    } else if (currC === "7" && from === "down") {
      from = "right";
      i = i;
      j = j - 1;
    } else if (currC === "7" && from === "left") {
      from = "up";
      i = i + 1;
      j = j;
    } else if (currC === "|" && from === "up") {
      from = "up";
      i = i + 1;
      j = j;
    } else if (currC === "|" && from === "down") {
      from = "down";
      i = i - 1;
      j = j;
    } else if (currC === "-" && from === "right") {
      from = "right";
      i = i;
      j = j - 1;
    } else if (currC === "-" && from === "left") {
      from = "left";
      i = i;
      j = j + 1;
    }

    if (currC === "S" && count === 1) {
      const cellUp = i > 0 ? rows[i - 1][j] : ".";
      const cellBottom = i < rowL - 1 ? rows[i + 1][j] : ".";
      const cellRight = j <= colL - 1 ? rows[i][j + 1] : ".";
      const cellLeft = j > 0 ? rows[i][j - 1] : ".";
      if (cellBottom === "|" || cellBottom === "L" || cellBottom === "J") {
        from = "up";
        i = i + 1;
        j = j;
      } else if (cellUp === "|" || cellUp === "F" || cellUp === "7") {
        from = "down";
        i = i - 1;
        j = j;
      } else if (cellRight === "-" || cellRight === "7" || cellRight === "J") {
        from = "left";
        i = i;
        j = j + 1;
      } else if (cellLeft === "-" || cellLeft === "F" || cellLeft === "L") {
        from = "right";
        i = i;
        j = j - 1;
      }
    }
  }
  console.log("points", points);
  let result = 0;
  for (let r = 0; r < rowL; r++) {
    for (let c = 1; c < colL - 2; c++) {
      const currCell = r + " " + c;

      let count2 = 0;

      if (!points.has(currCell)) {
        for (let y = 1; y < c; y++) {
          let cell = r + " " + y;

          if (points.has(cell) && rows[r][y] === "|") {
            count2++;
          }
        }

        if (count2 % 2 !== 0) {
          result++;
        }
      }
    }
  }

  return result;
};

// const part2 = (rawInput: string) => {
//   let part2 = 0;
//   const input = parseInput(rawInput);
//   let pos = { x: 0, y: 0, type: "J" }; // My startNode, might be different for other map
//   let map = input.map((val, i) => {
//     let row = val.split("");
//     let sPos = row.indexOf("S");
//     if (sPos > -1) {
//       pos.x = sPos;
//       pos.y = i;
//       row[sPos] = pos.type;
//     }
//     return row;
//   });

//   const topN = "|JL";
//   const leftN = "-7J";
//   const bottomN = "|7F";
//   const rightN = "-LF";

//   const visited = new Set();

//   function getNext(pos: any) {
//     if (topN.includes(pos.type) && !visited.has(`${pos.x}-${pos.y - 1}`))
//       return { x: pos.x, y: pos.y - 1, type: map[pos.y - 1][pos.x] };
//     if (leftN.includes(pos.type) && !visited.has(`${pos.x - 1}-${pos.y}`))
//       return { x: pos.x - 1, y: pos.y, type: map[pos.y][pos.x - 1] };
//     if (bottomN.includes(pos.type) && !visited.has(`${pos.x}-${pos.y + 1}`))
//       return { x: pos.x, y: pos.y + 1, type: map[pos.y + 1][pos.x] };
//     if (rightN.includes(pos.type) && !visited.has(`${pos.x + 1}-${pos.y}`))
//       return { x: pos.x + 1, y: pos.y, type: map[pos.y][pos.x + 1] };
//   }

//   while (true) {
//     visited.add(`${pos.x}-${pos.y}`);
//     pos = getNext(pos)!;
//     if (pos == undefined) break;
//   }

//   const substringsToCount = ["\\|", "L7", "FJ"];
//   const pattern = new RegExp(substringsToCount.join("|"), "g");
//   function countSubstrings(inputString: any) {
//     const matches = inputString.match(pattern);
//     return matches ? matches.length : 0;
//   }

//   map.forEach((row, y) => {
//     let rowM = "";
//     row.forEach((element, x) => {
//       let poly = visited.has(`${x}-${y}`);
//       if (poly) {
//         if (element != "-") rowM += element;
//       }
//       if (!poly && countSubstrings(rowM) & 1) {
//         part2++;
//       }
//     });
//   });

//   return part2;
// };
run({
  part1: {
    tests: [
      {
        input: `
        7-F7-
        .FJ|7
        SJLL7
        |F--J
        LJ.LJ`,
        expected: 8,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: `
      //   FF7FSF7F7F7F7F7F---7
      //   L|LJ||||||||||||F--J
      //   FL-7LJLJ||||||LJL-77
      //   F--JF--7||LJLJ7F7FJ-
      //   L---JF-JLJ.||-FJLJJ7
      //   |F|F-JF---7F7-L7L|7|
      //   |FFJF7L7F-JF7|JL---7
      //   7-L-JL7||F7|L7F-7F7|
      //   L.L7LFJ|||||FJL7||LJ
      //   L7JLJL-JLJLJL--JLJ.L`,
      //   expected: 10,
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
