import run from "aocrunner";

const parseInput = (rawInput: string) => {
  return rawInput.split("\n").map((r) =>
    r
      .split(" (")[0]
      .split(" ")
      .map((e, i) => (i % 2 !== 0 ? parseInt(e) : e)),
  );
};
const parseInput2 = (rawInput: string) => {
  return rawInput
    .split("\n")
    .map((r) => r.split("#")[1].substring(0, r.split("#")[1].length - 1));
};

const part1 = (rawInput: string) => {
  const rows = parseInput(rawInput) as [string, number][];

  const cor = getEdgesCoordinates(rows);
  const perimeter = getPerimeter(rows);

  // Shoelace formula
  const Area = getShoelaceArea(cor);

  // Pick's theorem
  const internalPoints = getPickInternalPoints(Area, perimeter);

  return internalPoints + perimeter;
};

const part2 = (rawInput: string) => {
  const rows_pre = parseInput2(rawInput) as string[];
  const map = {
    0: "R",
    1: "D",
    2: "L",
    3: "U",
  };
  const rows: [string, number][] = rows_pre.map((r: string) => {
    const dir = map[parseInt(r[r.length - 1]) as keyof typeof map];
    const ex = r.substring(0, r.length - 1);
    const dig = parseInt(ex, 16);
    return [dir, dig];
  });

  const cor = getEdgesCoordinates(rows);
  const perimeter = getPerimeter(rows);

  // Shoelace formula
  const Area = getShoelaceArea(cor);

  // Pick's theorem
  const internalPoints = getPickInternalPoints(Area, perimeter);

  return internalPoints + perimeter;
};

function getEdgesCoordinates(rows: [string, number][]) {
  const cor = [{ i: 0, j: 0 }];
  const len = rows.length;
  for (let i = 0; i < len; i++) {
    const lastCor = cor[cor.length - 1];
    const [dir, num] = rows[i];
    if (lastCor.i === 0 && lastCor.j + num === 0) continue;
    if (dir === "R") cor.push({ i: lastCor.i, j: lastCor.j + num });
    if (dir === "L") cor.push({ i: lastCor.i, j: lastCor.j - num });
    if (dir === "D") cor.push({ i: lastCor.i + num, j: lastCor.j });
    if (dir === "U") cor.push({ i: lastCor.i - num, j: lastCor.j });
  }

  return cor;
}

function getPerimeter(rows: [string, number][]) {
  let perimeter = 0;
  const len = rows.length;
  for (let i = 0; i < len; i++) {
    const [dir, num] = rows[i];
    if (dir === "R") {
      for (let c = 1; c <= num; c++) perimeter++;
    } else if (dir === "L") {
      for (let c = -1; c >= -num; c--) perimeter++;
    } else if (dir === "D") {
      for (let r = +1; r <= +num; r++) perimeter++;
    } else if (dir === "U") {
      for (let r = -1; r >= -num; r--) perimeter++;
    }
  }
  return perimeter;
}

function getShoelaceArea(edgesCoordinates: { i: number; j: number }[]): number {
  const vlen = edgesCoordinates.length;
  // Shoelace formula
  let a = 0;
  for (let i = 0; i < vlen; i++) {
    let sup = i + 1 < vlen ? i + 1 : 0;
    a =
      a +
      edgesCoordinates[i].i * edgesCoordinates[sup].j -
      edgesCoordinates[i].j * edgesCoordinates[sup].i;
  }
  const Area = 0.5 * Math.abs(a);
  return Area;
}

function getPickInternalPoints(area: number, perimeter: number) {
  return area + 1 - perimeter / 2;
}

run({
  part1: {
    tests: [
      {
        input: `
        R 6 (#70c710)
        D 5 (#0dc571)
        L 2 (#5713f0)
        D 2 (#d2c081)
        R 2 (#59c680)
        D 2 (#411b91)
        L 5 (#8ceee2)
        U 2 (#caa173)
        L 1 (#1b58a2)
        U 2 (#caa171)
        R 2 (#7807d2)
        U 3 (#a77fa3)
        L 2 (#015232)
        U 2 (#7a21e3)`,
        expected: 62,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        R 6 (#70c710)
        D 5 (#0dc571)
        L 2 (#5713f0)
        D 2 (#d2c081)
        R 2 (#59c680)
        D 2 (#411b91)
        L 5 (#8ceee2)
        U 2 (#caa173)
        L 1 (#1b58a2)
        U 2 (#caa171)
        R 2 (#7807d2)
        U 3 (#a77fa3)
        L 2 (#015232)
        U 2 (#7a21e3)`,
        expected: 952408144115,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
