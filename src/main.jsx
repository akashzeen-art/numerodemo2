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
  return (
    <>
      {!showApp && <Prelander onDone={() => setShowApp(true)} />}
      <div style={{ opacity: showApp ? 1 : 0, transition: 'opacity 0.5s ease' }}>
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
