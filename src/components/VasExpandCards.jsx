import { useState } from 'react'
import { vasCategories } from '../data/content'
import '../styles/vas-expand.css'

export default function VasExpandCards() {
  const [active, setActive] = useState(0)

  return (
    <div className="vas-options" role="list">
      {vasCategories.map((c, i) => {
        const isActive = i === active
        return (
          <button
            key={c.id}
            type="button"
            role="listitem"
            className={`vas-option${isActive ? ' active' : ''}`}
            style={{
              '--optionBackground': `url(${c.image})`,
              '--defaultBackground': c.accent,
            }}
            onClick={() => setActive(i)}
            aria-pressed={isActive}
            aria-label={c.title}
          >
            <div className="vas-option-shadow" aria-hidden="true" />

            <div className="vas-option-label">
              <div className="vas-option-icon" aria-hidden="true">
                <span className="vas-option-emoji">{c.emoji}</span>
              </div>
              <div className="vas-option-info">
                <div className="vas-option-main">{c.title}</div>
                <div className="vas-option-sub">{c.tagline}</div>
              </div>
            </div>

            <div className="vas-option-panel" aria-hidden={!isActive}>
              <p className="vas-option-intro">{c.intro}</p>
              <ul className="vas-option-products">
                {c.items.map((item) => (
                  <li key={item.name}>
                    <strong>
                      {item.name}
                      {item.fullName ? <span> · {item.fullName}</span> : null}
                    </strong>
                    <p>{item.summary}</p>
                  </li>
                ))}
              </ul>
            </div>
          </button>
        )
      })}
    </div>
  )
}
