import { T } from './theme'

export default function TabBar({ options, active, onSelect, size = 'md' }) {
  const pad = size === 'sm' ? '6px 14px' : '9px 20px'
  const fs = size === 'sm' ? 10 : 11

  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {options.map(({ key, label, accent }) => {
        const isActive = active === key
        return (
          <button
            key={key}
            onClick={() => onSelect(key)}
            style={{
              padding: pad,
              border: 'none',
              cursor: 'pointer',
              background: isActive ? (accent || '#f1f5f9') : 'transparent',
              color: isActive ? (accent ? '#000' : '#000') : T.muted,
              fontWeight: isActive ? 800 : 500,
              fontSize: fs,
              letterSpacing: 1,
              borderTopLeftRadius: 7,
              borderTopRightRadius: 7,
              transition: 'all 0.15s',
              fontFamily: 'monospace',
            }}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}

