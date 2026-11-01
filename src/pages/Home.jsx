import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import useScrollReveal from '../hooks/useScrollReveal'
import '../styles/global.css'
import '../styles/home.css'

const services = [
  { icon: 'server.png', title: 'IT Infrastructure', desc: 'Data Center consultation, implementation and Network upgradation for enterprises.', color: '#7c3aed' },
  { icon: 'cloud.png', title: 'Cloud Managed Services', desc: 'AWS, Azure & GCP optimization, cyber-secure backup and managed cloud.', color: '#06b6d4' },
  { icon: 'robot.png', title: 'RPA & Automation', desc: 'Robotic Process Automation for OCR, IDP and Contract Lifecycle Management.', color: '#f59e0b' },
  { icon: 'graph.png', title: 'Data Analytics', desc: 'Business Intelligence, predictive analytics and hands-on training support.', color: '#10b981' },
  { icon: 'user-check-icon.png', title: 'E-Verification & KYC', desc: 'Digital E-Verification, E-KYC and identity management solutions.', color: '#ef4444' },
  { icon: 'server.png', title: 'SAP Consulting', desc: 'SAP infrastructure consultation, implementation and management services.', color: '#8b5cf6' },
]

const stats = [
  { number: '500+', label: 'Projects Delivered' },
  { number: '200+', label: 'Happy Clients' },
  { number: '15+', label: 'Years Experience' },
  { number: '50+', label: 'Expert Team' },
]

const whyUs = [
  { icon: '🚀', title: 'Fast Delivery', desc: 'On-time project delivery with agile methodology.' },
  { icon: '🔒', title: 'Secure Solutions', desc: 'Enterprise-grade security in every solution.' },
  { icon: '☁️', title: 'Cloud Native', desc: 'AWS, Azure & GCP certified cloud experts.' },
  { icon: '🤝', title: '24/7 Support', desc: 'Round-the-clock managed support for all clients.' },
  { icon: '📊', title: 'Data Driven', desc: 'Analytics-first approach to business decisions.' },
  { icon: '🏆', title: 'ISO Certified', desc: 'ISO certified processes ensuring quality standards.' },
]

const marqueeItems = ['IT Infrastructure', 'Cloud Services', 'RPA Automation', 'Data Analytics', 'E-KYC Solutions', 'SAP Consulting', 'Digital Marketing', 'VAS Solutions', 'Network Security', 'DevOps']

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
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-grid" />
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />
        <div className="hero-blob" />
        <Particles />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="grid-2">
            <div className="hero-content">
              <div className="tag">⚡ <Typewriter words={['IT Services', 'Cloud Solutions', 'Digital Marketing', 'VAS Solutions', 'RPA Automation']} /></div>
              <h1 className="hero-title">
                <div className="line"><span>Transform Your</span></div>
                <div className="line"><span><span className="gradient-text">Business With</span></span></div>
                <div className="line"><span>Smart Technology</span></div>
              </h1>
              <p className="hero-subtitle">
                Numero Info IT Services delivers cutting-edge cloud, infrastructure, RPA, and digital solutions to enterprises across India and beyond.
              </p>
              <div className="hero-btns">
                <Link to="/services" className="btn-primary"><span>Explore Services</span> <span>→</span></Link>
                <Link to="/contact" className="btn-outline">Talk to Us</Link>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-img-wrap">
                <img src="/images/slider-img.png" alt="hero" style={{ width: '100%' }} />
              </div>
              <div className="hero-badge b1">⚡ 99.9% Uptime SLA</div>
              <div className="hero-badge b2">☁️ Cloud Ready</div>
              <div className="hero-badge b3">🔒 ISO Certified</div>
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
            <p>Comprehensive IT solutions tailored for modern enterprises</p>
          </div>
          <div className="services-grid">
            {services.map((s, i) => (
              <TiltCard key={i} className="service-card reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="service-card-inner">
                  <div className="service-icon" style={{ background: `${s.color}18`, borderColor: `${s.color}30` }}>
                    <img src={`/images/${s.icon}`} alt={s.title} />
                  </div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                  <div className="service-arrow" style={{ color: s.color }}>Learn more →</div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="section why-us">
        <div className="container">
          <div className="grid-2">
            <div className="reveal-left">
              <div className="tag">Why Choose Us</div>
              <h2 style={{ fontSize: 'clamp(1.8rem,3vw,2.8rem)', fontWeight: 800, color: 'var(--white)', marginBottom: 16 }}>
                Built for <span className="gradient-text">Enterprise Scale</span>
              </h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: 40, lineHeight: 1.85, fontSize: 16 }}>
                From startups to Fortune 500 companies, we deliver technology solutions that drive real business outcomes with certified experts.
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

      {/* Portfolio Preview */}
      <section className="section">
        <div className="container">
          <div className="section-heading reveal">
            <div className="tag">Our Work</div>
            <h2>Recent <span className="gradient-text">Portfolio</span></h2>
            <p>A glimpse of our successful project deliveries</p>
          </div>
          <div className="portfolio-grid">
            {['portfolio2.jpg','portfolio5.jpg','portfolio8.jpg','portfolio3.jpg','portfolio6.jpg','portfolio9.jpg'].map((img, i) => (
              <div key={i} className="portfolio-item reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                <img src={`/images/${img}`} alt={`portfolio ${i+1}`} />
                <div className="portfolio-overlay">
                  <span>View Project →</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <Link to="/portfolio" className="btn-outline">View All Projects →</Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-sm">
        <div className="container">
          <div className="cta-section reveal">
            <h2>Ready to <span className="gradient-text-neon">Transform</span> Your Business?</h2>
            <p>Let's discuss how we can help you achieve your technology goals.</p>
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
