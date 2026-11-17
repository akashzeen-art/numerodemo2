import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import '../styles/service-book.css'

export default function ServiceBookCard({
  id,
  icon,
  title,
  tagline,
  desc,
  color,
  index,
  focused = false,
  open = false,
  dimmed = false,
  onSelect,
  style,
}) {
  const rootRef = useRef(null)
  const num = String(index + 1).padStart(2, '0')

  useEffect(() => {
    if (!open && !focused) return undefined
    const onDoc = (e) => {
      if (!rootRef.current?.contains(e.target)) onSelect?.(null)
    }
    const t = window.setTimeout(() => {
      document.addEventListener('click', onDoc)
    }, 0)
    return () => {
      window.clearTimeout(t)
      document.removeEventListener('click', onDoc)
    }
  }, [open, focused, onSelect])

  const activate = (e) => {
    e?.preventDefault?.()
    e?.stopPropagation?.()
    onSelect?.(id, rootRef.current)
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onSelect?.(id, rootRef.current)
    }
    if (e.key === 'Escape' && (open || focused)) {
      e.preventDefault()
      onSelect?.(null)
    }
  }

  const hint = open ? 'Tap to close' : focused ? 'Opening…' : 'Tap to open'

  return (
    <article
      ref={rootRef}
      className={[
        'service-book',
        focused ? 'is-focused' : '',
        open ? 'is-open' : '',
        dimmed ? 'is-dimmed' : '',
      ].filter(Boolean).join(' ')}
      style={{ ...style, '--book': color, '--i': index }}
    >
      <div className="service-book-glow" aria-hidden="true" />
      <div
        className="service-book-stage"
        role="button"
        tabIndex={dimmed ? -1 : 0}
        aria-expanded={open}
        aria-controls={`service-book-page-${id}`}
        aria-label={`${title}. ${open ? 'Close book' : 'Open book'}`}
        onClick={activate}
        onKeyDown={onKeyDown}
      >
        <div className="service-book-page" id={`service-book-page-${id}`}>
          <div className="service-book-page-sheen" aria-hidden="true" />
          <span className="service-book-page-index">{num}</span>
          <p className="service-book-tagline">{tagline}</p>
          <h3>{title}</h3>
          <p className="service-book-desc">{desc}</p>
          <Link
            to={`/services#${id}`}
            className="service-book-link"
            tabIndex={open ? 0 : -1}
            onClick={(e) => e.stopPropagation()}
          >
            Learn more →
          </Link>
        </div>

        <div className="service-book-cover" aria-hidden={open || undefined}>
          <div className="service-book-cover-front">
            <span className="service-book-spine" />
            <div className="service-book-icon">
              <img src={`/images/${icon}`} alt="" />
            </div>
            <span className="service-book-index">{num}</span>
            <h3>{title}</h3>
            <p className="service-book-hint">{hint}</p>
          </div>
          <div className="service-book-cover-back">
            <span className="service-book-cover-back-mark">{num}</span>
          </div>
        </div>
      </div>
    </article>
  )
}
