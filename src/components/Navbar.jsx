import { useState, useEffect, useRef, Fragment } from 'react'

/* ─── Nav links ────────────────────────────────────────────── */
const LINKS = [
  { id: 'problem',      label: 'The Problem'  },
  { id: 'how-it-works', label: 'How It Works' },
  { id: 'intelligence', label: 'Intelligence' },
  { id: 'ecosystem',    label: 'Ecosystem'    },
  { id: 'vision',       label: 'Vision'       },
  { id: 'founder',      label: 'Founder'      },
  { id: 'community',    label: 'Your Needs'},
  { id: 'enrollment',   label: 'Enrollment'},
]

/* ─── Animated Radar Logo ──────────────────────────────────── */
function Logo({ onNav }) {
  return (
    <a
      className="logo"
      href="#hero"
      onClick={e => { e.preventDefault(); onNav('hero') }}
    >
      {/* Radar disc */}
      <span className="disc">
        <svg viewBox="0 0 44 44" fill="none" className="disc-svg">
          <defs>
            <radialGradient id="dg" cx="50%" cy="50%">
              <stop offset="0%"  stopColor="rgba(0,200,255,0.20)"/>
              <stop offset="100%" stopColor="rgba(0,40,80,0.12)"/>
            </radialGradient>
            <radialGradient id="sw" cx="0%" cy="100%">
              <stop offset="0%"  stopColor="#00C8FF" stopOpacity="0.9"/>
              <stop offset="100%" stopColor="#00C8FF" stopOpacity="0"/>
            </radialGradient>
          </defs>
          <circle cx="22" cy="22" r="21" fill="url(#dg)"/>
          <circle cx="22" cy="22" r="19" stroke="rgba(0,200,255,0.13)" strokeWidth="0.6" fill="none"/>
          <circle cx="22" cy="22" r="13" stroke="rgba(0,200,255,0.10)" strokeWidth="0.6" fill="none"/>
          <circle cx="22" cy="22" r="7"  stroke="rgba(0,200,255,0.08)" strokeWidth="0.6" fill="none"/>
          <line x1="22" y1="3"  x2="22" y2="41" stroke="rgba(0,200,255,0.07)" strokeWidth="0.5"/>
          <line x1="3"  y1="22" x2="41" y2="22" stroke="rgba(0,200,255,0.07)" strokeWidth="0.5"/>
          {/* Sweep */}
          <path className="sweep" d="M22 22 L41 22 A19 19 0 0 0 33.4 6.6 Z" fill="url(#sw)" opacity="0.8"/>
          <line className="sweep" x1="22" y1="22" x2="41" y2="22" stroke="rgba(0,200,255,0.7)" strokeWidth="0.7"/>
          {/* Center */}
          <circle cx="22" cy="22" r="2.2" fill="#00C8FF" opacity="0.95"/>
          <circle cx="22" cy="22" r="3.8" fill="rgba(0,200,255,0.20)"/>
          {/* Blips */}
          <circle className="bc"  cx="32" cy="13" r="1.5" fill="#00C8FF"/>
          <circle className="br"  cx="14" cy="30" r="1.4" fill="#ff3b30"/>
          <circle className="bc2" cx="35" cy="28" r="1.1" fill="#00C8FF"/>
        </svg>
        <span className="ring r1"/><span className="ring r2"/>
      </span>

      {/* Wordmark */}
      <span className="wm">
        <span className="wm-letters">
          {'CUSTOS'.split('').map((c, i) => (
            <span key={i} className="wm-ch" style={{ '--d': `${i * 65}ms` }}>{c}</span>
          ))}
          <span className="wm-shine"/>
        </span>
        <span className="wm-sub">SECURITY INTELLIGENCE</span>
      </span>
    </a>
  )
}

