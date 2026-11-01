import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import useScrollReveal from '../hooks/useScrollReveal'
import '../styles/global.css'
import '../styles/footer.css'

const contactInfo = [
  { icon: '📍', title: 'Address', value: 'B 123 First Floor Sector 54, Gurgaon Haryana 122003' },
  { icon: '📞', title: 'Phone', value: '+91 70113 70445' },
  { icon: '✉️', title: 'Email', value: 'info@numeroinfo.asia' },
  { icon: '🌐', title: 'Website', value: 'numeroinfo.asia' },
]

export default function Contact() {
  useScrollReveal()
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = e => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 4000)
    setForm({ name: '', email: '', phone: '', subject: '', message: '' })
  }

  return (
    <>
      <Navbar />

      <div className="page-hero">
        <div className="container">
          <div className="tag">Get In Touch</div>
          <h1>Contact <span className="gradient-text">Us</span></h1>
          <p>We'd love to hear from you. Let's start a conversation.</p>
          <div className="page-hero-line" />
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ gap: 60 }}>

            {/* Info */}
            <div className="reveal-left">
              <div className="tag">Our Details</div>
              <h2 style={{ fontSize: 'clamp(1.6rem,2.5vw,2.2rem)', fontWeight: 800, color: 'var(--white)', marginBottom: 16 }}>
                Let's Talk About Your <span className="gradient-text">Project</span>
              </h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 40 }}>
                Whether you need IT infrastructure, cloud services, or digital transformation — our team is ready to help you achieve your goals.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {contactInfo.map((c, i) => (
                  <div key={i} className="glass-card" style={{ padding: '20px 24px', display: 'flex', gap: 16, alignItems: 'center' }}>
                    <div style={{ fontSize: 28, width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(124,58,237,0.15)', borderRadius: 12 }}>{c.icon}</div>
                    <div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{c.title}</div>
                      <div style={{ color: 'var(--white)', fontWeight: 500, marginTop: 2 }}>{c.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="reveal-right">
              <div className="glass-card" style={{ padding: 40 }}>
                <h3 style={{ color: 'var(--white)', fontWeight: 700, marginBottom: 28, fontSize: 20 }}>Send Us a Message</h3>
                {sent && (
                  <div style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 12, padding: '14px 20px', marginBottom: 24, color: '#10b981', fontSize: 14 }}>
                    ✅ Message sent! We'll get back to you soon.
                  </div>
                )}
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {[
                    { key: 'name', label: 'Full Name', type: 'text', placeholder: 'John Doe' },
                    { key: 'email', label: 'Email Address', type: 'email', placeholder: 'john@company.com' },
                    { key: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+91 98765 43210' },
                    { key: 'subject', label: 'Subject', type: 'text', placeholder: 'How can we help?' },
                  ].map(f => (
                    <div key={f.key}>
                      <label style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: 8 }}>{f.label}</label>
                      <input
                        type={f.type} placeholder={f.placeholder} required
                        value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                        style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: 10, color: 'var(--white)', fontSize: 14, outline: 'none', transition: 'border-color 0.3s' }}
                        onFocus={e => e.target.style.borderColor = 'var(--primary)'}
                        onBlur={e => e.target.style.borderColor = 'var(--glass-border)'}
                      />
                    </div>
                  ))}
                  <div>
                    <label style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: 8 }}>Message</label>
                    <textarea
                      rows={4} placeholder="Tell us about your project..." required
                      value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                      style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: 10, color: 'var(--white)', fontSize: 14, outline: 'none', resize: 'vertical', transition: 'border-color 0.3s' }}
                      onFocus={e => e.target.style.borderColor = 'var(--primary)'}
                      onBlur={e => e.target.style.borderColor = 'var(--glass-border)'}
                    />
                  </div>
                  <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}>
                    Send Message →
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
