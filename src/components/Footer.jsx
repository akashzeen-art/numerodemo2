import { Link } from 'react-router-dom'
import '../styles/footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">NUMERO.INFO</div>
            <p>Numero Info IT Services is an IT Division of Numero Mobile Private Limited — the innovation leader in providing robust and intelligent mobility solutions & services.</p>
            <div className="footer-social">
              <a href="#" aria-label="Facebook"><i className="fa fa-facebook" /></a>
              <a href="#" aria-label="Twitter"><i className="fa fa-twitter" /></a>
              <a href="https://linkedin.com" aria-label="LinkedIn"><i className="fa fa-linkedin" /></a>
              <a href="#" aria-label="Instagram"><i className="fa fa-instagram" /></a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <div className="footer-links">
              <Link to="/">Home</Link>
              <Link to="/about">About Us</Link>
              <Link to="/services">Services</Link>
              <Link to="/portfolio">Portfolio</Link>
              <Link to="/contact">Contact</Link>
            </div>
          </div>

          <div className="footer-col">
            <h4>Services</h4>
            <div className="footer-links">
              <a href="#">Cloud Managed Services</a>
              <a href="#">IT Infrastructure</a>
              <a href="#">RPA Solutions</a>
              <a href="#">Data Analytics</a>
              <a href="#">E-Verification</a>
              <Link to="/disaster-recovery-services">Disaster Recovery</Link>
            </div>
          </div>

          <div className="footer-col">
            <h4>Contact Us</h4>
            <div className="footer-contact">
              <div className="footer-contact-item">
                <span>📍</span>
                <span>B 123 First Floor Sector 54, Gurgaon Haryana 122003</span>
              </div>
              <div className="footer-contact-item">
                <span>📞</span>
                <span>+91 70113 70445</span>
              </div>
              <div className="footer-contact-item">
                <span>✉️</span>
                <span>info@numeroinfo.asia</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} All Rights Reserved By <a href="https://numeroinfo.asia">NUMERO INFO</a> — IT Services & Digital Solutions</p>
        </div>
      </div>
    </footer>
  )
}
