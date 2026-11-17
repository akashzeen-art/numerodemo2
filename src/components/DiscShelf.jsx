import { useCallback, useEffect, useRef, useState } from 'react'
import { shelfItems } from '../data/shelf'
import '../styles/disc-shelf.css'

function CaseBox({ item, index, selected, open, mirror = false }) {
  const active = selected === index
  const isOpen = active && open

  return (
    <li
      className={`case${active ? ' is-active' : ''}${isOpen ? ' is-open' : ''}`}
      style={{ '--h': item.h, '--i': index }}
    >
      {mirror ? (
        <span className="pick" tabIndex={-1} aria-hidden="true" />
      ) : (
        <button
          className="pick"
          type="button"
          tabIndex={-1}
          aria-label={`${item.title} by ${item.artist}`}
          data-index={index}
        />
      )}
      <div className="box" aria-hidden="true">
        <div className="cover">
          <div className="out">
            <img src={item.img} alt="" loading={index < 4 ? 'eager' : 'lazy'} />
            <i className="hinge" />
            <p className="art">
              <b>{item.title}</b>
              <span>{item.artist}</span>
            </p>
          </div>
          <div className="in">
            <p className="notes-title">{item.title}</p>
            <ol>
              {item.tracks.map(([n, name, meta]) => (
                <li key={n}>
                  <span>{n}</span>
                  {name}
                  <small>{meta}</small>
                </li>
              ))}
            </ol>
            <p className="notes-foot">{item.foot}</p>
          </div>
        </div>
        <div className="spine">
          <b>{item.title}</b>
          <span>{item.year}</span>
        </div>
        <div className="edge" />
        <div className="lid" />
        <div className="base" />
        <div className="tray">
          <div className="disc">
            <img src={item.img} alt="" />
            <i />
          </div>
        </div>
      </div>
    </li>
  )
}

