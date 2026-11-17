import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import useScrollReveal from '../hooks/useScrollReveal'
import ParallaxDepth from '../components/ParallaxDepth'
import { vasProducts, dcb, forex, marqueeItems } from '../data/content'
import '../styles/global.css'
import '../styles/footer.css'
import '../styles/portfolio.css'

const products = vasProducts.map((p, i) => ({ ...p, num: String(i + 1).padStart(2, '0') }))
const productTotal = String(products.length).padStart(2, '0')

const platformFeatures = [
  'Carrier-grade scalability and reliability',
  'Built-in load balancing and automated failover',
  'Multilingual support for UCS2 and GSM 7-bit',
  'HTTP, SMPP, SS7 MAP and SIP interfaces',
  'JMX, CLI, CDR logging and reporting',
]

const domains = forex.layers.map((l) => ({
  icon: l.emoji,
  title: l.label,
  sub: l.title,
  desc: l.solution || `${l.points.slice(0, 2).join('. ')}.`,
}))

const faqs = [
  { q: 'What is Direct Carrier Billing?', a: dcb.intro },
  { q: 'Do subscribers need internet or an app to use USSD services?', a: 'No. USSD delivers real-time, interactive menus that work on any device with no app and no internet — a subscriber dials a short code, browses offers and activates one in seconds, billed straight to the operator account.' },
  { q: 'What content can be sold through carrier billing?', a: `Our content library covers ${dcb.content.map((c) => c.title).join(', ')}. Our content team works continuously to refresh and update our repositories with the latest and most interesting content.` },
  { q: 'Which currencies and markets do you cover for cross-border payments?', a: 'We provide currency liquidity across 50+ currencies, including most African markets and selected corridors worldwide, for both inward and outward payments. Additional corridors — exotic and illiquid markets included — are available on request.' },
  { q: 'How fast are cross-border payments settled?', a: 'We operate a 24-48 hour operating model, purpose-built for restricted, exotic and high-friction corridors where conventional banking falls short.' },
  { q: 'How is my money protected?', a: 'Every transaction is structured with full deal insurance, finances are backed up as per deposits through a licensed escrow account, and every approval, update and settlement event is logged for review.' },
]

