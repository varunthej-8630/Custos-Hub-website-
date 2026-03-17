import { useState } from 'react'

const pollOptions = [
  { icon: '🏠', label: 'No proper CCTV coverage at home' },
  { icon: '👴', label: 'Worried about elderly family members' },
  { icon: '🚗', label: 'Vehicle theft or tampering' },
  { icon: '🌙', label: 'No alerts at night' },
  { icon: '📶', label: 'Internet cuts out, security fails' },
  { icon: '🏘️', label: 'Rural area with no security infrastructure' },
]

export default function Community() {
  const [selected, setSelected] = useState(new Set())
  const [submitted, setSubmitted] = useState(false)
  const [location, setLocation] = useState('')
  const [challenge, setChallenge] = useState('')

  const toggle = (i) => {
    const next = new Set(selected)
    next.has(i) ? next.delete(i) : next.add(i)
    setSelected(next)
  }

  const handleSubmit = () => {
    const selectedLabels = [...selected].map(i => pollOptions[i].label).join(', ')
    const message = `🔒 *New Custos Story Submission*\n\n📍 Location: ${location || 'Not provided'}\n\n🏷️ Issues: ${selectedLabels || 'None selected'}\n\n📝 Challenge:\n${challenge || 'Not provided'}`
    const waURL = `https://wa.me/917416636417?text=${encodeURIComponent(message)}`
    window.open(waURL, '_blank')
    setSubmitted(true)
  }

  return (
    <section id="community" className="section-wrapper" style={{ padding: '120px 0', background: 'transparent' }}>
      <div className="section">
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div className="reveal" style={{ marginBottom: '20px' }}>
            <div className="label-pill">TELL US YOUR STORY</div>
          </div>
          <h2 className="reveal" style={{
            fontFamily: 'Kanit, sans-serif', fontWeight: 800,
            fontSize: 'clamp(24px, 4vw, 40px)', color: '#fff', marginBottom: '16px', letterSpacing: '0.8px'
          }}>
            What security problem do you face?
          </h2>
          <p className="reveal" style={{
            fontFamily: 'DM Sans', fontSize: '15px',
            color: 'rgba(255,255,255,0.5)', maxWidth: '480px', margin: '0 auto'
          }}>
            Only those who've faced the risk truly understand the need. Help us build for your reality.
          </p>
        </div>

        {/* Poll cards */}
        <div className="reveal" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '12px', marginBottom: '40px'
        }}>
          {pollOptions.map((opt, i) => (
            <div
              key={i}
              className={`poll-card glass-card ${selected.has(i) ? 'selected' : ''}`}
              onClick={() => toggle(i)}
              style={{ padding: '20px', cursor: 'pointer' }}
            >
              <div style={{ fontSize: '24px', marginBottom: '10px' }}>{opt.icon}</div>
              <div style={{
                fontFamily: 'DM Sans', fontSize: '13px',
                color: selected.has(i) ? '#fff' : 'rgba(255,255,255,0.6)',
                lineHeight: 1.5, transition: 'color 0.2s'
              }}>
                {opt.label}
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        {!submitted ? (
          <div className="reveal" style={{ maxWidth: '560px', margin: '0 auto' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input
                className="glass-input"
                placeholder="Your location (city, state)"
                value={location}
                onChange={e => setLocation(e.target.value)}
              />
              <textarea
                className="glass-input"
                placeholder="Describe your security challenge..."
                rows={4}
                value={challenge}
                onChange={e => setChallenge(e.target.value)}
                style={{ resize: 'vertical' }}
              />
              <button
                onClick={handleSubmit}
                style={{
                  background: '#00C8FF',
                  color: '#000',
                  border: 'none',
                  borderRadius: '100px',
                  padding: '14px 32px',
                  fontFamily: 'DM Sans', fontSize: '14px', fontWeight: 600,
                  cursor: 'pointer',
                  alignSelf: 'flex-start',
                  transition: 'opacity 0.2s',
                }}
              >
                Submit Story
              </button>
            </div>
          </div>
        ) : (
          <div className="reveal" style={{
            maxWidth: '400px', margin: '0 auto', textAlign: 'center',
            padding: '32px',
            background: 'rgba(0,200,255,0.05)',
            border: '1px solid rgba(0,200,255,0.2)',
            borderRadius: '16px'
          }}>
            <div style={{ fontSize: '36px', marginBottom: '12px' }}>🙏</div>
            <p style={{
              fontFamily: 'Kanit, sans-serif', fontSize: '18px',
              fontWeight: 700, color: '#fff', marginBottom: '8px'
            }}>Thank you for sharing.</p>
            <p style={{
              fontFamily: 'DM Sans', fontSize: '14px',
              color: 'rgba(255,255,255,0.5)', marginBottom: '16px'
            }}>Your story is being sent to Varun via WhatsApp.</p>
            <p style={{ fontFamily: 'DM Sans', fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>
              Didn't open?{' '}
              <a href="mailto:p.varunthej@gmail.com" style={{ color: '#00C8FF' }}>
                Email instead
              </a>
            </p>
          </div>
        )}
      </div>
    </section>
  )
}