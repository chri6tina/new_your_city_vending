import styles from './Testimonials.module.css'

const reviews = [
  {
    stars: 5,
    text: '"The micro market completely transformed our break room. Our 200 employees love having fresh food available all day. Zero hassle — they handle everything."',
    name: 'Michael T.',
    role: 'Office Manager',
    company: 'Midtown Law Firm, Manhattan',
    initial: 'M',
  },
  {
    stars: 5,
    text: '"Finally a vending company that actually shows up on time and keeps the machines stocked. We\'ve had zero issues in 18 months. Highly recommend."',
    name: 'Sandra L.',
    role: 'Facilities Director',
    company: 'Distribution Warehouse, Brooklyn',
    initial: 'S',
  },
  {
    stars: 5,
    text: '"The coffee service alone has been worth every penny — except it\'s free! Our staff morale went up the day they installed it. Incredible service."',
    name: 'James W.',
    role: 'HR Manager',
    company: 'Medical Office, Queens',
    initial: 'J',
  },
]

export default function Testimonials() {
  return (
    <section className={styles.section} id="testimonials">
      <div className="container">
        <div className={styles.header}>
          <span className="section-label">What NYC Businesses Say</span>
          <h2 className="section-title">Trusted by Hundreds of NYC Companies</h2>
        </div>

        <div className={styles.grid}>
          {reviews.map(r => (
            <div key={r.name} className={styles.card}>
              <div className={styles.stars}>{'★'.repeat(r.stars)}</div>
              <p className={styles.text}>{r.text}</p>
              <div className={styles.author}>
                <div className={styles.avatar}>{r.initial}</div>
                <div>
                  <div className={styles.authorName}>{r.name}</div>
                  <div className={styles.authorRole}>{r.role}</div>
                  <div className={styles.authorCompany}>📍 {r.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
