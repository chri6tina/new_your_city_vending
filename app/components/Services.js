import Image from 'next/image'
import styles from './Services.module.css'

const services = [
  {
    img: '/service_traditional_vending.png',
    title: 'Traditional Vending',
    desc: 'Classic snack and beverage machines stocked with your employees\' favorites. We handle restocking, maintenance, and repairs at no cost.',
    tag: 'Most Popular',
  },
  {
    img: '/service_ai_vending.png',
    title: 'AI Smart Vending',
    desc: 'Next-generation touchscreen vending machines with cashless payments, real-time inventory tracking, and personalized recommendations.',
    tag: 'New',
  },
  {
    img: '/service_micro_market.png',
    title: 'Micro Markets',
    desc: 'Transform your break room into a full self-checkout mini store. Fresh food, snacks, beverages — open 24/7 with no staff required.',
    tag: null,
  },
  {
    img: '/service_coffee.png',
    title: 'Coffee Services',
    desc: 'Premium commercial coffee machines with top-shelf beans, teas, and hot beverages. Bean-to-cup quality your team will love.',
    tag: null,
  },
  {
    img: '/service_pantry.png',
    title: 'Pantry Services',
    desc: 'A fully stocked, open-access office pantry loaded with snacks, drinks, and healthy options — restocked on your schedule.',
    tag: null,
  },
  {
    img: '/service_custom.png',
    title: 'Custom Solutions',
    desc: 'Need something unique? We design tailored vending and refreshment programs for large facilities, stadiums, schools, and more.',
    tag: null,
  },
]

export default function Services() {
  return (
    <section className={styles.section} id="services">
      <div className="container">
        <div className={styles.header}>
          <span className="section-label">What We Offer</span>
          <h2 className="section-title">Vending &amp; Refreshment Services</h2>
          <p className="section-subtitle">
            Every service is 100% free to your business. We supply, install, stock, and maintain — you just enjoy the benefit.
          </p>
        </div>

        <div className={styles.grid}>
          {services.map(s => (
            <div key={s.title} className={styles.card}>
              {/* Photo */}
              <div className={styles.cardImg}>
                <Image
                  src={s.img}
                  alt={s.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {s.tag && <span className={styles.cardTag}>{s.tag}</span>}
              </div>
              {/* Content */}
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{s.title}</h3>
                <p className={styles.cardDesc}>{s.desc}</p>
                <a href="#contact" className={styles.cardLink}>Get started →</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
