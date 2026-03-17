import { useState } from 'react'
import { motion } from 'framer-motion'

const PIPELINE = [
  {
    step: '01',
    icon: '🎥',
    label: 'Detection',
    color: '#00C8FF',
    glow: 'rgba(0,200,255,0.3)',
    desc: 'Camera captures scene in real-time. Edge AI analyses every frame.',
  },
  {
    step: '02',
    icon: '🧠',
    label: 'Analysis',
    color: '#6C63FF',
    glow: 'rgba(108,99,255,0.3)',
    desc: 'YOLO models identify objects, behaviour patterns, and anomalies.',
  },
  {
    step: '03',
    icon: '🛡',
    label: 'Decision',
    color: '#ffffff',
    glow: 'rgba(255,255,255,0.2)',
    desc: 'AI cross-references rules, context, and threat history to decide.',
  },
  {
    step: '04',
    icon: '🔔',
    label: 'Action',
    color: '#FF3B30',
    glow: 'rgba(255,59,48,0.4)',
    desc: 'Instant alert, escalation, or autonomous response — without delay.',
  },
]

const FEATURES = [
  { label: 'Real-time AI surveillance',          icon: '📷' },
  { label: 'Facial recognition',                  icon: '👤' },
  { label: 'Behaviour analysis',                  icon: '🔍' },
  { label: 'Threat prediction',                   icon: '⚡' },
  { label: 'Autonomous escalation',               icon: '📞' },
  { label: 'Offline-first intelligence',          icon: '📡' },
  { label: 'Multi-protocol communication',        icon: '🔗' },
  { label: 'Edge processing — no cloud needed',   icon: '🧠' },
]

function PipelineNode({ step, i, active, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.55, delay: i * 0.12 }}
      onClick={() => onClick(i)}
      style={{
        flex: '1 1 140px',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        cursor: 'pointer',
        position: 'relative',
      }}
    >
      {/* Node circle */}
      <div style={{
        width: 80, height: 80, borderRadius: '50%',
        background: active
          ? `radial-gradient(circle at 35% 35%, ${step.color}28, ${step.color}08)`
          : 'rgba(255,255,255,0.04)',
        border: `2px solid ${active ? step.color : 'rgba(255,255,255,0.10)'}`,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        transition: 'all 0.3s ease',
        boxShadow: active ? `0 0 28px ${step.glow}, 0 0 60px ${step.color}15` : 'none',
        marginBottom: 16, position: 'relative',
      }}>
        {/* Step number */}
        <span style={{
          position: 'absolute', top: -8, right: -8,
          width: 20, height: 20, borderRadius: '50%',
          background: active ? step.color : 'rgba(255,255,255,0.12)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'DM Mono','Courier New',monospace",
          fontSize: 8, fontWeight: 700,
          color: active ? '#000' : 'rgba(255,255,255,0.5)',
          transition: 'all 0.3s',
        }}>
          {step.step}
        </span>
        <span style={{ fontSize: 28, lineHeight: 1 }}>{step.icon}</span>
      </div>

      {/* Label */}
      <span style={{
        fontFamily: 'Syne, sans-serif', fontWeight: 700,
        fontSize: 14, letterSpacing: '1px',
        color: active ? step.color : 'rgba(255,255,255,0.55)',
        transition: 'color 0.3s', marginBottom: 8,
        textTransform: 'uppercase',
      }}>
        {step.label}
      </span>

      {/* Active underline */}
      <div style={{
        width: active ? '100%' : '0%',
        height: 1.5, borderRadius: 2,
        background: `linear-gradient(90deg, transparent, ${step.color}, transparent)`,
        transition: 'width 0.35s ease',
        maxWidth: 80,
      }}/>
    </motion.div>
  )
}

