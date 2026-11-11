import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { vasProducts } from '../data/content'

const phases = [
  { num: 1, label: 'VAS Platforms',       color: '#7c3aed' },
  { num: 2, label: 'Carrier Billing',     color: '#06b6d4' },
  { num: 3, label: 'Content & Marketing', color: '#f59e0b' },
  { num: 4, label: 'Forex',               color: '#10b981' },
]

export default function ServicesHero() {
  const bgRef = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      if (bgRef.current) {
        bgRef.current.style.transform = `scale(1.1) translateY(${window.scrollY * 0.25}px)`
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section style={{ position: 'relative', overflow: 'hidden', paddingTop: 160, paddingBottom: 100, color: '#fff', minHeight: '90vh', display: 'flex', alignItems: 'center' }}>

      {/* Background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <div ref={bgRef} style={{ position: 'absolute', inset: 0, willChange: 'transform', transform: 'scale(1.1)' }}>
          <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=75" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(6,4,18,0.97) 0%, rgba(124,58,237,0.75) 60%, rgba(6,4,18,0.96) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(60% 60% at 70% 40%, rgba(6,182,212,0.18), transparent)' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)', backgroundSize: '64px 64px' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 120, background: 'linear-gradient(to top, var(--dark), transparent)' }} />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1, width: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>

          {/* Left */}
          <div>
            <p style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 14px', borderRadius: 50, background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--primary-light)', marginBottom: 24 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--primary-light)', animation: 'pulse-dot 2s infinite' }} />
              VAS · DCB · Forex
            </p>

            <h1 style={{ fontSize: 'clamp(2.4rem,4.5vw,3.8rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: 24, letterSpacing: '-0.02em' }}>
              Telecom solutions that<br />
              <span style={{ background: 'linear-gradient(135deg,#a78bfa,#00fff0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>connect, engage & grow</span>
            </h1>

            <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.65)', lineHeight: 1.85, maxWidth: 480, marginBottom: 40 }}>
              From USSD and SMSC to Cloud IVR and mobile advertising, Direct Carrier Billing with content and digital marketing, and cross-border payments across 50+ currencies.
            </p>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 48 }}>
              <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--gradient)', color: '#fff', padding: '13px 28px', borderRadius: 50, fontWeight: 700, fontSize: 14, textDecoration: 'none', boxShadow: '0 8px 28px rgba(124,58,237,0.5)', transition: 'all 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(124,58,237,0.7)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(124,58,237,0.5)' }}>
                Get Free Consultation →
              </Link>
              <a href="#vas" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.07)', color: '#fff', padding: '13px 28px', borderRadius: 50, fontWeight: 700, fontSize: 14, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.12)', transition: 'all 0.3s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.07)'}>
                Explore Services ↓
              </a>
            </div>

            {/* 4 phase pills — clean row */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {phases.map(ph => (
                <span key={ph.num} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', borderRadius: 50, background: `${ph.color}15`, border: `1px solid ${ph.color}30`, fontSize: 12, fontWeight: 600, color: ph.color }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: ph.color }} />
                  {ph.label}
                </span>
              ))}
            </div>
          </div>

          {/* Right — clean orbit */}
          <div style={{ position: 'relative', width: '100%', maxWidth: 360, margin: '0 auto', aspectRatio: '1' }}>

            {/* Dashed outer ring */}
            <svg viewBox="0 0 100 100" style={{ position: 'absolute', inset: '-10%', width: '120%', height: '120%', animation: 'spin-slow 40s linear infinite', opacity: 0.3 }} aria-hidden="true">
              <circle cx="50" cy="50" r="49" fill="none" stroke="rgba(124,58,237,0.8)" strokeWidth="0.4" strokeDasharray="2 3" />
            </svg>

            {/* Orbiting spark */}
            <div style={{ position: 'absolute', inset: '-10%', width: '120%', height: '120%', animation: 'spin-slow 6s linear infinite' }}>
              <span style={{ position: 'absolute', top: 0, left: '50%', transform: 'translate(-50%,-50%)', width: 32, height: 32, borderRadius: '50%', background: 'var(--gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, boxShadow: '0 0 20px rgba(124,58,237,0.9)' }}>⚡</span>
            </div>

            {/* Arc segments */}
            <svg viewBox="0 0 100 100" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', transform: 'rotate(-90deg)' }} aria-hidden="true">
              <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
              {[
                { color: '#7c3aed', offset: '0',     array: '0.23 1' },
                { color: '#06b6d4', offset: '-0.25', array: '0.23 1' },
                { color: '#f59e0b', offset: '-0.5',  array: '0.23 1' },
                { color: '#10b981', offset: '-0.75', array: '0.23 1' },
              ].map((a, i) => (
                <circle key={i} cx="50" cy="50" r="40" fill="none" stroke={a.color} strokeWidth="8"
                  pathLength="1" strokeDashoffset={a.offset} strokeDasharray={a.array}
                  style={{ filter: `drop-shadow(${a.color} 0 0 5px)` }} />
              ))}
            </svg>

            {/* Center */}
            <div style={{ position: 'absolute', inset: '24%', borderRadius: '50%', background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: 'inset 0 0 40px rgba(124,58,237,0.15)' }}>
              <span style={{ fontFamily: 'Space Grotesk', fontSize: 44, fontWeight: 900, lineHeight: 1, background: 'var(--gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{vasProducts.length}</span>
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--neon)', marginTop: 4 }}>VAS products</span>
              <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>3 businesses</span>
            </div>

            {/* 4 floating phase badges — one per quadrant */}
            {phases.map((ph, i) => {
              const angle = (i / 4) * 360 - 90
              const rad = angle * Math.PI / 180
              const r = 54
              const cx = 50 + r * Math.cos(rad)
              const cy = 50 + r * Math.sin(rad)
              return (
                <div key={i} style={{ position: 'absolute', left: `${cx}%`, top: `${cy}%`, transform: 'translate(-50%,-50%)', animation: `float 6s ease-in-out infinite`, animationDelay: `${i * 0.7}s` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)', padding: '6px 10px 6px 6px', borderRadius: 12, whiteSpace: 'nowrap' }}>
                    <span style={{ width: 24, height: 24, borderRadius: 6, background: ph.color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 900, fontFamily: 'Space Grotesk', boxShadow: `${ph.color} 0 0 12px`, flexShrink: 0 }}>{ph.num}</span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#fff' }}>{ph.label}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.6;transform:scale(1.5)} }
        @media(max-width:768px){
          .services-hero-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
