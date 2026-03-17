# ● CUSTOS — From Homes to Nations

> The autonomous AI security intelligence platform. Built on a true story.

---

## 🚀 Quick Start (3 steps)

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open in browser
# → http://localhost:5173
```

---

## 📁 Project Structure

```
custos/
├── index.html                  # Entry HTML (Google Fonts loaded here)
├── package.json                # Dependencies
├── vite.config.js              # Vite config
└── src/
    ├── main.jsx                # React entry
    ├── App.jsx                 # All sections assembled + scroll reveal
    ├── index.css               # Global design system
    └── components/
        ├── CustomCursor.jsx    # Glowing custom cursor with trail
        ├── Navbar.jsx          # Fixed navbar (glass morphism)
        ├── Footer.jsx          # Minimal footer
        └── sections/
            ├── Hero.jsx        # 🌟 Three.js — particles, blob, floating 3D cards
            ├── Problem.jsx     # 6 glass cards — security failures
            ├── Solution.jsx    # Animated flow diagram (Detection→Action)
            ├── Architecture.jsx # Interactive system diagram + tooltips
            ├── AIIntelligence.jsx # Live camera viewport + 6 detection tabs
            ├── Escalation.jsx  # Cinematic decision tree + mode toggle
            ├── Offline.jsx     # 4-column offline features
            ├── ElderCare.jsx   # 2-column split (elder care + business)
            ├── Metrics.jsx     # 3 stats banner (<200ms, 100%, 6+)
            ├── OpenEye.jsx     # 🌍 Three.js — 3D India globe with nodes
            ├── Privacy.jsx     # 2×2 privacy cards
            ├── Founder.jsx     # Full founder story with left border quote
            ├── Roadmap.jsx     # Horizontal 4-phase timeline
            ├── Recruitment.jsx # 4 role cards + email CTA
            ├── Community.jsx   # Poll cards + story submission form
            └── FinalCTA.jsx    # Final request access section
```

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + Vite |
| 3D Engine | Three.js + @react-three/fiber |
| 3D Helpers | @react-three/drei (Float, MeshDistortMaterial, Html, Stars) |
| Animation | Framer Motion + CSS keyframes |
| Fonts | **Oswald** (Hero "Custos"), **Poppins** (Hero tagline), **Kanit** (Headings), **DM Sans** (body) |
| Styling | CSS custom properties + inline styles |

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| Background | `#000000` |
| Primary Cyan | `#00C8FF` |
| Deep Blue | `#0057FF` |
| Alert Red | `#FF3B30` |
| Primary Heading Font | Oswald (Hero "Custos") with 3D shadow effects |
| Secondary Heading Font | Kanit Bold/ExtraBold (page headings) |
| Tagline Font | Poppins Bold (Hero subtitle) |
## ✨ New Features

### View Demos Modal (Hero Section)
- **Interactive Timeline Slider** with Phases 1–6
- **Clickable phase dots** for instant navigation
- **Phase descriptions** with "Demo link coming soon" placeholders (ready for you to add real demo URLs)
- **Previous/Next buttons** for sequential browsing
- **Smooth animations** and gradient background
- Modal closes on background click or X button

### Hero Typography
- **"Custos" text** — Bold Oswald font (900 weight) with cyan/red 3D shadow effects
- **Large comfortable spacing** — 4px letter-spacing for visual impact
- **"From Homes to Nations"** — Poppins font on single line with cyan gradient
- **Breathing room** — Increased line height (1.2) for readability

---
---

## 🌐 Deploy to Vercel (1 minute)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Or push to GitHub and connect repo at vercel.com
```

## 🌐 Deploy to GitHub Pages

```bash
# Build
npm run build6 floating data cards in 3D space
- **Mouse parallax** — Camera moves with mouse cursor
- **View Demos Button** — Opens interactive phases modal with timeline slider
- **Bold typography** — Oswald (Custos) + Poppins (tagline) + Kanit (content)
# Push dist/ folder to gh-pages branch
npx gh-pages -d dist
```

---

## 🎯 3D Features

### Hero Section
- **Particle field** — 4000 animated cyan/blue particles
- **Morphing blob** — Central distorted sphere using `MeshDistortMaterial`
- **Floating orbs** — 6 glowing spheres with `Float` animation
- **Antigravity glass cards** — 4 data cards floating in 3D space
- **Mouse parallax** — Camera moves with mouse cursor

### OpenEye Section
- **3D Globe** — Wireframe sphere with 15 Indian city nodes
- **Animated nodes** — Pulsing rings on each city point
- **Connection lines** — Glowing lines between cities
- **Auto-rotation** — Globe slowly rotates

---

## ⚡ Performance Tips

- The Three.js canvas uses `Suspense` for lazy loading
- Particles are computed once with `useMemo`
- All animations use `useFrame` (no `setInterval`)
- CSS scroll reveal uses `IntersectionObserver` (no scroll event listeners)

---

*Custos — Guardian (Latin)*  
*From Homes to Nations.*
