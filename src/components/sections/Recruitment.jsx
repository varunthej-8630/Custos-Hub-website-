import { useState } from 'react'

const roles = [
  { icon: '🧠', title: 'AI / ML Engineer',       desc: 'Build vision models powering real-time threat detection.' },
  { icon: '⚙️', title: 'Embedded Systems Dev',   desc: 'Design the edge hardware that runs offline, everywhere.' },
  { icon: '📱', title: 'Mobile Developer',        desc: 'Build the command app families trust with their safety.' },
  { icon: '🔭', title: 'Security Researcher',     desc: 'Define threat models and shape our detection logic.' },
  { icon: '🎨', title: 'UI/UX Designer',          desc: 'Turn complex security data into calm, clear interfaces.' },
  { icon: '📣', title: 'Growth & Community',      desc: 'Reach the families who need Custos before the next incident.' },
]

export default function Enrollment() {
  const [form,      setForm]      = useState({ name: '', email: '', role: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [focused,   setFocused]   = useState(null)

  const set = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const submit = e => {
    e.preventDefault()
    const txt = `🚀 *Custos Enrollment*\n\n👤 Name: ${form.name}\n📧 Email: ${form.email}\n🎯 Role: ${form.role || 'Not specified'}\n\n💬 Message:\n${form.message}`
    window.open(`https://wa.me/917416636417?text=${encodeURIComponent(txt)}`, '_blank')
    setSubmitted(true)
  }

  const inputStyle = (name) => ({
    width: '100%',
    padding: '12px 16px',
    background: focused === name ? 'rgba(0,200,255,0.06)' : 'rgba(255,255,255,0.04)',
    border: `1px solid ${focused === name ? 'rgba(0,200,255,0.38)' : 'rgba(255,255,255,0.09)'}`,
    borderRadius: 10,
    color: '#fff',
    fontFamily: 'DM Sans, sans-serif',
    fontSize: 14,
    outline: 'none',
    transition: 'background .2s, border-color .2s',
    boxSizing: 'border-box',
  })

  return (
    <section
      id="enrollment"
      className="section-wrapper"
      style={{ padding: '120px 0', position: 'relative', background: 'transparent' }}
    >
      {/* Ambient */}
      <div style={{
        position: 'absolute', top: '30%', right: '-5%',
        width: 600, height: 600, borderRadius: '50%',
        background: 'rgba(0,87,255,0.05)',
        filter: 'blur(140px)', pointerEvents: 'none',
      }}/>

      <div className="section">

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div className="reveal" style={{ marginBottom: 20 }}>
            <div className="label-pill">JOIN THE MISSION</div>
          </div>
          <h2 className="reveal" style={{
            fontFamily: 'Kanit, sans-serif', fontWeight: 800,
            fontSize: 'clamp(28px, 4vw, 52px)', color: '#fff', marginBottom: 16, letterSpacing: '0.8px',
          }}>
            We're Looking for Builders.
          </h2>
          <p className="reveal" style={{
            fontFamily: 'DM Sans', fontSize: 16,
            color: 'rgba(255,255,255,0.5)', maxWidth: 480, margin: '0 auto',
          }}>
            If you believe security should be intelligent, not passive — we want to hear from you.
          </p>
        </div>

        {/* Role cards */}
        <div className="reveal" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 14, marginBottom: 72,
        }}>
          {roles.map((r, i) => (
            <div key={i} className="glass-card" style={{ padding: '28px 24px' }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{r.icon}</div>
              <h3 style={{
                fontFamily: 'Kanit, sans-serif', fontSize: 15,
                fontWeight: 700, color: '#fff', marginBottom: 8,
              }}>
                {r.title}
              </h3>
              <p style={{
                fontFamily: 'DM Sans', fontSize: 13,
                color: 'rgba(255,255,255,0.48)', lineHeight: 1.65,
              }}>
                {r.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Form */}
        <div style={{ maxWidth: 540, margin: '0 auto' }}>
          <div className="glass-card reveal" style={{ padding: '40px 36px' }}>

            {/* Form header */}
            <div style={{ marginBottom: 28 }}>
              <h3 style={{
                fontFamily: 'Kanit, sans-serif', fontSize: 22,
                fontWeight: 800, color: '#fff', marginBottom: 6,
              }}>
                Apply to Join
              </h3>
              <p style={{
                fontFamily: 'DM Sans', fontSize: 13,
                color: 'rgba(255,255,255,0.38)',
              }}>
                Your application goes directly to Varun via WhatsApp.
              </p>
            </div>

            {!submitted ? (
              <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

                {/* Name */}
                <div>
                  <label style={{
                    display: 'block', marginBottom: 6,
                    fontFamily: 'DM Sans', fontSize: 11,
                    fontWeight: 600, color: 'rgba(255,255,255,0.4)',
                    letterSpacing: 1.2, textTransform: 'uppercase',
                  }}>
                    Full Name
                  </label>
                  <input
                    name="name" value={form.name} onChange={set} required
                    placeholder="Your name"
                    style={inputStyle('name')}
                    onFocus={() => setFocused('name')}
                    onBlur={() => setFocused(null)}
                  />
                </div>

                {/* Email */}
                <div>
                  <label style={{
                    display: 'block', marginBottom: 6,
                    fontFamily: 'DM Sans', fontSize: 11,
                    fontWeight: 600, color: 'rgba(255,255,255,0.4)',
                    letterSpacing: 1.2, textTransform: 'uppercase',
                  }}>
                    Email
                  </label>
                  <input
                    name="email" type="email" value={form.email} onChange={set} required
                    placeholder="your@email.com"
                    style={inputStyle('email')}
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused(null)}
                  />
                </div>

                {/* Role */}
                <div>
                  <label style={{
                    display: 'block', marginBottom: 6,
                    fontFamily: 'DM Sans', fontSize: 11,
                    fontWeight: 600, color: 'rgba(255,255,255,0.4)',
                    letterSpacing: 1.2, textTransform: 'uppercase',
                  }}>
                    Role
                  </label>
                  <select
                    name="role" value={form.role} onChange={set}
                    style={{ ...inputStyle('role'), cursor: 'pointer' }}
                    onFocus={() => setFocused('role')}
                    onBlur={() => setFocused(null)}
                  >
                    <option value="" disabled style={{ background: '#0a0a16', color: '#fff' }}>
                      Select your role
                    </option>
                    {roles.map((r, i) => (
                      <option key={i} value={r.title} style={{ background: '#0a0a16', color: '#fff' }}>
                        {r.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label style={{
                    display: 'block', marginBottom: 6,
                    fontFamily: 'DM Sans', fontSize: 11,
                    fontWeight: 600, color: 'rgba(255,255,255,0.4)',
                    letterSpacing: 1.2, textTransform: 'uppercase',
                  }}>
                    Why Custos?
                  </label>
                  <textarea
                    name="message" value={form.message} onChange={set}
                    placeholder="Tell us what you bring to the mission..."
                    rows={4}
                    style={{ ...inputStyle('message'), resize: 'vertical' }}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused(null)}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  style={{
                    marginTop: 6,
                    padding: '13px 28px',
                    borderRadius: 100,
                    background: '#fff',
                    color: '#000',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: 14, fontWeight: 700,
                    alignSelf: 'flex-start',
                    transition: 'opacity .2s, transform .2s, box-shadow .2s',
                    position: 'relative', overflow: 'hidden',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.opacity = '0.9'
                    e.currentTarget.style.transform = 'translateY(-1px)'
                    e.currentTarget.style.boxShadow = '0 6px 24px rgba(255,255,255,0.2)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.opacity = '1'
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  Send Application ↗
                </button>
              </form>
            ) : (
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <div style={{ fontSize: 44, marginBottom: 16 }}>🙌</div>
                <p style={{
                  fontFamily: 'Kanit, sans-serif', fontSize: 20,
                  fontWeight: 700, color: '#fff', marginBottom: 8,
                }}>
                  Application sent!
                </p>
                <p style={{
                  fontFamily: 'DM Sans', fontSize: 14,
                  color: 'rgba(255,255,255,0.42)', lineHeight: 1.7,
                }}>
                  Varun will review and reach out via WhatsApp or email.
                </p>
              </div>
            )}
          </div>

          {/* Fallback */}
          <p className="reveal" style={{
            textAlign: 'center', marginTop: 18,
            fontFamily: 'DM Sans', fontSize: 13,
            color: 'rgba(255,255,255,0.28)',
          }}>
            Or email directly:{' '}
            <a href="mailto:p.varunthej@gmail.com"
               style={{ color: '#00C8FF', textDecoration: 'none' }}>
              p.varunthej@gmail.com
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}