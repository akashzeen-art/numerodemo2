import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import FlipCards from '../components/FlipCards'
import JourneySection from '../components/JourneySection'
import useScrollReveal from '../hooks/useScrollReveal'
import { pillars, forex, marqueeItems, vasProducts, dcb } from '../data/content'
import '../styles/global.css'
import '../styles/home.css'

const stats = [
  { number: '3', label: 'Business Lines' },
  { number: `${vasProducts.length}`, label: 'VAS Products' },
  { number: `${dcb.content.length}`, label: 'Content Categories' },
  { number: '50+', label: 'Currencies' },
]

const whyUs = [
  { icon: '📡', title: 'Carrier-Grade VAS',    desc: 'USSD, SMSC, Cloud IVR, CRBT and messaging on one carrier-grade platform.' },
  { icon: '📱', title: 'Mobile-First Payments', desc: 'Checkout built for the phone, paid with just a mobile number.' },
  { icon: '🌍', title: 'Global Content',        desc: 'Games, VOD, audio books and more, regularly refreshed for a global audience.' },
  { icon: '📊', title: 'Measurable Outcomes',   desc: 'Track every transaction and campaign with clear, measurable results.' },
  { icon: '💱', title: 'Deep Liquidity',        desc: '50+ currencies across major, exotic and illiquid markets.' },
  { icon: '🛡️', title: 'Compliance & Control',  desc: 'Secure information, clear accountability and regulation-ready workflows.' },
]

// 3D Tilt Card
function TiltCard({ children, className, style }) {
  const ref = useRef(null)
  const handleMove = e => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(1000px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) translateZ(10px)`
  }
  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0px)'
  }
  return (
    <div ref={ref} className={className} style={{ ...style, transition: 'transform 0.3s ease', transformStyle: 'preserve-3d' }}
      onMouseMove={handleMove} onMouseLeave={handleLeave}>
      {children}
    </div>
  )
}

// Particle background
function Particles() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.4 + 0.1,
    }))
    let raf
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(124,58,237,${p.opacity})`
        ctx.fill()
      })
      // Draw connections
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach(b => {
          const dist = Math.hypot(a.x - b.x, a.y - b.y)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(124,58,237,${0.08 * (1 - dist / 120)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })
      raf = requestAnimationFrame(draw)
    }
    draw()
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }} />
}

// Typewriter
function Typewriter({ words }) {
  const [idx, setIdx] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)
  useEffect(() => {
    const word = words[idx]
    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(word.slice(0, text.length + 1))
        if (text.length === word.length) setTimeout(() => setDeleting(true), 1500)
      } else {
        setText(word.slice(0, text.length - 1))
        if (text.length === 0) { setDeleting(false); setIdx((idx + 1) % words.length) }
      }
    }, deleting ? 50 : 100)
    return () => clearTimeout(timeout)
  }, [text, deleting, idx, words])
  return (
    <span style={{ color: 'var(--neon)', textShadow: '0 0 20px rgba(0,255,240,0.6)' }}>
      {text}<span style={{ animation: 'blink 1s infinite', borderRight: '2px solid var(--neon)' }} />
    </span>
  )
}

