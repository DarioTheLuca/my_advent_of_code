const { rowsFromTextFile } = require("../../generateArrayFromTextFile");

function day8_part1() {
  const rows = rowsFromTextFile("aoc_2023/day8/day8_input.txt").filter(r=>r)
  const dir = rows.shift();
  const nR = rows.map(r=>{
    return r.substring(0,r.length-1)
  });

  const map=new Map();
  nR.forEach(r=>{
    let newR = r.split(' = (')
   
      map.set(newR[0],newR[1].split(', '))
   
  })


  let result = 0;
  let find = false;
  let start = 'AAA';
  while(!find){
    for(let i=0;i<dir.length;i++){
      result++;
      if(dir[i]==='R'){
        start=map.get(start)[1];
        if (start==='ZZZ') {
          find=true;
          break
        };
        continue;
      }else{
        start=map.get(start)[0];
        
        if (start==='ZZZ') {
          find=true;
          break
        };
      }
    }
  }


  return result;
}
console.log(day8_part1());
module.exports = { day8_part1 };
