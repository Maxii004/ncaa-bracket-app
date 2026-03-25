import TeamRow from './TeamRow'

/** One game = two TeamRows */
export default function Matchup({ top, bot, winner, accent, onPick }) {
  const topOnClick = onPick ? () => onPick(top.team) : undefined
  const botOnClick = onPick ? () => onPick(bot.team) : undefined

  return (
    <div style={{ marginBottom: 4 }}>
      <TeamRow {...top} isWinner={winner === top.team} accent={accent} onClick={topOnClick} />
      <TeamRow {...bot} isWinner={winner === bot.team} accent={accent} onClick={botOnClick} />
    </div>
  )
}

