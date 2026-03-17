import { useState } from 'react'

const nodes = {
  sensors: [
    { label: 'Smart Camera Modules', specs: ['4K AI Camera', 'Night Vision', 'Wide-angle lens'], color: '#00C8FF' },
    { label: 'Motion Sensors', specs: ['PIR + Radar', '360° coverage', 'Low power'], color: '#00C8FF' },
    { label: 'Audio Nodes', specs: ['Distress detection', 'Glass-break sensor', 'Mesh audio'], color: '#00C8FF' },
    { label: 'Door Sensors', specs: ['Magnetic contacts', 'Force detection', 'Tamper alert'], color: '#00C8FF' },
  ],
  hub: { label: 'Central AI Hub', sublabel: 'Microcontroller unit', color: '#0057FF' },
  output: [
    { label: 'Mobile Command App', specs: ['iOS + Android', 'Real-time alerts', 'Remote control'], color: '#00C8FF' },
    { label: 'Cloud Sync (optional)', specs: ['Encrypted backup', 'Optional only', 'GDPR compliant'], color: 'rgba(255,255,255,0.4)' },
  ]
}

const techBadges = [
  'AI Compute Engine', 'Real-Time Control Matrix', 'Vision Intelligence Models',
  'Edge Intelligence Layer', 'Multi-Channel Connectivity', 'Adaptive Mesh Network'
]

function NodeCard({ node, isHub = false }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="glass-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: isHub ? '28px 40px' : '14px 20px',
        textAlign: 'center',
        border: `1px solid ${hovered ? node.color : 'rgba(255,255,255,0.08)'}`,
        boxShadow: hovered ? `0 0 24px ${node.color}40` : 'none',
        transition: 'all 0.3s ease',
        position: 'relative',
        cursor: 'default',
        minWidth: isHub ? 'min(280px, 80vw)' : 'min(140px, 38vw)',
      }}
    >
      {isHub && (
        <div style={{
          position: 'absolute', inset: -8,
          border: '1px solid rgba(0,87,255,0.3)',
          borderRadius: '22px',
          animation: 'spin-ring 8s linear infinite',
        }} />
      )}
      <div style={{
        fontFamily: 'Syne, sans-serif',
        fontSize: isHub ? '16px' : '13px',
        fontWeight: 700, color: node.color,
      }}>
        {node.label}
      </div>
      {node.sublabel && (
        <div style={{ fontFamily: 'DM Sans', fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginTop: '4px' }}>
          {node.sublabel}
        </div>
      )}

      {/* Tooltip */}
      {hovered && node.specs && (
        <div style={{
          position: 'absolute', bottom: 'calc(100% + 8px)', left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(0,0,0,0.9)',
          border: '1px solid rgba(0,200,255,0.2)',
          borderRadius: '8px', padding: '8px 12px',
          whiteSpace: 'nowrap', zIndex: 10,
          animation: 'fade-in 0.2s ease'
        }}>
          {node.specs.map((s, i) => (
            <div key={i} style={{
              fontFamily: 'DM Sans', fontSize: '11px',
              color: 'rgba(255,255,255,0.7)',
              padding: '2px 0'
            }}>
              · {s}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function ConnectorLine({ color = 'rgba(0,200,255,0.4)', vertical = true }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: vertical ? '48px' : 'auto',
      width: vertical ? '2px' : '100%',
      position: 'relative',
      margin: vertical ? '0 auto' : '0',
    }}>
      <div style={{
        width: vertical ? '2px' : '100%',
        height: vertical ? '100%' : '2px',
        background: `linear-gradient(${vertical ? 'to bottom' : 'to right'}, ${color}, transparent)`,
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Traveling dot */}
        <div style={{
          position: 'absolute',
          width: '5px', height: '5px',
          background: '#00C8FF',
          borderRadius: '50%',
          boxShadow: '0 0 8px #00C8FF',
          animation: vertical ? 'travel-v 2s infinite linear' : 'travel-h 2s infinite linear'
        }} />
      </div>
      <style>{`
        @keyframes travel-v { 0% { top: 0; opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { top: 100%; opacity: 0; } }
        @keyframes travel-h { 0% { left: 0; opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { left: 100%; opacity: 0; } }
      `}</style>
    </div>
  )
}

export default function Architecture() {
  return (
    <section className="section-wrapper" style={{ padding: '120px 0', position: 'relative' }}>
      {/* Dot grid background */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)',
        backgroundSize: '20px 20px',
        WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
        maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
      }} />

      <div className="section">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '72px' }}>
          <div className="reveal" style={{ marginBottom: '20px' }}>
            <div className="label-pill">HARDWARE + AI PLATFORM</div>
          </div>
          <h2 className="reveal gradient-text" style={{
            fontFamily: 'Crimson Text, serif', fontWeight: 700,
            fontSize: 'clamp(32px, 4.5vw, 56px)', marginBottom: '16px', letterSpacing: '3px', lineHeight: 1.15
          }}>
            A Modular Security Ecosystem.
          </h2>
          <p className="reveal" style={{
            fontFamily: 'DM Sans', fontSize: '16px',
            color: 'rgba(255,255,255,0.5)', maxWidth: '500px', margin: '0 auto'
          }}>
            Every component is purpose-built. Every connection is intelligent. Every layer works offline.
          </p>
        </div>

        {/* Architecture diagram */}
        <div className="reveal" style={{ maxWidth: '860px', margin: '0 auto 56px' }}>
          {/* Sensor row */}
          <div className="arch-sensors" style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '0' }}>
            {nodes.sensors.map((node, i) => <NodeCard key={i} node={node} />)}
          </div>

          {/* Connector to hub */}
          <ConnectorLine />

          {/* Hub */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0' }}>
            <NodeCard node={nodes.hub} isHub />
          </div>

          {/* Connector from hub */}
          <ConnectorLine />

          {/* Output row */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {nodes.output.map((node, i) => <NodeCard key={i} node={node} />)}
          </div>
        </div>

        {/* Tech badges */}
        <div className="reveal" style={{
          display: 'flex', gap: '8px',
          justifyContent: 'center', flexWrap: 'wrap',
          marginBottom: '48px'
        }}>
          {techBadges.map((badge, i) => (
            <div key={i} className="tech-badge">{badge}</div>
          ))}
        </div>

        {/* Retrofit callout */}
        <div className="reveal glass-card" style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between',
          padding: '28px 36px', gap: '24px', flexWrap: 'wrap',
          borderColor: 'rgba(0,200,255,0.15)',
          boxShadow: '-4px 0 20px rgba(0,200,255,0.1)',
          borderLeft: '3px solid rgba(0,200,255,0.5)'
        }}>
          <div>
            <h3 style={{ fontFamily: 'Crimson Text, serif', fontSize: '22px', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>
              Already have cameras?
            </h3>
            <p style={{ fontFamily: 'DM Sans', fontSize: '14px', color: 'rgba(255,255,255,0.5)', maxWidth: '420px' }}>
              Custos retrofits your existing CCTV into AI-powered surveillance. No replacement needed.
            </p>
          </div>
          <div style={{
            background: 'rgba(0,200,255,0.1)',
            border: '1px solid rgba(0,200,255,0.3)',
            borderRadius: '8px', padding: '8px 16px',
            fontFamily: 'DM Sans', fontSize: '11px',
            color: '#00C8FF', letterSpacing: '2px', whiteSpace: 'nowrap'
          }}>
            RETROFIT COMPATIBLE
          </div>
        </div>
      </div>
    </section>
  )
}