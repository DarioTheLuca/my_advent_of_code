const { rowsFromTextFile } = require("../../generateArrayFromTextFile");
const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const gear = "*";

function day3_part2() {
  const rows = rowsFromTextFile("aoc_2023/day3/day3_input.txt").map(
    //add a dot at the end of every row to handle edge case of number at the end
    (r) => r + "."
  );
  const map = new Map();
 
  const lenRows = rows.length;
  const lenColumns = rows[0].length;
  for (let i = 0; i < lenRows; i++) {
    let number = "";
    //save the index where the number start
    let numberIndexStart = undefined;
    for (j = 0; j < lenColumns; j++) {
      const currChar = rows[i][j];
      if (digits.includes(currChar)) {
        number += currChar;
        if (numberIndexStart === undefined) {
          numberIndexStart = j;
        }
      } else if (currChar === gear && number) {
        const k = i + "," + j;
        if (map.has(k)) {
          const newValue = map.get(k)[1] * Number(number);
          const newFrequency = map.get(k)[0] + 1;
          map.set(k, [newFrequency, newValue]);
        } else {
            //set the occurrency of numbers adjacent to a specific gear, and the number
          map.set(k, [1, Number(number)]);
        }
      } else if (number) {
        for (let c = numberIndexStart - 1; c <= j; c++) {
          if (c < 0 || c >= lenColumns) continue;
          for (let r = i - 1; r <= i + 1; r++) {
            if (r < 0 || r >= lenRows) continue;
            const adjacentCell = rows[r][c];
            if (adjacentCell === gear) {
              const k = r + "," + c;
              if (map.has(k)) {
                const newValue = map.get(k)[1] * Number(number);
                const newFrequency = map.get(k)[0] + 1;
                map.set(k, [newFrequency, newValue]);
              } else {
                map.set(k, [1, Number(number)]);
              }
            }
          }
        }
      }
      if (!digits.includes(currChar)) {
        numberIndexStart = undefined;
        number = "";
      }
    }
  }

  let sum = Array.from(map.values())
    .filter((v) => v[0] === 2)
    .reduce((acc, v) => {
      acc = acc + v[1];
      return acc
    }, 0);

  return sum;
}

module.exports = { day3_part2 };
