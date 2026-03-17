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
      </main>
      <Footer />
    </>
  )
}
