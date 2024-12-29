use std::{
    collections::{HashMap, VecDeque},
    fs,
};

fn main() {
    part("ex.txt", 1, 20);
    part("ex.txt", 2, 10_000);
    part("input.txt", 1, 20);
    part("input.txt", 2, 10_000);
}

fn part(path: &str, part: u8, rounds: u16) {
    let raw_input = fs::read_to_string(path).unwrap();
    let input = raw_input
        .split("\r\n")
        .filter(|line| !line.is_empty())
        .collect::<Vec<&str>>();
    let mut monkeys: HashMap<usize, Monkey> = HashMap::new();
    let input_len = input.len();
    for i in (0..input_len).step_by(6) {
        // println!("{:?}", input.get(i));
        let id = input
            .get(i)
            .unwrap()
            .replace("Monkey ", "")
            .replace(":", "")
            .parse::<usize>()
            .unwrap();

        let items = input
            .get(i + 1)
            .unwrap()
            .replace("  Starting items: ", "")
            .split(", ")
            .map(|n| n.parse::<u128>().unwrap())
            .collect::<VecDeque<u128>>();

        let operation = input
            .get(i + 2)
            .unwrap()
            .replace("  Operation: new = old ", "");

        let divisible_by = input
            .get(i + 3)
            .unwrap()
            .replace("  Test: divisible by ", "")
            .parse::<u128>()
            .unwrap();

        let if_true = input
            .get(i + 4)
            .unwrap()
            .replace("    If true: throw to monkey ", "")
            .parse::<usize>()
            .unwrap();

        let if_false = input
            .get(i + 5)
            .unwrap()
            .replace("    If false: throw to monkey ", "")
            .parse::<usize>()
            .unwrap();
        let test: Test = Test {
            divisible_by,
            if_false,
            if_true,
        };
        let monkey: Monkey = Monkey {
            items,
            operation,
            test,
            count_inspected: 0,
        };
        monkeys.insert(id, monkey);
    }

    let mut monkeys_: Monkeys = Monkeys { monkeys };
    for _ in 0..rounds {
        monkeys_.round(part);
    }
    let mut sorded_monkeys = monkeys_.monkeys.values().collect::<Vec<&Monkey>>();

    sorded_monkeys
        .sort_by(|monkey1, monkey2| monkey2.count_inspected.cmp(&monkey1.count_inspected));
    let res = sorded_monkeys.get(0).unwrap().count_inspected
        * sorded_monkeys.get(1).unwrap().count_inspected;
    println!("Solution for part {}, for path {} is: {}", part, path, res)
}

#[derive(Debug)]
struct Test {
    divisible_by: u128,
    if_true: usize,
    if_false: usize,
}

#[derive(Debug)]
struct Monkey {
    items: VecDeque<u128>,
    operation: String,
    test: Test,
    count_inspected: usize,
}

impl Monkey {
    fn turn(&mut self, part: u8, divisors: u128) -> Vec<(usize, u128)> {
        let mut movements: Vec<(usize, u128)> = vec![];
        let mut len = self.items.len();
        while len > 0 {
            self.count_inspected = self.count_inspected + 1;
            let item = self.items.pop_front().unwrap();
            let new_item = self.operation(item);
            let item_to_test;
            if part == 1 {
                item_to_test = (new_item as f64 / 3 as f64).floor() as u128;
            } else {
                item_to_test = new_item % divisors;
            }
            let next_monkey_id = self.test(item_to_test);
            movements.push((next_monkey_id, item_to_test));
            len = len - 1;
        }
        return movements;
    }

    fn test(&self, num: u128) -> usize {
        if (num % self.test.divisible_by) == 0 {
            return self.test.if_true;
        } else {
            return self.test.if_false;
        }
    }

    fn operation(&self, old: u128) -> u128 {
        let new;
        let operation = self.operation.split(" ").collect::<Vec<&str>>();
        let op_symbol = *operation.get(0).unwrap();

        let mux_value = *operation.get(1).unwrap();
        let val;
        if mux_value == "old" {
            val = old;
        } else {
            val = mux_value.parse::<u128>().unwrap();
        }

        if op_symbol == "+" {
            new = old + val;
        } else {
            new = old * val
        }
        return new;
    }
}
#[derive(Debug)]

struct Monkeys {
    monkeys: HashMap<usize, Monkey>,
}

impl Monkeys {
    fn round(&mut self, part: u8) {
        let len = self.monkeys.len();
        let divisors = self
            .monkeys
            .values()
            .fold(1, |acc, monkey| acc * monkey.test.divisible_by);

        for i in 0..len {
            let curr_monkey = self.monkeys.get_mut(&i).unwrap();
            let movements = curr_monkey.turn(part, divisors);
            for (id, item) in movements {
                self.monkeys.get_mut(&id).unwrap().items.push_back(item);
            }
        }
    }
}
