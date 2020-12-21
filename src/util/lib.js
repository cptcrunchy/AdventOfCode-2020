const sumArray = arr => arr.reduce( (a,b) => a + b, 0)
const combineChars = arr => arr.reduce( (a,b) => a.concat(b), "")
const parseStrNums = arr => arr.map(Number);
const sumOfValues = (a,b) => a + b
const productOfValues = (a,b) => a * b

module.exports = {
    sumArray, combineChars, parseStrNums, sumOfValues, productOfValues
}
