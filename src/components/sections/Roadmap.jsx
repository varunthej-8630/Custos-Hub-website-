const phases = [
  {
    phase: 'Phase 0', time: 'M1-2', label: 'Legal Foundation',
    desc: 'Company registration (Custos AI Technologies Pvt Ltd) · DPIIT Startup India recognition · Provisional patent filing — Risk Intelligence Engine architecture',
    active: false, color: 'rgba(0,200,255,0.4)'
  },
  {
    phase: 'Phase 1', time: 'M1-3', label: 'Strengthen Core',
    desc: 'Risk score explanation text ("Lingering near asset for 47 sec") · WhatsApp alert integration · Face recognition for Custos Home · Running on Raspberry Pi 4 (not just laptop)',
    active: true, color: '#00C8FF'
  },
  {
    phase: 'Phase 2', time: 'M3-5', label: 'First Pilot Customer',
    desc: 'Custos Guard PPE module · Multi-camera support · One-command installation script · First real deployment in Mysuru',
    active: false, color: 'rgba(0,200,255,0.4)'
  },
  {
    phase: 'Phase 3', time: 'M5-8', label: 'Funding & Expansion',
    desc: 'Apply for SISFS, NASSCOM, AIC grants · Custos Desk and Custos Care modules · Complete patent specification',
    active: false, color: 'rgba(0,200,255,0.25)'
  },
  {
    phase: 'Phase 4', time: 'M8-14', label: 'Raksha & Trace',
    desc: 'Custos Mesh network protocol · Custos Trace distributed face search · Custos Raksha ESP32 hardware prototype · Partnership with housing colonies and women\'s safety NGOs',
    active: false, color: 'rgba(0,87,255,0.5)'
  },
]

export default function Roadmap() {
  return (
    <section className="section-wrapper" id="roadmap" style={{ padding: '120px 0' }}>
      <div className="section">
        <div style={{ textAlign: 'center', marginBottom: '72px' }}>
          <div className="reveal" style={{ marginBottom: '20px' }}>
            <div className="label-pill">ROADMAP</div>
          </div>
          <h2 className="reveal" style={{
            fontFamily: 'Crimson Text, serif', fontWeight: 700,
            fontSize: 'clamp(32px, 4.5vw, 56px)', color: '#fff', letterSpacing: '3px', lineHeight: 1.15
          }}>
            Where We're Going.
          </h2>
        </div>

        {/* Timeline */}
        <div style={{ position: 'relative', maxWidth: '1000px', margin: '0 auto' }}>
          {/* Connecting line */}
          <div className="roadmap-line" style={{
            position: 'absolute', top: '32px', left: '10%', right: '10%',
            height: '2px',
            background: 'linear-gradient(90deg, #00C8FF, rgba(0,87,255,0.4))',
          }} />

          <div className="roadmap-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '20px',
          }}>
            {phases.map((p, i) => (
              <div key={i} className="reveal" style={{ textAlign: 'center', position: 'relative' }}>
                {/* Phase circle */}
                <div style={{
                  width: '64px', height: '64px', borderRadius: '50%',
                  background: p.active ? `rgba(0,200,255,0.15)` : 'rgba(255,255,255,0.04)',
                  border: `2px solid ${p.color}`,
                  margin: '0 auto 20px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  animation: p.active ? 'phase-glow 2s infinite' : 'none',
                  position: 'relative', zIndex: 1,
                }}>
                  <span style={{
                    fontFamily: 'Syne, sans-serif', fontSize: '10px',
                    fontWeight: 700, color: p.active ? '#fff' : p.color, letterSpacing: '1px'
                  }}>
                    {p.time}
                  </span>
                </div>

                <div style={{
                  fontFamily: 'DM Sans', fontSize: '11px',
                  color: 'rgba(0,200,255,0.6)', letterSpacing: '1.5px',
                  marginBottom: '6px', textTransform: 'uppercase'
                }}>
                  {p.phase}
                </div>
                <div style={{
                  fontFamily: 'Syne, sans-serif', fontSize: '14px',
                  fontWeight: 700, color: '#fff', marginBottom: '8px'
                }}>
                  {p.label}
                </div>
                <div style={{
                  fontFamily: 'DM Sans', fontSize: '12px',
                  color: 'rgba(255,255,255,0.4)', lineHeight: 1.5
                }}>
                  {p.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}