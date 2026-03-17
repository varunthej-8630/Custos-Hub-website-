import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const pollOptions = [
  { icon: '🏠', label: 'No proper CCTV coverage at home',           color: '#00C8FF' },
  { icon: '👴', label: 'Worried about elderly family members',       color: '#FFB800' },
  { icon: '🚗', label: 'Vehicle theft or tampering',                 color: '#FF6B00' },
  { icon: '🌙', label: 'No alerts at night',                         color: '#6C63FF' },
  { icon: '📶', label: 'Internet cuts out, security fails',          color: '#00FF88' },
  { icon: '🏘️', label: 'Rural area with no security infrastructure', color: '#FF3B30' },
]

const MAX_CHARS = 500

export default function Community() {
  const [selected,    setSelected]    = useState(new Set())
  const [submitted,   setSubmitted]   = useState(false)
  const [location,    setLocation]    = useState('')
  const [challenge,   setChallenge]   = useState('')
  const [focusField,  setFocusField]  = useState(null)
  const [sending,     setSending]     = useState(false)

  const toggle = (i) => {
    const next = new Set(selected)
    next.has(i) ? next.delete(i) : next.add(i)
    setSelected(next)
  }

  const handleSubmit = () => {
    setSending(true)
    setTimeout(() => {
      const selectedLabels = [...selected].map(i => pollOptions[i].label).join(', ')
      const message = `🔒 *New Custos Story Submission*\n\n📍 Location: ${location || 'Not provided'}\n\n🏷️ Issues: ${selectedLabels || 'None selected'}\n\n📝 Challenge:\n${challenge || 'Not provided'}`
      window.open(`https://wa.me/917416636417?text=${encodeURIComponent(message)}`, '_blank')
      setSending(false)
      setSubmitted(true)
    }, 800)
  }

  const charPct = (challenge.length / MAX_CHARS) * 100
  const charColor = charPct > 90 ? '#FF3B30' : charPct > 70 ? '#FFB800' : '#00C8FF'

  return (
    <section
      id="community"
      className="section-wrapper"
      style={{ padding: '120px 0', background: 'transparent', position: 'relative' }}
    >
      {/* Ambient */}
      <div style={{
        position: 'absolute', bottom: '-10%', left: '50%',
        transform: 'translateX(-50%)',
        width: 700, height: 400, borderRadius: '50%',
        background: 'rgba(0,87,255,0.05)',
        filter: 'blur(120px)', pointerEvents: 'none',
      }}/>

      <div className="section">

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <motion.div
            className="reveal"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ marginBottom: 20 }}
          >
            <div className="label-pill">TELL US YOUR STORY</div>
          </motion.div>
          <motion.h2
            className="reveal"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{
              fontFamily: 'Crimson Text, serif', fontWeight: 700,
              fontSize: 'clamp(28px,4.5vw,50px)', color: '#fff', marginBottom: 16, letterSpacing: '3px', lineHeight: 1.15,
            }}
          >
            What security problem do you face?
          </motion.h2>
          <motion.p
            className="reveal"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.18 }}
            style={{
              fontFamily: 'DM Sans', fontSize: 15,
              color: 'rgba(255,255,255,0.5)', maxWidth: 480, margin: '0 auto',
            }}
          >
            Only those who've faced the risk truly understand the need. Help us build for your reality.
          </motion.p>
        </div>

        {/* Poll cards */}
        <motion.div
          className="reveal poll-grid"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 12, marginBottom: 48,
          }}
        >
          {pollOptions.map((opt, i) => {
            const on = selected.has(i)
            return (
              <motion.div
                key={i}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => toggle(i)}
                style={{
                  padding: '20px 18px',
                  borderRadius: 14, cursor: 'pointer',
                  background: on
                    ? `linear-gradient(145deg, ${opt.color}12, ${opt.color}06)`
                    : 'linear-gradient(145deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))',
                  border: `1px solid ${on ? opt.color + '44' : 'rgba(255,255,255,0.07)'}`,
                  boxShadow: on ? `0 0 20px ${opt.color}15` : 'none',
                  transition: 'all 0.25s ease',
                  position: 'relative', overflow: 'hidden',
                }}
              >
                {/* Selected checkmark */}
                <AnimatePresence>
                  {on && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      style={{
                        position: 'absolute', top: 10, right: 10,
                        width: 18, height: 18, borderRadius: '50%',
                        background: opt.color,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 9, color: '#000', fontWeight: 800,
                      }}
                    >
                      ✓
                    </motion.div>
                  )}
                </AnimatePresence>

                <div style={{ fontSize: 26, marginBottom: 10 }}>{opt.icon}</div>
                <div style={{
                  fontFamily: 'DM Sans', fontSize: 13,
                  color: on ? '#fff' : 'rgba(255,255,255,0.58)',
                  lineHeight: 1.5, fontWeight: on ? 500 : 400,
                  transition: 'color 0.2s',
                }}>
                  {opt.label}
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Selected count */}
        <AnimatePresence>
          {selected.size > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{ textAlign: 'center', marginBottom: 24 }}
            >
              <span style={{
                fontFamily: 'DM Sans', fontSize: 13,
                color: 'rgba(0,200,255,0.7)',
              }}>
                {selected.size} issue{selected.size > 1 ? 's' : ''} selected
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form / Success */}
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="reveal"
              style={{ maxWidth: 560, margin: '0 auto' }}
            >
              <div style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 20, padding: '32px 28px',
                display: 'flex', flexDirection: 'column', gap: 16,
              }}>
                {/* Location input */}
                <div>
                  <label style={{
                    display: 'block', marginBottom: 6,
                    fontFamily: 'DM Sans', fontSize: 11,
                    fontWeight: 600, letterSpacing: '1.5px',
                    color: 'rgba(255,255,255,0.35)',
                    textTransform: 'uppercase',
                  }}>
                    Your Location
                  </label>
                  <input
                    className="glass-input"
                    placeholder="City, State (e.g. Hyderabad, Telangana)"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    onFocus={() => setFocusField('loc')}
                    onBlur={() => setFocusField(null)}
                    style={{
                      borderColor: focusField === 'loc'
                        ? 'rgba(0,200,255,0.4)' : 'rgba(255,255,255,0.09)',
                    }}
                  />
                </div>

                {/* Challenge textarea */}
                <div>
                  <label style={{
                    display: 'flex', justifyContent: 'space-between',
                    marginBottom: 6,
                    fontFamily: 'DM Sans', fontSize: 11,
                    fontWeight: 600, letterSpacing: '1.5px',
                    color: 'rgba(255,255,255,0.35)',
                    textTransform: 'uppercase',
                  }}>
                    <span>Your Story</span>
                    <span style={{ color: charColor, fontVariantNumeric: 'tabular-nums' }}>
                      {challenge.length}/{MAX_CHARS}
                    </span>
                  </label>
                  <div style={{ position: 'relative' }}>
                    <textarea
                      className="glass-input"
                      placeholder="Tell us about your security challenge — what happened, or what you fear could happen..."
                      rows={4}
                      maxLength={MAX_CHARS}
                      value={challenge}
                      onChange={e => setChallenge(e.target.value)}
                      onFocus={() => setFocusField('txt')}
                      onBlur={() => setFocusField(null)}
                      style={{
                        resize: 'none',
                        borderColor: focusField === 'txt'
                          ? 'rgba(0,200,255,0.4)' : 'rgba(255,255,255,0.09)',
                        paddingBottom: 24,
                      }}
                    />
                    {/* Char bar */}
                    <div style={{
                      position: 'absolute', bottom: 0, left: 0, right: 0,
                      height: 2, borderRadius: '0 0 10px 10px',
                      background: 'rgba(255,255,255,0.06)',
                      overflow: 'hidden',
                    }}>
                      <div style={{
                        height: '100%', width: `${charPct}%`,
                        background: charColor,
                        transition: 'width 0.2s, background 0.3s',
                        borderRadius: '0 0 10px 10px',
                      }}/>
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <button
                  onClick={handleSubmit}
                  disabled={sending}
                  style={{
                    background: sending ? 'rgba(0,200,255,0.3)' : '#00C8FF',
                    color: '#000',
                    border: 'none', borderRadius: 100,
                    padding: '13px 28px',
                    fontFamily: 'DM Sans', fontSize: 14, fontWeight: 700,
                    cursor: sending ? 'default' : 'pointer',
                    alignSelf: 'flex-start',
                    transition: 'all 0.2s',
                    display: 'flex', alignItems: 'center', gap: 8,
                    opacity: sending ? 0.7 : 1,
                  }}
                  onMouseEnter={e => { if (!sending) e.currentTarget.style.boxShadow = '0 0 24px rgba(0,200,255,0.4)' }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none' }}
                >
                  {sending ? (
                    <>
                      <span style={{
                        width: 12, height: 12, border: '2px solid #000',
                        borderTopColor: 'transparent', borderRadius: '50%',
                        animation: 'spin-ring 0.7s linear infinite',
                        display: 'block', flexShrink: 0,
                      }}/>
                      Sending...
                    </>
                  ) : (
                    <>Submit Story →</>
                  )}
                </button>

                <p style={{
                  fontFamily: 'DM Sans', fontSize: 11,
                  color: 'rgba(255,255,255,0.2)', lineHeight: 1.6,
                }}>
                  Your story opens WhatsApp and goes directly to Varun. No data stored.
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                maxWidth: 420, margin: '0 auto', textAlign: 'center',
                padding: '40px 32px',
                background: 'rgba(0,200,255,0.05)',
                border: '1px solid rgba(0,200,255,0.2)',
                borderRadius: 20,
              }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                style={{ fontSize: 48, marginBottom: 16 }}
              >
                🙏
              </motion.div>
              <p style={{
                fontFamily: 'Syne, sans-serif', fontSize: 20,
                fontWeight: 800, color: '#fff', marginBottom: 8,
              }}>
                Thank you for sharing.
              </p>
              <p style={{
                fontFamily: 'DM Sans', fontSize: 14,
                color: 'rgba(255,255,255,0.5)', marginBottom: 20, lineHeight: 1.7,
              }}>
                Your story is being sent to Varun via WhatsApp. Stories like yours shape what Custos becomes.
              </p>
              <a href="mailto:p.varunthej@gmail.com" style={{
                fontFamily: 'DM Sans', fontSize: 12,
                color: 'rgba(0,200,255,0.6)', textDecoration: 'none',
              }}>
                Prefer email? p.varunthej@gmail.com
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}