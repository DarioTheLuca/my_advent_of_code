use std::fs;
fn part1() {
    let raw_input = fs::read_to_string("ex.txt").unwrap();
    let input = raw_input.lines();
    let mut count = 0;
    for line in input {
        // println!("{}", line);
        let (l, r) = line.split_once(",").unwrap();
        let (l_min, l_max) = l.split_once("-").unwrap();
        let (r_min, r_max) = r.split_once("-").unwrap();

        if (l_min.parse::<u32>().unwrap() >= r_min.parse::<u32>().unwrap()
            && l_max.parse::<u32>().unwrap() <= r_max.parse::<u32>().unwrap())
            || (l_min.parse::<u32>().unwrap() <= r_min.parse::<u32>().unwrap()
                && l_max.parse::<u32>().unwrap() >= r_max.parse::<u32>().unwrap())
        {
            count = count + 1
        }
    }
    println!("Solution for part 1 is: {}", count)
}
fn part2() {
    let raw_input = fs::read_to_string("ex.txt").unwrap();
    let input = raw_input.lines();
    let mut count = 0;
    for line in input {
        // println!("{}", line);
        let (l, r) = line.split_once(",").unwrap();
        let (l_min, l_max) = l.split_once("-").unwrap();
        let (r_min, r_max) = r.split_once("-").unwrap();

        if !(l_min.parse::<u32>().unwrap() > r_max.parse::<u32>().unwrap()
            || l_max.parse::<u32>().unwrap() < r_min.parse::<u32>().unwrap())
        {
            count = count + 1
        }
    }
    println!("Solution for part 2 is: {}", count)
}
fn main() {
    part1();
    part2();
}
