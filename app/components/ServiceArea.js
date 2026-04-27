import Link from 'next/link'
import styles from './ServiceArea.module.css'

const boroughs = [
  {
    name: 'Manhattan',
    slug: 'manhattan',
    areas: 'Midtown, Downtown, Harlem, Upper East & West Side',
    icon: '🏙️',
  },
  {
    name: 'Brooklyn',
    slug: 'brooklyn',
    areas: 'Downtown, Williamsburg, Bushwick, Park Slope, DUMBO',
    icon: '🌉',
  },
  {
    name: 'Queens',
    slug: 'queens',
    areas: 'Long Island City, Astoria, Flushing, Jamaica, Bayside',
    icon: '✈️',
  },
  {
    name: 'The Bronx',
    slug: 'the-bronx',
    areas: "South Bronx, Fordham, Co-op City, Riverdale, Hunt's Point",
    icon: '🌿',
  },
  {
    name: 'Staten Island',
    slug: 'staten-island',
    areas: 'St. George, New Springville, Tottenville, Great Kills',
    icon: '⛴️',
  },
]

export default function ServiceArea() {
  return (
    <section className={styles.section} id="service-area">
      <div className="container">
        <div className={styles.header}>
          <span className="section-label">Where We Serve</span>
          <h2 className="section-title">All 5 NYC Boroughs Covered</h2>
          <p className="section-subtitle">
            Our local team is strategically based across New York City for fast installation and same-week service calls.
          </p>
        </div>

        <div className={styles.grid}>
          {boroughs.map(b => (
            <Link key={b.name} href={`/boroughs/${b.slug}`} className={styles.card}>
              <div className={styles.cardIcon}>{b.icon}</div>
              <h3 className={styles.cardName}>{b.name}</h3>
              <p className={styles.cardAreas}>{b.areas}</p>
              <span className={styles.cardCta}>Learn more →</span>
            </Link>
          ))}
        </div>

        <div className={styles.banner}>
          <div className={styles.bannerText}>
            <strong>Also serving:</strong> Long Island, Westchester, Newark &amp; Northern NJ
          </div>
          <a href="#contact" className="btn btn-primary">Check Your Location →</a>
        </div>
      </div>
    </section>
  )
}
