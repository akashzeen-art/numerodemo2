import { useEffect, useRef, useState } from 'react'

const slides = [
  {
    title: 'IT Infrastructure',
    desc: 'Data Center consultation, implementation and Network upgradation for enterprises of all sizes across India.',
    btn: 'Explore Now',
    dark: '#1a0050',
    light: '#7c3aed',
  },
  {
    title: 'Cloud Managed Services',
    desc: 'AWS, Azure & GCP optimization, cyber-secure backup and fully managed cloud services for your business.',
    btn: 'Get Started',
    dark: '#001a50',
    light: '#06b6d4',
  },
  {
    title: 'RPA & Automation',
    desc: 'Robotic Process Automation for OCR, Intelligent Document Processing and Contract Lifecycle Management.',
    btn: 'Learn More',
    dark: '#1a2a00',
    light: '#10b981',
  },
  {
    title: 'Data Analytics',
    desc: 'Business Intelligence, predictive analytics and hands-on training support for data-driven decisions.',
    btn: 'Discover',
    dark: '#2a1a00',
    light: '#f59e0b',
  },
  {
    title: 'E-Verification & KYC',
    desc: 'Digital E-Verification, E-KYC and identity management solutions for secure and seamless onboarding.',
    btn: 'See More',
    dark: '#1a0030',
    light: '#bf00ff',
  },
]

export default function ServiceSlider() {
  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)
  const intervalRef = useRef(null)
  const touchStart = useRef(0)
  const touchChange = useRef(0)

  const goTo = (idx) => {
    if (animating) return
    setAnimating(true)
    setCurrent(idx)
    setTimeout(() => setAnimating(false), 600)
  }

  const next = () => goTo((current + 1) % slides.length)
  const prev = () => goTo((current - 1 + slides.length) % slides.length)

  useEffect(() => {
    intervalRef.current = setInterval(next, 4000)
    return () => clearInterval(intervalRef.current)
  }, [current])

  const s = slides[current]

  return (
    <div style={{ position: 'relative', borderRadius: 24, overflow: 'hidden', height: 480, userSelect: 'none' }}
      onTouchStart={e => { touchStart.current = e.touches[0].clientX }}
      onTouchMove={e => { touchChange.current = touchStart.current - e.touches[0].clientX }}
      onTouchEnd={() => {
        if (touchChange.current > 50) next()
        if (touchChange.current < -50) prev()
        touchChange.current = 0
      }}
    >
      {/* Slide */}
      <div style={{
        width: '100%', height: '100%',
        backgroundColor: s.dark,
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        alignItems: 'center', position: 'relative', overflow: 'hidden',
        transition: 'background-color 0.5s ease',
      }}>
        {/* Skewed BG overlay */}
        <div style={{
          position: 'absolute', left: '-10%', top: 0, bottom: 0,
          width: '58%', backgroundColor: 'rgba(0,0,0,0.25)',
          transform: 'skewX(7deg)', transformOrigin: '0 100%',
          transition: 'all 0.5s ease',
        }} />
        <div style={{
          position: 'absolute', left: '-10%', top: 0, bottom: 0,
          width: '58%', backgroundColor: 'rgba(0,0,0,0.25)',
          transform: 'skewX(17deg)', transformOrigin: '0 100%',
        }} />

        {/* Details */}
        <div style={{ padding: '50px 50px 50px 80px', position: 'relative', zIndex: 10,
          animation: animating ? 'none' : 'slideIn 0.6s cubic-bezier(0.16,1,0.3,1) forwards',
        }}>
          <h2 style={{ fontSize: 'clamp(1.6rem,2.5vw,2.8rem)', fontWeight: 800, color: '#fff', marginBottom: 16, lineHeight: 1.2 }}>
            {s.title}
          </h2>
          <p style={{ fontSize: 14, color: '#B5B4B4', marginBottom: 28, lineHeight: 1.8, maxWidth: 320 }}>
            {s.desc}
          </p>
          <button style={{
            padding: '12px 32px', color: '#fff', borderRadius: 50,
            border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 14,
            backgroundColor: s.light, transition: 'all 0.3s ease',
            boxShadow: `0 8px 24px ${s.light}60`,
          }}
            onMouseEnter={e => e.target.style.opacity = '0.85'}
            onMouseLeave={e => e.target.style.opacity = '1'}
          >
            {s.btn}
          </button>
        </div>

        {/* Illustration */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', zIndex: 10 }}>
          <div style={{ position: 'relative', transform: 'skewX(-10deg)' }}>
            {/* Shadow layers */}
            <div style={{
              position: 'absolute', width: '100%', height: '100%',
              borderRadius: 24, backgroundColor: `${s.light}40`,
              top: 0, left: 0, transform: 'translate(32px, -16px)',
              transition: 'background-color 0.5s',
            }} />
            <div style={{
              position: 'absolute', width: '100%', height: '100%',
              borderRadius: 24, backgroundColor: `${s.light}40`,
              top: 0, left: 0, transform: 'translate(16px, -8px)',
              transition: 'background-color 0.5s',
            }} />
            {/* Main card */}
            <div style={{
              width: 160, height: 220, borderRadius: 24,
              backgroundColor: s.light,
              boxShadow: `0 20px 60px ${s.light}50`,
              transition: 'background-color 0.5s',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              animation: 'floatCard 3s ease-in-out infinite',
            }}>
              <div style={{ fontSize: 48, filter: 'brightness(0) invert(1)' }}>
                {['🖥️','☁️','🤖','📊','🔐'][current]}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Prev / Next arrows */}
      <button onClick={() => { clearInterval(intervalRef.current); prev() }} style={{
        position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)',
        background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
        borderRadius: '50%', width: 44, height: 44, cursor: 'pointer',
        color: '#fff', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 0.3s', zIndex: 20, backdropFilter: 'blur(10px)',
      }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
        onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
      >‹</button>

      <button onClick={() => { clearInterval(intervalRef.current); next() }} style={{
        position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)',
        background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
        borderRadius: '50%', width: 44, height: 44, cursor: 'pointer',
        color: '#fff', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 0.3s', zIndex: 20, backdropFilter: 'blur(10px)',
      }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
        onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
      >›</button>

      {/* Trail dots */}
      <div style={{
        position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', gap: 8, zIndex: 20,
      }}>
        {slides.map((sl, i) => (
          <button key={i} onClick={() => { clearInterval(intervalRef.current); goTo(i) }} style={{
            width: i === current ? 28 : 8, height: 8,
            borderRadius: 4, border: 'none', cursor: 'pointer',
            backgroundColor: i === current ? sl.light : 'rgba(255,255,255,0.3)',
            transition: 'all 0.4s ease',
            boxShadow: i === current ? `0 0 12px ${sl.light}` : 'none',
          }} />
        ))}
      </div>

      {/* Slide number */}
      <div style={{
        position: 'absolute', top: 20, right: 70, zIndex: 20,
        fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: 600,
      }}>
        {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
      </div>

      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes floatCard {
          0%,100% { transform: skewX(-10deg) translateY(0); }
          50% { transform: skewX(-10deg) translateY(-12px); }
        }
      `}</style>
    </div>
  )
}
