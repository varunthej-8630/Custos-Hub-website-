export default function Ecosystem() {
  const modules = [
    {
      name: 'Custos Core',
      status: 'Active',
      desc: 'The AI brain. All modules plug into this.',
      features: ['YOLOv8 real-time detection', 'Risk scoring engine', 'Local encrypted evidence archive']
    },
    {
      name: 'Custos Home',
      status: 'Building',
      desc: 'Retrofit any home CCTV into a smart family security system.',
      features: ['Local face recognition (no cloud)', 'Unknown visitor alert via WhatsApp', 'Child-left-alone & unusual entry time']
    },
    {
      name: 'Custos Guard',
      status: 'Planned',
      desc: 'PPE compliance and workplace safety for factories and warehouses.',
      features: ['Helmet & safety vest detection', 'Auto daily compliance report', 'Restricted zone breach & fall detection']
    },
    {
      name: 'Custos Desk',
      status: 'Planned',
      desc: 'Intelligent seat and focus monitoring for offices.',
      features: ['Seat occupancy detection', 'Prolonged absence alerts', 'Aggregated daily report (no footage stored)']
    },
    {
      name: 'Custos Raksha',
      status: 'In Design',
      desc: "Women's safety wearable that activates the Custos camera network on SOS.",
      features: ['One-gesture SOS trigger (no app)', 'Activates nearest cameras & live feed', 'Silent mode with GPS location']
    },
    {
      name: 'Custos Trace',
      status: 'In Design',
      desc: 'Missing person search via distributed face matching across the camera mesh.',
      features: ['Photo upload → face embedding push', 'Live local mesh search (no cloud)', 'Last-seen location & timestamp log']
    },
    {
      name: 'Custos Care',
      status: 'Planned',
      desc: 'Elder care monitoring — privacy-first activity tracking.',
      features: ['Fall detection & inactivity alerts', 'Wandering / safe zone exit detection', 'Daily activity summary (no video stored)']
    },
    {
      name: 'Custos Mesh',
      status: 'In Design',
      desc: 'Colony-wide camera network — more users means smarter coverage.',
      features: ['Shared intelligent camera network', 'Powers Custos Trace & Custos Raksha', 'Network effect multiplies node value']
    }
  ]

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Active':
        return { color: '#00FF88', bg: 'rgba(0, 255, 136, 0.06)', border: 'rgba(0, 255, 136, 0.25)' }
      case 'Building':
        return { color: '#FFB800', bg: 'rgba(255, 184, 0, 0.06)', border: 'rgba(255, 184, 0, 0.25)' }
      case 'Planned':
        return { color: '#00C8FF', bg: 'rgba(0, 200, 255, 0.06)', border: 'rgba(0, 200, 255, 0.25)' }
      case 'In Design':
        return { color: '#B300FF', bg: 'rgba(179, 0, 255, 0.06)', border: 'rgba(179, 0, 255, 0.25)' }
      default:
        return { color: '#fff', bg: 'rgba(255,255,255,0.05)', border: 'rgba(255,255,255,0.1)' }
    }
  }

  return (
    <section id="ecosystem" className="section-wrapper" style={{ padding: '120px 0', position: 'relative' }}>
      {/* Dynamic background lighting */}
      <div style={{
        position: 'absolute', top: '15%', left: '10%',
        width: '600px', height: '600px', borderRadius: '50%',
        background: 'rgba(0,87,255,0.03)', filter: 'blur(130px)', pointerEvents: 'none', zIndex: 0
      }} />
      <div style={{
        position: 'absolute', bottom: '15%', right: '10%',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'rgba(179,0,255,0.02)', filter: 'blur(120px)', pointerEvents: 'none', zIndex: 0
      }} />

      <div className="section" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '72px' }}>
          <div className="reveal" style={{ marginBottom: '20px' }}>
            <div className="label-pill" style={{ borderColor: 'rgba(0,200,255,0.3)', background: 'rgba(0,200,255,0.08)' }}>
              CUSTOS SYSTEM
            </div>
          </div>
          <h2 className="reveal gradient-text" style={{
            fontFamily: 'Poppins, sans-serif', fontWeight: 800,
            fontSize: 'clamp(32px, 5vw, 56px)', marginBottom: '16px', letterSpacing: '0.5px', lineHeight: 1.15
          }}>
            The Custos Ecosystem
          </h2>
          <p className="reveal" style={{
            fontFamily: 'Poppins, sans-serif', fontSize: '18px', fontWeight: 500,
            color: '#00C8FF', marginBottom: '16px', letterSpacing: '0.3px'
          }}>
            One platform. Infinite configurations.
          </p>
          <p className="reveal" style={{
            fontFamily: 'DM Sans', fontSize: '15.5px',
            color: 'rgba(255,255,255,0.6)', maxWidth: '640px', margin: '0 auto', lineHeight: '1.7'
          }}>
            Every module runs on the same Custos Core. You don't buy a new product for each use case — you activate the intelligence layer you need.
          </p>
        </div>

        {/* Ecosystem Cards Grid */}
        <div className="ecosystem-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {modules.map((mod, i) => {
            const st = getStatusStyle(mod.status)
            return (
              <div
                key={i}
                className="glass-card reveal"
                style={{
                  padding: '32px 24px',
                  borderRadius: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  border: '1px solid rgba(255,255,255,0.05)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Header Row: Name & Status */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '16px',
                  gap: '8px'
                }}>
                  <h3 style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '18px',
                    fontWeight: 700,
                    color: '#fff',
                    letterSpacing: '0.3px',
                    margin: 0
                  }}>
                    {mod.name}
                  </h3>
                  <span style={{
                    fontFamily: 'DM Sans',
                    fontSize: '10px',
                    fontWeight: 700,
                    color: st.color,
                    background: st.bg,
                    border: `1px solid ${st.border}`,
                    padding: '3px 10px',
                    borderRadius: '100px',
                    letterSpacing: '0.5px'
                  }}>
                    {mod.status}
                  </span>
                </div>

                {/* Description */}
                <p style={{
                  fontFamily: 'DM Sans',
                  fontSize: '13.5px',
                  color: 'rgba(255,255,255,0.7)',
                  lineHeight: '1.55',
                  marginBottom: '20px',
                  flexGrow: 1
                }}>
                  {mod.desc}
                </p>

                {/* Divider Line */}
                <div style={{
                  height: '1px',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)',
                  marginBottom: '18px'
                }} />

                {/* Features Bullets List */}
                <ul style={{
                  padding: 0,
                  margin: 0,
                  listStyle: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}>
                  {mod.features.map((feat, fi) => (
                    <li
                      key={fi}
                      style={{
                        fontFamily: 'DM Sans',
                        fontSize: '12px',
                        color: 'rgba(255,255,255,0.45)',
                        lineHeight: '1.4',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '6px'
                      }}
                    >
                      <span style={{ color: '#00C8FF', fontSize: '10px', marginTop: '1px' }}>·</span>
                      {feat}
                    </li>
                  ))}
                </ul>

                {/* Corner light accent */}
                <div style={{
                  position: 'absolute', top: 0, right: 0,
                  width: '40px', height: '40px',
                  background: `radial-gradient(circle at top right, ${st.color}08, transparent)`,
                  borderRadius: '0 16px 0 0'
                }} />
              </div>
            )
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .ecosystem-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
