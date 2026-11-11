import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ServicesHero from '../components/ServicesHero'
import useScrollReveal from '../hooks/useScrollReveal'
import { pillars, vasCategories, vasDemos, dcb, forex } from '../data/content'
import '../styles/global.css'
import '../styles/footer.css'

const [vasPillar, dcbPillar, forexPillar] = pillars

const cardTitle = { color: 'var(--white)', fontSize: 18, fontWeight: 700, marginBottom: 10 }
const cardText = { color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.75 }
const subHeading = { color: 'var(--white)', fontSize: 'clamp(1.3rem,2.2vw,1.8rem)', fontWeight: 800, margin: '72px 0 28px', fontFamily: 'Space Grotesk' }

function Chip({ color, children }) {
  return (
    <span style={{ padding: '4px 12px', borderRadius: 50, fontSize: 12, fontWeight: 600, background: `${color}14`, color, border: `1px solid ${color}30` }}>{children}</span>
  )
}

function Check({ color, children }) {
  return (
    <li style={{ display: 'flex', gap: 10, alignItems: 'flex-start', ...cardText }}>
      <span style={{ color, fontWeight: 800, flexShrink: 0 }}>✓</span>{children}
    </li>
  )
}

function PillarHeading({ pillar, tag }) {
  return (
    <div className="section-heading reveal">
      <div className="tag">{tag}</div>
      <h2>{pillar.title}</h2>
      <p><strong style={{ color: 'var(--white)' }}>{pillar.tagline}</strong> {pillar.desc}</p>
    </div>
  )
}

