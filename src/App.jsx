import { useEffect } from 'react'
import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Hero from './components/sections/Hero'
import Problem from './components/sections/Problem'
import Solution from './components/sections/Solution'
import Architecture from './components/sections/Architecture'
import AIIntelligence from './components/sections/AIIntelligence'
import Escalation from './components/sections/Escalation'
import Offline from './components/sections/Offline'
import ElderCare from './components/sections/ElderCare'
import Metrics from './components/sections/Metrics'
import OpenEye from './components/sections/OpenEye'
import Privacy from './components/sections/Privacy'
import Founder from './components/sections/Founder'
import Roadmap from './components/sections/Roadmap'
import Recruitment from './components/sections/Recruitment'
import Community from './components/sections/Community'
import FinalCTA from './components/sections/FinalCTA'

export default function App() {
  // Scroll reveal via Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, idx) => {
          if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay || 0
            setTimeout(() => {
              entry.target.classList.add('visible')
            }, delay)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -60px 0px' }
    )

    const addRevealToChildren = (selector) => {
      const sections = document.querySelectorAll(selector)
      sections.forEach((section) => {
        const children = section.querySelectorAll('.reveal')
        children.forEach((child, idx) => {
          child.dataset.delay = idx * 100
          observer.observe(child)
        })
      })
    }

    addRevealToChildren('section, .section-wrapper')

    // Also observe standalone reveal elements
    document.querySelectorAll('.reveal').forEach((el, idx) => {
      if (!el.dataset.delay) el.dataset.delay = 0
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* ── Global page background — visible through all sections ── */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        background: '#000',
      }}>
        {/* SVG grid */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 1 }}>
          <defs>
            <pattern id="global-grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(0,200,255,0.04)" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#global-grid)" />
        </svg>

        {/* Ambient blobs — slow drift */}
        <div style={{
          position: 'absolute', top: '5%', left: '-10%',
          width: '700px', height: '700px', borderRadius: '50%',
          background: 'rgba(0,87,255,0.07)', filter: 'blur(160px)',
          animation: 'drift1 20s ease-in-out infinite alternate',
        }} />
        <div style={{
          position: 'absolute', top: '40%', right: '-10%',
          width: '600px', height: '600px', borderRadius: '50%',
          background: 'rgba(0,200,255,0.05)', filter: 'blur(140px)',
          animation: 'drift2 25s ease-in-out infinite alternate',
        }} />
        <div style={{
          position: 'absolute', top: '70%', left: '20%',
          width: '500px', height: '500px', borderRadius: '50%',
          background: 'rgba(0,87,255,0.06)', filter: 'blur(120px)',
          animation: 'drift3 18s ease-in-out infinite alternate',
        }} />
        <div style={{
          position: 'absolute', top: '90%', right: '15%',
          width: '400px', height: '400px', borderRadius: '50%',
          background: 'rgba(0,200,255,0.04)', filter: 'blur(100px)',
          animation: 'drift1 22s ease-in-out infinite alternate-reverse',
        }} />

        {/* Dot noise */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.25) 1px, transparent 1px)',
          backgroundSize: '120px 120px',
          opacity: 0.15,
        }} />
      </div>

      <style>{`
        @keyframes drift1 { from { transform: translate(0,0); } to { transform: translate(60px, 80px); } }
        @keyframes drift2 { from { transform: translate(0,0); } to { transform: translate(-80px, 60px); } }
        @keyframes drift3 { from { transform: translate(0,0); } to { transform: translate(40px, -60px); } }
        /* All sections sit above the fixed background */
        main > * { position: relative; z-index: 1; }
        footer { position: relative; z-index: 1; }
        nav { z-index: 100; }
      `}</style>

      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <Architecture />
        <AIIntelligence />
        <Escalation />
        <Offline />
        <ElderCare />
        <Metrics />
        <OpenEye />
        <Privacy />
        <Founder />
        <Roadmap />
        <Recruitment />
        <Community />
        <FinalCTA />
        
        {/* ✨ New Sections */}
        <section className="section-wrapper" style={{ padding: '120px 0', textAlign: 'center', position: 'relative' }}>
          <div className="section">
            <div className="reveal" style={{ marginBottom: '20px' }}>
              <div className="label-pill">UNIVERSAL COMPATIBILITY</div>
            </div>
            <h2 className="reveal gradient-text" style={{
              fontFamily: 'Poppins, sans-serif', fontWeight: 700,
              fontSize: 'clamp(28px, 4.5vw, 56px)', marginBottom: '16px', letterSpacing: '0.5px'
            }}>
              Upgrade Any CCTV Into AI Intelligence
            </h2>
            <p className="reveal" style={{
              fontFamily: 'DM Sans, sans-serif', fontSize: '16px',
              color: 'rgba(255,255,255,0.6)', maxWidth: '500px', margin: '0 auto', letterSpacing: '0.3px', lineHeight: '1.6'
            }}>
              Custos connects to any CCTV or DVR and transforms it into an intelligent AI-powered system.
            </p>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="section-wrapper" style={{ padding: '120px 0', textAlign: 'center', position: 'relative' }}>
          <div className="section">
            <h2 className="reveal gradient-text" style={{
              fontFamily: 'Poppins, sans-serif', fontWeight: 700,
              fontSize: 'clamp(28px, 4.5vw, 56px)', marginBottom: '56px', letterSpacing: '0.5px'
            }}>
              Built for Every Environment
            </h2>
            <div className="reveal" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '24px',
              maxWidth: '900px',
              margin: '0 auto'
            }}>
              {['Homes', 'Elder Care', 'Businesses', 'Defense'].map((item, i) => (
                <div key={i} className="glass-card" style={{
                  padding: '28px',
                  border: '1px solid rgba(0,200,255,0.15)',
                  borderRadius: '16px',
                  textAlign: 'center'
                }}>
                  <h3 style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '18px',
                    fontWeight: 600,
                    color: '#00C8FF',
                    letterSpacing: '0.3px'
                  }}>
                    {item}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Join Network Section */}
        <section className="section-wrapper" style={{ padding: '120px 0', textAlign: 'center', position: 'relative' }}>
          <div className="section">
            <div className="reveal" style={{ marginBottom: '20px' }}>
              <div className="label-pill">EARLY ACCESS</div>
            </div>
            <h2 className="reveal gradient-text" style={{
              fontFamily: 'Poppins, sans-serif', fontWeight: 700,
              fontSize: 'clamp(28px, 4.5vw, 56px)', marginBottom: '32px', letterSpacing: '0.5px'
            }}>
              Join the Custos Intelligence Network
            </h2>
            <div className="reveal" style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'center',
              flexWrap: 'wrap',
              maxWidth: '500px',
              margin: '0 auto'
            }}>
              <input
                type="email"
                placeholder="Your Email"
                style={{
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: '1px solid rgba(0,200,255,0.3)',
                  background: 'rgba(0,200,255,0.05)',
                  color: '#fff',
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '14px',
                  flex: 1,
                  minWidth: '200px'
                }}
              />
              <button style={{
                padding: '12px 28px',
                borderRadius: '8px',
                border: 'none',
                background: 'linear-gradient(135deg, #0057FF, #00C8FF)',
                color: '#fff',
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 600,
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}>
                Join
              </button>
            </div>
          </div>
        </section>

        {/* Feedback Section */}
        <section className="section-wrapper" style={{ padding: '120px 0', textAlign: 'center', position: 'relative' }}>
          <div className="section">
            <h2 className="reveal gradient-text" style={{
              fontFamily: 'Poppins, sans-serif', fontWeight: 700,
              fontSize: 'clamp(28px, 4.5vw, 56px)', marginBottom: '32px', letterSpacing: '0.5px'
            }}>
              What Security Problems Do You Face?
            </h2>
            <div className="reveal" style={{
              maxWidth: '500px',
              margin: '0 auto'
            }}>
              <textarea
                placeholder="Share your feedback or security challenges..."
                style={{
                  width: '100%',
                  minHeight: '120px',
                  padding: '14px 16px',
                  borderRadius: '8px',
                  border: '1px solid rgba(0,200,255,0.3)',
                  background: 'rgba(0,200,255,0.05)',
                  color: '#fff',
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '14px',
                  resize: 'vertical',
                  outline: 'none'
                }}
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
