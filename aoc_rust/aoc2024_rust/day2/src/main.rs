use std::fs;

const PATH_ROOT: &str = "./src/";

fn is_valid_couple(num1: u32, num2: u32) -> bool {
    return num1 > num2 && num1.abs_diff(num2) >= 1 && num1.abs_diff(num2) <= 3;
}
fn is_valid_sequence(sequence: &(impl Iterator<Item = u32> + Clone), skip: i8) -> bool {
    let mut is_valid = true;
    let mut is_asc = true;
    let mut prev_num = 0;
    for (index, num) in sequence.clone().enumerate() {
        if skip != -1 && index == skip as usize {
            continue;
        }
        if prev_num == 0 {
            prev_num = num;
            continue;
        }

        let mut calc_is_asc = 1;
        if skip != -1 && (skip == 0 || skip == 1) {
            calc_is_asc = 2;
        }

        if index == calc_is_asc {
            is_asc = num > prev_num;
        }
        if is_asc {
            if !(is_valid_couple(num, prev_num)) {
                is_valid = false;
                break;
            }
        } else if !(is_valid_couple(prev_num, num)) {
            is_valid = false;
            break;
        }
        prev_num = num;
    }

    return is_valid
        || (((skip + 1) as usize) < sequence.clone().count()
            && is_valid_sequence(sequence, skip + 1));
}
fn main() {
    let path = String::from(PATH_ROOT) + "input.txt";
    let mut safe_count1: u32 = 0;
    let mut safe_count2: u32 = 0;
    let input = fs::read_to_string(path).expect("File non trovato");
    for el in input
        .lines()
        .map(|l| l.split_whitespace().map(|n| n.parse::<u32>().unwrap()))
    {
        // println!("Print el: {:?}",el.collect::<Vec<u32>>())

        let is_valid2 = is_valid_sequence(&el, -1);
        let is_valid1 = is_valid_sequence(&el, 100);
        if is_valid1 {
            safe_count1 = safe_count1 + 1;
        }
        if is_valid2 {
            safe_count2 = safe_count2 + 1;
        }
    }
    println!("Il risultato della parte 1 è: {}", safe_count1);
    println!("Il risultato della parte 2 è: {}", safe_count2)
}
