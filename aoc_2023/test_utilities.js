//correct results for my inputs
const correct_answers = {
  correct_result_day1_part1: 54081,
  correct_result_day1_part2: 54649,
  correct_result_day2_part1: 2727,
  correct_result_day2_part2: 56580,
  correct_result_day3_part1: 553079,
  correct_result_day3_part2: 84363105,
  correct_result_day4_part1: 24542,
  correct_result_day4_part2: 8736438,
};

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
module.exports = { correct_answers, test };
