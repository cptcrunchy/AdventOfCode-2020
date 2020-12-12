import { readFile } from '../util/fileReader'

const params ={
    day: 12,file: "input.txt"
};

function parseInstruction(instruction){
    let [dir, num] = instruction.match(/^(\w)|(\d+)/gi)
    return [dir, +num]
}

async function partOne(args){
    const data = await readFile(args.day, args.file)
    const instructions = data.map(parseInstruction)
    let degree = 90
    let [x,y] = [0,0]

    for(let i in instructions){
        let [move, value] = instructions[i]
        if (move === 'N') y += value
        if (move === 'S') y -= value
        if (move === 'E') x += value
        if (move === 'W') x -= value
        
        if (move === 'R') {
            degree += value
            degree = Math.abs(degree) % 360;
        }
        
        if (move === 'L') {
            degree -= value
            if (degree < 0) degree = 360 + degree
        }
        if (move === 'F') {
            if (degree === 0) y += value;
            if (degree === 180) y -= value;
            if (degree === 90) x += value;
            if (degree === 270) x -= value;
        }
    }
    return Math.abs(x) + Math.abs(y)
}


async function partTwo(args){
    const data = await readFile(args.day, args.file)
    const instructions = data.map(parseInstruction)

    let [x,y] = [0,0]
    let [wayX, wayY] = [10, 1]

    for(let i in instructions){
        let [move, value] = instructions[i]
        if (move === 'N') wayY += value
        if (move === 'S') wayY -= value
        if (move === 'E') wayX += value
        if (move === 'W') wayX -= value
        if (move === 'R') {
           while(value > 0){
               [wayX, wayY] = [wayY, -wayX]
               value -= 90
           }
        }
        if (move === 'L') {
            while(value > 0){
                [wayX, wayY] = [-wayY, wayX]
                value -= 90
            }
        }
        
        if (move === 'F') {
           x += value * wayX;
           y += value * wayY;
        }
    }

    return Math.abs(x) + Math.abs(y)
}

partOne(params)//?
partTwo(params)//?