export default function RiskIntelligence() {
  const features = [
    {
      icon: '🏃',
      title: 'Behavioral Analysis',
      desc: 'Detects pacing, crouching, lingering, freezing, running, circling near protected zones.'
    },
    {
      icon: '📊',
      title: 'Risk Score 0–100',
      desc: 'Dynamic threat level updated in real-time. Safe → Caution → Critical.'
    },
    {
      icon: '✍️',
      title: 'Zone Drawing',
      desc: 'Draw custom protected areas directly on your camera feed.'
    },
    {
      icon: '🖼️',
      title: 'Evidence Gallery',
      desc: 'Every alert auto-saves a snapshot and video clip. Timestamped, downloadable.'
    },
    {
      icon: '📴',
      title: 'Camera Tamper Detection',
      desc: 'Instantly alerts if a camera is covered or obstructed.'
    },
    {
      icon: '🛡️',
      title: 'Offline-First',
      desc: 'Runs entirely on edge hardware. No cloud. No internet needed. No data leaves your premises.'
    }
  ]

  return (
    <section id="risk-intelligence" className="section-wrapper" style={{ padding: '120px 0', position: 'relative' }}>
      {/* Subtle blue/cyan ambient glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '800px', height: '600px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,200,255,0.03) 0%, transparent 70%)',
        filter: 'blur(100px)', pointerEvents: 'none', zIndex: 0
      }} />

      <div className="section" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '72px' }}>
          <div className="reveal" style={{ marginBottom: '20px' }}>
            <div className="label-pill" style={{ borderColor: 'rgba(0,200,255,0.3)', background: 'rgba(0,200,255,0.08)' }}>
              INTELLIGENCE LAYER
            </div>
          </div>
          <h2 className="reveal gradient-text" style={{
            fontFamily: 'Poppins, sans-serif', fontWeight: 800,
            fontSize: 'clamp(32px, 5vw, 56px)', marginBottom: '16px', letterSpacing: '0.5px', lineHeight: 1.15
          }}>
            The Risk Intelligence Engine
          </h2>
          <p className="reveal" style={{
            fontFamily: 'DM Sans', fontSize: '16px',
            color: 'rgba(255,255,255,0.6)', maxWidth: '520px', margin: '0 auto', lineHeight: '1.6'
          }}>
            Not just detection — understanding.
          </p>
        </div>

        {/* 3x2 Grid */}
        <div className="intelligence-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '20px',
          maxWidth: '1100px',
          margin: '0 auto'
        }}>
          {features.map((feat, i) => (
            <div
              key={i}
              className="glass-card reveal"
              style={{
                padding: '32px 28px',
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '16px',
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid rgba(255,255,255,0.05)',
                transition: 'all 0.3s ease'
              }}
            >
              {/* Feature Icon */}
              <div style={{
                fontSize: '28px',
                marginBottom: '16px',
                width: '52px',
                height: '52px',
                borderRadius: '12px',
                background: 'rgba(0,200,255,0.06)',
                border: '1px solid rgba(0,200,255,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {feat.icon}
              </div>

              {/* Title */}
              <h3 style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '18px',
                fontWeight: 600,
                color: '#fff',
                marginBottom: '10px',
                letterSpacing: '0.3px'
              }}>
                {feat.title}
              </h3>

              {/* Description */}
              <p style={{
                fontFamily: 'DM Sans',
                fontSize: '14px',
                color: 'rgba(255,255,255,0.55)',
                lineHeight: '1.6',
                margin: 0
              }}>
                {feat.desc}
              </p>

              {/* Corner Accent Glow */}
              <div style={{
                position: 'absolute', top: 0, right: 0,
                width: '45px', height: '45px',
                background: 'radial-gradient(circle at top right, rgba(0,200,255,0.08), transparent)',
                borderRadius: '0 16px 0 0'
              }} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .intelligence-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
