const { rowsFromTextFile } = require("../../generateArrayFromTextFile");

function day8_part2() {
  const rows = rowsFromTextFile("aoc_2023/day8/day8_input.txt");

  console.log("rows", rows);

  let result = 0;

  return result;
}
console.log(day8_part2());
module.exports = { day8_part2 };
