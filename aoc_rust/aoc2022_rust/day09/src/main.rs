use std::{collections::HashSet, fs};

fn main() {
    part("ex.txt",1,2);
    part("ex.txt",2,10);
    part("ex2.txt",1,2);
    part("ex2.txt",2,10);
    part("input.txt",1,2);
    part("input.txt",2,10);
}
#[derive(Debug)]

struct Cell {
    row: i32,
    col: i32,
}

#[derive(Debug)]
struct Rope {
    heads: Vec<Cell>,
}
fn follow_head(head: &Cell, tail: &Cell) -> Option<Cell> {
    if head.col.abs_diff(tail.col) > 1 || head.row.abs_diff(tail.row) > 1 {
        let mut row_diff = head.row - tail.row;
        if row_diff > 1 {
            row_diff = row_diff - 1;
        } else if row_diff < -1 {
            row_diff = row_diff + 1;
        }
        let mut col_diff = head.col - tail.col;
        if col_diff > 1 {
            col_diff = col_diff - 1;
        } else if col_diff < -1 {
            col_diff = col_diff + 1;
        }
        let new_cell = Cell {
            row: tail.row + row_diff,
            col: tail.col + col_diff,
        };
        return Some(new_cell);
    }
    return None;
}

fn move_rope(rope: &mut Rope, diff_row: i32, diff_col: i32) {
    let heads_len = rope.heads.len();
    for index in 0..heads_len {
        if index == 0 {
            let new_cell = Cell {
                row: rope.heads.get(index).unwrap().row + diff_row,
                col: rope.heads.get(index).unwrap().col + diff_col,
            };
            rope.heads[index] = new_cell;
        } else {
            let new_cell = follow_head(
                rope.heads.get(index - 1).unwrap(),
                rope.heads.get(index).unwrap(),
            );
            match new_cell {
                Some(cell) => rope.heads[index] = cell,
                None => (),
            }
        }
    }
}

impl Rope {
    fn new(number_of_heads: i8) -> Rope {
        let mut heads_vec = vec![];
        for _ in 0..number_of_heads {
            heads_vec.push(Cell { row: 0, col: 0 });
        }
        Rope { heads: heads_vec }
    }

    fn go_right(&mut self) {
        move_rope(self, 0, 1);
    }
    fn go_left(&mut self) {
        move_rope(self, 0, -1);
    }
    fn go_up(&mut self) {
        move_rope(self, -1, 0);
    }
    fn go_down(&mut self) {
        move_rope(self, 1, 0);
    }

    fn get_tail_code(&self) -> String {
        let row = self.heads.last().unwrap().row;
        let col = self.heads.last().unwrap().col;
        return format!("{row},{col}");
    }
}

fn part(path: &str, part: i8, number_of_heads: i8) {
    let input = fs::read_to_string(path).unwrap();
    let motions = input.lines();
    let mut unique_positions: HashSet<String> = HashSet::new();
    let mut rope = Rope::new(number_of_heads);
    let mut matrix = vec![];
    for _ in 0..25 {
        let mut row = vec![];
        for _ in 0..25 {
            row.push(".");
        }
        matrix.push(row);
    }
    for motion in motions {
        let info = motion.split(" ").collect::<Vec<&str>>();
        let direction = *info.get(0).unwrap();
        let times = info.get(1).unwrap().parse::<i32>().unwrap();
        for _ in 0..times {
            match direction {
                "L" => rope.go_left(),
                "R" => rope.go_right(),
                "U" => rope.go_up(),
                "D" => rope.go_down(),
                _ => (),
            };
            unique_positions.insert(rope.get_tail_code());
        }
    }
    println!(
        "Solution for part {}, for input {} is: {}",
        part,
        path,
        unique_positions.len()
    );
}

