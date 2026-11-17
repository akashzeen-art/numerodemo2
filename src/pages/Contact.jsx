import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ParallaxDepth from '../components/ParallaxDepth'
import useScrollReveal from '../hooks/useScrollReveal'
import '../styles/global.css'
import '../styles/footer.css'

const contactCards = [
  { label: 'Call', value: '8447725267', href: 'tel:+918447725267' },
  { label: 'WhatsApp', value: '8447725267', href: 'https://wa.me/918447725267' },
  { label: 'Email', value: 'mohit@numeromobile.com', href: 'mailto:mohit@numeromobile.com' },
]

const mapsUrl =
  'https://www.google.com/maps/search/?api=1&query=Spaze+ITech+Park+Tower+A1+Sector+49+Gurugram+Haryana+122018'

export default function Contact() {
  useScrollReveal()

  return (
    <>
      <Navbar />

      <section className="page-hero" style={{
        paddingTop: 150,
        paddingBottom: 80,
        background:
          'linear-gradient(145deg, rgba(255,225,190,0.94) 0%, rgba(255,212,163,0.78) 45%, rgba(123,108,240,0.4) 100%), url(https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=75) center/cover',
        color: 'var(--ink)',
      }}>
        <ParallaxDepth variant="hero" />
        <div className="container" data-parallax="-0.06">
          <div className="tag" style={{ color: 'var(--accent)' }}>Contact</div>
          <h1 style={{ color: 'var(--ink)', maxWidth: '16ch' }}>
            Tell us about your VAS, billing or payments needs.
          </h1>
          <p style={{ color: 'var(--muted)', marginTop: 14 }}>
            Call, message or email us — our team will guide you through the next steps.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 32 }}>
            <a href="https://wa.me/918447725267" target="_blank" rel="noopener noreferrer" className="btn-primary">
              Chat on WhatsApp
            </a>
            <a href="mailto:mohit@numeromobile.com" className="btn-outline">
              Email us
            </a>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--bg2)' }}>
        <div className="container">
          <div className="section-heading reveal">
            <div className="tag">Talk to us</div>
            <h2>Prefer to talk directly?</h2>
            <p>Call, message or email us — or visit our office in Gurugram.</p>
          </div>

          <div className="contact-cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 16 }}>
            {contactCards.map((c, i) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="glass-card reveal"
                style={{ padding: 24, textDecoration: 'none', transitionDelay: `${i * 0.08}s` }}
              >
                <h3 style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 8 }}>{c.label}</h3>
                <p style={{ fontSize: 16, fontWeight: 700, wordBreak: 'break-all' }}>{c.value}</p>
              </a>
            ))}
          </div>

          <div className="contact-office-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div className="glass-card reveal" style={{ padding: 24 }}>
              <h3 style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 8 }}>Our office</h3>
              <p style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>Gurugram, India</p>
              <p style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.55, color: 'var(--ink-soft)' }}>
                4th floor, Tower A1, SPAZE ITECH PARK, 417,<br />
                Sector 49, Gurugram, Haryana 122018
              </p>
            </div>
            <div className="glass-card reveal" style={{ padding: 24 }}>
              <h3 style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12 }}>Working hours</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 14 }}>Monday to Saturday</span>
                <span style={{ fontSize: 14, color: 'var(--muted)' }}>09:00 – 18:00 IST</span>
              </div>
            </div>
          </div>

          <div className="glass-card reveal" style={{ padding: 36, textAlign: 'center' }}>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 750, marginBottom: 8 }}>Gurugram, India</p>
            <p style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 20, lineHeight: 1.55 }}>
              4th floor, Tower A1, SPAZE ITECH PARK, 417,<br />
              Sector 49, Gurugram, Haryana 122018
            </p>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Open in Google Maps ↗
            </a>
          </div>

          <div style={{ marginTop: 28, textAlign: 'center' }}>
            <Link to="/services" className="service-arrow" style={{ color: 'var(--accent)', fontWeight: 700, fontSize: 14 }}>
              View all services →
            </Link>
          </div>
        </div>

        <style>{`
          @media (max-width: 900px) {
            .contact-cards-grid, .contact-office-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      <Footer />
    </>
  )
}