function Hero() {
  return (
    <section className="port-hero">
      <div className="port-hero-bg">
        <div className="port-hero-media" data-parallax="0.26">
          <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=75" alt="" />
        </div>
        <div className="port-hero-overlay" />
        <div className="port-hero-aurora" aria-hidden="true" data-parallax="0.16" data-parallax-x="0.1" />
        <div className="port-hero-fade" />
      </div>

      <div className="container port-hero-inner" data-parallax="-0.06">
        <div className="port-hero-grid">
          <div>
            <p className="port-eyebrow port-fade-up" style={{ animationDelay: '0.1s' }}>
              <span className="port-eyebrow-dot" />
              Products & Solutions
            </p>
            <h1 className="port-fade-up" style={{ animationDelay: '0.2s' }}>
              One Partner,<br />
              <span className="port-hero-em">Every Channel</span>
            </h1>
            <p className="port-hero-lead port-fade-up" style={{ animationDelay: '0.35s' }}>
              USSD, messaging, voice, ringback tones and mobile advertising on one carrier-grade platform — plus carrier billing, global content and cross-border payments.
            </p>
            <div className="port-hero-actions port-fade-up" style={{ animationDelay: '0.5s' }}>
              <a href="#included" className="btn-primary btn-shine"><span>Explore Products</span><span className="btn-arrow">↓</span></a>
              <Link to="/contact" className="btn-outline">Talk to Us →</Link>
            </div>
            <ul className="port-chips port-fade-up" style={{ animationDelay: '0.65s' }}>
              {[`${products.length} VAS Products`, `${dcb.content.length} Content Categories`, '50+ Geos', '24–48 H Turnaround'].map((c) => (
                <li key={c}><span />{c}</li>
              ))}
            </ul>
          </div>

          <div className="port-panel port-fade-up" style={{ animationDelay: '0.4s' }}>
            <div className="port-panel-glow" aria-hidden="true" />
            <div className="port-panel-card">
              <div className="port-panel-head">
                <span className="port-panel-icon">📡</span>
                <div>
                  <strong>Carrier-Grade Platform</strong>
                  <em>Built into every product</em>
                </div>
                <span className="port-panel-badge">Standard</span>
              </div>
              <ul className="port-panel-list">
                {platformFeatures.map((item) => (
                  <li key={item}>
                    <span className="port-panel-check">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="port-panel-foot">
                <span>Works with MNOs and MVNOs</span>
                <span>{products.length} VAS products</span>
              </p>
            </div>

            <div className="port-float" style={{ top: '-5%', right: '-4%', animationDelay: '0s' }}>
              <div className="port-float-pill">
                <i style={{ background: '#2bb894' }}>📡</i>
                <span>Telecom VAS</span>
              </div>
            </div>
            <div className="port-float" style={{ bottom: '-6%', right: '8%', animationDelay: '2.2s' }}>
              <div className="port-float-pill">
                <i style={{ background: '#7b6cf0' }}>📱</i>
                <span>Carrier Billing</span>
              </div>
            </div>
          </div>
        </div>

        <p className="port-marquee-label">Products & capabilities</p>
        <div className="port-marquee">
          <div className="port-marquee-track">
            {[...marqueeItems, ...marqueeItems].map((h, i) => (
              <span key={`${h}-${i}`}>{h}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function IncludedSection() {
  const [active, setActive] = useState(0)
  const s = products[active]

  return (
    <section id="included" className="port-section">
      <ParallaxDepth />
      <div className="container">
        <div className="section-heading reveal">
          <div className="tag">VAS Product Explorer</div>
          <h2>Telecom Solutions That <span className="gradient-text">Connect, Engage & Grow</span></h2>
          <p>Offers enablement, core VAS, VAS & digital and mobile advertisement — every product on one carrier-grade platform.</p>
        </div>

        <div className="port-included-grid">
          <div>
            <p className="port-pick-hint"><span>👆</span> Choose a product to see what it does</p>
            <ul className="port-product-grid">
              {products.map((svc, i) => (
                <li key={svc.name}>
                  <button
                    type="button"
                    className={`port-product-btn${i === active ? ' is-active' : ''}`}
                    onClick={() => setActive(i)}
                  >
                    <span className="port-product-emoji">{svc.emoji}</span>
                    <span style={{ minWidth: 0, flex: 1 }}>
                      <span className="port-product-meta">{svc.num} · {svc.category}</span>
                      <span className="port-product-name">{svc.name}</span>
                    </span>
                    {i === active && <span className="port-product-check">✓</span>}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="port-detail">
            <div className="port-detail-banner">
              <span className="port-detail-banner-emoji">{s.emoji}</span>
              <div className="port-detail-cat">
                <i style={{ background: s.accent }} />
                {s.category}
              </div>
              <div className="port-detail-num">{s.num} / {productTotal}</div>
            </div>
            <div className="port-detail-body">
              <span className="port-detail-avatar">{s.emoji}</span>
              <h3>{s.name}</h3>
              <p className="port-detail-headline">{s.headline}</p>
              <p className="port-detail-summary">{s.summary}</p>
              {s.fullName && <span className="port-detail-full">{s.fullName}</span>}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ExtrasSection() {
  return (
    <section className="port-section port-section-alt">
      <ParallaxDepth />
      <div className="container">
        <div className="section-heading">
          <div className="tag">Content Library</div>
          <h2>Content for a <span className="gradient-text">Global Audience</span></h2>
          <p>We have the channel, as well as the content, across so many categories — sold instantly through Direct Carrier Billing.</p>
        </div>
        <div className="port-note-wrap">
          <span className="port-note">🔄 Repositories refreshed regularly with trending, high-quality content</span>
        </div>
        <div className="port-extras-grid">
          {dcb.content.map((c, i) => (
            <article key={c.title} className="port-extra" style={{ transitionDelay: `${i * 0.08}s` }}>
              <div className="port-extra-top">
                <span className="port-extra-icon">{c.emoji}</span>
                <span className="port-extra-plus">+</span>
              </div>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function DomainsSection() {
  const [flipped, setFlipped] = useState(null)
  return (
    <section className="port-section port-section-soft">
      <ParallaxDepth />
      <div className="container">
        <div className="section-heading">
          <div className="tag">Forex & Cross-Border Payments</div>
          <h2>Four Connected <span className="gradient-text">Platform Layers</span></h2>
          <p>From repatriation coordination to currency liquidity, compliance and the full payment journey — hover each card to explore.</p>
        </div>
        <div className="port-domains-grid">
          {domains.map((d, i) => (
            <div
              key={d.title}
              className={`port-flip${flipped === i ? ' is-flipped' : ''}`}
              onMouseEnter={() => setFlipped(i)}
              onMouseLeave={() => setFlipped(null)}
              onClick={() => setFlipped(flipped === i ? null : i)}
            >
              <div className="port-flip-inner">
                <div className="port-flip-face port-flip-front">
                  <span className="port-flip-icon">{d.icon}</span>
                  <div>
                    <h3>{d.title}</h3>
                    <p>{d.sub}</p>
                    <p className="port-flip-hint">↻ Hover to see more</p>
                  </div>
                </div>
                <div className="port-flip-face port-flip-back">
                  <span className="port-flip-back-icon">{d.icon}</span>
                  <h4>{d.title}</h4>
                  <p>{d.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="port-highlights">
          <p>✓ {forex.highlights.join(' · ')}</p>
        </div>
      </div>
    </section>
  )
}

function FAQSection() {
  const [open, setOpen] = useState(0)
  return (
    <section className="port-section">
      <div className="container">
        <div className="section-heading reveal">
          <div className="tag">FAQs</div>
          <h2>Frequently Asked <span className="gradient-text">Questions</span></h2>
          <p>Answers to common questions about VAS, carrier billing and cross-border payments.</p>
        </div>
        <div className="port-faq-list">
          {faqs.map((f, i) => (
            <div
              key={f.q}
              className={`port-faq-item reveal${open === i ? ' is-open' : ''}`}
              style={{ transitionDelay: `${i * 0.07}s` }}
            >
              <button type="button" className="port-faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
                <span>{f.q}</span>
                <span className="port-faq-toggle">+</span>
              </button>
              {open === i && <p className="port-faq-a">{f.a}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTASection() {
  return (
    <section className="section-sm">
      <div className="container">
        <div className="cta-section reveal">
          <h2>Partner with us for an <span className="gradient-text-neon">exceptional journey</span></h2>
          <p>Let’s build exceptional together — talk to us about VAS, carrier billing, content, digital campaigns and cross-border payments.</p>
          <div className="cta-btns">
            <Link to="/contact" className="btn-primary"><span>Get Free Consultation</span> <span>→</span></Link>
            <Link to="/services" className="btn-outline">View Services</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Portfolio() {
  useScrollReveal()
  return (
    <div className="port-page">
      <Navbar />
      <Hero />
      <IncludedSection />
      <ExtrasSection />
      <DomainsSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  )
}
