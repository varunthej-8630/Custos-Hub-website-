import { useState } from 'react'

const TABS = [
  {
    id: 'home',
    label: 'Home & Family',
    title: 'Protect Your Home & Family',
    text: 'Protect your home with the cameras you already have. Know who enters, when, and get instant WhatsApp alerts. No subscriptions. No cloud. Your data stays with you.',
    modules: ['Custos Home', 'Custos Care', 'Custos Raksha']
  },
  {
    id: 'factories',
    label: 'Factories & Warehouses',
    title: 'Industrial & Safety Intelligence',
    text: 'Automate PPE compliance, detect zone breaches, and protect your assets. Generate legal-grade incident reports automatically.',
    modules: ['Custos Guard', 'Custos Core', 'Custos Desk']
  },
  {
    id: 'schools',
    label: 'Schools & Colleges',
    title: 'Secure Educational Campuses',
    text: 'Know when someone unauthorised enters. Detect crowd gatherings before they escalate. Keep your campus safe proactively — not reactively.',
    modules: ['Custos Campus', 'Custos Core', 'Custos Trace']
  },
  {
    id: 'apartments',
    label: 'Apartments & Colonies',
    title: 'Connected Smart Communities',
    text: 'Connect every Custos unit in your colony into one intelligent network. Find missing persons. Alert the whole community instantly.',
    modules: ['Custos Mesh', 'Custos Trace', 'Custos Home']
  }
]

export default function YourNeeds() {
  const [activeTab, setActiveTab] = useState(0)
  const tab = TABS[activeTab]

  return (
    <section id="community" className="section-wrapper" style={{ padding: '120px 0', position: 'relative' }}>
      {/* Muted ambient lighting */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '700px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,200,255,0.03) 0%, transparent 70%)',
        filter: 'blur(100px)', pointerEvents: 'none', zIndex: 0
      }} />

      <div className="section" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div className="reveal" style={{ marginBottom: '20px' }}>
            <div className="label-pill" style={{ borderColor: 'rgba(0,200,255,0.3)', background: 'rgba(0,200,255,0.08)' }}>
              USE CASES
            </div>
          </div>
          <h2 className="reveal gradient-text" style={{
            fontFamily: 'Poppins, sans-serif', fontWeight: 800,
            fontSize: 'clamp(32px, 5vw, 56px)', marginBottom: '16px', letterSpacing: '0.5px', lineHeight: 1.15
          }}>
            Built For Your World
          </h2>
          <p className="reveal" style={{
            fontFamily: 'DM Sans', fontSize: '16px',
            color: 'rgba(255,255,255,0.5)', maxWidth: '500px', margin: '0 auto'
          }}>
            Customized AI safety workflows adapted to your environment.
          </p>
        </div>

        {/* Tab Row */}
        <div className="reveal" style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '8px',
          flexWrap: 'wrap',
          marginBottom: '40px',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          paddingBottom: '20px'
        }}>
          {TABS.map((t, idx) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(idx)}
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '14px',
                fontWeight: 600,
                color: activeTab === idx ? '#fff' : 'rgba(255, 255, 255, 0.45)',
                background: activeTab === idx ? 'rgba(0, 200, 255, 0.08)' : 'transparent',
                border: activeTab === idx ? '1px solid rgba(0, 200, 255, 0.3)' : '1px solid transparent',
                borderRadius: '100px',
                padding: '10px 24px',
                cursor: 'pointer',
                transition: 'all 0.25s ease'
              }}
              onMouseEnter={e => {
                if (activeTab !== idx) e.currentTarget.style.color = '#fff'
              }}
              onMouseLeave={e => {
                if (activeTab !== idx) e.currentTarget.style.color = 'rgba(255, 255, 255, 0.45)'
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab Content Display */}
        <div key={activeTab} className="tab-content reveal" style={{
          maxWidth: '820px',
          margin: '0 auto'
        }}>
          <div className="glass-card" style={{
            padding: '48px 40px',
            borderRadius: '20px',
            border: '1px solid rgba(0, 200, 255, 0.15)',
            boxShadow: '0 8px 32px rgba(0, 200, 255, 0.04)'
          }}>
            <h3 style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: 'clamp(20px, 3.5vw, 26px)',
              fontWeight: 700,
              color: '#00C8FF',
              marginBottom: '20px',
              letterSpacing: '0.3px'
            }}>
              {tab.title}
            </h3>

            <p style={{
              fontFamily: 'DM Sans',
              fontSize: 'clamp(14.5px, 2vw, 16px)',
              color: 'rgba(255, 255, 255, 0.85)',
              lineHeight: '1.8',
              marginBottom: '36px',
              fontWeight: 400
            }}>
              {tab.text}
            </p>

            {/* Modules list row */}
            <div>
              <div style={{
                fontFamily: 'DM Sans',
                fontSize: '11px',
                color: 'rgba(255, 255, 255, 0.4)',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                marginBottom: '14px',
                fontWeight: 600
              }}>
                Recommended Modules
              </div>
              <div style={{
                display: 'flex',
                gap: '10px',
                flexWrap: 'wrap'
              }}>
                {tab.modules.map((m, idx) => (
                  <span
                    key={idx}
                    className="tech-badge"
                    style={{
                      fontSize: '13px',
                      padding: '8px 18px',
                      borderRadius: '8px',
                      background: 'rgba(0, 200, 255, 0.04)',
                      borderColor: 'rgba(0, 200, 255, 0.15)',
                      color: '#fff',
                      fontWeight: 500
                    }}
                  >
                    🚀 {m}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
