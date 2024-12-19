import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n");

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const orderMap = new Map();
  const list = [];
  let sum = 0;
  input.forEach((el) => {
    if (el.includes("|")) {
      const [num1, num2] = el.split("|");
      if (orderMap.has(num2)) {
        orderMap.set(num2, [...orderMap.get(num2), num1]);
      } else {
        orderMap.set(num2, [num1]);
      }
    } else if (el !== "") {
      list.push(el);
    }
  });
  for (let i = 0; i < list.length; i++) {
    const currList = list[i].split(",");
    const len = currList.length;
    if (
      currList.every((num, index) => {
        if (orderMap.has(num)) {
          const prevNums = orderMap.get(num);
          if (
            [...currList].slice(index).some((nextNum) => {
              if (prevNums.includes(nextNum)) {
                return true;
              } else {
                return false;
              }
            })
          ) {
            return false;
          } else {
            return true;
          }
        }
        return true;
      })
    ) {
      const index = (len - 1) / 2;
      sum = sum + Number(currList[index]);
    }
  }
  // console.log("input", input, orderMap);
  return sum;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const orderMap = new Map();
  const list = [];
  let sum = 0;
  input.forEach((el) => {
    if (el.includes("|")) {
      const [num1, num2] = el.split("|");
      if (orderMap.has(num2)) {
        orderMap.set(num2, [...orderMap.get(num2), num1]);
      } else {
        orderMap.set(num2, [num1]);
      }
    } else if (el !== "") {
      list.push(el);
    }
  });
  const isvalidList = (_list) => {
    let indexes = [];
    const isValid = _list.every((num, index1) => {
      if (orderMap.has(num)) {
        const prevNums = orderMap.get(num);
        if (
          [..._list].slice(index1).some((nextNum, index2) => {
            if (prevNums.includes(nextNum)) {
              indexes[0] = index1;
              indexes[1] = index1 + index2;
              return true;
            } else {
              return false;
            }
          })
        ) {
          return false;
        } else {
          return true;
        }
      }
      return true;
    });
    return { isValid, indexes };
  };
  for (let i = 0; i < list.length; i++) {
    let currList = list[i].split(",");
    const len = currList.length;
    const { isValid } = isvalidList(currList);
    if (!isValid) {
      let isValid2 = isValid;
      while (!isValid2) {
        const { isValid, indexes } = isvalidList(currList);
        if (!isValid) {
          const save = currList[indexes[0]];
          currList[indexes[0]] = currList[indexes[1]];
          currList[indexes[1]] = save;
        } else {
          isValid2 = isValid;
        }
      }
      const index = (len - 1) / 2;
      sum = sum + Number(currList[index]);
    }
  }

  return sum;
};

run({
  part1: {
    tests: [
      {
        input: `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`,
        expected: 143,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`,
        expected: 123,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
