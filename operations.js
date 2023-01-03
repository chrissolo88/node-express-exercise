const fs = require('fs');

function convertToNumbers(arr){
    try{
        const nums = arr.map((val)=> {
            num = parseInt(val)
            if(isNaN(num)) throw new Error("not a number")
            return num
        })
        return nums
    } catch(e){
        return 'error'
    }
}

function writeToJson(str){
    console.log(new Date().toLocaleString())
    str = JSON.stringify(str)
    fs.writeFile('response.json', (str +' - '+ new Date().toLocaleString() + '\n'), {encoding:"utf8",flag:'a'}, err => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log('Successfully wrote to file!');
    });
}

function mean(nums){
    const sum = nums.reduce((acc, a) => acc + parseInt(a), 0);
    return [parseFloat((sum / nums.length).toFixed(2))]
}

function median(nums){
    const median = nums.sort((a,b)=> a-b)
    if (median.length%2 === 0){
        return [(median[Math.floor(median.length / 2)] + median[Math.floor((median.length / 2)-1)])/2]
    } else {
        return [median[Math.floor(median.length / 2)]]
    }

}

function mode(nums){
    const mode = nums.sort((a,b)=> a-b)
    let tally = {}
    let modeRes = []
    mode.forEach(num => {
        let count = mode.filter((v) => (v === num)).length;
        if (!tally[num] && count > 1) tally[num] = count
    })
    if (Object.entries(tally).length === 0) return "no mode"
    if (Object.entries(tally).length === 1) return [parseInt(Object.keys(tally))]
    Object.keys(tally).reduce((a, b) => {
        if (tally[a] >= tally[b]) {
            if (tally[a] == tally[b]) modeRes.push(parseInt(b))
            if (!(a in modeRes)) modeRes.push(parseInt(a))
            return a
        } else {
            modeRes = []
            return b
        }
    });
    return modeRes
}
module.exports = {
    convertToNumbers:convertToNumbers,
    writeToJson:writeToJson,
    mean:mean,
    median:median,
    mode:mode
}