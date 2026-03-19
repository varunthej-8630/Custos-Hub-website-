import { useRef, useMemo, Suspense, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Html, Stars } from '@react-three/drei'
import * as THREE from 'three'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Particle Field ──────────────────────────────────────────
function ParticleField({ isMobile }) {
  const mesh = useRef()
  const count = isMobile ? 2000 : 4000

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors    = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 40
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30
      const t = Math.random()
      colors[i * 3]     = 0
      colors[i * 3 + 1] = t * 0.78 + (1 - t) * 0.34
      colors[i * 3 + 2] = 1
    }
    return [positions, colors]
  }, [count])

  useFrame(({ clock }) => {
    if (mesh.current) {
      mesh.current.rotation.y = clock.elapsedTime * 0.03
      mesh.current.rotation.x = clock.elapsedTime * 0.01
    }
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color"    args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} vertexColors transparent opacity={0.7} sizeAttenuation />
    </points>
  )
}

// ─── Morphing Blob ────────────────────────────────────────────
function MorphingBlob() {
  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh position={[0, 0, -2]}>
        <sphereGeometry args={[2.5, 128, 128]} />
        <MeshDistortMaterial
          color="#00C8FF" distort={0.45} speed={1.5}
          transparent opacity={0.08} roughness={0} metalness={0.1}
        />
      </mesh>
      <mesh position={[0, 0, -2]}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <MeshDistortMaterial
          color="#0057FF" distort={0.3} speed={2}
          transparent opacity={0.06}
        />
      </mesh>
    </Float>
  )
}

// ─── Floating Orbs ────────────────────────────────────────────
function FloatingOrb({ position, color, size = 0.15, speed = 1.5 }) {
  return (
    <Float speed={speed} floatIntensity={1.5} rotationIntensity={0.5} position={position}>
      <mesh>
        <sphereGeometry args={[size, 16, 16]} />
        <meshStandardMaterial
          color={color} emissive={color}
          emissiveIntensity={2} transparent opacity={0.85}
        />
      </mesh>
    </Float>
  )
}

// ─── Orbital Glass Cards — desktop only ──────────────────────
function FloatingCard({ radius = 5, speed = 0.4, height = 0, offset = 0, value, label }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    const t  = clock.elapsedTime * speed + offset
    const tx = Math.cos(t) * radius
    const tz = Math.sin(t) * radius
    ref.current.position.x += (tx - ref.current.position.x) * 0.05
    ref.current.position.z += (tz - ref.current.position.z) * 0.05
    ref.current.position.y  = height + Math.sin(t * 2) * 0.3
    ref.current.lookAt(0, 0, 0)
    ref.current.rotation.y += 0.002
  })
  return (
    <group ref={ref}>
      <Html transform distanceFactor={8} center>
        <div className="three-card">
          <div className="three-card-value">{value}</div>
          <div className="three-card-label">{label}</div>
        </div>
      </Html>
    </group>
  )
}

