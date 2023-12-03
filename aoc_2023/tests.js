const { day1_part1 } = require("./day1/day1_part1");
const { day1_part2 } = require("./day1/day1_part2");
const { day2_part1 } = require("./day2/day2_part1");
const { day2_part2 } = require("./day2/day2_part2");
const { day3_part1 } = require("./day3/day3_part1");
const { day3_part2 } = require("./day3/day3_part2");

//correct results for my inputs
const correct_result_day1_part1 = 54081;
const correct_result_day1_part2 = 54649;
const correct_result_day2_part1 = 2727;
const correct_result_day2_part2 = 56580;
const correct_result_day3_part1 = 553079;
const correct_result_day3_part2 = 84363105;

const day1_part1_result = day1_part1();
const day1_part2_result = day1_part2();
const day2_part1_result = day2_part1();
const day2_part2_result = day2_part2();
const day3_part1_result = day3_part1();
const day3_part2_result = day3_part2();

test("day1_part1", day1_part1_result, correct_result_day1_part1);
test("day1_part2", day1_part2_result, correct_result_day1_part2);
test("day2_part1", day2_part1_result, correct_result_day2_part1);
test("day2_part2", day2_part2_result, correct_result_day2_part2);
test("day3_part1", day3_part1_result, correct_result_day3_part1);
test("day3_part2", day3_part2_result, correct_result_day3_part2);

function test(fnToTest, result, correct_result) {
  if (result === correct_result) {
    console.log("Test " + fnToTest + " passed. Sum is :", result);
  } else {
    console.error(
      "Test " + fnToTest + " NOT passed. Sum is :",
      result,
      ". The sum is Expected to be " + correct_result
    );
  }
}
