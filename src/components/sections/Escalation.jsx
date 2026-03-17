import { useState } from 'react'

const escalationSteps = [
  { icon: '🎥', label: 'Intruder Detected', status: 'TRIGGERED', statusColor: '#00C8FF' },
  { icon: '📱', label: 'User Notified — Push + SMS + Call', status: 'SENT', statusColor: '#00C8FF' },
  { icon: '⏳', label: 'No Response After 3 Attempts', status: 'TIMEOUT', statusColor: '#FFB800' },
  { icon: '🧠', label: 'AI Runs Deeper Behaviour Scan', status: 'ANALYZING', statusColor: '#FFB800' },
  { icon: '⚠️', label: 'Threat Confirmed', status: 'CONFIRMED', statusColor: '#FF3B30' },
  { icon: '📞', label: 'Emergency Contacts Alerted', status: 'ESCALATED', statusColor: '#FF3B30' },
  { icon: '🚨', label: 'Authorities Notified (Optional)', status: 'DISPATCHED', statusColor: '#FF3B30' },
]

export default function Escalation() {
  const [mode, setMode] = useState('pre')

  return (
    <section className="section-wrapper" id="how-it-works" style={{ padding: '120px 0', position: 'relative', background: '#000' }}>
      {/* Red ambient blob */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '900px', height: '900px', borderRadius: '50%',
        background: 'rgba(255,59,48,0.04)',
        filter: 'blur(180px)', pointerEvents: 'none'
      }} />

      <div className="section">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '72px' }}>
          <div className="reveal" style={{ marginBottom: '20px' }}>
            <div className="label-pill" style={{ borderColor: 'rgba(255,100,50,0.3)', background: 'rgba(255,59,48,0.08)' }}>
              SIGNATURE FEATURE
            </div>
          </div>
          <h2 className="reveal" style={{
            fontFamily: 'Crimson Text, serif', fontWeight: 700,
            fontSize: 'clamp(32px, 5vw, 60px)', color: '#fff', marginBottom: '16px', letterSpacing: '3px', lineHeight: 1.15
          }}>
            Custos Doesn't Wait for You.
          </h2>
          <p className="reveal" style={{
            fontFamily: 'DM Sans', fontSize: '16px',
            color: 'rgba(255,255,255,0.5)', maxWidth: '480px', margin: '0 auto'
          }}>
            Pre-authorized escalation means the system acts, even when you can't.
          </p>
        </div>

        {/* Decision tree */}
        <div className="escalation-tree" style={{ maxWidth: '640px', margin: '0 auto 56px', position: 'relative' }}>
          {escalationSteps.map((step, i) => (
            <div key={i} className="reveal" style={{ animationDelay: `${i * 100}ms` }}>
              {/* Step node */}
              <div className="glass-card escalation-step" style={{
                padding: '18px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderColor: i === escalationSteps.length - 1
                  ? 'rgba(255,59,48,0.4)' : 'rgba(255,255,255,0.06)',
                animation: i === escalationSteps.length - 1 ? 'glow-pulse 2s infinite' : 'none',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <span style={{ fontSize: '20px' }}>{step.icon}</span>
                  <span style={{
                    fontFamily: 'DM Sans', fontSize: '14px',
                    color: 'rgba(255,255,255,0.85)', fontWeight: 500
                  }}>
                    {step.label}
                  </span>
                </div>
                <div style={{
                  background: step.statusColor + '18',
                  border: `1px solid ${step.statusColor}44`,
                  color: step.statusColor,
                  fontFamily: 'DM Sans', fontSize: '10px', fontWeight: 600,
                  padding: '4px 10px', borderRadius: '4px',
                  letterSpacing: '1.5px', whiteSpace: 'nowrap'
                }}>
                  {step.status}
                </div>
              </div>

              {/* Connector line */}
              {i < escalationSteps.length - 1 && (
                <div style={{
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center',
                  marginLeft: '36px',
                  height: '28px',
                  position: 'relative',
                }}>
                  <div style={{
                    width: '2px', height: '100%',
                    background: `linear-gradient(to bottom, ${step.statusColor}66, ${escalationSteps[i+1].statusColor}44)`,
                    position: 'relative'
                  }}>
                    <div style={{
                      position: 'absolute', width: '6px', height: '6px',
                      background: step.statusColor, borderRadius: '50%',
                      left: '-2px', boxShadow: `0 0 6px ${step.statusColor}`,
                      animation: `travel-v ${1.5 + i * 0.2}s ${i * 0.3}s infinite`
                    }} />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mode toggle */}
        <div className="reveal" style={{
          maxWidth: '640px', margin: '0 auto',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '16px', padding: '28px'
        }}>
          {/* Toggle */}
          <div className="escalation-toggle" style={{
            display: 'flex', gap: '8px', marginBottom: '20px',
            background: 'rgba(0,0,0,0.4)', borderRadius: '100px',
            padding: '4px', width: 'fit-content', margin: '0 auto 20px'
          }}>
            {['manual', 'pre'].map((m) => (
              <button key={m} onClick={() => setMode(m)} style={{
                background: mode === m ? 'rgba(0,200,255,0.15)' : 'transparent',
                border: mode === m ? '1px solid rgba(0,200,255,0.4)' : '1px solid transparent',
                borderRadius: '100px',
                padding: '8px 20px',
                color: mode === m ? '#fff' : 'rgba(255,255,255,0.4)',
                fontFamily: 'DM Sans', fontSize: '13px', fontWeight: 500,
                cursor: 'pointer', transition: 'all 0.2s'
              }}>
                {m === 'manual' ? 'Manual Mode' : 'Pre-Authorized Mode'}
              </button>
            ))}
          </div>

          <div className="tab-content" style={{ textAlign: 'center' }}>
            <p style={{
              fontFamily: 'DM Sans', fontSize: '15px',
              color: 'rgba(255,255,255,0.7)', lineHeight: 1.7
            }}>
              {mode === 'manual'
                ? '📱 You receive the alert and decide what happens next. Full manual control — every escalation step requires your confirmation.'
                : '⚡ You define the rules once. Custos handles everything automatically. No response needed — the system acts on your behalf.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}