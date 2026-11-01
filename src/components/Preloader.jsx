import { useEffect, useState } from 'react'

export default function Preloader() {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState('loading') // loading | done | hidden

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        const next = p + Math.random() * 12 + 2
        if (next >= 100) {
          clearInterval(interval)
          setTimeout(() => setPhase('done'), 200)
          setTimeout(() => setPhase('hidden'), 900)
          return 100
        }
        return next
      })
    }, 80)
    return () => clearInterval(interval)
  }, [])

  if (phase === 'hidden') return null

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 99999,
      background: 'var(--dark)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      transition: 'opacity 0.6s ease, transform 0.6s ease',
      opacity: phase === 'done' ? 0 : 1,
      transform: phase === 'done' ? 'scale(1.05)' : 'scale(1)',
    }}>
      {/* Background grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(124,58,237,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.05) 1px, transparent 1px)',
        backgroundSize: '50px 50px',
      }} />

      {/* Glowing orbs */}
      <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'rgba(124,58,237,0.08)', filter: 'blur(80px)', top: '20%', left: '20%' }} />
      <div style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', background: 'rgba(6,182,212,0.06)', filter: 'blur(60px)', bottom: '20%', right: '20%' }} />

      {/* Logo rings */}
      <div style={{ position: 'relative', width: 140, height: 140, marginBottom: 48 }}>
        {[0, 1, 2, 3].map(i => (
          <div key={i} style={{
            position: 'absolute',
            inset: i * 14,
            borderRadius: '50%',
            border: `1.5px solid`,
            borderColor: ['rgba(124,58,237,0.8)', 'rgba(6,182,212,0.6)', 'rgba(191,0,255,0.5)', 'rgba(245,158,11,0.4)'][i],
            animation: `${i % 2 === 0 ? 'spin-slow' : 'spin-reverse'} ${3 + i * 1.5}s linear infinite`,
            boxShadow: i === 0 ? '0 0 20px rgba(124,58,237,0.4)' : 'none',
          }} />
        ))}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexDirection: 'column', gap: 2,
        }}>
          <div style={{
            fontFamily: 'Space Grotesk', fontWeight: 900, fontSize: 20,
            background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>NI</div>
        </div>
      </div>

      {/* Brand name */}
      <div style={{ fontFamily: 'Space Grotesk', fontSize: 28, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', marginBottom: 6 }}>
        NUMERO<span style={{ color: 'var(--neon)', textShadow: '0 0 20px rgba(0,255,240,0.8)' }}>.</span>INFO
      </div>
      <div style={{ fontSize: 12, color: 'var(--text-muted)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 48 }}>
        IT Services & Digital Solutions
      </div>

      {/* Progress bar */}
      <div style={{ width: 280, position: 'relative' }}>
        <div style={{ height: 2, background: 'rgba(255,255,255,0.06)', borderRadius: 2, overflow: 'hidden' }}>
          <div style={{
            height: '100%', borderRadius: 2,
            background: 'linear-gradient(90deg, #7c3aed, #06b6d4, #00fff0)',
            width: `${Math.min(progress, 100)}%`,
            transition: 'width 0.1s ease',
            boxShadow: '0 0 10px rgba(0,255,240,0.6)',
          }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, fontSize: 11, color: 'var(--text-muted)' }}>
          <span>Loading...</span>
          <span style={{ color: 'var(--neon)', fontWeight: 700 }}>{Math.min(Math.round(progress), 100)}%</span>
        </div>
      </div>

      <style>{`
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes spin-reverse { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
      `}</style>
    </div>
  )
}
