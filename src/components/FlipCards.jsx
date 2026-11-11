import { Link } from 'react-router-dom'
import { vasCategories, vasProducts } from '../data/content'
import '../styles/flipcard.css'

const highlights = [
  { value: vasProducts.length, label: 'VAS products' },
  { value: vasCategories.length, label: 'Solution families' },
  { value: 'No app', label: 'No internet needed' },
  { value: 'Any', label: 'Phone & network' },
]

export default function FlipCards() {
  return (
    <>
      <div className="fc-grid">
        {vasCategories.map((c, i) => (
          <div key={c.id} className="fc-cell" style={{ '--i': i }}>
            <article className="vf-card" style={{ '--accent': c.accent, '--fc-bg': c.gradient }}>
              <div className="vf-media">
                <img src={c.image} alt={c.title} loading="lazy" />
                <span className="vf-media-tint" />
                <span className="vf-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="vf-count">{c.items.length} products</span>
                <span className="vf-icon">{c.emoji}</span>
              </div>

              <div className="vf-body">
                <p className="vf-tagline">{c.tagline}</p>
                <h3 className="vf-title">{c.title}</h3>
                <p className="vf-text">{c.blurb}</p>
                <ul className="vf-chips">
                  {c.items.map(item => (
                    <li key={item.name} title={item.fullName || item.headline}>{item.name}</li>
                  ))}
                </ul>
                <Link className="vf-link" to="/services#vas">
                  Explore {c.title} <span>→</span>
                </Link>
              </div>
            </article>
          </div>
        ))}
      </div>

      <div className="vf-strip reveal">
        {highlights.map(h => (
          <div key={h.label} className="vf-strip-item">
            <span className="vf-strip-value">{h.value}</span>
            <span className="vf-strip-label">{h.label}</span>
          </div>
        ))}
      </div>
    </>
  )
}
