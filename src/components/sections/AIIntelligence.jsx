import { useState, useEffect } from 'react'

const tabs = [
  {
    id: 0, icon: '🔴', label: 'Intruder Detection',
    desc: 'Person enters restricted zone',
    detections: [
      { label: 'PERSON', conf: '94%', color: '#FF3B30', x: '30%', y: '25%', w: '120px', h: '180px' },
      { label: 'ZONE BREACH', conf: 'ALERT', color: '#FF3B30', x: '20%', y: '15%', w: '160px', h: '10px', special: 'zone' },
    ],
    status: 'THREAT DETECTED', statusColor: '#FF3B30',
    behavior: 'BEHAVIOR: RESTRICTED ZONE ENTRY',
  },
  {
    id: 1, icon: '🟡', label: 'Elder Fall Detection',
    desc: 'Elderly person falls, no movement detected',
    detections: [
      { label: 'PERSON', conf: '97%', color: '#FFB800', x: '35%', y: '55%', w: '140px', h: '80px' },
      { label: 'FALL DETECTED', conf: 'ALERT', color: '#FFB800', x: '25%', y: '48%', w: '180px', h: '100px' },
    ],
    status: 'EMERGENCY ALERT', statusColor: '#FFB800',
    behavior: 'BEHAVIOR: FALL — NO MOVEMENT 30s',
  },
  {
    id: 2, icon: '🔴', label: 'Weapon Detection',
    desc: 'Firearm or sharp object identified',
    detections: [
      { label: 'PERSON', conf: '91%', color: '#FF3B30', x: '40%', y: '20%', w: '100px', h: '190px' },
      { label: 'WEAPON DETECTED', conf: '88%', color: '#FF3B30', x: '52%', y: '55%', w: '90px', h: '60px' },
    ],
    status: 'CRITICAL THREAT', statusColor: '#FF3B30',
    behavior: 'BEHAVIOR: ARMED PERSON — ESCALATING',
  },
  {
    id: 3, icon: '🟠', label: 'Fire & Smoke',
    desc: 'Thermal anomaly detected',
    detections: [
      { label: 'SMOKE DETECTED', conf: '96%', color: '#FF6B00', x: '15%', y: '10%', w: '200px', h: '120px' },
      { label: 'THERMAL ANOMALY', conf: '89%', color: '#FF6B00', x: '60%', y: '30%', w: '120px', h: '80px' },
    ],
    status: 'FIRE ALERT', statusColor: '#FF6B00',
    behavior: 'BEHAVIOR: THERMAL EVENT — EVACUATE',
  },
  {
    id: 4, icon: '🔵', label: 'Suspicious Behaviour',
    desc: 'Loitering, erratic movement patterns',
    detections: [
      { label: 'PERSON', conf: '89%', color: '#00C8FF', x: '45%', y: '20%', w: '100px', h: '190px' },
    ],
    status: 'MONITORING', statusColor: '#00C8FF',
    behavior: 'BEHAVIOR: LOITERING — 14 MINUTES',
  },
  {
    id: 5, icon: '🟢', label: 'Vehicle Tampering',
    desc: 'Unauthorized access to parked vehicle',
    detections: [
      { label: 'VEHICLE', conf: '95%', color: '#00FF88', x: '20%', y: '40%', w: '220px', h: '100px' },
      { label: 'PERSON', conf: '92%', color: '#FFB800', x: '50%', y: '30%', w: '80px', h: '160px' },
    ],
    status: 'TAMPERING ALERT', statusColor: '#FFB800',
    behavior: 'BEHAVIOR: UNAUTHORIZED ACCESS',
  },
]

function BoundingBox({ det, idx }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(v => !v)
    }, 1200 + idx * 400)
    return () => clearInterval(interval)
  }, [idx])

  return (
    <div style={{
      position: 'absolute',
      left: det.x, top: det.y,
      width: det.w, height: det.h,
      border: `1.5px solid ${det.color}`,
      opacity: visible ? 1 : 0.2,
      transition: 'opacity 0.4s ease',
      boxShadow: `0 0 10px ${det.color}40`,
    }}>
      {/* Corner brackets */}
      {[['0 0', '-1px -1px'], ['calc(100% - 8px) 0', '-1px -1px'], ['0 calc(100% - 8px)', '-1px -1px'], ['calc(100% - 8px) calc(100% - 8px)', '-1px -1px']].map((_, ci) => (
        <div key={ci} style={{
          position: 'absolute',
          width: '8px', height: '8px',
          border: `2px solid ${det.color}`,
          borderRadius: '1px',
        }} />
      ))}

      {/* Label */}
      <div style={{
        position: 'absolute', top: '-22px', left: 0,
        background: det.color,
        color: '#000', fontFamily: 'DM Mono, monospace',
        fontSize: '9px', fontWeight: 600,
        padding: '2px 6px', borderRadius: '3px 3px 0 0',
        whiteSpace: 'nowrap'
      }}>
        {det.label} {det.conf}
      </div>
    </div>
  )
}

