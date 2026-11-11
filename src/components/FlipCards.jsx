import { Link } from 'react-router-dom'
import { vasCategories } from '../data/content'
import '../styles/flipcard.css'

export default function FlipCards() {
  const cards = vasCategories.map(c => ({
    accent: c.accent,
    bg: c.gradient,
    icon: c.emoji,
    title: c.title,
    list: c.items.map(i => i.name).join(' · '),
    backTitle: c.tagline,
    backText: c.blurb,
  }))

  return (
    <div className="fc-grid">
      {cards.map((c, i) => (
        <div key={i} className="fc-cell" style={{ '--i': i }}>
          <article className="fc" style={{ '--accent': c.accent, '--fc-bg': c.bg }}>
            <div className="fc-flip">
              <div className="fc-flip-inner">
                {/* Front */}
                <div className="fc-front">
                  <div className="fc-front-top">
                    <div className="fc-front-icon">{c.icon}</div>
                    <h3 className="fc-front-title">{c.title}</h3>
                    <p className="fc-front-list">{c.list}</p>
                  </div>
                  <p className="fc-front-hint">Hover me</p>
                </div>
                {/* Back */}
                <div className="fc-back">
                  <div className="fc-back-icon">{c.icon}</div>
                </div>
              </div>
            </div>
            {/* Inside (shown below on hover) */}
            <div className="fc-inside">
              <h4 className="fc-inside-title">{c.backTitle}</h4>
              <p className="fc-inside-text">{c.backText}</p>
              <Link className="fc-inside-btn" to="/services#vas">
                View details <span>→</span>
              </Link>
            </div>
          </article>
        </div>
      ))}
    </div>
  )
}
