const sum = arr => arr.reduce( (a,b) => a + b, 0)
const combineChars = arr => arr.reduce( (a,b) => a.concat(b), "")

module.exports = {
    sum, combineChars
}
