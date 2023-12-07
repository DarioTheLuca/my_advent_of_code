const { rowsFromTextFile } = require("../../generateArrayFromTextFile");
const { findHandValue } = require("./utils");

function day7_part2() {
  const numberOfCardsInHand = 5;
  const map = {
    A: 14,
    K: 13,
    Q: 12,
    T: 10,
    9: 9,
    8: 8,
    7: 7,
    6: 6,
    5: 5,
    4: 4,
    3: 3,
    2: 2,
    J: 1,
  };

  const hands = rowsFromTextFile("aoc_2023/day7/day7_input.txt").map((r) =>
    r.split(" ").map((e, i) => (i === 1 ? Number(e) : e))
  );

  const mapType = new Map();

  hands.forEach((hand) => {
    const handCards = hand[0];
    const valueHand = findHandValue(handCards, "J");
    if (mapType.has(valueHand)) {
      mapType.set(
        valueHand,
        [...mapType.get(valueHand), hand].sort((a, b) => {
          for (let i = 0; i < numberOfCardsInHand; i++) {
            const valueHandA = map[a[0][i]];
            const valueHandB = map[b[0][i]];
            if (valueHandA === valueHandB) continue;
            if (valueHandA > valueHandB) {
              return 1;
            } else {
              return -1;
            }
          }
        })
      );
    } else {
      mapType.set(valueHand, [hand]);
    }
  });
  const orderendHands = [];
  Array.from(mapType.keys())
    .sort()
    .forEach((type) => {
      mapType.get(type).forEach((hand) => orderendHands.push(hand));
    });

  let result = 0;

  for (let i = 0; i < orderendHands.length; i++) {
    result = result + (i + 1) * orderendHands[i][1];
  }

  return result;
}

module.exports = { day7_part2 };
