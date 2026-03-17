import { useState, useEffect } from 'react'

const tabs = [
  {
    id: 0, label: 'Intruder Detection', threatLevel: 'HIGH',
    statusColor: '#FF3B30', statusBg: 'rgba(255,59,48,0.12)',
    behavior: 'RESTRICTED ZONE ENTRY', confidence: 94,
    detections: [
      { label: 'PERSON', conf: '94%', color: '#FF3B30', x: 28, y: 18, w: 120, h: 195 },
      { label: 'ZONE BREACH', conf: 'ALERT', color: '#FF3B30', x: 18, y: 10, w: 170, h: 8, isZone: true },
    ],
  },
  {
    id: 1, label: 'Fall Detection', threatLevel: 'EMERGENCY',
    statusColor: '#FFB800', statusBg: 'rgba(255,184,0,0.12)',
    behavior: 'FALL — NO MOVEMENT 30s', confidence: 97,
    detections: [
      { label: 'PERSON', conf: '97%', color: '#FFB800', x: 30, y: 50, w: 155, h: 85 },
      { label: 'FALL DETECTED', conf: 'ALERT', color: '#FFB800', x: 20, y: 42, w: 195, h: 110 },
    ],
  },
  {
    id: 2, label: 'Weapon Detection', threatLevel: 'CRITICAL',
    statusColor: '#FF3B30', statusBg: 'rgba(255,59,48,0.12)',
    behavior: 'ARMED PERSON — ESCALATING', confidence: 91,
    detections: [
      { label: 'PERSON', conf: '91%', color: '#FF3B30', x: 38, y: 12, w: 105, h: 200 },
      { label: 'WEAPON', conf: '88%', color: '#FF3B30', x: 52, y: 52, w: 92, h: 64 },
    ],
  },
  {
    id: 3, label: 'Fire & Smoke', threatLevel: 'ALERT',
    statusColor: '#FF6B00', statusBg: 'rgba(255,107,0,0.12)',
    behavior: 'THERMAL EVENT — EVACUATE', confidence: 96,
    detections: [
      { label: 'SMOKE', conf: '96%', color: '#FF6B00', x: 12, y: 8, w: 210, h: 130 },
      { label: 'THERMAL', conf: '89%', color: '#FF6B00', x: 58, y: 28, w: 125, h: 85 },
    ],
  },
  {
    id: 4, label: 'Suspicious Behaviour', threatLevel: 'MONITOR',
    statusColor: '#00C8FF', statusBg: 'rgba(0,200,255,0.10)',
    behavior: 'LOITERING — 14 MINUTES', confidence: 89,
    detections: [
      { label: 'PERSON', conf: '89%', color: '#00C8FF', x: 42, y: 14, w: 108, h: 198 },
    ],
  },
  {
    id: 5, label: 'Vehicle Tampering', threatLevel: 'ALERT',
    statusColor: '#FFB800', statusBg: 'rgba(255,184,0,0.12)',
    behavior: 'UNAUTHORIZED ACCESS', confidence: 95,
    detections: [
      { label: 'VEHICLE', conf: '95%', color: '#00FF88', x: 16, y: 36, w: 235, h: 108 },
      { label: 'PERSON',  conf: '92%', color: '#FFB800', x: 48, y: 24, w:  86, h: 168 },
    ],
  },
]

