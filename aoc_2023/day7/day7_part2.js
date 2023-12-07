const { rowsFromTextFile } = require("../../generateArrayFromTextFile");
const { findValue } = require("./utils");

function day7_part2() {
  const map = {
    A: 14,
    K: 13,
    Q: 12,
    T: 10,
    9: 9,
    8: 8,
    7: 7,
    6: 6,
    5: 5,
    4: 4,
    3: 3,
    2: 2,
    J: 1,
};

  const rows = rowsFromTextFile("aoc_2023/day7/day7_input.txt").map((r) =>
    r.split(" ").map((e, i) => (i === 1 ? Number(e) : e))
  );

  const mapT = new Map();

  rows.forEach((r) => {
    const v = findValue(r[0],'J');
    if (mapT.has(v)) {
      mapT.set(
        v,
        [...mapT.get(v), r].sort((a, b) => {
          for (let i = 0; i < 5; i++) {
            if (map[a[0][i]] === map[b[0][i]]) continue;
            if (map[a[0][i]] > map[b[0][i]]) {
              return 1;
            } else {
              return -1;
            }
          }
        })
      );
    } else {
      mapT.set(v, [r]);
    }
  });
  const newA = [];
  Array.from(mapT.keys())
    .sort()
    .forEach((k) => {
      mapT.get(k).forEach((e) => newA.push(e));
    });

  let result = 0;

  for (let i = 0; i < newA.length; i++) {
    result = result + (i + 1) * newA[i][1];
  }

  return result;
}

module.exports = { day7_part2 };
