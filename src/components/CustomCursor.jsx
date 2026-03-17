import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const trailRef = useRef(null)
  const pos = useRef({ x: 0, y: 0 })
  const trail = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const moveCursor = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX - 10}px`
        cursorRef.current.style.top = `${e.clientY - 10}px`
      }
    }

    let rafId
    const animateTrail = () => {
      trail.current.x += (pos.current.x - trail.current.x) * 0.18
      trail.current.y += (pos.current.y - trail.current.y) * 0.18
      if (trailRef.current) {
        trailRef.current.style.left = `${trail.current.x - 20}px`
        trailRef.current.style.top = `${trail.current.y - 20}px`
      }
      rafId = requestAnimationFrame(animateTrail)
    }

    const addHoverEffect = () => {
      document.querySelectorAll('a, button, .glass-card, .poll-card').forEach((el) => {
        el.addEventListener('mouseenter', () => {
          cursorRef.current?.classList.add('hover')
          trailRef.current?.classList.add('hover')
        })
        el.addEventListener('mouseleave', () => {
          cursorRef.current?.classList.remove('hover')
          trailRef.current?.classList.remove('hover')
        })
      })
    }

    window.addEventListener('mousemove', moveCursor)
    rafId = requestAnimationFrame(animateTrail)
    setTimeout(addHoverEffect, 1000)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <style>{`
        .cursor-dot {
          position: fixed;
          top: 0; left: 0;
          width: 10px; height: 10px;
          background: #00C8FF;
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          transition: width 0.15s, height 0.15s, background 0.15s;
          will-change: left, top;
          box-shadow: 0 0 8px #00C8FF;
        }
        .cursor-dot.hover {
          width: 18px; height: 18px;
          background: rgba(0,200,255,0.9);
        }
        .cursor-trail {
          position: fixed;
          top: 0; left: 0;
          width: 36px; height: 36px;
          border: 1px solid rgba(0,200,255,0.35);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9998;
          will-change: left, top;
          transition: width 0.15s, height 0.15s, border-color 0.15s;
        }
        .cursor-trail.hover {
          width: 52px; height: 52px;
          border-color: rgba(0,200,255,0.75);
          box-shadow: 0 0 16px rgba(0,200,255,0.15);
        }
      `}</style>
      <div ref={cursorRef} className="cursor-dot" />
      <div ref={trailRef} className="cursor-trail" />
    </>
  )
}
