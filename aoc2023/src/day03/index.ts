import run from "aocrunner";

const parseInput = (rawInput: string) => {
  return rawInput.split("\n").map((r) => r + ".");
};
const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const gear = "*";

const part1 = (rawInput: string) => {
  const rows = parseInput(rawInput);

  let sum = 0;
  const lenRows = rows.length;
  const lenColumns = rows[0].length;
  for (let i = 0; i < lenRows; i++) {
    let number = "";
    let numberIndexStart = undefined;

    for (let j = 0; j < lenColumns; j++) {
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
      } else if (number && numberIndexStart) {
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
};

const part2 = (rawInput: string) => {
  const rows = parseInput(rawInput);

  const map = new Map();

  const lenRows = rows.length;
  const lenColumns = rows[0].length;
  for (let i = 0; i < lenRows; i++) {
    let number = "";
    //save the index where the number start
    let numberIndexStart = undefined;
    for (let j = 0; j < lenColumns; j++) {
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
      } else if (number && numberIndexStart) {
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
      return acc;
    }, 0);

  return sum;
};

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
