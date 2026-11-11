import { useEffect, useRef, useState, useCallback } from 'react'

const LEFT_BUBBLES = [
  { accent: '#4f46e5', delay: '0s',   icon: '📡', label: 'USSD' },
  { accent: '#7c3aed', delay: '0.6s', icon: '📱', label: 'Carrier Billing' },
  { accent: '#4f46e5', delay: '1.2s', icon: '🎮', label: 'Content' },
]
const RIGHT_BUBBLES = [
  { accent: '#9333ea', delay: '0.3s', icon: '💱', label: 'Forex' },
  { accent: '#9333ea', delay: '0.9s', icon: '📞', label: 'Cloud IVR' },
  { accent: '#c026d3', delay: '1.5s', icon: '✉️', label: 'Bulk SMS' },
]

const USSD_ITEMS = [
  { num: 1, accent: '#4f46e5', label: 'VAS Platforms',         sub: 'USSD · SMSC · IVR · CRBT', icon: '📡' },
  { num: 2, accent: '#7c3aed', label: 'Carrier Billing',       sub: 'Pay with your mobile',     icon: '📱' },
  { num: 3, accent: '#9333ea', label: 'Content & Marketing',   sub: 'Games · VOD · Campaigns',  icon: '📣' },
  { num: 4, accent: '#c026d3', label: 'Cross-Border Payments', sub: '50+ currencies',           icon: '💱' },
]

const STATUS = ['Dialling into the Numero network', 'Opening the solutions menu', 'Loading content & campaigns', 'All solutions ready']
const DIAL_CODE = '*123#'

const TICKER = [
  { label: 'USSD',                  accent: '#4f46e5' },
  { label: 'SMSC',                  accent: '#4f46e5' },
  { label: 'Cloud IVR',             accent: '#7c3aed' },
  { label: 'CRBT',                  accent: '#7c3aed' },
  { label: 'Bulk SMS',              accent: '#9333ea' },
  { label: 'USSD Push',             accent: '#9333ea' },
  { label: 'Direct Carrier Billing', accent: '#c026d3' },
  { label: 'HD Games',              accent: '#c026d3' },
  { label: 'VOD',                   accent: '#4f46e5' },
  { label: 'Digital Marketing',     accent: '#9333ea' },
  { label: 'Forex',                 accent: '#7c3aed' },
  { label: '50+ Currencies',        accent: '#c026d3' },
]

function Particles() {
  const ref = useRef(null)
  useEffect(() => {
    const c = ref.current; if (!c) return
    const ctx = c.getContext('2d')
    const resize = () => { c.width = window.innerWidth; c.height = window.innerHeight }
    resize(); window.addEventListener('resize', resize)
    const pts = Array.from({ length: 50 }, () => ({
      x: Math.random() * c.width, y: Math.random() * c.height,
      vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.2 + 0.3,
    }))
    let raf
    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height)
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > c.width) p.vx *= -1
        if (p.y < 0 || p.y > c.height) p.vy *= -1
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(124,58,237,0.3)'; ctx.fill()
      })
      pts.forEach((a, i) => pts.slice(i + 1).forEach(b => {
        const d = Math.hypot(a.x - b.x, a.y - b.y)
        if (d < 100) {
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y)
          ctx.strokeStyle = `rgba(124,58,237,${0.1 * (1 - d / 100)})`
          ctx.lineWidth = 0.5; ctx.stroke()
        }
      }))
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={ref} style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }} />
}

