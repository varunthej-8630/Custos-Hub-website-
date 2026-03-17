import { useRef, useMemo, Suspense, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Html, Stars } from '@react-three/drei'
import * as THREE from 'three'
import { motion } from 'framer-motion'

// ─── Particle Field ──────────────────────────────────────────
function ParticleField() {
  const mesh = useRef()
  const count = 4000

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 40
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30
      const t = Math.random()
      colors[i * 3]     = t * 0
      colors[i * 3 + 1] = t * 0.78 + (1 - t) * 0.34
      colors[i * 3 + 2] = 1
    }
    return [positions, colors]
  }, [])

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.elapsedTime * 0.03
      mesh.current.rotation.x = state.clock.elapsedTime * 0.01
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
      {/* Outer shell */}
      <mesh position={[0, 0, -2]}>
        <sphereGeometry args={[2.5, 128, 128]} />
        <MeshDistortMaterial
          color="#00C8FF"
          distort={0.45}
          speed={1.5}
          transparent
          opacity={0.08}
          roughness={0}
          metalness={0.1}
        />
      </mesh>
      {/* Inner core glow */}
      <mesh position={[0, 0, -2]}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <MeshDistortMaterial
          color="#0057FF"
          distort={0.3}
          speed={2}
          transparent
          opacity={0.06}
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
          color={color}
          emissive={color}
          emissiveIntensity={2}
          transparent
          opacity={0.85}
        />
      </mesh>
    </Float>
  )
}

// ─── Orbital Floating Glass Cards (V2 behaviour) ──────────────
function FloatingCard({ radius = 5, speed = 0.4, height = 0, offset = 0, value, label }) {
  const ref = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed + offset
    const targetX = Math.cos(t) * radius
    const targetZ = Math.sin(t) * radius

    ref.current.position.x += (targetX - ref.current.position.x) * 0.05
    ref.current.position.z += (targetZ - ref.current.position.z) * 0.05
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
    const target = new THREE.Vector3(
      mouse.current.x * 1.5,
      mouse.current.y * 0.8,
      5
    )
    camera.position.lerp(target, 0.02)
    camera.lookAt(0, 0, 0)
  })

  if (typeof window !== 'undefined') {
    window.onmousemove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth  - 0.5) * 2
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2
    }
  }

  return null
}

// ─── Grid Lines (SVG overlay) ─────────────────────────────────
function GridOverlay() {
  return (
    <svg
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        opacity: 0.4, pointerEvents: 'none', zIndex: 1,
      }}
    >
      <defs>
        <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
          <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(0,200,255,0.06)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  )
}

