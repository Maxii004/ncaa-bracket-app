# 🏀 NCAA Bracket Tracker — React App

An interactive bracket comparison tool for the NCAA Men's and Women's Tournaments. Compare three perspectives side by side — your own picks, Claude's gut analysis, and a pure data model — across any year the bracket data is available.

Built as part of a sports analytics portfolio project. The app is fully data-driven: adding a new year requires only dropping in new JSON files. No component code changes needed.

---

## Live Demo

> Deploy to Vercel or Netlify in under 2 minutes — see [Deployment](#deployment) below.

---

## Features

- **Year → Gender → Bracket** tab navigation
- **Three brackets per tournament** — Mineth's picks, Claude's picks, Data model picks
- **Full bracket display** — R64 through to champion, all four regions
- **Rationale panel** — analytical reasoning displayed beneath each bracket
- **Zero-code year updates** — just add new JSON files under `data/`
- Fully componentised architecture — every UI element is its own reusable component

---

## Quickstart

```bash
# Clone
git clone https://github.com/your-username/ncaa-bracket-app.git
cd ncaa-bracket-app

# Install & run (uses Vite or Create React App)
npm install
npm run dev
```

---

## Project Structure

```
ncaa-bracket-app/
│
├── src/
│   ├── components/
│   │   ├── SeedBadge.jsx       ← Coloured seed number pill
│   │   ├── TeamRow.jsx         ← Single team line (seed + name + winner tick)
│   │   ├── Matchup.jsx         ← Two TeamRows = one game
│   │   ├── BracketRegion.jsx   ← Full region: R64 → R32 → S16 → E8 → F4
│   │   ├── FinalFour.jsx       ← Semis, final, champion display
│   │   ├── PicksRationale.jsx  ← Rationale text box beneath bracket
│   │   ├── BracketView.jsx     ← Assembles all regions + Final Four
│   │   └── TabBar.jsx          ← Reusable tab navigation component
│   │
│   ├── data/
│   │   └── 2026/
│   │       ├── mens/
│   │       │   ├── bracket.json       ← 64-team bracket matchups
│   │       │   ├── picks_mineth.json  ← Your picks
│   │       │   ├── picks_claude.json  ← Claude's picks
│   │       │   └── picks_data.json    ← Data model picks
│   │       └── womens/
│   │           ├── bracket.json
│   │           ├── picks_mineth.json
│   │           ├── picks_claude.json
│   │           └── picks_data.json
│   │
│   └── App.jsx                 ← Root — drives year/gender/bracket tabs
│
├── public/
└── package.json
```

---

## Data Schema

### bracket.json

Defines the 64-team field for one tournament.

```json
{
  "year": 2026,
  "gender": "mens",
  "regions": [
    {
      "key": "east",
      "name": "EAST",
      "color": "#e94560",
      "matchups": [
        { "top": { "seed": 1, "team": "Duke" }, "bot": { "seed": 16, "team": "Siena" } }
      ]
    }
  ]
}
```

| Field | Type | Description |
|-------|------|-------------|
| `key` | string | Unique region identifier — used to link bracket.json to picks files |
| `name` | string | Display name shown in the UI |
| `color` | hex string | Accent colour for this region's labels and highlights |
| `matchups` | array | 8 matchups per region, ordered 1v16, 8v9, 5v12, 4v13, 6v11, 3v14, 7v10, 2v15 |

### picks_[name].json

Defines one set of bracket predictions.

```json
{
  "label": "MINETH'S BRACKET",
  "accent": "#a855f7",
  "sub": "My picks",
  "east": {
    "r32": ["Duke", "TCU", "St. John's", "Kansas", "Louisville", "Michigan State", "UCLA", "UConn"],
    "s16": ["Duke", "Kansas", "Michigan State", "UConn"],
    "e8":  ["Duke", "UConn"],
    "f4":  "Duke"
  },
  "west":    { "r32": [...], "s16": [...], "e8": [...], "f4": "..." },
  "midwest": { "r32": [...], "s16": [...], "e8": [...], "f4": "..." },
  "south":   { "r32": [...], "s16": [...], "e8": [...], "f4": "..." },
  "finalFour": { "sf1": "Duke", "sf2": "Arizona", "sf3": "Michigan", "sf4": "Houston" },
  "final":    { "team1": "Duke", "team2": "Michigan" },
  "champion": "Duke",
  "rationale": "Your reasoning here. Use \\n\\n to separate paragraphs."
}
```

**r32 array order:** matches the bracket.json matchups order exactly — index 0 = winner of game 1 (1v16), index 1 = winner of game 2 (8v9), etc.

**finalFour:** sf1 = winner of region 1, sf2 = winner of region 2, sf3 = winner of region 3, sf4 = winner of region 4. sf1 plays sf4, sf2 plays sf3.

---

## Adding a New Year

**Step 1 — Create the bracket file:**

```
src/data/2027/mens/bracket.json
src/data/2027/womens/bracket.json
```

Use the schema above. Include all 4 regions with 8 matchups each.

**Step 2 — Create the picks files:**

```
src/data/2027/mens/picks_mineth.json
src/data/2027/mens/picks_claude.json
src/data/2027/mens/picks_data.json
```

Same for womens/.

**Step 3 — Register the data in App.jsx:**

In `App.jsx`, add the new year's data to the `DATA` object:

```js
import bracket2027Mens   from "./data/2027/mens/bracket.json";
import picksClaude2027M  from "./data/2027/mens/picks_claude.json";
// ... etc

const DATA = {
  "2026": { /* existing */ },
  "2027": {
    mens:   { bracket: bracket2027Mens,   picks: { claude: picksClaude2027M, ... } },
    womens: { bracket: bracket2027Womens, picks: { ... } }
  }
};
```

The year tab appears automatically. No other code changes needed.

---

## Component Reference

### `<SeedBadge seed={1} />`
Renders a coloured pill with the seed number. Gold for 1-seed, silver for 2, bronze for 3, dark for all others.

### `<TeamRow seed={1} team="Duke" isWinner={true} accent="#e94560" onClick={fn} />`
Single team row. Highlights in accent colour when `isWinner` is true. Calls `onClick` with the team name when clicked (used for interactive brackets).

### `<Matchup top={...} bot={...} winner="Duke" accent="#e94560" onPick={fn} />`
Two TeamRows forming one game. Pass `onPick` to make it interactive.

### `<BracketRegion region={regionObj} picks={picksObj} accent="#e94560" />`
Full region display from R64 through to the Final Four bubble. Reads from `picks[region.key]`.

### `<FinalFour picks={picksObj} accent="#e94560" />`
Displays the four semi-finalists, the final matchup, and the champion tile.

### `<PicksRationale text="..." accent="#e94560" />`
Renders the rationale text below the bracket. Paragraphs separated by `\n\n`. Hidden if text starts with `📝` (placeholder).

### `<BracketView bracketData={bracket} picks={picks} />`
Assembles BracketRegion × 4 + FinalFour + PicksRationale into one complete bracket view.

### `<TabBar options={[{key, label, accent}]} active="east" onSelect={fn} size="md" />`
Reusable tab bar. `size="sm"` for the inner bracket selector, `size="md"` for year/gender tabs.

---

## Deployment

### Vercel (recommended — free)

```bash
npm install -g vercel
vercel
```

Follow the prompts. Vercel auto-detects React/Vite. Your app is live in ~90 seconds.

### Netlify

```bash
npm run build
# Drag the dist/ folder to netlify.com/drop
```

---

## Tech Stack

- React 18
- No external UI libraries — all styles are inline CSS-in-JS
- No state management library — pure `useState`
- Tailwind-free by design — keeps the bundle minimal and portable

---

## Companion Repository

This app is paired with the **NCAA Bracket Analysis** Python repo, which generates the efficiency data and picks that feed into the JSON files here.

→ [ncaa-bracket-analysis](https://github.com/your-username/ncaa-bracket-analysis)

---

## Licence

MIT — free to use, fork, and build on.