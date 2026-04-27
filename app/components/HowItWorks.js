import styles from './HowItWorks.module.css'

const steps = [
  {
    num: '01',
    icon: '📞',
    title: 'Contact Us',
    desc: 'Reach out by phone or fill out our quick form. Tell us about your business, your space, and what you need.',
  },
  {
    num: '02',
    icon: '🔍',
    title: 'Free Site Visit',
    desc: 'Our local NYC team visits your location, recommends the best services, and handles all the planning — at no cost.',
  },
  {
    num: '03',
    icon: '🚀',
    title: 'We Handle Everything',
    desc: 'We install, stock, and maintain your machines. You sit back and enjoy a fully managed refreshment program.',
  },
]

export default function HowItWorks() {
  return (
    <section className={styles.section} id="how-it-works">
      <div className="container">
        <div className={styles.header}>
          <span className="section-label">Simple Process</span>
          <h2 className="section-title">Up &amp; Running in 3 Easy Steps</h2>
          <p className="section-subtitle">
            Most locations are installed within 5–7 business days of first contact.
          </p>
        </div>

        <div className={styles.steps}>
          {steps.map((s, i) => (
            <div key={s.num} className={styles.step}>
              <div className={styles.stepNum}>{s.num}</div>
              <div className={styles.stepIcon}>{s.icon}</div>
              <h3 className={styles.stepTitle}>{s.title}</h3>
              <p className={styles.stepDesc}>{s.desc}</p>
              {i < steps.length - 1 && <div className={styles.connector} />}
            </div>
          ))}
        </div>

        <div className={styles.cta}>
          <a href="#contact" className="btn btn-navy">Get Started Today →</a>
        </div>
      </div>
    </section>
  )
}
