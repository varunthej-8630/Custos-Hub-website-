import { useState, useEffect, useRef, Fragment } from 'react'

/* ─── ALL nav links with EXACT section IDs ───────────────────
   Each id MUST match the id="" on the actual section element:
   problem       → Problem.jsx       <section id="problem"
   how-it-works  → Escalation.jsx    <section id="how-it-works"
   intelligence  → AIIntelligence    <section id="intelligence"
   ecosystem     → Offline.jsx       <section id="ecosystem"
   vision        → OpenEye.jsx       <section id="vision"
   founder       → Founder.jsx       <section id="founder"
   community     → Community.jsx     <section id="community"
   enrollment    → Recruitment.jsx   <section id="enrollment"
─────────────────────────────────────────────────────────────── */
const NAV_LINKS = [
  { id: 'problem',      label: 'The Problem'  },
  { id: 'how-it-works', label: 'How It Works' },
  { id: 'intelligence', label: 'Intelligence' },
  { id: 'ecosystem',    label: 'Ecosystem'    },
  { id: 'vision',       label: 'Vision'       },
  { id: 'founder',      label: 'Founder'      },
  { id: 'community',    label: 'Your Needs'   },
  { id: 'enrollment',   label: 'Enrollment'   },
]

const MOBILE_NAV = [
  { id: 'problem',      label: 'Problem'  },
  { id: 'how-it-works', label: 'Works'    },
  { id: 'intelligence', label: 'AI'       },
  { id: 'community',    label: 'Needs'    },
  { id: 'enrollment',   label: 'Enroll'   },
]

const SEP_BEFORE = [2, 4, 6]

