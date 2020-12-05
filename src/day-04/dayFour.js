import { readFile } from '../util/fileReader'

const formatData = arr => arr.reduce((raw,pport) => (pport === "") ? raw.concat("|") : `${raw} ${pport}`, "").split("|").map(p => p.slice(1))
const passportRegex = new RegExp("(hcl:)|(ecl:)|(eyr:)|(pid:)|(byr:)|(iyr:)|(hgt:)|(cid:{0,1})?", "g")
const pportFormat = str => str.split(":").join(" ").trim().split(" ")
const pportsFilter = arr => arr.map(p => p.match(passportRegex).filter(m => m !== "").join("") )

async function partOne(){
    const data = await readFile(4, "dayFour-sample.txt")//?
    const passportsRaw = formatData(data)
    const passports = pportsFilter(passportsRaw)
   
    return passports.filter(pport => {
        const pportProps = pportFormat(pport)
        if (pport.includes("cid")){
            if (pportProps.length === 8) return pport            
        } else if(pportProps.length === 7) return pport
        
    }).length
}

partOne()//?

const validFieldsRegex = /(ecl:\w+)|(pid:\d+)|(eyr:\d+)|(iyr:\d+)|(hcl:#\w+)|(byr:\d+)|(hgt:\d+\w+)/g
const validateByr = str => {
    const year = Number(str.split(":")[1])
    const [min,max] = [1920, 2002]
    return (year >= min && year <= max)
}
const validateIyr = str => {
    const year = Number(str.split(":")[1])
    const [min, max] = [2010,2020]
    return (year >= min && year <= max)
}
const validateEyr = str => {
    const year = Number(str.split(":")[1])
    const [min, max] = [2020,2030]
    return (year >= min && year <= max)
}
const validateHgt = str => {
    const [min, max] = [150, 193]
    const mod = 2.54
    const [height, unit] = str.split(":")[1].match(/(\d+)|(\w+)/gi)
    if(unit === "in") {
        const converted = Math.ceil(height * mod)
        return (converted >= min && converted <= max)
    } else {
        return (height >= min && height <= max)
    }
}
const validateHcl = str => {
    const color = str.split(":")[1]
    const hexRegex = /^#[0-9A-f]{6}$/i
    return hexRegex.test(color)
}
const validateEcl = str => {
    const validColors = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"]
    const color = str.split(":")[1]
    return validColors.includes(color)
}
const validatePid = str => {
    const pid = str.split(":")[1]
    const pidRegex = /^[0-9]{9}$/gi
    return pidRegex.test(pid)
}


async function partTwo(){
    const data = await readFile("dayFour-input.txt")
    const passportsRaw = formatData(data)

    const validPassports = passportsRaw.map(pport => {
        const fields = pport.match(validFieldsRegex)
        
        return fields.filter(field =>{
            if (field.startsWith("byr")) return validateByr(field)
            if (field.startsWith("iyr")) return validateIyr(field)
            if (field.startsWith("eyr")) return validateEyr(field)
            if (field.startsWith("ecl")) return validateEcl(field)
            if (field.startsWith("hcl")) return validateHcl(field)
            if (field.startsWith("hgt")) return validateHgt(field)
            if (field.startsWith("pid")) return validatePid(field)
        }).length
    }).filter(passport => passport === 7).length

    return validPassports
}

partTwo()//?