export default function AIIntelligence() {
  const [activeTab, setActiveTab] = useState(0)
  const tab = tabs[activeTab]

  return (
    <section id="intelligence" className="section-wrapper" style={{ padding: '120px 0', background: 'transparent' }}>
      <div className="section">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div className="reveal" style={{ marginBottom: '20px' }}>
            <div className="label-pill">WHAT CUSTOS SEES</div>
          </div>
          <h2 className="reveal" style={{
            fontFamily: 'Crimson Text, serif', fontWeight: 700,
            fontSize: 'clamp(32px, 4.5vw, 56px)', color: '#fff', marginBottom: '16px', letterSpacing: '3px', lineHeight: 1.15
          }}>
            Security Intelligence.<br />Not Just Surveillance.
          </h2>
          <p className="reveal" style={{
            fontFamily: 'DM Sans', fontSize: '16px',
            color: 'rgba(255,255,255,0.5)', maxWidth: '500px', margin: '0 auto'
          }}>
            Custos doesn't just record. It reads scenes, understands context, and acts.
          </p>
        </div>

        {/* Camera viewport */}
        <div className="reveal ai-viewport-wrap" style={{ maxWidth: '760px', margin: '0 auto 40px' }}>
          <div className="ai-viewport-inner" style={{
            background: '#0a0a0a',
            border: '1px solid rgba(0,200,255,0.15)',
            borderRadius: '16px',
            position: 'relative',
            height: '380px',
            overflow: 'hidden',
          }}>
            {/* Scanline effect */}
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,200,255,0.015) 2px, rgba(0,200,255,0.015) 4px)',
              pointerEvents: 'none', zIndex: 3
            }} />

            {/* Corner brackets (surveillance UI) */}
            {[
              { top: '12px', left: '12px', borderTop: '2px solid rgba(0,200,255,0.6)', borderLeft: '2px solid rgba(0,200,255,0.6)' },
              { top: '12px', right: '12px', borderTop: '2px solid rgba(0,200,255,0.6)', borderRight: '2px solid rgba(0,200,255,0.6)' },
              { bottom: '12px', left: '12px', borderBottom: '2px solid rgba(0,200,255,0.6)', borderLeft: '2px solid rgba(0,200,255,0.6)' },
              { bottom: '12px', right: '12px', borderBottom: '2px solid rgba(0,200,255,0.6)', borderRight: '2px solid rgba(0,200,255,0.6)' },
            ].map((s, i) => (
              <div key={i} style={{
                position: 'absolute', width: '20px', height: '20px', zIndex: 4, ...s
              }} />
            ))}

            {/* Timestamp */}
            <div style={{
              position: 'absolute', top: '16px', left: '24px',
              fontFamily: 'monospace', fontSize: '11px',
              color: '#00FF00', zIndex: 4, letterSpacing: '0.5px'
            }}>
              CAM_0{activeTab + 1} | LIVE | {new Date().toTimeString().slice(0,8)}
            </div>

            {/* Status badge */}
            <div style={{
              position: 'absolute', top: '16px', right: '24px',
              background: tab.statusColor + '22',
              border: `1px solid ${tab.statusColor}66`,
              color: tab.statusColor,
              fontFamily: 'monospace', fontSize: '10px',
              padding: '3px 8px', borderRadius: '4px',
              zIndex: 4, letterSpacing: '1px'
            }}>
              {tab.status}
            </div>

            {/* Behavior tag */}
            <div style={{
              position: 'absolute', bottom: '16px', left: '24px',
              fontFamily: 'monospace', fontSize: '10px',
              color: tab.statusColor, zIndex: 4, letterSpacing: '0.5px',
              background: 'rgba(0,0,0,0.8)', padding: '4px 8px', borderRadius: '4px'
            }}>
              ▶ {tab.behavior}
            </div>

            {/* REC indicator */}
            <div style={{
              position: 'absolute', bottom: '16px', right: '24px',
              display: 'flex', alignItems: 'center', gap: '6px',
              fontFamily: 'monospace', fontSize: '10px', color: '#FF3B30', zIndex: 4
            }}>
              <div className="pulse-dot" style={{ background: '#FF3B30' }} /> REC
            </div>

            {/* Detection overlays */}
            <div key={activeTab} className="tab-content" style={{ position: 'absolute', inset: 0 }}>
              {tab.detections.map((det, i) => (
                <BoundingBox key={`${activeTab}-${i}`} det={det} idx={i} />
              ))}
            </div>

            {/* Room silhouette background */}
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.04 }}>
              <rect x="10%" y="60%" width="80%" height="35%" fill="rgba(255,255,255,0.5)" />
              <rect x="20%" y="30%" width="20%" height="30%" fill="rgba(255,255,255,0.3)" />
              <rect x="65%" y="35%" width="15%" height="25%" fill="rgba(255,255,255,0.3)" />
            </svg>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="reveal ai-tab-row" style={{
          display: 'flex', gap: '8px',
          justifyContent: 'center', flexWrap: 'wrap'
        }}>
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              style={{
                background: activeTab === t.id ? 'rgba(0,200,255,0.1)' : 'transparent',
                border: `1px solid ${activeTab === t.id ? 'rgba(0,200,255,0.4)' : 'rgba(255,255,255,0.08)'}`,
                borderRadius: '100px',
                padding: '8px 16px',
                cursor: 'pointer',
                color: activeTab === t.id ? '#fff' : 'rgba(255,255,255,0.5)',
                fontFamily: 'DM Sans',
                fontSize: '13px',
                transition: 'all 0.2s ease',
                display: 'flex', alignItems: 'center', gap: '6px'
              }}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}