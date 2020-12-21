import { readFile } from '../util/fileReader'
import { sumArray, sumOfValues, productOfValues } from '../util/lib'

const params ={
    day: 18,file: "input.txt"
};

const operands = ["+", "*"]

const operators = {
    '+': sumOfValues,
    '*': productOfValues
}

function parseInput(data){
    return data.map(line => {
        return line
        .replace(/\s+/g, '')
        .split('')
        .map(c => isNaN(c) ? c : parseInt(c))
        .reverse()
    })
}

async function partOne(args){
    const data = await readFile(args.day, args.file)
    
    const lines = parseInput(data).map( tokens => {
        let stack = []
        //stack temporary memory
        while(stack.length > 1 || tokens.length > 0){
            while(stack.length < 3){
                stack.push(tokens.pop())
            }

            let _3 = stack.pop()
            let _2 = stack.pop()
            let _1 = stack.pop()

            if(_1 === '(' && _3 === ')'){
                stack.push(_2)
            } else if(!isNaN(_1) && !isNaN(_3) && operands.includes(_2)){
                stack.push(operators[_2](_1,_3) )
            } else if (tokens.length > 0){
                stack.push(_1)
                stack.push(_2)
                stack.push(_3)
                stack.push(tokens.pop())
            }
        }
        return stack.shift()
    })
    
    return sumArray(lines)
}

async function partTwo(args){
    const data = await readFile(args.day, args.file)
    
    const lines = parseInput(data).map( tokens => {
        let stack = []
        //stack temporary memory
        while(stack.length > 1 || tokens.length > 0){
            while(stack.length < 3){
                stack.push(tokens.pop())
            }
            let next = tokens[tokens.length - 1]//?
            let _3 = stack.pop()
            let _2 = stack.pop()
            let _1 = stack.pop()

            if(_1 === '(' && _3 === ')'){
                stack.push(_2)
            } else if(!isNaN(_1) && !isNaN(_3) && operands.includes(_2) && next !== operands[0]){
                stack.push(operators[_2](_1,_3) )
            } else if (tokens.length > 0){
                stack.push(_1)
                stack.push(_2)
                stack.push(_3)
                stack.push(tokens.pop())
            }
        }
        return stack.shift()//?
    })
    return sumArray(lines)
}
// assuming sumArray(lines) === 26335 for sample
partOne(params)//?
// assuming sumArray(lines) === 693942
partTwo(params)//?