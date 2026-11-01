import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import useScrollReveal from '../hooks/useScrollReveal'
import '../styles/global.css'
import '../styles/home.css'

const services = [
  { icon: 'server.png', title: 'IT Infrastructure', desc: 'Data Center-based IT Infrastructure Consultation, implementation and Network upgradation.' },
  { icon: 'cloud.png', title: 'Cloud Managed Services', desc: 'Cloud Optimization, Cyber secure Data Backup and managed cloud services.' },
  { icon: 'robot.png', title: 'RPA Solutions', desc: 'Robotic Process Automation for OCR, Contract Lifecycle Management and IDP.' },
  { icon: 'graph.png', title: 'Data Analytics', desc: 'Data Analytics, Business Intelligence and Hands-on Training Support.' },
  { icon: 'user-check-icon.png', title: 'E-Verification & KYC', desc: 'Digital E-Verification, E-KYC and identity management solutions.' },
  { icon: 'server.png', title: 'SAP Consulting', desc: 'SAP infrastructure consultation, implementation and management services.' },
]

const stats = [
  { number: '500+', label: 'Projects Delivered' },
  { number: '200+', label: 'Happy Clients' },
  { number: '15+', label: 'Years Experience' },
  { number: '50+', label: 'Expert Team' },
]

const whyUs = [
  { icon: '🚀', title: 'Fast Delivery', desc: 'On-time project delivery with agile methodology.' },
  { icon: '🔒', title: 'Secure Solutions', desc: 'Enterprise-grade security in every solution we build.' },
  { icon: '☁️', title: 'Cloud Native', desc: 'AWS, Azure & GCP certified cloud experts.' },
  { icon: '🤝', title: '24/7 Support', desc: 'Round-the-clock managed support for all clients.' },
  { icon: '📊', title: 'Data Driven', desc: 'Analytics-first approach to business decisions.' },
  { icon: '🏆', title: 'ISO Certified', desc: 'ISO certified processes ensuring quality standards.' },
]

export default function Home() {
  useScrollReveal()
  const heroRef = useRef(null)

  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    el.style.opacity = 0
    el.style.transform = 'translateY(30px)'
    setTimeout(() => {
      el.style.transition = 'all 1s ease'
      el.style.opacity = 1
      el.style.transform = 'translateY(0)'
    }, 100)
  }, [])

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="hero">
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />
        <div className="container">
          <div className="grid-2">
            <div className="hero-content" ref={heroRef}>
              <div className="tag">🚀 IT Services & Digital Marketing</div>
              <h1 className="hero-title">
                Transform Your Business With <span className="gradient-text">Smart Technology</span>
              </h1>
              <p className="hero-subtitle">
                Numero Info IT Services delivers cutting-edge cloud, infrastructure, RPA, and digital solutions to enterprises of all sizes across India and beyond.
              </p>
              <div className="hero-btns">
                <Link to="/services" className="btn-primary">Explore Services →</Link>
                <Link to="/contact" className="btn-outline">Talk to Us</Link>
              </div>
            </div>
            <div className="hero-visual">
              <div className="hero-img-wrap animate-float">
                <img src="/images/slider-img.png" alt="hero" style={{ width: '100%' }} />
              </div>
              <div className="hero-card-float card-1">⚡ 99.9% Uptime SLA</div>
              <div className="hero-card-float card-2">☁️ Cloud Ready</div>
              <div className="hero-card-float card-3">🔒 ISO Certified</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="stats-bar">
        <div className="container">
          <div className="stats-grid">
            {stats.map((s, i) => (
              <div key={i} className="stat-item reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
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
              <div key={i} className="service-card reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="service-icon">
                  <img src={`/images/${s.icon}`} alt={s.title} />
                </div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
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
              <p style={{ color: 'var(--text-muted)', marginBottom: 40, lineHeight: 1.8 }}>
                From startups to Fortune 500 companies, we deliver technology solutions that drive real business outcomes. Our team of certified experts ensures your digital transformation journey is smooth and successful.
              </p>
              <Link to="/about" className="btn-primary">Learn More About Us →</Link>
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
            {['portfolio2.jpg', 'portfolio5.jpg', 'portfolio8.jpg', 'portfolio3.jpg', 'portfolio6.jpg', 'portfolio9.jpg'].map((img, i) => (
              <div key={i} className="portfolio-item reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                <img src={`/images/${img}`} alt={`portfolio ${i + 1}`} />
                <div className="portfolio-overlay">
                  <span style={{ color: '#fff', fontWeight: 600, fontSize: 14 }}>View Project →</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link to="/portfolio" className="btn-outline">View All Projects →</Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-sm">
        <div className="container">
          <div className="cta-section reveal">
            <div className="tag" style={{ background: 'rgba(255,255,255,0.15)', borderColor: 'rgba(255,255,255,0.3)', color: '#fff' }}>Get Started Today</div>
            <h2>Ready to Transform Your Business?</h2>
            <p>Let's discuss how we can help you achieve your technology goals.</p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn-primary" style={{ background: '#fff', color: 'var(--primary-dark)' }}>Contact Us Now →</Link>
              <Link to="/services" className="btn-outline" style={{ borderColor: 'rgba(255,255,255,0.5)' }}>View Services</Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