export default function Navbar() {
  const [active,   setActive]   = useState('')
  const [hovered,  setHovered]  = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  /* ink blob tracking */
  const pillRef  = useRef(null)
  const btnRefs  = useRef({})
  const [ink, setInk] = useState({ x: 0, w: 0, show: false })

  /* scroll depth */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  /* ── Active section tracker ──────────────────────────────── */
  useEffect(() => {
    const observers = NAV_LINKS.map(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { threshold: 0.15, rootMargin: '-70px 0px -35% 0px' }
      )
      obs.observe(el)
      return obs
    }).filter(Boolean)
    return () => observers.forEach(o => o.disconnect())
  }, [])

  /* ── Ink blob follows hover / active ─────────────────────── */
  useEffect(() => {
    const targetId = hovered || active
    const btn  = targetId ? btnRefs.current[targetId] : null
    const pill = pillRef.current
    if (!btn || !pill) { setInk(s => ({ ...s, show: false })); return }
    const pr = pill.getBoundingClientRect()
    const br = btn.getBoundingClientRect()
    setInk({ x: br.left - pr.left, w: br.width, show: true })
  }, [hovered, active])

  /* ── Close dropdown outside click ───────────────────────── */
  useEffect(() => {
    if (!menuOpen) return
    const fn = e => {
      if (!e.target.closest('.nb-ham') && !e.target.closest('.nb-drop'))
        setMenuOpen(false)
    }
    document.addEventListener('mousedown', fn)
    return () => document.removeEventListener('mousedown', fn)
  }, [menuOpen])

  /* ── Scroll to section — guaranteed to work ─────────────── */
  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top, behavior: 'smooth' })
    }
    setMenuOpen(false)
  }

  return (
    <>
      <style>{`
        /* ── Glass surface ─────────────────────────────────── */
        .nb-glass {
          background      : rgba(8, 9, 20, ${scrolled ? '0.88' : '0.50'});
          border          : 1px solid rgba(255,255,255,0.08);
          backdrop-filter : saturate(180%) blur(32px);
          -webkit-backdrop-filter: saturate(180%) blur(32px);
          box-shadow      :
            0 2px 28px rgba(0,0,0,0.38),
            inset 0 1px 0 rgba(255,255,255,0.065),
            inset 0 -1px 0 rgba(0,0,0,0.18);
          transition: background .4s;
        }

        /* ── ONE unified header bar ────────────────────────── */
        .nb {
          position: fixed; top: 0; left: 0; right: 0;
          z-index: 1000;
          height: 60px;
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: 16px;
          padding: 0 20px;
          background: rgba(7,8,18, ${scrolled ? '0.88' : '0.50'});
          backdrop-filter: saturate(180%) blur(30px);
          -webkit-backdrop-filter: saturate(180%) blur(30px);
          border-bottom: 1px solid rgba(255,255,255,0.07);
          box-shadow: 0 1px 0 rgba(255,255,255,0.04), 0 4px 24px rgba(0,0,0,0.35);
          transition: background .4s;
        }
        .nb::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg,
            transparent 0%, rgba(0,200,255,.22) 30%,
            rgba(0,200,255,.22) 70%, transparent 100%);
        }

        /* ── Logo ──────────────────────────────────────────── */
        .nb-logo {
          display: flex; align-items: center; gap: 10px;
          text-decoration: none; flex-shrink: 0;
          cursor: pointer; padding: 6px 0;
          transition: opacity .2s;
        }
        .nb-logo:hover { opacity: .85; }
        .nb-logo-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: #00C8FF; position: relative; flex-shrink: 0;
          box-shadow: 0 0 8px #00C8FF, 0 0 16px rgba(0,200,255,.4);
          animation: nb-beacon 2.6s ease-in-out infinite;
        }
        .nb-logo-dot::after {
          content: ''; position: absolute; inset: -5px; border-radius: 50%;
          border: 1px solid rgba(0,200,255,0.3);
          animation: nb-ring 2.6s ease-in-out infinite;
        }
        @keyframes nb-beacon {
          0%,100%{ box-shadow:0 0 6px #00C8FF,0 0 12px rgba(0,200,255,.35) }
          50%    { box-shadow:0 0 12px #00C8FF,0 0 24px rgba(0,200,255,.65) }
        }
        @keyframes nb-ring {
          0%,100%{ transform:scale(1);   opacity:.5 }
          50%    { transform:scale(1.6); opacity:0  }
        }
        .nb-logo-text {
          font-family: 'Syne', sans-serif; font-weight: 700;
          font-size: 15px; letter-spacing: 4.5px;
          color: rgba(255,255,255,.92); line-height: 1;
        }

        /* ── Center pill ───────────────────────────────────── */
        .nb-center {
          display: flex; justify-content: center; align-items: center;
          min-width: 0;
        }
        .nb-pill {
          position: relative;
          display: flex; align-items: center;
          gap: 1px; padding: 5px 6px; border-radius: 100px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          white-space: nowrap;
        }

        /* Ink blob */
        .nb-ink {
          position: absolute; top: 4px; bottom: 4px;
          border-radius: 100px;
          background: rgba(0,200,255,.10);
          border: 1px solid rgba(0,200,255,.22);
          box-shadow: 0 0 14px rgba(0,200,255,.10),
                      inset 0 1px 0 rgba(255,255,255,.07);
          transition: left .25s cubic-bezier(.4,0,.2,1),
                      width .25s cubic-bezier(.4,0,.2,1),
                      opacity .18s;
          pointer-events: none;
        }

        /* ── Nav button ────────────────────────────────────── */
        .nb-btn {
          position: relative;
          display: flex; align-items: center;
          padding: 6px 12px; border-radius: 100px;
          border: none; background: none;
          cursor: pointer; outline: none; z-index: 1;
          transition: transform .18s;
        }
        .nb-btn:hover  { transform: translateY(-1px); }
        .nb-btn:active { transform: translateY(0);    }

        .nb-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 12.5px; font-weight: 500;
          color: rgba(255,255,255,.42);
          white-space: nowrap; letter-spacing: .1px;
          transition: color .2s;
        }
        .nb-btn:hover  .nb-label { color: rgba(255,255,255,.82); }
        .nb-btn.is-on  .nb-label { color: #fff; font-weight: 600; }

        /* Active underline */
        .nb-bar {
          position: absolute; bottom: 3px; left: 50%;
          transform: translateX(-50%) scaleX(0);
          width: calc(100% - 18px); height: 1.5px; border-radius: 2px;
          background: linear-gradient(90deg,transparent,#00C8FF,transparent);
          box-shadow: 0 0 7px rgba(0,200,255,.6);
          transition: transform .25s cubic-bezier(.34,1.5,.64,1);
        }
        .nb-btn.is-on .nb-bar { transform: translateX(-50%) scaleX(1); }

        /* Separator */
        .nb-sep {
          width: 1px; height: 13px;
          background: rgba(255,255,255,.06);
          flex-shrink: 0; margin: 0 2px;
        }

        /* ── Right side ────────────────────────────────────── */
        .nb-right {
          display: flex; align-items: center;
          gap: 10px; flex-shrink: 0;
        }

        /* CTA */
        .nb-cta {
          position: relative; overflow: hidden;
          display: inline-flex; align-items: center; gap: 7px;
          padding: 8px 20px; border-radius: 100px;
          text-decoration: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px; font-weight: 600;
          color: rgba(255,255,255,.92);
          background: rgba(255,255,255,.06);
          border: 1px solid rgba(255,255,255,.13);
          cursor: pointer; white-space: nowrap;
          transition: border-color .25s, box-shadow .25s,
                      transform .18s, background .25s;
        }
        .nb-cta::before {
          content: '';
          position: absolute; top: 0; left: 50%;
          transform: translateX(-50%);
          width: 55%; height: 1px;
          background: linear-gradient(90deg,transparent,rgba(0,200,255,.6),transparent);
        }
        .nb-cta:hover {
          background: rgba(0,200,255,.10);
          border-color: rgba(0,200,255,.40);
          box-shadow: 0 0 24px rgba(0,200,255,.17), 0 4px 18px rgba(0,0,0,.40);
          transform: translateY(-1px);
        }
        .nb-cta-dot {
          width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0;
          background: #00C8FF;
          animation: nb-beacon 2.4s infinite;
        }

        /* ── Hamburger ─────────────────────────────────────── */
        .nb-ham {
          display: none; align-items: center; justify-content: center;
          width: 36px; height: 36px; border-radius: 10px;
          background: rgba(255,255,255,.05);
          border: 1px solid rgba(255,255,255,.09);
          cursor: pointer; outline: none;
          transition: border-color .2s, background .2s;
          flex-shrink: 0;
        }
        .nb-ham:hover { border-color: rgba(0,200,255,.28); background: rgba(0,200,255,.06); }
        .hb { display: flex; flex-direction: column; gap: 4.5px; pointer-events: none; }
        .hb span {
          display: block; width: 16px; height: 1.5px;
          background: rgba(255,255,255,.72); border-radius: 2px;
          transition: transform .26s, opacity .26s, width .26s;
        }
        .nb-ham.open .hb span:nth-child(1){ transform:translateY(6px) rotate(45deg);  }
        .nb-ham.open .hb span:nth-child(2){ opacity:0; width:10px;                    }
        .nb-ham.open .hb span:nth-child(3){ transform:translateY(-6px) rotate(-45deg);}

        /* ── Dropdown ──────────────────────────────────────── */
        .nb-drop {
          position: fixed; top: 68px; left: 50%;
          transform: translateX(-50%) translateY(-8px);
          width: min(520px, calc(100vw - 28px));
          background: rgba(5,6,15,.97);
          border: 1px solid rgba(255,255,255,.08); border-radius: 20px;
          backdrop-filter: blur(40px); -webkit-backdrop-filter: blur(40px);
          box-shadow: 0 28px 70px rgba(0,0,0,.72),
                      inset 0 1px 0 rgba(255,255,255,.06);
          padding: 10px;
          display: grid; grid-template-columns: 1fr 1fr; gap: 4px;
          z-index: 999; opacity: 0; pointer-events: none;
          transition: opacity .22s, transform .22s;
        }
        .nb-drop.open {
          opacity: 1; pointer-events: all;
          transform: translateX(-50%) translateY(0);
        }
        .dd-btn {
          display: flex; align-items: center; justify-content: space-between;
          padding: 12px 14px; border-radius: 12px;
          cursor: pointer; border: 1px solid transparent;
          background: none; text-align: left; outline: none;
          transition: background .18s, border-color .18s;
        }
        .dd-btn:hover     { background: rgba(255,255,255,.05); }
        .dd-btn.is-on     { background: rgba(0,200,255,.08); border-color: rgba(0,200,255,.18); }
        .dd-label {
          font-family: 'DM Sans',sans-serif; font-size: 13.5px; font-weight: 500;
          color: rgba(255,255,255,.55); transition: color .18s;
        }
        .dd-btn:hover .dd-label { color: rgba(255,255,255,.85); }
        .dd-btn.is-on .dd-label { color: #fff; font-weight: 600; }
        .dd-dot {
          width: 4px; height: 4px; border-radius: 50%;
          background: #00C8FF; box-shadow: 0 0 5px #00C8FF;
          opacity: 0; transition: opacity .18s; flex-shrink: 0;
        }
        .dd-btn.is-on .dd-dot { opacity: 1; }
        .dd-foot {
          grid-column: 1/-1; padding-top: 10px; margin-top: 4px;
          border-top: 1px solid rgba(255,255,255,.06);
        }
        .dd-cta {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          padding: 13px; border-radius: 12px;
          background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.10);
          color: #fff; text-decoration: none;
          font-family: 'DM Sans',sans-serif; font-size: 14px; font-weight: 600;
          transition: background .2s, border-color .2s;
        }
        .dd-cta:hover { background: rgba(0,200,255,.10); border-color: rgba(0,200,255,.25); }

        /* ── Mobile bottom bar ─────────────────────────────── */
        .nb-mob {
          display: none; position: fixed;
          bottom: 16px; left: 50%; transform: translateX(-50%);
          z-index: 1000; padding: 5px 8px; border-radius: 100px;
          gap: 1px; align-items: center;
          background: rgba(6,7,16,.93);
          border: 1px solid rgba(255,255,255,.10);
          backdrop-filter: saturate(200%) blur(28px);
          -webkit-backdrop-filter: saturate(200%) blur(28px);
          box-shadow: 0 8px 32px rgba(0,0,0,.60),
                      inset 0 1px 0 rgba(255,255,255,.07);
        }
        .mob-btn {
          display: flex; flex-direction: column; align-items: center; gap: 1px;
          padding: 7px 14px; border-radius: 100px;
          cursor: pointer; border: 1px solid transparent;
          background: none; outline: none;
          transition: background .18s, border-color .18s;
        }
        .mob-btn.is-on { background: rgba(0,200,255,.10); border-color: rgba(0,200,255,.24); }
        .mob-lbl {
          font-family: 'DM Sans',sans-serif; font-size: 10px; font-weight: 500;
          color: rgba(255,255,255,.34); letter-spacing: .2px; transition: color .18s;
        }
        .mob-btn.is-on .mob-lbl { color: #00C8FF; font-weight: 600; }

        /* ── Responsive ────────────────────────────────────── */
        @media (max-width: 1180px) {
          .nb-label { font-size: 11.5px; }
          .nb-btn   { padding: 6px 9px;  }
        }
        @media (max-width: 1020px) {
          .nb-center { display: none; }
          .nb-ham    { display: flex;  }
        }
        @media (max-width: 900px) { .nb-logo-text { letter-spacing: 3px; } }
        @media (max-width: 640px) {
          .nb         { padding: 0 14px; height: 54px; }
          .nb-ham     { display: none; }
          .nb-cta     { display: none; }
          .nb-mob     { display: flex;  }
        }
      `}</style>

      {/* ══ SINGLE NAVBAR BAR ════════════════════════════════ */}
      <header className="nb">

        {/* Col 1 — Logo */}
        <a
          className="nb-logo"
          href="#hero"
          onClick={e => { e.preventDefault(); scrollTo('hero') }}
        >
          <span className="nb-logo-dot" />
          <span className="nb-logo-text">CUSTOS</span>
        </a>

        {/* Col 2 — Center pill */}
        <div className="nb-center">
          <nav className="nb-pill" ref={pillRef}>
            <span
              className="nb-ink"
              style={{ left: ink.x, width: ink.w, opacity: ink.show ? 1 : 0 }}
            />
            {NAV_LINKS.map((link, i) => (
              <Fragment key={link.id}>
                {SEP_BEFORE.includes(i) && <span className="nb-sep" />}
                <button
                  ref={el => { btnRefs.current[link.id] = el }}
                  className={`nb-btn ${active === link.id ? 'is-on' : ''}`}
                  onClick={() => scrollTo(link.id)}
                  onMouseEnter={() => setHovered(link.id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <span className="nb-label">{link.label}</span>
                  <span className="nb-bar" />
                </button>
              </Fragment>
            ))}
          </nav>
        </div>

        {/* Col 3 — Right */}
        <div className="nb-right">
          <a
            href="https://wa.me/917416636417?text=Hi%2C%20I%27d%20like%20to%20request%20access%20to%20Custos!"
            target="_blank" rel="noopener noreferrer"
            className="nb-cta"
          >
            <span className="nb-cta-dot" />
            Request Access
          </a>
          <button
            className={`nb-ham ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Menu"
          >
            <div className="hb"><span /><span /><span /></div>
          </button>
        </div>
      </header>

      {/* ══ DROPDOWN (tablet) ════════════════════════════════ */}
      <div className={`nb-drop ${menuOpen ? 'open' : ''}`}>
        {NAV_LINKS.map(link => (
          <button
            key={link.id}
            className={`dd-btn ${active === link.id ? 'is-on' : ''}`}
            onClick={() => { scrollTo(link.id); setMenuOpen(false) }}
          >
            <span className="dd-label">{link.label}</span>
            <span className="dd-dot" />
          </button>
        ))}
        <div className="dd-foot">
          <a
            href="https://wa.me/917416636417?text=Hi%2C%20I%27d%20like%20to%20request%20access%20to%20Custos!"
            target="_blank" rel="noopener noreferrer"
            className="dd-cta"
            onClick={() => setMenuOpen(false)}
          >
            <span className="nb-cta-dot" /> Request Early Access
          </a>
        </div>
      </div>

      {/* ══ MOBILE BOTTOM BAR ════════════════════════════════ */}
      <div className="nb-mob">
        {MOBILE_NAV.map(link => (
          <button
            key={link.id}
            className={`mob-btn ${active === link.id ? 'is-on' : ''}`}
            onClick={() => scrollTo(link.id)}
          >
            <span className="mob-lbl">{link.label}</span>
          </button>
        ))}
      </div>
    </>
  )
}