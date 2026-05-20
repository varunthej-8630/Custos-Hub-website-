const founderStory = `My name is Varun Thej. I'm a student from Mysuru building Custos alone — from idea to code to hardware.

I started because I saw a gap: millions of families in India have CCTV cameras that do nothing except record. The smart alternatives cost more than most people earn in a month.

Custos is my answer. Retrofit, not replace. Intelligence, not just recording. Offline-first, because not everyone has reliable internet. WhatsApp alerts, because that's how India communicates.

This is Phase 1. The ecosystem is growing — module by module, sector by sector, from homes to nations.`

const disciplines = ['Electronics & Communication', 'Edge AI', 'Embedded Systems', 'Computer Vision']
const projects = [
  { icon: '⬛', name: 'FPGA-Based AI Surveillance System' },
  { icon: '🤚', name: 'Gesture Recognition AI' },
  { icon: '🌐', name: 'IoT Security Solutions' },
]

export default function Founder() {
  return (
    <section className="section-wrapper" id="founder" style={{ padding: '120px 0', position: 'relative' }}>
      {/* Cyan glow right */}
      <div style={{
        position: 'absolute', top: '50%', right: '-200px',
        transform: 'translateY(-50%)',
        width: '600px', height: '600px', borderRadius: '50%',
        background: 'rgba(0,200,255,0.04)',
        filter: 'blur(120px)', pointerEvents: 'none'
      }} />

      <div className="section">
        <div style={{ textAlign: 'center', marginBottom: '72px' }}>
          <div className="reveal" style={{ marginBottom: '20px' }}>
            <div className="label-pill">THE FOUNDER</div>
          </div>
          <h2 className="reveal gradient-text" style={{
            fontFamily: 'Crimson Text, serif', fontWeight: 700,
            fontSize: 'clamp(32px, 4.5vw, 56px)', marginBottom: '16px', letterSpacing: '2px', lineHeight: 1.15
          }}>
            Built by One Person. For Everyone.
          </h2>
        </div>

        <div className="founder-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '40px', alignItems: 'start'
        }}>
          {/* Left: Founder card */}
          <div className="reveal">
            <div className="glass-card" style={{ padding: '36px', marginBottom: '24px' }}>
              {/* Avatar placeholder */}
              <div style={{
                width: '72px', height: '72px', borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(0,200,255,0.3), rgba(0,87,255,0.2))',
                border: '2px solid rgba(0,200,255,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '28px', marginBottom: '16px'
              }}>
                👨‍💻
              </div>
              <h3 style={{
                fontFamily: 'Syne, sans-serif', fontSize: '24px', fontWeight: 800,
                color: '#fff', marginBottom: '4px'
              }}>
                Parimi Varun Thej
              </h3>
              <p style={{
                fontFamily: 'DM Sans', fontSize: '13px',
                color: 'rgba(255,255,255,0.5)', marginBottom: '20px'
              }}>
                Founder & Builder — Custos
              </p>

              {/* Discipline badges */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '28px' }}>
                {disciplines.map((d, i) => (
                  <span key={i} className="tech-badge" style={{ fontSize: '11px' }}>{d}</span>
                ))}
              </div>

              {/* Projects */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                {projects.map((p, i) => (
                  <div key={i} className="glass-card" style={{
                    padding: '12px 16px',
                    display: 'flex', alignItems: 'center', gap: '12px',
                    borderRadius: '10px'
                  }}>
                    <span>{p.icon}</span>
                    <span style={{
                      fontFamily: 'DM Sans', fontSize: '13px',
                      color: 'rgba(255,255,255,0.7)'
                    }}>{p.name}</span>
                  </div>
                ))}
              </div>

              {/* External Links Section */}
              <div style={{
                display: 'flex',
                gap: '12px',
                justifyContent: 'center',
                borderTop: '1px solid rgba(255,255,255,0.08)',
                paddingTop: '20px',
                flexWrap: 'wrap'
              }}>
                <a
                  href="https://github.com/varunthej"
                  target="_blank" rel="noopener noreferrer"
                  className="tech-badge"
                  style={{
                    textDecoration: 'none',
                    color: '#00C8FF',
                    borderColor: 'rgba(0, 200, 255, 0.25)',
                    background: 'rgba(0, 200, 255, 0.05)',
                    transition: 'all 0.2s ease',
                    fontWeight: 600
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,200,255,0.15)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,200,255,0.05)' }}
                >
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/parimi-varun-thej"
                  target="_blank" rel="noopener noreferrer"
                  className="tech-badge"
                  style={{
                    textDecoration: 'none',
                    color: '#00C8FF',
                    borderColor: 'rgba(0, 200, 255, 0.25)',
                    background: 'rgba(0, 200, 255, 0.05)',
                    transition: 'all 0.2s ease',
                    fontWeight: 600
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,200,255,0.15)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,200,255,0.05)' }}
                >
                  LinkedIn
                </a>
                <a
                  href="mailto:p.varunthej@gmail.com"
                  className="tech-badge"
                  style={{
                    textDecoration: 'none',
                    color: '#00C8FF',
                    borderColor: 'rgba(0, 200, 255, 0.25)',
                    background: 'rgba(0, 200, 255, 0.05)',
                    transition: 'all 0.2s ease',
                    fontWeight: 600
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,200,255,0.15)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,200,255,0.05)' }}
                >
                  Email
                </a>
              </div>
            </div>
          </div>

          {/* Right: Story */}
          <div className="reveal">
            <div style={{
              borderLeft: '3px solid rgba(0,200,255,0.4)',
              paddingLeft: '28px',
            }}>
              {founderStory.split('\n\n').map((para, i) => (
                <p key={i} style={{
                  fontFamily: 'DM Sans', fontSize: '15px',
                  color: 'rgba(255,255,255,0.85)',
                  lineHeight: 1.9, marginBottom: '20px'
                }}>
                  {para}
                </p>
              ))}
              <p style={{
                fontFamily: 'Syne, sans-serif', fontSize: '14px',
                color: 'rgba(0,200,255,0.8)', fontWeight: 600,
                marginTop: '24px'
              }}>
                — Parimi Varun Thej, Founder, Custos
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}