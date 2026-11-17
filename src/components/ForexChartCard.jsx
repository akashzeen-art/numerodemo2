import { useEffect, useRef, useState } from 'react'
import { forex } from '../data/content'
import '../styles/forex-chart.css'

const bars = [
  { id: 'bar1', label: 'USD', value: '20,000', height: 150 },
  { id: 'bar2', label: 'EUR', value: '10,000', height: 75 },
  { id: 'bar3', label: 'NGN', value: '15,000', height: 112 },
  { id: 'bar4', label: 'EGP', value: '24,000', height: 180 },
  { id: 'bar5', label: 'PKR', value: '7,000', height: 52 },
  { id: 'bar6', label: 'MAD', value: '7,000', height: 52 },
  { id: 'bar7', label: 'XOF', value: '10,000', height: 75 },
]

export default function ForexChartCard() {
  const [open, setOpen] = useState(false)
  const wrapRef = useRef(null)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return undefined

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setOpen(true)
      return undefined
    }

    let ticking = false

    const update = () => {
      ticking = false
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight || 1
      const mid = rect.top + rect.height * 0.45
      // Open while the card sits in the middle band of the viewport
      const shouldOpen = mid > vh * 0.18 && mid < vh * 0.72 && rect.bottom > vh * 0.2
      setOpen(shouldOpen)
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div
      ref={wrapRef}
      className={`forex-chart-stage${open ? ' is-open' : ''}`}
      aria-live="polite"
    >
      <div className="forex-chart-card" role="img" aria-label="Forex liquidity chart">
        <div className="forex-chart-photo" aria-hidden="true" />
        <h2>FOREX</h2>
        <p>CROSS-BORDER</p>
        <div className="forex-chart-bars">
          {bars.map((bar) => (
            <div
              key={bar.id}
              className={`forex-bar ${bar.id}`}
              style={{ '--bar-h': `${bar.height}px` }}
              data-label={bar.label}
            >
              <span>{bar.value}</span>
            </div>
          ))}
        </div>
        <h3>50+</h3>
      </div>

      <div className="forex-chart-side">
        {forex.stats.map((s) => (
          <div key={s.label} className="forex-chart-stat">
            <div className="forex-chart-stat-value">{s.value}</div>
            <h3>{s.label}</h3>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
