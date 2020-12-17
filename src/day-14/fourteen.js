import { readFile } from '../util/fileReader'
import { sumArray } from '../util/lib'

const params ={
    day: 14,file: "input.txt"
};

const binToInt = v => parseInt(v,2)

function addMask(mask, val){
    const binaryVal = val.toString(2).padStart(36, '0')
    let output = ''
    for(let i = 0; i < mask.length; i++){
        output += (mask[i] === 'X') ? binaryVal[i] : mask[i]
    }
    return binToInt(output)
}

function decode (val, decoder){
    const binaryVal = val.toString(2).padStart(36, '0')
    let addresses = ['']
    for(let i in decoder){
        if(decoder[i] === "X")
            addresses = addresses.reduce((a,v) => a.concat(v+'0', v+'1'), [])
        else
            addresses = addresses.map(v => v+= (decoder[i] === '0') ? binaryVal[i] : decoder[i])
    }
    return addresses.map(binToInt)
}

async function partOne(args){
    const data = await readFile(args.day, args.file)
    let mask;
    const cache = {}
    data.forEach(line => {
        if(line.startsWith("mask")){
            mask = line.substr(7)
        } else {
            let [_, address, val] = line.match(/mem\[(\d+)\] = (\d+)/)
            address = parseInt(address)
            val = parseInt(val)
            cache[address] = addMask(mask, val)
        }
    })
    
    return sumArray(Object.values(cache))
}

async function partTwo(args){
    const data = await readFile(args.day, args.file)
    let decoder;
    const cache = {}
    data.forEach(line => {
        if(line.startsWith("mask")){
            decoder = line.substr(7)
        } else {
            let [_, address, val] = line.match(/mem\[(\d+)\] = (\d+)/)
            address = parseInt(address)
            val = parseInt(val)
            let decodedAddresses = decode(address, decoder)
            decodedAddresses.forEach(addr => cache[addr] = val)
        }
    })
    return sumArray(Object.values(cache))
}

partOne(params)//?
partTwo(params)//?