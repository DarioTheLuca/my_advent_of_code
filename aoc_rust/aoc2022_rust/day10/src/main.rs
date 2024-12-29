use std::{collections::HashMap, fs};

fn main() {
    part1("input.txt");
    // part1("input.txt");
    part2("input.txt");
}

fn part1(path: &str) {
    let raw_input = fs::read_to_string(path).unwrap();
    let input = raw_input.lines();
    let mut x = 1;
    let mut curr_cycle = 0;
    let mut cycle_x_map: HashMap<i32, i32> = HashMap::new();
    for operation in input {
        // println!("operation: {}", operation);
        if operation == "noop" {
            curr_cycle = curr_cycle + 1;
            cycle_x_map.insert(curr_cycle, x);
            continue;
        }
        curr_cycle = curr_cycle + 1;
        cycle_x_map.insert(curr_cycle, x);
        let delta = operation.replace("addx ", "").parse::<i32>().unwrap();
        curr_cycle = curr_cycle + 1;
        cycle_x_map.insert(curr_cycle, x);
        x = x + delta;
        // println!("cycle:{}", curr_cycle);
    }
    // println!("map:{:?}", cycle_x_map);
    let cycles = [20, 60, 100, 140, 180, 220];
    let mut sum = 0;
    for cycle in cycles {
        sum = sum + cycle_x_map.get(&cycle).unwrap() * cycle;
    }
    println!("Solution for part 1, for path  {} is {}", path, sum);
}

fn part2(path: &str) {
    let raw_input = fs::read_to_string(path).unwrap();
    let input = raw_input.lines();
    let mut x = 1;
    let mut curr_cycle = 0;
    let mut cycle_x_map: HashMap<i32, i32> = HashMap::new();

    for operation in input {
        // println!("operation: {}", operation);
        if operation == "noop" {
            curr_cycle = curr_cycle + 1;
            cycle_x_map.insert(curr_cycle, x);
            continue;
        }
        curr_cycle = curr_cycle + 1;
        cycle_x_map.insert(curr_cycle, x);
        let delta = operation.replace("addx ", "").parse::<i32>().unwrap();
        curr_cycle = curr_cycle + 1;
        cycle_x_map.insert(curr_cycle, x);
        x = x + delta;
        // println!("cycle:{}", curr_cycle);
    }
    // println!("map:{:?}", cycle_x_map);

    let mut new_pixels: Vec<String> = vec![];
    for i in 0..6 {
        let mut row: Vec<&str> = vec![];
        let min = i * 40;
        let max = (i + 1) * 40;

        for j in min..max {
            let x = *cycle_x_map.get(&(j + 1)).unwrap();

            if ((j%40) == x - 1) || ((j%40) == x) || ((j%40) == x + 1) {
                row.push("# ");
            } else {
                row.push(". ")
            }
        }

        new_pixels.push(row.join(""));
    }
    println!("Solution for part 2");
    for row in new_pixels {
        println!("{}", row);
    }
}
