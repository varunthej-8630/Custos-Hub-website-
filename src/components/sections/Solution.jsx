const steps = [
  { icon: '🎥', label: 'Detection', color: '#00C8FF', glow: 'rgba(0,200,255,0.3)' },
  { icon: '🧠', label: 'Analysis', color: '#0057FF', glow: 'rgba(0,87,255,0.3)' },
  { icon: '🛡', label: 'Decision', color: '#ffffff', glow: 'rgba(255,255,255,0.2)' },
  { icon: '🔔', label: 'Action', color: '#FF3B30', glow: 'rgba(255,59,48,0.4)' },
]

const features = [
  'Real-time AI surveillance', 'Facial recognition',
  'Behaviour analysis', 'Threat prediction',
  'Autonomous escalation', 'Offline-first intelligence',
  'Multi-protocol communication', 'Edge processing — no cloud dependency',
]

export default function Solution() {
  return (
    <section className="section-wrapper" style={{ background: 'transparent', padding: '120px 0' }}>
      <div className="section">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '72px' }}>
          <div className="reveal" style={{ marginBottom: '20px' }}>
            <div className="label-pill">THE CUSTOS SYSTEM</div>
          </div>
          <h2 className="reveal" style={{
            fontFamily: 'Kanit, sans-serif', fontWeight: 800,
            fontSize: 'clamp(30px, 4.5vw, 52px)', color: '#fff', marginBottom: '16px', letterSpacing: '1px'
          }}>
            Meet Custos. Your Autonomous AI Guard.
          </h2>
          <p className="reveal" style={{
            fontFamily: 'DM Sans', fontSize: '16px',
            color: 'rgba(255,255,255,0.5)', maxWidth: '500px', margin: '0 auto'
          }}>
            Custos doesn't just watch. It detects, thinks, decides, and acts — automatically.
          </p>
        </div>

        {/* Flow diagram */}
        <div className="reveal" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: '64px', flexWrap: 'wrap', gap: '8px'
        }}>
          {steps.map((step, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
              {/* Step node */}
              <div className="glass-card" style={{
                padding: '24px',
                textAlign: 'center',
                minWidth: '120px',
                border: `1px solid ${step.glow}`,
                boxShadow: `0 0 20px ${step.glow}, inset 0 1px 0 rgba(255,255,255,0.1)`,
                position: 'relative',
              }}>
                <div style={{ fontSize: '28px', marginBottom: '10px' }}>{step.icon}</div>
                <div style={{
                  fontFamily: 'Kanit, sans-serif', fontWeight: 700,
                  fontSize: '13px', color: step.color, letterSpacing: '1px'
                }}>
                  {step.label}
                </div>
                {i === 3 && (
                  <div style={{
                    position: 'absolute', inset: -1,
                    borderRadius: '16px',
                    animation: 'glow-pulse 2s infinite',
                    pointerEvents: 'none'
                  }} />
                )}
              </div>

              {/* Arrow connector */}
              {i < steps.length - 1 && (
                <div style={{
                  position: 'relative', width: '64px', height: '2px',
                  background: `linear-gradient(90deg, ${steps[i].glow}, ${steps[i+1].glow})`,
                  flexShrink: 0,
                }}>
                  {/* Traveling dot */}
                  <div style={{
                    position: 'absolute', top: '50%',
                    width: '6px', height: '6px',
                    background: '#00C8FF', borderRadius: '50%',
                    transform: 'translateY(-50%)',
                    animation: `travel-dot-${i} 2s ${i * 0.5}s infinite linear`,
                    boxShadow: '0 0 6px #00C8FF'
                  }} />
                  <style>{`
                    @keyframes travel-dot-${i} {
                      0% { left: 0; opacity: 0; }
                      10% { opacity: 1; }
                      90% { opacity: 1; }
                      100% { left: calc(100% - 6px); opacity: 0; }
                    }
                  `}</style>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Feature list */}
        <div className="reveal" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '12px 40px',
          maxWidth: '680px',
          margin: '0 auto'
        }}>
          {features.map((f, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '10px 0',
              borderBottom: '1px solid rgba(255,255,255,0.04)'
            }}>
              <span style={{ color: '#00C8FF', fontSize: '12px' }}>✦</span>
              <span style={{
                fontFamily: 'DM Sans', fontSize: '14px',
                color: 'rgba(255,255,255,0.75)'
              }}>{f}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
