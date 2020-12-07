import { readFile } from '../util/fileReader'

async function partOne(){
    const data = await readFile(7, 'daySeven-input.txt')
    const map = new Map(data.map(parseRule))

    const resultSet = new Set()
    map.forEach((_, key) => hasGoldBag(map, key, resultSet))

    return resultSet.size//?
}

function parseRule(line){
    const keyValRegex = /(.+) bags contain (.+)\./;
    const [_, key, contents] = line.match(keyValRegex)
     return [key, parseContents(contents)]
}

function parseContents(contents){
    const rulesRegex = /(\d+) ([a-z]+ [a-z]+) bags?/;
    return contents.split(",").reduce((rSet, rule) => {
        const match = rule.match(rulesRegex);
        if (match) {
            const [_, count, color] = match;
            rSet.push([parseInt(count), color])
        }
        return rSet;
    }, [])
}

function hasGoldBag(map, current, resultSet){
    return map.get(current).some(([,color]) => {
        if (color === "shiny gold" || resultSet.has(color) || hasGoldBag(map, color, resultSet)) {
            resultSet.add(current);
            return true;
        }
        return false;
    });
}
partOne()//?

async function partTwo(){
    const data = await readFile(7, 'daySeven-input.txt')
    const map = new Map(data.map(parseRule))
    return countInnerBags(map, "shiny gold") - 1
}

function countInnerBags(map, key){
    return map.get(key).reduce( (sum, [count, color]) => sum + count * countInnerBags(map, color), 1)
}

partTwo()//?