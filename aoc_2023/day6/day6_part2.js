const { rowsFromTextFile } = require("../../generateArrayFromTextFile");

function day6_part2() {
  const rows = rowsFromTextFile("aoc_2023/day6/day6_input.txt").map((r) => {
    return Number(
      r
        .split(":")[1]
        .split(" ")
        .filter((v) => v)
        .join("")
    );
  });

  let count = 0;
  for (let j = 1; j <= rows[0]; j++) {
    if (j * (rows[0] - j) > rows[1]) {
      count++;
    }
  }

  return count;

}

module.exports = { day6_part2 };
