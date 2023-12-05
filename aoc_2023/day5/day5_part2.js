const { rowsFromTextFile } = require("../../generateArrayFromTextFile");

function day5_part2() {
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
    .map((e) => e.split(" ").map(Number))
    .flat();

  const seed_to_soil = [...rows]
    .slice(index[0], index[1] - 2)
    .map((e) => e.split(" ").map(Number));
  const soil_to_fertilizer = [...rows]
    .slice(index[1], index[2] - 2)
    .map((e) => e.split(" ").map(Number));
  const fertilizer_to_water = [...rows]
    .slice(index[2], index[3] - 2)
    .map((e) => e.split(" ").map(Number));
  const water_to_light = [...rows]
    .slice(index[3], index[4] - 2)
    .map((e) => e.split(" ").map(Number));
  const light_to_temperature = [...rows]
    .slice(index[4], index[5] - 2)
    .map((e) => e.split(" ").map(Number));
  const temperature_to_humidity = [...rows]
    .slice(index[5], index[6] - 2)
    .map((e) => e.split(" ").map(Number));
  const humidity_to_location = [...rows]
    .slice(index[6])
    .map((e) => e.split(" ").map(Number));

  const rangesOfSeeds = [];
  rowSeeds.forEach((r, i) => {
    if (i % 2 === 0) {
      rangesOfSeeds.push([rowSeeds[i], rowSeeds[i] + rowSeeds[i + 1] - 1]);
    }
  });

  const mapsR = [
    humidity_to_location,
    temperature_to_humidity,
    light_to_temperature,
    water_to_light,
    fertilizer_to_water,
    soil_to_fertilizer,
    seed_to_soil,
  ];

  function findSeed(location, maps) {
    if (maps.length === 0) return location;
    const mapArr = maps.shift();
    const len = mapArr.length;
    for (let i = 0; i < len; i++) {
      const rangeS = mapArr[i][0];
      const rangeE = mapArr[i][0] + mapArr[i][2];
      if (location >= rangeS && location <= rangeE) {
        const diff = rangeS - mapArr[i][1];
        return findSeed(location - diff, maps);
      }
    }
    return findSeed(location, maps);
  }

  function isValid(seed) {
    for (const range of rangesOfSeeds) {
      if (seed >= range[0] && seed <= range[1]) {
        return true;
      }
    }
    return false;
  }

  location = 0;
  let find = false;
  while (!find) {
    const possibleSeed = findSeed(location, [...mapsR]);
    if (isValid(possibleSeed)) {
      find = true;
    } else {
      location++;
    }
  }
  return location;
}

module.exports = { day5_part2 };
