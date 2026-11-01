import { useEffect, useState } from 'react'

export default function Preloader() {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(interval); setTimeout(() => setDone(true), 400); return 100 }
        return p + Math.random() * 15
      })
    }, 100)
    return () => clearInterval(interval)
  }, [])

  if (done) return null

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'var(--dark)', display: 'flex',
      flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      transition: 'opacity 0.4s', opacity: progress >= 100 ? 0 : 1,
    }}>
      {/* Animated rings */}
      <div style={{ position: 'relative', width: 120, height: 120, marginBottom: 40 }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            position: 'absolute', inset: i * 16, borderRadius: '50%',
            border: `2px solid ${i === 0 ? '#7c3aed' : i === 1 ? '#06b6d4' : '#f59e0b'}`,
            animation: `spin-slow ${3 + i}s linear infinite ${i % 2 === 0 ? '' : 'reverse'}`,
          }} />
        ))}
        <div style={{
          position: 'absolute', inset: 0, display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          fontFamily: 'Space Grotesk', fontWeight: 800, fontSize: 14,
          background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>NI</div>
      </div>

      <div style={{ fontFamily: 'Space Grotesk', fontSize: 24, fontWeight: 700, color: '#fff', marginBottom: 8 }}>
        NUMERO INFO
      </div>
      <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 32 }}>
        IT Services & Digital Solutions
      </div>

      {/* Progress bar */}
      <div style={{ width: 240, height: 3, background: 'rgba(255,255,255,0.1)', borderRadius: 2, overflow: 'hidden' }}>
        <div style={{
          height: '100%', borderRadius: 2,
          background: 'linear-gradient(90deg, #7c3aed, #06b6d4)',
          width: `${Math.min(progress, 100)}%`,
          transition: 'width 0.1s ease',
        }} />
      </div>
      <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 12 }}>
        {Math.min(Math.round(progress), 100)}%
      </div>

      <style>{`
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}
