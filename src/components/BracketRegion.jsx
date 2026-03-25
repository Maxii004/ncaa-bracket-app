import Matchup from './Matchup'
import RoundLabel from './RoundLabel'

/** One full region — R64 → R32 → S16 → E8 → F4 bubble */
export default function BracketRegion({ region, picks, accent }) {
  const rp = picks?.[region.key]
  if (!rp) return null

  return (
    <div style={{ marginBottom: 16 }}>
      {/* Region label */}
      <div
        style={{
          fontSize: 13,
          letterSpacing: 3,
          fontWeight: 800,
          fontFamily: 'monospace',
          color: region.color,
          marginBottom: 8,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: region.color,
            display: 'inline-block',
          }}
        />
        {region.name}
      </div>

      <div
        style={{
          display: 'flex',
          gap: 6,
          alignItems: 'flex-start',
          overflowX: 'auto',
          paddingBottom: 4,
        }}
      >
        {/* R64 */}
        <div>
          <RoundLabel>R64</RoundLabel>
          {region.matchups.map((m, i) => (
            <Matchup key={i} top={m.top} bot={m.bot} winner={rp.r32[i]} accent={accent} />
          ))}
        </div>

        {/* R32 */}
        <div>
          <RoundLabel>R32</RoundLabel>
          {[
            [0, 1],
            [2, 3],
            [4, 5],
            [6, 7],
          ].map(([a, b], i) => (
            <Matchup
              key={i}
              top={{ seed: ' ', team: rp.r32[a] }}
              bot={{ seed: ' ', team: rp.r32[b] }}
              winner={rp.s16[i]}
              accent={accent}
            />
          ))}
        </div>

        {/* S16 */}
        <div>
          <RoundLabel>S16</RoundLabel>
          {[
            [0, 1],
            [2, 3],
          ].map(([a, b], i) => (
            <Matchup
              key={i}
              top={{ seed: ' ', team: rp.s16[a] }}
              bot={{ seed: ' ', team: rp.s16[b] }}
              winner={rp.e8[i]}
              accent={accent}
            />
          ))}
        </div>

        {/* E8 */}
        <div>
          <RoundLabel>E8</RoundLabel>
          <Matchup top={{ seed: ' ', team: rp.e8[0] }} bot={{ seed: ' ', team: rp.e8[1] }} winner={rp.f4} accent={accent} />
        </div>

        {/* F4 bubble */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              padding: '6px 10px',
              borderRadius: 6,
              background: `${accent}20`,
              border: `2px solid ${accent}`,
              fontSize: 14,
              fontWeight: 800,
              color: accent,
              whiteSpace: 'nowrap',
            }}
          >
            → {rp.f4}
          </div>
        </div>
      </div>
    </div>
  )
}

