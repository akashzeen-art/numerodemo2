import '../styles/services-hero.css'

export default function ServicesHero() {
  return (
    <section className="services-hero">
      <div className="services-hero-bg" aria-hidden="true">
        <div className="services-hero-media" data-parallax="0.26">
          <img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1800&q=80"
            alt=""
          />
        </div>
        <div className="services-hero-overlay" />
        <div className="services-hero-fade" />
      </div>

      <div className="container services-hero-content" data-parallax="-0.07">
        <p className="services-hero-brand">Services</p>
        <h1>Telecom solutions that connect, engage and grow.</h1>
        <p className="services-hero-sub">
          From USSD and SMS Gateway to mobile advertising, Direct Carrier Billing with content and digital marketing, and cross-border payments across 50+ Geos.
        </p>

        <div className="services-hero-btns">
          <a href="#vas" className="btn-outline">
            Explore services ↓
          </a>
        </div>
      </div>
    </section>
  )
}
