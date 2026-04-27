import Image from 'next/image'
import HeroForm from './HeroForm'
import styles from './Hero.module.css'

const boroughs = ['Manhattan', 'Brooklyn', 'Queens', 'The Bronx', 'Staten Island']

export default function Hero() {
  return (
    <section className={styles.hero} id="home">
      <div className={styles.bg}>
        <Image
          src="/new_york_city_hero.jpg"
          alt="New York City vending services"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center top' }}
          priority
          quality={85}
        />
        <div className={styles.overlay} />
      </div>

      <div className={`container ${styles.content}`}>
        {/* Left: copy */}
        <div className={styles.left}>

          <div className={styles.localBadge}>
            🏠 Family Owned &amp; Operated · Serving NYC Since 2005
          </div>

          <h1 className={styles.headline}>
            Your Local NYC<br />
            <span className={styles.highlight}>Vending &amp; Micro Market</span><br />
            Experts
          </h1>

          <p className={styles.subheadline}>
            We&apos;re a local New York team that keeps your office stocked and your employees happy — with vending machines, micro markets, coffee, and pantry services at <strong>no cost to your business.</strong>
          </p>

          <div className={styles.localTrust}>
            <div className={styles.trustItem}>
              <span className={styles.trustIcon}>📅</span>
              <div>
                <strong>20+ Years</strong>
                <span>Serving NYC</span>
              </div>
            </div>
            <div className={styles.trustItem}>
              <span className={styles.trustIcon}>🤝</span>
              <div>
                <strong>500+ Businesses</strong>
                <span>All 5 Boroughs</span>
              </div>
            </div>
            <div className={styles.trustItem}>
              <span className={styles.trustIcon}>⚡</span>
              <div>
                <strong>5–7 Day</strong>
                <span>Install Turnaround</span>
              </div>
            </div>
          </div>

          <div className={styles.boroughs}>
            {boroughs.map(b => (
              <span key={b} className={styles.borough}>📍 {b}</span>
            ))}
          </div>

        </div>

        {/* Right: form card */}
        <div className={styles.right}>
          <HeroForm />
        </div>
      </div>
    </section>
  )
}
