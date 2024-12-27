import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n");
const getInter = (code, map) => {
  // console.log("key", code);
  const arr = map.get(code);
  const groups = [];
  for (const c of arr) {
    if (c !== code) {
      for (const c2 of map.get(c)) {
        if (c2 !== c && c2 !== code && map.get(c2).includes(code)) {
          groups.push([code, c, c2].sort());
        }
      }
    }
  }
  // console.log("groups", groups);
  return groups;
};

const getInter2 = (code, map, count = 0) => {
  // console.log("key", code);
  const arr = map.get(code);
  const groups = [];
  for (const c of arr) {
    if (c !== code) {
      for (const c2 of map.get(c)) {
        if (map.get(c2).includes(code)) {
          groups.push([code, c, c2].sort());
        }
      }
    }
  }
  // console.log("groups", groups);
  return groups;
};

const merge = (...args) => args.reduce((acc, curr) => acc + curr + ",", "");
const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  console.log("input", input);
  const mapT = new Map();
  for (const conn of input) {
    const [a, b] = conn.split("-");
    if (mapT.has(a)) {
      mapT.get(a).push(b);
    } else {
      mapT.set(a, [a, b]);
    }
    if (mapT.has(b)) {
      mapT.get(b).push(a);
    } else {
      mapT.set(b, [b, a]);
    }
  }
  console.log("map", mapT);

  const set = new Set();
  Array.from(mapT.keys()).forEach((key) => {
    if (key[0] === "t") {
      const arr = getInter(key, mapT);
      arr.forEach((keys) => {
        set.add(merge(...keys));
      });
    }
  });

  return set.size;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  console.log("input", input);
  const mapT = new Map();
  for (const conn of input) {
    const [a, b] = conn.split("-");
    if (mapT.has(a)) {
      mapT.get(a).push(b);
    } else {
      mapT.set(a, [a, b]);
    }
    if (mapT.has(b)) {
      mapT.get(b).push(a);
    } else {
      mapT.set(b, [b, a]);
    }
  }
  const arrMap = new Map();
  const mapArr = new Map();

  // Array.from(mapT.keys()).forEach((key, index) => {
  //   if (mapT.get(key).some((el) => el[0] === "t")) {
  //     mapT.get(key).sort();
  //     arrMap.set(index, merge(...mapT.get(key)));
  //     mapArr.set(merge(...mapT.get(key)), index);
  //   } else {
  //     mapT.delete(key);
  //   }
  // });
  // console.log("map", mapT);

  const set = new Set();
  const countKey = new Map();
  // console.log("arrMap", arrMap);
  // console.log("mapArr", mapArr);
  // Array.from(mapT.keys()).forEach((key) => {
  //   if (key[0] === "t") {
  //     const arr = getInter(key, mapT);
  //     arr.forEach((keys) => {
  //       set.add(merge(...keys));
  //     });
  //   }
  // });
  Array.from(mapT.values()).forEach((arr) => {
    // console.log("arr", arr);
    arr.forEach((key) => {
      // countKey.set(key, (countKey.get(key) ?? 0) + 1);
      const id = merge(...arr);
      if (countKey.has(key)) {
        countKey.get(key).add(mapArr.get(id));
      } else {
        countKey.set(key, new Set([mapArr.get(id)]));
      }
    });
  });

  const mapArrNum = new Map();

  // Array.from(mapT.values()).forEach((arr) => {
  //   let set = new Set();
  //   arr.forEach((key) => {
  //     Array.from(countKey.get(key)).forEach((el) => set.add(el));
  //   });
  //   mapArrNum.set(merge(...arr), set.size);
  // });

  // console.log("mapArrNum", mapArrNum);
  // Array.from(countKey.keys()).forEach((key) => {
  //   if (countKey.get(key).size < 4) {
  //     countKey.delete(key);
  //   }
  // });

  let res = [
    "ab",
    "al",
    "cq",
    "cr",
    "da",
    "db",
    "dr",
    "fw",
    "ly",
    "mn",
    "od",
    "py",
    "uh",
  ];
  Array.from(mapT.keys()).forEach((key) => {
    if (res.includes(key)) {
      console.log("key:", key, "value:", mapT.get(key));
    }
  });

  // console.log("countKey", countKey);
  return set.size;
};

run({
  part1: {
    tests: [
      //       {
      //         input: `kh-tc
      // qp-kh
      // de-cg
      // ka-co
      // yn-aq
      // qp-ub
      // cg-tb
      // vc-aq
      // tb-ka
      // wh-tc
      // yn-cg
      // kh-ub
      // ta-co
      // de-co
      // tc-td
      // tb-wq
      // wh-td
      // ta-ka
      // td-qp
      // aq-cg
      // wq-ub
      // ub-vc
      // de-ta
      // wq-aq
      // wq-vc
      // wh-yn
      // ka-de
      // kh-ta
      // co-tc
      // wh-qp
      // tb-vc
      // td-yn`,
      //         expected: 7,
      //       },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `kh-tc
qp-kh
de-cg
ka-co
yn-aq
qp-ub
cg-tb
vc-aq
tb-ka
wh-tc
yn-cg
kh-ub
ta-co
de-co
tc-td
tb-wq
wh-td
ta-ka
td-qp
aq-cg
wq-ub
ub-vc
de-ta
wq-aq
wq-vc
wh-yn
ka-de
kh-ta
co-tc
wh-qp
tb-vc
td-yn`,
        expected: "co,de,ka,ta",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