// ─── Camera Rig (mouse parallax) ─────────────────────────────
function CameraRig() {
  const { camera } = useThree()
  const mouse = useRef({ x: 0, y: 0 })

  useFrame(() => {
    camera.position.lerp(
      new THREE.Vector3(mouse.current.x * 1.5, mouse.current.y * 0.8, 5),
      0.02
    )
    camera.lookAt(0, 0, 0)
  })

  useEffect(() => {
    const fn = (e) => {
      mouse.current.x =  (e.clientX / window.innerWidth  - 0.5) * 2
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', fn, { passive: true })
    return () => window.removeEventListener('mousemove', fn)
  }, [])

  return null
}

// ─── Grid overlay ─────────────────────────────────────────────
function GridOverlay() {
  return (
    <svg style={{
      position: 'absolute', inset: 0,
      width: '100%', height: '100%',
      opacity: 0.4, pointerEvents: 'none', zIndex: 1,
    }}>
      <defs>
        <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
          <path d="M 50 0 L 0 0 0 50" fill="none"
            stroke="rgba(0,200,255,0.06)" strokeWidth="1"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  )
}

// ─── Phases data ──────────────────────────────────────────────
const phases = [
  { id: 1, title: 'Phase 1', subtitle: 'Prototype & Validation',   desc: 'Core AI hub, retrofit module, basic detection suite',         icon: '🔬' },
  { id: 2, title: 'Phase 2', subtitle: 'Residential Deployment',    desc: 'Homes, apartments, small businesses',                         icon: '🏠' },
  { id: 3, title: 'Phase 3', subtitle: 'Platform Expansion',        desc: 'Elder care, analytics, advanced escalation modes',            icon: '📈' },
  { id: 4, title: 'Phase 4', subtitle: 'Open Eye Network',          desc: 'City-scale distributed intelligence',                         icon: '🌐' },
  { id: 5, title: 'Phase 5', subtitle: 'Advanced Features',         desc: 'Multi-protocol communication, edge processing enhancements',  icon: '⚡' },
  { id: 6, title: 'Phase 6', subtitle: 'Global Scale',              desc: 'International deployment, enterprise solutions',              icon: '🚀' },
]

// ─── Hero ─────────────────────────────────────────────────────
export default function Hero() {
  const [showDemos,    setShowDemos]    = useState(false)
  const [currentPhase, setCurrentPhase] = useState(0)
  const [isMobile,     setIsMobile]     = useState(false)

  // ── Detect mobile — hides 3D cards that bleed on small screens
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <section
      id="hero"
      style={{ position: 'relative', height: '100vh', minHeight: 600, overflow: 'hidden', background: '#000' }}
    >
      {/* ── Responsive styles injected ──────────────────────── */}
      <style>{`
        /* Hero headline — scales down properly on mobile */
        .hero-title-custos {
          font-family: 'Fraunces', serif;
          color: #FFFFFF;
          font-weight: 900;
          font-size: clamp(52px, 14vw, 130px);
          letter-spacing: 3px;
          line-height: 1.0;
          display: block;
          text-shadow:
            6px 6px 0px rgba(0,200,255,0.95),
            12px 12px 0px rgba(255,59,48,0.6),
            0 0 40px rgba(0,200,255,0.8);
          filter: drop-shadow(0 0 25px rgba(0,200,255,0.7));
        }

        /* ✅ FIX 1: remove nowrap, let it wrap on mobile */
        .hero-title-sub {
          font-family: 'Fraunces', serif;
          background: linear-gradient(90deg, #FFFFFF 0%, #00C8FF 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          display: block;
          /* NO white-space: nowrap here */
          font-size: clamp(24px, 6vw, 64px);
          line-height: 1.15;
          max-width: 100%;
          word-break: break-word;
          font-weight: 800;
          letter-spacing: 1px;
        }

        /* ✅ FIX 2: button stack on mobile */
        .hero-btns {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          justify-content: center;
          width: 100%;
          max-width: 420px;
        }
        .hero-btn {
          flex: 1 1 140px;
          min-width: 140px;
          text-align: center;
          white-space: nowrap;
          font-size: 14px !important;
          padding: 12px 22px !important;
        }

        /* ✅ FIX 3: hero content padding on mobile */
        .hero-content {
          position: absolute; inset: 0; z-index: 3;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          text-align: center;
          padding: 90px 20px 80px;
          box-sizing: border-box;
          width: 100%;
          overflow-y: auto;
        }

        /* Badge text smaller on mobile */
        .hero-badge-text {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 1.8px;
          color: rgba(255,255,255,0.9);
        }

        @media (max-width: 480px) {
          .hero-btns {
            flex-direction: column;
            align-items: center;
            max-width: 280px;
          }
          .hero-btn {
            width: 100%;
            flex: none;
          }
          .hero-badge-text {
            font-size: 9px;
            letter-spacing: 1.2px;
          }
        }

        /* Demos modal responsive */
        .demos-modal-inner {
          background: linear-gradient(135deg, rgba(0,20,40,0.96), rgba(0,40,80,0.92));
          border: 1px solid rgba(0,200,255,0.3);
          border-radius: 20px;
          padding: 32px 28px;
          width: min(900px, 92vw);
          max-height: 85vh;
          overflow-y: auto;
          backdrop-filter: blur(12px);
          box-sizing: border-box;
        }
        @media (max-width: 480px) {
          .demos-modal-inner { padding: 24px 18px; border-radius: 16px; }
          .demos-phase-dots  { gap: 6px !important; }
          .demos-phase-dot   { width: 32px !important; height: 32px !important; font-size: 11px !important; }
        }
      `}</style>

      {/* ── Three.js Canvas ───────────────────────────────────── */}
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ position: 'absolute', inset: 0, zIndex: 1 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, isMobile ? 1 : 1.5]}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10,  10,  10]} intensity={0.5} color="#00C8FF" />
          <pointLight position={[-10,-10, -10]} intensity={0.3} color="#0057FF" />
          <CameraRig />
          <Stars radius={80} depth={50} count={isMobile ? 1200 : 3000} factor={4} saturation={0} fade speed={0.5} />
          <ParticleField isMobile={isMobile} />
          <MorphingBlob />
          <FloatingOrb position={[-4,  2,   -1]} color="#00C8FF" size={0.12} speed={1.2} />
          <FloatingOrb position={[ 4, -1.5, -2]} color="#0057FF" size={0.18} speed={1.8} />
          <FloatingOrb position={[-3, -2.5,  1]} color="#00C8FF" size={0.08} speed={2.2} />
          <FloatingOrb position={[ 5,  2.5, -3]} color="#FF3B30" size={0.10} speed={1.4} />
          <FloatingOrb position={[ 2,  3,   -1]} color="#00C8FF" size={0.06} speed={2.5} />
          <FloatingOrb position={[-5,  0,   -3]} color="#0057FF" size={0.14} speed={1.6} />

          {/* ✅ FIX 3: 3D cards ONLY on desktop — they cause text bleed on mobile */}
          {!isMobile && (
            <>
              <FloatingCard radius={5}   speed={0.40} height={ 1.5} offset={0}  value="< 200ms"    label="Detection Time" />
              <FloatingCard radius={6}   speed={0.30} height={ 1.8} offset={2}  value="100%"        label="Offline Ready" />
              <FloatingCard radius={4.5} speed={0.50} height={-2.0} offset={4}  value="AI Security" label="Understands & Responds" />
              <FloatingCard radius={5.5} speed={0.35} height={-1.5} offset={6}  value="AI"          label="Security That Thinks" />
              <FloatingCard radius={6.5} speed={0.25} height={ 2.0} offset={8}  value="24/7"        label="Always Vigilant" />
              <FloatingCard radius={4}   speed={0.45} height={-1.0} offset={10} value="Privacy"     label="Encrypted & Local-First" />
            </>
          )}
        </Suspense>
      </Canvas>

      {/* ── Grid overlay ─────────────────────────────────────── */}
      <GridOverlay />

      {/* ── Ambient blobs ────────────────────────────────────── */}
      <div style={{
        position: 'absolute', top: '-100px', left: '-100px',
        width: '600px', height: '600px', borderRadius: '50%',
        background: 'rgba(0,87,255,0.12)',
        filter: 'blur(150px)', zIndex: 0, pointerEvents: 'none',
      }}/>
      <div style={{
        position: 'absolute', bottom: '-80px', right: '-80px',
        width: '500px', height: '400px', borderRadius: '50%',
        background: 'rgba(0,200,255,0.07)',
        filter: 'blur(120px)', zIndex: 0, pointerEvents: 'none',
      }}/>
      <div style={{
        position: 'absolute', top: '60px', right: '10%',
        width: '300px', height: '300px', borderRadius: '50%',
        background: 'rgba(255,59,48,0.05)',
        filter: 'blur(100px)', zIndex: 0, pointerEvents: 'none',
      }}/>

      {/* ── Bottom fade ──────────────────────────────────────── */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%',
        background: 'linear-gradient(to bottom, transparent, #000)',
        zIndex: 2, pointerEvents: 'none',
      }}/>

      {/* ── HTML Content ─────────────────────────────────────── */}
      <div className="hero-content">

        {/* Creator Attribution */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '14px',
            fontWeight: 600,
            marginBottom: '32px',
            color: 'rgba(255,255,255,0.7)',
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
          }}
        >
          
        </motion.h1>

        {/* Top badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ marginBottom: 24 }}
        >
          <div className="label-pill">
            <span className="pulse-dot" />
            <span className="hero-badge-text">See everything and miss nothing</span>
          </div>
        </motion.div>

        {/* ✅ FIX 1 + FIX 2: Headline with proper mobile font sizes */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 900,
            lineHeight: 1.1,
            width: '100%',
            maxWidth: 820,
            marginBottom: 18,
            letterSpacing: '2px',
          }}
        >
          {/* "Custos" — big 3D text shadow effect */}
          <span className="hero-title-custos">Custos</span>

          {/* ✅ "From Homes to Nations" — no nowrap, clamp scales down properly */}
          <span className="hero-title-sub">
            From Homes to Nations
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 'clamp(14px, 2vw, 18px)',
            fontWeight: 500,
            color: 'rgba(255,255,255,0.82)',
            maxWidth: 520,
            lineHeight: 1.75,
            marginBottom: 16,
            textShadow: '0 1px 20px rgba(0,0,0,0.8)',
          }}
        >
          Connect. Upgrade. Transform any CCTV into an AI-powered security intelligence system.
        </motion.p>

        {/* Secondary badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          style={{ marginBottom: 36 }}
        >
          <div className="label-pill" style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>
            A security system that detects, understands, and responds
          </div>
        </motion.div>

        {/* ✅ FIX 3: CTA Buttons — stack on mobile, gap tighter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="hero-btns"
        >
          <button
            onClick={() => setShowDemos(!showDemos)}
            className="hero-btn"
            style={{
              borderRadius: 100,
              fontWeight: 600,
              background: 'rgba(0,200,255,0.18)',
              border: '1px solid rgba(0,200,255,0.5)',
              color: '#00C8FF',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontFamily: 'DM Sans, sans-serif',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,200,255,0.28)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(0,200,255,0.25)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,200,255,0.18)'; e.currentTarget.style.boxShadow = 'none' }}
          >
            View Demos
          </button>

          <a
            href="https://wa.me/917416636417?text=Hi%2C%20I%20want%20to%20know%20more%20about%20Custos!"
            target="_blank" rel="noopener noreferrer"
            className="btn-primary hero-btn"
            style={{
              borderRadius: 100, fontWeight: 600,
              textDecoration: 'none', display: 'inline-block',
            }}
          >
            Explore the System
          </a>

          <a
            href="#how-it-works"
            className="btn-secondary hero-btn"
            style={{
              borderRadius: 100,
              textDecoration: 'none', display: 'inline-block',
            }}
          >
            See How It Works
          </a>
        </motion.div>

        {/* ── Mobile stat chips — only shown on mobile instead of 3D cards ── */}
        {isMobile && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            style={{
              display: 'flex', gap: 8, flexWrap: 'wrap',
              justifyContent: 'center', marginTop: 24,
            }}
          >
            {[
              { v: '< 200ms', l: 'Detection' },
              { v: '100%',    l: 'Offline'   },
              { v: '24/7',    l: 'Always On' },
              { v: '6+',      l: 'Threats'   },
            ].map((s, i) => (
              <div key={i} style={{
                background: 'rgba(0,200,255,0.08)',
                border: '1px solid rgba(0,200,255,0.22)',
                borderRadius: 100, padding: '6px 14px',
                display: 'flex', alignItems: 'center', gap: 6,
              }}>
                <span style={{
                  fontFamily: 'Syne, sans-serif', fontWeight: 800,
                  fontSize: 13, color: '#00C8FF',
                }}>
                  {s.v}
                </span>
                <span style={{
                  fontFamily: 'DM Sans', fontSize: 10,
                  color: 'rgba(255,255,255,0.45)', letterSpacing: '0.5px',
                }}>
                  {s.l}
                </span>
              </div>
            ))}
          </motion.div>
        )}

        {/* Scroll indicator — hidden on mobile to avoid bottom nav overlap */}
        {!isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            style={{
              position: 'absolute', bottom: 28,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: 8,
            }}
          >
            <span style={{
              fontFamily: 'DM Sans', fontSize: 11,
              color: 'rgba(255,255,255,0.3)',
              letterSpacing: '2px', textTransform: 'uppercase',
            }}>
              Scroll
            </span>
            <div style={{
              width: 1, height: 40,
              background: 'linear-gradient(to bottom, rgba(0,200,255,0.6), transparent)',
              animation: 'pulse-dot 2s infinite',
            }}/>
          </motion.div>
        )}
      </div>

      {/* ── Demos Modal ────────────────────────────────────────── */}
      <AnimatePresence>
        {showDemos && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowDemos(false)}
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(0,0,0,0.85)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              zIndex: 1000, backdropFilter: 'blur(6px)',
              padding: '16px', boxSizing: 'border-box',
            }}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1,    opacity: 1, y: 0  }}
              exit={{    scale: 0.94, opacity: 0, y: 10 }}
              transition={{ type: 'spring', stiffness: 280, damping: 30 }}
              onClick={e => e.stopPropagation()}
              className="demos-modal-inner"
            >
              {/* Modal header */}
              <div style={{
                display: 'flex', justifyContent: 'space-between',
                alignItems: 'center', marginBottom: 28,
              }}>
                <div>
                  <h2 style={{
                    fontFamily: 'Syne, sans-serif', fontWeight: 800,
                    fontSize: 'clamp(20px, 4vw, 28px)',
                    color: '#fff', margin: 0, marginBottom: 4,
                  }}>
                    Development Roadmap
                  </h2>
                  <p style={{
                    fontFamily: 'DM Sans', fontSize: 13,
                    color: 'rgba(255,255,255,0.4)', margin: 0,
                  }}>
                    {phases.length} phases · Click a phase to explore
                  </p>
                </div>
                <button
                  onClick={() => setShowDemos(false)}
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    color: '#fff', fontSize: 18,
                    cursor: 'pointer', width: 38, height: 38,
                    borderRadius: '50%', flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
                >
                  ✕
                </button>
              </div>

              {/* Phase dot selector */}
              <div className="demos-phase-dots" style={{
                display: 'flex', justifyContent: 'space-between',
                gap: 8, marginBottom: 28, flexWrap: 'wrap',
              }}>
                {phases.map((phase, idx) => (
                  <button
                    key={phase.id}
                    className="demos-phase-dot"
                    onClick={() => setCurrentPhase(idx)}
                    style={{
                      width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
                      background: idx === currentPhase
                        ? 'linear-gradient(135deg, #00C8FF, #0057FF)'
                        : 'rgba(0,200,255,0.12)',
                      border: `2px solid ${idx === currentPhase ? '#00C8FF' : 'rgba(0,200,255,0.25)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer', transition: 'all 0.25s ease',
                      fontSize: 12, fontWeight: 800,
                      color: idx === currentPhase ? '#000' : '#00C8FF',
                      boxShadow: idx === currentPhase ? '0 0 16px rgba(0,200,255,0.4)' : 'none',
                    }}
                  >
                    {phase.id}
                  </button>
                ))}
              </div>

              {/* Progress line */}
              <div style={{
                height: 2, borderRadius: 2,
                background: 'rgba(255,255,255,0.06)',
                marginBottom: 24, overflow: 'hidden',
              }}>
                <motion.div
                  animate={{ width: `${((currentPhase + 1) / phases.length) * 100}%` }}
                  transition={{ duration: 0.4, ease: [.4,0,.2,1] }}
                  style={{
                    height: '100%', borderRadius: 2,
                    background: 'linear-gradient(90deg, #00C8FF, #0057FF)',
                    boxShadow: '0 0 8px rgba(0,200,255,0.6)',
                  }}
                />
              </div>

              {/* Phase content card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPhase}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0  }}
                  exit={{   opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  style={{
                    background: 'rgba(0,200,255,0.05)',
                    border: '1px solid rgba(0,200,255,0.18)',
                    borderRadius: 16, padding: 'clamp(20px, 3vw, 28px)',
                    marginBottom: 20,
                  }}
                >
                  <div style={{
                    display: 'flex', alignItems: 'center',
                    gap: 16, marginBottom: 16, flexWrap: 'wrap',
                  }}>
                    <div style={{
                      width: 56, height: 56, borderRadius: '50%',
                      background: 'rgba(0,200,255,0.15)',
                      border: '2px solid rgba(0,200,255,0.4)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 24, flexShrink: 0,
                    }}>
                      {phases[currentPhase].icon}
                    </div>
                    <div>
                      <h3 style={{
                        fontFamily: 'Syne, sans-serif', fontSize: 'clamp(18px,3vw,22px)',
                        fontWeight: 800, color: '#fff', margin: 0, marginBottom: 4,
                      }}>
                        {phases[currentPhase].title}
                      </h3>
                      <p style={{
                        fontFamily: 'DM Sans', fontSize: 13,
                        color: '#00C8FF', margin: 0, fontWeight: 600,
                      }}>
                        {phases[currentPhase].subtitle}
                      </p>
                    </div>
                  </div>

                  <p style={{
                    fontFamily: 'DM Sans', fontSize: 'clamp(13px,1.5vw,15px)',
                    color: 'rgba(255,255,255,0.7)', lineHeight: 1.7,
                    marginBottom: 16,
                  }}>
                    {phases[currentPhase].desc}
                  </p>

                  <div style={{
                    background: 'rgba(0,200,255,0.08)',
                    border: '1px dashed rgba(0,200,255,0.35)',
                    borderRadius: 8, padding: '12px 16px',
                    textAlign: 'center',
                  }}>
                    <p style={{
                      fontFamily: 'DM Sans', fontSize: 13,
                      color: 'rgba(0,200,255,0.65)', margin: 0,
                    }}>
                      🔗 Demo link coming soon
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Nav buttons */}
              <div style={{
                display: 'flex', gap: 12,
                justifyContent: 'space-between',
                flexWrap: 'wrap',
              }}>
                <button
                  onClick={() => setCurrentPhase(p => Math.max(0, p - 1))}
                  disabled={currentPhase === 0}
                  style={{
                    flex: 1, minWidth: 100,
                    padding: '11px 20px', borderRadius: 10,
                    background: currentPhase === 0 ? 'rgba(255,255,255,0.04)' : 'rgba(0,200,255,0.12)',
                    border: `1px solid ${currentPhase === 0 ? 'rgba(255,255,255,0.08)' : 'rgba(0,200,255,0.3)'}`,
                    color: currentPhase === 0 ? 'rgba(255,255,255,0.25)' : '#00C8FF',
                    cursor: currentPhase === 0 ? 'not-allowed' : 'pointer',
                    fontFamily: 'DM Sans', fontWeight: 600, fontSize: 14,
                    transition: 'all 0.2s',
                  }}
                >
                  ← Previous
                </button>
                <button
                  onClick={() => setCurrentPhase(p => Math.min(phases.length - 1, p + 1))}
                  disabled={currentPhase === phases.length - 1}
                  style={{
                    flex: 1, minWidth: 100,
                    padding: '11px 20px', borderRadius: 10,
                    background: currentPhase === phases.length - 1 ? 'rgba(255,255,255,0.04)' : 'rgba(0,200,255,0.12)',
                    border: `1px solid ${currentPhase === phases.length - 1 ? 'rgba(255,255,255,0.08)' : 'rgba(0,200,255,0.3)'}`,
                    color: currentPhase === phases.length - 1 ? 'rgba(255,255,255,0.25)' : '#00C8FF',
                    cursor: currentPhase === phases.length - 1 ? 'not-allowed' : 'pointer',
                    fontFamily: 'DM Sans', fontWeight: 600, fontSize: 14,
                    transition: 'all 0.2s',
                  }}
                >
                  Next →
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}