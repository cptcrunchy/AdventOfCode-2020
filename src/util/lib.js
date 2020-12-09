const sumArray = arr => arr.reduce( (a,b) => a + b, 0)
const combineChars = arr => arr.reduce( (a,b) => a.concat(b), "")
const parseStrNums = arr => arr.map(Number);


module.exports = {
    sumArray, combineChars, parseStrNums
}
