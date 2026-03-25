import { T } from './theme'

/** Rationale box below the bracket */
export default function PicksRationale({ text, accent }) {
  if (!text || text.startsWith('📝')) return null

  const lines = text.split('\n\n')

  return (
    <div style={{ marginTop: 12, padding: 14, borderRadius: 8, background: `${accent}10`, border: `1px solid ${accent}25` }}>
      <div
        style={{
          fontSize: 13,
          letterSpacing: 2,
          color: accent,
          fontWeight: 800,
          marginBottom: 8,
          fontFamily: 'monospace',
        }}
      >
        RATIONALE
      </div>

      {lines.map((line, i) => (
        <p key={i} style={{ fontSize: 15, color: '#94a3b8', lineHeight: 1.8, margin: '0 0 6px' }}>
          {line}
        </p>
      ))}
    </div>
  )
}

