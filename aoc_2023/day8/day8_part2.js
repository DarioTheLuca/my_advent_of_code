const { rowsFromTextFile } = require("../../generateArrayFromTextFile");
const { lcm } = require('./utils');


function day8_part2() {
  const rows = rowsFromTextFile("aoc_2023/day8/day8_input.txt").filter((r) => r);
  const dir = rows.shift();
  const nR = rows.map((r) => {
    return r.substring(0, r.length - 1);
  });

  const map = new Map();
  nR.forEach((r) => {
    let newR = r.split(" = (");

    map.set(newR[0], newR[1].split(", "));


  });

  function findZ(start, dir) {}

  let result = [];
  let next = Array.from(map.keys()).filter((k) => k[2] === "A");
  for (ne of next) {
    let p = ne;
    let find = false;
    let count =0;
    while (!find) {
      for (let i = 0; i < dir.length; i++) {
        count++;
        if (dir[i] === "R") {
          p =  map.get(p)[1];
          if (p[2] === "Z") {
            find = true;
            break;
          }
        } else {
          p =  map.get(p)[0];
          if (p[2] === "Z") {
            find = true;
            break;
          }
        }
      }
    }
    result.push(count)
  }

  return lcm(result);
}
console.log(day8_part2());
module.exports = { day8_part2 };
