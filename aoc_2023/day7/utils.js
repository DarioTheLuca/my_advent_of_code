function findValue(hand, jolly) {
  const mapC = new Map();
  for (let i = 0; i < hand.length; i++) {
    if (mapC.has(hand[i])) {
      mapC.set(hand[i], mapC.get(hand[i]) + 1);
    } else {
      mapC.set(hand[i], 1);
    }
  }

  if (jolly && mapC.has(jolly) && mapC.get(jolly) !== 5) {
    let keyM = "";
    let max = 0;
    Array.from(mapC.keys()).forEach((k) => {
      if (mapC.get(k) > max && k !== jolly) {
        max = mapC.get(k);
        keyM = k;
      }
    });
    mapC.set(keyM, mapC.get(keyM) + mapC.get(jolly));
    mapC.delete(jolly);
  }
  const v = Array.from(mapC.values());
  if (v.length === 5) {
    return 1;
  }
  if (v.length === 4) {
    return 2;
  }
  if (v.length === 3) {
    if (v.includes(3)) {
      return 4;
    } else {
      return 3;
    }
  }
  if (v.length === 2) {
    if (v.includes(3)) {
      return 5;
    } else {
      return 6;
    }
  }
  return 7;
}

module.exports = { findValue };
