import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ServiceSlider from '../components/ServiceSlider'
import useScrollReveal from '../hooks/useScrollReveal'
import '../styles/global.css'
import '../styles/footer.css'

const services = [
  {
    icon: 'server.png', title: 'IT Infrastructure',
    desc: 'Data Center-based IT Infrastructure Consultation, implementation and Network upgradation for enterprises of all sizes.',
    features: ['Network Design & Setup', 'Server Virtualization', 'Storage Solutions', 'Network Security'],
    color: '#7c3aed',
  },
  {
    icon: 'cloud.png', title: 'Cloud Managed Services',
    desc: 'AWS, Azure & GCP managed services, cloud optimization and cyber-secure data backup solutions.',
    features: ['AWS / Azure / GCP', 'Cloud Migration', 'Cost Optimization', 'Backup & Recovery'],
    color: '#06b6d4',
  },
  {
    icon: 'robot.png', title: 'RPA & Automation',
    desc: 'Robotic Process Automation for OCR, Intelligent Document Processing and Contract Lifecycle Management.',
    features: ['Process Automation', 'OCR / IDP', 'Contract Management', 'E-Litigation'],
    color: '#f59e0b',
  },
  {
    icon: 'graph.png', title: 'Data Analytics',
    desc: 'Business Intelligence, Data Analytics and hands-on training support for data-driven decision making.',
    features: ['BI Dashboards', 'Predictive Analytics', 'Data Warehousing', 'Training Programs'],
    color: '#10b981',
  },
  {
    icon: 'user-check-icon.png', title: 'E-Verification & KYC',
    desc: 'Digital E-Verification, E-KYC and identity management solutions for secure onboarding.',
    features: ['Digital KYC', 'Identity Verification', 'Document Validation', 'API Integration'],
    color: '#ef4444',
  },
  {
    icon: 'server.png', title: 'SAP Consulting',
    desc: 'SAP infrastructure consultation, implementation and management for enterprise resource planning.',
    features: ['SAP Implementation', 'SAP Migration', 'SAP Support', 'Custom Development'],
    color: '#8b5cf6',
  },
]

const process = [
  { step: '01', title: 'Discovery', desc: 'We analyze your business needs and current infrastructure.' },
  { step: '02', title: 'Strategy', desc: 'We design a tailored technology roadmap for your goals.' },
  { step: '03', title: 'Execution', desc: 'Our experts implement solutions with minimal disruption.' },
  { step: '04', title: 'Support', desc: '24/7 managed support to ensure continuous operations.' },
]

export default function Services() {
  useScrollReveal()

  return (
    <>
      <Navbar />

      <div className="page-hero">
        <div className="container">
          <div className="tag">What We Offer</div>
          <h1>Our <span className="gradient-text">Services</span></h1>
          <p>Comprehensive IT solutions designed to accelerate your digital transformation</p>
          <div className="page-hero-line" />
        </div>
      </div>

      {/* Services Grid */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 28 }}>
            {services.map((s, i) => (
              <div key={i} className="glass-card reveal" style={{ padding: 36, transitionDelay: `${i * 0.1}s`, borderTop: `3px solid ${s.color}` }}>
                <div style={{ width: 64, height: 64, borderRadius: 16, background: `${s.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
                  <img src={`/images/${s.icon}`} alt={s.title} style={{ width: 36, height: 36, objectFit: 'contain', filter: 'invert(1)' }} />
                </div>
                <h3 style={{ color: 'var(--white)', fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{s.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.8, marginBottom: 24 }}>{s.desc}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {s.features.map(f => (
                    <span key={f} style={{ padding: '4px 12px', borderRadius: 50, fontSize: 12, fontWeight: 600, background: `${s.color}15`, color: s.color, border: `1px solid ${s.color}30` }}>{f}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Slider Section */}
      <section className="section" style={{ background: 'var(--dark2)' }}>
        <div className="container">
          <div className="section-heading reveal">
            <div className="tag">Interactive Preview</div>
            <h2>Explore Our <span className="gradient-text">Solutions</span></h2>
            <p>Swipe through our core service offerings</p>
          </div>
          <div className="reveal">
            <ServiceSlider />
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section" style={{ background: 'var(--dark2)' }}>
        <div className="container">
          <div className="section-heading reveal">
            <div className="tag">How We Work</div>
            <h2>Our <span className="gradient-text">Process</span></h2>
            <p>A proven methodology that delivers results every time</p>
          </div>
          <div className="grid-4">
            {process.map((p, i) => (
              <div key={i} className="glass-card reveal" style={{ padding: 32, textAlign: 'center', transitionDelay: `${i * 0.15}s`, position: 'relative' }}>
                <div style={{ fontSize: 48, fontWeight: 900, background: 'var(--gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: 16 }}>{p.step}</div>
                <h4 style={{ color: 'var(--white)', fontWeight: 700, marginBottom: 10 }}>{p.title}</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: 13, lineHeight: 1.7 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="reveal">
            <div className="tag">Ready to Start?</div>
            <h2 style={{ fontSize: 'clamp(1.8rem,3vw,2.8rem)', fontWeight: 800, color: 'var(--white)', marginBottom: 16 }}>
              Let's Build Something <span className="gradient-text">Amazing Together</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: 40, maxWidth: 500, margin: '0 auto 40px' }}>
              Contact us today to discuss your project requirements and get a free consultation.
            </p>
            <Link to="/contact" className="btn-primary">Get Free Consultation →</Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
