const elderFeatures = [
  '🩺 Fall detection with instant family alerts',
  '📊 Inactivity monitoring — triggers a check',
  '🔊 Distress sound detection',
  '📞 Emergency alert to registered contacts',
  '📋 Patient activity timeline',
]

const businessFeatures = [
  '📈 Foot traffic analysis',
  '👥 Crowd density monitoring',
  '🕵️ Suspicious behaviour detection',
  '🚫 Theft prevention alerts',
  '🗺️ Customer movement heatmaps',
]

export default function ElderCare() {
  return (
    <section className="section-wrapper" style={{ padding: '120px 0' }}>
      <div className="section">
        <div className="eldercare-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '24px'
        }}>
          {/* Elder Care */}
          <div className="glass-card reveal" style={{
            padding: '40px',
            borderColor: 'rgba(0,255,136,0.15)',
            boxShadow: '0 0 40px rgba(0,255,136,0.03)'
          }}>
            <div className="label-pill" style={{
              borderColor: 'rgba(0,255,136,0.3)',
              background: 'rgba(0,255,136,0.08)',
              marginBottom: '20px'
            }}>
              ELDER CARE MODE
            </div>
            <h3 style={{
              fontFamily: 'Syne, sans-serif', fontSize: '26px', fontWeight: 700,
              color: '#fff', marginBottom: '24px'
            }}>
              Peace of mind<br />for families.
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {elderFeatures.map((f, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'flex-start', gap: '10px',
                  padding: '10px 0',
                  borderBottom: i < elderFeatures.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none'
                }}>
                  <span style={{ fontFamily: 'DM Sans', fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>
                    {f}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Business Intelligence */}
          <div className="glass-card reveal" style={{
            padding: '40px',
            borderColor: 'rgba(0,87,255,0.15)',
            boxShadow: '0 0 40px rgba(0,87,255,0.03)'
          }}>
            <div className="label-pill" style={{
              borderColor: 'rgba(0,87,255,0.4)',
              background: 'rgba(0,87,255,0.1)',
              marginBottom: '20px'
            }}>
              BUSINESS INTELLIGENCE
            </div>
            <h3 style={{
              fontFamily: 'Syne, sans-serif', fontSize: '26px', fontWeight: 700,
              color: '#fff', marginBottom: '24px'
            }}>
              Your cameras become<br />data engines.
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {businessFeatures.map((f, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'flex-start', gap: '10px',
                  padding: '10px 0',
                  borderBottom: i < businessFeatures.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none'
                }}>
                  <span style={{ fontFamily: 'DM Sans', fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>
                    {f}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}