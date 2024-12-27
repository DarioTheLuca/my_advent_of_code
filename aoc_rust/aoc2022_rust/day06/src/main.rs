use std::{collections::HashSet, fs};

fn main() {
    part1();
    part2();
}

fn part1() {
    let raw_input = fs::read_to_string("input.txt").unwrap();
    let input = raw_input
        .split("")
        .filter(|el| !el.is_empty())
        .collect::<Vec<&str>>();
    // println!("input: {:?}", input);
    for index in 3..input.len() {
        let mut seen: HashSet<&str> = HashSet::new();
        let mut is_key = true;
        for i in index - 3..index + 1 {
            let curr = input.get(i).unwrap();
            if seen.contains(curr) {
                is_key = false;
                break;
            } else {
                seen.insert(curr);
            };
        }
        if is_key {
            println!("The solution for part 1 is: {}", (index as i32) + 1);
            break;
        }
    }
}

fn part2() {
    let raw_input = fs::read_to_string("input.txt").unwrap();
    let input = raw_input
        .split("")
        .filter(|el| !el.is_empty())
        .collect::<Vec<&str>>();
    // println!("input: {:?}", input);
    for index in 13..input.len() {
        let mut seen: HashSet<&str> = HashSet::new();
        let mut is_key = true;
        for i in index - 13..index + 1 {
            let curr = input.get(i).unwrap();
            if seen.contains(curr) {
                is_key = false;
                break;
            } else {
                seen.insert(curr);
            };
        }
        if is_key {
            println!("The solution for part 1 is: {}", (index as i32) + 1);
            break;
        }
    }
}
