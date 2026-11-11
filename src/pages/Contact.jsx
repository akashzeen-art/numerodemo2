import { useState, useRef, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import useScrollReveal from '../hooks/useScrollReveal'
import { serviceOptions } from '../data/content'
import '../styles/global.css'
import '../styles/footer.css'

const nextSteps = [
  { icon: '📋', step: 'Step 1', title: 'Requirements Review', desc: 'Your requirements — markets, operators, currencies or campaigns — are reviewed by our team for an initial assessment.' },
  { icon: '🔍', step: 'Step 2', title: 'Solution Mapping', desc: 'We map the right VAS products, carrier billing and content model, or corridor and currency model to your goals.' },
  { icon: '💰', step: 'Step 3', title: 'Proposal & Commercials', desc: 'You receive a proposal with clear, adaptable commercial terms shaped around your needs.' },
]

const contactCards = [
  { icon: '📞', label: 'Call Us', value: '+91 70113 70445', href: 'tel:+917011370445' },
  { icon: '💬', label: 'WhatsApp', value: '+91 70113 70445', href: 'https://wa.me/917011370445' },
  { icon: '✉️', label: 'Email', value: 'info@numeroinfo.asia', href: 'mailto:info@numeroinfo.asia' },
]

const inputStyle = {
  width: '100%', padding: '12px 16px',
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 12, color: 'var(--white)',
  fontSize: 14, outline: 'none',
  transition: 'border-color 0.3s',
  fontFamily: 'Inter, sans-serif',
}

export default function Contact() {
  useScrollReveal()
  const formRef = useRef(null)
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', service: '', message: '' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()
    setSending(true)
    setTimeout(() => { setSending(false); setSent(true); setForm({ name:'', email:'', phone:'', company:'', service:'', message:'' }) }, 1200)
  }

  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <>
      <Navbar />

      {/* ── Hero ── */}
      <section style={{ position:'relative', overflow:'hidden', paddingTop:160, paddingBottom:96, color:'#fff' }}>
        <div style={{ position:'absolute', inset:0, zIndex:0 }}>
          <div style={{ position:'absolute', inset:0, willChange:'transform', transform:'scale(1.1)' }}>
            <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=75" alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
          </div>
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg,rgba(6,4,18,0.96) 0%,rgba(124,58,237,0.88) 50%,rgba(6,4,18,0.96) 100%)' }} />
          <div style={{ position:'absolute', top:'-6rem', right:'-8%', width:'28rem', height:'28rem', borderRadius:'50%', background:'rgba(6,182,212,0.2)', filter:'blur(80px)', animation:'blobC 9s ease-in-out infinite' }} />
          <div style={{ position:'absolute', bottom:'-25%', left:'-10%', width:'24rem', height:'24rem', borderRadius:'50%', background:'rgba(245,158,11,0.1)', filter:'blur(80px)', animation:'blobC 9s ease-in-out infinite', animationDelay:'5s' }} />
        </div>

        <div className="container" style={{ position:'relative', zIndex:1 }}>
          <p style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'6px 16px', borderRadius:50, background:'rgba(255,255,255,0.08)', backdropFilter:'blur(12px)', border:'1px solid rgba(255,255,255,0.15)', fontSize:11, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--neon)', marginBottom:24, animation:'fadeUp 0.6s 0.2s both' }}>
            <span style={{ width:6, height:6, borderRadius:'50%', background:'var(--neon)', animation:'pdotC 2s infinite' }} />
            Contact Numero Info
          </p>

          <h1 style={{ fontSize:'clamp(2.4rem,5vw,4rem)', fontWeight:900, lineHeight:1.1, maxWidth:800, marginBottom:24, letterSpacing:'-0.02em', animation:'fadeUp 0.7s 0.35s both' }}>
            {['Tell us about', 'your'].map((w,i) => (
              <span key={i} style={{ display:'inline-block', overflow:'hidden', paddingBottom:4, marginRight:12, verticalAlign:'bottom' }}>
                <span style={{ display:'inline-block' }}>{w}</span>
              </span>
            ))}
            <span style={{ display:'inline-block', overflow:'hidden', paddingBottom:4, verticalAlign:'bottom' }}>
              <span style={{ display:'inline-block', background:'linear-gradient(135deg,#a78bfa,#00fff0)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>VAS, billing or payments needs.</span>
            </span>
            <br />
            <span style={{ display:'inline-block', overflow:'hidden', paddingBottom:4, verticalAlign:'bottom' }}>
              <span style={{ display:'inline-block' }}>Our team will guide you.</span>
            </span>
          </h1>

          <p style={{ fontSize:18, color:'rgba(255,255,255,0.75)', lineHeight:1.85, maxWidth:640, marginBottom:40, animation:'fadeUp 0.7s 0.5s both' }}>
            Let’s talk about launching VAS, DCB, content and digital campaigns, or cross-border payments that grow with your business. Share your details and our team will guide you through the next steps.
          </p>

          <div style={{ display:'flex', gap:12, flexWrap:'wrap', animation:'fadeUp 0.7s 0.65s both' }}>
            <button onClick={scrollToForm} style={{ display:'inline-flex', alignItems:'center', gap:8, background:'var(--gradient)', color:'#fff', padding:'15px 32px', borderRadius:50, fontWeight:700, fontSize:15, border:'none', cursor:'pointer', boxShadow:'0 8px 32px rgba(124,58,237,0.55)', transition:'all 0.3s' }}
              onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-3px)';e.currentTarget.style.boxShadow='0 16px 48px rgba(124,58,237,0.75)'}}
              onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='0 8px 32px rgba(124,58,237,0.55)'}}>
              Start your enquiry ↓
            </button>
            <a href="https://wa.me/917011370445" target="_blank" rel="noopener noreferrer" style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(255,255,255,0.08)', backdropFilter:'blur(12px)', color:'#fff', padding:'15px 32px', borderRadius:50, fontWeight:700, fontSize:15, textDecoration:'none', border:'1px solid rgba(255,255,255,0.15)', transition:'all 0.3s' }}
              onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,0.15)'}
              onMouseLeave={e=>e.currentTarget.style.background='rgba(255,255,255,0.08)'}>
              💬 Chat on WhatsApp
            </a>
          </div>
        </div>

        <style>{`
          @keyframes blobC{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(20px,-20px) scale(1.04)}66%{transform:translate(-10px,10px) scale(0.97)}}
          @keyframes pdotC{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.6;transform:scale(1.5)}}
        `}</style>
      </section>

      {/* ── Enquiry Form + Sidebar ── */}
      <section style={{ padding:'80px 0', background:'var(--dark)' }} ref={formRef} id="enquiry">
        <div className="container contact-enquiry-grid" style={{ display:'grid', gridTemplateColumns:'1fr 22rem', gap:40, alignItems:'start' }}>

          {/* Left — form */}
          <div>
            <p style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'5px 14px', borderRadius:50, background:'rgba(124,58,237,0.15)', border:'1px solid rgba(124,58,237,0.3)', fontSize:11, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--primary-light)', marginBottom:16 }}>
              <span style={{ width:5, height:5, borderRadius:'50%', background:'var(--primary-light)', animation:'pdotC 2s infinite' }} />
              Free Enquiry
            </p>
            <h2 style={{ fontSize:'clamp(1.8rem,3vw,2.6rem)', fontWeight:800, color:'var(--white)', marginBottom:12, fontFamily:'Space Grotesk' }}>Start your enquiry</h2>
            <p style={{ fontSize:16, color:'var(--text-muted)', marginBottom:36, lineHeight:1.8 }}>Fill in the form below. It only takes a few minutes, and our team will reply with the next steps.</p>

            {/* Form card */}
            <div style={{ position:'relative', borderRadius:28, overflow:'hidden', background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.08)', boxShadow:'0 20px 60px rgba(0,0,0,0.3)' }}>
              {/* Top gradient bar */}
              <span style={{ position:'absolute', top:0, left:0, right:0, height:3, background:'var(--gradient)' }} />

              <div style={{ padding:36 }}>
                {sent ? (
                  <div style={{ textAlign:'center', padding:'48px 24px' }}>
                    <div style={{ fontSize:64, marginBottom:20 }}>✅</div>
                    <h3 style={{ fontSize:24, fontWeight:800, color:'var(--white)', marginBottom:12, fontFamily:'Space Grotesk' }}>Enquiry Sent!</h3>
                    <p style={{ color:'var(--text-muted)', lineHeight:1.8, maxWidth:400, margin:'0 auto 24px' }}>Thank you for reaching out. Our team will review your requirements and get back to you within 24 hours.</p>
                    <button onClick={()=>setSent(false)} style={{ padding:'10px 24px', borderRadius:50, background:'var(--gradient)', color:'#fff', border:'none', cursor:'pointer', fontWeight:700, fontSize:14 }}>Send Another</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:20 }}>
                    <div className="contact-form-fields" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
                      {[
                        { key:'name', label:'Full Name *', type:'text', placeholder:'John Doe', required:true },
                        { key:'email', label:'Email Address *', type:'email', placeholder:'john@company.com', required:true },
                        { key:'phone', label:'Phone Number', type:'tel', placeholder:'+91 98765 43210', required:false },
                        { key:'company', label:'Company Name', type:'text', placeholder:'Your Company Ltd.', required:false },
                      ].map(f => (
                        <div key={f.key}>
                          <label style={{ display:'block', fontSize:12, fontWeight:600, color:'var(--text-muted)', marginBottom:8, letterSpacing:'0.05em' }}>{f.label}</label>
                          <input type={f.type} placeholder={f.placeholder} required={f.required} value={form[f.key]} onChange={set(f.key)}
                            style={inputStyle}
                            onFocus={e=>e.target.style.borderColor='var(--primary)'}
                            onBlur={e=>e.target.style.borderColor='rgba(255,255,255,0.1)'} />
                        </div>
                      ))}
                    </div>

                    <div>
                      <label style={{ display:'block', fontSize:12, fontWeight:600, color:'var(--text-muted)', marginBottom:8, letterSpacing:'0.05em' }}>Service Required</label>
                      <select value={form.service} onChange={set('service')} style={{ ...inputStyle, cursor:'pointer' }}
                        onFocus={e=>e.target.style.borderColor='var(--primary)'}
                        onBlur={e=>e.target.style.borderColor='rgba(255,255,255,0.1)'}>
                        <option value="" style={{ background:'#0d0820' }}>Select a service...</option>
                        {serviceOptions.map(s => (
                          <option key={s} value={s} style={{ background:'#0d0820' }}>{s}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label style={{ display:'block', fontSize:12, fontWeight:600, color:'var(--text-muted)', marginBottom:8, letterSpacing:'0.05em' }}>Requirement Details *</label>
                      <textarea rows={5} placeholder="Tell us about your markets, operators, currencies or campaign goals and timeline..." required value={form.message} onChange={set('message')}
                        style={{ ...inputStyle, resize:'vertical', minHeight:120 }}
                        onFocus={e=>e.target.style.borderColor='var(--primary)'}
                        onBlur={e=>e.target.style.borderColor='rgba(255,255,255,0.1)'} />
                    </div>

                    <p style={{ fontSize:12, color:'var(--text-muted)', lineHeight:1.7 }}>
                      ℹ️ If we need additional information, our team will guide you before proceeding further.
                    </p>

                    <button type="submit" disabled={sending} style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8, background:'var(--gradient)', color:'#fff', padding:'15px 32px', borderRadius:50, fontWeight:700, fontSize:15, border:'none', cursor: sending ? 'not-allowed' : 'pointer', boxShadow:'0 8px 28px rgba(124,58,237,0.5)', transition:'all 0.3s', opacity: sending ? 0.7 : 1 }}>
                      {sending ? '⏳ Sending...' : 'Submit Enquiry →'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Right — sticky sidebar */}
          <aside style={{ position:'sticky', top:112 }}>
            <div style={{ borderRadius:28, padding:28, background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.08)', boxShadow:'0 20px 40px rgba(0,0,0,0.2)' }}>
              <p style={{ fontSize:11, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--primary-light)', marginBottom:8 }}>What happens next</p>
              <h2 style={{ fontSize:20, fontWeight:800, color:'var(--white)', marginBottom:28, fontFamily:'Space Grotesk' }}>After you submit</h2>

              {/* Steps with connecting line */}
              <div style={{ position:'relative' }}>
                <span style={{ position:'absolute', top:20, bottom:20, left:20, width:2, borderRadius:2, background:'linear-gradient(to bottom,var(--primary),var(--accent2),rgba(6,182,212,0.2))' }} />
                <ol style={{ listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:28 }}>
                  {nextSteps.map((s,i) => (
                    <li key={i} style={{ display:'flex', gap:16 }}>
                      <span style={{ position:'relative', width:40, height:40, borderRadius:'50%', background:'var(--gradient)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, flexShrink:0, boxShadow:'0 0 16px rgba(124,58,237,0.5)', border:'3px solid var(--dark)' }}>{s.icon}</span>
                      <div style={{ paddingTop:2 }}>
                        <p style={{ fontSize:10, fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--text-muted)', marginBottom:4 }}>{s.step}</p>
                        <h3 style={{ fontSize:15, fontWeight:700, color:'var(--white)', marginBottom:6, fontFamily:'Space Grotesk' }}>{s.title}</h3>
                        <p style={{ fontSize:13, color:'var(--text-muted)', lineHeight:1.7 }}>{s.desc}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div style={{ marginTop:24, padding:16, borderRadius:14, background:'rgba(124,58,237,0.08)', border:'1px solid rgba(124,58,237,0.2)' }}>
                <p style={{ fontSize:13, color:'var(--text-muted)', lineHeight:1.7, display:'flex', gap:8 }}>
                  <span style={{ flexShrink:0 }}>ℹ️</span>
                  If we need additional information, our team will guide you before proceeding further.
                </p>
              </div>

              <a href="/services" style={{ display:'inline-flex', alignItems:'center', gap:6, marginTop:20, fontSize:13, fontWeight:700, color:'var(--primary-light)', textDecoration:'none', transition:'gap 0.3s' }}
                onMouseEnter={e=>e.currentTarget.style.gap='10px'}
                onMouseLeave={e=>e.currentTarget.style.gap='6px'}>
                View all our services →
              </a>
            </div>
          </aside>
        </div>
      </section>

      {/* ── Contact Details ── */}
      <section style={{ padding:'80px 0', background:'var(--dark2)' }}>
        <div className="container">
          <div style={{ textAlign:'center', marginBottom:56 }}>
            <p style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'5px 14px', borderRadius:50, background:'rgba(124,58,237,0.15)', border:'1px solid rgba(124,58,237,0.3)', fontSize:11, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--primary-light)', marginBottom:16 }}>
              <span style={{ width:5, height:5, borderRadius:'50%', background:'var(--primary-light)', animation:'pdotC 2s infinite' }} />
              Talk to us
            </p>
            <h2 className="reveal" style={{ fontSize:'clamp(1.8rem,3vw,2.8rem)', fontWeight:800, color:'var(--white)', marginBottom:12, fontFamily:'Space Grotesk' }}>Prefer to talk directly?</h2>
            <p className="reveal" style={{ fontSize:16, color:'var(--text-muted)', maxWidth:560, margin:'0 auto' }}>Call, message or email us — or visit our office in Gurgaon.</p>
          </div>

          {/* Contact cards */}
          <div className="contact-cards-grid" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20, marginBottom:20 }}>
            {contactCards.map((c,i) => (
              <a key={i} href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                className="reveal" style={{ transitionDelay:`${i*0.1}s`, display:'flex', flexDirection:'column', gap:16, padding:28, borderRadius:24, background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)', textDecoration:'none', transition:'all 0.3s' }}
                onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-4px)';e.currentTarget.style.boxShadow='0 20px 40px rgba(0,0,0,0.3)';e.currentTarget.style.borderColor='rgba(124,58,237,0.4)'}}
                onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='none';e.currentTarget.style.borderColor='rgba(255,255,255,0.07)'}}>
                <span style={{ width:56, height:56, borderRadius:16, background:'var(--gradient)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:24, boxShadow:'0 8px 20px rgba(124,58,237,0.4)', transition:'transform 0.4s' }}>{c.icon}</span>
                <div>
                  <h3 style={{ fontSize:11, fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--text-muted)', marginBottom:6 }}>{c.label}</h3>
                  <p style={{ fontSize:17, fontWeight:700, color:'var(--white)', fontFamily:'Space Grotesk', wordBreak:'break-all' }}>{c.value}</p>
                </div>
              </a>
            ))}
          </div>

          {/* Address + Hours + Map */}
          <div className="contact-office-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20, marginBottom:20 }}>
            <div className="reveal" style={{ display:'flex', flexDirection:'column', gap:16, padding:28, borderRadius:24, background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)' }}>
              <span style={{ width:56, height:56, borderRadius:16, background:'var(--gradient)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:24, boxShadow:'0 8px 20px rgba(124,58,237,0.4)' }}>📍</span>
              <div>
                <h3 style={{ fontSize:11, fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--text-muted)', marginBottom:6 }}>Office</h3>
                <p style={{ fontSize:17, fontWeight:700, color:'var(--white)', fontFamily:'Space Grotesk', lineHeight:1.5 }}>B 123 First Floor, Sector 54<br />Gurgaon, Haryana 122003</p>
              </div>
            </div>

            <div className="reveal" style={{ padding:28, borderRadius:24, background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)' }}>
              <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:20 }}>
                <span style={{ width:44, height:44, borderRadius:12, background:'rgba(124,58,237,0.2)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:20 }}>🕐</span>
                <h3 style={{ fontSize:17, fontWeight:700, color:'var(--white)', fontFamily:'Space Grotesk' }}>Working Hours</h3>
              </div>
              <dl style={{ display:'flex', flexDirection:'column', gap:12 }}>
                {[
                  { dt:'Monday to Saturday', dd:'09:00 – 18:00 IST' },
                  { dt:'Sunday', dd:'WhatsApp support only' },
                ].map((row,i) => (
                  <div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', paddingBottom:12, borderBottom: i===0 ? '1px solid rgba(255,255,255,0.07)' : 'none' }}>
                    <dt style={{ fontSize:14, fontWeight:500, color:'rgba(255,255,255,0.8)' }}>{row.dt}</dt>
                    <dd style={{ fontSize:14, color:'var(--text-muted)' }}>{row.dd}</dd>
                  </div>
                ))}
              </dl>
              <p style={{ marginTop:16, fontSize:12, color:'var(--text-muted)' }}>Times shown in India Standard Time (IST).</p>
            </div>
          </div>

          {/* Map placeholder */}
          <div className="reveal" style={{ borderRadius:24, overflow:'hidden', border:'1px solid rgba(124,58,237,0.2)', background:'linear-gradient(135deg,rgba(124,58,237,0.08),rgba(6,182,212,0.05))', minHeight:280, display:'grid', placeItems:'center', position:'relative', backgroundImage:'linear-gradient(rgba(124,58,237,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(124,58,237,0.06) 1px,transparent 1px)', backgroundSize:'32px 32px' }}>
            <svg aria-hidden="true" viewBox="0 0 400 200" preserveAspectRatio="none" style={{ position:'absolute', inset:0, width:'100%', height:'100%' }}>
              <path d="M-10 150 C 80 120, 120 60, 210 90 S 340 40, 410 70" fill="none" strokeWidth="10" stroke="rgba(255,255,255,0.04)" />
              <path d="M120 -10 C 140 60, 170 120, 150 210" fill="none" strokeWidth="8" stroke="rgba(255,255,255,0.04)" />
            </svg>
            <div style={{ position:'relative', textAlign:'center', padding:40 }}>
              <span style={{ position:'relative', display:'inline-flex', marginBottom:16 }}>
                <span style={{ position:'absolute', inset:0, borderRadius:'50%', background:'rgba(124,58,237,0.3)', animation:'ping 2s infinite' }} />
                <span style={{ position:'relative', width:56, height:56, borderRadius:'50%', background:'var(--gradient)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:24, boxShadow:'0 0 24px rgba(124,58,237,0.6)' }}>📍</span>
              </span>
              <p style={{ fontFamily:'Space Grotesk', fontSize:18, fontWeight:700, color:'var(--white)', marginBottom:8 }}>Gurgaon, Haryana</p>
              <p style={{ fontSize:14, color:'var(--text-muted)', marginBottom:20 }}>B 123 First Floor, Sector 54, Gurgaon, Haryana 122003</p>
              <a href="https://www.google.com/maps/search/?api=1&query=Sector+54+Gurgaon+Haryana" target="_blank" rel="noopener noreferrer"
                style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'10px 20px', borderRadius:50, background:'var(--gradient)', color:'#fff', textDecoration:'none', fontSize:13, fontWeight:700, boxShadow:'0 4px 16px rgba(124,58,237,0.4)' }}>
                Open in Google Maps ↗
              </a>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes ping{0%{transform:scale(1);opacity:0.6}100%{transform:scale(2.2);opacity:0}}
          @media(max-width:900px){
            .contact-enquiry-grid{grid-template-columns:1fr!important}
            .contact-enquiry-grid aside{position:static!important}
            .contact-cards-grid,.contact-office-grid{grid-template-columns:1fr!important}
          }
          @media(max-width:640px){
            .contact-form-fields{grid-template-columns:1fr!important}
          }
        `}</style>
      </section>

      <Footer />
    </>
  )
}