// ─── Hero Section ─────────────────────────────────────────────
export default function Hero() {
  const [showDemos, setShowDemos] = useState(false)
  const [currentPhase, setCurrentPhase] = useState(0)

  const phases = [
    { id: 1, title: 'Phase 1', subtitle: 'Prototype & Validation', desc: 'Core AI hub, retrofit module, basic detection suite' },
    { id: 2, title: 'Phase 2', subtitle: 'Residential Deployment', desc: 'Homes, apartments, small businesses' },
    { id: 3, title: 'Phase 3', subtitle: 'Platform Expansion', desc: 'Elder care, analytics, advanced escalation modes' },
    { id: 4, title: 'Phase 4', subtitle: 'Open Eye Network', desc: 'City-scale distributed intelligence' },
    { id: 5, title: 'Phase 5', subtitle: 'Advanced Features', desc: 'Multi-protocol communication, edge processing' },
    { id: 6, title: 'Phase 6', subtitle: 'Global Scale', desc: 'International deployment, enterprise solutions' },
  ]

  return (
    <section
      id="hero"
      style={{ position: 'relative', height: '100vh', overflow: 'hidden', background: '#000' }}
    >

      {/* ── Three.js Canvas ── */}
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ position: 'absolute', inset: 0, zIndex: 1 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10,  10,  10]} intensity={0.5} color="#00C8FF" />
          <pointLight position={[-10, -10, -10]} intensity={0.3} color="#0057FF" />

          <CameraRig />
          <Stars radius={80} depth={50} count={3000} factor={4} saturation={0} fade speed={0.5} />
          <ParticleField />
          <MorphingBlob />

          {/* Floating ambient orbs */}
          <FloatingOrb position={[-4,  2,   -1]} color="#00C8FF" size={0.12} speed={1.2} />
          <FloatingOrb position={[ 4, -1.5, -2]} color="#0057FF" size={0.18} speed={1.8} />
          <FloatingOrb position={[-3, -2.5,  1]} color="#00C8FF" size={0.08} speed={2.2} />
          <FloatingOrb position={[ 5,  2.5, -3]} color="#FF3B30" size={0.10} speed={1.4} />
          <FloatingOrb position={[ 2,  3,   -1]} color="#00C8FF" size={0.06} speed={2.5} />
          <FloatingOrb position={[-5,  0,   -3]} color="#0057FF" size={0.14} speed={1.6} />

          {/* Orbital glass cards */}
          <FloatingCard radius={5}   speed={0.40} height={ 1.5} offset={0} value="< 200ms"    label="Detection Time" />
          <FloatingCard radius={6}   speed={0.30} height={ 1.8} offset={2} value="100%"        label="Offline Ready" />
          <FloatingCard radius={4.5} speed={0.50} height={-2.0} offset={4} value="AI Security" label="Understands & Responds" />
          <FloatingCard radius={5.5} speed={0.35} height={-1.5} offset={6} value="AI"          label="Security That Thinks. Not Just Records." />
          <FloatingCard radius={6.5} speed={0.25} height={ 2.0} offset={8} value="24/7"        label="Always Vigilant, Never Tired" />
          <FloatingCard radius={4}   speed={0.45} height={-1.0} offset={10} value="Privacy"     label="Encrypted & Local-First" />
          
        </Suspense>
      </Canvas>

      {/* ── Grid overlay ── */}
      <GridOverlay />

      {/* ── Ambient glow blobs ── */}
      <div style={{
        position: 'absolute', top: '-100px', left: '-100px',
        width: '600px', height: '600px', borderRadius: '50%',
        background: 'rgba(0,87,255,0.12)',
        filter: 'blur(150px)', zIndex: 0, pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-80px', right: '-80px',
        width: '500px', height: '400px', borderRadius: '50%',
        background: 'rgba(0,200,255,0.07)',
        filter: 'blur(120px)', zIndex: 0, pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: '60px', right: '10%',
        width: '300px', height: '300px', borderRadius: '50%',
        background: 'rgba(255,59,48,0.05)',
        filter: 'blur(100px)', zIndex: 0, pointerEvents: 'none',
      }} />

      {/* ── Bottom fade ── */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: '40%',
        background: 'linear-gradient(to bottom, transparent, #000)',
        zIndex: 2, pointerEvents: 'none',
      }} />

      {/* ── HTML Content ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 3,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '100px 24px 60px',
        textAlign: 'center',
      }}>

        {/* Top badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ marginBottom: '28px' }}
        >
          <div
            className="label-pill"
            style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '2px', color: 'rgba(255,255,255,0.9)' }}
          >
            <span className="pulse-dot" />
            See everything and miss nothing
          </div>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 900,
            fontSize: 'clamp(48px, 6.5vw, 80px)',
            lineHeight: 1.15,
            maxWidth: '900px',
            marginBottom: '20px',
            letterSpacing: '0.5px',
          }}
        >
          <span style={{ fontFamily: 'Oswald, sans-serif', color: '#FFFFFF', fontSize: 'clamp(60px, 8.5vw, 110px)', display: 'block', fontWeight: 800, letterSpacing: '4px', lineHeight: 1.05, textShadow: '6px 6px 0px rgba(0,200,255,1), 12px 12px 0px rgba(255,59,48,0.6), 18px 18px 30px rgba(0,0,0,1)', filter: 'drop-shadow(0 0 30px rgba(0,200,255,0.8)) drop-shadow(2px 2px 8px rgba(255,59,48,0.5))' }}>Custos</span>
          <span style={{
            background: 'linear-gradient(90deg, #FFFFFF 0%, #00C8FF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            whiteSpace: 'nowrap',
          }}>
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
            fontSize: '18px',
            fontWeight: 500,
            color: 'rgba(255,255,255,0.82)',
            maxWidth: '520px',
            lineHeight: 1.75,
            marginBottom: '16px',
            textShadow: '0 1px 20px rgba(0,0,0,0.8)',
            letterSpacing: '0.1px',
          }}
        >
          Don't replace — make an upgrade.
        </motion.p>

        {/* Secondary badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          style={{ marginBottom: '40px' }}
        >
          <div
            className="label-pill"
            style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '2px', color: 'rgba(255,255,255,0.6)' }}
          >
            A security system that detects, understands, and responds
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}
        >
          <button
            onClick={() => setShowDemos(!showDemos)}
            style={{
              borderRadius: '100px', padding: '14px 32px',
              fontSize: '15px', fontWeight: 600,
              textDecoration: 'none', display: 'inline-block',
              background: 'rgba(0,200,255,0.2)',
              border: '1px solid rgba(0,200,255,0.5)',
              color: '#00C8FF',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(0,200,255,0.3)'
              e.target.style.borderColor = 'rgba(0,200,255,0.8)'
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(0,200,255,0.2)'
              e.target.style.borderColor = 'rgba(0,200,255,0.5)'
            }}
          >
            View Demos
          </button>
          <a
            href="https://wa.me/917416636417?text=Hi%2C%20I%20want%20to%20know%20more%20about%20Custos!"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{
              borderRadius: '100px', padding: '14px 32px',
              fontSize: '15px', fontWeight: 600,
              textDecoration: 'none', display: 'inline-block',
            }}
          >
            Explore the System
          </a>
          <a
            href="#how-it-works"
            className="btn-secondary"
            style={{
              borderRadius: '100px', padding: '14px 32px',
              fontSize: '15px', textDecoration: 'none', display: 'inline-block',
            }}
          >
            See How It Works
          </a>
        </motion.div>

        {/* Demos Modal */}
        {showDemos && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowDemos(false)}
            style={{
              position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              zIndex: 1000, backdropFilter: 'blur(4px)',
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: 'linear-gradient(135deg, rgba(0,20,40,0.95), rgba(0,40,80,0.9))',
                border: '1px solid rgba(0,200,255,0.3)',
                borderRadius: '20px',
                padding: '40px',
                maxWidth: '900px',
                width: '90%',
                maxHeight: '80vh',
                overflow: 'auto',
                backdropFilter: 'blur(12px)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 900, fontSize: '32px', color: '#fff', margin: 0 }}>
                  Development Roadmap
                </h2>
                <button
                  onClick={() => setShowDemos(false)}
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    border: 'none',
                    color: '#fff',
                    fontSize: '24px',
                    cursor: 'pointer',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  ✕
                </button>
              </div>

              {/* Timeline slider */}
              <div style={{ marginBottom: '40px' }}>
                {/* Timeline dots */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', gap: '8px' }}>
                  {phases.map((phase, idx) => (
                    <div
                      key={phase.id}
                      onClick={() => setCurrentPhase(idx)}
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: idx === currentPhase ? '#00C8FF' : 'rgba(0,200,255,0.2)',
                        border: `2px solid ${idx === currentPhase ? '#00C8FF' : 'rgba(0,200,255,0.3)'}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        fontSize: '12px',
                        fontWeight: 700,
                        color: idx === currentPhase ? '#000' : '#00C8FF',
                      }}
                    >
                      {phase.id}
                    </div>
                  ))}
                </div>

                {/* Connecting line */}
                <div style={{
                  position: 'relative',
                  height: '2px',
                  background: 'linear-gradient(90deg, rgba(0,200,255,0.2), rgba(0,200,255,0.5))',
                  marginTop: '-22px'
                }} />
              </div>

              {/* Phase content */}
              <motion.div
                key={currentPhase}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  background: 'rgba(0,200,255,0.05)',
                  border: '1px solid rgba(0,200,255,0.2)',
                  borderRadius: '16px',
                  padding: '32px',
                  marginBottom: '24px',
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  marginBottom: '16px'
                }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'rgba(0,200,255,0.2)',
                    border: '2px solid #00C8FF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    fontWeight: 900,
                    color: '#00C8FF',
                  }}>
                    {phases[currentPhase].id}
                  </div>
                  <div>
                    <h3 style={{
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '24px',
                      fontWeight: 800,
                      color: '#fff',
                      margin: 0,
                      marginBottom: '4px'
                    }}>
                      {phases[currentPhase].title}
                    </h3>
                    <p style={{
                      fontFamily: 'DM Sans, sans-serif',
                      fontSize: '14px',
                      color: '#00C8FF',
                      margin: 0,
                      fontWeight: 600,
                    }}>
                      {phases[currentPhase].subtitle}
                    </p>
                  </div>
                </div>

                <p style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '15px',
                  color: 'rgba(255,255,255,0.7)',
                  lineHeight: 1.6,
                  marginBottom: '20px',
                }}>
                  {phases[currentPhase].desc}
                </p>

                <div style={{
                  background: 'rgba(0,200,255,0.1)',
                  border: '1px dashed rgba(0,200,255,0.4)',
                  borderRadius: '8px',
                  padding: '16px',
                  textAlign: 'center',
                }}>
                  <p style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '14px',
                    color: 'rgba(0,200,255,0.7)',
                    margin: 0,
                  }}>
                    🔗 Demo link coming soon
                  </p>
                </div>
              </motion.div>

              {/* Navigation buttons */}
              <div style={{
                display: 'flex',
                gap: '16px',
                justifyContent: 'center',
              }}>
                <button
                  onClick={() => setCurrentPhase(Math.max(0, currentPhase - 1))}
                  disabled={currentPhase === 0}
                  style={{
                    padding: '12px 24px',
                    borderRadius: '8px',
                    background: currentPhase === 0 ? 'rgba(0,200,255,0.1)' : 'rgba(0,200,255,0.2)',
                    border: '1px solid rgba(0,200,255,0.3)',
                    color: '#00C8FF',
                    cursor: currentPhase === 0 ? 'not-allowed' : 'pointer',
                    fontWeight: 600,
                    transition: 'all 0.3s ease',
                  }}
                >
                  ← Previous
                </button>
                <button
                  onClick={() => setCurrentPhase(Math.min(phases.length - 1, currentPhase + 1))}
                  disabled={currentPhase === phases.length - 1}
                  style={{
                    padding: '12px 24px',
                    borderRadius: '8px',
                    background: currentPhase === phases.length - 1 ? 'rgba(0,200,255,0.1)' : 'rgba(0,200,255,0.2)',
                    border: '1px solid rgba(0,200,255,0.3)',
                    color: '#00C8FF',
                    cursor: currentPhase === phases.length - 1 ? 'not-allowed' : 'pointer',
                    fontWeight: 600,
                    transition: 'all 0.3s ease',
                  }}
                >
                  Next →
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          style={{
            position: 'absolute', bottom: '10px',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: '8px',
          }}
        >
          <span style={{
            fontFamily: 'DM Sans', fontSize: '11px',
            color: 'rgba(255,255,255,0.3)',
            letterSpacing: '2px', textTransform: 'uppercase',
          }}>
            Scroll
          </span>
          <div style={{
            width: '1px', height: '40px',
            background: 'linear-gradient(to bottom, rgba(0,200,255,0.6), transparent)',
            animation: 'pulse-dot 2s infinite',
          }} />
        </motion.div>
      </div>
    </section>
  )
}