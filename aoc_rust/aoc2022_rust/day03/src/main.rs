use std::collections::HashSet;
use std::{collections::HashMap, fs};

fn part1() {
    let letters: [&str; 52] = [
        "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r",
        "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J",
        "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
    ];
    let mut letter_priority_map: HashMap<&str, u32> = HashMap::new();

    for (index, letter) in letters.iter().enumerate() {
        letter_priority_map.insert(letter, (index + 1) as u32);
    }

    let input = fs::read_to_string("./src/input.txt").unwrap();
    let lines = input.lines();
    let mut sum: u32 = 0;
    for rucksack in lines {
        let mut seen: HashSet<&str> = HashSet::new();
        for (index, lett) in rucksack.split("").filter(|el| !el.is_empty()).enumerate() {
            if index < rucksack.len() / 2 {
                seen.insert(lett);
            } else {
                if seen.contains(lett) && letter_priority_map.contains_key(lett) {
                    sum = sum + letter_priority_map.get(lett).unwrap();
                    break;
                }
            }
        }
    }
    println!("part 1 result: {}", sum);
}

fn part2() {
    let letters: [&str; 52] = [
        "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r",
        "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J",
        "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
    ];
    let mut letter_priority_map: HashMap<&str, u32> = HashMap::new();

    for (index, letter) in letters.iter().enumerate() {
        letter_priority_map.insert(letter, (index + 1) as u32);
    }

    let input = fs::read_to_string("./src/input.txt").unwrap();
    let lines = input.lines();
    let mut sum: u32 = 0;
    for (ind, rucksack) in lines.clone().enumerate() {
        if ind == 0 || ind % 3 == 0 {
            let mut seen1: HashSet<&str> = HashSet::new();
            let mut seen2: HashSet<&str> = HashSet::new();
            for lett in rucksack.split("").filter(|el| !el.is_empty()) {
                seen1.insert(lett);
            }
            for lett in lines.clone().collect::<Vec<_>>()[ind + 1]
                .split("")
                .filter(|el| !el.is_empty())
            {
                if seen1.contains(lett) {
                    seen2.insert(lett);
                };
            }
            for lett in lines.clone().collect::<Vec<_>>()[ind + 2]
                .split("")
                .filter(|el| !el.is_empty())
            {
                if seen2.contains(lett) && letter_priority_map.contains_key(lett) {
                    sum = sum + letter_priority_map.get(lett).unwrap();
                    break;
                }
            }
        }
    }
    println!("part 2 result: {}", sum);
}
fn main() {
    part1();
    part2();
}
