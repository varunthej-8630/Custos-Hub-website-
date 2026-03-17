import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const roles = [
  {
    icon: '🧠',
    title: 'AI / Computer Vision Engineer',
    type: 'CORE',
    typeColor: '#00C8FF',
    desc: 'Build the intelligence layer that sees and understands — YOLO, edge inference, real-time detection.',
    skills: ['PyTorch', 'YOLO', 'OpenCV', 'Edge AI'],
  },
  {
    icon: '⚙️',
    title: 'Embedded Systems Developer',
    type: 'HARDWARE',
    typeColor: '#FFB800',
    desc: 'Design the edge hardware that runs it all offline — Jetson, FPGA, ESP32, power management.',
    skills: ['C/C++', 'FPGA', 'Jetson Orin', 'RTOS'],
  },
  {
    icon: '🔭',
    title: 'Security Analyst & Researcher',
    type: 'RESEARCH',
    typeColor: '#FF6B00',
    desc: 'Define threat models, test detection logic, and shape our response strategies.',
    skills: ['Threat Modeling', 'Pen Testing', 'OSINT', 'SOC'],
  },
  {
    icon: '📱',
    title: 'Mobile & Platform Developer',
    type: 'PRODUCT',
    typeColor: '#00FF88',
    desc: 'Build the command interface families trust — React Native, real-time alerts, offline sync.',
    skills: ['React Native', 'WebSockets', 'Push Notifs', 'UX'],
  },
]

const perks = [
  { icon: '🚀', label: 'Work on real product' },
  { icon: '🌍', label: 'Remote-first'         },
  { icon: '💡', label: 'Mission-driven'        },
  { icon: '🤝', label: 'Equity opportunity'    },
  { icon: '📚', label: 'Learn fast, ship fast' },
  { icon: '🛡️', label: 'Build something meaningful' },
]

