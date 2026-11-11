import { Link, useLocation } from 'react-router-dom'
import '../styles/footer.css'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/services', label: 'Services' },
  { to: '/portfolio', label: 'Products' },
  { to: '/contact', label: 'Contact' },
]

const ECG_PATH = "M0 60 h50 l8 -10 l8 10 h12 l6 8 l10 -48 l10 64 l8 -24 h18 l14 -12 l14 12 h42 h50 l8 -10 l8 10 h12 l6 8 l10 -48 l10 64 l8 -24 h18 l14 -12 l14 12 h42 h50 l8 -10 l8 10 h12 l6 8 l10 -48 l10 64 l8 -24 h18 l14 -12 l14 12 h42 h50 l8 -10 l8 10 h12 l6 8 l10 -48 l10 64 l8 -24 h18 l14 -12 l14 12 h42 h50 l8 -10 l8 10 h12 l6 8 l10 -48 l10 64 l8 -24 h18 l14 -12 l14 12 h42 h50 l8 -10 l8 10 h12 l6 8 l10 -48 l10 64 l8 -24 h18 l14 -12 l14 12 h42"

export default function Footer() {
  const { pathname } = useLocation()

  return (
    <footer style={{ position:'relative', overflow:'hidden', background:'#0d0820', paddingTop:48, color:'rgba(255,255,255,0.7)' }}>

      {/* Wave top edge */}
      <svg aria-hidden="true" viewBox="0 0 1440 60" preserveAspectRatio="none"
        style={{ position:'absolute', top:0, left:0, right:0, width:'100%', height:40, pointerEvents:'none', color:'var(--dark)' }}>
        <path d="M0 0h1440v22c-160 26-330 38-520 20S560 6 380 14 120 44 0 30Z" fill="currentColor" />
      </svg>

      {/* Radial bg accents */}
      <div aria-hidden="true" style={{ position:'absolute', inset:0, zIndex:0, backgroundImage:'radial-gradient(40% 50% at 90% 0%,rgba(124,58,237,0.35),transparent 70%),radial-gradient(35% 45% at 0% 100%,rgba(6,182,212,0.15),transparent 70%)' }} />

      {/* Grid overlay */}
      <div aria-hidden="true" style={{ position:'absolute', inset:0, zIndex:0, backgroundImage:'linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)', backgroundSize:'60px 60px', opacity:0.04 }} />

      {/* ECG line */}
      <svg viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden="true"
        style={{ position:'absolute', top:96, left:0, right:0, width:'100%', height:56, zIndex:0, opacity:0.15 }}>
        <path d={ECG_PATH} fill="none" stroke="#a78bfa" strokeOpacity="0.22" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
        <path d={ECG_PATH} pathLength="1" fill="none" stroke="#a78bfa" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke"
          style={{ strokeDasharray:'0.22 0.78', filter:'drop-shadow(rgba(124,58,237,0.9) 0 0 6px)', animation:'ecgF 3s linear infinite' }} />
      </svg>

      {/* Main grid */}
      <div className="container" style={{ position:'relative', zIndex:1, display:'grid', gridTemplateColumns:'1.1fr 0.6fr 1.8fr', gap:56, paddingTop:48, paddingBottom:40 }}>

        {/* Brand */}
        <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
          <Link to="/" style={{ display:'inline-block', borderRadius:12, textDecoration:'none' }}>
            <img src="/images/logo.png" alt="Numero Info" style={{ height: 48, width: 'auto', display: 'block' }} />
          </Link>
          <p style={{ maxWidth:280, fontSize:14, lineHeight:1.8, color:'rgba(255,255,255,0.6)' }}>
            Telecom VAS platforms, Direct Carrier Billing with content and digital marketing, and cross-border payments across 50+ currencies.
          </p>
          <p style={{ display:'flex', alignItems:'center', gap:8, fontFamily:'Space Grotesk', fontWeight:600, color:'#fff', fontSize:14 }}>
            <span style={{ fontSize:18, animation:'pulseF 2s ease-in-out infinite' }}>⚡</span>
            Connect, engage & grow.
          </p>
        </div>

        {/* Quick links */}
        <div>
          <h2 style={{ fontFamily:'Space Grotesk', fontSize:11, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--primary-light)', marginBottom:20 }}>Quick Links</h2>
          <ul style={{ listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:4 }}>
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <Link to={to} style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'6px 0', fontSize:14, color: pathname === to ? '#fff' : 'rgba(255,255,255,0.6)', textDecoration:'none', transition:'color 0.3s', fontWeight: pathname === to ? 600 : 400 }}
                  onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                  onMouseLeave={e => e.currentTarget.style.color = pathname === to ? '#fff' : 'rgba(255,255,255,0.6)'}>
                  <span style={{ height:2, borderRadius:2, background:'var(--primary-light)', transition:'width 0.3s', width: pathname === to ? 16 : 0, flexShrink:0 }} />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact + Address */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:40 }}>
          {/* Get in touch */}
          <div>
            <h2 style={{ fontFamily:'Space Grotesk', fontSize:11, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--primary-light)', marginBottom:20 }}>Get in Touch</h2>
            <ul style={{ listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:12 }}>
              {[
                { href:'tel:+917011370445', icon:'📞', text:'+91 70113 70445' },
                { href:'mailto:info@numeroinfo.asia', icon:'✉️', text:'info@numeroinfo.asia' },
                { href:null, icon:'🕐', text:'Mon–Sat, 09:00–18:00 IST', sub:'Sunday: WhatsApp only' },
              ].map((item, i) => (
                <li key={i}>
                  {item.href ? (
                    <a href={item.href} style={{ display:'flex', alignItems:'center', gap:12, fontSize:14, color:'rgba(255,255,255,0.65)', textDecoration:'none', transition:'color 0.3s' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                      onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.65)'}>
                      <span style={{ width:36, height:36, borderRadius:10, background:'rgba(255,255,255,0.08)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:16, flexShrink:0, transition:'background 0.3s' }}>{item.icon}</span>
                      {item.text}
                    </a>
                  ) : (
                    <div style={{ display:'flex', alignItems:'flex-start', gap:12, fontSize:14 }}>
                      <span style={{ width:36, height:36, borderRadius:10, background:'rgba(255,255,255,0.08)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:16, flexShrink:0 }}>{item.icon}</span>
                      <span>
                        <span style={{ display:'block', color:'rgba(255,255,255,0.85)' }}>{item.text}</span>
                        {item.sub && <span style={{ display:'block', fontSize:12, color:'rgba(255,255,255,0.45)', marginTop:2 }}>{item.sub}</span>}
                      </span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Address */}
          <div>
            <h2 style={{ fontFamily:'Space Grotesk', fontSize:11, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--primary-light)', marginBottom:20 }}>Our Office</h2>
            <a href="https://www.google.com/maps/search/?api=1&query=B+123+Sector+54+Gurgaon+Haryana" target="_blank" rel="noopener noreferrer"
              style={{ display:'flex', gap:12, padding:14, borderRadius:16, border:'1px solid rgba(255,255,255,0.08)', background:'rgba(255,255,255,0.04)', textDecoration:'none', transition:'all 0.3s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(124,58,237,0.4)'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.transform = 'translateY(0)' }}>
              <span style={{ width:36, height:36, borderRadius:10, background:'rgba(255,255,255,0.08)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:16, flexShrink:0 }}>📍</span>
              <span style={{ fontSize:13 }}>
                <span style={{ display:'flex', justifyContent:'space-between', fontFamily:'Space Grotesk', fontWeight:600, color:'#fff', marginBottom:4 }}>
                  Gurgaon, India
                  <span style={{ fontSize:11, opacity:0.5 }}>↗</span>
                </span>
                <span style={{ display:'block', color:'rgba(255,255,255,0.55)', lineHeight:1.6 }}>B 123 First Floor, Sector 54<br />Gurgaon, Haryana 122003</span>
              </span>
            </a>

            {/* Social */}
            <div style={{ display:'flex', gap:10, marginTop:20 }}>
              {[
                { icon:'f', href:'#', label:'Facebook' },
                { icon:'in', href:'https://linkedin.com', label:'LinkedIn' },
                { icon:'tw', href:'#', label:'Twitter' },
                { icon:'ig', href:'#', label:'Instagram' },
              ].map(s => (
                <a key={s.label} href={s.href} aria-label={s.label} style={{ width:36, height:36, borderRadius:10, background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.1)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:700, color:'rgba(255,255,255,0.6)', textDecoration:'none', transition:'all 0.3s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--primary)'; e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.color = '#fff' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)' }}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Large watermark text */}
      <p aria-hidden="true" className="container" style={{ overflow:'hidden', fontFamily:'Space Grotesk', fontWeight:900, fontSize:'clamp(2rem,8.6vw,7.5rem)', lineHeight:0.95, letterSpacing:'-0.02em', whiteSpace:'nowrap', background:'linear-gradient(to bottom,rgba(255,255,255,0.12),rgba(255,255,255,0.06),rgba(255,255,255,0.01))', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', userSelect:'none', pointerEvents:'none', marginBottom:0, position:'relative', zIndex:1 }}>
        NUMERO INFO
      </p>

      {/* Bottom bar */}
      <div style={{ borderTop:'1px solid rgba(255,255,255,0.08)', position:'relative', zIndex:1 }}>
        <div className="container" style={{ display:'flex', flexWrap:'wrap', alignItems:'center', justifyContent:'space-between', gap:16, paddingTop:20, paddingBottom:24, fontSize:12, color:'rgba(255,255,255,0.45)' }}>
          <p style={{ maxWidth:560 }}>
            Numero Info IT Services is an IT Division of Numero Mobile Private Limited.
          </p>
          <div style={{ display:'flex', alignItems:'center', gap:16, flexShrink:0 }}>
            <p>© {new Date().getFullYear()} NUMERO INFO</p>
            <button onClick={() => window.scrollTo({ top:0, behavior:'smooth' })} style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'7px 14px', borderRadius:50, background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.1)', color:'#fff', fontSize:12, fontWeight:600, cursor:'pointer', transition:'all 0.3s', fontFamily:'Space Grotesk' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--primary)'; e.currentTarget.style.borderColor = 'var(--primary)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}>
              Back to top ↑
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes ecgF { from{stroke-dashoffset:1} to{stroke-dashoffset:-1} }
        @keyframes pulseF { 0%,100%{opacity:1} 50%{opacity:0.5} }
        @media(max-width:992px){
          .footer-main-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media(max-width:640px){
          .footer-main-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  )
}
