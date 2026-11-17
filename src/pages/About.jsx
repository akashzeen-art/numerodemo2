import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ParallaxDepth from '../components/ParallaxDepth'
import useScrollReveal from '../hooks/useScrollReveal'
import { vasProducts } from '../data/content'
import { partners } from '../data/partners'
import '../styles/global.css'
import '../styles/footer.css'
import '../styles/partners.css'

const team = [
  { name: 'Mamta Parashar', role: 'Founder' },
  { name: 'Vivek Sharma', role: 'Founder' },
]

const values = [
  { icon: '🎯', title: 'Mission', desc: 'To help operators monetize VAS, let customers pay with their mobile, and move cross-border value securely, with speed, clarity and fewer intermediaries.' },
  { icon: '👁️', title: 'Vision', desc: 'To reach every subscriber, on any phone and any network — and to connect countries, currencies and stakeholders into one clear process.' },
  { icon: '💎', title: 'Values', desc: 'Secure by design, transparent at every step, and focused on measurable outcomes for every transaction and campaign.' },
]

export default function About() {
  useScrollReveal()

  return (
    <>
      <Navbar />

      <div className="page-hero">
        <ParallaxDepth variant="hero" />
        <div className="container" data-parallax="-0.06">
          <div className="tag">Who we are</div>
          <h1>About Numero Info</h1>
          <p>Telecom VAS, Direct Carrier Billing and cross-border payments — connecting people, payments and processes.</p>
          <div className="page-hero-line" />
        </div>
      </div>

      {/* About content */}
      <section className="section">
        <ParallaxDepth />
        <div className="container">
          <div className="grid-2">
            <div className="reveal-left">
              <div className="tag">Our Story</div>
              <h2 style={{ fontSize: 'clamp(1.8rem,3vw,2.5rem)', fontWeight: 800, color: 'var(--white)', marginBottom: 24 }}>
                Connect, Engage <span className="gradient-text">& Grow</span>
              </h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.9, marginBottom: 16 }}>
                Numero Info helps operators monetize VAS with USSD, SMS Gateway, CRBT and mobile advertising — the network capabilities, value-added services and campaigns operators and enterprises need, in one place.
              </p>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.9, marginBottom: 16 }}>
                With Direct Carrier Billing, customers buy instantly using their phone bill or prepaid balance. We pair it with content they love — audio books, VOD, HD games, contests and more — and 360º digital marketing that drives conversions.
              </p>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.9, marginBottom: 32 }}>
                Across borders, we bring stakeholders, currencies, documentation and approvals into one technology-enabled coordination layer — with deep liquidity across African markets and beyond.
              </p>
              <div style={{ display: 'flex', gap: 32 }}>
                {[[`${vasProducts.length}`,'VAS Products'],['50+','Geos'],['24–48 H','Turnaround']].map(([n,l]) => (
                  <div key={l}>
                    <div style={{ fontSize: 28, fontWeight: 800, background: 'var(--gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{n}</div>
                    <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="reveal-right">
              <img src="/images/about-img.png" alt="about" style={{ borderRadius: 24, border: '1px solid var(--glass-border)' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section" style={{ background: 'var(--dark2)' }}>
        <div className="container">
          <div className="section-heading reveal">
            <div className="tag">What Drives Us</div>
            <h2>Our <span className="gradient-text">Core Values</span></h2>
          </div>
          <div className="grid-3">
            {values.map((v, i) => (
              <div key={i} className="glass-card reveal" style={{ padding: 36, transitionDelay: `${i * 0.15}s` }}>
                <div style={{ fontSize: 40, marginBottom: 20 }}>{v.icon}</div>
                <h3 style={{ color: 'var(--white)', marginBottom: 12, fontSize: 20 }}>{v.title}</h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: 14 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section">
        <div className="container">
          <div className="section-heading reveal">
            <div className="tag">The People</div>
            <h2>Meet Our <span className="gradient-text">Experts</span></h2>
          </div>
          <div className="grid-2" style={{ maxWidth: 720, margin: '0 auto' }}>
            {team.map((m, i) => (
              <div key={m.name} className="glass-card reveal" style={{ padding: '28px 24px', textAlign: 'center', transitionDelay: `${i * 0.15}s` }}>
                <h4 style={{ color: 'var(--ink)', fontWeight: 700, marginBottom: 6, fontFamily: 'var(--font-display)', fontSize: 18 }}>{m.name}</h4>
                <p style={{ color: 'var(--accent)', fontSize: 13, fontWeight: 600 }}>{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="section" style={{ background: 'var(--dark2)' }}>
        <div className="container">
          <div className="section-heading reveal">
            <div className="tag">Credentials</div>
            <h2>Our <span className="gradient-text">Certifications</span></h2>
          </div>
          <div className="grid-2" style={{ maxWidth: 800, margin: '0 auto' }}>
            {['0001-compressed-460x650.jpg','0001-compressed-2-460x650.jpg'].map((img, i) => (
              <div key={i} className="glass-card reveal" style={{ padding: 20, transitionDelay: `${i * 0.2}s` }}>
                <img src={`/images/${img}`} alt={`cert ${i+1}`} style={{ width: '100%', borderRadius: 12 }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="section partners-section">
        <div className="container">
          <div className="section-heading reveal">
            <div className="tag">Ecosystem</div>
            <h2>Our <span className="gradient-text">Partners</span></h2>
            <p>Operators and technology partners across Africa, Middle East, Asia and the Americas.</p>
          </div>
        </div>
        <div className="partners-channels reveal" aria-label="Partner logos">
          {[partners.slice(0, Math.ceil(partners.length / 2)), partners.slice(Math.ceil(partners.length / 2))].map((row, rowIndex) => (
            <div key={rowIndex} className={`partners-channel partners-channel--${rowIndex === 0 ? 'left' : 'right'}`}>
              <div className="partners-channel-track">
                {[...row, ...row].map((p, i) => (
                  <div key={`${p.id}-${i}`} className="partner-card" title={p.name}>
                    <img src={`/images/partners/${p.logo}`} alt={p.name} loading="lazy" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  )
}
