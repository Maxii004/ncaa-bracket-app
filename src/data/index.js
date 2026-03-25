// Loads bracket data from JSON docs under `src/data/<year>/{mens,womens}/...`.
// Add a new year by dropping the corresponding JSON files into that folder.

const mensBracketDocs = import.meta.glob('./*/mens/bracket.json', { eager: true, import: 'default' })
const womensBracketDocs = import.meta.glob('./*/womens/bracket.json', { eager: true, import: 'default' })
const mensPicksDocs = import.meta.glob('./*/mens/picks.json', { eager: true, import: 'default' })
const womensPicksDocs = import.meta.glob('./*/womens/picks.json', { eager: true, import: 'default' })

function extractYearFromPath(path) {
  const match = path.match(/\.\/(\d+)\/(mens|womens)\//)
  return match?.[1]
}

const years = new Set([
  ...Object.keys(mensBracketDocs).map(extractYearFromPath),
  ...Object.keys(womensBracketDocs).map(extractYearFromPath),
  ...Object.keys(mensPicksDocs).map(extractYearFromPath),
  ...Object.keys(womensPicksDocs).map(extractYearFromPath),
])

const DATA = {}

for (const year of years) {
  if (!year) continue

  const mensBracketKey = `./${year}/mens/bracket.json`
  const womensBracketKey = `./${year}/womens/bracket.json`
  const mensPicksKey = `./${year}/mens/picks.json`
  const womensPicksKey = `./${year}/womens/picks.json`

  const mensBracket = mensBracketDocs[mensBracketKey]
  const womensBracket = womensBracketDocs[womensBracketKey]
  const mensPicks = mensPicksDocs[mensPicksKey]
  const womensPicks = womensPicksDocs[womensPicksKey]

  DATA[year] = {
    mens: mensBracket && mensPicks ? { bracket: mensBracket, picks: mensPicks } : undefined,
    womens: womensBracket && womensPicks ? { bracket: womensBracket, picks: womensPicks } : undefined,
  }
}

export default DATA

