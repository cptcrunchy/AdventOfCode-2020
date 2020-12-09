import { readFile } from '../util/fileReader'
import { parseStrNums, sumArray } from '../util/lib'

const params ={
    day: 9,file: "dayNine-input.txt"
};

async function partOne(args){
    const data = await readFile(args.day, args.file)
    const nums = parseStrNums(data)
    
    let preamble = 25;
    while(preamble < nums.length){
        let lower = preamble - 25
        let upper = preamble
        if(!hasSumPair(nums.slice(lower, upper), nums[preamble])) break;
        preamble++;
    }
    return nums[preamble]
}

function hasSumPair(numbers, p){
    let hasPair = false
    for(let i = 0; i < numbers.length; i++){
        for(let j = 0; j < numbers.length; j++){
            if (i !== j && numbers[i] + numbers[j] === p) hasPair = true;
        }
    }
    return hasPair
}

async function partTwo(args){
    const data = await readFile(args.day,args.file)
    const invalidNum = await partOne(args)
    const nums = parseStrNums(data)
    
    let head = 0;
    while (head < nums.length) {
        let sum = 0;
        let tail = head + 1;
        while(tail < nums.length && sum < invalidNum) {
            sum = sumArray(nums.slice(head, tail));
            tail++
        }
        if (sum == invalidNum){
            let lower = Math.min(...nums.slice(head,tail))
            let upper = Math.max(...nums.slice(head,tail))
            return lower+upper
        }
        head++;
    }
}

partOne(params)//?
partTwo(params)//?