function RoleCard({ role, i }) {
  const [hov, setHov] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay: i * 0.09 }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov
          ? `linear-gradient(145deg, ${role.typeColor}08, rgba(0,0,0,0.6))`
          : 'linear-gradient(145deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))',
        border: `1px solid ${hov ? role.typeColor + '30' : 'rgba(255,255,255,0.07)'}`,
        borderRadius: 18, padding: '28px 24px',
        transition: 'all 0.3s ease',
        transform: hov ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hov ? `0 12px 40px ${role.typeColor}10, 0 4px 20px rgba(0,0,0,0.3)` : 'none',
        position: 'relative', overflow: 'hidden',
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* Corner accent */}
      <div style={{
        position: 'absolute', top: 0, right: 0,
        width: 60, height: 60,
        background: `radial-gradient(circle at top right, ${role.typeColor}15, transparent)`,
        borderRadius: '0 18px 0 0',
        transition: 'opacity 0.3s',
        opacity: hov ? 1 : 0,
      }}/>

      {/* Type badge */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        background: `${role.typeColor}12`,
        border: `1px solid ${role.typeColor}28`,
        borderRadius: 100, padding: '3px 10px',
        marginBottom: 16,
      }}>
        <span style={{
          width: 5, height: 5, borderRadius: '50%',
          background: role.typeColor, display: 'block',
        }}/>
        <span style={{
          fontFamily: "'DM Mono','Courier New',monospace",
          fontSize: 9, fontWeight: 700,
          color: role.typeColor, letterSpacing: 1.5,
        }}>
          {role.type}
        </span>
      </div>

      {/* Icon + Title */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 12 }}>
        <span style={{ fontSize: 28, flexShrink: 0 }}>{role.icon}</span>
        <h3 style={{
          fontFamily: 'Syne, sans-serif', fontSize: 16, fontWeight: 700,
          color: '#fff', lineHeight: 1.35,
        }}>
          {role.title}
        </h3>
      </div>

      {/* Desc */}
      <p style={{
        fontFamily: 'DM Sans', fontSize: 13.5,
        color: 'rgba(255,255,255,0.5)', lineHeight: 1.65,
        marginBottom: 16,
      }}>
        {role.desc}
      </p>

      {/* Skill pills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {role.skills.map((s, si) => (
          <span key={si} style={{
            fontFamily: 'DM Sans', fontSize: 11, fontWeight: 500,
            color: 'rgba(255,255,255,0.5)',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 6, padding: '3px 10px',
          }}>
            {s}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

export default function Recruitment() {
  const [applying, setApplying] = useState(false)

  const openApply = () => {
    const msg = `Hi Varun, I'd like to apply to join the Custos team!`
    window.open(`https://wa.me/917416636417?text=${encodeURIComponent(msg)}`, '_blank')
  }

  return (
    <section id="enrollment" className="section-wrapper" style={{ padding: '120px 0', position: 'relative' }}>

      {/* Ambient */}
      <div style={{
        position: 'absolute', top: '20%', left: '-5%',
        width: 500, height: 500, borderRadius: '50%',
        background: 'rgba(0,87,255,0.05)',
        filter: 'blur(130px)', pointerEvents: 'none',
      }}/>

      <div className="section">

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <motion.div
            className="reveal"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ marginBottom: 20 }}
          >
            <div className="label-pill">JOIN THE MISSION</div>
          </motion.div>

          <motion.h2
            className="reveal"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{
              fontFamily: 'Crimson Text, serif', fontWeight: 700,
              fontSize: 'clamp(32px,4.5vw,54px)', color: '#fff', marginBottom: 16, letterSpacing: '3px', lineHeight: 1.15,
            }}
          >
            We're Looking for Builders.
          </motion.h2>

          <motion.p
            className="reveal"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.18 }}
            style={{
              fontFamily: 'DM Sans', fontSize: 16,
              color: 'rgba(255,255,255,0.5)', maxWidth: 500, margin: '0 auto',
            }}
          >
            If you believe security should be intelligent, not passive — we want to hear from you.
          </motion.p>
        </div>

        {/* Open positions count */}
        <motion.div
          className="reveal"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            display: 'flex', alignItems: 'center', gap: 12,
            justifyContent: 'center', marginBottom: 40,
          }}
        >
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: 'rgba(0,255,136,0.08)',
            border: '1px solid rgba(0,255,136,0.22)',
            borderRadius: 100, padding: '6px 16px',
          }}>
            <span style={{
              width: 7, height: 7, borderRadius: '50%',
              background: '#00FF88', boxShadow: '0 0 8px #00FF88',
              animation: 'pulse-dot 2s infinite', display: 'block',
            }}/>
            <span style={{
              fontFamily: 'DM Sans', fontSize: 13, fontWeight: 600,
              color: '#00FF88',
            }}>
              {roles.length} Open Positions
            </span>
          </div>
          <span style={{
            fontFamily: 'DM Sans', fontSize: 13,
            color: 'rgba(255,255,255,0.3)',
          }}>
            · Remote / Hybrid · Equity Available
          </span>
        </motion.div>

        {/* Role cards */}
        <div className="recruitment-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 16, marginBottom: 64,
        }}>
          {roles.map((role, i) => <RoleCard key={i} role={role} i={i} />)}
        </div>

        {/* Perks row */}
        <motion.div
          className="reveal"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            display: 'flex', flexWrap: 'wrap',
            gap: 10, justifyContent: 'center',
            marginBottom: 56,
          }}
        >
          {perks.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              style={{
                display: 'flex', alignItems: 'center', gap: 7,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 100, padding: '7px 14px',
              }}
            >
              <span style={{ fontSize: 14 }}>{p.icon}</span>
              <span style={{
                fontFamily: 'DM Sans', fontSize: 12, fontWeight: 500,
                color: 'rgba(255,255,255,0.62)',
              }}>
                {p.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="reveal"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            textAlign: 'center',
            padding: '40px 32px',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 20,
            maxWidth: 560, margin: '0 auto',
          }}
        >
          <h3 style={{
            fontFamily: 'Syne, sans-serif', fontSize: 22, fontWeight: 800,
            color: '#fff', marginBottom: 8,
          }}>
            Don't see your role?
          </h3>
          <p style={{
            fontFamily: 'DM Sans', fontSize: 14,
            color: 'rgba(255,255,255,0.45)', marginBottom: 24, lineHeight: 1.7,
          }}>
            If you believe in the mission, reach out anyway. We're building something big
            and always open to exceptional people.
          </p>

          {/* Apply buttons */}
          <div style={{
            display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap',
          }}>
            <button
              onClick={openApply}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '12px 28px', borderRadius: 100,
                background: '#fff', color: '#000',
                border: 'none', cursor: 'pointer',
                fontFamily: 'DM Sans', fontSize: 14, fontWeight: 700,
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 28px rgba(255,255,255,0.2)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              Apply via WhatsApp ↗
            </button>

            <a
              href="mailto:p.varunthej@gmail.com?subject=Joining Custos"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '12px 28px', borderRadius: 100,
                background: 'transparent', color: '#fff',
                border: '1px solid rgba(255,255,255,0.15)',
                cursor: 'pointer',
                fontFamily: 'DM Sans', fontSize: 14, fontWeight: 500,
                textDecoration: 'none',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,200,255,0.4)'; e.currentTarget.style.background = 'rgba(0,200,255,0.06)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.background = 'transparent' }}
            >
              Email Resume
            </a>
          </div>

          <p style={{
            fontFamily: 'DM Sans', fontSize: 11,
            color: 'rgba(255,255,255,0.2)', marginTop: 20,
          }}>
            p.varunthej@gmail.com · +91 74166 36417
          </p>
        </motion.div>
      </div>
    </section>
  )
}