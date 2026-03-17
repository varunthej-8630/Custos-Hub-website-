const metrics = [
  { value: '< 200ms', label: 'Detection Response Time' },
  { value: '100%', label: 'Offline Capable' },
  { value: '6+', label: 'Threat Detection Categories' },
]

export default function Metrics() {
  return (
    <div style={{
      borderTop: '1px solid rgba(255,255,255,0.06)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      background: 'rgba(255,255,255,0.02)',
      backdropFilter: 'blur(12px)',
    }}>
      <div style={{
        maxWidth: '1200px', margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
      }}>
        {metrics.map((m, i) => (
          <div key={i} className="reveal" style={{
            padding: '56px 40px', textAlign: 'center',
            borderRight: i < metrics.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
          }}>
            <div className="gradient-text" style={{
              fontFamily: 'Kanit, sans-serif', fontWeight: 800,
              fontSize: 'clamp(36px, 5vw, 60px)',
              marginBottom: '8px', display: 'block'
            }}>
              {m.value}
            </div>
            <div style={{
              fontFamily: 'DM Sans', fontSize: '14px',
              color: 'rgba(255,255,255,0.5)',
            }}>
              {m.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
