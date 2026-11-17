import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import FlipCards from '../components/FlipCards'
import JourneySection from '../components/JourneySection'
import DiscShelf from '../components/DiscShelf'
import PhoneProducts from '../components/PhoneProducts'
import WhyTimeline from '../components/WhyTimeline'
import ForexChartCard from '../components/ForexChartCard'
import ServiceBookCard from '../components/ServiceBookCard'
import useScrollReveal from '../hooks/useScrollReveal'
import ParallaxDepth from '../components/ParallaxDepth'
import { pillars, forex } from '../data/content'
import '../styles/global.css'
import '../styles/home.css'

const stats = [
  { number: 6, suffix: '', label: 'Business lines' },
  { number: 14, suffix: '+', label: 'VAS products' },
  { number: 50, suffix: '+', label: 'Geos' },
  { number: 11, suffix: '', label: 'Offices' },
]

function useCountUp(target, active, duration = 1400) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!active) return
    let raf
    const start = performance.now()
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setValue(Math.round(target * eased))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active, target, duration])
  return value
}

function StatItem({ number, suffix, label, delay }) {
  const ref = useRef(null)
  const [active, setActive] = useState(false)
  const value = useCountUp(number, active)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setActive(true); io.disconnect() } },
      { threshold: 0.4 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className="stat-item reveal" style={{ transitionDelay: delay }}>
      <div className="stat-number">{value}{suffix}</div>
      <div className="stat-label">{label}</div>
    </div>
  )
}

const heroTitleWords = ['Connect', 'networks,', 'payments', '&', 'people', '—', 'in', 'one', 'clear', 'process.']

