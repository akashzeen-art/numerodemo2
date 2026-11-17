import { Link } from 'react-router-dom'
import VasExpandCards from './VasExpandCards'
import '../styles/flipcard.css'

export default function FlipCards() {
  return (
    <>
      <VasExpandCards />

      <div className="vf-expand-cta">
        <Link className="vf-link" to="/services#vas">
          Explore all VAS platforms <span>→</span>
        </Link>
      </div>
    </>
  )
}
