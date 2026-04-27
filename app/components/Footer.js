import styles from './Footer.module.css'

const links = [
  { label: 'Services', href: '#services' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Service Area', href: '#service-area' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles.brand}>
            <div className={styles.logo}>
              <span className={styles.logoMark}>NYC</span>
              <span className={styles.logoText}>Vending</span>
            </div>
            <p className={styles.tagline}>
              Free vending, micro market, coffee &amp; pantry services for NYC businesses — all 5 boroughs.
            </p>
            <a href="#contact" className={styles.phone}>Get a Free Quote →</a>
          </div>

          <div className={styles.links}>
            <div className={styles.linksTitle}>Quick Links</div>
            <ul>
              {links.map(l => (
                <li key={l.label}>
                  <a href={l.href} className={styles.link}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.links}>
            <div className={styles.linksTitle}>Our Services</div>
            <ul>
              {['Traditional Vending', 'AI Smart Vending', 'Micro Markets', 'Coffee Services', 'Pantry Services'].map(s => (
                <li key={s}>
                  <span className={styles.link}>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.links}>
            <div className={styles.linksTitle}>Service Area</div>
            <ul>
              {['Manhattan', 'Brooklyn', 'Queens', 'The Bronx', 'Staten Island', 'Long Island', 'Westchester', 'Northern NJ'].map(a => (
                <li key={a}>
                  <span className={styles.link}>📍 {a}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© {new Date().getFullYear()} New York City Vending. All rights reserved.</p>
          <p>Free vending machine installation · NYC&apos;s premier refreshment service</p>
        </div>
      </div>
    </footer>
  )
}