export default function Prelander({ onDone }) {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)
  const [hidden, setHidden] = useState(false)

  const skip = useCallback(() => {
    setDone(true)
    setTimeout(() => { setHidden(true); onDone?.() }, 700)
  }, [onDone])

  useEffect(() => {
    const iv = setInterval(() => {
      setProgress(p => {
        const n = Math.min(p + Math.random() * 4 + 1.2, 100)
        if (n >= 100) { clearInterval(iv); setTimeout(skip, 600) }
        return n
      })
    }, 100)
    return () => clearInterval(iv)
  }, [skip])

  if (hidden) return null

  const pct = Math.min(Math.round(progress), 100)
  const statusIdx = Math.min(Math.floor(progress / 25), 3)
  const activeUssd = statusIdx
  const ready = pct >= 100
  const dialed = DIAL_CODE.slice(0, Math.min(DIAL_CODE.length, Math.ceil(progress / 4)))
  const allTicker = [...TICKER, ...TICKER]

  return (
    <div role="status" aria-label="Loading Numero Info" aria-busy={!done} style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: '#07040f',
      display: 'flex', flexDirection: 'column',
      overflow: 'hidden', color: '#fff',
      transition: 'opacity 0.7s ease, transform 0.7s ease',
      opacity: done ? 0 : 1,
      transform: done ? 'scale(1.04)' : 'scale(1)',
    }}>

      <Particles />

      {/* Gradient blobs */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: '50vw', height: '50vw', borderRadius: '50%', background: 'radial-gradient(circle,rgba(124,58,237,0.14),transparent 70%)', filter: 'blur(40px)', animation: 'blobPL 12s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', bottom: '-10%', right: '-5%', width: '45vw', height: '45vw', borderRadius: '50%', background: 'radial-gradient(circle,rgba(192,38,211,0.1),transparent 70%)', filter: 'blur(40px)', animation: 'blobPL 12s ease-in-out infinite reverse', animationDelay: '4s' }} />
        <div style={{ position: 'absolute', top: '30%', right: '20%', width: '30vw', height: '30vw', borderRadius: '50%', background: 'radial-gradient(circle,rgba(6,182,212,0.07),transparent 70%)', filter: 'blur(60px)', animation: 'blobPL 10s ease-in-out infinite', animationDelay: '2s' }} />
      </div>

      {/* Grid */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(124,58,237,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(124,58,237,0.05) 1px,transparent 1px)', backgroundSize: '60px 60px', maskImage: 'radial-gradient(ellipse at center,#000 30%,transparent 75%)' }} />

      {/* Skip */}
      <button type="button" onClick={skip} style={{ position: 'absolute', top: 20, right: 20, zIndex: 10, display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 18px', borderRadius: 50, background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.55)', fontSize: 12, fontWeight: 600, cursor: 'pointer', transition: 'all 0.3s', fontFamily: 'Space Grotesk', letterSpacing: '0.05em' }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(124,58,237,0.2)'; e.currentTarget.style.borderColor = 'rgba(124,58,237,0.4)'; e.currentTarget.style.color = '#fff' }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(255,255,255,0.55)' }}>
        Skip ⏭
      </button>

      {/* Brand */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', paddingTop: 36, paddingBottom: 16, animation: 'fadeUp 0.7s 0.1s both', opacity: 0 }}>
        <img src="/images/logo.png" alt="Numero Info" style={{ height: 48, width: 'auto', marginBottom: 10, filter: 'brightness(0) invert(1)', opacity: 0.9 }}
          onError={e => { e.target.style.display = 'none' }} />
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: 'Space Grotesk', fontWeight: 600 }}>
          VAS · Carrier Billing · Forex
        </p>
        <p style={{ marginTop: 6, fontSize: 'clamp(1.2rem,2.4vw,1.7rem)', fontWeight: 800, fontFamily: 'Space Grotesk', background: 'linear-gradient(135deg,#a78bfa,#06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Connect, engage & grow.
        </p>
      </div>

      {/* Stage */}
      <div style={{ flex: 1, position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 20px', gap: 28 }}>

        {/* Left bubbles */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, animation: 'slideInLeft 0.7s 0.3s both', opacity: 0 }}>
          {LEFT_BUBBLES.map((b, i) => (
            <div key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '9px 16px 9px 10px', borderRadius: 50, background: `${b.accent}12`, border: `1px solid ${b.accent}30`, animation: 'float 6s ease-in-out infinite', animationDelay: b.delay, whiteSpace: 'nowrap', boxShadow: `0 0 20px ${b.accent}15` }}>
              <span style={{ width: 30, height: 30, borderRadius: '50%', background: `${b.accent}20`, border: `1px solid ${b.accent}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>{b.icon}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: b.accent, fontFamily: 'Space Grotesk' }}>{b.label}</span>
            </div>
          ))}
        </div>

        {/* Phone */}
        <div style={{ flexShrink: 0, animation: 'fadeUp 0.8s 0.2s both', opacity: 0 }}>
          {/* Glow ring behind phone */}
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', inset: '-20px', borderRadius: 48, background: 'radial-gradient(ellipse,rgba(124,58,237,0.25),transparent 70%)', filter: 'blur(20px)', animation: 'pulseGlowPL 3s ease-in-out infinite' }} />
            <div style={{ position: 'relative', width: 220, background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 36, overflow: 'hidden', boxShadow: '0 40px 80px rgba(0,0,0,0.6), 0 0 60px rgba(124,58,237,0.25), inset 0 1px 0 rgba(255,255,255,0.1)' }}>
              {/* Dynamic island */}
              <div style={{ height: 10, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ width: 60, height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.12)' }} />
              </div>
              {/* Screen */}
              <div style={{ background: 'linear-gradient(180deg,#0a0618 0%,#0d0820 100%)', padding: '14px 16px 18px' }}>
                {/* Status bar */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                  <span style={{ fontFamily: 'Space Grotesk', fontWeight: 800, fontSize: 12, background: 'linear-gradient(135deg,#a78bfa,#06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>NUMERO</span>
                  <div style={{ display: 'flex', gap: 2, alignItems: 'flex-end' }}>
                    {[3, 5, 7, 9].map((h, i) => (
                      <div key={i} style={{ width: 3, height: h, borderRadius: 1.5, background: i < 3 ? '#a78bfa' : 'rgba(255,255,255,0.15)', transition: 'background 0.3s' }} />
                    ))}
                  </div>
                </div>
                {/* Dial bar */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '7px 10px', marginBottom: 10, borderRadius: 10, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Dial</span>
                  <span style={{ fontFamily: 'Space Grotesk', fontSize: 15, fontWeight: 800, letterSpacing: '0.12em', color: '#fff' }}>
                    {dialed}<span style={{ display: 'inline-block', width: 1.5, height: 13, marginLeft: 2, background: '#a78bfa', verticalAlign: 'middle', animation: 'caretPL 1s step-end infinite' }} />
                  </span>
                  <span style={{ fontSize: 9, color: '#34d399', fontWeight: 700 }}>No data</span>
                </div>
                {/* Title */}
                <p style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.4)', marginBottom: 10, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Numero Info Services</p>
                {/* Menu items */}
                <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 7 }}>
                  {USSD_ITEMS.map((item, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 10px', borderRadius: 10, background: i === activeUssd ? `${item.accent}22` : 'rgba(255,255,255,0.03)', border: `1px solid ${i === activeUssd ? item.accent + '50' : 'rgba(255,255,255,0.05)'}`, transition: 'all 0.5s cubic-bezier(0.16,1,0.3,1)', boxShadow: i === activeUssd ? `0 0 16px ${item.accent}25` : 'none' }}>
                      <span style={{ width: 18, height: 18, borderRadius: 5, background: i === activeUssd ? item.accent : 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 800, color: '#fff', flexShrink: 0, transition: 'all 0.4s' }}>{item.num}</span>
                      <span style={{ fontSize: 13, marginRight: 2 }}>{item.icon}</span>
                      <span style={{ flex: 1, minWidth: 0 }}>
                        <span style={{ display: 'block', fontSize: 10, fontWeight: 600, color: i <= activeUssd ? '#fff' : 'rgba(255,255,255,0.4)', lineHeight: 1.2, transition: 'color 0.4s' }}>{item.label}</span>
                        <span style={{ display: 'block', fontSize: 8, color: 'rgba(255,255,255,0.35)', lineHeight: 1.3, marginTop: 1, maxHeight: i === activeUssd ? 12 : 0, opacity: i === activeUssd ? 1 : 0, overflow: 'hidden', transition: 'all 0.4s' }}>{item.sub}</span>
                      </span>
                      {(i < activeUssd || ready) && <span style={{ fontSize: 10, color: item.accent }}>✓</span>}
                    </li>
                  ))}
                </ol>
                {/* Connecting */}
                <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                  {ready ? (
                    <span style={{ fontSize: 9, fontWeight: 700, color: '#34d399' }}>✓ Connected</span>
                  ) : (
                    <>
                      {[0, 1, 2].map(i => (
                        <div key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: '#a78bfa', animation: 'dotBounce 1.2s ease-in-out infinite', animationDelay: `${i * 0.2}s` }} />
                      ))}
                      <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', marginLeft: 4 }}>Connecting…</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right bubbles */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, animation: 'slideInRight 0.7s 0.3s both', opacity: 0 }}>
          {RIGHT_BUBBLES.map((b, i) => (
            <div key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '9px 16px 9px 10px', borderRadius: 50, background: `${b.accent}12`, border: `1px solid ${b.accent}30`, animation: 'float 6s ease-in-out infinite', animationDelay: b.delay, whiteSpace: 'nowrap', boxShadow: `0 0 20px ${b.accent}15` }}>
              <span style={{ width: 30, height: 30, borderRadius: '50%', background: `${b.accent}20`, border: `1px solid ${b.accent}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>{b.icon}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: b.accent, fontFamily: 'Space Grotesk' }}>{b.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ position: 'relative', zIndex: 1, animation: 'fadeUp 0.7s 0.5s both', opacity: 0 }}>
        {/* Ticker */}
        <div aria-hidden="true" style={{ overflow: 'hidden', WebkitMaskImage: 'linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent)', marginBottom: 14, padding: '4px 0' }}>
          <div style={{ display: 'flex', width: 'max-content', animation: 'tickerScroll 22s linear infinite', gap: 8 }}>
            {allTicker.map((t, i) => (
              <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 14px', borderRadius: 50, background: `${t.accent}12`, border: `1px solid ${t.accent}25`, fontSize: 11, fontWeight: 700, color: t.accent, whiteSpace: 'nowrap' }}>
                <span style={{ width: 4, height: 4, borderRadius: '50%', background: t.accent }} />
                {t.label}
              </span>
            ))}
          </div>
        </div>

        {/* Meter */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px', marginBottom: 6 }}>
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'Space Grotesk' }}>
            <em style={{ fontStyle: 'normal', fontWeight: 700, color: '#a78bfa' }}>0{statusIdx + 1} / 04</em>
            <span style={{ color: 'rgba(255,255,255,0.5)' }}>{STATUS[statusIdx]}{ready ? '' : '…'}</span>
          </span>
          <span style={{ fontFamily: 'Space Grotesk', fontSize: 12, fontWeight: 800, color: '#a78bfa', letterSpacing: '0.05em' }}>{pct}%</span>
        </div>

        {/* Progress bar */}
        <div style={{ height: 3, background: 'rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg,#4f46e5,#7c3aed,#9333ea,#c026d3)', transformOrigin: 'left', transform: `scaleX(${progress / 100})`, transition: 'transform 0.12s ease', boxShadow: '0 0 16px rgba(124,58,237,0.9)' }} />
          {/* Shimmer */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)', backgroundSize: '200% 100%', animation: 'shimmerPL 2s linear infinite' }} />
        </div>
      </div>

      <style>{`
        @keyframes blobPL{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(30px,-30px) scale(1.05)}66%{transform:translate(-20px,20px) scale(0.97)}}
        @keyframes pulseGlowPL{0%,100%{opacity:0.5}50%{opacity:1}}
        @keyframes caretPL{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes dotBounce{0%,80%,100%{transform:scale(0.6);opacity:0.4}40%{transform:scale(1);opacity:1}}
        @keyframes tickerScroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        @keyframes shimmerPL{0%{background-position:200% 0}100%{background-position:-200% 0}}
        @keyframes slideInLeft{from{opacity:0;transform:translateX(-40px)}to{opacity:1;transform:translateX(0)}}
        @keyframes slideInRight{from{opacity:0;transform:translateX(40px)}to{opacity:1;transform:translateX(0)}}
      `}</style>
    </div>
  )
}