/* ─── Main component ───────────────────────────────────────── */
export default function Navbar() {
  const [active,   setActive]   = useState('')
  const [hovered,  setHovered]  = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  /* ink blob state */
  const pillRef  = useRef(null)
  const btnRefs  = useRef({})
  const [ink, setInk] = useState({ x: 0, w: 0, show: false })

  /* scroll */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  /* section tracker */
  useEffect(() => {
    const obs = LINKS.map(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return null
      const o = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActive(id) },
        { threshold: 0.15, rootMargin: '-80px 0px -35% 0px' }
      )
      o.observe(el)
      return o
    }).filter(Boolean)
    return () => obs.forEach(o => o.disconnect())
  }, [])

  /* ink blob position */
  useEffect(() => {
    const targetId = hovered || active
    const btn  = targetId ? btnRefs.current[targetId] : null
    const pill = pillRef.current
    if (!btn || !pill) { setInk(s => ({ ...s, show: false })); return }
    const pr = pill.getBoundingClientRect()
    const br = btn.getBoundingClientRect()
    setInk({ x: br.left - pr.left, w: br.width, show: true })
  }, [hovered, active])

  /* close dropdown outside */
  useEffect(() => {
    if (!menuOpen) return
    const fn = e => {
      if (!e.target.closest('.nb-ham') && !e.target.closest('.nb-drop'))
        setMenuOpen(false)
    }
    document.addEventListener('mousedown', fn)
    return () => document.removeEventListener('mousedown', fn)
  }, [menuOpen])

  /* scroll helper */
  const go = id => {
    const el = document.getElementById(id)
    if (el) {
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - 80,
        behavior: 'smooth'
      })
    }
    setMenuOpen(false)
  }

  return (
    <>
      <style>{`

        /* ── Keyframes ──────────────────────────────────────── */
        @keyframes sweep-rot {
          to { transform: rotate(360deg); }
        }
        @keyframes blip-c {
          0%,100%{opacity:.9;transform:scale(1)  ;filter:drop-shadow(0 0 3px #00C8FF)}
          50%    {opacity:.3;transform:scale(2.0) ;filter:drop-shadow(0 0 8px #00C8FF)}
        }
        @keyframes blip-r {
          0%,100%{opacity:.9;transform:scale(1)  ;filter:drop-shadow(0 0 3px #ff3b30)}
          50%    {opacity:.3;transform:scale(2.0) ;filter:drop-shadow(0 0 8px #ff3b30)}
        }
        @keyframes ring-out {
          0%  {transform:translate(-50%,-50%) scale(1)  ;opacity:.45}
          100%{transform:translate(-50%,-50%) scale(1.9);opacity:0  }
        }
        @keyframes ch-in {
          from{opacity:0;transform:translateY(8px) scaleY(.75);filter:blur(4px)}
          to  {opacity:1;transform:translateY(0)   scaleY(1)  ;filter:blur(0)  }
        }
        @keyframes shine {
          0%  {left:-80%}
          100%{left:160%}
        }
        @keyframes sub-in {
          from{opacity:0;letter-spacing:6px}
          to  {opacity:1;letter-spacing:2px}
        }
        @keyframes ink-in {
          from{opacity:0;transform:scaleX(.8)}
          to  {opacity:1;transform:scaleX(1) }
        }
        @keyframes drop-in {
          from{opacity:0;transform:translateY(-8px) scale(.98)}
          to  {opacity:1;transform:translateY(0)    scale(1)  }
        }
        @keyframes dot-pulse {
          0%,100%{box-shadow:0 0 5px #00C8FF,0 0 10px rgba(0,200,255,.4)}
          50%    {box-shadow:0 0 10px #00C8FF,0 0 20px rgba(0,200,255,.7)}
        }

        /* ── One unified bar ─────────────────────────────────── */
        .nb {
          position       : fixed;
          top            : 0; left:0; right:0;
          z-index        : 1000;
          height         : 60px;
          display        : grid;
          grid-template-columns: auto 1fr auto;
          align-items    : center;
          gap            : 16px;
          padding        : 0 20px;
          background     : rgba(7, 8, 18, ${() => scrolled ? '0.80' : '0.50'});
          backdrop-filter: saturate(180%) blur(30px);
          -webkit-backdrop-filter: saturate(180%) blur(30px);
          border-bottom  : 1px solid rgba(255,255,255,0.07);
          box-shadow     : 0 1px 0 rgba(255,255,255,0.04),
                           0 4px 24px rgba(0,0,0,0.35);
          transition     : background .4s, box-shadow .4s;
        }
        .nb.scrolled {
          background : rgba(7,8,18,0.88);
          box-shadow : 0 1px 0 rgba(255,255,255,0.05), 0 4px 32px rgba(0,0,0,0.50);
        }
        /* thin cyan top line */
        .nb::before {
          content  :'';
          position :absolute; top:0; left:0; right:0; height:1px;
          background:linear-gradient(90deg,
            transparent 0%,
            rgba(0,200,255,.25) 30%,
            rgba(0,200,255,.25) 70%,
            transparent 100%);
        }

        /* ── Logo ──────────────────────────────────────────── */
        .logo {
          display        : flex;
          align-items    : center;
          gap            : 10px;
          text-decoration: none;
          cursor         : pointer;
          flex-shrink    : 0;
          padding        : 6px 0;
          transition     : opacity .2s;
        }
        .logo:hover { opacity:.88; }

        .disc {
          position      : relative;
          width:40px; height:40px; flex-shrink:0;
          border-radius : 50%;
          border        : 1px solid rgba(0,200,255,.18);
          overflow      : hidden;
          display       : flex; align-items:center; justify-content:center;
          background    : radial-gradient(circle at 35% 35%, rgba(0,200,255,.12), rgba(0,20,50,.15));
        }
        .disc-svg  { width:40px; height:40px; position:absolute; }
        .sweep     {
          transform-origin:22px 22px;
          animation:sweep-rot 3s linear infinite;
        }
        .bc  { animation:blip-c 3s ease-in-out infinite; }
        .br  { animation:blip-r 3s ease-in-out .6s infinite; }
        .bc2 { animation:blip-c 3s ease-in-out 1.5s infinite; }

        .ring {
          position      : absolute;
          top:50%; left:50%;
          width:40px; height:40px; border-radius:50%;
          border        : 1px solid rgba(0,200,255,.28);
          pointer-events: none;
        }
        .r1 { animation:ring-out 2.8s ease-out infinite; }
        .r2 { animation:ring-out 2.8s ease-out 1.1s infinite; }

        .wm { display:flex; flex-direction:column; gap:2px; }

        .wm-letters {
          position: relative;
          display : flex; align-items:center;
          overflow: hidden;
        }
        .wm-ch {
          font-family    : 'Syne', sans-serif;
          font-weight    : 800;
          font-size      : 20px;
          letter-spacing : 2.5px;
          color          : rgba(255,255,255,.95);
          line-height    : 1;
          display        : inline-block;
          animation      : ch-in .7s cubic-bezier(.34,1.4,.64,1) var(--d) both;
          text-shadow    : 0 0 20px rgba(0,200,255,.20);
        }
        .wm-shine {
          position  : absolute; inset-block:0; width:32%;
          background: linear-gradient(90deg,transparent,rgba(255,255,255,.20),transparent);
          transform : skewX(-15deg);
          animation : shine 5s ease-in-out 1.5s infinite;
          pointer-events:none;
        }
        .wm-sub {
          font-family    : 'DM Sans', sans-serif;
          font-size      : 7px;
          font-weight    : 600;
          letter-spacing : 2px;
          color          : rgba(0,200,255,.48);
          text-transform : uppercase;
          animation      : sub-in 1.2s ease-out .6s both;
          white-space    : nowrap;
        }

        /* ── Center pill ─────────────────────────────────────── */
        .nb-center {
          display        : flex;
          justify-content: center;
          align-items    : center;
          min-width      : 0; /* let it shrink */
        }
        .pill {
          position       : relative;
          display        : flex;
          align-items    : center;
          gap            : 1px;
          padding        : 5px 6px;
          border-radius  : 100px;
          background     : rgba(255,255,255,0.04);
          border         : 1px solid rgba(255,255,255,0.07);
          white-space    : nowrap;
        }

        /* Ink blob */
        .pill-ink {
          position      : absolute;
          top:4px; bottom:4px;
          border-radius : 100px;
          background    : rgba(0,200,255,.10);
          border        : 1px solid rgba(0,200,255,.22);
          box-shadow    : 0 0 14px rgba(0,200,255,.10),
                          inset 0 1px 0 rgba(255,255,255,.07);
          transition    : left .25s cubic-bezier(.4,0,.2,1),
                          width .25s cubic-bezier(.4,0,.2,1),
                          opacity .18s;
          pointer-events: none;
        }

        /* Nav button */
        .nb-link {
          position       : relative;
          display        : flex;
          align-items    : center;
          gap            : 4px;
          padding        : 6px 12px;
          border-radius  : 100px;
          border         : none;
          background     : none;
          cursor         : pointer;
          outline        : none;
          z-index        : 1;
          transition     : transform .18s;
        }
        .nb-link:hover  { transform:translateY(-1px); }
        .nb-link:active { transform:translateY(0);    }

        .nb-label {
          font-family  : 'DM Sans', sans-serif;
          font-size    : 12.5px;
          font-weight  : 500;
          color        : rgba(255,255,255,.42);
          white-space  : nowrap;
          transition   : color .2s;
          letter-spacing: .1px;
        }
        .nb-link:hover  .nb-label { color:rgba(255,255,255,.82); }
        .nb-link.on     .nb-label { color:#fff; font-weight:600; }

        /* Active underline */
        .nb-bar {
          position  : absolute;
          bottom    : 3px; left:50%;
          transform : translateX(-50%) scaleX(0);
          width     : calc(100% - 18px);
          height    : 1.5px;
          border-radius:2px;
          background: linear-gradient(90deg,transparent,#00C8FF,transparent);
          box-shadow: 0 0 7px rgba(0,200,255,.6);
          transition: transform .25s cubic-bezier(.34,1.5,.64,1);
        }
        .nb-link.on .nb-bar { transform:translateX(-50%) scaleX(1); }

        /* New dot */
        .nb-new {
          width:5px; height:5px; border-radius:50%;
          flex-shrink:0;
          background: #00C8FF;
          animation : dot-pulse 2s infinite;
          display   : block;
        }

        /* Separator */
        .nb-sep {
          width:1px; height:13px;
          background:rgba(255,255,255,.06);
          flex-shrink:0; margin:0 2px;
        }

        /* ── Right side ──────────────────────────────────────── */
        .nb-right {
          display     : flex;
          align-items : center;
          gap         : 10px;
          flex-shrink : 0;
          justify-self: end;
        }

        /* CTA */
        .nb-cta {
          position       : relative; overflow:hidden;
          display        : inline-flex; align-items:center; gap:8px;
          padding        : 8px 20px; border-radius:100px;
          text-decoration: none;
          font-family    : 'DM Sans', sans-serif;
          font-size      : 13px; font-weight:600;
          color          : rgba(255,255,255,.92);
          background     : rgba(255,255,255,.06);
          border         : 1px solid rgba(255,255,255,.13);
          cursor         : pointer;
          white-space    : nowrap;
          transition     : border-color .25s, box-shadow .25s, transform .18s, background .25s;
        }
        .nb-cta::before {
          content  :'';
          position :absolute; top:0; left:50%; transform:translateX(-50%);
          width:55%; height:1px;
          background:linear-gradient(90deg,transparent,rgba(0,200,255,.6),transparent);
        }
        .nb-cta:hover {
          background  : rgba(0,200,255,.10);
          border-color: rgba(0,200,255,.40);
          box-shadow  : 0 0 24px rgba(0,200,255,.17), 0 4px 18px rgba(0,0,0,.40);
          transform   : translateY(-1px);
        }
        .cta-dot {
          width:6px; height:6px; border-radius:50%; flex-shrink:0;
          background:#00C8FF;
          animation:dot-pulse 2.4s infinite;
        }

        /* Hamburger */
        .nb-ham {
          display        : none; align-items:center; justify-content:center;
          width:36px; height:36px; border-radius:10px; flex-shrink:0;
          background     : rgba(255,255,255,.05);
          border         : 1px solid rgba(255,255,255,.09);
          cursor         : pointer; outline:none;
          transition     : border-color .2s, background .2s;
        }
        .nb-ham:hover { border-color:rgba(0,200,255,.28); background:rgba(0,200,255,.06); }
        .hb-wrap { display:flex; flex-direction:column; gap:4.5px; pointer-events:none; }
        .hb-wrap span {
          display:block; width:16px; height:1.5px;
          background:rgba(255,255,255,.72); border-radius:2px;
          transition:transform .26s, opacity .26s, width .26s;
        }
        .nb-ham.open .hb-wrap span:nth-child(1){ transform:translateY(6px) rotate(45deg);  }
        .nb-ham.open .hb-wrap span:nth-child(2){ opacity:0; width:10px;                    }
        .nb-ham.open .hb-wrap span:nth-child(3){ transform:translateY(-6px) rotate(-45deg);}

        /* ── Dropdown ────────────────────────────────────────── */
        .nb-drop {
          position  :fixed; top:68px; left:50%;
          transform :translateX(-50%) translateY(-6px);
          width     :min(520px,calc(100vw - 28px));
          background:rgba(5,6,15,.97);
          border    :1px solid rgba(255,255,255,.08);
          border-radius:20px;
          backdrop-filter:blur(40px); -webkit-backdrop-filter:blur(40px);
          box-shadow:0 28px 70px rgba(0,0,0,.72),
                     inset 0 1px 0 rgba(255,255,255,.06);
          padding   :10px;
          display   :grid; grid-template-columns:1fr 1fr; gap:4px;
          z-index   :999; opacity:0; pointer-events:none;
          transition:opacity .22s, transform .22s;
        }
        .nb-drop.open {
          opacity:1; pointer-events:all;
          transform:translateX(-50%) translateY(0);
          animation:drop-in .22s ease;
        }
        .dd-btn {
          display:flex; align-items:center; justify-content:space-between;
          padding:13px 16px; border-radius:12px;
          cursor:pointer; border:1px solid transparent;
          background:none; text-align:left; outline:none;
          transition:background .18s, border-color .18s;
        }
        .dd-btn:hover      { background:rgba(255,255,255,.05); }
        .dd-btn.on         { background:rgba(0,200,255,.08); border-color:rgba(0,200,255,.18); }
        .dd-lbl {
          font-family:'DM Sans',sans-serif; font-size:13.5px; font-weight:500;
          color:rgba(255,255,255,.55); transition:color .18s;
        }
        .dd-btn:hover .dd-lbl  { color:rgba(255,255,255,.85); }
        .dd-btn.on    .dd-lbl  { color:#fff; font-weight:600; }
        .dd-ind {
          width:4px; height:4px; border-radius:50%;
          background:#00C8FF; box-shadow:0 0 5px #00C8FF;
          opacity:0; transition:opacity .18s;
        }
        .dd-btn.on .dd-ind { opacity:1; }
        .dd-foot {
          grid-column:1/-1; padding-top:10px; margin-top:4px;
          border-top:1px solid rgba(255,255,255,.06);
        }
        .dd-cta {
          display:flex; align-items:center; justify-content:center; gap:8px;
          padding:13px; border-radius:12px;
          background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.10);
          color:#fff; text-decoration:none;
          font-family:'DM Sans',sans-serif; font-size:14px; font-weight:600;
          transition:background .2s, border-color .2s;
        }
        .dd-cta:hover { background:rgba(0,200,255,.10); border-color:rgba(0,200,255,.25); }

        /* ── Mobile bottom bar ───────────────────────────────── */
        .nb-mob {
          display    :none; position:fixed;
          bottom     :16px; left:50%; transform:translateX(-50%);
          z-index    :1000; padding:5px 8px; border-radius:100px;
          gap        :1px; align-items:center;
          background :rgba(6,7,16,.93);
          border     :1px solid rgba(255,255,255,.10);
          backdrop-filter:saturate(200%) blur(28px);
          -webkit-backdrop-filter:saturate(200%) blur(28px);
          box-shadow :0 8px 32px rgba(0,0,0,.60),
                      inset 0 1px 0 rgba(255,255,255,.07);
        }
        .mob-btn {
          display:flex; flex-direction:column; align-items:center; gap:1px;
          padding:7px 14px; border-radius:100px;
          cursor:pointer; border:1px solid transparent;
          background:none; outline:none;
          transition:background .18s, border-color .18s;
        }
        .mob-btn.on { background:rgba(0,200,255,.10); border-color:rgba(0,200,255,.24); }
        .mob-lbl {
          font-family:'DM Sans',sans-serif; font-size:10px; font-weight:500;
          color:rgba(255,255,255,.34); letter-spacing:.2px; transition:color .18s;
        }
        .mob-btn.on .mob-lbl { color:#00C8FF; font-weight:600; }

        /* ── Responsive ──────────────────────────────────────── */
        @media (max-width:1180px) {
          .nb-label   { font-size:11.5px; }
          .nb-link    { padding:6px 9px; }
        }
        @media (max-width:1020px) {
          .nb-center  { display:none; }
          .nb-ham     { display:flex; }
        }
        @media (max-width:900px) {
          .wm-sub     { display:none; }
        }
        @media (max-width:640px) {
          .nb         { padding:0 14px; height:54px; }
          .nb-ham     { display:none; }
          .nb-cta     { display:none; }
          .nb-mob     { display:flex; }
          .wm-ch      { font-size:17px; }
          .disc       { width:34px; height:34px; }
          .disc-svg   { width:34px; height:34px; }
        }
      `}</style>

      {/* ══════════════════════════════════════════════════════════
          ONE SINGLE NAVBAR BAR — no overlap possible
      ══════════════════════════════════════════════════════════ */}
      <header className={`nb ${scrolled ? 'scrolled' : ''}`}>

        {/* ── Col 1: Logo ─────────────────────────────────────── */}
        <Logo onNav={go} />

        {/* ── Col 2: Center nav pill ──────────────────────────── */}
        <div className="nb-center">
          <nav className="pill" ref={pillRef}>

            {/* Sliding ink blob */}
            <span
              className="pill-ink"
              style={{
                left   : ink.x,
                width  : ink.w,
                opacity: ink.show ? 1 : 0,
              }}
            />

            {LINKS.map((link, i) => (
              <Fragment key={link.id}>
                {(i === 2 || i === 4 || i === 6) && <span className="nb-sep" />}
                <button
                  ref={el => { btnRefs.current[link.id] = el }}
                  className={`nb-link ${active === link.id ? 'on' : ''}`}
                  onClick={() => go(link.id)}
                  onMouseEnter={() => setHovered(link.id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <span className="nb-label">{link.label}</span>
                  {link.isNew && <span className="nb-new" />}
                  <span className="nb-bar" />
                </button>
              </Fragment>
            ))}
          </nav>
        </div>

        {/* ── Col 3: Right actions ────────────────────────────── */}
        <div className="nb-right">
          <a
            href="https://wa.me/917416636417?text=Hi%2C%20I%27d%20like%20to%20request%20access%20to%20Custos!"
            target="_blank"
            rel="noopener noreferrer"
            className="nb-cta"
          >
            <span className="cta-dot" />
            Request Access
          </a>

          <button
            className={`nb-ham ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Menu"
          >
            <div className="hb-wrap"><span /><span /><span /></div>
          </button>
        </div>
      </header>

      {/* ══ Dropdown (tablet) ══════════════════════════════════ */}
      <div className={`nb-drop ${menuOpen ? 'open' : ''}`}>
        {LINKS.map(link => (
          <button
            key={link.id}
            className={`dd-btn ${active === link.id ? 'on' : ''}`}
            onClick={() => { go(link.id); setMenuOpen(false) }}
          >
            <span className="dd-lbl">{link.label}</span>
            <span className="dd-ind" />
          </button>
        ))}
        <div className="dd-foot">
          <a
            href="https://wa.me/917416636417?text=Hi%2C%20I%27d%20like%20to%20request%20access%20to%20Custos!"
            target="_blank" rel="noopener noreferrer"
            className="dd-cta"
            onClick={() => setMenuOpen(false)}
          >
            <span className="cta-dot" /> Request Early Access
          </a>
        </div>
      </div>

      {/* ══ Mobile bottom bar ══════════════════════════════════ */}
      <div className="nb-mob">
        {[
          { id: 'problem',      label: 'Problem' },
          { id: 'how-it-works', label: 'Works'   },
          { id: 'intelligence', label: 'AI'       },
          { id: 'community', label: 'Needs'    },
          { id: 'enrollment',   label: 'Enroll'   },
        ].map(link => (
          <button
            key={link.id}
            className={`mob-btn ${active === link.id ? 'on' : ''}`}
            onClick={() => go(link.id)}
          >
            <span className="mob-lbl">{link.label}</span>
          </button>
        ))}
      </div>
    </>
  )
}