import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const stages = [
  {
    num: 1, color: '#7c3aed', title: 'Choose a purchase', icon: '🛒', tag: 'Purchase',
    desc: 'The user picks a game, subscription, app or digital content online.',
    steps: 'Games · Subscriptions · Apps',
    img: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=75',
  },
  {
    num: 2, color: '#06b6d4', title: 'Pay with mobile', icon: '📱', tag: 'Checkout',
    desc: 'They select their mobile number as the payment method and confirm. No card needed — checkout built for the phone.',
    steps: 'Any mobile device',
    img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=75',
  },
  {
    num: 3, color: '#f59e0b', title: 'Charged by the operator', icon: '🧾', tag: 'Billing',
    desc: 'The amount is added to the phone bill or deducted from prepaid balance.',
    steps: 'Mobile bill or prepaid SIM',
    img: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=75',
  },
  {
    num: 4, color: '#10b981', title: 'Enjoy & get rewarded', icon: '🎁', tag: 'Engagement',
    desc: 'Users get the audio books, VOD, HD games and contests they love — and subscribers unlock gifts that keep them coming back.',
    steps: 'Higher conversions',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=75',
  },
]

export default function JourneySection() {
  const [active, setActive] = useState(0)
  const [imgY, setImgY] = useState(0)
  const outerRef = useRef(null)   // tall scroll container
  const stickyRef = useRef(null)  // sticky panel

  useEffect(() => {
    const onScroll = () => {
      const outer = outerRef.current
      if (!outer) return
      const rect = outer.getBoundingClientRect()
      const totalScroll = outer.offsetHeight - window.innerHeight
      const scrolled = Math.max(0, -rect.top)
      const progress = Math.min(scrolled / totalScroll, 1)

      // Map progress → stage index (0-3)
      const idx = Math.min(Math.floor(progress * stages.length), stages.length - 1)
      setActive(idx)

      // Parallax: image shifts slightly as user scrolls
      setImgY(scrolled * 0.06)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const s = stages[active]
  const progress = ((active + 1) / stages.length) * 100

  return (
    // Tall outer div — 4× viewport height so each stage gets ~1 screen of scroll
    <div ref={outerRef} style={{ height: `${stages.length * 100}vh`, position: 'relative' }}>

      {/* Sticky panel */}
      <div ref={stickyRef} style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', background: 'var(--dark2)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

        {/* BG glow */}
        <div style={{ position: 'absolute', width: 700, height: 700, borderRadius: '50%', background: `${s.color}08`, filter: 'blur(140px)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', transition: 'background 0.7s ease', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1, width: '100%' }}>

          {/* Header */}
          <div style={{ marginBottom: 56 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 18px', borderRadius: 50, background: `${s.color}15`, border: `1px solid ${s.color}30`, marginBottom: 16, transition: 'all 0.6s' }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: s.color, boxShadow: `0 0 10px ${s.color}`, animation: 'pulseDotJ 2s infinite' }} />
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: s.color }}>Direct Carrier Billing</span>
            </div>
            <h2 style={{ fontSize: 'clamp(1.6rem,2.8vw,2.6rem)', fontWeight: 800, color: 'var(--white)', lineHeight: 1.2 }}>
              Pay with your mobile,{' '}
              <span style={{ background: 'var(--gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>no card needed</span>
            </h2>
          </div>

          {/* 2-col */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 64, alignItems: 'center' }}>

            {/* Left — text */}
            <div>
              <div style={{ position: 'relative', height: 230, marginBottom: 40 }}>
                {stages.map((st, i) => (
                  <article key={i} style={{
                    position: 'absolute', inset: 0,
                    opacity: i === active ? 1 : 0,
                    transform: i === active ? 'translateY(0) scale(1)' : i < active ? 'translateY(-22px) scale(0.97)' : 'translateY(26px) scale(0.97)',
                    transition: 'all 0.75s cubic-bezier(0.16,1,0.3,1)',
                    pointerEvents: i === active ? 'auto' : 'none',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 18 }}>
                      <span style={{ width: 60, height: 60, borderRadius: 18, background: st.color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 900, fontFamily: 'Space Grotesk', boxShadow: `0 0 32px ${st.color}70, 0 8px 24px rgba(0,0,0,0.3)`, flexShrink: 0 }}>{st.num}</span>
                      <div>
                        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: st.color, display: 'block', marginBottom: 3 }}>{st.tag}</span>
                        <h3 style={{ fontSize: 'clamp(1.1rem,1.8vw,1.55rem)', fontWeight: 800, color: 'var(--white)', fontFamily: 'Space Grotesk', lineHeight: 1.2 }}>{st.title}</h3>
                      </div>
                    </div>
                    <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.85, maxWidth: 420, marginBottom: 18 }}>{st.desc}</p>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 14px', borderRadius: 50, background: `${st.color}10`, border: `1px solid ${st.color}25`, fontSize: 11, fontWeight: 600, color: st.color }}>
                      <span style={{ width: 4, height: 4, borderRadius: '50%', background: st.color }} />{st.steps}
                    </span>
                  </article>
                ))}
              </div>

              <Link to="/services#dcb" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--gradient)', color: '#fff', padding: '13px 28px', borderRadius: 50, fontWeight: 700, fontSize: 14, textDecoration: 'none', boxShadow: '0 8px 28px rgba(124,58,237,0.45)', transition: 'all 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(124,58,237,0.65)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(124,58,237,0.45)' }}>
                Explore Carrier Billing →
              </Link>
            </div>

            {/* Right — parallax image */}
            <div style={{ position: 'relative', height: 'min(55vh, 420px)', borderRadius: 28, overflow: 'hidden', boxShadow: '0 40px 80px rgba(0,0,0,0.55)', isolation: 'isolate' }}>
              {/* Active border ring */}
              <div style={{ position: 'absolute', inset: 0, borderRadius: 28, border: `1px solid ${s.color}45`, zIndex: 3, pointerEvents: 'none', transition: 'border-color 0.6s' }} />

              {stages.map((st, i) => (
                <div key={i} style={{
                  position: 'absolute', inset: 0, overflow: 'hidden',
                  clipPath: i === active ? 'inset(0% 0% 0%)' : 'inset(100% 0% 0%)',
                  transition: 'clip-path 0.95s cubic-bezier(0.16,1,0.3,1)',
                  zIndex: i === active ? 1 : 0,
                }}>
                  <img src={st.img} alt={st.title} style={{
                    width: '100%', height: '120%', objectFit: 'cover', display: 'block',
                    transform: `translateY(${i === active ? -imgY * 0.35 : 0}px) scale(${i === active ? 1 : 1.06})`,
                    transition: i === active ? 'transform 0.05s linear' : 'transform 0.9s ease',
                    willChange: 'transform',
                  }} />
                  <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, ${st.color}55 0%, rgba(0,0,0,0.15) 55%, transparent 100%)` }} />

                  {/* Badge */}
                  <div style={{ position: 'absolute', bottom: 20, left: 20, display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(16px)', padding: '10px 18px 10px 12px', borderRadius: 14, border: '1px solid rgba(255,255,255,0.1)', zIndex: 2 }}>
                    <span style={{ width: 36, height: 36, borderRadius: 10, background: st.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, boxShadow: `0 0 16px ${st.color}60` }}>{st.icon}</span>
                    <div>
                      <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>Stage {st.num}</div>
                      <div style={{ fontSize: 13, color: '#fff', fontWeight: 700 }}>{st.title}</div>
                    </div>
                  </div>

                  {/* Counter */}
                  <div style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(12px)', padding: '5px 12px', borderRadius: 50, fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.65)', border: '1px solid rgba(255,255,255,0.1)', zIndex: 2 }}>
                    {String(i + 1).padStart(2, '0')} / 04
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress nav */}
          <div style={{ marginTop: 52, maxWidth: 800, margin: '52px auto 0' }}>
            <div style={{ position: 'relative', marginBottom: 20 }}>
              <div style={{ height: 2, background: 'rgba(255,255,255,0.07)', borderRadius: 2, margin: '0 12.5%', overflow: 'hidden' }}>
                <div style={{ height: '100%', background: 'var(--gradient)', transformOrigin: 'left', transform: `scaleX(${progress / 100})`, transition: 'transform 0.5s ease', boxShadow: `0 0 12px ${s.color}` }} />
              </div>
              <div style={{ position: 'absolute', top: '50%', left: `calc(12.5% + ${(progress / 100) * 75}%)`, transform: 'translate(-50%,-50%)', width: 28, height: 28, borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 20px ${s.color}`, transition: 'left 0.5s ease', zIndex: 2, fontSize: 12 }}>⚡</div>
            </div>

            <ol style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', listStyle: 'none', padding: 0, margin: 0 }}>
              {stages.map((st, i) => (
                <li key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 38, height: 38, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Space Grotesk', fontSize: 14, fontWeight: 800, transition: 'all 0.5s', background: i === active ? st.color : 'rgba(255,255,255,0.06)', color: i === active ? '#fff' : 'var(--text-muted)', transform: i === active ? 'scale(1.15)' : 'scale(1)', boxShadow: i === active ? `0 0 24px ${st.color}60` : 'none', border: i === active ? 'none' : '1px solid rgba(255,255,255,0.08)' }}>{st.num}</span>
                  <span style={{ fontSize: 10, fontWeight: 600, fontFamily: 'Space Grotesk', color: i === active ? 'var(--white)' : 'var(--text-muted)', transition: 'color 0.3s', textAlign: 'center', lineHeight: 1.3 }}>{st.title}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Scroll hint — only on first stage */}
        {active === 0 && (
          <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, animation: 'fadeUp 0.6s both' }}>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Scroll to explore</span>
            <div style={{ width: 20, height: 32, borderRadius: 10, border: '1px solid rgba(255,255,255,0.2)', display: 'flex', justifyContent: 'center', paddingTop: 6 }}>
              <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--neon)', animation: 'scrollDotJ 1.5s ease-in-out infinite' }} />
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes pulseDotJ{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.6;transform:scale(1.5)}}
        @keyframes scrollDotJ{0%{transform:translateY(0);opacity:1}100%{transform:translateY(12px);opacity:0}}
        @media(max-width:900px){
          .journey-inner-grid{grid-template-columns:1fr!important}
        }
      `}</style>
    </div>
  )
}