export default function Solution() {
  const [activeStep, setActiveStep] = useState(0)
  const step = PIPELINE[activeStep]

  return (
    <section
      className="section-wrapper"
      style={{ background: 'transparent', padding: '120px 0' }}
    >
      <style>{`
        @keyframes sol-travel {
          0%   { left: -10%; opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { left: 110%; opacity: 0; }
        }
        @keyframes sol-pulse {
          0%,100% { transform: scale(1); }
          50%      { transform: scale(1.15); }
        }
      `}</style>

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
            <div className="label-pill">THE CUSTOS SYSTEM</div>
          </motion.div>
          <motion.h2
            className="reveal"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{
              fontFamily: 'Syne, sans-serif', fontWeight: 800,
              fontSize: 'clamp(28px,4.5vw,52px)', color: '#fff', marginBottom: 16,
            }}
          >
            Meet Custos. Your Autonomous AI Guard.
          </motion.h2>
          <motion.p
            className="reveal"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.18 }}
            style={{
              fontFamily: 'DM Sans', fontSize: 16,
              color: 'rgba(255,255,255,0.5)', maxWidth: 500, margin: '0 auto',
            }}
          >
            Custos doesn't just watch. It detects, thinks, decides, and acts — automatically.
          </motion.p>
        </div>

        {/* Pipeline nodes row */}
        <div style={{ maxWidth: 820, margin: '0 auto 48px' }}>
          {/* Connector track */}
          <div style={{ position: 'relative', marginBottom: 40 }}>
            {/* Background line */}
            <div style={{
              position: 'absolute',
              top: 40, left: '10%', right: '10%', height: 2,
              background: 'rgba(255,255,255,0.06)',
              borderRadius: 2, zIndex: 0,
            }}/>
            {/* Animated progress line */}
            <div style={{
              position: 'absolute',
              top: 40, left: '10%',
              width: `${(activeStep / (PIPELINE.length - 1)) * 80}%`,
              height: 2,
              background: `linear-gradient(90deg, #00C8FF, ${step.color})`,
              boxShadow: `0 0 8px ${step.color}`,
              borderRadius: 2, zIndex: 0,
              transition: 'width 0.5s ease, background 0.3s',
            }}/>
            {/* Traveling dot on line */}
            <div style={{
              position: 'absolute', top: 37,
              left: `calc(10% + ${(activeStep / (PIPELINE.length - 1)) * 80}% - 6px)`,
              width: 8, height: 8, borderRadius: '50%',
              background: step.color,
              boxShadow: `0 0 10px ${step.color}`,
              transition: 'all 0.5s ease',
              zIndex: 1,
              animation: 'sol-pulse 1.5s ease-in-out infinite',
            }}/>

            {/* Node items */}
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              position: 'relative', zIndex: 2,
            }}>
              {PIPELINE.map((s, i) => (
                <PipelineNode key={i} step={s} i={i} active={activeStep === i} onClick={setActiveStep} />
              ))}
            </div>
          </div>

          {/* Detail panel */}
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              background: `linear-gradient(135deg, ${step.color}08, rgba(0,0,0,0.4))`,
              border: `1px solid ${step.color}25`,
              borderRadius: 16, padding: '24px 28px',
              display: 'flex', alignItems: 'center', gap: 20,
              flexWrap: 'wrap',
            }}
          >
            <div style={{
              width: 48, height: 48, borderRadius: '50%',
              background: `${step.color}15`,
              border: `1.5px solid ${step.color}44`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 22, flexShrink: 0,
            }}>
              {step.icon}
            </div>
            <div>
              <div style={{
                fontFamily: 'Syne, sans-serif', fontSize: 16, fontWeight: 700,
                color: step.color, marginBottom: 4,
              }}>
                Step {step.step} — {step.label}
              </div>
              <div style={{
                fontFamily: 'DM Sans', fontSize: 14,
                color: 'rgba(255,255,255,0.65)', lineHeight: 1.6,
              }}>
                {step.desc}
              </div>
            </div>
            {/* Animated connector line inside panel */}
            <div style={{
              marginLeft: 'auto', flexShrink: 0,
              position: 'relative', width: 80, height: 2,
              background: `${step.color}22`, borderRadius: 2, overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: 0, height: '100%', width: '35%',
                background: `linear-gradient(90deg, transparent, ${step.color}, transparent)`,
                animation: 'sol-travel 1.4s linear infinite',
              }}/>
            </div>
          </motion.div>
        </div>

        {/* Feature grid */}
        <motion.div
          className="reveal"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1px',
            maxWidth: 760, margin: '0 auto',
            background: 'rgba(255,255,255,0.06)',
            borderRadius: 16, overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          {FEATURES.map((f, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '16px 20px',
              background: 'rgba(0,0,0,0.55)',
              transition: 'background 0.2s',
              cursor: 'default',
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,200,255,0.05)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.55)'}
            >
              <span style={{ fontSize: 16, flexShrink: 0 }}>{f.icon}</span>
              <span style={{
                fontFamily: 'DM Sans', fontSize: 13.5, fontWeight: 500,
                color: 'rgba(255,255,255,0.72)',
              }}>
                {f.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}