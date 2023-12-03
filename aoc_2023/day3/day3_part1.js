const { rowsFromTextFile } = require("../../generateArrayFromTextFile");

const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

function day3_part1() {
  const rows = rowsFromTextFile("aoc_2023/day3/day3_input.txt").map(
    (r) => r + "."
  );
  let sum = 0;
  const lenRows = rows.length;
  const lenColumns = rows[0].length;
  for (let i = 0; i < lenRows; i++) {
    let number = "";
    let numberIndexStart = undefined;

    for (j = 0; j < lenColumns; j++) {
      const currChar = rows[i][j];
      //ask if the currentChar is a number digit
      if (digits.includes(currChar)) {
        number += currChar;

        if (numberIndexStart === undefined) {
          numberIndexStart = j;
        }
      } else if (currChar !== "." && number) {
        // if the current char is not a dot, and not a digit than it is a symbol
        sum = sum + Number(number);
      } else if (number) {
        let foundSymbol = false;
        // search if there is an adjacent symbol
        for (let c = numberIndexStart - 1; c <= j; c++) {
          if (foundSymbol) break;
          if (c < 0 || c >= lenColumns) continue;

          for (let r = i - 1; r <= i + 1; r++) {
            if (foundSymbol) break;
            if (r < 0 || r >= lenRows) continue;

            const adjacentCell = rows[r][c];

            if (!digits.includes(adjacentCell) && adjacentCell !== ".") {
              sum = sum + Number(number);
              foundSymbol = true;
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

  return sum;
}

module.exports = { day3_part1 };
