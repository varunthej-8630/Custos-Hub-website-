const footerLinks = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms', href: '#' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/parimi-varun-thej', target: '_blank' },
  { label: 'Contact', href: 'mailto:p.varunthej@gmail.com' },
]

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(255,255,255,0.06)',
      padding: '40px 80px',
      display: 'flex', alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap', gap: '20px',
      background: 'rgba(0,0,0,0.6)',
    }}>
      <style>{`
        footer { padding: 40px 80px; }
        @media (max-width: 768px) {
          footer {
            padding: 32px 20px !important;
            flex-direction: column !important;
            text-align: center !important;
            align-items: center !important;
          }
          footer > div:last-child {
            align-items: center !important;
          }
        }
        .footer-link {
          color: rgba(255,255,255,0.4); text-decoration: none;
          font-family: 'DM Sans'; font-size: 13px; transition: color 0.2s;
        }
        .footer-link:hover { color: #fff; }
      `}</style>

      {/* Logo */}
      <div style={{
        fontFamily: 'Syne, sans-serif', fontWeight: 700,
        fontSize: '18px', letterSpacing: '4px',
        color: 'rgba(255,255,255,0.8)',
        display: 'flex', alignItems: 'center', gap: '8px'
      }}>
        <span style={{ color: '#00C8FF', fontSize: '8px' }}>●</span>CUSTOS
      </div>

      {/* Links */}
      <div style={{ display: 'flex', gap: '28px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {footerLinks.map((link) => (
          <a key={link.label} href={link.href} target={link.target || '_self'} rel="noopener noreferrer" className="footer-link">
            {link.label}
          </a>
        ))}
      </div>

      {/* Contact info */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
        <a href="mailto:p.varunthej@gmail.com" style={{
          fontFamily: 'DM Sans', fontSize: '12px',
          color: 'rgba(0,200,255,0.5)', textDecoration: 'none'
        }}>
          p.varunthej@gmail.com
        </a>
        <a href="https://wa.me/917416636417" target="_blank" rel="noopener noreferrer" style={{
          fontFamily: 'DM Sans', fontSize: '12px',
          color: 'rgba(0,200,255,0.5)', textDecoration: 'none'
        }}>
          +91 74166 36417
        </a>
        <div style={{
          fontFamily: 'DM Sans', fontSize: '11px',
          color: 'rgba(255,255,255,0.2)',
        }}>
          © 2025 Custos · <span style={{ color: 'rgba(0,200,255,0.3)' }}>Guardian (Latin)</span>
        </div>
      </div>
    </footer>
  )
}