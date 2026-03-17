import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const STATS = [
  { value: '< 200ms', label: 'Threat Detection' },
  { value: '100%',    label: 'Offline Ready'    },
  { value: '6+',      label: 'Threat Types'     },
  { value: '24/7',    label: 'Always Watching'  },
]

function ParticleBurst() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let particles = []
    let raf

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const spawn = () => {
      const cx = canvas.width / 2
      const cy = canvas.height / 2
      for (let i = 0; i < 2; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = 0.3 + Math.random() * 0.8
        particles.push({
          x: cx, y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          size: 1 + Math.random() * 2,
          cyan: Math.random() > 0.3,
        })
      }
    }

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      spawn()
      particles = particles.filter(p => p.life > 0)
      particles.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        p.life -= 0.008
        const color = p.cyan ? `rgba(0,200,255,${p.life * 0.6})` : `rgba(0,87,255,${p.life * 0.4})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = color
        ctx.fill()
      })
      raf = requestAnimationFrame(tick)
    }
    tick()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas ref={canvasRef} style={{
      position: 'absolute', inset: 0,
      width: '100%', height: '100%',
      pointerEvents: 'none', zIndex: 0,
    }}/>
  )
}

function TypewriterText({ text, delay = 0 }) {
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted]     = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(t)
  }, [delay])

  useEffect(() => {
    if (!started) return
    let i = 0
    const iv = setInterval(() => {
      setDisplayed(text.slice(0, i + 1))
      i++
      if (i >= text.length) clearInterval(iv)
    }, 38)
    return () => clearInterval(iv)
  }, [started, text])

  return <>{displayed}<span style={{ opacity: displayed.length < text.length ? 1 : 0 }}>|</span></>
}

export default function FinalCTA() {
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  const handleClick = () => {
    setClicked(true)
    setTimeout(() => setClicked(false), 600)
  }

  return (
    <section
      className="section-wrapper final-cta-wrap"
      style={{ padding: '140px 0', position: 'relative', textAlign: 'center', overflow: 'hidden' }}
    >
      <style>{`
        @keyframes cta-ring-out {
          0%   { transform: translate(-50%,-50%) scale(0.8); opacity: 0.6; }
          100% { transform: translate(-50%,-50%) scale(2.2); opacity: 0; }
        }
        @keyframes cta-float {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-8px); }
        }
        @keyframes cta-shimmer {
          0%   { left: -80%; }
          100% { left: 160%; }
        }
        @keyframes cta-stat-in {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .cta-stat { animation: cta-stat-in .6s ease both; }
      `}</style>

      {/* Particle canvas */}
      <ParticleBurst />

      {/* Multi-layer radial glows */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: 800, height: 600, borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(0,200,255,0.09) 0%, transparent 70%)',
        filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0,
      }}/>
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: 400, height: 300, borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(0,87,255,0.10) 0%, transparent 70%)',
        filter: 'blur(40px)', pointerEvents: 'none', zIndex: 0,
      }}/>

      {/* Animated rings */}
      {[1,2,3].map(i => (
        <div key={i} style={{
          position: 'absolute', top: '50%', left: '50%',
          width: 300 + i * 160, height: 300 + i * 160,
          borderRadius: '50%',
          border: '1px solid rgba(0,200,255,0.06)',
          transform: 'translate(-50%,-50%)',
          pointerEvents: 'none', zIndex: 0,
        }}/>
      ))}

      {/* Pulse rings on hover */}
      <AnimatePresence>
        {hovered && [0,1].map(i => (
          <div key={i} style={{
            position: 'absolute', top: '50%', left: '50%',
            width: 200, height: 200, borderRadius: '50%',
            border: '1px solid rgba(0,200,255,0.4)',
            animation: `cta-ring-out 1.4s ease-out ${i * 0.5}s infinite`,
            pointerEvents: 'none', zIndex: 0,
          }}/>
        ))}
      </AnimatePresence>

      <div className="section" style={{ position: 'relative', zIndex: 1 }}>

        {/* Label */}
        <motion.div
          className="reveal"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 28 }}
        >
          <div className="label-pill" style={{
            borderColor: 'rgba(0,200,255,0.35)',
            background: 'rgba(0,200,255,0.10)',
          }}>
            <span className="pulse-dot" />
            REQUEST ACCESS
          </div>
        </motion.div>

        {/* Headlines */}
        <motion.h2
          className="reveal"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            fontFamily: 'Crimson Text, serif', fontWeight: 700,
            fontSize: 'clamp(32px, 6vw, 64px)',
            color: '#fff', marginBottom: 8, lineHeight: 1.05, letterSpacing: '3px',
          }}
        >
          Security should not just record crime.
        </motion.h2>

        <motion.h2
          className="reveal gradient-text"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            fontFamily: 'Crimson Text, serif', fontWeight: 700,
            fontSize: 'clamp(32px, 6vw, 64px)',
            marginBottom: 32, lineHeight: 1.05, letterSpacing: '3px',
          }}
        >
          It should prevent it.
        </motion.h2>

        {/* Typewriter subtext */}
        <motion.p
          className="reveal"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          style={{
            fontFamily: 'DM Sans', fontSize: 'clamp(14px,1.4vw,17px)',
            color: 'rgba(255,255,255,0.52)', maxWidth: 540,
            margin: '0 auto 52px', lineHeight: 1.75,
          }}
        >
          Custos is building the future of autonomous security intelligence — from homes to nations.
        </motion.p>

        {/* Stats row */}
        <motion.div
          className="reveal"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          style={{
            display: 'flex', justifyContent: 'center',
            gap: 'clamp(16px, 4vw, 48px)',
            flexWrap: 'wrap',
            marginBottom: 52,
          }}
        >
          {STATS.map((s, i) => (
            <div key={i} className="cta-stat" style={{
              textAlign: 'center',
              animationDelay: `${i * 0.12 + 0.5}s`,
            }}>
              <div style={{
                fontFamily: 'Syne, sans-serif', fontWeight: 800,
                fontSize: 'clamp(22px, 3vw, 32px)',
                background: 'linear-gradient(135deg,#fff,#00C8FF)',
                WebkitBackgroundClip: 'text', backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                lineHeight: 1,
              }}>
                {s.value}
              </div>
              <div style={{
                fontFamily: 'DM Sans', fontSize: 11,
                color: 'rgba(255,255,255,0.35)',
                letterSpacing: '1.5px', textTransform: 'uppercase',
                marginTop: 5,
              }}>
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          className="reveal"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, type: 'spring', stiffness: 120 }}
          style={{ marginBottom: 28, animation: 'cta-float 3s ease-in-out infinite' }}
        >
          <a
            href="https://wa.me/917416636417?text=Hi%2C%20I%27d%20like%20to%20request%20early%20access%20to%20Custos!"
            target="_blank" rel="noopener noreferrer"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={handleClick}
            className="btn-primary final-cta-btn"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              textDecoration: 'none',
              borderRadius: 100,
              padding: 'clamp(14px,2vw,18px) clamp(32px,4vw,52px)',
              fontSize: 'clamp(14px,1.2vw,16px)', fontWeight: 700,
              boxShadow: hovered
                ? '0 0 80px rgba(255,255,255,0.25), 0 20px 60px rgba(0,0,0,0.5)'
                : '0 0 40px rgba(255,255,255,0.10), 0 16px 40px rgba(0,0,0,0.4)',
              transform: hovered ? 'scale(1.04) translateY(-2px)' : 'scale(1)',
              transition: 'all 0.25s ease',
              position: 'relative', overflow: 'hidden',
            }}
          >
            {/* Shimmer sweep */}
            <span style={{
              position: 'absolute', top: 0, bottom: 0, width: '35%',
              background: 'linear-gradient(90deg,transparent,rgba(0,200,255,0.22),transparent)',
              transform: 'skewX(-15deg)',
              animation: 'cta-shimmer 3s ease-in-out 1s infinite',
              pointerEvents: 'none',
            }}/>
            {/* Live dot */}
            <span style={{
              width: 8, height: 8, borderRadius: '50%',
              background: '#00C8FF',
              boxShadow: '0 0 8px #00C8FF',
              flexShrink: 0,
              animation: 'pulse-dot 1.8s infinite',
            }}/>
            Request Early Access
            <span style={{ fontSize: 16 }}>↗</span>
          </a>
        </motion.div>

        {/* Trust line */}
        <motion.div
          className="reveal"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          style={{
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: 8,
          }}
        >
          {/* Divider */}
          <div style={{
            width: 60, height: 1,
            background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.12),transparent)',
          }}/>
          <p style={{
            fontFamily: 'DM Sans', fontSize: 12,
            color: 'rgba(255,255,255,0.2)',
            fontStyle: 'italic', maxWidth: 420,
            lineHeight: 1.7,
          }}>
            Built on a true story. Designed for every family that deserved better protection.
          </p>

          {/* Contact fallback */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 16,
            flexWrap: 'wrap', justifyContent: 'center', marginTop: 8,
          }}>
            <a href="mailto:p.varunthej@gmail.com" style={{
              fontFamily: 'DM Sans', fontSize: 12,
              color: 'rgba(0,200,255,0.45)', textDecoration: 'none',
              transition: 'color 0.2s',
            }}
              onMouseEnter={e => e.target.style.color = '#00C8FF'}
              onMouseLeave={e => e.target.style.color = 'rgba(0,200,255,0.45)'}
            >
              p.varunthej@gmail.com
            </a>
            <span style={{ color: 'rgba(255,255,255,0.1)', fontSize: 10 }}>·</span>
            <a href="https://wa.me/917416636417" target="_blank" rel="noopener noreferrer" style={{
              fontFamily: 'DM Sans', fontSize: 12,
              color: 'rgba(0,200,255,0.45)', textDecoration: 'none',
              transition: 'color 0.2s',
            }}
              onMouseEnter={e => e.target.style.color = '#00C8FF'}
              onMouseLeave={e => e.target.style.color = 'rgba(0,200,255,0.45)'}
            >
              +91 74166 36417
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}