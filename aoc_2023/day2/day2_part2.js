const { findNumber } = require('./findNumber');
const { rowsFromTextFile } = require('../../generateArrayFromTextFile');

function day2_part2(){
    const rows = rowsFromTextFile('aoc_2023/day2/day2_input.txt');
    
    const rowsArr = rows.map(r=>r.replaceAll('blue','B').replaceAll('green','V').replaceAll('red','R'))
    
    let sum =0;
    
    for(let j=0; j< rowsArr.length;j++){
        let row = rowsArr[j];
        let maxB=0;
        let maxV=0;
        let maxR=0;
        for (let i=0; i<row.length;i++){
            if (row[i]==='V'){    
                const num = findNumber(row.substring(0,i+1),i);
                maxV=Math.max(num,maxV);
            }else if(row[i]==='R'){
                const num = findNumber(row.substring(0,i+1),i);
                maxR=Math.max(num,maxR);
            }else if(row[i]==='B'){
                const num = findNumber(row.substring(0,i+1),i);
                maxB=Math.max(num,maxB);           
            }
        }
        sum = sum + ( maxB * maxV * maxR );
    }
    return sum;
}

module.exports = { day2_part2 }




