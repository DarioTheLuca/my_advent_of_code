const { rowsFromTextFile } = require("../../generateArrayFromTextFile");

function day5_part1() {
  const index = [];
  const rows = rowsFromTextFile("aoc_2023/day5/day5_input.txt");
  rows.forEach((r, i) => {
    if (r.includes("map:")) {
      index.push(i);
    }
  });
  const rowSeeds = rows
    .shift()
    .split("seeds: ")[1]
    .split(" ")
    .map((e) => e.split(" ").map((e) => Number(e)));
  const seed_to_soil = [...rows]
    .slice(index[0], index[1] - 2)
    .map((e) => e.split(" ").map((e) => Number(e)));
  const soil_to_fertilizer = [...rows]
    .slice(index[1], index[2] - 2)
    .map((e) => e.split(" ").map((e) => Number(e)));
  const fertilizer_to_water = [...rows]
    .slice(index[2], index[3] - 2)
    .map((e) => e.split(" ").map((e) => Number(e)));
  const water_to_light = [...rows]
    .slice(index[3], index[4] - 2)
    .map((e) => e.split(" ").map((e) => Number(e)));
  const light_to_temperature = [...rows]
    .slice(index[4], index[5] - 2)
    .map((e) => e.split(" ").map((e) => Number(e)));
  const temperature_to_humidity = [...rows]
    .slice(index[5], index[6] - 2)
    .map((e) => e.split(" ").map((e) => Number(e)));
  const humidity_to_location = [...rows]
    .slice(index[6])
    .map((e) => e.split(" ").map((e) => Number(e)));

  function findValue(number, maps) {
    if (maps.length === 0) return number;
    const mapArr = maps.shift();
    const len = mapArr.length;
    for (let i = 0; i < len; i++) {
      const rangeS = mapArr[i][1];
      const rangeE = mapArr[i][1] + mapArr[i][2];
      if (number >= rangeS && number <= rangeE) {
        const diff = mapArr[i][0] - mapArr[i][1];
        return findValue(number + diff, maps);
      }
    }
    return findValue(number, maps);
  }
  const maps = [
    seed_to_soil,
    soil_to_fertilizer,
    fertilizer_to_water,
    water_to_light,
    light_to_temperature,
    temperature_to_humidity,
    humidity_to_location,
  ];
  let minLoc = undefined;
  rowSeeds.forEach((r) => {
    const location = findValue(r[0], [...maps]);
    if (!minLoc) {
      minLoc = location;
    } else if (location < minLoc) {
      minLoc = location;
    }
  });
  return minLoc;
}
module.exports = { day5_part1 };
