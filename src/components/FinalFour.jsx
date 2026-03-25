import { T } from './theme'
import Arrow from './Arrow'
import mensFinalFour2026 from '../assets/Mens-Final-Four-2026.png'
import womensFinalFour2026 from '../assets/Womens-Final-Four-2026.png'
  
const logoDimensions = {
  2026: {
    mens: {
      width: 'auto',
      height: 200,
    },
    womens: {
      width: 'auto',
      height: 150,
    },
  }
}

/** Final Four + champion display */
export default function FinalFour({ picks, accent, year, gender }) {
  const { finalFour: ff, final, champion } = picks

  const finalFourBanner =
    year === 2026 && gender === 'mens'
      ? mensFinalFour2026
      : year === 2026 && gender === 'womens'
        ? womensFinalFour2026
        : null

  return (
    <div
      style={{
        marginTop: 10,
        padding: 16,
        borderRadius: 10,
        background: '#ffffff05',
        border: `1px solid ${accent}30`,
      }}
    >
      <div
        style={{
          fontSize: 13,
          letterSpacing: 3,
          color: accent,
          fontWeight: 800,
          marginBottom: 12,
          fontFamily: 'monospace',
        }}
      >
        FINAL FOUR → CHAMPION
      </div>

      <div
        style={{
          display: 'flex',
          // justifyContent: 'space-between',
          
          alignItems: 'center',
          gap: 12,
          flexWrap: 'wrap',
        }}
      >

      {/* Logo on the right */}
      {finalFourBanner && (
        <div style={{ flex: '0 0 auto', display: 'flex', justifyContent: 'flex-end' }}>
          <img
            src={finalFourBanner}
            alt={`${year} ${gender} Final Four`}
            style={{
              display: 'block',
              width: logoDimensions[year][gender].width,
              height: logoDimensions[year][gender].height,
              borderRadius: 8,
            }}
          />
        </div>
      )}
        {/* Final Four bracket stays on the left */}
        <div style={{ flex: '1 1 520px' }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            {/* Semis */}
            <div>
              <div
                style={{
                  fontSize: 12,
                  color: T.muted,
                  fontFamily: 'monospace',
                  marginBottom: 4,
                }}
              >
                SEMIS
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {[
                  [ff.sf1, ff.sf4],
                  [ff.sf2, ff.sf3],
                ].map(([a, b], i) => (
                  <div
                    key={i}
                    style={{
                      padding: '5px 12px',
                      borderRadius: 5,
                      background: '#ffffff08',
                      border: `1px solid ${accent}40`,
                      fontSize: 15,
                      fontWeight: 700,
                      color: T.text,
                    }}
                  >
                    {a} <span style={{ color: T.muted, fontWeight: 400 }}>vs</span> {b}
                  </div>
                ))}
              </div>
            </div>

            <Arrow accent={accent} />

            {/* Final */}
            <div>
              <div
                style={{
                  fontSize: 12,
                  color: T.muted,
                  fontFamily: 'monospace',
                  marginBottom: 4,
                }}
              >
                FINAL
              </div>
              <div
                style={{
                  padding: '6px 14px',
                  borderRadius: 6,
                  background: `${accent}20`,
                  border: `1px solid ${accent}`,
                  fontSize: 16,
                  fontWeight: 700,
                  color: accent,
                }}
              >
                {final.team1} <span style={{ color: T.muted, fontWeight: 400 }}>vs</span> {final.team2}
              </div>
            </div>

            <Arrow accent={accent} />

            {/* Champion */}
            <div>
              <div
                style={{
                  fontSize: 12,
                  color: T.muted,
                  fontFamily: 'monospace',
                  marginBottom: 4,
                }}
              >
                🏆 CHAMPION
              </div>
              <div
                style={{
                  padding: '8px 18px',
                  borderRadius: 7,
                  background: accent,
                  fontSize: 18,
                  fontWeight: 900,
                  color: '#000',
                  letterSpacing: 0.5,
                }}
              >
                {champion}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

