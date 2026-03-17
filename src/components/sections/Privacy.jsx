// Privacy.jsx
const privacyCards = [
  { icon: '🔒', title: 'Local Edge Processing', desc: 'Footage is analyzed on-device. Nothing leaves without your explicit permission.' },
  { icon: '🔑', title: 'End-to-End Encrypted', desc: 'All data in transit and at rest is fully encrypted. Always.' },
  { icon: '👤', title: 'User-Controlled Face Data', desc: 'You choose who gets stored. Delete any profile at any time.' },
  { icon: '☁️', title: 'Hybrid Storage Choice', desc: 'Store locally, on cloud, or both. You decide. We don\'t.' },
]

export function Privacy() {
  return (
    <section className="section-wrapper" style={{ padding: '120px 0' }}>
      <div className="section">
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div className="reveal" style={{ marginBottom: '20px' }}>
            <div className="label-pill">PRIVACY BY DESIGN</div>
          </div>
          <h2 className="reveal" style={{
            fontFamily: 'Crimson Text, serif', fontWeight: 700,
            fontSize: 'clamp(32px, 4.5vw, 56px)', color: '#fff', letterSpacing: '3px', lineHeight: 1.15
          }}>
            Your Data Stays Yours.
          </h2>
        </div>
        <div className="privacy-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '20px'
        }}>
          {privacyCards.map((card, i) => (
            <div key={i} className="glass-card reveal" style={{ padding: '28px' }}>
              <div style={{ fontSize: '28px', marginBottom: '12px' }}>{card.icon}</div>
              <h3 style={{
                fontFamily: 'Syne, sans-serif', fontSize: '17px', fontWeight: 700,
                color: '#fff', marginBottom: '8px'
              }}>{card.title}</h3>
              <p style={{
                fontFamily: 'DM Sans', fontSize: '14px',
                color: 'rgba(255,255,255,0.5)', lineHeight: 1.6
              }}>{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Privacy