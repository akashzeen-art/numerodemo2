import { Link, useLocation } from 'react-router-dom'
import '../styles/footer.css'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/services', label: 'Services' },
  { to: '/contact', label: 'Contact' },
]

export default function Footer() {
  const { pathname } = useLocation()

  return (
    <footer className="site-footer">
      <div className="container footer-main-grid">
        <div className="footer-brand">
          <Link to="/" className="footer-logo-link">
            <img src="/images/logo.png" alt="Numero Mobile" />
          </Link>
          <p>
            Telecom VAS platforms, Direct Carrier Billing with content and digital marketing, and cross-border payments across 50+ Geos.
          </p>
          <p className="footer-tagline">Connect, engage & grow.</p>
        </div>

        <div>
          <h2 className="footer-heading">Quick links</h2>
          <ul className="footer-links">
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <Link to={to} className={pathname === to ? 'active' : ''}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-contact-grid">
          <div>
            <h2 className="footer-heading">Get in touch</h2>
            <ul className="footer-contact-list">
              <li><a href="tel:+918447725267">8447725267</a></li>
              <li><a href="mailto:mohit@numeromobile.com">mohit@numeromobile.com</a></li>
              <li>
                <span>Mon–Sat, 09:00–18:00 IST</span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="footer-heading">Our office</h2>
            <a
              className="footer-office"
              href="https://www.google.com/maps/search/?api=1&query=Spaze+ITech+Park+Tower+A1+Sector+49+Gurugram+Haryana+122018"
              target="_blank"
              rel="noopener noreferrer"
            >
              <strong>Gurugram, India</strong>
              <span>
                4th floor, Tower A1, SPAZE ITECH PARK, 417,<br />
                Sector 49, Gurugram, Haryana 122018
              </span>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>© {new Date().getFullYear()} Numero Mobile</p>
        </div>
      </div>
    </footer>
  )
}
