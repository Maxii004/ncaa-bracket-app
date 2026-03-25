import { T } from './theme'

export default function RoundLabel({ children }) {
  return (
    <div
      style={{
        fontSize: 12,
        color: T.muted,
        marginBottom: 4,
        fontFamily: 'monospace',
        letterSpacing: 1,
      }}
    >
      {children}
    </div>
  )
}

