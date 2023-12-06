const { rowsFromTextFile } = require('../../generateArrayFromTextFile');

function day6_part1(){
    const rows = rowsFromTextFile('aoc_2023/day6/day6_input.txt').map(r=>{
       return r.split(":")[1].split(" ").filter(v=>v)
    });

    let mux =1;
    for(let i=0;i<rows[0].length;i++){
        let count =0;
        for(let j=1;j<=rows[0][i];j++){
            if(j*(rows[0][i]-j)>rows[1][i]){
                count++;
            }
        }
        mux= mux*count;
    }

return mux
    
}

module.exports = { day6_part1 }