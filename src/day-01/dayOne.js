const { readFile } = require("./fileReader")

async function partOne() {
    const lines = await readFile('dayOne-input.txt')
    const expenses = lines.map(Number)
    for (const a of expenses){
        for (const b of expenses) {
            if( a + b === 2020) return a * b
        }
    }
}

async function partTwo() {
    const lines = await readFile('dayOne-input.txt')
    const expenses = lines.map(Number)
    for (const a of expenses){
        for (const b of expenses) {
            for (const c of expenses) {
                if ( a + b + c === 2020) return a * b * c
            }
        }
    }
}

partOne()//?
partTwo()//?