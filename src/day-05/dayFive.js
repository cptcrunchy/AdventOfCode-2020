import { readFile } from '../util/fileReader'

function findRow(rMap){
    const ROWS = [...Array(128).keys()]
    let section = ROWS
    for(let i = 0; i < rMap.length; i++){
        const half = Math.ceil(section.length / 2)
        let step = rMap[i]
        if(step === "F"){
            section = section.splice(0,half)
        }else if(step === "B") {
            section = section.splice(-half)
        }
    }
    return section[0]
}
function findCol(cMap){
    const COLS = [...Array(8).keys()]
    let section = COLS
    for(let i = 0; i < cMap.length; i++){
        const half = Math.ceil(section.length / 2)
        let step = cMap[i]
        if(step === "L"){
            section = section.splice(0,half)
        }else if(step === "R") {
            section = section.splice(-half)
        }
    }
    return section[0]
}
function getSeatId(seat){
    return seat.row * 8 + seat.col
}
function getSeats(arr){
    return arr.map(bp => {
        const [_,row,col] = bp.match(/^(\w{7})(\w{3})$/im)
        return {row: findRow(row), col: findCol(col)}
    }).map(getSeatId)
}
async function partOne(){
    const boardPasses = await readFile(5, "dayFive-input.txt");
    const seats = getSeats(boardPasses) 
    return Math.max(...seats)
}
async function partTwo(){
    const boardPasses = await readFile(5, "dayFive-input.txt");
    const tickets = getSeats(boardPasses)
    return [...Array(806).keys()].splice(49).filter(s => !tickets.includes(s))[0]//?
}

partOne()
partTwo()