export default function DiscShelf() {
  const [sel, setSel] = useState(0)
  const [open, setOpen] = useState(false)
  const [tried, setTried] = useState(false)
  const [focused, setFocused] = useState(false)
  const [inView, setInView] = useState(false)
  const [tick, setTick] = useState(0)
  const rootRef = useRef(null)
  const shelfRef = useRef(null)
  const dragRef = useRef(null)
  const last = shelfItems.length - 1

  const browse = useCallback((next) => {
    setSel(Math.max(0, Math.min(last, next)))
    setTried(true)
    setTick((t) => t + 1)
  }, [last])

  const onCaseClick = (index) => {
    if (open) return
    if (index === sel) {
      setOpen(true)
      setTick((t) => t + 1)
    } else browse(index)
  }

  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true) },
      { threshold: 0.2 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const el = rootRef.current
    if (!el || open) return
    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
      el.style.setProperty('--mx', x.toFixed(3))
      el.style.setProperty('--my', y.toFixed(3))
    }
    const onLeave = () => {
      el.style.setProperty('--mx', '0')
      el.style.setProperty('--my', '0')
    }
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [open])

  /* Soft auto-browse when idle and in view (pauses when open / focused / interacting) */
  useEffect(() => {
    if (!inView || open || tried) return
    const id = setInterval(() => {
      setSel((s) => (s >= last ? 0 : s + 1))
      setTick((t) => t + 1)
    }, 3200)
    return () => clearInterval(id)
  }, [inView, open, tried, last])

  useEffect(() => {
    const el = shelfRef.current
    if (!el) return

    const onKey = (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); if (!open) browse(sel + 1) }
      if (e.key === 'ArrowLeft') { e.preventDefault(); if (!open) browse(sel - 1) }
      if (e.key === 'Home') { e.preventDefault(); if (!open) browse(0) }
      if (e.key === 'End') { e.preventDefault(); if (!open) browse(last) }
      if (e.key === 'Enter') { e.preventDefault(); setOpen((v) => !v); setTried(true); setTick((t) => t + 1) }
      if (e.key === 'Escape') setOpen(false)
    }

    el.addEventListener('keydown', onKey)
    return () => el.removeEventListener('keydown', onKey)
  }, [browse, last, open, sel])

  useEffect(() => {
    const el = shelfRef.current
    if (!el) return

    const onPointerDown = (e) => {
      if (open) return
      if (e.target.closest('.open-hit')) return
      const caseBtn = e.target.closest('.pick[data-index]')
      dragRef.current = {
        startX: e.clientX,
        startSel: sel,
        moved: false,
        caseIndex: caseBtn ? Number(caseBtn.dataset.index) : null,
        pointerId: e.pointerId,
      }
      el.setPointerCapture?.(e.pointerId)
    }

    const onPointerMove = (e) => {
      const d = dragRef.current
      if (!d || open) return
      const dx = e.clientX - d.startX
      if (Math.abs(dx) > 8) d.moved = true
      if (d.moved) {
        const next = Math.round(d.startSel - dx / 70)
        browse(next)
      }
    }

    const onPointerUp = (e) => {
      const d = dragRef.current
      if (!d) return
      if (!d.moved && d.caseIndex != null) onCaseClick(d.caseIndex)
      dragRef.current = null
      try { el.releasePointerCapture?.(e.pointerId) } catch { /* ignore */ }
    }

    el.addEventListener('pointerdown', onPointerDown)
    el.addEventListener('pointermove', onPointerMove)
    el.addEventListener('pointerup', onPointerUp)
    el.addEventListener('pointercancel', onPointerUp)
    return () => {
      el.removeEventListener('pointerdown', onPointerDown)
      el.removeEventListener('pointermove', onPointerMove)
      el.removeEventListener('pointerup', onPointerUp)
      el.removeEventListener('pointercancel', onPointerUp)
    }
  }, [browse, open, sel])

  return (
    <section
      ref={rootRef}
      className={`library v2${open ? ' is-open' : ''}${focused ? ' is-focused' : ''}${inView ? ' is-inview' : ''}`}
      style={{ '--sel': sel, '--open': open ? 1 : 0, '--last': last, '--mx': 0, '--my': 0 }}
      aria-label="Numero product shelf"
      data-tick={tick}
    >
      <div className="orbits" aria-hidden="true">
        <span /><span /><span />
      </div>

      <div className="backdrops" aria-hidden="true">
        {shelfItems.map((item, i) => (
          <div
            key={item.title}
            style={{
              '--h': item.h,
              '--i': i,
              '--img': `url('${item.blur}')`,
            }}
          />
        ))}
      </div>

      <svg className="streaks" viewBox="0 0 1600 900" preserveAspectRatio="none" aria-hidden="true">
        <path d="M-100 330 C 300 230, 700 420, 1000 300 S 1500 200, 1700 280" />
        <path d="M-100 420 C 400 360, 800 500, 1150 380 S 1500 330, 1700 360" />
        <path d="M-100 250 C 350 300, 900 180, 1250 260 S 1550 300, 1700 230" />
      </svg>

      <div className="dust" aria-hidden="true">
        {Array.from({ length: 18 }, (_, i) => <i key={i} style={{ '--n': i }} />)}
      </div>

      <header className="top">
        <p className="brand"><i aria-hidden="true" />Product shelf</p>
        <p className="count" key={tick}><b>{sel + 1}</b> / {shelfItems.length}</p>
      </header>

      <section
        className="shelf"
        ref={shelfRef}
        tabIndex={0}
        aria-label="Numero product shelf. Left and right arrows browse; Enter opens, Escape closes."
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      >
        <ol className="cases">
          {shelfItems.map((item, i) => (
            <CaseBox key={item.title} item={item} index={i} selected={sel} open={open} />
          ))}
        </ol>

        <div className="mirror" aria-hidden="true">
          <ol className="cases reflect">
            {shelfItems.map((item, i) => (
              <CaseBox key={`m-${item.title}`} item={item} index={i} selected={sel} open={open} mirror />
            ))}
          </ol>
        </div>

        <div className="floor-glow" aria-hidden="true" />

        <button
          className="open-hit"
          type="button"
          aria-label={open ? 'Close the product' : 'Open the product'}
          onClick={() => { setOpen((v) => !v); setTried(true); setTick((t) => t + 1) }}
        />

        <p className={`hint${tried ? ' hidden' : ''}`} aria-hidden="true">
          <span className="label">
            <span className="on-hover">drag the shelf, or click a case</span>
            <span className="on-touch">swipe the shelf, or tap a case</span>
          </span>
          <svg viewBox="0 0 50 100"><path d="M2 98 C 1 60, 18 24, 48 3 M33 5 L49 2 L45 19" /></svg>
        </p>
      </section>

      <div className="titles" aria-live="polite">
        {shelfItems.map((item, i) => (
          <div key={item.title} style={{ '--i': i }}>
            <h2>{item.title}</h2>
            <p>{item.artist} · {item.year} · {item.genre}</p>
          </div>
        ))}
      </div>

      <button className="close" type="button" onClick={() => setOpen(false)}>Close</button>
    </section>
  )
}
