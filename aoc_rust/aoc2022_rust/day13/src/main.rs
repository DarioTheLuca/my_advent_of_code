use std::{
    cmp::{self, Ordering},
    collections::HashMap,
    fs,
};

fn main() {
    part1("ex.txt");
    part2("ex.txt");
}

fn get_map_line(line: &mut String) -> HashMap<String, Vec<String>> {
    line.remove(0);
    line.remove(line.len() - 1);
    let mut indexes: Vec<usize> = vec![];
    let mut line_map: HashMap<String, Vec<String>> = HashMap::new();
    line_map.insert("0".to_string(), vec![]);
    for ch in line.split("").filter(|el| !el.is_empty()) {
        let curr_vec: String;
        if indexes.len() == 0 {
            curr_vec = "0".to_string();
        } else {
            let id_idx = indexes
                .iter()
                .map(|el| el.to_string())
                .collect::<Vec<String>>()
                .join(",");
            curr_vec = format!("0,{id_idx}");
        };
        if ch == "," {
            continue;
        };
        if ch == "[" {
            let indx = line_map.get(&curr_vec).unwrap_or(&vec![]).len();
            indexes.push(indx);
            let new_id = format!("{curr_vec},{indx}");
            if line_map.contains_key(&curr_vec) {
                line_map.get_mut(&curr_vec).unwrap().push(new_id.clone());
            } else {
                line_map.insert(curr_vec, vec![new_id.clone()]);
            }
            line_map.insert(new_id, vec![]);

            continue;
        }
        if ch == "]" {
            indexes.pop();
            continue;
        }
        line_map.get_mut(&curr_vec).unwrap().push(ch.to_string());
    }
    return line_map;
}

fn part1(path: &str) {
    let raw_input = fs::read_to_string(path).unwrap();
    let input = raw_input
        .lines()
        .filter(|line| !line.is_empty())
        .collect::<Vec<&str>>();

    let mut count_correct = 0;
    for index in (0..input.len()).step_by(2) {
        let mut left_line = input.get(index).unwrap().replace("10", "a");

        let mut right_line = input.get(index + 1).unwrap().replace("10", "a");

        let left_line_map: HashMap<String, Vec<String>> = get_map_line(&mut left_line);
        let right_line_map: HashMap<String, Vec<String>> = get_map_line(&mut right_line);

        let res = compare_left_right(&left_line_map, &right_line_map, "0", "0") as usize;

        if res < 2 {
            count_correct = count_correct + (index / 2 + 1) * res
        }
    }

    println!("Solution for part 1 of path {} is:{}", path, count_correct);
}

fn part2(path: &str) {
    let raw_input = fs::read_to_string(path).unwrap();
    let mut input = raw_input
        .lines()
        .filter(|line| !line.is_empty())
        .collect::<Vec<&str>>();

    let first_divider_packet = "[[2]]";
    let second_divider_packet = "[[6]]";
    input.push(first_divider_packet);
    input.push(second_divider_packet);

    input.sort_by(|left, right| {
        let mut left_line = left.replace("10", "a");

        let mut right_line = right.replace("10", "a");

        let left_line_map: HashMap<String, Vec<String>> = get_map_line(&mut left_line);
        let right_line_map: HashMap<String, Vec<String>> = get_map_line(&mut right_line);

        let res = compare_left_right(&left_line_map, &right_line_map, "0", "0") as usize;
        match res {
            0 => return Ordering::Greater,
            1 => return Ordering::Less,
            _ => return Ordering::Equal,
        }
    });

    let mut index_first_divider_packet = 0;
    let mut index_second_divider_packet = 0;

    for (index, line) in input.iter().enumerate() {
        if *line == first_divider_packet {
            index_first_divider_packet = index + 1;
        } else if *line == second_divider_packet {
            index_second_divider_packet = index + 1;
            break;
        }
    }

    println!(
        "Solution for part 2 of path {} is:\n{:?}",
        path,
        index_first_divider_packet * index_second_divider_packet
    );
}

fn compare_left_right(
    left_line_map: &HashMap<String, Vec<String>>,
    right_line_map: &HashMap<String, Vec<String>>,
    start_key_left: &str,
    start_key_right: &str,
) -> u8 {
    let left_vec = left_line_map.get(start_key_left).unwrap();
    let right_vec = right_line_map.get(start_key_right).unwrap();
    // println!("comparing left: {:?} and right: {:?}", left_vec, right_vec);
    let l_len = left_vec.len();
    let r_len = right_vec.len();
    let len = cmp::max(l_len, r_len);
    for i in 0..len {
        if i == l_len {
            return 1;
        };
        if i == r_len {
            return 0;
        }
        let l_val = left_vec.get(i).unwrap();
        let r_val = right_vec.get(i).unwrap();
        let is_l_num = !l_val.contains(",");
        let is_r_num = !r_val.contains(",");
        if is_l_num && is_r_num {
            let l_val_num: u8 = parse_char(l_val);
            let r_val_num: u8 = parse_char(r_val);

            if l_val_num < r_val_num {
                return 1;
            } else if l_val_num > r_val_num {
                return 0;
            } else {
                continue;
            }
        } else if !is_l_num && !is_r_num {
            let res = compare_left_right(left_line_map, right_line_map, l_val, r_val);
            if res == 2 {
                continue;
            }
            return res;
        } else if is_l_num {
            let mut int_map = HashMap::new();
            int_map.insert("0".to_string(), vec![l_val.to_string()]);
            let res = compare_left_right(&int_map, right_line_map, "0", r_val);
            if res == 2 {
                continue;
            }
            return res;
        } else {
            let mut int_map = HashMap::new();
            int_map.insert("0".to_string(), vec![r_val.to_string()]);
            let res = compare_left_right(left_line_map, &int_map, l_val, "0");
            if res == 2 {
                continue;
            }
            return res;
        }
    }

    return 2;
}

fn parse_char(char: &str) -> u8 {
    if char == "a" {
        return 10;
    } else {
        return char.parse::<u8>().unwrap();
    }
}