function VasSection() {
  return (
    <section className="section" id="vas" style={{ scrollMarginTop: 90 }}>
      <div className="container">
        <PillarHeading pillar={vasPillar} tag="Telecom Solutions" />
        <div className="grid-2" style={{ alignItems: 'stretch', gap: 24 }}>
          {vasCategories.map((c, i) => (
            <div key={c.id} className="glass-card reveal" style={{ padding: 32, borderTop: `2px solid ${c.accent}`, transitionDelay: `${i * 0.08}s` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                <span style={{ width: 48, height: 48, borderRadius: 14, background: c.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{c.emoji}</span>
                <div>
                  <h3 style={{ ...cardTitle, marginBottom: 2 }}>{c.title}</h3>
                  <span style={{ fontSize: 12, fontWeight: 600, color: c.accent }}>{c.tagline}</span>
                </div>
              </div>
              <p style={{ ...cardText, marginBottom: 20 }}>{c.intro}</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
                {c.items.map(item => (
                  <li key={item.name}>
                    <p style={{ color: 'var(--white)', fontWeight: 700, fontSize: 15 }}>
                      {item.name}{item.fullName && <span style={{ color: 'var(--text-muted)', fontWeight: 500, fontSize: 12 }}> · {item.fullName}</span>}
                    </p>
                    <p style={{ ...cardText, fontSize: 13 }}>{item.summary}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <h3 className="reveal" style={subHeading}>See it in action</h3>
        <div className="grid-4">
          {vasDemos.map((d, i) => (
            <div key={d.product} className="glass-card reveal" style={{ padding: 24, transitionDelay: `${i * 0.08}s` }}>
              <Chip color={vasPillar.color}>{d.product}</Chip>
              <h4 style={{ ...cardTitle, fontSize: 16, margin: '14px 0 8px' }}>{d.title}</h4>
              <p style={{ ...cardText, fontSize: 13 }}>{d.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function DcbSection() {
  const color = dcbPillar.color
  return (
    <section className="section" id="dcb" style={{ background: 'var(--dark2)', scrollMarginTop: 90 }}>
      <div className="container">
        <PillarHeading pillar={dcbPillar} tag="Carrier Billing · Content · Digital Marketing" />

        <div className="grid-2" style={{ alignItems: 'start' }}>
          <div className="reveal-left">
            <p style={{ ...cardText, fontSize: 16, marginBottom: 20 }}>{dcb.intro}</p>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {dcb.points.map(p => <Check key={p} color={color}>{p}</Check>)}
            </ul>
          </div>
          <div className="reveal-right" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color }}>How it works</p>
            {dcb.steps.map((s, i) => (
              <div key={s.title} className="glass-card" style={{ padding: 20, display: 'flex', gap: 16 }}>
                <span style={{ width: 36, height: 36, borderRadius: '50%', background: color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, flexShrink: 0 }}>{i + 1}</span>
                <div>
                  <h4 style={{ ...cardTitle, fontSize: 16, marginBottom: 4 }}>{s.title}</h4>
                  <p style={{ ...cardText, fontSize: 13 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <h3 className="reveal" style={subHeading}>Key benefits</h3>
        <div className="grid-3">
          {dcb.benefits.map((b, i) => (
            <div key={b.title} className="glass-card reveal" style={{ padding: 28, transitionDelay: `${i * 0.08}s` }}>
              <h4 style={cardTitle}>{b.title}</h4>
              <p style={cardText}>{b.desc}</p>
            </div>
          ))}
        </div>

        <h3 className="reveal" style={subHeading}>{dcb.nonData.title}</h3>
        <div className="grid-2" style={{ alignItems: 'start' }}>
          <div className="reveal-left">
            <p style={{ ...cardText, fontSize: 16, marginBottom: 20 }}>{dcb.nonData.desc}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {dcb.nonData.points.map(p => <Chip key={p} color={color}>{p}</Chip>)}
            </div>
          </div>
          <div className="reveal-right" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {dcb.nonData.products.map(p => (
              <div key={p.code} className="glass-card" style={{ padding: 24 }}>
                <p style={{ fontFamily: 'Space Grotesk', fontSize: 22, fontWeight: 800, color, marginBottom: 4 }}>{p.code}</p>
                <h4 style={{ ...cardTitle, fontSize: 16, marginBottom: 6 }}>{p.name}</h4>
                <p style={{ ...cardText, fontSize: 13 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <h3 className="reveal" style={subHeading}>Content for a global audience</h3>
        <p className="reveal" style={{ ...cardText, fontSize: 16, maxWidth: 820, marginBottom: 28 }}>{dcb.contentIntro}</p>
        <div className="grid-3">
          {dcb.content.map((c, i) => (
            <div key={c.title} className="glass-card reveal" style={{ padding: 28, transitionDelay: `${i * 0.06}s` }}>
              <div style={{ fontSize: 32, marginBottom: 14 }}>{c.emoji}</div>
              <h4 style={cardTitle}>{c.title}</h4>
              <p style={cardText}>{c.desc}</p>
            </div>
          ))}
        </div>

        <h3 className="reveal" style={subHeading}>Digital marketing</h3>
        <p className="reveal" style={{ ...cardText, fontSize: 16, maxWidth: 820, marginBottom: 28 }}>{dcb.marketingIntro}</p>
        <div className="grid-3">
          {dcb.marketing.map((m, i) => (
            <div key={m.title} className="glass-card reveal" style={{ padding: 28, transitionDelay: `${i * 0.06}s` }}>
              <div style={{ fontSize: 28, fontWeight: 900, fontFamily: 'Space Grotesk', color, marginBottom: 10 }}>{String(i + 1).padStart(2, '0')}</div>
              <h4 style={cardTitle}>{m.title}</h4>
              <p style={cardText}>{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ForexSection() {
  const color = forexPillar.color
  return (
    <section className="section" id="forex" style={{ scrollMarginTop: 90 }}>
      <div className="container">
        <PillarHeading pillar={forexPillar} tag="Cross-Border Payments" />

        <div className="grid-3" style={{ marginBottom: 56 }}>
          {forex.stats.map((s, i) => (
            <div key={s.label} className="glass-card reveal" style={{ padding: 28, textAlign: 'center', transitionDelay: `${i * 0.08}s` }}>
              <div style={{ fontSize: 36, fontWeight: 900, color, fontFamily: 'Space Grotesk' }}>{s.value}</div>
              <h4 style={{ ...cardTitle, fontSize: 16, margin: '4px 0 8px' }}>{s.label}</h4>
              <p style={{ ...cardText, fontSize: 13 }}>{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid-2" style={{ alignItems: 'stretch', gap: 24 }}>
          {forex.layers.map((l, i) => (
            <div key={l.label} className="glass-card reveal" style={{ padding: 32, borderTop: `2px solid ${color}`, transitionDelay: `${i * 0.08}s` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                <span style={{ fontSize: 26 }}>{l.emoji}</span>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color }}>{String(i + 1).padStart(2, '0')} · {l.label}</span>
              </div>
              <h3 style={cardTitle}>{l.title}</h3>
              <p style={{ ...cardText, marginBottom: 16 }}>{l.sub}</p>
              {l.solution && <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 8 }}>Problems to solve</p>}
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {l.points.map(p => <Check key={p} color={color}>{p}</Check>)}
              </ul>
              {l.solution && (
                <div style={{ marginTop: 18, padding: 16, borderRadius: 14, background: `${color}10`, border: `1px solid ${color}30` }}>
                  <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color, marginBottom: 6 }}>Proposed solution</p>
                  <p style={{ ...cardText, fontSize: 13 }}>{l.solution}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <h3 className="reveal" style={subHeading}>What you want — and why we deliver</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {forex.whyUs.map((w, i) => (
            <div key={w.want} className="glass-card reveal" style={{ padding: 20, display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 20, alignItems: 'center', transitionDelay: `${i * 0.06}s` }}>
              <div>
                <h4 style={{ ...cardTitle, fontSize: 15, marginBottom: 4 }}>{w.want}</h4>
                <p style={{ ...cardText, fontSize: 13 }}>{w.wantDesc}</p>
              </div>
              <span style={{ color, fontSize: 20, fontWeight: 800 }}>→</span>
              <div>
                <h4 style={{ ...cardTitle, fontSize: 15, marginBottom: 4, color }}>{w.why}</h4>
                <p style={{ ...cardText, fontSize: 13 }}>{w.whyDesc}</p>
              </div>
            </div>
          ))}
        </div>

        <h3 className="reveal" style={subHeading}>How we get you trading</h3>
        <div className="grid-3">
          {forex.phases.map((p, i) => (
            <div key={p.title} className="glass-card reveal" style={{ padding: 28, transitionDelay: `${i * 0.06}s` }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color }}>Phase {String(i + 1).padStart(2, '0')}</span>
              <h4 style={{ ...cardTitle, margin: '8px 0' }}>{p.title}</h4>
              <p style={cardText}>{p.desc}</p>
            </div>
          ))}
        </div>

        <div className="reveal" style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginTop: 40 }}>
          {forex.corridors.map(c => <Chip key={c} color={color}>{c}</Chip>)}
        </div>
      </div>
    </section>
  )
}

export default function Services() {
  useScrollReveal()

  return (
    <>
      <Navbar />
      <ServicesHero />
      <VasSection />
      <DcbSection />
      <ForexSection />

      {/* CTA */}
      <section className="section-sm">
        <div className="container">
          <div className="cta-section reveal">
            <h2>Unlock smarter telecom — <span className="gradient-text">get started now</span></h2>
            <p>Let’s talk solutions that grow with your business.</p>
            <div className="cta-btns">
              <Link to="/contact" className="btn-primary"><span>Contact Us</span> <span>→</span></Link>
              <Link to="/about" className="btn-outline">Learn About Us</Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
