use std::{
    collections::{HashMap, VecDeque},
    fs,
};

fn main() {
    part("ex.txt", 1);
    part("ex.txt", 2);
}

struct Cell {
    val: String,
    row: isize,
    col: isize,
    count: u32,
    dir: (isize, isize),
}

fn mapping_letters_to_number(letter: &str) -> i8 {
    match letter {
        "a" | "S" => return 1,
        "b" => return 2,
        "c" => return 3,
        "d" => return 4,
        "e" => return 5,
        "f" => return 6,
        "g" => return 7,
        "h" => return 8,
        "i" => return 9,
        "j" => return 10,
        "k" => return 11,
        "l" => return 12,
        "m" => return 13,
        "n" => return 14,
        "o" => return 15,
        "p" => return 16,
        "q" => return 17,
        "r" => return 18,
        "s" => return 19,
        "t" => return 20,
        "u" => return 21,
        "v" => return 22,
        "w" => return 23,
        "x" => return 24,
        "y" => return 25,
        "z" | "E" => return 26,
        _ => 100,
    }
}

fn get_id_dir((r, c): (isize, isize)) -> String {
    format!("{r},{c}")
}
fn get_next_dirs((r, c): (isize, isize)) -> [(isize, isize); 3] {
    let dir = get_id_dir((r, c));
    let curr_dir = dir.as_str();

    match curr_dir {
        "1,0" | "-1,0" => [(r, c), (0, -1), (0, 1)],
        "0,1" | "0,-1" => [(r, c), (-1, 0), (1, 0)],
        _ => [(0, 0), (0, 0), (0, 0)],
    }
}

fn is_valid_pos(matrix: &Vec<Vec<&str>>, (r, c): (isize, isize)) -> bool {
    c >= 0 && r >= 0 && r < matrix.len() as isize && c < matrix.get(0).unwrap().len() as isize
}

fn get_next_cells(matrix: &Vec<Vec<&str>>, curr_cell: &Cell) -> Vec<Cell> {
    let mut next_cells: Vec<Cell> = vec![];
    let next_dirs = get_next_dirs(curr_cell.dir);
    for (dr, dc) in next_dirs {
        let (nr, nc) = (dr + curr_cell.row, curr_cell.col + dc);
        if is_valid_pos(&matrix, (nr, nc)) {
            let new_cell = Cell {
                val: matrix[nr as usize][nc as usize].to_string(),
                row: nr,
                col: nc,
                count: curr_cell.count + 1,
                dir: (dr, dc),
            };
            next_cells.push(new_cell);
        }
    }
    return next_cells;
}
fn get_cache_id(r: isize, c: isize, dr: isize, dc: isize) -> String {
    format!("{r},{c},{dr},{dc}")
}
fn part(path: &str, part: u8) {
    let raw_input = fs::read_to_string(path).unwrap();
    let input = raw_input.lines();

    let mut start_positions: Vec<(isize, isize)> = vec![];
    let mut matrix: Vec<Vec<&str>> = vec![];
    for (i, row) in input.enumerate() {
        let splitted_row = row
            .split("")
            .filter(|el| !el.is_empty())
            .collect::<Vec<&str>>();

        matrix.push(splitted_row);
        for (j, cell) in row.split("").filter(|el| !el.is_empty()).enumerate() {
            if part == 1 {
                match cell {
                    "S" => {
                        start_positions.push((i as isize, j as isize));
                    }
                    _ => (),
                }
            } else if part == 2 {
                match cell {
                    "S" | "a" => {
                        start_positions.push((i as isize, j as isize));
                    }
                    _ => (),
                }
            }
        }
    }

    let mut min = f64::INFINITY as u32;

    for starting_position in start_positions {
        let mut queue: VecDeque<Cell> = VecDeque::new();
        let directions: [(isize, isize); 4] = [(0, 1), (0, -1), (1, 0), (-1, 0)];
        let (s_row, s_col) = starting_position;

        for direction in directions {
            let cell = Cell {
                row: s_row,
                col: s_col,
                count: 0,
                val: "S".to_string(),
                dir: direction,
            };
            queue.push_back(cell);
        }
        let mut seen: HashMap<String, u32> = HashMap::new();
        while queue.len() > 0 {
            let curr_cell = queue.pop_front().unwrap();
            if curr_cell.count >= min {
                continue;
            }
            if curr_cell.val == "E" {
                if curr_cell.count < min {
                    min = curr_cell.count;
                }
                continue;
            }
            let (dr, dc) = curr_cell.dir;
            let cache_id = get_cache_id(curr_cell.row, curr_cell.col, dr, dc);
            if seen.contains_key(&cache_id) {
                if *seen.get(&cache_id).unwrap() <= curr_cell.count {
                    continue;
                } else {
                    seen.insert(cache_id, curr_cell.count);
                };
            } else {
                seen.insert(cache_id, curr_cell.count);
            }

            let next_cells = get_next_cells(&matrix, &curr_cell);
            let curr_val = mapping_letters_to_number(curr_cell.val.as_str());
            for next_cell in next_cells {
                let next_val = mapping_letters_to_number(next_cell.val.as_str());
                if next_val - curr_val <= 1 {
                    queue.push_back(next_cell);
                }
            }
        }
    }

    println!("Solution for part {} for path {} is: {}", part, path, min)
}