export default function Home() {
  useScrollReveal()

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="home-hero">

        {/* ── Background ── */}
        <div className="home-hero-bg">
          <div className="home-hero-video-wrap">
            <video
              src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
              poster="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=75"
              autoPlay loop playsInline muted preload="metadata" />
          </div>
          <div className="home-hero-overlay" />
          <div className="home-hero-radial" />
          <div className="home-hero-lines" />
          <div className="home-hero-blob home-hero-blob-1" />
          <div className="home-hero-blob home-hero-blob-2" />
          <svg viewBox="0 0 1400 120" preserveAspectRatio="none" className="home-hero-ecg" aria-hidden="true">
            <path d="M0 60 h50 l8 -10 l8 10 h12 l6 8 l10 -48 l10 64 l8 -24 h18 l14 -12 l14 12 h42 h50 l8 -10 l8 10 h12 l6 8 l10 -48 l10 64 l8 -24 h18 l14 -12 l14 12 h42 h50 l8 -10 l8 10 h12 l6 8 l10 -48 l10 64 l8 -24 h18 l14 -12 l14 12 h42 h50 l8 -10 l8 10 h12 l6 8 l10 -48 l10 64 l8 -24 h18 l14 -12 l14 12 h42 h50 l8 -10 l8 10 h12 l6 8 l10 -48 l10 64 l8 -24 h18 l14 -12 l14 12 h42 h50 l8 -10 l8 10 h12 l6 8 l10 -48 l10 64 l8 -24 h18 l14 -12 l14 12 h42 h50 l8 -10 l8 10 h12 l6 8 l10 -48 l10 64 l8 -24 h18 l14 -12 l14 12 h42"
              fill="none" stroke="rgba(124,58,237,0.3)" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
            <path d="M0 60 h50 l8 -10 l8 10 h12 l6 8 l10 -48 l10 64 l8 -24 h18 l14 -12 l14 12 h42 h50 l8 -10 l8 10 h12 l6 8 l10 -48 l10 64 l8 -24 h18 l14 -12 l14 12 h42 h50 l8 -10 l8 10 h12 l6 8 l10 -48 l10 64 l8 -24 h18 l14 -12 l14 12 h42 h50 l8 -10 l8 10 h12 l6 8 l10 -48 l10 64 l8 -24 h18 l14 -12 l14 12 h42 h50 l8 -10 l8 10 h12 l6 8 l10 -48 l10 64 l8 -24 h18 l14 -12 l14 12 h42 h50 l8 -10 l8 10 h12 l6 8 l10 -48 l10 64 l8 -24 h18 l14 -12 l14 12 h42 h50 l8 -10 l8 10 h12 l6 8 l10 -48 l10 64 l8 -24 h18 l14 -12 l14 12 h42"
              pathLength="1" fill="none" stroke="#a78bfa" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke"
              className="home-hero-ecg-path" />
          </svg>
          <div className="home-hero-fade" />
        </div>

        {/* ── Floating icons (desktop) ── */}
        <div className="home-hero-floaters" aria-hidden="true">
          {[{icon:'💱',top:'20%',right:'3%',delay:'0s',size:56},{icon:'📡',top:'13%',right:'40%',delay:'0.8s',size:44},{icon:'📱',bottom:'36%',right:'33%',delay:'1.6s',size:44},{icon:'🛡️',bottom:'40%',right:'2%',delay:'2.2s',size:48},{icon:'⚡',top:'11%',left:'44%',delay:'1.2s',size:36},{icon:'📊',top:'9%',right:'16%',delay:'2.8s',size:40}].map((f,i)=>(
            <div key={i} className="home-hero-floater" style={{ top:f.top, bottom:f.bottom, right:f.right, left:f.left, width:f.size, height:f.size, fontSize:f.size*0.42, animationDelay:f.delay }}>{f.icon}</div>
          ))}
        </div>

        {/* ── Main content ── */}
        <div className="container home-hero-content">
          <div className="home-hero-grid">

            {/* Left */}
            <div className="home-hero-copy">
              <p className="home-hero-pill">
                <span className="home-hero-pill-dot">
                  <span className="home-hero-pill-ping" />
                  <span className="home-hero-pill-core" />
                </span>
                VAS · Carrier Billing · Cross-Border Payments
              </p>

              <h1 className="home-hero-title">
                {['Connect,','Engage'].map((w,i)=>(
                  <span key={i} className="home-hero-word-wrap">
                    <span className="home-hero-word-grad" style={{ animationDelay:`${0.3+i*0.1}s` }}>{w}</span>
                  </span>
                ))}
                <br />
                {['&','Grow.'].map((w,i)=>(
                  <span key={i} className="home-hero-word-wrap">
                    <span className="home-hero-word" style={{ animationDelay:`${0.55+i*0.1}s` }}>{w}</span>
                  </span>
                ))}
              </h1>

              <p className="home-hero-sub">
                Telecom VAS platforms, Direct Carrier Billing with content and digital marketing, and cross-border payments that connect countries, currencies and stakeholders into one clear process.
              </p>

              <div className="home-hero-btns">
                <Link to="/contact" className="btn-primary"><span>Get Free Quote</span> <span>→</span></Link>
                <Link to="/services" className="btn-outline">Explore Services</Link>
              </div>
            </div>

            {/* Right — orbit visual */}
            <div className="home-hero-visual">
              <span className="home-hero-pulse" />
              <svg viewBox="0 0 100 100" className="home-hero-ring home-hero-ring-outer" aria-hidden="true">
                <circle cx="50" cy="50" r="49" fill="none" stroke="currentColor" strokeWidth="0.4" strokeDasharray="2 3" />
              </svg>
              <svg viewBox="0 0 100 100" className="home-hero-ring home-hero-ring-inner" aria-hidden="true">
                <circle cx="50" cy="50" r="49" fill="none" stroke="currentColor" strokeWidth="0.25" />
                <circle cx="50" cy="1" r="1.3" fill="#a78bfa" />
                <circle cx="1" cy="50" r="0.9" fill="#fff" />
              </svg>
              <div className="home-hero-orbit">
                <span className="home-hero-orbit-spark">⚡</span>
              </div>
              <div className="home-hero-circle">
                <img src="/images/slider-img.png" alt="hero" />
                <span className="home-hero-circle-shade" />
              </div>
              {[
                { label:'Telecom VAS', icon:'📡', className:'home-hero-badge b1' },
                { label:'Carrier Billing', icon:'📱', className:'home-hero-badge b2' },
                { label:'50+ Currencies', icon:'💱', className:'home-hero-badge b3' },
              ].map((b,i)=>(
                <div key={i} className={b.className}>
                  <div className="home-hero-badge-inner">
                    <span className="home-hero-badge-icon">
                      <span className="home-hero-badge-ping" />
                      {b.icon}
                    </span>
                    <span className="home-hero-badge-label">{b.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="marquee-section">
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <div key={i} className="marquee-item">
              <div className="marquee-dot" />
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="stats-bar">
        <div className="container">
          <div className="stats-grid">
            {stats.map((s, i) => (
              <div key={i} className="stat-item reveal" style={{ transitionDelay: `${i * 0.12}s` }}>
                <div className="stat-number">{s.number}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Services */}
      <section className="section">
        <div className="container">
          <div className="section-heading reveal">
            <div className="tag">What We Do</div>
            <h2>Our <span className="gradient-text">Core Services</span></h2>
            <p>Telecom VAS, Direct Carrier Billing and cross-border payments</p>
          </div>
          <div className="services-grid">
            {pillars.map((s, i) => (
              <TiltCard key={s.id} className="service-card reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="service-card-inner">
                  <div className="service-icon" style={{ background: `${s.color}18`, borderColor: `${s.color}30` }}>
                    <img src={`/images/${s.icon}`} alt={s.title} />
                  </div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                  <Link to={`/services#${s.id}`} className="service-arrow" style={{ color: s.color, textDecoration: 'none' }}>Learn more →</Link>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* Flip Cards */}
      <section className="section" style={{ background: 'var(--dark2)' }}>
        <div className="container">
          <div className="section-heading reveal">
            <div className="tag">VAS Solution Families</div>
            <h2>Reach Every Subscriber, <span className="gradient-text">On Any Phone</span></h2>
            <p>USSD, messaging, voice, ringback tones and mobile advertising working together on one carrier-grade platform.</p>
          </div>
          <FlipCards />
        </div>
      </section>

      {/* Why Us */}
      <section className="section why-us">
        <div className="container">
          <div className="grid-2">
            <div className="reveal-left">
              <div className="tag">Why Choose Us</div>
              <h2 style={{ fontSize: 'clamp(1.8rem,3vw,2.8rem)', fontWeight: 800, color: 'var(--white)', marginBottom: 16 }}>
                One Partner, <span className="gradient-text">Every Channel</span>
              </h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: 40, lineHeight: 1.85, fontSize: 16 }}>
                From operators and third-party VAS providers to enterprises and financial institutions, we deliver telecom solutions, carrier billing with content and digital marketing, and cross-border payments that move value securely, with speed, clarity and fewer intermediaries.
              </p>
              <Link to="/about" className="btn-primary"><span>Learn More About Us</span> <span>→</span></Link>
            </div>
            <div className="why-grid reveal-right">
              {whyUs.map((w, i) => (
                <div key={i} className="why-item">
                  <div className="why-icon">{w.icon}</div>
                  <div>
                    <h4>{w.title}</h4>
                    <p>{w.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <JourneySection />

      {/* Forex highlight */}
      <section className="section">
        <div className="container">
          <div className="section-heading reveal">
            <div className="tag">Forex & Cross-Border Payments</div>
            <h2>Liquidity <span className="gradient-text">Across the World</span></h2>
            <p>{forex.layers[1].solution}</p>
          </div>
          <div className="grid-3">
            {forex.stats.map((s, i) => (
              <div key={s.label} className="glass-card reveal" style={{ padding: 32, textAlign: 'center', transitionDelay: `${i * 0.1}s` }}>
                <div style={{ fontSize: 40, fontWeight: 900, background: 'var(--gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontFamily: 'Space Grotesk', marginBottom: 6 }}>{s.value}</div>
                <h3 style={{ color: 'var(--white)', fontSize: 16, fontWeight: 700, marginBottom: 10 }}>{s.label}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="reveal" style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginTop: 40 }}>
            {forex.corridors.map(c => (
              <span key={c} style={{ padding: '7px 16px', borderRadius: 50, background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.25)', fontSize: 13, fontWeight: 600, color: '#67e8f9' }}>{c}</span>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <Link to="/services#forex" className="btn-outline">Explore Cross-Border Payments →</Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-sm">
        <div className="container">
          <div className="cta-section reveal">
            <h2>Ready to <span className="gradient-text-neon">Grow</span> Your Business?</h2>
            <p>Let’s talk about launching VAS, DCB, content, digital campaigns and cross-border payments that grow with your business.</p>
            <div className="cta-btns">
              <Link to="/contact" className="btn-primary"><span>Contact Us Now</span> <span>→</span></Link>
              <Link to="/services" className="btn-outline">View Services</Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes morph { 0%,100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; } 50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; } }
        @keyframes neon-pulse { 0%,100% { text-shadow: 0 0 10px rgba(0,255,240,0.8), 0 0 30px rgba(0,255,240,0.4); } 50% { text-shadow: 0 0 20px rgba(0,255,240,1), 0 0 60px rgba(0,255,240,0.6); } }
        @keyframes gradient-x { 0%,100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        @keyframes count-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
      `}</style>
    </>
  )
}
