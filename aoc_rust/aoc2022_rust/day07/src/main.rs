use std::{cmp, collections::HashMap, fs};

fn main() {
    let dir_size = part1();
    part2(&dir_size);
}
#[derive(Debug)]
struct File {
    size: i64,
}

#[derive(Debug)]

struct Folder {
    folders: Vec<String>,
    files: Vec<File>,
}

impl Folder {
    fn new() -> Folder {
        let folders: Vec<String> = vec![];
        let files: Vec<File> = vec![];
        return Folder { folders, files };
    }
    fn add_folder(&mut self, folder: &str) {
        self.folders.push(String::from(folder));
    }
    fn add_file(&mut self, file: File) {
        self.files.push(file);
    }
}

fn part1() -> HashMap<String, i64> {
    let raw_input = fs::read_to_string("input.txt").unwrap();
    let input = raw_input.lines();
    let mut curr: String = String::from("");
    let mut path_map = HashMap::<String, Folder>::new();
    for line in input {
        // println!("line: {}", line);
        if line.contains("$ cd ..") {
            curr = remove_last_folder_in_path(&curr);
        } else if line.contains("$ cd ") {
            let dir_name = line.replace("$ cd ", "");
            // println!("curr before: {}", curr);
            curr = add_folder_in_path(&curr, &dir_name.replace("/", ""));
            // println!("curr after: {}", curr);
        } else if line.contains("$ cd ..") {
            curr = remove_last_folder_in_path(&curr);
        } else if line.contains("$ ls") {
            continue;
        } else if line.contains("dir") {
            let mut dir_name = line.replace("dir ", "");
            dir_name = add_folder_in_path(&curr, &dir_name);
            if path_map.contains_key(&curr) {
                let curr_folder = path_map.get_mut(&curr).unwrap();
                curr_folder.add_folder(&dir_name);
            } else {
                let mut new_folder = Folder::new();
                new_folder.add_folder(&dir_name);
                path_map.insert(String::from(&curr), new_folder);
            }
        } else {
            let (size, _) = line.split_once(" ").unwrap();
            let size_num: i64 = (String::from(size)).parse().unwrap();
            let file: File = File { size: size_num };
            if path_map.contains_key(&curr) {
                let curr_folder = path_map.get_mut(&curr).unwrap();
                curr_folder.add_file(file);
            } else {
                let mut new_folder = Folder::new();
                new_folder.add_file(file);
                path_map.insert(String::from(&curr), new_folder);
            }
        }
        // println!("curr: {}", curr);
    }
    let mut dir_size: HashMap<String, i64> = HashMap::new();
    get_folder_size(&path_map, &String::from("/"), &mut dir_size);

    let mut res: i64 = 0;
    dir_size.keys().for_each(|key| {
        if *dir_size.get(key).unwrap() <= 100_000 {
            res = res + dir_size.get(key).unwrap();
        }
    });
    println!("solution for part 1 is: {}", res);
    // println!("path map : {:?}", path_map);
    // println!("dirs size : {:?}", dir_size);
    return dir_size;
}

fn part2(dir_size: &HashMap<String, i64>) {
    let root_size = dir_size.get("/").unwrap();
    // println!("root_size: {}", root_size);
    let space_needed: i64 = 30_000_000;
    let total_space: i64 = 70_000_000;
    let mut min = f64::INFINITY;
    dir_size.keys().for_each(|key| {
        let size = *dir_size.get(key).unwrap();
        if total_space - root_size + size >= space_needed {
            if (size as f64) < min {
                min = size as f64;
            }
        }
    });
    println!("Solution for part 2 is: {}", min);
}

fn get_folder_size(
    path_map: &HashMap<String, Folder>,
    folder_name: &String,
    dir_size: &mut HashMap<String, i64>,
) -> i64 {
    if dir_size.contains_key(folder_name) {
        return *dir_size.get(folder_name).unwrap();
    }
    let mut size: i64 = 0;
    let folder = path_map.get(folder_name).unwrap();
    folder.files.iter().for_each(|file| size = size + file.size);
    folder
        .folders
        .iter()
        .for_each(|folder| size = size + get_folder_size(&path_map, folder, dir_size));
    dir_size.insert(folder_name.clone(), size);
    return size;
}

fn remove_last_folder_in_path(paths: &str) -> String {
    let mut folders = paths
        .split("/")
        .filter(|n| !n.is_empty())
        .collect::<Vec<&str>>();
    // println!("fodlers before pop: {:?}", folders);

    folders.pop();
    // println!("fodlers after pop: {:?}", folders);
    if folders.len() > 0 {
        return String::from("/") + &folders.join("/") + "/";
    };
    return String::from("/");
}

fn add_folder_in_path(paths: &str, folder: &str) -> String {
    return String::from(paths) + folder + "/";
}
