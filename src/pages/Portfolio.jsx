import { useState, useEffect, useRef } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import useScrollReveal from '../hooks/useScrollReveal'
import { vasProducts, dcb, forex, marqueeItems } from '../data/content'
import '../styles/global.css'
import '../styles/footer.css'

const products = vasProducts.map((p, i) => ({ ...p, num: String(i + 1).padStart(2, '0') }))
const productTotal = String(products.length).padStart(2, '0')

const platformFeatures = [
  'Carrier-grade scalability and reliability',
  'Built-in load balancing and automated failover',
  'Multilingual support for UCS2 and GSM 7-bit',
  'HTTP, SMPP, SS7 MAP and SIP interfaces',
  'JMX, CLI, CDR logging and reporting',
]

const domains = forex.layers.map(l => ({
  icon: l.emoji,
  title: l.label,
  sub: l.title,
  desc: l.solution || l.points.slice(0, 2).join('. ') + '.',
}))

const faqs = [
  { q:'What is Direct Carrier Billing?', a:dcb.intro },
  { q:'Do subscribers need internet or an app to use USSD services?', a:'No. USSD delivers real-time, interactive menus that work on any device with no app and no internet — a subscriber dials a short code, browses offers and activates one in seconds, billed straight to the operator account.' },
  { q:'What content can be sold through carrier billing?', a:`Our content library covers ${dcb.content.map(c => c.title).join(', ')}. Our content team works continuously to refresh and update our repositories with the latest and most interesting content.` },
  { q:'Which currencies and markets do you cover for cross-border payments?', a:'We provide currency liquidity across 50+ currencies, including most African markets and selected corridors worldwide, for both inward and outward payments. Additional corridors — exotic and illiquid markets included — are available on request.' },
  { q:'How fast are cross-border payments settled?', a:'We operate a 24-48 hour operating model, purpose-built for restricted, exotic and high-friction corridors where conventional banking falls short.' },
  { q:'How is my money protected?', a:'Every transaction is structured with full deal insurance, finances are backed up as per deposits through a licensed escrow account, and every approval, update and settlement event is logged for review.' },
]

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  const bgRef = useRef(null)
  useEffect(() => {
    const fn = () => { if (bgRef.current) bgRef.current.style.transform = `scale(1.12) translateY(${window.scrollY * 0.2}px)` }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <section style={{ position:'relative', overflow:'hidden', paddingTop:160, paddingBottom:96, color:'#fff', minHeight:'85vh', display:'flex', flexDirection:'column', justifyContent:'center' }}>
      <div style={{ position:'absolute', inset:0, zIndex:0 }}>
        <div ref={bgRef} style={{ position:'absolute', inset:0, willChange:'transform', transform:'scale(1.12)' }}>
          <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=75" alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
        </div>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg,rgba(6,4,18,0.97) 0%,rgba(13,8,32,0.9) 55%,rgba(6,4,18,0.97) 100%)' }} />
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(55% 50% at 75% 35%,rgba(124,58,237,0.2),transparent)' }} />
        <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)', backgroundSize:'64px 64px' }} />
        <div style={{ position:'absolute', top:'-6rem', right:'-8%', width:'28rem', height:'28rem', borderRadius:'50%', background:'rgba(124,58,237,0.18)', filter:'blur(90px)', animation:'blobP 9s ease-in-out infinite' }} />
        <div style={{ position:'absolute', bottom:'-20%', left:'-8%', width:'22rem', height:'22rem', borderRadius:'50%', background:'rgba(6,182,212,0.1)', filter:'blur(80px)', animation:'blobP 9s ease-in-out infinite', animationDelay:'4s' }} />
        {/* ECG line */}
        <svg viewBox="0 0 1400 80" preserveAspectRatio="none" style={{ position:'absolute', bottom:80, left:0, right:0, width:'100%', height:56, opacity:0.4 }} aria-hidden="true">
          <path d="M0 40 h60 l8-12 l8 12 h14 l6 10 l10-52 l10 68 l8-26 h20 l14-14 l14 14 h50 h60 l8-12 l8 12 h14 l6 10 l10-52 l10 68 l8-26 h20 l14-14 l14 14 h50 h60 l8-12 l8 12 h14 l6 10 l10-52 l10 68 l8-26 h20 l14-14 l14 14 h50 h60 l8-12 l8 12 h14 l6 10 l10-52 l10 68 l8-26 h20 l14-14 l14 14 h50" fill="none" stroke="rgba(124,58,237,0.3)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
          <path d="M0 40 h60 l8-12 l8 12 h14 l6 10 l10-52 l10 68 l8-26 h20 l14-14 l14 14 h50 h60 l8-12 l8 12 h14 l6 10 l10-52 l10 68 l8-26 h20 l14-14 l14 14 h50 h60 l8-12 l8 12 h14 l6 10 l10-52 l10 68 l8-26 h20 l14-14 l14 14 h50 h60 l8-12 l8 12 h14 l6 10 l10-52 l10 68 l8-26 h20 l14-14 l14 14 h50" pathLength="1" fill="none" stroke="#a78bfa" strokeWidth="2.5" strokeLinecap="round" style={{ strokeDasharray:'0.06 0.94', filter:'drop-shadow(rgba(124,58,237,0.9) 0 0 6px)', animation:'ecgP 3s linear infinite' }} />
        </svg>
        <div style={{ position:'absolute', bottom:0, left:0, right:0, height:100, background:'linear-gradient(to top,var(--dark),transparent)' }} />
      </div>

      <div className="container" style={{ position:'relative', zIndex:1, width:'100%' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1.2fr 1fr', gap:72, alignItems:'center' }}>
          {/* Left */}
          <div>
            <p style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'5px 14px', borderRadius:50, background:'rgba(124,58,237,0.15)', border:'1px solid rgba(124,58,237,0.3)', fontSize:11, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--primary-light)', marginBottom:24 }}>
              <span style={{ width:6, height:6, borderRadius:'50%', background:'var(--primary-light)', animation:'pdot 2s infinite' }} />
              Products & Solutions
            </p>
            <h1 style={{ fontSize:'clamp(2.4rem,4.5vw,3.8rem)', fontWeight:900, lineHeight:1.1, marginBottom:24, letterSpacing:'-0.02em' }}>
              {['One','Partner,'].map((w,i) => (
                <span key={i} style={{ display:'inline-block', overflow:'hidden', paddingBottom:4, marginRight:12, verticalAlign:'bottom' }}>
                  <span style={{ display:'inline-block', animation:`fadeUp 0.7s ${0.2+i*0.12}s both` }}>{w}</span>
                </span>
              ))}
              <br />
              {['Every','Channel'].map((w,i) => (
                <span key={i} style={{ display:'inline-block', overflow:'hidden', paddingBottom:4, marginRight:12, verticalAlign:'bottom' }}>
                  <span style={{ display:'inline-block', background:'linear-gradient(135deg,#a78bfa,#00fff0)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', animation:`fadeUp 0.7s ${0.44+i*0.12}s both` }}>{w}</span>
                </span>
              ))}
            </h1>
            <p style={{ fontSize:17, color:'rgba(255,255,255,0.65)', lineHeight:1.85, maxWidth:480, marginBottom:36, animation:'fadeUp 0.7s 0.8s both' }}>
              USSD, messaging, voice, ringback tones and mobile advertising on one carrier-grade platform — plus carrier billing, global content and cross-border payments.
            </p>
            <div style={{ display:'flex', gap:12, flexWrap:'wrap', marginBottom:40, animation:'fadeUp 0.7s 0.95s both' }}>
              <a href="#included" style={{ display:'inline-flex', alignItems:'center', gap:8, background:'var(--gradient)', color:'#fff', padding:'13px 28px', borderRadius:50, fontWeight:700, fontSize:14, textDecoration:'none', boxShadow:'0 8px 28px rgba(124,58,237,0.5)', transition:'all 0.3s' }}
                onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-3px)';e.currentTarget.style.boxShadow='0 16px 40px rgba(124,58,237,0.7)'}}
                onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='0 8px 28px rgba(124,58,237,0.5)'}}>
                Explore Products ↓
              </a>
              <a href="/contact" style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(255,255,255,0.07)', color:'#fff', padding:'13px 28px', borderRadius:50, fontWeight:700, fontSize:14, textDecoration:'none', border:'1px solid rgba(255,255,255,0.12)', transition:'all 0.3s' }}
                onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,0.12)'}
                onMouseLeave={e=>e.currentTarget.style.background='rgba(255,255,255,0.07)'}>
                Talk to Us →
              </a>
            </div>
            <ul style={{ display:'flex', flexWrap:'wrap', gap:10, listStyle:'none', padding:0, animation:'fadeUp 0.7s 1.1s both' }}>
              {[`${products.length} VAS Products`,`${dcb.content.length} Content Categories`,'50+ Currencies','24–48 H Turnaround'].map(c=>(
                <li key={c} style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'6px 14px', borderRadius:50, background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', fontSize:12, fontWeight:600 }}>
                  <span style={{ width:5, height:5, borderRadius:'50%', background:'var(--neon)' }} />{c}
                </li>
              ))}
            </ul>
          </div>

          {/* Right — glass card */}
          <div style={{ position:'relative' }}>
            <div style={{ position:'absolute', inset:0, transform:'translate(18px,18px) rotate(3deg)', borderRadius:28, background:'linear-gradient(135deg,rgba(124,58,237,0.25),rgba(6,182,212,0.12))', zIndex:0 }} />
            <div style={{ position:'relative', zIndex:1, background:'rgba(255,255,255,0.05)', backdropFilter:'blur(24px)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:28, padding:28, boxShadow:'0 32px 64px rgba(0,0,0,0.4)' }}>
              <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:20 }}>
                <span style={{ width:44, height:44, borderRadius:12, background:'var(--gradient)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, boxShadow:'0 0 20px rgba(124,58,237,0.5)' }}>📡</span>
                <div>
                  <p style={{ fontFamily:'Space Grotesk', fontSize:16, fontWeight:800, color:'#fff', margin:0 }}>Carrier-Grade Platform</p>
                  <span style={{ fontSize:11, color:'var(--neon)', fontWeight:600 }}>Built into every product</span>
                </div>
                <span style={{ marginLeft:'auto', padding:'4px 12px', borderRadius:50, background:'rgba(0,255,240,0.1)', border:'1px solid rgba(0,255,240,0.2)', fontSize:11, fontWeight:700, color:'var(--neon)' }}>Standard</span>
              </div>
              <ul style={{ listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:10 }}>
                {platformFeatures.map((item,i)=>(
                  <li key={i} style={{ display:'flex', alignItems:'center', gap:12, background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:12, padding:'10px 14px' }}>
                    <span style={{ width:22, height:22, borderRadius:'50%', background:'var(--gradient)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, fontSize:11, color:'#fff', fontWeight:700 }}>✓</span>
                    <span style={{ fontSize:13, fontWeight:500, color:'rgba(255,255,255,0.85)' }}>{item}</span>
                  </li>
                ))}
              </ul>
              <p style={{ marginTop:16, display:'flex', justifyContent:'space-between', fontSize:12, color:'rgba(255,255,255,0.4)' }}>
                <span>Works with MNOs and MVNOs</span><span>{products.length} VAS products</span>
              </p>
            </div>
            {[
              { label:'Telecom VAS', icon:'📡', top:'-5%', right:'-5%', delay:'0s', color:'#7c3aed' },
              { label:'Carrier Billing', icon:'📱', bottom:'-6%', right:'8%', delay:'2.2s', color:'#f59e0b' },
            ].map((b,i)=>(
              <div key={i} style={{ position:'absolute', top:b.top, right:b.right, left:b.left, bottom:b.bottom, animation:'float 6s ease-in-out infinite', animationDelay:b.delay, zIndex:2 }}>
                <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(0,0,0,0.7)', backdropFilter:'blur(16px)', border:'1px solid rgba(255,255,255,0.12)', padding:'8px 14px 8px 8px', borderRadius:14, whiteSpace:'nowrap' }}>
                  <span style={{ width:28, height:28, borderRadius:8, background:b.color, display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, boxShadow:`${b.color} 0 0 12px` }}>{b.icon}</span>
                  <span style={{ fontSize:12, fontWeight:700, color:'#fff' }}>{b.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Marquee */}
        <div style={{ marginTop:64 }}>
          <p style={{ fontSize:11, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:'rgba(255,255,255,0.3)', marginBottom:14 }}>Products & capabilities</p>
          <div style={{ overflow:'hidden', WebkitMaskImage:'linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)' }}>
            <div style={{ display:'flex', width:'max-content', animation:'marqueeP 30s linear infinite', gap:12 }}>
              {[...marqueeItems, ...marqueeItems].map((h,i)=>(
                <span key={i} style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'8px 16px', borderRadius:50, background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', whiteSpace:'nowrap', fontSize:13, fontWeight:600 }}>{h}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blobP{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(20px,-20px) scale(1.04)}66%{transform:translate(-10px,10px) scale(0.97)}}
        @keyframes ecgP{from{stroke-dashoffset:1}to{stroke-dashoffset:-1}}
        @keyframes pdot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.6;transform:scale(1.5)}}
        @keyframes marqueeP{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        @media(max-width:900px){.port-hero-grid{grid-template-columns:1fr!important}}
      `}</style>
    </section>
  )
}

// ── Included Services ─────────────────────────────────────────────────────────
function IncludedSection() {
  const [active, setActive] = useState(0)
  const s = products[active]

  return (
    <section id="included" style={{ padding:'100px 0', background:'var(--dark)', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', top:20, left:'-12%', width:'26rem', height:'26rem', borderRadius:'50%', background:'rgba(6,182,212,0.08)', filter:'blur(80px)', animation:'blobP 9s ease-in-out infinite' }} />
      <div className="container">
        <div className="section-heading reveal">
          <div className="tag">VAS Product Explorer</div>
          <h2>Telecom Solutions That <span className="gradient-text">Connect, Engage & Grow</span></h2>
          <p>Offers enablement, core VAS, VAS & digital and mobile advertisement — every product on one carrier-grade platform.</p>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1.05fr', gap:40, alignItems:'center' }}>
          {/* Left — product buttons */}
          <div>
            <p style={{ fontSize:13, color:'var(--text-muted)', marginBottom:16, display:'flex', alignItems:'center', gap:8 }}>
              <span>👆</span> Choose a product to see what it does
            </p>
            <ul style={{ listStyle:'none', padding:0, margin:0, display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
              {products.map((svc, i) => (
                <li key={svc.name}>
                  <button onClick={() => setActive(i)} style={{
                    width:'100%', display:'flex', alignItems:'center', gap:12,
                    padding:'14px 16px', borderRadius:16, border:'1px solid',
                    cursor:'pointer', textAlign:'left', transition:'all 0.3s',
                    background: i === active ? 'var(--gradient)' : 'rgba(255,255,255,0.03)',
                    borderColor: i === active ? 'transparent' : 'rgba(255,255,255,0.07)',
                    boxShadow: i === active ? '0 8px 24px rgba(124,58,237,0.4)' : 'none',
                  }}>
                    <span style={{ width:40, height:40, borderRadius:10, background: i === active ? 'rgba(255,255,255,0.2)' : 'rgba(124,58,237,0.15)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, flexShrink:0 }}>{svc.emoji}</span>
                    <span style={{ minWidth:0, flex:1 }}>
                      <span style={{ display:'block', fontSize:10, fontWeight:700, color: i === active ? 'rgba(255,255,255,0.7)' : 'var(--text-muted)', fontFamily:'Space Grotesk' }}>{svc.num} · {svc.category}</span>
                      <span style={{ display:'block', fontSize:13, fontWeight:600, color: i === active ? '#fff' : 'var(--text)', lineHeight:1.3 }}>{svc.name}</span>
                    </span>
                    {i === active && <span style={{ fontSize:14, color:'rgba(255,255,255,0.8)' }}>✓</span>}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — detail panel */}
          <div style={{ borderRadius:28, overflow:'hidden', background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.08)', boxShadow:'0 20px 60px rgba(0,0,0,0.3)' }}>
            <div style={{ height:200, background:`linear-gradient(135deg, rgba(124,58,237,0.4), rgba(6,182,212,0.3))`, position:'relative', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <span style={{ fontSize:80, filter:'drop-shadow(0 0 30px rgba(124,58,237,0.6))' }}>{s.emoji}</span>
              <div style={{ position:'absolute', top:16, left:16, background:'rgba(0,0,0,0.5)', backdropFilter:'blur(12px)', padding:'6px 14px', borderRadius:50, fontSize:11, fontWeight:700, color:'rgba(255,255,255,0.8)', display:'flex', alignItems:'center', gap:6 }}>
                <span style={{ width:6, height:6, borderRadius:'50%', background:s.accent }} />{s.category}
              </div>
              <div style={{ position:'absolute', top:16, right:16, fontSize:12, fontWeight:700, color:'rgba(255,255,255,0.5)', fontFamily:'Space Grotesk' }}>{s.num} / {productTotal}</div>
            </div>
            <div style={{ padding:'28px 28px 32px' }}>
              <div style={{ position:'relative', marginTop:-36, marginBottom:20 }}>
                <span style={{ width:56, height:56, borderRadius:16, background:'var(--gradient)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:24, boxShadow:'0 8px 24px rgba(124,58,237,0.5)', border:'3px solid var(--dark)' }}>{s.emoji}</span>
              </div>
              <h3 style={{ fontSize:22, fontWeight:800, color:'var(--white)', marginBottom:6, fontFamily:'Space Grotesk' }}>{s.name}</h3>
              <p style={{ fontSize:14, fontWeight:600, color:'var(--primary-light)', marginBottom:12 }}>{s.headline}</p>
              <p style={{ fontSize:15, color:'var(--text-muted)', lineHeight:1.8, marginBottom:20 }}>{s.summary}</p>
              {s.fullName && (
                <span style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'6px 14px', borderRadius:50, background:'rgba(124,58,237,0.15)', border:'1px solid rgba(124,58,237,0.3)', fontSize:12, fontWeight:700, color:'var(--primary-light)' }}>
                  {s.fullName}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Optional Extras ───────────────────────────────────────────────────────────
function ExtrasSection() {
  return (
    <section style={{ padding:'100px 0', background:'linear-gradient(135deg,rgba(13,8,32,1) 0%,rgba(26,16,56,1) 50%,rgba(13,8,32,1) 100%)', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', top:'-6rem', right:'-10%', width:'28rem', height:'28rem', borderRadius:'50%', background:'rgba(6,182,212,0.08)', filter:'blur(80px)', animation:'blobP 9s ease-in-out infinite' }} />
      <div style={{ position:'absolute', bottom:'-20%', left:'-10%', width:'22rem', height:'22rem', borderRadius:'50%', background:'rgba(124,58,237,0.12)', filter:'blur(80px)', animation:'blobP 9s ease-in-out infinite', animationDelay:'6s' }} />
      <div className="container" style={{ position:'relative', zIndex:1 }}>
        <div className="section-heading reveal">
          <div className="tag" style={{ background:'rgba(255,255,255,0.08)', borderColor:'rgba(255,255,255,0.15)', color:'var(--neon)' }}>Content Library</div>
          <h2>Content for a <span className="gradient-text">Global Audience</span></h2>
          <p>We have the channel, as well as the content, across so many categories — sold instantly through Direct Carrier Billing.</p>
        </div>
        <div style={{ display:'flex', justifyContent:'center', marginBottom:40 }}>
          <span style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'8px 18px', borderRadius:50, border:'1px solid rgba(0,255,240,0.3)', background:'rgba(0,255,240,0.08)', fontSize:13, fontWeight:600, color:'var(--neon)' }}>
            🔄 Repositories refreshed regularly with trending, high-quality content
          </span>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20 }}>
          {dcb.content.map(c => ({ icon: c.emoji, title: c.title, desc: c.desc })).map((e,i) => (
            <article key={i} className="reveal" style={{ transitionDelay:`${i*0.08}s`, position:'relative', display:'flex', flexDirection:'column', padding:24, borderRadius:24, border:'1px dashed rgba(255,255,255,0.15)', background:'rgba(255,255,255,0.04)', backdropFilter:'blur(12px)', transition:'all 0.3s', cursor:'default', overflow:'hidden' }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(0,255,240,0.4)';e.currentTarget.style.background='rgba(255,255,255,0.08)';e.currentTarget.style.transform='translateY(-4px)'}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,0.15)';e.currentTarget.style.background='rgba(255,255,255,0.04)';e.currentTarget.style.transform='translateY(0)'}}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:32 }}>
                <span style={{ width:52, height:52, borderRadius:14, background:'linear-gradient(135deg,rgba(0,255,240,0.2),rgba(255,255,255,0.05))', border:'1px solid rgba(255,255,255,0.12)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:24, transition:'transform 0.4s' }}>{e.icon}</span>
                <span style={{ width:28, height:28, borderRadius:'50%', background:'rgba(0,255,240,0.12)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:16, color:'var(--neon)', fontWeight:700 }}>+</span>
              </div>
              <h3 style={{ fontSize:16, fontWeight:700, color:'var(--white)', marginBottom:8 }}>{e.title}</h3>
              <p style={{ fontSize:13, color:'var(--text-muted)', lineHeight:1.7 }}>{e.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Domain Flip Cards ─────────────────────────────────────────────────────────
function DomainsSection() {
  const [flipped, setFlipped] = useState(null)
  return (
    <section style={{ padding:'100px 0', background:'var(--dark2)' }}>
      <div className="container">
        <div className="section-heading reveal">
          <div className="tag">Forex & Cross-Border Payments</div>
          <h2>Four Connected <span className="gradient-text">Platform Layers</span></h2>
          <p>From repatriation coordination to currency liquidity, compliance and the full payment journey — hover each card to explore.</p>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:24 }}>
          {domains.map((d,i) => (
            <div key={i} className="reveal" style={{ transitionDelay:`${i*0.1}s`, height:280, perspective:1000, cursor:'pointer' }}
              onMouseEnter={()=>setFlipped(i)} onMouseLeave={()=>setFlipped(null)}
              onClick={()=>setFlipped(flipped===i?null:i)}>
              <div style={{ position:'relative', width:'100%', height:'100%', transformStyle:'preserve-3d', transition:'transform 0.7s cubic-bezier(0.4,0,0.2,1)', transform: flipped===i ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
                {/* Front */}
                <div style={{ position:'absolute', inset:0, backfaceVisibility:'hidden', WebkitBackfaceVisibility:'hidden', borderRadius:24, background:'linear-gradient(135deg,var(--primary-dark),var(--primary))', padding:24, display:'flex', flexDirection:'column', justifyContent:'space-between', overflow:'hidden' }}>
                  <span style={{ position:'absolute', top:'-2rem', right:'-2rem', width:120, height:120, borderRadius:'50%', border:'18px solid rgba(255,255,255,0.08)' }} />
                  <span style={{ width:52, height:52, borderRadius:14, background:'rgba(255,255,255,0.15)', backdropFilter:'blur(8px)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:24 }}>{d.icon}</span>
                  <div>
                    <h3 style={{ fontSize:20, fontWeight:800, color:'#fff', marginBottom:6, fontFamily:'Space Grotesk' }}>{d.title}</h3>
                    <p style={{ fontSize:12, color:'rgba(255,255,255,0.7)', marginBottom:16 }}>{d.sub}</p>
                    <p style={{ fontSize:11, color:'rgba(255,255,255,0.5)', display:'flex', alignItems:'center', gap:6, fontWeight:600 }}>↻ Hover to see more</p>
                  </div>
                </div>
                {/* Back */}
                <div style={{ position:'absolute', inset:0, backfaceVisibility:'hidden', WebkitBackfaceVisibility:'hidden', transform:'rotateY(180deg)', borderRadius:24, background:'var(--dark3)', border:'1px solid rgba(124,58,237,0.3)', padding:24, display:'flex', flexDirection:'column', justifyContent:'center' }}>
                  <span style={{ width:40, height:40, borderRadius:10, background:'rgba(124,58,237,0.2)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, marginBottom:16 }}>{d.icon}</span>
                  <h4 style={{ fontSize:18, fontWeight:800, color:'var(--white)', marginBottom:12, fontFamily:'Space Grotesk' }}>{d.title}</h4>
                  <p style={{ fontSize:13, color:'var(--text-muted)', lineHeight:1.75 }}>{d.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop:32, textAlign:'center' }}>
          <p style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'12px 20px', borderRadius:16, background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', fontSize:13, color:'var(--text-muted)' }}>
            ✓ {forex.highlights.join(' · ')}
          </p>
        </div>
      </div>
    </section>
  )
}

// ── FAQ ───────────────────────────────────────────────────────────────────────
function FAQSection() {
  const [open, setOpen] = useState(0)
  return (
    <section style={{ padding:'100px 0', background:'var(--dark2)' }}>
      <div className="container">
        <div className="section-heading reveal">
          <div className="tag">FAQs</div>
          <h2>Frequently Asked <span className="gradient-text">Questions</span></h2>
          <p>Answers to common questions about VAS, carrier billing and cross-border payments.</p>
        </div>
        <div style={{ maxWidth:760, margin:'0 auto', display:'flex', flexDirection:'column', gap:12 }}>
          {faqs.map((f,i) => (
            <div key={i} className="reveal" style={{ transitionDelay:`${i*0.07}s`, borderRadius:16, border:'1px solid', transition:'all 0.3s', borderColor: open===i ? 'rgba(124,58,237,0.4)' : 'rgba(255,255,255,0.07)', background: open===i ? 'rgba(124,58,237,0.06)' : 'rgba(255,255,255,0.02)' }}>
              <button onClick={()=>setOpen(open===i?-1:i)} style={{ width:'100%', display:'flex', justifyContent:'space-between', alignItems:'center', gap:16, padding:'20px 24px', background:'none', border:'none', cursor:'pointer', textAlign:'left' }}>
                <span style={{ fontSize:15, fontWeight:700, color:'var(--white)', fontFamily:'Space Grotesk' }}>{f.q}</span>
                <span style={{ width:32, height:32, borderRadius:'50%', background: open===i ? 'var(--primary)' : 'rgba(124,58,237,0.15)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, fontSize:18, color: open===i ? '#fff' : 'var(--primary-light)', transition:'all 0.3s', transform: open===i ? 'rotate(45deg)' : 'rotate(0deg)' }}>+</span>
              </button>
              {open===i && (
                <div style={{ padding:'0 24px 20px' }}>
                  <p style={{ fontSize:14, color:'var(--text-muted)', lineHeight:1.8 }}>{f.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── CTA ───────────────────────────────────────────────────────────────────────
function CTASection() {
  return (
    <section style={{ padding:'80px 0' }}>
      <div className="container">
        <div className="cta-section reveal">
          <h2>Partner with us for an <span className="gradient-text-neon">exceptional journey</span></h2>
          <p>Let’s build exceptional together — talk to us about VAS, carrier billing, content, digital campaigns and cross-border payments.</p>
          <div className="cta-btns">
            <a href="/contact" className="btn-primary"><span>Get Free Consultation</span> <span>→</span></a>
            <a href="/services" className="btn-outline">View Services</a>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Portfolio() {
  useScrollReveal()
  return (
    <>
      <Navbar />
      <Hero />
      <IncludedSection />
      <ExtrasSection />
      <DomainsSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </>
  )
}
