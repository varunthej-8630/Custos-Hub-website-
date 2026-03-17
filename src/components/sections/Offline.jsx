// Offline.jsx
const offlineFeatures = [
  { icon: '🧠', title: 'Edge AI Processing', desc: 'All detection runs on-device. No cloud latency. No dependency.' },
  { icon: '📡', title: 'GSM Fallback', desc: 'Mobile network backup kicks in automatically if Wi-Fi fails.' },
  { icon: '🔒', title: 'Local Encrypted Storage', desc: 'Footage never leaves your premises unless you choose.' },
  { icon: '⚡', title: 'Battery Backup Ready', desc: 'Designed to survive power cuts and infrastructure failures.' },
]

export function Offline() {
  return (
    <section className="section-wrapper" id="ecosystem" style={{ padding: '120px 0', position: 'relative' }}>
      {/* Circuit board pattern */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, rgba(0,200,255,0.02) 1px, transparent 1px)',
        backgroundSize: '30px 30px',
        WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
        maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
      }} />

      <div className="section">
        <div style={{ textAlign: 'center', marginBottom: '72px' }}>
          <div className="reveal" style={{ marginBottom: '20px' }}>
            <div className="label-pill">WORKS WITHOUT INTERNET</div>
          </div>
          <h2 className="reveal gradient-text" style={{
            fontFamily: 'Kanit, sans-serif', fontWeight: 800,
            fontSize: 'clamp(26px, 4vw, 52px)', marginBottom: '16px', letterSpacing: '0.8px'
          }}>
            Your Security Shouldn't<br />Depend on Your Wi-Fi.
          </h2>
          <p className="reveal" style={{
            fontFamily: 'DM Sans', fontSize: '16px',
            color: 'rgba(255,255,255,0.5)', maxWidth: '500px', margin: '0 auto'
          }}>
            Cut the internet. Custos doesn't blink. All intelligence runs locally on the edge.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '20px'
        }}>
          {offlineFeatures.map((f, i) => (
            <div key={i} className="glass-card reveal" style={{ padding: '32px 24px', textAlign: 'center' }}>
              <div style={{ fontSize: '36px', marginBottom: '16px' }}>{f.icon}</div>
              <h3 style={{
                fontFamily: 'Kanit, sans-serif', fontSize: '17px', fontWeight: 700,
                color: '#fff', marginBottom: '10px'
              }}>{f.title}</h3>
              <p style={{
                fontFamily: 'DM Sans', fontSize: '14px',
                color: 'rgba(255,255,255,0.5)', lineHeight: 1.6
              }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Offline
