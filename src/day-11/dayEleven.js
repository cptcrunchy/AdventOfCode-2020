import { readFile } from '../util/fileReader'

const params ={
    day: 11,file: "dayEleven-input.txt"
};
const SEAT = {
    occupied: "#",
    empty: "L",
    floor: "."
}
Object.freeze(SEAT)
function getNeighbors(grid, row, col){
    let adjSeats = [];
    if(row > 0){
        const tRow = grid[row -1]
        adjSeats.push(tRow[col - 1],tRow[col], tRow[col + 1])
    }
    adjSeats.push(grid[row][col-1],grid[row][col+1])
    
    if(row < grid.length - 1){
        const bRow = grid[row+1]
        adjSeats.push(bRow[col - 1],bRow[col], bRow[col + 1])
    }
    
    const emptySeats = adjSeats.filter(seat => seat === SEAT.empty).length
    const occupiedSeats = adjSeats.filter(seat => seat === SEAT.occupied).length
    return {occupiedSeats, emptySeats}
}

async function partOne(args){
    const data = await readFile(args.day, args.file)
    let isSeatsChanged;
    let seats = data;
    let prevSeats = [...seats]
    do {
        const newSeats = []
        isSeatsChanged = false
        
        for(let row = 0; row < prevSeats.length; row += 1) {
          for(let col = 0; col < prevSeats[row].length; col += 1) {
            let seat = prevSeats[row][col], newSeat = seat
            if(seat !== SEAT.floor) {
              const adjacentSeats = getNeighbors(prevSeats, row, col)
              if(seat === SEAT.empty && adjacentSeats.occupiedSeats === 0) {
                  newSeat = SEAT.occupied
              } else if(seat === SEAT.occupied && adjacentSeats.occupiedSeats >= 4) {
                  newSeat = SEAT.empty
              }
            }else {
                newSeat = SEAT.floor
            }
            
            if(newSeat !== seat) isSeatsChanged = true
            newSeats[row] = `${newSeats[row]}${newSeat}`
          }
        }
        prevSeats = [...newSeats]
      } while (isSeatsChanged)
      
      return prevSeats.join('').match(/#/ig).length//?
}





partOne(params)//?