import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Contact from './pages/Contact'
import DisasterRecovery from './pages/DisasterRecovery'
import Dashboard from './pages/Dashboard'
import useParallax from './hooks/useParallax'
import './styles/parallax.css'

export default function App() {
  useParallax()

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/disaster-recovery-services" element={<DisasterRecovery />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  )
}
