use regex::Regex;
use std::{cmp, collections::HashSet, fs};

fn main() {
    part1("input.txt");
    part2("input.txt");
}
#[derive(Debug)]
struct Coordinate {
    x: i32,
    y: i32,
}

impl Coordinate {
    fn get_id(&self) -> String {
        let Coordinate { x, y } = self;
        format!("{x},{y}")
    }

    fn manhattan_distance_with(&self, other: &Coordinate) -> u32 {
        self.x.abs_diff(other.x) + self.y.abs_diff(other.y)
    }
}

fn part1(path: &str) {
    let raw_input = fs::read_to_string(path).unwrap();
    let lines = raw_input.lines();
    let re = Regex::new(r"x=(-?\d+), y=(-?\d+)").unwrap();

    let mut sensor_beacon_list: Vec<[Coordinate; 2]> = vec![];

    let y_ = 2_000_000;
    // let y_ = 10;
    let mut x_min = f32::INFINITY as i32;
    let mut x_max = -f32::INFINITY as i32;

    for line in lines {
        let mut temp: [Coordinate; 2] = [Coordinate { x: 0, y: 0 }, Coordinate { x: 0, y: 0 }];
        for (index, cap) in re.captures_iter(line).enumerate() {
            let x: i32 = cap[1].parse().unwrap();
            let y: i32 = cap[2].parse().unwrap();
            x_min = cmp::min(x_min, x);
            x_max = cmp::max(x_max, x);
            temp[index] = Coordinate { x, y };
        }
        sensor_beacon_list.push(temp);
    }
    println!("min {} and max {}", x_min, x_max);

    let mut beacons_set: HashSet<i32> = HashSet::new();

    let mut ranges: Vec<Vec<i32>> = vec![];

    for sensor_beacon in sensor_beacon_list {
        // println!("{:?}", sensor_beacon);
        let sensor = sensor_beacon.get(0).unwrap();
        let beacon = sensor_beacon.get(1).unwrap();
        if beacon.y == y_ {
            beacons_set.insert(beacon.x);
        }
        let m_distance = sensor.manhattan_distance_with(beacon) as i32;
        // println!("m_distance: {}", m_distance);
        // calcolare estremi nord e sud
        // nord = sy-MD
        // sud = sy+MD
        // vedere se la riga Y è >=nord e <=sud
        // estremo Sx-( MD - |Sy - Y|) ; Sx+ ( MD - |Sy - Y|)
        let nord = sensor.y - m_distance;
        let sud = sensor.y + m_distance;
        if y_ >= nord && y_ <= sud {
            let mut range: Vec<i32> = vec![];
            let diff = m_distance - sensor.y.abs_diff(y_) as i32;
            let left_range = sensor.x - diff;
            let right_range = sensor.x + diff;
            range.push(left_range);
            range.push(right_range);
            ranges.push(range);
        }
    }
    ranges.sort_by(|range1, range2| range2.get(0).unwrap().cmp(range1.get(0).unwrap()));

    let mut intervals: Vec<Vec<i32>> = vec![];
    intervals.push(ranges.pop().unwrap());

    while ranges.len() > 0 {
        let interval = intervals.pop().unwrap();
        let range = ranges.pop().unwrap();
        if do_ranges_overlap(&interval, &range) {
            intervals.push(merge_ranges(interval, range));
        } else {
            intervals.push(interval);
            intervals.push(range);
        }
    }

    let mut count = 0;

    for interval in intervals {
        let min = *interval.get(0).unwrap();
        let max = *interval.get(1).unwrap();

        count = count + min.abs_diff(max);
        if 0 >= min && 0 <= max {
            count = count + 1;
        }
    }

    println!(
        "Solution for part 1 is {}",
        count - beacons_set.len() as u32
    );
}

fn merge_ranges(range1: Vec<i32>, range2: Vec<i32>) -> Vec<i32> {
    let min = *cmp::min(range1.get(0).unwrap(), range2.get(0).unwrap());
    let max = *cmp::max(range1.get(1).unwrap(), range2.get(1).unwrap());
    return vec![min, max];
}

