import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import useScrollReveal from '../hooks/useScrollReveal'
import '../styles/global.css'
import '../styles/footer.css'

const images = Array.from({ length: 16 }, (_, i) => ({
  src: `portfolio${i + 1}.jpg`,
  category: i % 3 === 0 ? 'Cloud' : i % 3 === 1 ? 'Infrastructure' : 'Digital',
}))

const categories = ['All', 'Cloud', 'Infrastructure', 'Digital']

export default function Portfolio() {
  useScrollReveal()
  const [active, setActive] = useState('All')

  const filtered = active === 'All' ? images : images.filter(img => img.category === active)

  return (
    <>
      <Navbar />

      <div className="page-hero">
        <div className="container">
          <div className="tag">Our Work</div>
          <h1>Our <span className="gradient-text">Portfolio</span></h1>
          <p>A showcase of our successful project deliveries across industries</p>
          <div className="page-hero-line" />
        </div>
      </div>

      <section className="section">
        <div className="container">
          {/* Filter tabs */}
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 48, flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setActive(cat)} style={{
                padding: '10px 24px', borderRadius: 50, fontSize: 14, fontWeight: 600,
                border: '1px solid', cursor: 'pointer', transition: 'all 0.3s',
                background: active === cat ? 'var(--gradient)' : 'transparent',
                borderColor: active === cat ? 'transparent' : 'var(--glass-border)',
                color: active === cat ? '#fff' : 'var(--text-muted)',
              }}>
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
            {filtered.map((img, i) => (
              <div key={img.src} className="reveal" style={{
                borderRadius: 16, overflow: 'hidden', position: 'relative',
                aspectRatio: '4/3', transitionDelay: `${(i % 6) * 0.08}s`,
                border: '1px solid var(--glass-border)',
              }}>
                <img src={`/images/${img.src}`} alt={`portfolio ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                  onMouseEnter={e => e.target.style.transform = 'scale(1.08)'}
                  onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(124,58,237,0.85), transparent)',
                  opacity: 0, transition: 'opacity 0.4s',
                  display: 'flex', alignItems: 'flex-end', padding: 20,
                }}
                  onMouseEnter={e => e.currentTarget.style.opacity = 1}
                  onMouseLeave={e => e.currentTarget.style.opacity = 0}
                >
                  <div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{img.category}</div>
                    <div style={{ color: '#fff', fontWeight: 700, marginTop: 4 }}>Project {i + 1}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
