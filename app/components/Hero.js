import Image from 'next/image'
import styles from './Hero.module.css'

const boroughs = ['Manhattan', 'Brooklyn', 'Queens', 'The Bronx', 'Staten Island']

export default function Hero() {
  return (
    <section className={styles.hero} id="home">
      {/* Background photo */}
      <div className={styles.bg}>
        <Image
          src="/new_york_city_hero.jpg"
          alt="New York City vending services"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center top' }}
          priority
          quality={90}
        />
        <div className={styles.overlay} />
      </div>

      <div className={`container ${styles.content}`}>

        <div className={styles.badge}>
          🏠 Family Owned &amp; Operated · Serving NYC Since 2005
        </div>

        <h1 className={styles.headline}>
          Your Neighborhood<br />
          <span className={styles.highlight}>Vending &amp; Micro Market</span><br />
          Experts in NYC
        </h1>

        <p className={styles.sub}>
          We bring vending machines, micro markets, coffee stations, and pantry services
          to New York businesses — <strong>completely free to install and maintain.</strong>
        </p>

        {/* CTAs */}
        <div className={styles.ctas}>
          <a href="#contact" className={styles.ctaPrimary}>
            Request a Free Site Visit →
          </a>
          <a href="#services" className={styles.ctaSecondary}>
            See Our Services
          </a>
        </div>

        {/* Trust row */}
        <div className={styles.trust}>
          <div className={styles.trustItem}>
            <strong>20+</strong>
            <span>Years in NYC</span>
          </div>
          <div className={styles.divider} />
          <div className={styles.trustItem}>
            <strong>500+</strong>
            <span>Businesses Served</span>
          </div>
          <div className={styles.divider} />
          <div className={styles.trustItem}>
            <strong>5–7 Day</strong>
            <span>Install Turnaround</span>
          </div>
          <div className={styles.divider} />
          <div className={styles.trustItem}>
            <strong>$0</strong>
            <span>Cost to Your Business</span>
          </div>
        </div>

        {/* Borough pills */}
        <div className={styles.boroughs}>
          {boroughs.map(b => (
            <span key={b} className={styles.borough}>📍 {b}</span>
          ))}
        </div>

      </div>
    </section>
  )
}
