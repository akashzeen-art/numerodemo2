import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import '../styles/navbar.css'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  // Dark heroes on these routes need light nav text until scroll
  const onHero = ['/', '/services', '/about', '/contact'].includes(pathname)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}${onHero ? ' on-hero' : ''}`}>
      <div className="container">
        <div className="navbar-inner">
          <Link to="/" className="navbar-logo">
            <img src="/images/logo.png" alt="Numero Info" />
          </Link>

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
