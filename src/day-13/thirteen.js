import { readFile } from '../util/fileReader'

const params ={
    day: 13,file: "input.txt"
};

const mod = (num, id) => ((num % id) + id) % id
const inverseMod = (num, id) => euclideanGcd(num, id).shift()
const euclideanGcd = (a,b) => {
    if(b == 0) return [1n, 0n, a]
    const [x,y,d] = euclideanGcd(b, a % b)
    return [y, x - y *(a / b), d]
}

async function partOne(args){
    const data = await readFile(args.day, args.file)
    let minWait = 200000
    let [ets, ...buses] = data
    let minBus
    let validBusIds = buses[0].split(',').filter(b => b !== 'x').map(Number)
    for(let id of validBusIds){
        const nextTS = mod(-ets, id)
        if(nextTS < minWait){
            minWait = nextTS
            minBus = id
        }
    }
    return minBus * minWait
}

async function partTwo(args){
    const data = await readFile(args.day, args.file)
    const buses = data[1]
    .split(',').map( id => (id === "x") ? id : parseInt(id))
    .reduce( (acc,id, i) => {
        if(id !== 'x') acc.push({bid: BigInt(id), t: BigInt(id - i) })
        return acc
    },[])
    
    const maxStamp = buses.reduce( (acc, bus) => acc * bus.bid, 1n)
    return buses.reduce( (time, {bid, t}) => {
        const M = maxStamp / bid
        return mod(time + t * inverseMod(M, bid) * M, maxStamp)
    }, 0n)
}

partOne(params)
partTwo(params)//?