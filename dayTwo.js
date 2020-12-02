const { readFile } = require("./fileReader")

async function partOne(){
    const lines = await readFile("dayTwo-input.txt")
    const datasets = lines.map(line => line.split(": "))
    
    const validPasswords = datasets.map( (dataset) => {
        let [condition, password] = dataset
        let rules = condition.split(" ")
        let [min, max] = rules[0].split("-")
        let charRegex = new RegExp(rules[1], "gi")
        let charCount = password.match(charRegex)
        if(charCount !== null) {
            let hasMin = charCount.length >= min//?
            let hasMax = charCount.length <= max//?
            if(hasMin && hasMax){
                return 1;
            } else {
                return 0;
            }
        }
    })
    return validPasswords.filter(v => v).length//?
}
partOne()//?

async function partTwo(){
    const lines = await readFile("dayTwo-input.txt")
    const datasets = lines.map(line => {
        const [,one, two, char, password] = line.match(/^(\d+)-(\d+) (\w): (\w+)$/)
        const posA = parseInt(one, 10)
        const posB = parseInt(two, 10)
        return {posA, posB, char, password}
    })
    return datasets.filter(({posA, posB, char, password}) => {
        return (password[posA - 1] === char) !== (password[posB - 1] === char)
    }).length//?
}

partTwo()//?
