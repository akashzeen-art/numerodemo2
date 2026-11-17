import { Link } from 'react-router-dom'
import '../styles/journey.css'

const IconCard = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect width="20" height="14" x="2" y="5" rx="2" /><line x1="2" x2="22" y1="10" y2="10" /><path d="M6 14h2" />
  </svg>
)
const IconBank = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M10 18v-7" /><path d="M11.12 2.2a2 2 0 0 1 1.76 0l7.84 3.85A.5.5 0 0 1 20.5 7h-17a.5.5 0 0 1-.22-.95z" /><path d="M14 18v-7" /><path d="M18 18v-7" /><path d="M3 22h18" /><path d="M6 18v-7" />
  </svg>
)
const IconPhone = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect width="14" height="20" x="5" y="2" rx="2" ry="2" /><path d="M12 18h.01" />
  </svg>
)
const IconCheck = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 6 9 17l-5-5" />
  </svg>
)
const IconTrend = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M16 7h6v6" /><path d="m22 7-8.5 8.5-5-5L2 17" />
  </svg>
)
const IconGift = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="8" width="18" height="4" rx="1" /><path d="M12 8v13" /><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" /><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
  </svg>
)

function PhoneShell({ children, step, color }) {
  return (
    <div className="jp-phone-wrap" style={{ '--c': color }}>
      <div className="jp-orbit" aria-hidden="true" />
      <div className="jp-phone">
        <span className="jp-notch" />
        <div className="jp-screen">
          <div className="jp-status">
            <span>9:41</span>
            <span className="jp-signal"><i /><i /><i /><i /></span>
          </div>
          {children}
        </div>
      </div>
      <div className="jp-dots" aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <i key={i} className={i < step ? 'is-done' : i === step - 1 ? 'is-active' : ''} />
        ))}
      </div>
    </div>
  )
}

const phones = [
  {
    num: 1,
    color: '#2bb894',
    tag: 'Purchase',
    title: 'Choose a purchase',
    desc: 'The user picks a game, subscription, app or digital content online.',
    badge: { icon: <IconPhone />, text: 'Games · Apps · VOD' },
    screen: (
      <>
        <p className="jp-label">Pick content</p>
        <ul className="jp-list">
          <li className="is-active">
            <span className="jp-logo">S</span>
            <div><strong>StreamPlus</strong><small>Premium · 1 month</small></div>
            <span className="jp-price"><small>AED</small>19</span>
          </li>
          <li>
            <span className="jp-logo jp-logo--g">G</span>
            <div><strong>HD Games Pack</strong><small>Weekly pass</small></div>
            <span className="jp-price"><small>AED</small>9</span>
          </li>
          <li>
            <span className="jp-logo jp-logo--a">A</span>
            <div><strong>Audio Books</strong><small>3 titles</small></div>
            <span className="jp-price"><small>AED</small>12</span>
          </li>
        </ul>
        <span className="jp-btn">Continue</span>
      </>
    ),
  },
  {
    num: 2,
    color: '#7b6cf0',
    tag: 'Checkout',
    title: 'Pay with mobile',
    desc: 'They select their mobile number as the payment method and confirm. No card needed — checkout built for the phone.',
    badge: { icon: <IconCard />, text: 'No card needed' },
    screen: (
      <>
        <div className="jp-app">
          <span className="jp-logo">S</span>
          <div><strong>StreamPlus</strong><small>Premium · 1 month</small></div>
          <span className="jp-price"><small>AED</small>19</span>
        </div>
        <p className="jp-label">Choose payment</p>
        <ul className="jp-methods">
          <li><IconCard />Credit / debit card<span className="jp-radio" /></li>
          <li><IconBank />Net banking<span className="jp-radio" /></li>
          <li className="is-dcb is-active">
            <IconPhone />Pay with mobile bill
            <span className="jp-radio is-on"><IconCheck /></span>
          </li>
        </ul>
        <span className="jp-btn is-ready">Continue</span>
      </>
    ),
  },
  {
    num: 3,
    color: '#c4783a',
    tag: 'Billing',
    title: 'Charged by the operator',
    desc: 'The amount is added to the phone bill or deducted from prepaid balance.',
    badge: { icon: <IconPhone />, text: 'Any mobile device' },
    screen: (
      <>
        <p className="jp-label">Confirm charge</p>
        <div className="jp-bill">
          <strong>AED 19.00</strong>
          <small>Added to mobile bill</small>
        </div>
        <ul className="jp-list jp-list--plain">
          <li><span>Number</span><b>+971 •• •• 4412</b></li>
          <li><span>Operator</span><b>Carrier network</b></li>
          <li><span>Type</span><b>Postpaid / prepaid</b></li>
        </ul>
        <span className="jp-btn is-ready">Confirm</span>
      </>
    ),
  },
  {
    num: 4,
    color: '#2bb894',
    tag: 'Engagement',
    title: 'Enjoy & get rewarded',
    desc: 'Users get the audio books, VOD, HD games and contests they love — and subscribers unlock gifts that keep them coming back.',
    badge: { icon: <IconTrend />, text: 'Higher conversions' },
    screen: (
      <>
        <div className="jp-success">
          <span className="jp-check"><IconCheck /></span>
          <strong>You&apos;re in</strong>
          <small>StreamPlus Premium unlocked</small>
        </div>
        <ul className="jp-list jp-list--plain">
          <li><IconGift /><div><strong>Reward unlocked</strong><small>Extra game credits</small></div></li>
          <li><IconTrend /><div><strong>Come back bonus</strong><small>Next week offer</small></div></li>
        </ul>
        <span className="jp-btn is-ready">Start watching</span>
      </>
    ),
  },
]

export default function JourneySection() {
  return (
    <section className="journey-section is-inview" id="dcb-journey">
      <div className="container">
        <div className="journey-head">
          <div className="tag">Direct Carrier Billing</div>
          <h2>Pay with your mobile — <em>no card needed</em></h2>
          <p>Four steps. Four phones. One clear checkout built for the handset.</p>
          <p className="jp-swipe-hint">Swipe sideways to see all 4 phones →</p>
        </div>

        <div className="jp-phones">
          {phones.map((p) => (
            <article key={p.num} className="jp-card" style={{ '--c': p.color }}>
              <div className="jp-card-copy">
                <span className="jp-num">{p.num}</span>
                <div>
                  <span className="jp-tag">{p.tag}</span>
                  <h3>{p.title}</h3>
                </div>
              </div>
              <p className="jp-desc">{p.desc}</p>

              <div className="hero-visual">
                <PhoneShell step={p.num} color={p.color}>
                  {p.screen}
                </PhoneShell>
                <span className="hero-badge" aria-hidden="true">
                  {p.badge.icon}
                  {p.badge.text}
                </span>
              </div>
            </article>
          ))}
        </div>

        <div className="journey-cta">
          <Link to="/services#dcb" className="btn-primary">Explore carrier billing →</Link>
        </div>
      </div>
    </section>
  )
}
