function findNumber(string, i) {
  let x = 1;
  let number_as_string = "";
  while (
    string[i - 1 - x] !== ";" &&
    string[i - 1 - x] !== "," &&
    string[i - 1 - x] !== ":"
  ) {
    number_as_string = string[i - 1 - x] + number_as_string;
    x++;
  }
  return Number(number_as_string);
}

module.exports = { findNumber };
