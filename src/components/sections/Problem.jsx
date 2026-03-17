export default function Problem() {
  const cards = [
    { icon: '⬛', title: 'Passive Recording', desc: 'Your CCTV watches crime happen. It never raises an alarm.', span: 2 },
    { icon: '📡', title: 'Internet Dependent', desc: 'Cut the Wi-Fi and your entire security system goes dark.', span: 1 },
    { icon: '👁', title: 'No Intelligence', desc: 'A camera sees everything. It understands nothing.', span: 1 },
    { icon: '⏱', title: 'Delayed Alerts', desc: 'By the time you know something happened, it already did.', span: 2 },
    { icon: '📌', title: 'Fixed Angles', desc: 'Blind spots everywhere. Criminals know where cameras point.', span: 1 },
    { icon: '🚨', title: 'No Escalation', desc: 'If you don\'t respond, nothing happens. No backup. No action.', span: 1 },
  ]

  return (
    <section id="problem" className="section-wrapper" style={{ padding: '120px 0', position: 'relative', background: 'transparent' }}>
      {/* Danger blob */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '700px', height: '700px', borderRadius: '50%',
        background: 'rgba(255,59,48,0.04)',
        filter: 'blur(120px)', pointerEvents: 'none'
      }} />

      <div className="section">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div className="reveal" style={{ marginBottom: '20px' }}>
            <div className="label-pill" style={{ borderColor: 'rgba(255,59,48,0.3)', background: 'rgba(255,59,48,0.08)' }}>
              THE PROBLEM
            </div>
          </div>
          <h2 className="reveal gradient-text" style={{
            fontFamily: 'Syne, sans-serif', fontWeight: 800,
            fontSize: 'clamp(32px, 5vw, 52px)', marginBottom: '16px'
          }}>
            Security Systems Are Still Blind.
          </h2>
          <p className="reveal" style={{
            fontFamily: 'DM Sans', fontSize: '16px',
            color: 'rgba(255,255,255,0.5)', maxWidth: '500px', margin: '0 auto'
          }}>
            Ordinary cameras record crime. They don't prevent it.
          </p>
        </div>

        {/* Card grid */}
        <div className="problem-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
        }}>
          {cards.map((card, i) => (
            <div
              key={i}
              className="glass-card reveal"
              style={{
                gridColumn: `span ${card.span}`,
                padding: '28px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Subtle red tint on hover handled via CSS */}
              <div style={{ fontSize: '28px', marginBottom: '12px' }}>{card.icon}</div>
              <h3 style={{
                fontFamily: 'Syne, sans-serif',
                fontSize: '18px', fontWeight: 700,
                marginBottom: '8px', color: '#fff'
              }}>
                {card.title}
              </h3>
              <p style={{
                fontFamily: 'DM Sans', fontSize: '14px',
                color: 'rgba(255,255,255,0.5)', lineHeight: 1.6
              }}>
                {card.desc}
              </p>

              {/* Corner accent */}
              <div style={{
                position: 'absolute', top: 0, right: 0,
                width: '60px', height: '60px',
                background: 'radial-gradient(circle at top right, rgba(255,59,48,0.08), transparent)',
                borderRadius: '0 16px 0 0'
              }} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .problem-grid > div { grid-column: span 1 !important; }
        }
      `}</style>
    </section>
  )
}