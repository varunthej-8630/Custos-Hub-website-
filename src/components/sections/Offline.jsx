import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const features = [
  {
    icon: '🧠',
    title: 'Edge AI Processing',
    desc: 'All detection runs on-device. No cloud latency. No dependency.',
    tag: 'ALWAYS ON',
    tagColor: '#00C8FF',
    detail: 'YOLO models + FPGA acceleration',
    status: 'ACTIVE',
    statusColor: '#00FF88',
  },
  {
    icon: '📡',
    title: 'GSM Fallback',
    desc: 'Mobile network backup kicks in automatically if Wi-Fi fails.',
    tag: 'AUTO-SWITCH',
    tagColor: '#00C8FF',
    detail: '4G / LTE / 2G fallback chain',
    status: 'STANDBY',
    statusColor: '#FFB800',
  },
  {
    icon: '🔒',
    title: 'Local Encrypted Storage',
    desc: 'Footage never leaves your premises unless you explicitly allow it.',
    tag: 'AES-256',
    tagColor: '#00FF88',
    detail: 'End-to-end encrypted on NVMe',
    status: 'SECURED',
    statusColor: '#00FF88',
  },
  {
    icon: '⚡',
    title: 'Battery Backup Ready',
    desc: 'Designed to survive power cuts and infrastructure failures.',
    tag: 'FAILSAFE',
    tagColor: '#FFB800',
    detail: 'UPS + supercapacitor bridge',
    status: 'READY',
    statusColor: '#00C8FF',
  },
]

const layers = [
  { label: 'Primary Wi-Fi', icon: '📶', active: true,  color: '#00C8FF' },
  { label: 'GSM Network',   icon: '📡', active: false, color: '#FFB800' },
  { label: 'Edge AI Core',  icon: '🧠', active: true,  color: '#00FF88' },
  { label: 'Local Storage', icon: '💾', active: true,  color: '#00C8FF' },
]

function SignalBar({ delay = 0 }) {
  const [level, setLevel] = useState(3)
  useEffect(() => {
    const iv = setInterval(() => setLevel(2 + Math.floor(Math.random() * 3)), 1800 + delay)
    return () => clearInterval(iv)
  }, [delay])
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 16 }}>
      {[1,2,3,4].map(i => (
        <div key={i} style={{
          width: 3, borderRadius: 2,
          height: `${i * 22}%`,
          background: i <= level ? '#00C8FF' : 'rgba(255,255,255,0.12)',
          transition: 'background 0.4s',
          minHeight: 3,
          alignSelf: 'flex-end',
        }}/>
      ))}
    </div>
  )
}

function FeatureCard({ f, i }) {
  const [hov, setHov] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: i * 0.1, ease: [.4,0,.2,1] }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov
          ? 'linear-gradient(145deg, rgba(0,200,255,0.06), rgba(0,87,255,0.03))'
          : 'linear-gradient(145deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))',
        border: `1px solid ${hov ? 'rgba(0,200,255,0.22)' : 'rgba(255,255,255,0.07)'}`,
        borderRadius: 18,
        padding: '28px 24px',
        position: 'relative', overflow: 'hidden',
        transition: 'all 0.3s ease',
        transform: hov ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hov ? '0 12px 40px rgba(0,200,255,0.08), 0 4px 20px rgba(0,0,0,0.3)' : 'none',
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* Corner glow */}
      {hov && (
        <div style={{
          position: 'absolute', top: 0, right: 0,
          width: 80, height: 80,
          background: 'radial-gradient(circle at top right, rgba(0,200,255,0.12), transparent)',
          pointerEvents: 'none',
        }}/>
      )}

      {/* Top row: icon + status */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div style={{ fontSize: 32 }}>{f.icon}</div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: `${f.statusColor}14`,
          border: `1px solid ${f.statusColor}33`,
          borderRadius: 100, padding: '3px 10px',
        }}>
          <span style={{
            width: 5, height: 5, borderRadius: '50%',
            background: f.statusColor,
            boxShadow: `0 0 6px ${f.statusColor}`,
            display: 'block', flexShrink: 0,
            animation: 'pulse-dot 2s infinite',
          }}/>
          <span style={{
            fontFamily: "'DM Mono','Courier New',monospace",
            fontSize: 9, fontWeight: 700,
            color: f.statusColor, letterSpacing: 1.2,
          }}>
            {f.status}
          </span>
        </div>
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: 'Syne, sans-serif', fontSize: 17, fontWeight: 700,
        color: '#fff', marginBottom: 8,
      }}>{f.title}</h3>

      {/* Desc */}
      <p style={{
        fontFamily: 'DM Sans', fontSize: 13.5,
        color: 'rgba(255,255,255,0.5)', lineHeight: 1.65,
        marginBottom: 16,
      }}>{f.desc}</p>

      {/* Tech detail */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        paddingTop: 12,
      }}>
        <span style={{
          fontFamily: "'DM Mono','Courier New',monospace",
          fontSize: 9, color: 'rgba(255,255,255,0.3)', letterSpacing: 0.8,
        }}>
          {f.detail}
        </span>
        <span style={{
          fontFamily: 'DM Sans', fontSize: 10, fontWeight: 700,
          color: f.tagColor, letterSpacing: 1.5,
          background: `${f.tagColor}12`,
          border: `1px solid ${f.tagColor}28`,
          borderRadius: 4, padding: '2px 7px',
        }}>
          {f.tag}
        </span>
      </div>
    </motion.div>
  )
}

