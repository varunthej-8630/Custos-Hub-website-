// FinalCTA.jsx
export function FinalCTA() {
  return (
    <section className="section-wrapper" style={{ padding: '160px 0', position: 'relative', textAlign: 'center' }}>
      {/* Cyan radial glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '700px', height: '500px', borderRadius: '50%',
        background: 'rgba(0,200,255,0.06)',
        filter: 'blur(100px)', pointerEvents: 'none'
      }} />

      <div className="section" style={{ position: 'relative', zIndex: 1 }}>
        <div className="reveal" style={{ marginBottom: '28px' }}>
          <div className="label-pill">REQUEST ACCESS</div>
        </div>

        <h2 className="reveal" style={{
          fontFamily: 'Kanit, sans-serif', fontWeight: 800,
          fontSize: 'clamp(32px, 5.5vw, 60px)',
          color: '#fff', marginBottom: '8px', lineHeight: 1.1, letterSpacing: '0.8px'
        }}>
          Security should not just record crime.
        </h2>
        <h2 className="reveal gradient-text" style={{
          fontFamily: 'Kanit, sans-serif', fontWeight: 800,
          fontSize: 'clamp(32px, 5.5vw, 60px)',
          marginBottom: '28px', lineHeight: 1.1, letterSpacing: '0.8px'
        }}>
          It should prevent it.
        </h2>

        <p className="reveal" style={{
          fontFamily: 'DM Sans', fontSize: '17px',
          color: 'rgba(255,255,255,0.5)', maxWidth: '540px',
          margin: '0 auto 48px', lineHeight: 1.7
        }}>
          Custos is building the future of autonomous security intelligence — from homes to nations.
        </p>

        <div className="reveal">
          <a
            href="https://wa.me/917416636417?text=Hi%2C%20I%27d%20like%20to%20request%20early%20access%20to%20Custos!"
            target="_blank" rel="noopener noreferrer"
            className="btn-primary"
            style={{
              display: 'inline-block',
              textDecoration: 'none',
              borderRadius: '100px',
              padding: '18px 48px',
              fontSize: '16px', fontWeight: 600,
              boxShadow: '0 0 60px rgba(255,255,255,0.12), 0 20px 40px rgba(0,0,0,0.4)'
            }}
          >
            Request Early Access
          </a>
        </div>

        <p className="reveal" style={{
          fontFamily: 'DM Sans', fontSize: '12px',
          color: 'rgba(255,255,255,0.2)', marginTop: '32px',
          fontStyle: 'italic'
        }}>
          Built on a true story. Designed for every family that deserved better protection.
        </p>
      </div>
    </section>
  )
}

export default FinalCTA
