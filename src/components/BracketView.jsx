import BracketRegion from './BracketRegion'
import FinalFour from './FinalFour'
import PicksRationale from './PicksRationale'

/** Full bracket view for one set of picks */
export default function BracketView({ bracketData, picks }) {
  return (
    <div>
      {bracketData.regions.map((region) => (
        <BracketRegion key={region.key} region={region} picks={picks} accent={picks.accent} />
      ))}
      <FinalFour
        picks={picks}
        accent={picks.accent}
        year={bracketData.year}
        gender={bracketData.gender}
      />
      <PicksRationale text={picks.rationale} accent={picks.accent} />
    </div>
  )
}

