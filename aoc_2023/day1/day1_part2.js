const { rowsFromTextFile } = require("../../generateArrayFromTextFile");

function day1_part2() {
  const rowsFromFile = rowsFromTextFile("aoc_2023/day1/day1_input.txt");

  const rows = rowsFromFile.map((row) =>
    row
      .replaceAll("one", "o1e")
      .replaceAll("two", "t2o")
      .replaceAll("three", "t3e")
      .replaceAll("four", "f4r")
      .replaceAll("five", "f5e")
      .replaceAll("six", "s6x")
      .replaceAll("seven", "s7n")
      .replaceAll("eight", "e8t")
      .replaceAll("nine", "n9e")
  );

  const map = {
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
  };

  let sum = 0;

  for (const row of rows) {
    const len = row.length;
    let charLeft = 0;
    let charRight = 0;
    for (let i = 0; i < len; i++) {
      const charL = map[row[i]];
      const charR = map[row[len - 1 - i]];
      if (!charLeft && charL) {
        charLeft = charL;
      }
      if (!charRight && charR) {
        charRight = charR;
      }
    }
    sum = sum + charLeft * 10 + charRight;
  }
  return sum;
}

module.exports = { day1_part2 };
