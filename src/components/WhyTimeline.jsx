import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import ParallaxDepth from './ParallaxDepth'
import '../styles/why-timeline.css'

const events = [
  {
    num: '01',
    title: 'Carrier-grade VAS',
    desc: 'USSD, SMS Gateway, CRBT and messaging on one platform.',
    hue: 160,
    side: 'left',
  },
  {
    num: '02',
    title: 'Mobile-first payments',
    desc: 'Checkout built for the phone, paid with just a mobile number.',
    hue: 215,
    side: 'right',
  },
  {
    num: '03',
    title: 'Global content',
    desc: 'Games, VOD, audio books and more, refreshed for a global audience.',
    hue: 28,
    side: 'left',
  },
  {
    num: '04',
    title: 'Measurable outcomes',
    desc: 'Track every transaction and campaign with clear results.',
    hue: 175,
    side: 'right',
  },
  {
    num: '05',
    title: 'Deep liquidity',
    desc: '50+ geos across major, exotic and illiquid markets.',
    hue: 265,
    side: 'left',
  },
  {
    num: '06',
    title: 'Compliance & control',
    desc: 'Secure information, clear accountability and regulation-ready workflows.',
    hue: 145,
    side: 'right',
  },
]

export default function WhyTimeline() {
  const listRef = useRef(null)

  useEffect(() => {
    const root = listRef.current
    if (!root) return undefined
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const cards = Array.from(root.querySelectorAll('.why-timeline-event'))
    if (reduce) {
      cards.forEach((el) => el.classList.add('is-in'))
      return undefined
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2, rootMargin: '0px 0px -6% 0px' }
    )
    cards.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section className="why-timeline" aria-label="Why Numero">
      <ParallaxDepth variant="hero" />
      <div className="why-timeline-orbs" aria-hidden="true">
        <span className="why-orb o1" data-parallax="0.28" data-parallax-x="-0.16" />
        <span className="why-orb o2" data-parallax="0.18" data-parallax-x="0.14" />
        <span className="why-orb o3" data-parallax="0.34" data-parallax-x="0.08" />
      </div>

      <div className="why-timeline-progress" aria-hidden="true" />

      <header className="why-timeline-hero" data-parallax="-0.07">
        <p className="why-timeline-eyebrow">Why Numero</p>
        <h2>
          One partner, <em>every channel</em>
        </h2>
        <p className="why-timeline-lead">
          From operators and third-party VAS providers to enterprises and financial institutions, we deliver telecom solutions, carrier billing with content and digital marketing, and cross-border payments that move value securely — with speed, clarity and fewer intermediaries.
        </p>
        <p className="why-timeline-scroll">Scroll the story ↓</p>
        <Link to="/about" className="btn-primary btn-shine why-timeline-cta">
          <span>About us</span>
          <span className="btn-arrow">→</span>
        </Link>
      </header>

      <ol className="why-timeline-list" ref={listRef}>
        {events.map((e) => (
          <li
            key={e.num}
            className={`why-timeline-event from-${e.side}`}
            style={{ '--c': e.hue }}
          >
            <time dateTime={e.num}>{e.num}</time>
            <h3>{e.title}</h3>
            <p>{e.desc}</p>
          </li>
        ))}
      </ol>

      <footer className="why-timeline-end" data-parallax="-0.05">
        <p className="why-timeline-end-kicker">One partner. Every channel.</p>
        <p className="why-timeline-end-copy">VAS · DCB · D2C · Forex — built to move with you.</p>
        <Link to="/about" className="btn-outline btn-magnetic">
          Learn more about us →
        </Link>
      </footer>
    </section>
  )
}
