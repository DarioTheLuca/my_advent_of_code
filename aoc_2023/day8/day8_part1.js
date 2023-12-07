const { rowsFromTextFile } = require("../../generateArrayFromTextFile");

function day8_part1() {
  const rows = rowsFromTextFile("aoc_2023/day8/day8_input.txt");
  console.log("rows", rows);

  let result = 0;

  return result;
}
console.log(day8_part1());
module.exports = { day8_part1 };
