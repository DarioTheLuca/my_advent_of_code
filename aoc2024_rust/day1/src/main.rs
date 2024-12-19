use std::{collections::HashMap, fs};

const BASE: &str = "src/";

fn part1(left: &mut Vec<u64>, right: &mut Vec<u64>) {
    left.sort();
    right.sort();

    let mut sum: u64 = 0;
    for (index, l) in left.into_iter().enumerate() {
        let r = right[index];
        sum = sum + r.abs_diff(*l);
    }

    println!("il risultato della parte 1 è: {}", sum)
}

fn part2(left: Vec<u64>,right: Vec<u64>) {
    let mut numbers_count: HashMap<u64, u64> = HashMap::new();

    for num in right {
        *numbers_count.entry(num).or_insert(0) += 1;
    }
    let mut sum: u64 = 0;
    for num in left {
        let x;
        match numbers_count.get(&num) {
            Some(value) => x = *value,
            None => x = 0,
        }
        sum = sum + num * x;
    }
    println!("il risultato della parte due è: {}", sum)
}
fn main() {
    let path = String::from(BASE) + "input.txt";
    let raw_input = fs::read_to_string(path).expect("File non trovato");
    let mut left: Vec<u64> = vec![];
    let mut right: Vec<u64> = vec![];
    raw_input.lines().for_each(|l| {
        l.split_whitespace()
            .map(|s| s.parse::<u64>().unwrap())
            .enumerate()
            .for_each(|(index, n)| {
                if index % 2 == 0 {
                    left.push(n);
                } else {
                    right.push(n);
                }
            })
    });
    part1(&mut left, &mut right);
    part2(left, right);
}
