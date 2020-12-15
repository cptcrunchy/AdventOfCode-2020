import { readFile } from '../util/fileReader'
import { parseStrNums } from '../util/lib'
const params ={
    day: 15,file: "input.txt"
};



async function partOne(args){
    const data = await readFile(args.day, args.file)
    const numbers = parseStrNums(data)

    const gameLength = 2020;
    let lastNum = numbers[numbers.length -1]
    const memory = new Array(gameLength)

    numbers.forEach( (n, i) => memory[n] = i + 1)

    for(let i = numbers.length; i < gameLength; i++){
        const nextNum = memory[lastNum] ? i - memory[lastNum]: 0;
        memory[lastNum] = i;
        lastNum = nextNum;
    }
    return lastNum
}

async function partTwo(args){
    const data = await readFile(args.day, args.file)
    const numbers = parseStrNums(data)

    const gameLength = 30000000;
    let lastNum = numbers[numbers.length -1]
    const memory = new Array(gameLength)

    numbers.forEach( (n, i) => memory[n] = i + 1)

    for(let i = numbers.length; i < gameLength; i++){
        const nextNum = memory[lastNum] ? i - memory[lastNum]: 0;
        memory[lastNum] = i;
        lastNum = nextNum;
    }
    return lastNum
}
partOne(params)
partTwo(params)