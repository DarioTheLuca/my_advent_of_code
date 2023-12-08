import run from "aocrunner";

const parseInput = (rawInput: string) => {
  return rawInput.split("\n");
};

const part1 = (rawInput: string) => {
  const index: number[] = [];
  const rows = parseInput(rawInput);
  rows.forEach((r, i) => {
    if (r.includes("map:")) {
      index.push(i);
    }
  });
  const rowSeeds = rows
    .shift()!
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

  function findValue(number: number, maps: number[][][]) {
    if (maps.length === 0) return number;
    const mapArr = maps.shift()!;
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
  let minLoc: number | undefined = undefined;
  rowSeeds.forEach((r) => {
    const location = findValue(r[0], [...maps]);
    if (!minLoc) {
      minLoc = location;
    } else if (location < minLoc) {
      minLoc = location;
    }
  });
  return minLoc;
};

const part2 = (rawInput: string) => {
  const index: number[] = [];

  const rows = parseInput(rawInput);
  rows.forEach((r, i) => {
    if (r.includes("map:")) {
      index.push(i);
    }
  });
  const rowSeeds = rows
    .shift()!
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

  const rangesOfSeeds: [number, number][] = [];
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

  function findSeed(location: number, maps: number[][][]) {
    if (maps.length === 0) return location;
    const mapArr = maps.shift()!;
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

  function isValid(seed: number) {
    for (const range of rangesOfSeeds) {
      if (seed >= range[0] && seed <= range[1]) {
        return true;
      }
    }
    return false;
  }

  let location = 0;
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
};

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
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
