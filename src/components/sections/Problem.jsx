export default function Problem() {
  const cards = [
    {
      icon: '📹',
      title: 'Existing CCTV is dumb',
      desc: "You have cameras. They record. That's it. They don't think, don't alert, don't understand what they're seeing.",
      span: 1
    },
    {
      icon: '💸',
      title: 'Smart cameras cost a fortune',
      desc: "Replacing your entire CCTV setup with smart cameras costs ₹50,000–₹3,00,000. Most homes, factories, and schools can't afford that.",
      span: 1
    },
    {
      icon: '🌉',
      title: 'Custos bridges the gap',
      desc: "Custos plugs into your existing cameras and DVR. Your old hardware becomes intelligent — detecting threats, scoring risk, and alerting you instantly. No new cameras needed.",
      span: 1
    },
  ]

  return (
    <section id="problem" className="section-wrapper" style={{ padding: '120px 0', position: 'relative', background: 'transparent' }}>
      {/* Danger blob */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '700px', height: '700px', borderRadius: '50%',
        background: 'rgba(255,59,48,0.03)',
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
            fontFamily: 'Crimson Text, serif', fontWeight: 700,
            fontSize: 'clamp(36px, 5.5vw, 60px)', marginBottom: '16px', letterSpacing: '2px', lineHeight: 1.15
          }}>
            The Problem We Solve
          </h2>
          <p className="reveal" style={{
            fontFamily: 'DM Sans', fontSize: '16px',
            color: 'rgba(255,255,255,0.5)', maxWidth: '500px', margin: '0 auto'
          }}>
            Ordinary cameras record crime. They don't prevent it. Custos changes that.
          </p>
        </div>

        {/* Card grid */}
        <div className="problem-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
        }}>
          {cards.map((card, i) => (
            <div
              key={i}
              className="glass-card reveal"
              style={{
                padding: '36px 28px',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '16px'
              }}
            >
              {/* Icon and content */}
              <div style={{ fontSize: '32px', marginBottom: '20px' }}>{card.icon}</div>
              <h3 style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '20px', fontWeight: 700,
                marginBottom: '12px', color: '#fff',
                letterSpacing: '0.5px'
              }}>
                {card.title}
              </h3>
              <p style={{
                fontFamily: 'DM Sans', fontSize: '14.5px',
                color: 'rgba(255,255,255,0.7)', lineHeight: 1.65,
                margin: 0
              }}>
                {card.desc}
              </p>

              {/* Corner accent */}
              <div style={{
                position: 'absolute', top: 0, right: 0,
                width: '60px', height: '60px',
                background: 'radial-gradient(circle at top right, rgba(255,59,48,0.06), transparent)',
                borderRadius: '0 16px 0 0'
              }} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .problem-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}