import run from "aocrunner";

const parseInput = (rawInput: string) => {
  return rawInput.split(",");
};

const part1 = (rawInput: string) => {
  const rows = parseInput(rawInput);
  let sum = 0;
  for (const row of rows) {
    sum += stringToASCII(row);
  }

  return sum;
};

function stringToASCII(string: string) {
  let reminder = 0;
  for (let i = 0; i < string.length; i++) {
    let code = string.charCodeAt(i) + reminder;
    let cm = code * 17;
    let r = Math.floor(cm / 256);
    reminder = cm - 256 * r;
  }
  return reminder;
}

const part2 = (rawInput: string) => {
  const rows = parseInput(rawInput);
  const map = new Map<number, { label: string; value: string }[]>();
  for (const row of rows) {
    const isEq = row[row.length - 1] !== "-";
    if (isEq) {
      const label: string[] = row.split("=");
      const labelAS = stringToASCII(label[0]);
      if (map.has(labelAS)) {
        if (map.get(labelAS)!.find((e) => e.label === label[0])) {
          let newA = [...map.get(labelAS)!].map((e) => {
            if (e.label === label[0]) {
              return { label: label[0], value: label[1] };
            } else {
              return e;
            }
          });
          map.set(labelAS, newA);
        } else {
          map.set(labelAS, [
            ...map.get(labelAS)!,
            { label: label[0], value: label[1] },
          ]);
        }
      } else {
        map.set(labelAS, [{ label: label[0], value: label[1] }]);
      }
    } else {
      const label = row.split("-");

      const labelAS = stringToASCII(label[0]);

      if (map.has(labelAS)) {
        let b = [...map.get(labelAS)!].filter((e) => e.label !== label[0]);
        if (b.length === 0) {
          map.delete(labelAS);
        } else {
          map.set(labelAS, b);
        }
      }
    }
  }
  let sum = 0;
  Array.from(map.keys()).forEach((key) => {
    sum += map
      .get(key)!
      .reduce(
        (acc, curr, index) =>
          acc + (key + 1) * (index + 1) * Number(curr.value),
        0,
      );
  });
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
      {
        input: `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`,
        expected: 145,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
