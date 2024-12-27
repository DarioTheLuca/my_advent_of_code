use std::fs;

fn part1() {
    let raw_input = fs::read_to_string("input.txt").unwrap();
    let input = raw_input.lines();
    let mut stacks: Vec<Vec<&str>> = vec![
        [].to_vec(),
        [].to_vec(),
        [].to_vec(),
        [].to_vec(),
        [].to_vec(),
        [].to_vec(),
        [].to_vec(),
        [].to_vec(),
        [].to_vec(),
    ];
    let mut is_dirs = false;
    for line in input {
        // println!("{}", line);

        if line.is_empty() {
            is_dirs = true;

            stacks = stacks
                .into_iter()
                .map(|mut arr| {
                    arr.reverse();
                    return arr;
                })
                .collect::<Vec<Vec<&str>>>();
            continue;
        }
        if !line.contains("[") && !is_dirs {
            continue;
        };
        if !is_dirs {
            let line_vec = line
                .split("")
                .filter(|c| !c.is_empty())
                .collect::<Vec<&str>>();
            for i in (1..line.len()).step_by(4) {
                // println!("i: {:?}", line_vec.get(i).unwrap());
                let lett = line_vec.get(i).unwrap();
                if *lett != " " {
                    let mut index = 0;
                    if i > 1 {
                        index = (i - 1) / 2 - (((i / 4) as f32).floor() as usize);
                    }
                    stacks[index].push(*lett);
                }
            }
        } else {
            let new_line = line
                .replace("move ", "")
                .replace("from ", "")
                .replace("to ", "")
                .split(" ")
                .into_iter()
                .map(|n| n.parse::<i32>().unwrap())
                .collect::<Vec<i32>>();
            let mut q = *new_line.get(0).unwrap();
            let from = *new_line.get(1).unwrap();
            let to = *new_line.get(2).unwrap();
            while q > 0 {
                let val = stacks[(from - 1) as usize].pop().unwrap();
                stacks[(to - 1) as usize].push(val);
                q = q - 1;
            }
        }
    }
    // println!("Solution for part 1 is: {}", count)
    println!(
        "Solution for part 1 is: {:?}",
        stacks
            .iter()
            .filter(|el| !el.is_empty())
            .map(|ar| *ar.last().unwrap())
            .collect::<Vec<&str>>()
            .join("")
    )
}

fn part2() {
    let raw_input = fs::read_to_string("input.txt").unwrap();
    let input = raw_input.lines();
    let mut stacks: Vec<Vec<&str>> = vec![
        [].to_vec(),
        [].to_vec(),
        [].to_vec(),
        [].to_vec(),
        [].to_vec(),
        [].to_vec(),
        [].to_vec(),
        [].to_vec(),
        [].to_vec(),
    ];
    let mut is_dirs = false;
    for line in input {
        // println!("{}", line);

        if line.is_empty() {
            is_dirs = true;

            stacks = stacks
                .into_iter()
                .map(|mut arr| {
                    arr.reverse();
                    return arr;
                })
                .collect::<Vec<Vec<&str>>>();
            continue;
        }
        if !line.contains("[") && !is_dirs {
            continue;
        };
        if !is_dirs {
            let line_vec = line
                .split("")
                .filter(|c| !c.is_empty())
                .collect::<Vec<&str>>();
            for i in (1..line.len()).step_by(4) {
                // println!("i: {:?}", line_vec.get(i).unwrap());
                let lett = line_vec.get(i).unwrap();
                if *lett != " " {
                    let mut index = 0;
                    if i > 1 {
                        index = (i - 1) / 2 - (((i / 4) as f32).floor() as usize);
                    }
                    stacks[index].push(*lett);
                }
            }
        } else {
            let new_line = line
                .replace("move ", "")
                .replace("from ", "")
                .replace("to ", "")
                .split(" ")
                .into_iter()
                .map(|n| n.parse::<i32>().unwrap())
                .collect::<Vec<i32>>();
            let mut q = *new_line.get(0).unwrap();
            let from = *new_line.get(1).unwrap();
            let to = *new_line.get(2).unwrap();
            let mut temp_vec = vec![];
            while q > 0 {
                let val = stacks[(from - 1) as usize].pop().unwrap();
                temp_vec.push(val);
                q = q - 1;
            }
            while temp_vec.len() > 0 {
                let val = temp_vec.pop().unwrap();
                stacks[(to - 1) as usize].push(val);
            }
        }
    }
    // println!("Solution for part 1 is: {}", count)
    println!(
        "Solution for part 2 is: {:?}",
        stacks
            .iter()
            .filter(|el| !el.is_empty())
            .map(|ar| *ar.last().unwrap())
            .collect::<Vec<&str>>()
            .join("")
    )
}

fn main() {
    part1();
    part2();
}