fn do_ranges_overlap(range1: &Vec<i32>, range2: &Vec<i32>) -> bool {
    if range2.get(0).unwrap() >= range1.get(0).unwrap()
        && range2.get(0).unwrap() <= range1.get(1).unwrap()
    {
        return true;
    }
    return false;
}

fn part2(path: &str) {
    let raw_input = fs::read_to_string(path).unwrap();
    let lines = raw_input.lines();
    let re = Regex::new(r"x=(-?\d+), y=(-?\d+)").unwrap();

    let mut sensor_beacon_list: Vec<[Coordinate; 2]> = vec![];

    // let y_ = 2_000_000;
    // let y_ = 10;
    let mut x_min = f32::INFINITY as i32;
    let mut x_max = -f32::INFINITY as i32;

    for line in lines {
        let mut temp: [Coordinate; 2] = [Coordinate { x: 0, y: 0 }, Coordinate { x: 0, y: 0 }];
        for (index, cap) in re.captures_iter(line).enumerate() {
            let x: i32 = cap[1].parse().unwrap();
            let y: i32 = cap[2].parse().unwrap();
            x_min = cmp::min(x_min, x);
            x_max = cmp::max(x_max, x);
            temp[index] = Coordinate { x, y };
        }
        sensor_beacon_list.push(temp);
    }
    println!("min {} and max {}", x_min, x_max);

    let mut beacons_set: HashSet<i32> = HashSet::new();
    // let y_max = 4_000_000;

    // let range_limit_max: i32 = 20;
    let range_limit_max: i32 = 4_000_000;
    let range_limit_min = 0;

    for y_ in 0..=range_limit_max {
        let mut ranges: Vec<Vec<i32>> = vec![];

        for sensor_beacon in &sensor_beacon_list {
            // println!("{:?}", sensor_beacon);
            let sensor = sensor_beacon.get(0).unwrap();
            let beacon = sensor_beacon.get(1).unwrap();
            if beacon.y == y_ {
                beacons_set.insert(beacon.x);
            }
            let m_distance = sensor.manhattan_distance_with(beacon) as i32;
            // println!("m_distance: {}", m_distance);
            // calcolare estremi nord e sud
            // nord = sy-MD
            // sud = sy+MD
            // vedere se la riga Y è >=nord e <=sud
            // estremo Sx-( MD - |Sy - Y|) ; Sx+ ( MD - |Sy - Y|)
            let nord = sensor.y - m_distance;
            let sud = sensor.y + m_distance;
            if y_ >= nord && y_ <= sud {
                let mut range: Vec<i32> = vec![];
                let diff = m_distance - sensor.y.abs_diff(y_) as i32;
                let left_range = sensor.x - diff;
                let right_range = sensor.x + diff;
                range.push(left_range);
                range.push(right_range);
                ranges.push(range);
            }
        }
        ranges.sort_by(|range1, range2| range2.get(0).unwrap().cmp(range1.get(0).unwrap()));

        let mut intervals: Vec<Vec<i32>> = vec![];
        intervals.push(ranges.pop().unwrap());

        while ranges.len() > 0 {
            let interval = intervals.pop().unwrap();
            let range = ranges.pop().unwrap();
            if do_ranges_overlap(&interval, &range) {
                intervals.push(merge_ranges(interval, range));
            } else {
                intervals.push(interval);
                intervals.push(range);
            }
        }

        let mut count: i32 = 0;
        for interval in &intervals {
            let min = cmp::max(*interval.get(0).unwrap(), range_limit_min);
            let max = cmp::min(*interval.get(1).unwrap(), range_limit_max);

            count = count + min.abs_diff(max) as i32;
            if 0 >= min && 0 <= max {
                count = count + 1;
            }
        }
        if range_limit_max - count == 1 {
            println!("intervals y:{}: {:?}, count: {}", y_, intervals, count);
            println!(
                "Solution for part 12 is {}",
                (((intervals.get(0).unwrap().get(1).unwrap() + 1) as i128) * 4_000_000)
                    + (y_ as i128)
            );
        }
    }
}
