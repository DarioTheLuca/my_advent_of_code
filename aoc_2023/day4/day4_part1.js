const { rowsFromTextFile } = require("../../generateArrayFromTextFile");

function day4_part1() {
  const rows = rowsFromTextFile("aoc_2023/day4/day4_input.txt")
    .map((r) => {
      const p = r.split(": ")[1];
      return p.split(" | ");
    })
    .map((r) => r.map((e) => e.split(" ")).map(v=>v.filter((e) => e)));

  let sum = 0;

  for (const row of rows) {
    const len2 = row[0].length;
    let count = 0;
    for (let j = 0; j < len2; j++) {
      const check = row[1].includes(row[0][j]);
      if (check) count++;
    }

    let mux = 0;
    if (count > 0) mux = Math.pow(2, count - 1);

    sum = sum + mux;
  }
  return sum;
}

module.exports = { day4_part1 };
