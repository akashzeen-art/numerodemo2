import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import FlipCards from '../components/FlipCards'
import JourneySection from '../components/JourneySection'
import useScrollReveal from '../hooks/useScrollReveal'
import { pillars, forex, marqueeItems, vasProducts, dcb } from '../data/content'
import '../styles/global.css'
import '../styles/home.css'

const stats = [
  { number: '3', label: 'Business Lines' },
  { number: `${vasProducts.length}`, label: 'VAS Products' },
  { number: `${dcb.content.length}`, label: 'Content Categories' },
  { number: '50+', label: 'Currencies' },
]

const whyUs = [
  { icon: '📡', title: 'Carrier-Grade VAS',    desc: 'USSD, SMSC, Cloud IVR, CRBT and messaging on one carrier-grade platform.' },
  { icon: '📱', title: 'Mobile-First Payments', desc: 'Checkout built for the phone, paid with just a mobile number.' },
  { icon: '🌍', title: 'Global Content',        desc: 'Games, VOD, audio books and more, regularly refreshed for a global audience.' },
  { icon: '📊', title: 'Measurable Outcomes',   desc: 'Track every transaction and campaign with clear, measurable results.' },
  { icon: '💱', title: 'Deep Liquidity',        desc: '50+ currencies across major, exotic and illiquid markets.' },
  { icon: '🛡️', title: 'Compliance & Control',  desc: 'Secure information, clear accountability and regulation-ready workflows.' },
]

// 3D Tilt Card
function TiltCard({ children, className, style }) {
  const ref = useRef(null)
  const handleMove = e => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(1000px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) translateZ(10px)`
  }
  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0px)'
  }
  return (
    <div ref={ref} className={className} style={{ ...style, transition: 'transform 0.3s ease', transformStyle: 'preserve-3d' }}
      onMouseMove={handleMove} onMouseLeave={handleLeave}>
      {children}
    </div>
  )
}

// Particle background
function Particles() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.4 + 0.1,
    }))
    let raf
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(124,58,237,${p.opacity})`
        ctx.fill()
      })
      // Draw connections
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach(b => {
          const dist = Math.hypot(a.x - b.x, a.y - b.y)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(124,58,237,${0.08 * (1 - dist / 120)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })
      raf = requestAnimationFrame(draw)
    }
    draw()
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }} />
}

// Typewriter
function Typewriter({ words }) {
  const [idx, setIdx] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)
  useEffect(() => {
    const word = words[idx]
    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(word.slice(0, text.length + 1))
        if (text.length === word.length) setTimeout(() => setDeleting(true), 1500)
      } else {
        setText(word.slice(0, text.length - 1))
        if (text.length === 0) { setDeleting(false); setIdx((idx + 1) % words.length) }
      }
    }, deleting ? 50 : 100)
    return () => clearTimeout(timeout)
  }, [text, deleting, idx, words])
  return (
    <span style={{ color: 'var(--neon)', textShadow: '0 0 20px rgba(0,255,240,0.6)' }}>
      {text}<span style={{ animation: 'blink 1s infinite', borderRight: '2px solid var(--neon)' }} />
    </span>
  )
}

