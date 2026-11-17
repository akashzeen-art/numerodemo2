import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import '../styles/prelander.css'

const MENU = [
  { title: 'Carrier Billing', sub: 'Pay with your mobile', emoji: '📱', color: '#7b6cf0' },
  { title: 'D2C', sub: 'Games · VOD · Campaigns', emoji: '🛒', color: '#2bb894' },
  { title: 'FX', sub: '50+ geos · cross-border', emoji: '💱', color: '#c4783a' },
]

const LEFT_CHIPS = [
  { label: 'Carrier Billing', emoji: '📱', color: '#7b6cf0', delay: '2.6s' },
  { label: 'D2C', emoji: '🛒', color: '#2bb894', delay: '3.2s' },
  { label: 'Enterprise Products', emoji: '🏢', color: '#73d5b8', delay: '3.8s' },
]

const RIGHT_CHIPS = [
  { label: 'FX', emoji: '💱', color: '#c4783a', delay: '2.9s' },
  { label: 'ECOM', emoji: '🛍️', color: '#7b6cf0', delay: '3.5s' },
  { label: 'Media House', emoji: '📺', color: '#73d5b8', delay: '4.1s' },
]

const TICKER = [
  { label: 'Carrier Billing', color: '#7b6cf0' },
  { label: 'D2C', color: '#2bb894' },
  { label: 'Enterprise Products', color: '#73d5b8' },
  { label: 'FX', color: '#c4783a' },
  { label: 'ECOM', color: '#7b6cf0' },
  { label: 'Media House', color: '#73d5b8' },
  { label: '50+ Geos', color: '#c4783a' },
]

