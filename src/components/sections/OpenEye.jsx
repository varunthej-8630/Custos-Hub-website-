import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

// ── Globe node positions (lat/lon → 3D sphere) ──────────────
function latLonToVec3(lat, lon, radius = 2.2) {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lon + 180) * (Math.PI / 180)
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  )
}

const CITIES = [
  [28.6, 77.2], [19.1, 72.9], [13.1, 80.3], [22.6, 88.4], [17.4, 78.5],
  [12.9, 77.6], [23.0, 72.6], [26.9, 75.8], [21.2, 81.4], [30.7, 76.8],
  [25.6, 85.1], [27.2, 78.0], [18.5, 73.9], [11.0, 77.0], [20.5, 85.8],
]

function GlobeScene() {
  const globeRef = useRef()
  const nodesRef = useRef([])
  const linesRef = useRef([])

  const nodePositions = useMemo(() => CITIES.map(([lat, lon]) => latLonToVec3(lat, lon)), [])

  useFrame((state) => {
    if (globeRef.current) {
      globeRef.current.rotation.y = state.clock.elapsedTime * 0.12
    }
  })

  return (
    <group ref={globeRef}>
      {/* Globe wireframe sphere */}
      <mesh>
        <sphereGeometry args={[2.2, 36, 36]} />
        <meshBasicMaterial color="#00C8FF" wireframe transparent opacity={0.06} />
      </mesh>

      {/* Inner glow sphere */}
      <mesh>
        <sphereGeometry args={[2.1, 16, 16]} />
        <meshBasicMaterial color="#0057FF" transparent opacity={0.03} />
      </mesh>

      {/* City nodes */}
      {nodePositions.map((pos, i) => (
        <Float key={i} speed={1} floatIntensity={0.05} position={[pos.x, pos.y, pos.z]}>
          <mesh>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshBasicMaterial color="#00C8FF" />
          </mesh>
          {/* Pulse ring */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.07, 0.12, 16]} />
            <meshBasicMaterial
              color="#00C8FF" transparent
              opacity={0.4 + Math.sin(i) * 0.3}
              side={THREE.DoubleSide}
            />
          </mesh>
        </Float>
      ))}

      {/* Connection lines between nearby cities */}
      {nodePositions.slice(0, 8).map((pos, i) => {
        const nextPos = nodePositions[(i + 3) % nodePositions.length]
        const points = [pos, nextPos]
        const geo = new THREE.BufferGeometry().setFromPoints(points)
        return (
          <line key={i} geometry={geo}>
            <lineBasicMaterial color="#00C8FF" transparent opacity={0.15} />
          </line>
        )
      })}
    </group>
  )
}

const applications = [
  { icon: '🏘️', title: 'Residential Networks', desc: 'Neighborhood-level shared awareness' },
  { icon: '🏙️', title: 'Urban Infrastructure', desc: 'Smart city security layer' },
  { icon: '🛡️', title: 'National Security', desc: 'Defense & critical infrastructure support' },
]

export default function OpenEye() {
  return (
    <section className="section-wrapper" id="vision" style={{ padding: '120px 0', position: 'relative', background: '#000' }}>
      {/* Deep blue ambient */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '1000px', height: '1000px', borderRadius: '50%',
        background: 'rgba(0,87,255,0.08)',
        filter: 'blur(200px)', pointerEvents: 'none'
      }} />

      <div className="section">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div className="reveal" style={{ marginBottom: '20px' }}>
            <div className="label-pill" style={{
              borderColor: 'rgba(255,200,0,0.3)',
              background: 'rgba(255,200,0,0.06)',
              color: 'rgba(255,200,0,0.8)'
            }}>
              FUTURE VISION
            </div>
          </div>
          <h2 className="reveal" style={{
            fontFamily: 'Crimson Text, serif', fontWeight: 700,
            fontSize: 'clamp(40px, 7vw, 80px)', color: '#fff',
            marginBottom: '20px', lineHeight: 1.0, letterSpacing: '3px'
          }}>
            Open Eye Network.
          </h2>
          <p className="reveal" style={{
            fontFamily: 'DM Sans', fontSize: '17px',
            color: 'rgba(255,255,255,0.6)', maxWidth: '640px',
            margin: '0 auto', lineHeight: 1.75
          }}>
            A distributed intelligence network connecting homes, cities, and critical infrastructure —
            creating a unified layer of awareness that can assist national security, disaster response,
            and missing-person searches.
          </p>
        </div>

        {/* 3D Globe */}
        <div className="reveal openeye-globe" style={{
          height: '420px', maxWidth: '700px', margin: '0 auto 56px',
          position: 'relative'
        }}>
          <Canvas camera={{ position: [0, 0, 5.5], fov: 50 }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.3} />
              <pointLight position={[5, 5, 5]} intensity={0.8} color="#00C8FF" />
              <pointLight position={[-5, -5, -5]} intensity={0.4} color="#0057FF" />
              <GlobeScene />
            </Suspense>
          </Canvas>

          {/* Glow overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse at center, transparent 40%, #000 90%)',
            pointerEvents: 'none'
          }} />
        </div>

        {/* Application cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '20px', marginBottom: '40px'
        }}>
          {applications.map((app, i) => (
            <div key={i} className="glass-card reveal" style={{ padding: '28px', textAlign: 'center' }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>{app.icon}</div>
              <h3 style={{
                fontFamily: 'Syne, sans-serif', fontSize: '17px', fontWeight: 700,
                color: '#fff', marginBottom: '8px'
              }}>{app.title}</h3>
              <p style={{
                fontFamily: 'DM Sans', fontSize: '13px',
                color: 'rgba(255,255,255,0.5)', lineHeight: 1.6
              }}>{app.desc}</p>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="reveal" style={{
          fontFamily: 'DM Sans', fontSize: '12px',
          color: 'rgba(255,255,255,0.25)', textAlign: 'center',
          maxWidth: '600px', margin: '0 auto'
        }}>
          The Open Eye Network is Custos's long-term platform vision. Designed with privacy-first
          architecture and user-controlled data governance.
        </p>
      </div>
    </section>
  )
}