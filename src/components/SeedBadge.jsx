/** Coloured seed number pill */
export default function SeedBadge({ seed }) {
  const bg =
    seed === 1 ? '#fbbf24' : seed === 2 ? '#9ca3af' : seed === 3 ? '#b45309' : '#1f2937'
  const fg = seed <= 3 ? '#000' : '#94a3b8'

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 18,
        height: 18,
        borderRadius: 4,
        flexShrink: 0,
        background: bg,
        color: fg,
        fontSize: 9,
        fontWeight: 800,
        fontFamily: 'monospace',
      }}
    >
      {seed}
    </span>
  )
}

