import { readFile } from '../util/fileReader'
import { sum, combineChars } from '../util/lib'

async function partOne(){
    const data = await readFile(6, "daySix-input.txt")
    const answers = data.map(line => (line === "") ? "|": line).join("").split("|").map(form => [...new Set(form)].length )
    return sum(answers)
}

partOne()//?

async function partTwo(){
    const data = await readFile(6, "daySix-input.txt")
    const sets = formatData(data)
    const everyonesAnswers = sets.map( item => {
        return (item.length === 1) ? item[0].length : getDuplicateChars(item.length, item)
    })
    return sum(everyonesAnswers)
}

function getDuplicateChars(count, str){
    const duplicates = combineValues(str).match(/(.)\1+/g)
    return (duplicates === null) ? 0 : duplicates.filter(i => i.length === count).length
}

function combineValues(arr){
    return combineChars(arr).split('').sort().join('')
}

function formatData(arr){
    let subset = []
    let values = []
    for(let i = 0; i <= arr.length; i++){
        let value = arr[i]
        if(value !== ''){
            subset.push(value)           
        } else {
            values.push(subset)
            subset = []
        }
    }
    return values
}
partTwo()//?
