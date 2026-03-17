const founderStory = `During my intermediate years, my friend's grandparents were robbed and stabbed by a thief inside their own home.

There were two CCTV cameras outside that house. Both were working. Both recorded that night. But no one was watching — and the system had no way to tell anyone what was happening.

They suffered through the entire night. Alone.

It was only the next morning, when my friend's father came over and noticed they hadn't opened their doors, that anyone knew. The car was gone. They were found inside. Two cameras had seen everything — and said nothing.

That stayed with me.

I kept thinking — what if the camera had just sent one alert? One call? What if it had understood that something was wrong and told someone? They could have been found in time. That's not a big ask. That's the bare minimum a security system should do.

I started looking into how many families face situations like this. The numbers shook me. And what I found wasn't just theft — it was elderly people falling at home with no one around, vehicles stolen while cameras stared blankly, families in rural areas with no coverage at all.

Security means something different to every family. But the gap is always the same — the camera sees, and does nothing.

Most people think it won't happen to them.

I don't say that to scare anyone. I say it because I believed that too, until I saw what that belief costs. You don't know what the next minute holds. And if something does happen — the only thing worse than having no camera is having one that watched and stayed silent.

I'm not building another CCTV camera. I'm building the retrofit hub that takes the camera you already have and gives it the ability to understand what it sees — and act on it. Custos is not a fixed product. It will mold to what your family needs.

This is bigger than one product though. Every camera that becomes intelligent is one more pair of eyes that can actually help. With enough of them — across homes, streets, and cities — we can build something that truly changes how safe people are.

The cameras were there that night. They just didn't know what to do with what they saw. That's what I'm here to fix.`

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
          <h2 className="reveal" style={{
            fontFamily: 'Crimson Text, serif', fontWeight: 700,
            fontSize: 'clamp(32px, 4.5vw, 56px)', color: '#fff', letterSpacing: '3px', lineHeight: 1.15
          }}>
            Why Custos Exists.
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
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
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
                  color: 'rgba(255,255,255,0.8)',
                  lineHeight: 1.9, marginBottom: '20px'
                }}>
                  {para}
                </p>
              ))}
              <p style={{
                fontFamily: 'Syne, sans-serif', fontSize: '14px',
                color: 'rgba(0,200,255,0.8)', fontWeight: 600,
                marginTop: '16px'
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