function TiltCard({ children, className = '', style, as: Tag = 'div', ...rest }) {
  const ref = useRef(null)

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    const rx = (0.5 - y) * 10
    const ry = (x - 0.5) * 12
    el.style.setProperty('--rx', `${rx.toFixed(2)}deg`)
    el.style.setProperty('--ry', `${ry.toFixed(2)}deg`)
    el.style.setProperty('--gx', `${(x * 100).toFixed(1)}%`)
    el.style.setProperty('--gy', `${(y * 100).toFixed(1)}%`)
  }

  const onLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
  }

  return (
    <Tag
      ref={ref}
      className={`tilt-card ${className}`.trim()}
      style={style}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export default function Home() {
  useScrollReveal()
  const heroRef = useRef(null)
  const spotlightRef = useRef(null)
  const booksGridRef = useRef(null)
  const bookNodesRef = useRef(new Map())
  const bookTimersRef = useRef({ open: 0, close: 0 })
  const focusBookIdRef = useRef(null)
  const openBookIdRef = useRef(null)
  const [focusBookId, setFocusBookId] = useState(null)
  const [openBookId, setOpenBookId] = useState(null)

  const updateFocusBookId = (id) => {
    focusBookIdRef.current = id
    setFocusBookId(id)
  }

  const updateOpenBookId = (id) => {
    openBookIdRef.current = id
    setOpenBookId(id)
  }

  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return
    const onMove = (e) => {
      const rect = hero.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 8
      hero.style.setProperty('--mx', `${x}px`)
      hero.style.setProperty('--my', `${y}px`)
      hero.style.setProperty('--hx', `${((e.clientX - rect.left) / rect.width) * 100}%`)
      hero.style.setProperty('--hy', `${((e.clientY - rect.top) / rect.height) * 100}%`)
    }
    hero.addEventListener('mousemove', onMove)
    return () => hero.removeEventListener('mousemove', onMove)
  }, [])

  useEffect(() => {
    const root = spotlightRef.current
    if (!root) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return undefined

    const onMove = (e) => {
      root.style.setProperty('--spot-x', `${e.clientX}px`)
      root.style.setProperty('--spot-y', `${e.clientY}px`)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  useEffect(() => () => {
    window.clearTimeout(bookTimersRef.current.open)
    window.clearTimeout(bookTimersRef.current.close)
  }, [])

  const clearBookRoll = (id) => {
    const node = bookNodesRef.current.get(id)
    if (!node) return
    node.style.removeProperty('--roll-x')
    node.style.removeProperty('--roll-y')
  }

  const setBookRollToCenter = (id, node) => {
    const grid = booksGridRef.current
    if (!grid || !node) return
    bookNodesRef.current.set(id, node)
    // Measure from resting slot (ignore any prior focus transform)
    const prevX = node.style.getPropertyValue('--roll-x')
    const prevY = node.style.getPropertyValue('--roll-y')
    node.style.setProperty('--roll-x', '0px')
    node.style.setProperty('--roll-y', '0px')
    const g = grid.getBoundingClientRect()
    const b = node.getBoundingClientRect()
    const dx = g.left + g.width / 2 - (b.left + b.width / 2)
    const dy = g.top + g.height / 2 - (b.top + b.height / 2)
    if (prevX) node.style.setProperty('--roll-x', prevX)
    else node.style.removeProperty('--roll-x')
    if (prevY) node.style.setProperty('--roll-y', prevY)
    else node.style.removeProperty('--roll-y')
    // Next frame: animate to center
    requestAnimationFrame(() => {
      node.style.setProperty('--roll-x', `${dx}px`)
      node.style.setProperty('--roll-y', `${dy}px`)
    })
  }

  const handleBookSelect = (id, node) => {
    window.clearTimeout(bookTimersRef.current.open)
    window.clearTimeout(bookTimersRef.current.close)
    const currentFocus = focusBookIdRef.current
    const currentOpen = openBookIdRef.current

    // Outside click / Escape → put the book back
    if (!id) {
      updateOpenBookId(null)
      bookTimersRef.current.close = window.setTimeout(() => {
        if (focusBookIdRef.current) clearBookRoll(focusBookIdRef.current)
        updateFocusBookId(null)
      }, 420)
      return
    }

    // Same book while open → close & roll back
    if (currentFocus === id && currentOpen === id) {
      updateOpenBookId(null)
      bookTimersRef.current.close = window.setTimeout(() => {
        clearBookRoll(id)
        updateFocusBookId(null)
      }, 420)
      return
    }

    // Same book still rolling → ignore
    if (currentFocus === id && currentOpen !== id) return

    // Switch focus: close previous, roll new one in, then auto-open
    if (currentFocus && currentFocus !== id) clearBookRoll(currentFocus)
    updateOpenBookId(null)
    updateFocusBookId(id)
    if (node) setBookRollToCenter(id, node)

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    bookTimersRef.current.open = window.setTimeout(() => {
      updateOpenBookId(id)
    }, reduce ? 40 : 680)
  }

  return (
    <div className="home-page" ref={spotlightRef}>
      <Navbar />

      <section className="home-hero" ref={heroRef}>
        <div className="home-hero-bg" aria-hidden="true">
          <div className="home-hero-media" data-parallax="0.28">
            <img
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2000&q=80"
              alt=""
            />
          </div>
          <div className="home-hero-overlay" />
          <div className="home-hero-spotlight" />
          <div className="home-hero-aurora" data-parallax="0.18" data-parallax-x="0.12" />
          <div className="home-hero-grid" data-parallax="0.08" />
          <svg className="home-hero-signals" data-parallax="0.12" viewBox="0 0 1200 400" preserveAspectRatio="none" aria-hidden="true">
            <path className="signal-path s1" d="M0 280 C 200 220, 320 340, 520 260 S 820 180, 1200 240" fill="none" />
            <path className="signal-path s2" d="M0 320 C 180 360, 400 240, 620 300 S 940 340, 1200 280" fill="none" />
            <path className="signal-path s3" d="M0 200 C 240 160, 380 280, 600 200 S 900 120, 1200 180" fill="none" />
          </svg>
          <div className="home-hero-orb o1" data-parallax="0.35" data-parallax-x="-0.2" />
          <div className="home-hero-orb o2" data-parallax="0.22" data-parallax-x="0.18" />
          <div className="home-hero-orb o3" data-parallax="0.3" />
          <div className="home-hero-rings" aria-hidden="true" data-parallax="0.1">
            <span /><span /><span />
          </div>
          <div className="home-hero-particles" aria-hidden="true">
            {Array.from({ length: 18 }).map((_, i) => (
              <span key={i} style={{ '--i': i }} />
            ))}
          </div>
          <div className="home-hero-scan" aria-hidden="true" />
          <div className="home-hero-grain" />
          <div className="home-hero-fade" />
        </div>

        <div className="container home-hero-content" data-parallax="-0.08">
          <div className="home-hero-live">
            <span className="home-hero-live-dot" />
            <span className="home-hero-live-full">Live across networks &amp; corridors</span>
            <span className="home-hero-live-short">Live · VAS · DCB · Forex</span>
          </div>

          <p className="home-hero-brand">
            <span className="home-hero-flip" aria-label="Numero Mobile">
              <span className="home-hero-flip-inner">
                <span className="home-hero-flip-face home-hero-flip-front">Numero Mobile</span>
                <span className="home-hero-flip-face home-hero-flip-back" aria-hidden="true">Numero Mobile</span>
              </span>
            </span>
          </p>

          <h1 className="home-hero-title home-hero-title-stagger">
            {heroTitleWords.map((word, i) => (
              <span key={`${word}-${i}`} className="home-hero-word" style={{ animationDelay: `${0.28 + i * 0.05}s` }}>
                {word}{' '}
              </span>
            ))}
          </h1>

          <p className="home-hero-sub">
            VAS, carrier billing, content &amp; cross-border payments across 50+ geos.
          </p>

          <div className="home-hero-meta">
            {[
              { k: 'VAS', v: 'Any phone, any network' },
              { k: 'DCB', v: 'Pay with mobile balance' },
              { k: 'D2C', v: 'Content & digital reach' },
              { k: 'Forex', v: '24–48h corridors' },
            ].map((m, i) => (
              <div key={m.k} className="home-hero-meta-item" style={{ animationDelay: `${0.55 + i * 0.08}s` }}>
                <strong>{m.k}</strong>
                <span>{m.v}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="home-hero-scroll" aria-hidden="true">
          <span>Scroll</span>
          <div className="home-hero-scroll-line" />
        </div>
      </section>

      <div className="stats-bar">
        <div className="container">
          <div className="stats-grid">
            {stats.map((s, i) => (
              <StatItem key={s.label} {...s} delay={`${i * 0.08}s`} />
            ))}
          </div>
        </div>
      </div>

      <section className="section services-section">
        <ParallaxDepth />
        <div className="container">
          <div className="section-heading reveal">
            <div className="tag">What we do</div>
            <h2>Four lines. <em>One partner.</em></h2>
            <p>VAS, Direct Carrier Billing, D2C content & digital, and Forex — built to scale with operators and enterprises.</p>
          </div>
          <div
            ref={booksGridRef}
            className={`services-grid${focusBookId ? ' is-focused' : ''}`}
          >
            {pillars.map((s, i) => (
              <ServiceBookCard
                key={s.id}
                id={s.id}
                icon={s.icon}
                title={s.title}
                tagline={s.tagline}
                desc={s.desc}
                color={s.color}
                index={i}
                focused={focusBookId === s.id}
                open={openBookId === s.id}
                dimmed={Boolean(focusBookId && focusBookId !== s.id)}
                onSelect={handleBookSelect}
                style={{ transitionDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        </div>
      </section>

      <DiscShelf />
      <PhoneProducts />

      <JourneySection />

      <section className="section vas-section">
        <ParallaxDepth />
        <div className="container">
          <div className="section-heading reveal">
            <div className="tag">Telecom Solutions</div>
            <h2>VAS Platforms</h2>
            <p>
              <strong style={{ color: 'var(--ink)' }}>Telecom solutions that connect, engage &amp; grow.</strong>{' '}
              From USSD and SMS Gateway to mobile advertising — the network capabilities, value-added services and campaigns operators and enterprises need, in one place.
            </p>
          </div>
          <FlipCards />
        </div>
      </section>

      <WhyTimeline />

      <section className="section forex-section">
        <ParallaxDepth />
        <div className="container">
          <div className="section-heading reveal">
            <div className="tag">Forex & cross-border</div>
            <h2>Liquidity <em>across the world</em></h2>
            <p>{forex.layers[1].solution}</p>
          </div>
          <div className="reveal">
            <ForexChartCard />
          </div>
          <div className="forex-cta">
            <Link to="/services#forex" className="btn-outline btn-magnetic">Explore cross-border payments →</Link>
          </div>
        </div>
      </section>

      <section className="section-sm">
        <div className="container">
          <div className="cta-section reveal">
            <div className="cta-glow" aria-hidden="true" />
            <div className="cta-particles" aria-hidden="true">
              {Array.from({ length: 12 }).map((_, i) => (
                <span key={i} style={{ '--i': i }} />
              ))}
            </div>
            <h2>Ready to grow with <em>Numero</em>?</h2>
            <p>Let’s talk about launching VAS, DCB, content, digital campaigns and cross-border payments that grow with your business.</p>
            <div className="cta-btns">
              <Link to="/contact" className="btn-primary btn-shine btn-magnetic">
                <span>Contact us</span>
                <span className="btn-arrow">→</span>
              </Link>
              <Link to="/services" className="btn-outline btn-ghost btn-magnetic">View services</Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
