import { readFile, readFileRaw } from '../util/fileReader'
import { sumArray } from '../util/lib'

const params ={
    day: 16,file: "input.txt"
};

const parseTickets = (ticketsData) => ticketsData.match(/\d+/g).map(Number)

async function partOne(args){
    const data = await readFile(args.day, args.file)
    const [rulesRaw,,ticketsRaw] = data.map(row => (row === "") ? "|" : row.concat(" ")).join("").split("|")
    const rules = parseRules(rulesRaw)
    const fields = parseTickets(ticketsRaw)
    const total = fields.filter(field => !rules.has(field))
    return sumArray(total)
}

function parseRules(rulesData){
    const values = rulesData.match(/\d+-\d+/g).reduce( (acc, val) => {
        let [min, max] = val.split('-').map(Number)
        for(let i = min; i <= max; i++){
            acc.add(i)
        }
        return acc
    }, new Set())
   
    return values
}

async function partTwo(args){
    const data = await readFileRaw(args.day, args.file)
    // Have to use \r\n\r\n because...Windows https://stackoverflow.com/questions/20056306/match-linebreaks-n-or-r-n
    const [fields, myTicket, nearbyTickets] = data.split('\r\n\r\n')
    const myTicketValues = myTicket.split('\n')[1].split(',').map(Number)
    const allValidFields = new Set()
    const allFieldNames = []
    const validFields = fields.split('\n').map(field => {
      let [name, ranges] = field.split(':');

      allFieldNames.push(name)

      return ranges.match(/\d+-\d+/g).reduce((a, v) => {
        let [min, max] = v.split('-').map(Number);
        for (let i = min; i <= max; i++) {
          a.add(i);
          allValidFields.add(i);
        }
        return a;
      }, new Set())
    })
    
    const tickets = nearbyTickets.split('\n').slice(1).map(t => t.split(',').map(Number)).filter(ticket => ticket.every(field => allValidFields.has(field)))
    
    let entries = [];
    for (let entry = 0; entry < tickets[0].length; entry++) {
      let possibleEntries = new Set(allFieldNames);
      for (let ticket = 0; ticket < tickets.length; ticket++) {
        validFields.forEach((field,i) => {
          if (!field.has(tickets[ticket][entry])) possibleEntries.delete(allFieldNames[i]);
        })
      }
      entries.push(possibleEntries)
    }
    
    let found = []
    let amtFound = 0;
    while (amtFound < allFieldNames.length) {
      entries.forEach((options, i) => {
        if (options.size === 1) {
          let fieldName = options.values().next().value;
          entries.forEach(allOptions => { allOptions.delete(fieldName) });
          found[i] = fieldName;
          amtFound++;
        }
      })
    }
    return found.reduce( (a,v,i) => (v.split(' ').shift() === 'departure') ? a * myTicketValues[i] : a,1)
}

partOne(params)
partTwo(params)//?