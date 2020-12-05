const { readFile } = require("./fileReader")

const TREE = "#"
async function partOne(vector){
    const grid = await readFile("dayThree-input.txt")
    const trees = grid.map(col => col.repeat(10))
    let treeCount = 0
    
    trees.forEach( (treeLine, i) => {
        if(i % vector.y === 0) {
            const right = i / vector.y * vector.x + 1;
            if(right % treeLine.length === 0 && treeLine[treeLine.length -1] === TREE){
                treeCount++
            }
            let mut = (right % treeLine.length) - 1 
            if(treeLine[mut] === TREE){
                treeCount++
            }
        }
    })
    return treeCount
}
const slope = {x:3, y:1}
partOne(slope)//?


async function partTwo(){
    const slopeA = {x:1, y:1}
    const slopeB = {x:3, y:1}
    const slopeC = {x:5, y:1}
    const slopeD = {x:7, y:1}
    const slopeE = {x:1, y:2}

    const vectors = [
        await partOne(slopeA),
        await partOne(slopeB),
        await partOne(slopeC),
        await partOne(slopeD),
        await partOne(slopeE)
    ]
    return vectors.reduce((sum, vector) => sum * vector)
}    

partTwo()//?