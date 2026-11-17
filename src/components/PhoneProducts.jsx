import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { shelfItems } from '../data/shelf'
import '../styles/phone-products.css'

export default function PhoneProducts() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const touchX = useRef(null)
  const item = shelfItems[active]

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => {
      setActive((i) => (i + 1) % shelfItems.length)
    }, 3800)
    return () => clearInterval(t)
  }, [paused, active])

  const onTouchStart = (e) => {
    touchX.current = e.touches[0].clientX
    setPaused(true)
  }
  const onTouchEnd = (e) => {
    if (touchX.current == null) return
    const dx = e.changedTouches[0].clientX - touchX.current
    if (Math.abs(dx) > 40) {
      setActive((i) => {
        if (dx < 0) return (i + 1) % shelfItems.length
        return (i - 1 + shelfItems.length) % shelfItems.length
      })
    }
    touchX.current = null
    setTimeout(() => setPaused(false), 2400)
  }

  return (
    <section className="phone-products" aria-label="Numero products">
      <div className="container phone-products-head">
        <div className="tag">Products</div>
        <h2>Swipe the phone. <em>Explore every product.</em></h2>
        <p>VAS, DCB, content and Forex — tap through the stack on your screen.</p>
      </div>

      <div className="phone-products-stage">
        <div className="phone-products-glow" aria-hidden="true" />

        <div
          className="phone-frame"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="phone-notch" aria-hidden="true"><span /></div>

          <div className="phone-screen">
            <div className="phone-status">
              <strong>NUMERO</strong>
              <span>{String(active + 1).padStart(2, '0')} / {String(shelfItems.length).padStart(2, '0')}</span>
            </div>

            <div className="phone-hero-card" key={item.title}>
              <img src={item.img} alt="" />
              <div className="phone-hero-fade" />
              <div className="phone-hero-copy">
                <small>{item.artist}</small>
                <h3>{item.title}</h3>
                <p>{item.genre}</p>
              </div>
            </div>

            <ul className="phone-tracks">
              {item.tracks.slice(0, 4).map(([n, name, meta]) => (
                <li key={n}>
                  <span className="n">{n}</span>
                  <span className="t">{name}</span>
                  <small>{meta}</small>
                </li>
              ))}
            </ul>

            <Link to="/services" className="phone-cta">
              View all services →
            </Link>
          </div>
        </div>

        <div className="phone-dots" role="tablist" aria-label="Product slides">
          {shelfItems.map((p, i) => (
            <button
              key={p.title}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={p.title}
              className={i === active ? 'is-on' : ''}
              onClick={() => { setActive(i); setPaused(true) }}
            />
          ))}
        </div>

        <div className="phone-nav">
          <button
            type="button"
            aria-label="Previous product"
            onClick={() => setActive((i) => (i - 1 + shelfItems.length) % shelfItems.length)}
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Next product"
            onClick={() => setActive((i) => (i + 1) % shelfItems.length)}
          >
            →
          </button>
        </div>
      </div>
    </section>
  )
}