function useParticles(active) {
  const ref = useRef(null)

  useEffect(() => {
    if (!active) return undefined
    const canvas = ref.current
    if (!canvas) return undefined
    const ctx = canvas.getContext('2d')
    if (!ctx) return undefined

    let raf = 0
    let w = 0
    let h = 0
    const palette = [
      [115, 213, 184],
      [255, 225, 190],
      [123, 108, 240],
      [43, 184, 148],
    ]
    const dots = Array.from({ length: 56 }, () => {
      const [r, g, b] = palette[Math.floor(Math.random() * palette.length)]
      return {
        x: Math.random(),
        y: Math.random(),
        r: Math.random() * 1.8 + 0.35,
        vx: (Math.random() - 0.5) * 0.00028,
        vy: -0.00018 - Math.random() * 0.00035,
        a: Math.random() * 0.42 + 0.1,
        c: [r, g, b],
      }
    })

    const resize = () => {
      w = canvas.clientWidth
      h = canvas.clientHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      for (const d of dots) {
        d.x += d.vx
        d.y += d.vy
        if (d.y < -0.02) { d.y = 1.02; d.x = Math.random() }
        if (d.x < -0.02) d.x = 1.02
        if (d.x > 1.02) d.x = -0.02
        const [cr, cg, cb] = d.c
        ctx.beginPath()
        ctx.fillStyle = `rgba(${cr}, ${cg}, ${cb}, ${d.a})`
        ctx.arc(d.x * w, d.y * h, d.r, 0, Math.PI * 2)
        ctx.fill()
      }
      raf = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [active])

  return ref
}

export default function Prelander({ onDone }) {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)
  const [hidden, setHidden] = useState(false)
  const finishing = useRef(false)
  const canvasRef = useParticles(!hidden)

  const finish = useCallback(() => {
    if (finishing.current) return
    finishing.current = true
    setProgress(100)
    setDone(true)
    setTimeout(() => {
      setHidden(true)
      onDone?.()
    }, 780)
  }, [onDone])

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      const t = setTimeout(finish, 400)
      return () => clearTimeout(t)
    }

    const duration = 6_000
    const start = performance.now()
    let raf = 0

    const tick = (now) => {
      if (finishing.current) return
      const t = Math.min((now - start) / duration, 1)
      // Mostly linear so stages pace evenly across the full minute
      const eased = t * 0.92 + (1 - Math.pow(1 - t, 2)) * 0.08
      setProgress(eased * 100)
      if (t < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        setTimeout(finish, 400)
      }
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [finish])

  const safeProgress = Number.isFinite(progress) ? Math.min(Math.max(progress, 0), 100) : 0
  const stageStep = 100 / MENU.length
  const stage = Math.min(Math.floor(safeProgress / stageStep), MENU.length - 1)
  const pct = Math.round(safeProgress)
  const stageTitle = MENU[stage]?.title ?? 'Loading'
  const ticker = useMemo(() => [...TICKER, ...TICKER], [])

  if (hidden) return null

  return (
    <div
      className={`prelander${done ? ' is-done' : ''}`}
      role="status"
      aria-label="Loading Numero Info"
      aria-busy={!done}
    >
      <canvas ref={canvasRef} className="prelander-canvas" aria-hidden="true" />

      <div className="prelander-blobs" aria-hidden="true">
        <div className="prelander-blob b1" />
        <div className="prelander-blob b2" />
        <div className="prelander-blob b3" />
      </div>
      <div className="prelander-grid" aria-hidden="true" />
      <div className="prelander-vignette" aria-hidden="true" />

      <button type="button" className="prelander-skip" onClick={finish}>
        Skip
        <span aria-hidden="true">→</span>
      </button>

      <div className="prelander-head">
        <div className="prelander-logo-wrap">
          <span className="prelander-logo-glow" aria-hidden="true" />
          <img src="/images/logo.png" alt="Numero Info" />
        </div>
        <p className="eyebrow">VAS · DCB · D2C · Forex</p>
        <p className="tagline" aria-label="Connect, engage and grow.">
          <span className="tw tw-connect">Connect</span>
          <span className="tw-comma">,</span>
          {' '}
          <span className="tw tw-engage">engage</span>
          {' '}
          <span className="tw-amp">&amp;</span>
          {' '}
          <span className="tw tw-grow">grow</span>
          <span className="tw-dot">.</span>
        </p>
      </div>

      <div className="prelander-stage">
        <div className="prelander-side left" aria-hidden="true">
          {LEFT_CHIPS.map((c) => (
            <div
              key={c.label}
              className="prelander-chip from-left"
              style={{ '--chip': c.color, '--in-delay': c.delay }}
            >
              <i>{c.emoji}</i>
              <b>{c.label}</b>
            </div>
          ))}
        </div>

        <div className="prelander-phone-wrap">
          <div className="prelander-phone-ring" aria-hidden="true" />
          <div className="prelander-phone-glow" aria-hidden="true" />
          <div className={`prelander-phone${pct >= 100 ? ' is-ready' : ''}`}>
            <div className="prelander-scan" aria-hidden="true" />
            <div className="prelander-notch"><span /></div>
            <div className="prelander-screen">
              <div className="prelander-status">
                <strong>NUMERO</strong>
                <div className="prelander-bars" aria-hidden="true">
                  <i className={pct > 15 ? 'on' : ''} />
                  <i className={pct > 35 ? 'on' : ''} />
                  <i className={pct > 55 ? 'on' : ''} />
                  <i className={pct > 75 ? 'on' : ''} />
                </div>
              </div>

              <div className="prelander-dial">
                <span className="label">Dial</span>
                <span className="code">*123#<em /></span>
                <span className="ok">No data</span>
              </div>

              <p className="prelander-menu-title">Numero Info Services</p>
              <ol className="prelander-menu">
                {MENU.map((item, i) => {
                  const active = i === stage && pct < 100
                  const finished = i < stage || pct >= 100
                  return (
                    <li
                      key={item.title}
                      className={`${active ? 'is-active' : ''} ${finished ? 'is-done' : ''}`}
                      style={{ '--c': item.color, '--i': i }}
                    >
                      <span className="n">{i + 1}</span>
                      <span className="ico">{item.emoji}</span>
                      <span className="txt">
                        <strong>{item.title}</strong>
                        <small>{item.sub}</small>
                      </span>
                      <span className="check" aria-hidden="true">✓</span>
                    </li>
                  )
                })}
              </ol>

              <div className={`prelander-connected${pct >= 100 ? ' is-on' : ''}`}>
                <span className="dot" aria-hidden="true" />
                Connected
              </div>
            </div>
          </div>
        </div>

        <div className="prelander-side right" aria-hidden="true">
          {RIGHT_CHIPS.map((c) => (
            <div
              key={c.label}
              className="prelander-chip from-right"
              style={{ '--chip': c.color, '--in-delay': c.delay }}
            >
              <i>{c.emoji}</i>
              <b>{c.label}</b>
            </div>
          ))}
        </div>
      </div>

      <div className="prelander-mobile-chips" aria-hidden="true">
        {[...LEFT_CHIPS, ...RIGHT_CHIPS].map((c, i) => (
          <div
            key={c.label}
            className={`prelander-chip ${i < LEFT_CHIPS.length ? 'from-left' : 'from-right'}`}
            style={{ '--chip': c.color, '--in-delay': c.delay }}
          >
            <i>{c.emoji}</i>
            <b>{c.label}</b>
          </div>
        ))}
      </div>

      <div className="prelander-foot">
        <div className="prelander-ticker" aria-hidden="true">
          <div className="prelander-ticker-track">
            {ticker.map((t, i) => (
              <span key={`${t.label}-${i}`} style={{ '--chip': t.color }}>
                <i />
                {t.label}
              </span>
            ))}
          </div>
        </div>

        <div className="prelander-progress-meta">
          <span>
            <em>{String(Math.min(stage + 1, MENU.length)).padStart(2, '0')} / {String(MENU.length).padStart(2, '0')}</em>
            <span>{pct >= 100 ? 'All solutions ready' : stageTitle}</span>
          </span>
          <b>{pct}%</b>
        </div>
        <div className="prelander-bar" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct}>
          <div className="prelander-bar-fill" style={{ transform: `scaleX(${pct / 100})` }} />
          <div className="prelander-bar-shine" />
        </div>
      </div>
    </div>
  )
}
