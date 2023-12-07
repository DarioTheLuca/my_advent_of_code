function findHandValue(hand, jolly) {
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
      mapCardsFrequency.get(cardWithMaxFrequency) + mapCardsFrequency.get(jolly)
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

module.exports = { findHandValue };
