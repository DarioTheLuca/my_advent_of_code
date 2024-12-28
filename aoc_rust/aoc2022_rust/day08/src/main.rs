use core::f64;
use std::fs;

fn main() {
    let matrix = part1();
    part2(matrix);
}

fn part1() -> Vec<Vec<Cell>> {
    let raw_input = fs::read_to_string("input.txt").unwrap();
    let input = raw_input.lines();
    let mut matrix: Vec<Vec<Cell>> = vec![];
    for (i, row) in input.enumerate() {
        let mut row_vec: Vec<Cell> = vec![];
        for (j, cell) in row.split("").filter(|el| !el.is_empty()).enumerate() {
            let cell_ = Cell {
                val: cell.parse::<usize>().unwrap(),
                row: i,
                col: j,
            };
            row_vec.push(cell_);
        }
        matrix.push(row_vec);
    }
    let mut result = 0;
    for row in &matrix {
        for cell in row {
            if is_tree_visible(&matrix, &cell) {
                result = result + 1;
            }
        }
    }

    println!("Solution for part 1 is: {}", result);
    return matrix;
}

fn part2(matrix: Vec<Vec<Cell>>) {
    let mut result = -f64::INFINITY;
    for row in &matrix {
        for cell in row {
            let trees = count_tree_visible(&matrix, &cell) as f64;
            if trees > result {
                result = trees;
            };
        }
    }
    println!("Solution for part 2 is: {}", result)
}

#[derive(Debug)]
struct Cell {
    val: usize,
    row: usize,
    col: usize,
}

fn is_tree_visible(matrix: &Vec<Vec<Cell>>, cell: &Cell) -> bool {
    return is_tree_visible_from_left(matrix, cell)
        || is_tree_visible_from_right(matrix, cell)
        || is_tree_visible_from_bottom(matrix, cell)
        || is_tree_visible_from_top(matrix, cell);
}

fn is_tree_visible_from_left(matrix: &Vec<Vec<Cell>>, cell: &Cell) -> bool {
    let row = matrix.get(cell.row).unwrap();
    for i in 0..cell.col {
        if row.get(i).unwrap().val >= cell.val {
            return false;
        }
    }
    return true;
}
fn is_tree_visible_from_right(matrix: &Vec<Vec<Cell>>, cell: &Cell) -> bool {
    let row = matrix.get(cell.row).unwrap();
    for i in cell.col + 1..matrix.get(0).unwrap().len() {
        if row.get(i).unwrap().val >= cell.val {
            return false;
        }
    }
    return true;
}

fn is_tree_visible_from_top(matrix: &Vec<Vec<Cell>>, cell: &Cell) -> bool {
    for i in 0..cell.row {
        let row = matrix.get(i).unwrap();

        if row.get(cell.col).unwrap().val >= cell.val {
            return false;
        }
    }
    return true;
}

fn is_tree_visible_from_bottom(matrix: &Vec<Vec<Cell>>, cell: &Cell) -> bool {
    for i in cell.row + 1..matrix.len() {
        let row = matrix.get(i).unwrap();

        if row.get(cell.col).unwrap().val >= cell.val {
            return false;
        }
    }
    return true;
}

fn count_tree_visible(matrix: &Vec<Vec<Cell>>, cell: &Cell) -> usize {
    return count_tree_visible_from_left(matrix, cell)
        * count_tree_visible_from_right(matrix, cell)
        * count_tree_visible_from_bottom(matrix, cell)
        * count_tree_visible_from_top(matrix, cell);
}

fn count_tree_visible_from_left(matrix: &Vec<Vec<Cell>>, cell: &Cell) -> usize {
    let row = matrix.get(cell.row).unwrap();
    let mut sum: usize = 0;
    if cell.col == 0 {
        return 0;
    }
    for i in (0..=cell.col-1).rev() {
        sum = sum + 1;
        if row.get(i).unwrap().val >= cell.val {
            break;
        }
    }
    return sum;
}
fn count_tree_visible_from_right(matrix: &Vec<Vec<Cell>>, cell: &Cell) -> usize {
    let row = matrix.get(cell.row).unwrap();
    let mut sum: usize = 0;
    for i in cell.col + 1..matrix.get(0).unwrap().len() {
        sum = sum + 1;
        if row.get(i).unwrap().val >= cell.val {
            break;
        }
    }
    return sum;
}

fn count_tree_visible_from_top(matrix: &Vec<Vec<Cell>>, cell: &Cell) -> usize {
    let mut sum: usize = 0;
    if cell.row == 0 {
        return 0;
    };
    for i in (0..=cell.row - 1).rev() {
        let row = matrix.get(i).unwrap();
        sum = sum + 1;
        if row.get(cell.col).unwrap().val >= cell.val {
            break;
        }
    }
    return sum;
}

fn count_tree_visible_from_bottom(matrix: &Vec<Vec<Cell>>, cell: &Cell) -> usize {
    let mut sum: usize = 0;

    for i in cell.row + 1..matrix.len() {
        let row = matrix.get(i).unwrap();
        sum = sum + 1;
        if row.get(cell.col).unwrap().val >= cell.val {
            break;
        }
    }
    return sum;
}
