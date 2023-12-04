const { rowsFromTextFile } = require("../../generateArrayFromTextFile");

function day4_part2() {
  const rows = rowsFromTextFile("aoc_2023/day4/day4_input.txt")
    .map((r) => {
      const p = r.split(": ")[1];
      return p.split(" | ");
    })
    .map((r) => r.map((e) => e.split(" ")));

  const map = new Map();
  const len = rows.length;
  let sum = 0;
  for (let i = 0; i < len; i++) {
    if (map.has(i)) {
      map.set(i, map.get(i) + 1);
    } else {
      map.set(i, 1);
    }
    const len2 = rows[i][0].filter((e) => e).length;
    let count = 0;

    for (let j = 0; j < len2; j++) {
      const check = rows[i][1].includes(rows[i][0].filter((e) => e)[j]);
      if (check) count++;
    }
    for (let x = i + 1; x <= i + count; x++) {
      if (map.has(x)) {
        map.set(x, map.get(x) + 1 * map.get(i));
      } else {
        map.set(x, 1 * map.get(i));
      }
    }
  }
  sum = Array.from(map.values()).reduce((acc, e) => {
    return acc + e;
  }, 0);
  return sum;
}
day4_part2();
module.exports = { day4_part2 };
