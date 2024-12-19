import run from "aocrunner";

const parseInput = (rawInput: string) => {
  return rawInput.split("\n");
};

const part1 = (rawInput: string) => {
  const rows = parseInput(rawInput);
  const idx = rows.indexOf("");
  const workflows = rows.slice(0, idx);
  const parts = rows.slice(idx + 1, rows.length).map((r) =>
    r
      .replace("{", "")
      .replace("}", "")
      .split(",")
      .reduce((acc: { [k: string]: number }, curr: string) => {
        const k = curr[0];
        const v = parseInt(curr.split("=")[1]);
        acc[k] = v;
        return acc;
      }, {}),
  );
  const map = new Map<string, string[][]>();
  workflows.forEach((p) => {
    const i = p.indexOf("{");
    const k = p.substring(0, i);
    const v = p
      .substring(i, p.length)
      .replace("{", "")
      .replace("}", "")
      .split(",")
      .map((e) => e.split(":"));
    map.set(k, v);
  });
  let sum = 0;
  const len = parts.length;
  for (let i = 0; i < len; i++) {
    const part = parts[i] as { x: number; m: number; a: number; s: number };
    const result = checkWorkflows(part, map, "in");
    if (result === "A")
      sum += Object.values(part).reduce((acc, curr) => acc + curr, 0);
  }

  return sum;
};

function checkWorkflows(
  part: { x: number; m: number; a: number; s: number },
  map: Map<string, string[][]>,
  start: string,
): string {
  const rules = map.get(start)!;
  const len = rules.length;
  for (let i = 0; i < len; i++) {
    const rule = rules[i];
    if (rule.length === 1 && (rule[0] === "A" || rule[0] === "R"))
      return rule[0];
    if (rule.length === 1) return checkWorkflows(part, map, rule[0]);
    const start2 = rule[1];
    const magg = rule[0].includes(">");
    if (magg) {
      const char = rule[0].split(">")[0];
      const num = rule[0].split(">")[1];
      if (part[char as keyof typeof part] > parseInt(num)) {
        return start2 === "A" || start2 === "R"
          ? start2
          : checkWorkflows(part, map, start2);
      }
    } else {
      const char = rule[0].split("<")[0];
      const num = rule[0].split("<")[1];
      if (part[char as keyof typeof part] < parseInt(num)) {
        return start2 === "A" || start2 === "R"
          ? start2
          : checkWorkflows(part, map, start2);
      }
    }
  }

  return "";
}

function checkWorkflows2(
  part: { x: number[]; m: number[]; a: number[]; s: number[] },
  map: Map<string, string[][]>,
  start: string,
): number {
  const rules = map.get(start)!;

  if (start === "A") {
    const r = Object.values(part).reduce(
      (acc, curr) => acc * (curr[1] - curr[0] + 1),
      1,
    );

    return r;
  } else if (start === "R") return 0;

  const len = rules.length;
  let part_comp = { ...part };
  let sum = 0;
  for (let i = 0; i < len; i++) {
    const rule = rules[i];
    if (rule.length === 1 && rule[0] === "A") {
      let s = Object.values(part_comp).reduce(
        (acc, curr) => acc * (curr[1] - curr[0] + 1),
        1,
      );
      sum += s;
      continue;
    }
    if (rule.length === 1 && rule[0] === "R") continue;
    if (rule.length === 1) {
      sum = sum + checkWorkflows2(part_comp, map, rule[0]);
      continue;
    }
    const start2 = rule[1];
    const magg = rule[0].includes(">");
    if (magg) {
      const char = rule[0].split(">")[0];
      const num = parseInt(rule[0].split(">")[1]);
      const newP = {
        ...part_comp,
        [char]: [num + 1, part_comp[char as keyof typeof part_comp][1]],
      };
      sum = sum + checkWorkflows2(newP, map, start2);
      part_comp = {
        ...part_comp,
        [char]: [part_comp[char as keyof typeof part_comp][0], num],
      };
      continue;
    } else {
      const char = rule[0].split("<")[0];
      const num = parseInt(rule[0].split("<")[1]);
      const newP = {
        ...part_comp,
        [char]: [part_comp[char as keyof typeof part_comp][0], num - 1],
      };
      part_comp = {
        ...part_comp,
        [char]: [num, part_comp[char as keyof typeof part_comp][1]],
      };

      sum = sum + checkWorkflows2(newP, map, start2);
      continue;
    }
  }

  return sum;
}
const part2 = (rawInput: string) => {
  const rows = parseInput(rawInput);
  const idx = rows.indexOf("");
  const workflows = rows.slice(0, idx);
  const parts = rows.slice(idx + 1, rows.length).map((r) =>
    r
      .replace("{", "")
      .replace("}", "")
      .split(",")
      .reduce((acc: { [k: string]: number }, curr: string) => {
        const k = curr[0];
        const v = parseInt(curr.split("=")[1]);
        acc[k] = v;
        return acc;
      }, {}),
  );
  const map = new Map<string, string[][]>();
  workflows.forEach((p) => {
    const i = p.indexOf("{");
    const k = p.substring(0, i);
    const v = p
      .substring(i, p.length)
      .replace("{", "")
      .replace("}", "")
      .split(",")
      .map((e) => e.split(":"));
    map.set(k, v);
  });

  const len = parts.length;
  const result = checkWorkflows2(
    { x: [1, 4000], m: [1, 4000], a: [1, 4000], s: [1, 4000] },
    map,
    "in",
  );

  return result;
};

run({
  part1: {
    tests: [
      {
        input: `
        px{a<2006:qkq,m>2090:A,rfg}
        pv{a>1716:R,A}
        lnx{m>1548:A,A}
        rfg{s<537:gd,x>2440:R,A}
        qs{s>3448:A,lnx}
        qkq{x<1416:A,crn}
        crn{x>2662:A,R}
        in{s<1351:px,qqz}
        qqz{s>2770:qs,m<1801:hdj,R}
        gd{a>3333:R,R}
        hdj{m>838:A,pv}
        {x=787,m=2655,a=1222,s=2876}
        {x=1679,m=44,a=2067,s=496}
        {x=2036,m=264,a=79,s=2244}
        {x=2461,m=1339,a=466,s=291}
        {x=2127,m=1623,a=2188,s=1013}`,
        expected: 19114,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        px{a<2006:qkq,m>2090:A,rfg}
        pv{a>1716:R,A}
        lnx{m>1548:A,A}
        rfg{s<537:gd,x>2440:R,A}
        qs{s>3448:A,lnx}
        qkq{x<1416:A,crn}
        crn{x>2662:A,R}
        in{s<1351:px,qqz}
        qqz{s>2770:qs,m<1801:hdj,R}
        gd{a>3333:R,R}
        hdj{m>838:A,pv}

        {x=787,m=2655,a=1222,s=2876}
        {x=1679,m=44,a=2067,s=496}
        {x=2036,m=264,a=79,s=2244}
        {x=2461,m=1339,a=466,s=291}
        {x=2127,m=1623,a=2188,s=1013}`,
        expected: 167409079868000,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