function BBox({ det, tabId, idx }) {
  const [pulse,   setPulse]   = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(false)
    const t = setTimeout(() => setVisible(true), idx * 160)
    return () => clearTimeout(t)
  }, [tabId, idx])

  useEffect(() => {
    const iv = setInterval(() => setPulse(v => !v), 1300 + idx * 380)
    return () => clearInterval(iv)
  }, [idx])

  const c = det.color

  return (
    <div style={{
      position: 'absolute',
      left: det.isZone ? `${det.x}%` : det.x,
      top:  det.isZone ? `${det.y}%` : det.y,
      width:  det.isZone ? `${det.w}%` : det.w,
      height: det.isZone ? `${det.h}px` : det.h,
      opacity: visible ? (pulse ? 1 : 0.38) : 0,
      transform: visible ? 'scale(1)' : 'scale(0.9)',
      transition: 'opacity 0.5s ease, transform 0.4s cubic-bezier(.34,1.4,.64,1)',
      zIndex: 5,
    }}>
      {!det.isZone && (
        <div style={{
          position: 'absolute', inset: 0,
          border: `1.5px solid ${c}`,
          boxShadow: `0 0 14px ${c}50, inset 0 0 24px ${c}08`,
        }}/>
      )}
      {det.isZone && (
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(90deg, transparent, ${c}40, ${c}95, ${c}40, transparent)`,
          boxShadow: `0 0 20px ${c}80`,
        }}/>
      )}
      {!det.isZone && [
        { top: -1, left: -1,    borderTop: `2px solid ${c}`, borderLeft: `2px solid ${c}` },
        { top: -1, right: -1,   borderTop: `2px solid ${c}`, borderRight: `2px solid ${c}` },
        { bottom: -1, left: -1, borderBottom: `2px solid ${c}`, borderLeft: `2px solid ${c}` },
        { bottom: -1, right: -1,borderBottom: `2px solid ${c}`, borderRight: `2px solid ${c}` },
      ].map((s, ci) => (
        <div key={ci} style={{
          position: 'absolute', width: 10, height: 10,
          boxShadow: `0 0 8px ${c}`, ...s,
        }}/>
      ))}
      <div style={{
        position: 'absolute',
        top: det.isZone ? -20 : -24, left: 0,
        display: 'flex', alignItems: 'center', gap: 4,
        background: c, color: '#000',
        fontFamily: "'DM Mono','Courier New',monospace",
        fontSize: 9, fontWeight: 700,
        padding: '2px 7px',
        borderRadius: det.isZone ? 3 : '3px 3px 0 0',
        whiteSpace: 'nowrap',
        boxShadow: `0 0 10px ${c}90`,
      }}>
        <span style={{
          width: 4, height: 4, borderRadius: '50%', background: '#000',
          opacity: pulse ? 1 : 0.3, transition: 'opacity 0.5s',
          display: 'inline-block', flexShrink: 0,
        }}/>
        {det.label} {det.conf}
      </div>
    </div>
  )
}

function LiveClock() {
  const [t, setT] = useState(new Date().toTimeString().slice(0, 8))
  useEffect(() => {
    const iv = setInterval(() => setT(new Date().toTimeString().slice(0, 8)), 1000)
    return () => clearInterval(iv)
  }, [])
  return <>{t}</>
}

function ConfBar({ value, color }) {
  const [w, setW] = useState(0)
  useEffect(() => { const t = setTimeout(() => setW(value), 80); return () => clearTimeout(t) }, [value])
  return (
    <div style={{ height: 3, borderRadius: 2, background: 'rgba(255,255,255,0.07)', overflow: 'hidden', width: '100%' }}>
      <div style={{
        height: '100%', width: `${w}%`,
        background: `linear-gradient(90deg, ${color}70, ${color})`,
        boxShadow: `0 0 8px ${color}`,
        borderRadius: 2,
        transition: 'width 0.85s cubic-bezier(.4,0,.2,1)',
      }}/>
    </div>
  )
}

export default function AIIntelligence() {
  const [active,    setActive]    = useState(0)
  const [switching, setSwitching] = useState(false)
  const tab = tabs[active]

  const switchTab = (id) => {
    if (id === active) return
    setSwitching(true)
    setTimeout(() => { setActive(id); setSwitching(false) }, 200)
  }

  return (
    <section
      id="intelligence"
      className="section-wrapper"
      style={{ padding: '120px 0', background: 'transparent', position: 'relative' }}
    >
      <style>{`
        @keyframes ai-scan {
          0%   { transform: translateY(-120%); }
          100% { transform: translateY(500%);  }
        }
        @keyframes ai-rec {
          0%,100% { opacity:1; } 50% { opacity:0.1; }
        }
        @keyframes ai-grid-breathe {
          0%,100% { opacity:.04; } 50% { opacity:.085; }
        }
        @keyframes ai-corner {
          0%,100% { opacity:.55; } 50% { opacity:1; }
        }
        @keyframes ai-travel {
          0%   { transform:translateX(-100%); }
          100% { transform:translateX(500%);  }
        }
        @keyframes ai-status {
          0%,100% { box-shadow:0 0 0 0 transparent; }
          50%     { box-shadow:0 0 14px 2px var(--sc); }
        }
        @keyframes ai-vp-flash {
          from { opacity:.7; } to { opacity:0; }
        }
        @keyframes ai-tab-pop {
          from { transform:translateY(-2px) scale(.97); opacity:.7; }
          to   { transform:translateY(0)    scale(1);   opacity:1;  }
        }
      `}</style>

      <div className="section">

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div className="reveal" style={{ marginBottom: '20px' }}>
            <div className="label-pill">WHAT CUSTOS SEES</div>
          </div>
          <h2 className="reveal" style={{
            fontFamily: 'Kanit, sans-serif', fontWeight: 800,
            fontSize: 'clamp(28px,4vw,52px)', color: '#fff', marginBottom: '16px', letterSpacing: '0.8px',
          }}>
            Security Intelligence.<br/>Not Just Surveillance.
          </h2>
          <p className="reveal" style={{
            fontFamily: 'DM Sans', fontSize: '16px',
            color: 'rgba(255,255,255,0.5)', maxWidth: '500px', margin: '0 auto',
          }}>
            Custos doesn't just record. It reads scenes, understands context, and acts.
          </p>
        </div>

        {/* Camera viewport */}
        <div className="reveal" style={{ maxWidth: '820px', margin: '0 auto 28px' }}>
          <div style={{
            position: 'relative',
            background: 'linear-gradient(160deg,#060710 0%,#090a15 100%)',
            border: `1px solid ${tab.statusColor}2e`,
            borderRadius: '16px 16px 0 0',
            height: 400, overflow: 'hidden',
            boxShadow: `0 0 48px ${tab.statusColor}18, 0 28px 64px rgba(0,0,0,0.65)`,
            transition: 'border-color .4s, box-shadow .4s',
            '--sc': tab.statusColor,
          }}>

            {/* Animated grid */}
            <svg style={{
              position:'absolute',inset:0,width:'100%',height:'100%',
              opacity:.05,pointerEvents:'none',zIndex:1,
              animation:'ai-grid-breathe 5s ease-in-out infinite',
            }}>
              <defs>
                <pattern id="gg" width="44" height="44" patternUnits="userSpaceOnUse">
                  <path d="M 44 0 L 0 0 0 44" fill="none" stroke="rgba(0,200,255,1)" strokeWidth=".5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#gg)"/>
            </svg>

            {/* CRT scanlines */}
            <div style={{
              position:'absolute',inset:0,zIndex:2,pointerEvents:'none',
              backgroundImage:'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,200,255,0.013) 2px,rgba(0,200,255,0.013) 4px)',
            }}/>

            {/* Moving scan beam */}
            <div style={{
              position:'absolute',inset:0,overflow:'hidden',pointerEvents:'none',zIndex:3,
            }}>
              <div style={{
                position:'absolute',top:0,left:0,right:0,height:'35%',
                background:`linear-gradient(to bottom,transparent 0%,${tab.statusColor}06 40%,${tab.statusColor}14 50%,${tab.statusColor}06 60%,transparent 100%)`,
                animation:'ai-scan 4s ease-in-out infinite',
                transition:'background .4s',
              }}/>
            </div>

            {/* Corner brackets */}
            {[
              { top:13, left:13,   borderTop:`2px solid rgba(0,200,255,.68)`, borderLeft:`2px solid rgba(0,200,255,.68)` },
              { top:13, right:13,  borderTop:`2px solid rgba(0,200,255,.68)`, borderRight:`2px solid rgba(0,200,255,.68)` },
              { bottom:13, left:13,  borderBottom:`2px solid rgba(0,200,255,.68)`, borderLeft:`2px solid rgba(0,200,255,.68)` },
              { bottom:13, right:13, borderBottom:`2px solid rgba(0,200,255,.68)`, borderRight:`2px solid rgba(0,200,255,.68)` },
            ].map((s,i) => (
              <div key={i} style={{
                position:'absolute',width:22,height:22,zIndex:6,
                animation:`ai-corner 2.8s ease-in-out ${i*.25}s infinite`, ...s,
              }}/>
            ))}

            {/* Top-left info */}
            <div style={{
              position:'absolute',top:15,left:20,zIndex:7,
              display:'flex',alignItems:'center',gap:8,
            }}>
              <span style={{fontFamily:"'DM Mono','Courier New',monospace",fontSize:10,color:'#00FF88',letterSpacing:1}}>
                CAM_0{active+1}
              </span>
              <span style={{width:1,height:9,background:'rgba(255,255,255,.14)'}}/>
              <span style={{fontFamily:"'DM Mono','Courier New',monospace",fontSize:10,color:'rgba(255,255,255,.4)',letterSpacing:.5}}>
                LIVE · <LiveClock/>
              </span>
            </div>

            {/* Top-right: threat badge */}
            <div style={{
              position:'absolute',top:12,right:16,zIndex:7,
              display:'flex',alignItems:'center',gap:6,
              background:tab.statusBg,
              border:`1px solid ${tab.statusColor}50`,
              borderRadius:6,padding:'4px 10px',
              animation:'ai-status 2.2s ease-in-out infinite',
              '--sc':tab.statusColor,
              transition:'background .4s,border-color .4s',
            }}>
              <span style={{
                width:6,height:6,borderRadius:'50%',
                background:tab.statusColor,
                boxShadow:`0 0 9px ${tab.statusColor}`,
                flexShrink:0,
              }}/>
              <span style={{
                fontFamily:"'DM Mono','Courier New',monospace",
                fontSize:9,fontWeight:700,
                color:tab.statusColor,letterSpacing:1.5,
                transition:'color .4s',
              }}>
                {tab.threatLevel}
              </span>
            </div>

            {/* Bottom-left: behavior */}
            <div style={{
              position:'absolute',bottom:15,left:16,zIndex:7,
              display:'flex',alignItems:'center',gap:7,
              background:'rgba(0,0,0,0.78)',
              border:`1px solid ${tab.statusColor}28`,
              borderRadius:6,padding:'5px 11px',
              transition:'border-color .4s',
            }}>
              <div style={{position:'relative',width:20,height:2,overflow:'hidden',borderRadius:2,background:'rgba(255,255,255,.06)'}}>
                <div style={{
                  position:'absolute',top:0,bottom:0,width:'40%',
                  background:`linear-gradient(90deg,transparent,${tab.statusColor},transparent)`,
                  animation:'ai-travel 1.5s linear infinite',
                  transition:'background .4s',
                }}/>
              </div>
              <span style={{
                fontFamily:"'DM Mono','Courier New',monospace",
                fontSize:9,color:tab.statusColor,letterSpacing:.8,
                transition:'color .4s',
              }}>
                {tab.behavior}
              </span>
            </div>

            {/* Bottom-right: REC */}
            <div style={{
              position:'absolute',bottom:15,right:16,zIndex:7,
              display:'flex',alignItems:'center',gap:5,
              fontFamily:"'DM Mono','Courier New',monospace",fontSize:10,color:'#FF3B30',
            }}>
              <span style={{
                width:7,height:7,borderRadius:'50%',
                background:'#FF3B30',boxShadow:'0 0 8px #FF3B30',
                animation:'ai-rec 1.2s ease-in-out infinite',
              }}/>
              REC
            </div>

            {/* Scene silhouette */}
            <svg style={{position:'absolute',inset:0,width:'100%',height:'100%',opacity:.055,zIndex:1}}>
              <rect x="0"   y="72%" width="100%" height="28%" fill="rgba(255,255,255,.6)"/>
              <rect x="8%"  y="30%" width="15%"  height="42%" fill="rgba(255,255,255,.35)"/>
              <rect x="70%" y="35%" width="18%"  height="37%" fill="rgba(255,255,255,.35)"/>
              <rect x="30%" y="55%" width="35%"  height="17%" fill="rgba(255,255,255,.25)"/>
            </svg>

            {/* Switching flash */}
            {switching && (
              <div style={{
                position:'absolute',inset:0,zIndex:10,
                background:`radial-gradient(ellipse at center,${tab.statusColor}18,transparent 70%)`,
                animation:'ai-vp-flash .22s ease forwards',
              }}/>
            )}

            {/* Detections */}
            <div key={active} style={{
              position:'absolute',inset:0,zIndex:5,
              opacity:switching?0:1,
              transition:'opacity .2s ease',
            }}>
              {tab.detections.map((det,i) => (
                <BBox key={`${active}-${i}`} det={det} tabId={active} idx={i}/>
              ))}
            </div>
          </div>

          {/* Stats strip */}
          <div style={{
            display:'grid',gridTemplateColumns:'repeat(3,1fr)',
            background:'rgba(255,255,255,0.03)',
            border:`1px solid ${tab.statusColor}20`,
            borderTop:'none',
            borderRadius:'0 0 16px 16px',
            overflow:'hidden',
            transition:'border-color .4s',
          }}>
            {[
              { label:'CONFIDENCE', value:`${tab.confidence}%`, isConf:true },
              { label:'RESPONSE',   value:'< 200ms' },
              { label:'ENGINE',     value:'EDGE AI'  },
            ].map((s,i) => (
              <div key={i} style={{
                padding:'11px 18px',
                borderRight:i<2?'1px solid rgba(255,255,255,0.05)':'none',
                display:'flex',flexDirection:'column',gap:6,
              }}>
                <span style={{
                  fontFamily:"'DM Mono','Courier New',monospace",
                  fontSize:8,letterSpacing:1.5,
                  color:'rgba(255,255,255,.3)',
                }}>
                  {s.label}
                </span>
                <span style={{
                  fontFamily:'Kanit,sans-serif',fontWeight:700,fontSize:15,
                  color:s.isConf?tab.statusColor:'#fff',
                  transition:'color .4s',
                }}>
                  {s.value}
                </span>
                {s.isConf && <ConfBar value={tab.confidence} color={tab.statusColor} key={active}/>}
              </div>
            ))}
          </div>
        </div>

        {/* Tab switcher */}
        <div className="reveal" style={{
          display:'flex',gap:7,justifyContent:'center',flexWrap:'wrap',
          maxWidth:820,margin:'0 auto',
        }}>
          {tabs.map(t => {
            const on = active === t.id
            return (
              <button
                key={t.id}
                onClick={() => switchTab(t.id)}
                style={{
                  position:'relative',
                  padding:'8px 18px',borderRadius:100,
                  border:`1px solid ${on ? t.statusColor+'55' : 'rgba(255,255,255,0.08)'}`,
                  background:on?t.statusBg:'transparent',
                  color:on?'#fff':'rgba(255,255,255,0.42)',
                  fontFamily:'DM Sans,sans-serif',
                  fontSize:12.5,fontWeight:on?600:400,
                  cursor:'pointer',letterSpacing:.15,
                  boxShadow:on?`0 0 16px ${t.statusColor}22`:'none',
                  transition:'all .22s cubic-bezier(.4,0,.2,1)',
                  transform:on?'translateY(-1px)':'translateY(0)',
                  whiteSpace:'nowrap',
                  animation:on?'ai-tab-pop .25s ease':'none',
                }}
                onMouseEnter={e => { if(!on) e.currentTarget.style.color='rgba(255,255,255,.78)' }}
                onMouseLeave={e => { if(!on) e.currentTarget.style.color='rgba(255,255,255,.42)' }}
              >
                {on && (
                  <span style={{
                    position:'absolute',top:4,right:5,
                    width:4,height:4,borderRadius:'50%',
                    background:t.statusColor,boxShadow:`0 0 6px ${t.statusColor}`,
                  }}/>
                )}
                {t.label}
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}