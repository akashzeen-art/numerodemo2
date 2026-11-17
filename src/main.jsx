import { StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, useLocation } from 'react-router-dom'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './styles/global.css'
import App from './App.jsx'
import Prelander from './components/Prelander.jsx'

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) { window.scrollTo({ top: 0, behavior: 'instant' }); return }
    const t = setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' }), 100)
    return () => clearTimeout(t)
  }, [pathname, hash])
  return null
}

function Root() {
  const [showApp, setShowApp] = useState(false)
  useEffect(() => {
    try {
      const force = new URLSearchParams(window.location.search).has('intro')
      if (!force && sessionStorage.getItem('numero-intro-v3') === '1') setShowApp(true)
    } catch { /* ignore */ }
    // Safety: slightly past the 6s intro so Skip / normal finish still win first
    const t = setTimeout(() => setShowApp(true), 9_000)
    return () => clearTimeout(t)
  }, [])
  const finish = () => {
    try { sessionStorage.setItem('numero-intro-v3', '1') } catch { /* ignore */ }
    setShowApp(true)
  }
  return (
    <>
      {!showApp && <Prelander onDone={finish} />}
      <div
        style={{
          opacity: showApp ? 1 : 0,
          visibility: showApp ? 'visible' : 'hidden',
          transition: 'opacity 0.45s ease',
        }}
      >
        <ScrollToTop />
        <App />
      </div>
    </>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  </StrictMode>,
)
