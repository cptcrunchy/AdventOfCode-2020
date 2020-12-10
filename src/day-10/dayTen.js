import { readFile } from '../util/fileReader'
import { parseStrNums } from '../util/lib'

const params ={
    day: 10,file: "dayTen-input.txt"
};

async function partOne(args){
    const data = await readFile(args.day, args.file)
    const adapters = parseStrNums(data)
    let seq = adapters.sort((a,b) => a -b)

    let oneJoltDiffCount = 0;
    let threeJoltDiffCount = 0;
    let start = 0;
    for(let i = 0; i < seq.length; i++){
        let adapter = seq[i]
        if(adapter - start === 1){
            oneJoltDiffCount++;
            start = adapter
        }else if (adapter - start === 3){
            threeJoltDiffCount++;
            start = adapter
        }
    }

    return (oneJoltDiffCount * (threeJoltDiffCount + 1))
}

async function partTwo(args){
    const data = await readFile(args.day, args.file)
    let adapters = parseStrNums(data).sort((a,b) => a-b)
    let socket = 0;
    let maxJolt = Math.max(...adapters)+3
    adapters = [socket, ...adapters, maxJolt]  
    
    let cache = {}
    cache[maxJolt] = 1
    
    for(let i = adapters.length - 2; i >= 0; i--){
        cache[adapters[i]] = 0
        for(let j = i + 1; j < adapters.length && j <= i + 3;j++){
            console.log(adapters[j],adapters[i])//?
            if(adapters[j] - adapters[i] <= 3) cache[adapters[i]] += cache[adapters[j]]
        }
    }
    return cache[0]
}


partOne(params)
partTwo(params)//?