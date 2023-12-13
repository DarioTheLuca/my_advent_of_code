import run from "aocrunner";

const parseInput = (rawInput: string) => {
  return rawInput.split("\n\n").map((e) => e.split("\n"));
};

 function solution(rows:string[][],diffPossible:number){
  
  let sum = 0;

  for (const row of rows) {
    const lenRow = row.length;
    const lenCol = row[0].length;

    let rowsBefore = 0;
    for (let i = 0; i < lenRow - 1; i++) {
      let diffCount = 0;
      for (let x = Math.min(i * 2 + 1, lenRow - 1); x > i; x--) {
        for (let j = 0; j < lenCol; j++) {
          if (row[2 * i + 1 - x][j] !== row[x][j]) {
            diffCount++;
          }
          if (diffCount > diffPossible) {
            break;
          }
        }
      }

      if (diffCount === diffPossible) {
        rowsBefore = i + 1;
      }
    }
    let columnsBefore = 0;

    for (let i = 0; i < lenCol - 1; i++) {
      let diffCount = 0;
      for (let x = Math.min(i * 2 + 1, lenCol - 1); x > i; x--) {
        for (let j = 0; j < lenRow; j++) {
          if (row[j][2 * i + 1 - x] !== row[j][x]) {
            diffCount++;
          }
          if (diffCount > diffPossible) {
            break;
          }
        }
      }

      if (diffCount === diffPossible) {
        columnsBefore = i + 1;
      }
    }

    sum = sum + columnsBefore + 100 * rowsBefore;
  }
  return sum
 }
const part1 = (rawInput: string) => {
  const diffPossible = 0;
  const rows = parseInput(rawInput);
  
  return solution(rows,diffPossible)
};

const part2 = (rawInput: string) => {
  const diffPossible = 1;
  const rows = parseInput(rawInput);
  
  return solution(rows,diffPossible)
};

run({
  part1: {
    tests: [
      // {
      //   input: `
      //   #.##..##.
      //   ..#.##.#.
      //   ##......#
      //   ##......#
      //   ..#.##.#.
      //   ..##..##.
      //   #.#.##.#.
      //   #...##..#
      //   #....#..#
      //   ..##..###
      //   #####.##.
      //   #####.##.
      //   ..##..###
      //   #....#..#`,
      //   expected: 405,
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: `
      //   #.##..##.
      //   ..#.##.#.
      //   ##......#
      //   ##......#
      //   ..#.##.#.
      //   ..##..##.
      //   #.#.##.#.
      //   #...##..#
      //   #....#..#
      //   ..##..###
      //   #####.##.
      //   #####.##.
      //   ..##..###
      //   #....#..#`,
      //   expected: 400,
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
