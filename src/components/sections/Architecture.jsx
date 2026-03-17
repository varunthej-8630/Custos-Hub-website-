import { useState } from 'react'

const nodes = {
  sensors: [
    { label: 'Vision Monitoring', specs: ['Fall Detection', 'Activity Recognition', 'Intrusion Alerts'], color: '#00C8FF' },
    { label: 'Movement Detection', specs: ['24/7 Tracking', 'Behavioral Patterns', 'Anomaly Detection'], color: '#00C8FF' },
    { label: 'Audio Intelligence', specs: ['Distress Recognition', 'Emergency Words', 'Safety Sounds'], color: '#00C8FF' },
    { label: 'Safety Sensors', specs: ['Entry Detection', 'Safety Events', 'Status Monitoring'], color: '#00C8FF' },
  ],
  hub: { label: 'AI Intelligence Engine', sublabel: 'Adaptive Learning Core', color: '#0057FF' },
  output: [
    { label: 'Caregiver Dashboard', specs: ['iOS + Android', 'Real-time Alerts', 'Remote Oversight'], color: '#00C8FF' },
    { label: 'Cloud Integration', specs: ['Optional Backup', 'Your Choice', 'GDPR Compliant'], color: 'rgba(255,255,255,0.4)' },
  ]
}

const techBadges = [
  'AI Activity Recognition', 'Real-time Alerts', 'Privacy-First Processing',
  'Offline-Ready', 'Optional Cloud', 'Adaptive Learning'
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
        minWidth: isHub ? '280px' : '140px',
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
        fontFamily: 'Poppins, sans-serif',
        fontSize: isHub ? '16px' : '13px',
        fontWeight: 600,
        color: node.color,
        letterSpacing: '0.5px',
      }}>
        {node.label}
      </div>
      {node.sublabel && (
        <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginTop: '4px', letterSpacing: '0.3px' }}>
          {node.sublabel}
        </div>
      )}

      {/* Tooltip */}
      {hovered && node.specs && (
        <div style={{
          position: 'absolute', bottom: 'calc(100% + 8px)', left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(0,0,0,0.95)',
          border: '1px solid rgba(0,200,255,0.3)',
          borderRadius: '8px', padding: '10px 14px',
          whiteSpace: 'nowrap', zIndex: 10,
          animation: 'fade-in 0.2s ease'
        }}>
          {node.specs.map((s, i) => (
            <div key={i} style={{
              fontFamily: 'DM Sans, sans-serif', fontSize: '11px',
              color: 'rgba(255,255,255,0.8)',
              padding: '3px 0',
              letterSpacing: '0.3px'
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
            fontFamily: 'Poppins, sans-serif', fontWeight: 700,
            fontSize: 'clamp(28px, 4.5vw, 56px)', marginBottom: '16px', letterSpacing: '0.5px'
          }}>
            A Modular Security Ecosystem
          </h2>
          <p className="reveal" style={{
            fontFamily: 'DM Sans, sans-serif', fontSize: '16px',
            color: 'rgba(255,255,255,0.6)', maxWidth: '500px', margin: '0 auto', letterSpacing: '0.3px', lineHeight: '1.6'
          }}>
            Every component is purpose-built. Every connection is intelligent. Every layer works offline.
          </p>
        </div>

        {/* Architecture diagram */}
        <div className="reveal" style={{ maxWidth: '860px', margin: '0 auto 56px' }}>
          {/* Sensor row */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '0' }}>
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
            <h3 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '20px', fontWeight: 600, color: '#fff', marginBottom: '6px', letterSpacing: '0.3px' }}>
              Already have cameras?
            </h3>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: 'rgba(255,255,255,0.6)', maxWidth: '420px', letterSpacing: '0.2px', lineHeight: '1.5' }}>
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
