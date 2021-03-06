const fs = require("fs")
const readLine = require("readline")

const readLines = (file, onLine) => {
    const reader = readLine.createInterface({
        input: fs.createReadStream(file),
        crlfDelay: Infinity
    })

    reader.on('line', onLine)

    return new Promise( resolve => reader.on('close', resolve))
}

const readFile = async (day, file) => {
    const lines = []
    const fileLocation = `src/day-${(day < 10)? "0"+day : day}/${file}`//?
    await readLines(fileLocation, line => lines.push(line))//?
    return lines
}

const readFileRaw = async (day, file) => {
    const fileLocation = `src/day-${(day < 10)? "0"+day : day}/${file}`
    return fs.readFileSync(fileLocation, 'utf-8')//?
}


module.exports = {
    readLines,
    readFile,
    readFileRaw
}