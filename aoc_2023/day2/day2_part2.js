const path = require('path');
const fs = require('fs');
const { findNumber } = require('./findNumber');

const pathInput = path.join(__dirname,'day2_input.txt');

const file = fs.readFileSync(pathInput,'utf8');

const rows = file.split('\n').map(row=>row.trim());

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
    sum = sum + (maxB*maxV*maxR)
}

console.log("sum",sum);





