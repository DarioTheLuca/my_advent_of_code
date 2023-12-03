const { correct_answers, test } = require("./test_utilities");
const { day1_part1 } = require("./day1/day1_part1");
const { day1_part2 } = require("./day1/day1_part2");
const { day2_part1 } = require("./day2/day2_part1");
const { day2_part2 } = require("./day2/day2_part2");
const { day3_part1 } = require("./day3/day3_part1");
const { day3_part2 } = require("./day3/day3_part2");
const { day4_part1 } = require("./day4/day4_part1");
const { day4_part2 } = require("./day4/day4_part2");

const day1_part1_result = day1_part1();
const day1_part2_result = day1_part2();
const day2_part1_result = day2_part1();
const day2_part2_result = day2_part2();
const day3_part1_result = day3_part1();
const day3_part2_result = day3_part2();
const day4_part1_result = day4_part1();
const day4_part2_result = day4_part2();

test(
  "day1_part1",
  day1_part1_result,
  correct_answers.correct_result_day1_part1
);
test(
  "day1_part2",
  day1_part2_result,
  correct_answers.correct_result_day1_part2
);
test(
  "day2_part1",
  day2_part1_result,
  correct_answers.correct_result_day2_part1
);
test(
  "day2_part2",
  day2_part2_result,
  correct_answers.correct_result_day2_part2
);
test(
  "day3_part1",
  day3_part1_result,
  correct_answers.correct_result_day3_part1
);
test(
  "day3_part2",
  day3_part2_result,
  correct_answers.correct_result_day3_part2
);
test(
  "day4_part1",
  day4_part1_result,
  correct_answers.correct_result_day4_part1
);
test(
  "day4_part2",
  day4_part2_result,
  correct_answers.correct_result_day4_part2
);