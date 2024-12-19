import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("").map(Number);

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  const indexFreeSpace = [];
  let newArray = [];
  const indexFiles = [];
  let lastID = -1;
  for (let i = 0; i < input.length; i++) {
    const curr = input[i];
    if (i % 2 === 0) {
      lastID = lastID + 1;
      for (let j = 0; j < curr; j++) {
        newArray.push(lastID);
        indexFiles.push(newArray.length - 1);
      }
    } else {
      for (let j = 0; j < curr; j++) {
        newArray.push(".");
        indexFreeSpace.push(newArray.length - 1);
      }
    }
  }

  indexFreeSpace.forEach((ind, index) => {
    const indexForFile = indexFiles[indexFiles.length - 1 - index];
    if (
      newArray[indexForFile] !== "." &&
      newArray[ind] === "." &&
      indexForFile > ind
    ) {
      newArray[ind] = newArray[indexForFile];
      newArray[indexForFile] = ".";
    }
  });
  let sum = 0;
  newArray.forEach((el, index) => {
    if (el !== ".") sum = sum + index * el;
  });
  return sum;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  // console.log("input", input);

  const indexFreeSpace = [];
  let newArray = [];
  const indexFiles = [];
  let lastID = -1;
  for (let i = 0; i < input.length; i++) {
    const curr = input[i];
    if (i % 2 === 0) {
      lastID = lastID + 1;
      const info = { id: lastID, startIndex: 0, len: curr };
      for (let j = 0; j < curr; j++) {
        newArray.push(lastID);
        if (j === 0) info.startIndex = newArray.length - 1;
      }
      indexFiles.push(info);
    } else {
      const info = { len: curr, startIndex: 0 };
      for (let j = 0; j < curr; j++) {
        newArray.push(".");
        if (j === 0) info.startIndex = newArray.length - 1;
      }
      indexFreeSpace.push(info);
    }
  }
  indexFiles.sort((a, b) => b.id - a.id);
  indexFiles.forEach(({ id, startIndex, len }) => {
    let tempInd = -1;
    let findInd = indexFreeSpace.find((el, index) => {
      if (
        el.len>0 &&

        el.len >= len &&
        startIndex > el.startIndex + el.len - 1
      ) {
        tempInd = index;
        return true;
      }
      return false;
    });
    if (findInd) {
      if (
        startIndex > findInd.startIndex + findInd.len - 1 &&
        id !== "." &&
        newArray[findInd.startIndex] === "."
      ) {
        for (let i = 0; i < len; i++) {
          newArray[findInd.startIndex + i] = id;
          newArray[startIndex + i] = ".";
        }
        indexFreeSpace[tempInd] = {
          startIndex: findInd.startIndex + len,
          len: findInd.len - len,
        };
      }
    }
  });

  let sum = 0;
  newArray.forEach((el, index) => {
    if (el !== ".") sum = sum + index * el;
  });
  return sum;
};

run({
  part1: {
    tests: [
      {
        input: `2333133121414131402`,
        expected: 1928,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `2333133121414131402`,
        expected: 2858,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
