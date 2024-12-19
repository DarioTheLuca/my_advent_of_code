import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n");

const merge = (...args) => args.reduce((acc, curr) => acc + curr + ",", "");
const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const posSet = new Set();

  const rowLen = input.length;
  const colLen = input[0].length;
  const isPosValid = (pos) => {
    const { row, col } = pos;
    if (row >= 0 && row < rowLen && col >= 0 && col < colLen) return true;
    return false;
  };

  const mapAnt = {};
  for (let i = 0; i < rowLen; i++) {
    const riga = input[i];
    for (let j = 0; j < colLen; j++) {
      const cell = riga[j];
      if (cell !== ".") {
        if (mapAnt[cell]) {
          mapAnt[cell].push({ row: i, col: j });
        } else {
          mapAnt[cell] = [{ row: i, col: j }];
        }
      }
    }
  }

  Object.values(mapAnt).forEach((listaPos) => {
    listaPos.forEach((pos) => {
      listaPos.forEach((pos2) => {
        const diff = {
          row: Math.abs(pos.row - pos2.row),
          col: Math.abs(pos.col - pos2.col),
        };
        if (diff.row === 0 && diff.col === 0) return;
        const top = pos.row < pos2.row ? pos : pos2;
        const bottom = pos.row > pos2.row ? pos : pos2;
        let cell1;
        let cell2;
        if (top.col < bottom.col) {
          cell1 = {
            row: top.row - diff.row,
            col: top.col - diff.col,
          };
          cell2 = {
            row: top.row + 2 * diff.row,
            col: top.col + 2 * diff.col,
          };
        } else {
          cell1 = {
            row: top.row - diff.row,
            col: top.col + diff.col,
          };
          cell2 = {
            row: top.row + 2 * diff.row,
            col: top.col - 2 * diff.col,
          };
        }
        if (isPosValid(cell1)) posSet.add(merge(cell1.row, cell1.col));
        if (isPosValid(cell2)) posSet.add(merge(cell2.row, cell2.col));
      });
    });
  });

  return posSet.size;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const posSet = new Set();

  const rowLen = input.length;
  const colLen = input[0].length;
  const isPosValid = (pos) => {
    const { row, col } = pos;
    if (row >= 0 && row < rowLen && col >= 0 && col < colLen) return true;
    return false;
  };

  const mapAnt = {};
  for (let i = 0; i < rowLen; i++) {
    const riga = input[i];
    for (let j = 0; j < colLen; j++) {
      const cell = riga[j];
      if (cell !== ".") {
        if (mapAnt[cell]) {
          mapAnt[cell].push({ row: i, col: j });
        } else {
          mapAnt[cell] = [{ row: i, col: j }];
        }
      }
    }
  }

  Object.values(mapAnt).forEach((listaPos) => {
    listaPos.forEach((pos) => {
      if (listaPos.length > 1) posSet.add(merge(pos.row, pos.col));
      listaPos.forEach((pos2) => {
        const diff = {
          row: Math.abs(pos.row - pos2.row),
          col: Math.abs(pos.col - pos2.col),
        };
        if (diff.row === 0 && diff.col === 0) return;
        const top = pos.row < pos2.row ? pos : pos2;
        const bottom = pos.row > pos2.row ? pos : pos2;

        let diffCell1;
        let diffCell2;
        if (top.col < bottom.col) {
          diffCell1 = { row: -diff.row, col: -diff.col };
          diffCell2 = { row: diff.row, col: diff.col };
        } else {
          diffCell1 = { row: -diff.row, col: +diff.col };
          diffCell2 = { row: diff.row, col: -diff.col };
        }

        let currCell1 = {
          row: top.row + diffCell1.row,
          col: top.col + diffCell1.col,
        };
        while (isPosValid(currCell1)) {
          posSet.add(merge(currCell1.row, currCell1.col));
          currCell1 = {
            row: currCell1.row + diffCell1.row,
            col: currCell1.col + diffCell1.col,
          };
        }

        let currCell2 = {
          row: bottom.row + diffCell2.row,
          col: bottom.col + diffCell2.col,
        };
        while (isPosValid(currCell2)) {
          posSet.add(merge(currCell2.row, currCell2.col));
          currCell2 = {
            row: currCell2.row + diffCell2.row,
            col: currCell2.col + diffCell2.col,
          };
        }
      });
    });
  });

  return posSet.size;
};

run({
  part1: {
    tests: [
      {
        input: `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`,
        expected: 14,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`,
        expected: 34,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
