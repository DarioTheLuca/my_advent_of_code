import run from "aocrunner";

const parseInput = (rawInput: string): [string, number][] => {
  return rawInput
    .split("\n")
    .map(
      (r) =>
        r.split(" ").map((e, i) => (i === 1 ? Number(e) : e)) as [
          string,
          number,
        ],
    );
};
const numberOfCardsInHand = 5;
const part1 = (rawInput: string) => {
  const hands: [string, number][] = parseInput(rawInput);
  const map = {
    A: 14,
    K: 13,
    Q: 12,
    J: 11,
    T: 10,
    9: 9,
    8: 8,
    7: 7,
    6: 6,
    5: 5,
    4: 4,
    3: 3,
    2: 2,
  };
  //mapping the type(from 1 to 7) of hands with the hands that belong to that type
  const mapType = new Map<number, [string, number][]>();

  hands.forEach((hand) => {
    const handCards = hand[0];
    const valueHand = findHandValue(handCards);
    if (mapType.has(valueHand)) {
      mapType.set(
        valueHand,
        [...mapType.get(valueHand)!, hand].sort((a, b) => {
          for (let i = 0; i < numberOfCardsInHand; i++) {
            const valueHandA = map[a[0][i] as keyof typeof map];
            const valueHandB = map[b[0][i] as keyof typeof map];
            if (valueHandA === valueHandB) continue;
            if (valueHandA > valueHandB) {
              return 1;
            } else {
              return -1;
            }
          }
          return 0;
        }),
      );
    } else {
      mapType.set(valueHand, [hand]);
    }
  });

  const orderendHands: [string, number][] = [];
  Array.from(mapType.keys())
    .sort()
    .forEach((type) => {
      mapType
        .get(type)!
        .forEach((hand: [string, number]) => orderendHands.push(hand));
    });

  let result = 0;

  for (let i = 0; i < orderendHands.length; i++) {
    result = result + (i + 1) * orderendHands[i][1];
  }

  return result;
};

const part2 = (rawInput: string) => {
  const hands: [string, number][] = parseInput(rawInput);
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
  const mapType = new Map<number, [string, number][]>();

  hands.forEach((hand) => {
    const handCards = hand[0];
    const valueHand = findHandValue(handCards, "J");
    if (mapType.has(valueHand)) {
      mapType.set(
        valueHand,
        [...mapType.get(valueHand)!, hand].sort((a, b) => {
          for (let i = 0; i < numberOfCardsInHand; i++) {
            const valueHandA = map[a[0][i] as keyof typeof map];
            const valueHandB = map[b[0][i] as keyof typeof map];
            if (valueHandA === valueHandB) continue;
            if (valueHandA > valueHandB) {
              return 1;
            } else {
              return -1;
            }
          }
          return 0;
        }),
      );
    } else {
      mapType.set(valueHand, [hand]);
    }
  });
  const orderendHands: [string, number][] = [];
  Array.from(mapType.keys())
    .sort()
    .forEach((type) => {
      mapType.get(type)!.forEach((hand) => orderendHands.push(hand));
    });

  let result = 0;

  for (let i = 0; i < orderendHands.length; i++) {
    result = result + (i + 1) * orderendHands[i][1];
  }

  return result;
};
function findHandValue(hand: string, jolly?: string) {
  // ma the c
  const mapCardsFrequency = new Map();
  const len = hand.length;
  for (let i = 0; i < len; i++) {
    const currCard = hand[i];
    if (mapCardsFrequency.has(currCard)) {
      mapCardsFrequency.set(currCard, mapCardsFrequency.get(currCard) + 1);
    } else {
      mapCardsFrequency.set(currCard, 1);
    }
  }

  if (jolly && mapCardsFrequency.has(jolly)) {
    let cardWithMaxFrequency = "";
    let maxFrequency = 0;
    Array.from(mapCardsFrequency.keys()).forEach((card) => {
      if (mapCardsFrequency.get(card) > maxFrequency && card !== jolly) {
        maxFrequency = mapCardsFrequency.get(card);
        cardWithMaxFrequency = card;
      }
    });
    // i add the jolly frequency to that of the cards with higher frequency
    mapCardsFrequency.set(
      cardWithMaxFrequency,
      mapCardsFrequency.get(cardWithMaxFrequency) +
        mapCardsFrequency.get(jolly),
    );
    mapCardsFrequency.delete(jolly);
  }
  const currenciesArray = Array.from(mapCardsFrequency.values());
  // there are 5 different cards
  if (currenciesArray.length === 5) {
    return 1;
  }
  // there are three different cards and one pair
  if (currenciesArray.length === 4) {
    return 2;
  }
  // there can be two pairs or three of a kind and two different cards
  if (currenciesArray.length === 3) {
    if (currenciesArray.includes(3)) {
      return 4;
    } else {
      return 3;
    }
  }
  // there are or one pair and three of a kind, or four of a kind
  if (currenciesArray.length === 2) {
    if (currenciesArray.includes(3)) {
      return 5;
    } else {
      return 6;
    }
  }
  // case 5 of the same card
  return 7;
}

run({
  part1: {
    tests: [
      {
        input: `
        32T3K 765
        T55J5 684
        KK677 28
        KTJJT 220
        QQQJA 483
        `,
        expected: 6440,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        32T3K 765
        T55J5 684
        KK677 28
        KTJJT 220
        QQQJA 483
        `,
        expected: 5905,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
