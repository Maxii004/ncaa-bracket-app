import SeedBadge from './SeedBadge'

/** Single team row inside a matchup */
export default function TeamRow({ seed, team, isWinner, accent, onClick }) {
  const clickable = Boolean(onClick)

  return (
    <div
      onClick={clickable ? onClick : undefined}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        padding: '4px 8px',
        borderRadius: 5,
        marginBottom: 2,
        background: isWinner ? `${accent}28` : '#ffffff07',
        border: `1px solid ${isWinner ? `${accent}99` : '#ffffff0f'}`,
        cursor: clickable ? 'pointer' : 'default',
        transition: 'all 0.12s',
        minWidth: 155,
      }}
    >
      {typeof seed === 'number' ? (
        <SeedBadge seed={seed} />
      ) : (
        <span style={{ width: 18, flexShrink: 0 }} />
      )}

      <span
        style={{
          fontSize: 10,
          fontWeight: isWinner ? 700 : 400,
          color: isWinner ? accent : '#9ca3af',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          maxWidth: 110,
        }}
      >
        {team}
      </span>

      {isWinner && (
        <span style={{ marginLeft: 'auto', fontSize: 9, color: accent, flexShrink: 0 }}>
          ✓
        </span>
      )}
    </div>
  )
}

