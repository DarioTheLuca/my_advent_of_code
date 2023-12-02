const path = require('path');
const fs = require('fs');
const { findNumber } = require('./findNumber');

const pathInput = path.join(__dirname,'day2_input.txt');

const file = fs.readFileSync(pathInput,'utf8');

const rows = file.split('\n').map(row=>row.trim());

const rowsArr = rows.map(r=>r.replaceAll('blue','B').replaceAll('green','V').replaceAll('red','R'))

const greenMax = 13;
const redMax=12;
const blueMax=14;

let sum =0;

for(let j=0; j< rowsArr.length;j++){
    let row = rowsArr[j];
    let ok = true;
    for (let i=0; i<row.length;i++){
        if (row[i]==='V'){
            const num = findNumber(row.substring(0,i+1),i);
            if(num>greenMax){ ok=false; break}
        }else if(row[i]==='R'){
            const num = findNumber(row.substring(0,i+1),i);
            if(num>redMax) { ok=false; break}
        }else if(row[i]==='B'){
            const num = findNumber(row.substring(0,i+1),i);
            if(num>blueMax) { ok=false; break}
        }
    }
    if(ok){
        sum +=j+1
    }
}

console.log("sum",sum);





