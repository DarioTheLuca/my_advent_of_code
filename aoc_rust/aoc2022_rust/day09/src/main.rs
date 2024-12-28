use std::{collections::HashSet, fs};

fn main() {
    part1(2);
    part2();
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

impl Rope {
    fn new(number_of_heads: i8) -> Rope {
        let mut heads_vec = vec![];
        for _ in 0..number_of_heads {
            heads_vec.push(Cell { row: 0, col: 0 });
        }
        Rope { heads: heads_vec }
    }
    fn go_right(&mut self) {
        let heads_len = self.heads.len();
        for index in 0..heads_len {
            if index == 0 {
                let new_cell = Cell {
                    row: self.heads.get(index).unwrap().row,
                    col: self.heads.get(index).unwrap().col + 1,
                };
                self.heads[index] = new_cell;
            } else {
                if self
                    .heads
                    .get(index - 1)
                    .unwrap()
                    .col
                    .abs_diff(self.heads.get(index).unwrap().col)
                    > 1
                    || self
                        .heads
                        .get(index - 1)
                        .unwrap()
                        .row
                        .abs_diff(self.heads.get(index).unwrap().row)
                        > 1
                {
                    let mut row_diff =
                        self.heads.get(index - 1).unwrap().row - self.heads.get(index).unwrap().row;
                    if row_diff > 1 {
                        row_diff = row_diff - 1;
                    } else if row_diff < -1 {
                        row_diff = row_diff + 1;
                    }
                    let mut col_diff =
                        self.heads.get(index - 1).unwrap().col - self.heads.get(index).unwrap().col;
                    if col_diff > 1 {
                        col_diff = col_diff - 1;
                    } else if col_diff < -1 {
                        col_diff = col_diff + 1;
                    }
                    let new_cell = Cell {
                        row: self.heads.get(index).unwrap().row + row_diff,
                        col: self.heads.get(index).unwrap().col + col_diff,
                    };
                    self.heads[index] = new_cell;
                }
            }
        }
    }
    fn go_left(&mut self) {
        let heads_len = self.heads.len();
        for index in 0..heads_len {
            if index == 0 {
                let new_cell = Cell {
                    row: self.heads.get(index).unwrap().row,
                    col: self.heads.get(index).unwrap().col - 1,
                };
                self.heads[index] = new_cell;
            } else {
                if self
                    .heads
                    .get(index - 1)
                    .unwrap()
                    .col
                    .abs_diff(self.heads.get(index).unwrap().col)
                    > 1
                    || self
                        .heads
                        .get(index - 1)
                        .unwrap()
                        .row
                        .abs_diff(self.heads.get(index).unwrap().row)
                        > 1
                {
                    let mut row_diff =
                        self.heads.get(index - 1).unwrap().row - self.heads.get(index).unwrap().row;
                    if row_diff > 1 {
                        row_diff = row_diff - 1;
                    } else if row_diff < -1 {
                        row_diff = row_diff + 1;
                    }
                    let mut col_diff =
                        self.heads.get(index - 1).unwrap().col - self.heads.get(index).unwrap().col;
                    if col_diff > 1 {
                        col_diff = col_diff - 1;
                    } else if col_diff < -1 {
                        col_diff = col_diff + 1;
                    }
                    let new_cell = Cell {
                        row: self.heads.get(index).unwrap().row + row_diff,
                        col: self.heads.get(index).unwrap().col + col_diff,
                    };
                    self.heads[index] = new_cell;
                }
            }
        }
    }
    fn go_up(&mut self) {
        let heads_len = self.heads.len();
        for index in 0..heads_len {
            if index == 0 {
                let new_cell = Cell {
                    row: self.heads.get(index).unwrap().row - 1,
                    col: self.heads.get(index).unwrap().col,
                };
                self.heads[index] = new_cell;
            } else {
                if self
                    .heads
                    .get(index - 1)
                    .unwrap()
                    .col
                    .abs_diff(self.heads.get(index).unwrap().col)
                    > 1
                    || self
                        .heads
                        .get(index - 1)
                        .unwrap()
                        .row
                        .abs_diff(self.heads.get(index).unwrap().row)
                        > 1
                {
                    let mut row_diff =
                        self.heads.get(index - 1).unwrap().row - self.heads.get(index).unwrap().row;
                    if row_diff > 1 {
                        row_diff = row_diff - 1;
                    } else if row_diff < -1 {
                        row_diff = row_diff + 1;
                    }
                    let mut col_diff =
                        self.heads.get(index - 1).unwrap().col - self.heads.get(index).unwrap().col;
                    if col_diff > 1 {
                        col_diff = col_diff - 1;
                    } else if col_diff < -1 {
                        col_diff = col_diff + 1;
                    }
                    let new_cell = Cell {
                        row: self.heads.get(index).unwrap().row + row_diff,
                        col: self.heads.get(index).unwrap().col + col_diff,
                    };
                    self.heads[index] = new_cell;
                }
            }
        }
    }
    fn go_down(&mut self) {
        let heads_len = self.heads.len();
        for index in 0..heads_len {
            if index == 0 {
                let new_cell = Cell {
                    row: self.heads.get(index).unwrap().row + 1,
                    col: self.heads.get(index).unwrap().col,
                };
                self.heads[index] = new_cell;
            } else {
                if self
                    .heads
                    .get(index - 1)
                    .unwrap()
                    .col
                    .abs_diff(self.heads.get(index).unwrap().col)
                    > 1
                    || self
                        .heads
                        .get(index - 1)
                        .unwrap()
                        .row
                        .abs_diff(self.heads.get(index).unwrap().row)
                        > 1
                {
                    let mut row_diff =
                        self.heads.get(index - 1).unwrap().row - self.heads.get(index).unwrap().row;
                    if row_diff > 1 {
                        row_diff = row_diff - 1;
                    } else if row_diff < -1 {
                        row_diff = row_diff + 1;
                    }
                    let mut col_diff =
                        self.heads.get(index - 1).unwrap().col - self.heads.get(index).unwrap().col;
                    if col_diff > 1 {
                        col_diff = col_diff - 1;
                    } else if col_diff < -1 {
                        col_diff = col_diff + 1;
                    }
                    let new_cell = Cell {
                        row: self.heads.get(index).unwrap().row + row_diff,
                        col: self.heads.get(index).unwrap().col + col_diff,
                    };
                    self.heads[index] = new_cell;
                }
            }
        }
    }

    fn get_tail_code(&self) -> String {
        let row = self.heads.last().unwrap().row;
        let col = self.heads.last().unwrap().col;
        return format!("{row},{col}");
    }
}

fn part1(number_of_heads: i8) {
    let input = fs::read_to_string("input.txt").unwrap();
    let motions = input.lines();
    let mut unique_positions: HashSet<String> = HashSet::new();
    let mut rope = Rope::new(number_of_heads);
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
    println!("Solution for part 1 is: {}", unique_positions.len());
}

fn part2() {
    part1(10);
}
