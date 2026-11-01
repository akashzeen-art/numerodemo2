import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import '../styles/navbar.css'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="container">
        <div className="navbar-inner">
          <Link to="/" className="navbar-logo">NUMERO<span>.</span>INFO</Link>

          <ul className={`nav-links${open ? ' open' : ''}`}>
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <Link to={to} className={pathname === to ? 'active' : ''}>{label}</Link>
              </li>
            ))}
            <li>
              <Link to="/contact" className="nav-cta">Get Started</Link>
            </li>
          </ul>

          <button className={`hamburger${open ? ' open' : ''}`} onClick={() => setOpen(!open)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </div>
    </nav>
  )
}
