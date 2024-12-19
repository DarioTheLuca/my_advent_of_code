import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n")[0].split(" ").map(Number);

const changeStone = (num) => {
  // console.log("num",num)
  if (num === 0) return [1];
  const nString = num + "";
  const len = nString.length;
  if (len % 2 === 0) {
    return [
      Number(nString.substring(0, len / 2)),
      Number(nString.substring(len / 2)),
    ];
  }
  return [num * 2024];
};


const changeNTimes = (start, count = 0) => {
  if (count === 0) return start;
  const changed = [];
  start.forEach((num) => {
    const res = changeStone(num);
    // console.log("ressss",res)
    changed.push(...res);
    //     if(num===0){
    // add = add +
    //     }else{

    //     }
  });
  // console.log("changed",changed)
  return changeNTimes(changed, count - 1);
};

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  console.log("input", input);
  let res = changeNTimes(input, 25);
  console.log("res", res);
  return res.length;
};

const cache = new Map();

const merge = (...args) => args.reduce((acc, curr) => acc + curr + ",", "");

const changeNTime = (start, count = 0) => {
  if (count === 0) return start;

  let length = 0;
  start.forEach((num) => {
    const res = changeStone(num);

    res.forEach((n) => {
      let id = merge(n, count);
      if (cache.has(id)) {
        const len = cache.get(id);
        length = length + len;
      } else {
        const len = changeNTime([n], count - 1);
        length = length + len;
      }
    });
  });

  return length;
};

function parse(input) {
  const stones = input
    .split(/\s+/g)
    .map((i) => i.trim())
    .filter((i) => i.length > 0)
    .map((i) => BigInt(i));

  const result = new Map();
  for (const stone of stones) {
    result.set(stone, (result.get(stone) ?? 0) + 1);
  }
  return result;
}
function add(stones, stone, count) {
  stones.set(stone, (stones.get(stone) ?? 0) + count);
}
function tick(stones) {
  const next = new Map();
  for (const [stone, count] of stones) {
    if (stone === 0n) {
      add(next, 1n, count);
      continue;
    }
    const asStr = stone.toString();
    if (asStr.length % 2 === 0) {
      const left = BigInt(asStr.substring(0, asStr.length / 2));
      const right = BigInt(asStr.substring(asStr.length / 2));
      add(next, left, count);
      add(next, right, count);
      continue;
    }
    add(next, stone * 2024n, count);
  }
  return next;
}

const part2 = (rawInput) => {
  let stones = parse(rawInput);
 
  for (let i = 0; i < 75; i++) {
    stones = tick(stones);
    console.log("stones",stones)
  }
  return [...stones].reduce((acc, [, count]) => acc + count, 0);
};

run({
  part1: {
    tests: [
      {
        input: `125 17`,
        expected: 55312,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: `125 17`,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