export default function Offline() {
  return (
    <section
      className="section-wrapper"
      id="ecosystem"
      style={{ padding: '120px 0', position: 'relative' }}
    >
      <style>{`
        @keyframes off-scan {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(500%); }
        }
        @keyframes off-blink {
          0%,100% { opacity: 1; } 50% { opacity: 0.2; }
        }
        @keyframes off-travel {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
      `}</style>

      {/* Dot grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, rgba(0,200,255,0.025) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
        maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
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
            <div className="label-pill">WORKS WITHOUT INTERNET</div>
          </motion.div>

          <motion.h2
            className="reveal gradient-text"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{
              fontFamily: 'Syne, sans-serif', fontWeight: 800,
              fontSize: 'clamp(26px,4vw,52px)', marginBottom: 16,
            }}
          >
            Your Security Shouldn't<br/>Depend on Your Wi-Fi.
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
            Cut the internet. Custos doesn't blink. All intelligence runs locally on the edge.
          </motion.p>
        </div>

        {/* Live system status panel */}
        <motion.div
          className="reveal"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          style={{
            maxWidth: 680, margin: '0 auto 56px',
            background: 'rgba(0,0,0,0.5)',
            border: '1px solid rgba(0,200,255,0.14)',
            borderRadius: 16,
            overflow: 'hidden',
          }}
        >
          {/* Panel header */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '12px 20px',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            background: 'rgba(0,200,255,0.04)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{
                width: 7, height: 7, borderRadius: '50%',
                background: '#00FF88', boxShadow: '0 0 6px #00FF88',
                animation: 'pulse-dot 2s infinite', display: 'block',
              }}/>
              <span style={{
                fontFamily: "'DM Mono','Courier New',monospace",
                fontSize: 10, color: 'rgba(255,255,255,0.5)', letterSpacing: 1,
              }}>
                CUSTOS SYSTEM STATUS
              </span>
            </div>
            <span style={{
              fontFamily: "'DM Mono','Courier New',monospace",
              fontSize: 9, color: 'rgba(0,200,255,0.5)',
            }}>
              ALL SYSTEMS NOMINAL
            </span>
          </div>

          {/* Layer rows */}
          <div style={{ padding: '8px 0' }}>
            {layers.map((layer, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 20px',
                borderBottom: i < layers.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 16 }}>{layer.icon}</span>
                  <span style={{
                    fontFamily: 'DM Sans', fontSize: 13, fontWeight: 500,
                    color: 'rgba(255,255,255,0.72)',
                  }}>
                    {layer.label}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <SignalBar delay={i * 300} />
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 5,
                    background: layer.active ? 'rgba(0,255,136,0.08)' : 'rgba(255,184,0,0.08)',
                    border: `1px solid ${layer.active ? 'rgba(0,255,136,0.22)' : 'rgba(255,184,0,0.22)'}`,
                    borderRadius: 100, padding: '2px 8px',
                  }}>
                    <span style={{
                      width: 5, height: 5, borderRadius: '50%',
                      background: layer.active ? '#00FF88' : '#FFB800',
                      display: 'block',
                      animation: layer.active ? 'pulse-dot 2s infinite' : 'off-blink 1.5s infinite',
                    }}/>
                    <span style={{
                      fontFamily: "'DM Mono','Courier New',monospace",
                      fontSize: 9, fontWeight: 700,
                      color: layer.active ? '#00FF88' : '#FFB800',
                      letterSpacing: 1,
                    }}>
                      {layer.active ? 'ONLINE' : 'STANDBY'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Progress bar — uptime */}
          <div style={{
            padding: '12px 20px',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <span style={{
              fontFamily: "'DM Mono','Courier New',monospace",
              fontSize: 9, color: 'rgba(255,255,255,0.3)', letterSpacing: 1, flexShrink: 0,
            }}>
              UPTIME
            </span>
            <div style={{
              flex: 1, height: 3, borderRadius: 2,
              background: 'rgba(255,255,255,0.06)', overflow: 'hidden',
            }}>
              <motion.div
                initial={{ width: '0%' }}
                whileInView={{ width: '99.97%' }}
                viewport={{ once: true }}
                transition={{ duration: 1.6, ease: [.4,0,.2,1], delay: 0.5 }}
                style={{
                  height: '100%', borderRadius: 2,
                  background: 'linear-gradient(90deg,#00C8FF,#00FF88)',
                  boxShadow: '0 0 8px rgba(0,200,255,0.5)',
                }}
              />
            </div>
            <span style={{
              fontFamily: "'DM Mono','Courier New',monospace",
              fontSize: 9, color: '#00FF88', letterSpacing: 1, flexShrink: 0,
            }}>
              99.97%
            </span>
          </div>
        </motion.div>

        {/* Feature cards grid */}
        <div className="offline-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 20,
        }}>
          {features.map((f, i) => <FeatureCard key={i} f={f} i={i} />)}
        </div>

        {/* Bottom callout */}
        <motion.div
          className="reveal"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          style={{
            textAlign: 'center', marginTop: 56,
            padding: '24px 32px',
            background: 'rgba(0,200,255,0.04)',
            border: '1px solid rgba(0,200,255,0.12)',
            borderRadius: 16, maxWidth: 600, margin: '56px auto 0',
          }}
        >
          <p style={{
            fontFamily: 'DM Sans', fontSize: 15, fontWeight: 500,
            color: 'rgba(255,255,255,0.65)', lineHeight: 1.7,
          }}>
            <span style={{ color: '#00C8FF', fontWeight: 700 }}>No subscription required</span> for offline features.
            All core AI runs locally — forever, on your hardware.
          </p>
        </motion.div>
      </div>
    </section>
  )
}