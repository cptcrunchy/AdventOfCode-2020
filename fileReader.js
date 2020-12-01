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

const readFile = async file => {
    const lines = []
    await readLines(file, line => lines.push(line))
    return lines
}

module.exports = {
    readLines,
    readFile
}