export default function Home() {
  useScrollReveal()

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section style={{ position:'relative', display:'flex', minHeight:'100svh', flexDirection:'column', justifyContent:'center', overflow:'hidden', paddingTop:112, paddingBottom:176, color:'#fff' }}>

        {/* ── Background ── */}
        <div style={{ position:'absolute', inset:0, zIndex:0 }}>
          {/* Video bg */}
          <div style={{ position:'absolute', inset:0, willChange:'transform', transform:'scale(1.08)' }}>
            <video style={{ width:'100%', height:'100%', objectFit:'cover' }}
              src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
              poster="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=75"
              autoPlay loop playsInline muted preload="metadata" />
          </div>
          {/* Overlays */}
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg,rgba(6,4,18,0.96) 0%,rgba(124,58,237,0.82) 50%,rgba(6,4,18,0.96) 100%)' }} />
          <div style={{ position:'absolute', inset:0, background:'radial-gradient(45% 55% at 78% 38%,rgba(6,182,212,0.28),transparent 70%),radial-gradient(40% 45% at 12% 85%,rgba(124,58,237,0.55),transparent 70%)' }} />
          <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)', backgroundSize:'64px 64px', opacity:0.6 }} />
          {/* Blobs */}
          <div style={{ position:'absolute', top:'-6rem', right:'-10%', width:'34rem', height:'34rem', borderRadius:'50%', background:'rgba(6,182,212,0.18)', filter:'blur(80px)', animation:'blobH 9s ease-in-out infinite', pointerEvents:'none' }} />
          <div style={{ position:'absolute', bottom:'-10%', left:'-8rem', width:'24rem', height:'24rem', borderRadius:'50%', background:'rgba(245,158,11,0.12)', filter:'blur(80px)', animation:'blobH 9s ease-in-out infinite', animationDelay:'4s', pointerEvents:'none' }} />
          {/* ECG line */}
          <svg viewBox="0 0 1400 120" preserveAspectRatio="none" style={{ position:'absolute', bottom:96, left:0, right:0, width:'100%', height:80, opacity:0.7 }} aria-hidden="true">
            <path d="M0 60 h50 l8 -10 l8 10 h12 l6 8 l10 -48 l10 64 l8 -24 h18 l14 -12 l14 12 h42 h50 l8 -10 l8 10 h12 l6 8 l10 -48 l10 64 l8 -24 h18 l14 -12 l14 12 h42 h50 l8 -10 l8 10 h12 l6 8 l10 -48 l10 64 l8 -24 h18 l14 -12 l14 12 h42 h50 l8 -10 l8 10 h12 l6 8 l10 -48 l10 64 l8 -24 h18 l14 -12 l14 12 h42 h50 l8 -10 l8 10 h12 l6 8 l10 -48 l10 64 l8 -24 h18 l14 -12 l14 12 h42 h50 l8 -10 l8 10 h12 l6 8 l10 -48 l10 64 l8 -24 h18 l14 -12 l14 12 h42 h50 l8 -10 l8 10 h12 l6 8 l10 -48 l10 64 l8 -24 h18 l14 -12 l14 12 h42"
              fill="none" stroke="rgba(124,58,237,0.3)" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
            <path d="M0 60 h50 l8 -10 l8 10 h12 l6 8 l10 -48 l10 64 l8 -24 h18 l14 -12 l14 12 h42 h50 l8 -10 l8 10 h12 l6 8 l10 -48 l10 64 l8 -24 h18 l14 -12 l14 12 h42 h50 l8 -10 l8 10 h12 l6 8 l10 -48 l10 64 l8 -24 h18 l14 -12 l14 12 h42 h50 l8 -10 l8 10 h12 l6 8 l10 -48 l10 64 l8 -24 h18 l14 -12 l14 12 h42 h50 l8 -10 l8 10 h12 l6 8 l10 -48 l10 64 l8 -24 h18 l14 -12 l14 12 h42 h50 l8 -10 l8 10 h12 l6 8 l10 -48 l10 64 l8 -24 h18 l14 -12 l14 12 h42 h50 l8 -10 l8 10 h12 l6 8 l10 -48 l10 64 l8 -24 h18 l14 -12 l14 12 h42"
              pathLength="1" fill="none" stroke="#a78bfa" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke"
              style={{ strokeDasharray:'0.22 0.78', filter:'drop-shadow(rgba(124,58,237,0.9) 0 0 6px)', animation:'ecgH 3s linear infinite' }} />
          </svg>
          <div style={{ position:'absolute', bottom:0, left:0, right:0, height:128, background:'linear-gradient(to top,var(--dark),transparent)' }} />
        </div>

        {/* ── Floating icons ── */}
        {[{icon:'💱',top:'20%',right:'3%',delay:'0s',size:56},{icon:'📡',top:'13%',right:'40%',delay:'0.8s',size:44},{icon:'📱',bottom:'36%',right:'33%',delay:'1.6s',size:44},{icon:'🛡️',bottom:'40%',right:'2%',delay:'2.2s',size:48},{icon:'⚡',top:'11%',left:'44%',delay:'1.2s',size:36},{icon:'📊',top:'9%',right:'16%',delay:'2.8s',size:40}].map((f,i)=>(
          <div key={i} style={{ position:'absolute', top:f.top, bottom:f.bottom, right:f.right, left:f.left, width:f.size, height:f.size, borderRadius:14, background:'rgba(255,255,255,0.07)', backdropFilter:'blur(12px)', border:'1px solid rgba(255,255,255,0.15)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:f.size*0.42, boxShadow:'0 0 28px rgba(124,58,237,0.25)', animation:'float 6s ease-in-out infinite', animationDelay:f.delay, zIndex:1, pointerEvents:'none' }}>{f.icon}</div>
        ))}

        {/* ── Main content ── */}
        {/* <div className="container" style={{ position:'relative', zIndex:2, width:'100%' }}> */}
          <div style={{ display:'grid', gridTemplateColumns:'1.3fr 1fr', gap:48, alignItems:'center' }}>

            {/* Left */}
            <div>
              <p style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'6px 16px', borderRadius:50, background:'rgba(255,255,255,0.08)', backdropFilter:'blur(12px)', border:'1px solid rgba(255,255,255,0.15)', fontSize:11, fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase', color:'var(--neon)', marginBottom:24, animation:'fadeUp 0.6s 0.2s both' }}>
                <span style={{ position:'relative', display:'flex', width:8, height:8 }}>
                  <span style={{ position:'absolute', inset:0, borderRadius:'50%', background:'var(--neon)', animation:'ping 1.5s infinite', opacity:0.6 }} />
                  <span style={{ position:'relative', width:8, height:8, borderRadius:'50%', background:'var(--neon)' }} />
                </span>
                VAS · Carrier Billing · Cross-Border Payments
              </p>

              <h1 style={{ fontSize:'clamp(2.6rem,5vw,4.25rem)', fontWeight:900, lineHeight:1.08, letterSpacing:'-0.02em', marginBottom:24 }}>
                {['Connect,','Engage'].map((w,i)=>(
                  <span key={i} style={{ display:'inline-block', overflow:'hidden', paddingBottom:4, marginRight:12, verticalAlign:'bottom' }}>
                    <span style={{ display:'inline-block', background:'linear-gradient(135deg,#a78bfa 0%,#00fff0 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', animation:`fadeUp 0.7s ${0.3+i*0.1}s both` }}>{w}</span>
                  </span>
                ))}
                <br />
                {['&','Grow.'].map((w,i)=>(
                  <span key={i} style={{ display:'inline-block', overflow:'hidden', paddingBottom:4, marginRight:12, verticalAlign:'bottom' }}>
                    <span style={{ display:'inline-block', color:'#fff', animation:`fadeUp 0.7s ${0.55+i*0.1}s both` }}>{w}</span>
                  </span>
                ))}
              </h1>

              <p style={{ fontSize:18, color:'rgba(255,255,255,0.75)', lineHeight:1.85, maxWidth:520, marginBottom:36, animation:'fadeUp 0.7s 0.9s both' }}>
                Telecom VAS platforms, Direct Carrier Billing with content and digital marketing, and cross-border payments that connect countries, currencies and stakeholders into one clear process.
              </p>

              <div style={{ display:'flex', gap:12, flexWrap:'wrap', animation:'fadeUp 0.7s 1.05s both' }}>
                <Link to="/contact" style={{ display:'inline-flex', alignItems:'center', gap:8, background:'var(--gradient)', color:'#fff', padding:'15px 32px', borderRadius:50, fontWeight:700, fontSize:15, textDecoration:'none', boxShadow:'0 8px 32px rgba(124,58,237,0.55)', transition:'all 0.3s' }}
                  onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-3px)';e.currentTarget.style.boxShadow='0 16px 48px rgba(124,58,237,0.75)'}}
                  onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='0 8px 32px rgba(124,58,237,0.55)'}}>Get Free Quote →</Link>
                <Link to="/services" style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(255,255,255,0.08)', backdropFilter:'blur(12px)', color:'#fff', padding:'15px 32px', borderRadius:50, fontWeight:700, fontSize:15, textDecoration:'none', border:'1px solid rgba(255,255,255,0.15)', transition:'all 0.3s' }}
                  onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,0.15)'}
                  onMouseLeave={e=>e.currentTarget.style.background='rgba(255,255,255,0.08)'}>Explore Services</Link>
              </div>
            </div>

            {/* Right — orbit visual */}
            <div style={{ position:'relative', height:'30rem', display:'flex', alignItems:'center', justifyContent:'center' }}>
              {/* Pulse glow */}
              <span style={{ position:'absolute', inset:'10%', borderRadius:'50%', background:'rgba(6,182,212,0.1)', filter:'blur(20px)', animation:'pulseGlow 4s ease-in-out infinite' }} />
              {/* Outer dashed ring */}
              <svg viewBox="0 0 100 100" style={{ position:'absolute', inset:'-6%', width:'112%', height:'112%', animation:'spin-slow 40s linear infinite', color:'rgba(124,58,237,0.4)' }} aria-hidden="true">
                <circle cx="50" cy="50" r="49" fill="none" stroke="currentColor" strokeWidth="0.4" strokeDasharray="2 3" />
              </svg>
              {/* Inner ring */}
              <svg viewBox="0 0 100 100" style={{ position:'absolute', inset:'-12%', width:'124%', height:'124%', animation:'spin-slow 60s linear infinite reverse', color:'rgba(255,255,255,0.12)' }} aria-hidden="true">
                <circle cx="50" cy="50" r="49" fill="none" stroke="currentColor" strokeWidth="0.25" />
                <circle cx="50" cy="1" r="1.3" fill="#a78bfa" />
                <circle cx="1" cy="50" r="0.9" fill="#fff" />
              </svg>
              {/* Orbiting spark */}
              <div style={{ position:'absolute', inset:'-6%', width:'112%', height:'112%', animation:'spin-slow 8s linear infinite' }}>
                <span style={{ position:'absolute', top:'50%', right:'-1rem', transform:'translateY(-50%)', width:36, height:36, borderRadius:'50%', background:'var(--gradient)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:16, boxShadow:'0 0 22px rgba(124,58,237,0.9)' }}>⚡</span>
              </div>
              {/* Center circle image */}
              <div style={{ position:'relative', width:'70%', height:'70%', borderRadius:'50%', overflow:'hidden', border:'4px solid rgba(255,255,255,0.12)', boxShadow:'0 0 80px rgba(6,182,212,0.3)' }}>
                <img src="/images/slider-img.png" alt="hero" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                <span style={{ position:'absolute', inset:0, background:'linear-gradient(135deg,rgba(124,58,237,0.3),transparent 50%,rgba(6,182,212,0.15))' }} />
              </div>
              {/* Floating service badges */}
              {[
                { label:'Telecom VAS', icon:'📡', top:'4%', right:'2%', delay:'0s' },
                { label:'Carrier Billing', icon:'📱', top:'42%', left:'-6%', delay:'0.9s' },
                { label:'50+ Currencies', icon:'💱', bottom:'6%', right:'6%', delay:'1.8s' },
              ].map((b,i)=>(
                <div key={i} style={{ position:'absolute', top:b.top, bottom:b.bottom, right:b.right, left:b.left, animation:'float 6s ease-in-out infinite', animationDelay:b.delay, zIndex:2 }}>
                  <div style={{ display:'inline-flex', alignItems:'center', gap:10, background:'rgba(0,0,0,0.65)', backdropFilter:'blur(16px)', border:'1px solid rgba(255,255,255,0.12)', padding:'10px 16px 10px 10px', borderRadius:16, whiteSpace:'nowrap', boxShadow:'0 8px 32px rgba(0,0,0,0.3)' }}>
                    <span style={{ position:'relative', width:36, height:36, borderRadius:10, background:'var(--gradient)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:16 }}>
                      <span style={{ position:'absolute', inset:0, borderRadius:10, background:'var(--gradient)', animation:'ping 2.8s infinite', opacity:0.4 }} />
                      {b.icon}
                    </span>
                    <span style={{ fontSize:13, fontWeight:700, color:'#fff', fontFamily:'Space Grotesk' }}>{b.label}</span>
                  </div>
                </div>
              ))}
            </div>
        </div>

        <style>{`
          @keyframes blobH{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(20px,-20px) scale(1.04)}66%{transform:translate(-10px,10px) scale(0.97)}}
          @keyframes ecgH{from{stroke-dashoffset:1}to{stroke-dashoffset:-1}}
          @keyframes ping{0%{transform:scale(1);opacity:0.6}100%{transform:scale(2);opacity:0}}
          @keyframes pulseGlow{0%,100%{opacity:0.4}50%{opacity:0.8}}
          @media(max-width:900px){.hero-grid-inner{grid-template-columns:1fr!important}}
        `}</style>
      </section>

      {/* Marquee */}
      <div className="marquee-section">
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <div key={i} className="marquee-item">
              <div className="marquee-dot" />
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="stats-bar">
        <div className="container">
          <div className="stats-grid">
            {stats.map((s, i) => (
              <div key={i} className="stat-item reveal" style={{ transitionDelay: `${i * 0.12}s` }}>
                <div className="stat-number">{s.number}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Services */}
      <section className="section">
        <div className="container">
          <div className="section-heading reveal">
            <div className="tag">What We Do</div>
            <h2>Our <span className="gradient-text">Core Services</span></h2>
            <p>Telecom VAS, Direct Carrier Billing and cross-border payments</p>
          </div>
          <div className="services-grid">
            {pillars.map((s, i) => (
              <TiltCard key={s.id} className="service-card reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="service-card-inner">
                  <div className="service-icon" style={{ background: `${s.color}18`, borderColor: `${s.color}30` }}>
                    <img src={`/images/${s.icon}`} alt={s.title} />
                  </div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                  <Link to={`/services#${s.id}`} className="service-arrow" style={{ color: s.color, textDecoration: 'none' }}>Learn more →</Link>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* Flip Cards */}
      <section className="section" style={{ background: 'var(--dark2)' }}>
        <div className="container">
          <div className="section-heading reveal">
            <div className="tag">VAS Solution Families</div>
            <h2>Reach Every Subscriber, <span className="gradient-text">On Any Phone</span></h2>
            <p>USSD, messaging, voice, ringback tones and mobile advertising working together on one carrier-grade platform.</p>
          </div>
          <FlipCards />
        </div>
      </section>

      {/* Why Us */}
      <section className="section why-us">
        <div className="container">
          <div className="grid-2">
            <div className="reveal-left">
              <div className="tag">Why Choose Us</div>
              <h2 style={{ fontSize: 'clamp(1.8rem,3vw,2.8rem)', fontWeight: 800, color: 'var(--white)', marginBottom: 16 }}>
                One Partner, <span className="gradient-text">Every Channel</span>
              </h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: 40, lineHeight: 1.85, fontSize: 16 }}>
                From operators and third-party VAS providers to enterprises and financial institutions, we deliver telecom solutions, carrier billing with content and digital marketing, and cross-border payments that move value securely, with speed, clarity and fewer intermediaries.
              </p>
              <Link to="/about" className="btn-primary"><span>Learn More About Us</span> <span>→</span></Link>
            </div>
            <div className="why-grid reveal-right">
              {whyUs.map((w, i) => (
                <div key={i} className="why-item">
                  <div className="why-icon">{w.icon}</div>
                  <div>
                    <h4>{w.title}</h4>
                    <p>{w.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <JourneySection />

      {/* Forex highlight */}
      <section className="section">
        <div className="container">
          <div className="section-heading reveal">
            <div className="tag">Forex & Cross-Border Payments</div>
            <h2>Liquidity <span className="gradient-text">Across the World</span></h2>
            <p>{forex.layers[1].solution}</p>
          </div>
          <div className="grid-3">
            {forex.stats.map((s, i) => (
              <div key={s.label} className="glass-card reveal" style={{ padding: 32, textAlign: 'center', transitionDelay: `${i * 0.1}s` }}>
                <div style={{ fontSize: 40, fontWeight: 900, background: 'var(--gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontFamily: 'Space Grotesk', marginBottom: 6 }}>{s.value}</div>
                <h3 style={{ color: 'var(--white)', fontSize: 16, fontWeight: 700, marginBottom: 10 }}>{s.label}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="reveal" style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginTop: 40 }}>
            {forex.corridors.map(c => (
              <span key={c} style={{ padding: '7px 16px', borderRadius: 50, background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.25)', fontSize: 13, fontWeight: 600, color: '#67e8f9' }}>{c}</span>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <Link to="/services#forex" className="btn-outline">Explore Cross-Border Payments →</Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-sm">
        <div className="container">
          <div className="cta-section reveal">
            <h2>Ready to <span className="gradient-text-neon">Grow</span> Your Business?</h2>
            <p>Let’s talk about launching VAS, DCB, content, digital campaigns and cross-border payments that grow with your business.</p>
            <div className="cta-btns">
              <Link to="/contact" className="btn-primary"><span>Contact Us Now</span> <span>→</span></Link>
              <Link to="/services" className="btn-outline">View Services</Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes morph { 0%,100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; } 50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; } }
        @keyframes neon-pulse { 0%,100% { text-shadow: 0 0 10px rgba(0,255,240,0.8), 0 0 30px rgba(0,255,240,0.4); } 50% { text-shadow: 0 0 20px rgba(0,255,240,1), 0 0 60px rgba(0,255,240,0.6); } }
        @keyframes gradient-x { 0%,100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        @keyframes count-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
      `}</style>
    </>
  )
}
