import { readFile } from '../util/fileReader'

async function partOne(){
    const data = await readFile(8, 'dayEight-input.txt')
    const instructions = data.map(parseData)//?
    let acc = 0;
    let i = 0;
    const bootSeq = new Set()//?

    while(!bootSeq.has(i)){
        bootSeq.add(i);
        const [operand, arg] = instructions[i]//?
        if(operand === 'nop'){
            i++;
        } else if(operand === 'acc'){
            acc += arg;
            i++;
        } else {
            i += arg;
        }
    }
    return acc;
}

async function partTwo(){
    const data = await readFile(8, 'dayEight-input.txt')
    const instructions = data.map(parseData)//?
    for(let i = 0; i < instructions.length; i++){
        const newInstructions = instructions.map(([operand, val]) => [operand, val])
        instructions[i][0]//?
        if(instructions[i][0] === 'jmp'){
            newInstructions[i][0] = 'nop';            
        } else if(instructions[i][0] === 'nop'){
            instructions[i][0] === 'jmp';
        }else {
            continue;
        }

        const bootSeq = new Set()
        let acc = 0, j = 0;
        while(!bootSeq.has(j)){
            bootSeq.add(j);
            const [operand, arg] = newInstructions[j]
            if(operand === 'nop'){
                j++;
            } else if(operand === 'acc'){
                acc += arg;
                j++;
            } else {
                j += arg;
            }

            if(j >= newInstructions.length){
                return acc;
            }
        }
    }
}

function parseData(d){
    const [rule, count] = d.split(' ')
    return [rule, parseInt(count, 10)]
}

partOne()
partTwo()//?