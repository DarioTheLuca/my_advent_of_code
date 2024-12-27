import run from "aocrunner";
const opMap = {
  XOR: (a, b) => a ^ b,
  OR: (a, b) => a || b,
  AND: (a, b) => a && b,
};
const parseInput = (rawInput) =>
  rawInput.split("\n\n").map((el) => el.split("\n"));

const part1 = (rawInput) => {
  let [inputs, ops] = parseInput(rawInput);
  const valueMap = new Map();
  inputs = inputs.map((inp) => {
    const [key, value] = inp.split(": ");
    valueMap.set(key, Number(value));
    return { key, value: Number(value) };
  });
  const resMap = new Map();

  ops = ops.map((op) => {
    const [operation, res] = op.split(" -> ");
    const oper = operation.includes("XOR")
      ? "XOR"
      : operation.includes("AND")
      ? "AND"
      : "OR";
    const [left, right] = operation.split(" " + oper + " ");
    resMap.set(res, { left, right, oper, res });
    return { left, right, oper, res };
  });
  // console.log("inpit", inputs);
  // console.log("ops", ops);
  // console.log("resMap", resMap);

  function calculate(resMap, res) {
    if (valueMap.has(res)) {
      return valueMap.get(res);
    }
    const { left, right, oper } = resMap.get(res);
    // console.log("left right STOP", left, right, oper);
    const l = calculate(resMap, left);
    const r = calculate(resMap, right);
    // console.log("left right ope", l, r, oper);
    const result = opMap[oper](l, r);
    // console.log("key result", res, result);
    valueMap.set(res, result);
    resMap.delete(res);
    return result;
  }
  while (Array.from(resMap.keys()).length) {
    const key = Array.from(resMap.keys())[0];
    const { left, right, oper, res } = resMap.get(key);
    calculate(resMap, res);
  }
  // console.log("valueMap", valueMap);
  const reusultMap = new Map();
  for (const key of Array.from(valueMap.keys())) {
    // console.log("keeeeeeey", key);
    if (key[0] === "z") {
      reusultMap.set(Number(key.replace("z", "")), valueMap.get(key));
    }
  }
  // console.log("re", reusultMap);
  let sum = "";
  Array.from(reusultMap.keys())
    .sort((a, b) => b - a)
    .forEach((key) => {
      // console.log("key", key);
      sum = sum + reusultMap.get(key);
    });
  return parseInt(sum,2);
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `x00: 1
x01: 0
x02: 1
x03: 1
x04: 0
y00: 1
y01: 1
y02: 1
y03: 1
y04: 1

ntg XOR fgs -> mjb
y02 OR x01 -> tnw
kwq OR kpj -> z05
x00 OR x03 -> fst
tgd XOR rvg -> z01
vdt OR tnw -> bfw
bfw AND frj -> z10
ffh OR nrd -> bqk
y00 AND y03 -> djm
y03 OR y00 -> psh
bqk OR frj -> z08
tnw OR fst -> frj
gnj AND tgd -> z11
bfw XOR mjb -> z00
x03 OR x00 -> vdt
gnj AND wpb -> z02
x04 AND y00 -> kjc
djm OR pbm -> qhw
nrd AND vdt -> hwm
kjc AND fst -> rvg
y04 OR y02 -> fgs
y01 AND x02 -> pbm
ntg OR kjc -> kwq
psh XOR fgs -> tgd
qhw XOR tgd -> z09
pbm OR djm -> kpj
x03 XOR y03 -> ffh
x00 XOR y04 -> ntg
bfw OR bqk -> z06
nrd XOR fgs -> wpb
frj XOR qhw -> z04
bqk OR frj -> z07
y03 OR x01 -> nrd
hwm AND bqk -> z03
tgd XOR rvg -> z12
tnw OR pbm -> gnj`,
        expected: 2024,
      },
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
