const { correct_answers, test } = require("./test_utilities");
const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require("worker_threads");

const { day1_part1 } = require("./day1/day1_part1");
const { day1_part2 } = require("./day1/day1_part2");
const { day2_part1 } = require("./day2/day2_part1");
const { day2_part2 } = require("./day2/day2_part2");
const { day3_part1 } = require("./day3/day3_part1");
const { day3_part2 } = require("./day3/day3_part2");
const { day4_part1 } = require("./day4/day4_part1");
const { day4_part2 } = require("./day4/day4_part2");
const { day5_part1 } = require("./day5/day5_part1");
const { day5_part2 } = require("./day5/day5_part2");
const { day6_part1 } = require("./day6/day6_part1");
const { day6_part2 } = require("./day6/day6_part2");

if (isMainThread) {
  // This code runs in the main thread

  // Create two worker threads with different workerData
  const worker1 = new Worker(__filename, { workerData: { workerId: 1 } });
  const worker2 = new Worker(__filename, { workerData: { workerId: 2 }});
  worker1.on("message", (message) => console.log(message));
  worker2.on("message", (message) => console.log(message));

  const day1_part1_result = day1_part1();
  test(
    "day1_part1",
    day1_part1_result,
    correct_answers.correct_result_day1_part1
  );
  const day1_part2_result = day1_part2();
  test(
    "day1_part2",
    day1_part2_result,
    correct_answers.correct_result_day1_part2
  );
  const day2_part1_result = day2_part1();
  test(
    "day2_part1",
    day2_part1_result,
    correct_answers.correct_result_day2_part1
  );
  const day2_part2_result = day2_part2();
  test(
    "day2_part2",
    day2_part2_result,
    correct_answers.correct_result_day2_part2
  );
  const day3_part1_result = day3_part1();
  test(
    "day3_part1",
    day3_part1_result,
    correct_answers.correct_result_day3_part1
  );
  const day3_part2_result = day3_part2();
  test(
    "day3_part2",
    day3_part2_result,
    correct_answers.correct_result_day3_part2
  );
  const day4_part1_result = day4_part1();
  test(
    "day4_part1",
    day4_part1_result,
    correct_answers.correct_result_day4_part1
  );
  const day4_part2_result = day4_part2();
  test(
    "day4_part2",
    day4_part2_result,
    correct_answers.correct_result_day4_part2
  );


  const day6_part1_result = day6_part1();
  test(
    "day6_part1",
    day6_part1_result,
    correct_answers.correct_result_day6_part1
  );
  const day6_part2_result = day6_part2();
  test(
    "day6_part2",
    day6_part2_result,
    correct_answers.correct_result_day6_part2
  );
} else {
  // This code runs in the worker thread
  if (workerData.workerId === 1) {
    console.log("from worker 1");
    const day5_part2_result = day5_part2();
    test(
      "day5_part2",
      day5_part2_result,
      correct_answers.correct_result_day5_part2
    );
    parentPort.postMessage("finished worker1");
  } else if (workerData.workerId === 2) {
    // console.log("from worker 2");
    // const day5_part1_result = day5_part1();

    // test(
    //   "day5_part1",
    //   day5_part1_result,
    //   correct_answers.correct_result_day5_part1
    // );
    // parentPort.postMessage("finished worker2");
  }
}
