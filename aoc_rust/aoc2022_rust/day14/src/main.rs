use std::{cmp, collections::HashSet, fs};

fn main() {
    part("ex.txt", 1);
    part("ex.txt", 2);
}

fn part(path: &str, part: u8) {
    let mut count = 0;
    let mut segments: Vec<[(i16, i16); 2]> = vec![];
    let raw_input = fs::read_to_string(path).unwrap();
    let input = raw_input.split("\n");
    let mut last_rock_y = -f32::INFINITY as i16;
    for line in input {
        let pairs = line
            .split(" -> ")
            .map(|pair| {
                return pair
                    .split(",")
                    .map(|num| num.trim().parse::<i16>().unwrap())
                    .collect::<Vec<i16>>();
            })
            .collect::<Vec<Vec<i16>>>();

        for i in 1..pairs.len() {
            let curr_pair = pairs.get(i).unwrap();
            let prev_pair = pairs.get(i - 1).unwrap();
            let prev_pay_y = *prev_pair.get(1).unwrap();
            let curr_pay_y = *curr_pair.get(1).unwrap();
            let max = cmp::max(last_rock_y, prev_pay_y);
            last_rock_y = cmp::max(max, last_rock_y);
            let points = [
                (*prev_pair.get(0).unwrap(), prev_pay_y),
                (*curr_pair.get(0).unwrap(), curr_pay_y),
            ];

            segments.push(points);
        }
    }
    if part == 2 {
        last_rock_y = last_rock_y + 2;
    }

    let mut sands: HashSet<String> = HashSet::new();
    segments.sort_by(|seg1, seg2| {
        let min1 = cmp::min(seg1.get(0).unwrap().1, seg1.get(1).unwrap().1);
        let min2 = cmp::min(seg2.get(0).unwrap().1, seg2.get(1).unwrap().1);
        return min1.cmp(&min2);
    });

    let start_pos = (&500, &0);
    let mut stop = false;
    while !stop {
        let rest_pos = sand_next_step(&segments, &sands, start_pos, &last_rock_y, part);
        match rest_pos {
            Some((x, y)) => {
                sands.insert(format!("{x},{y}"));
                count = count + 1;
                if part == 2 && x == 500 && y == 0 {
                    stop = true;
                }
            }
            None => {
                stop = true;
            }
        }
    }
    println!(
        "Solution for part {} for path {}, is: {}",
        part, path, count
    );
}

fn sand_next_step(
    segments: &Vec<[(i16, i16); 2]>,
    sands: &HashSet<String>,
    (x, y): (&i16, &i16),
    last_rock_y: &i16,
    part: u8,
) -> Option<(i16, i16)> {
    if part == 1 && y > last_rock_y {
        return None;
    } else if part == 2 && *y == (last_rock_y - 1) {
        return Some((*x, *y));
    }
    let next_poss: [(i16, i16); 3] = [(0, 1), (-1, 1), (1, 1)];
    for next_pos in next_poss {
        let (nx, ny) = (x + next_pos.0, y + next_pos.1);
        if is_pos_free(segments, sands, (&nx, &ny)) {
            return sand_next_step(segments, sands, (&nx, &ny), last_rock_y, part);
        }
    }
    return Some((*x, *y));
}

fn is_pos_free(
    segments: &Vec<[(i16, i16); 2]>,
    sands: &HashSet<String>,
    (x, y): (&i16, &i16),
) -> bool {
    let id = format!("{x},{y}");
    if sands.contains(&id) {
        return false;
    }
    for segment in segments {
        let [(x1, y1), (x2, y2)] = segment;
        if x1 == x2 && x1 == x {
            let min = cmp::min(y1, y2);
            let max = cmp::max(y1, y2);
            if y >= min && y <= max {
                return false;
            }
        } else if y1 == y2 && y1 == y {
            let min = cmp::min(x1, x2);
            let max = cmp::max(x1, x2);
            if x >= min && x <= max {
                return false;
            }
        }
    }
    return true;
}
