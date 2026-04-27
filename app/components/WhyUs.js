import styles from './WhyUs.module.css'

const pillars = [
  { icon: '✅', title: 'Free Installation', desc: 'No upfront costs, no contracts. We cover everything from delivery to setup.' },
  { icon: '🔄', title: '24/7 Restocking', desc: 'We monitor inventory in real time and restock before you run out — guaranteed.' },
  { icon: '🗽', title: 'Local NYC Team', desc: 'Born and based in New York. Fast response times across all 5 boroughs.' },
  { icon: '🔧', title: 'Full Maintenance', desc: 'We handle all repairs and maintenance at no cost to you, ever.' },
]

const stats = [
  { value: '500+', label: 'Active Locations' },
  { value: '20+', label: 'Years in Business' },
  { value: '5', label: 'Boroughs Served' },
  { value: '99%', label: 'Uptime Guaranteed' },
]

export default function WhyUs() {
  return (
    <section className={styles.section} id="why-us">
      <div className="container">
        <div className={styles.layout}>
          {/* Left: copy */}
          <div className={styles.left}>
            <span className="section-label">Why NYC Businesses Choose Us</span>
            <h2 className="section-title" style={{ color: 'white' }}>
              We Make Your Break Room a Perk, Not a Problem
            </h2>
            <p className="section-subtitle" style={{ color: 'rgba(255,255,255,0.7)' }}>
              From Midtown offices to Brooklyn warehouses, we&apos;ve helped hundreds of NYC businesses offer world-class refreshment programs at zero cost.
            </p>

            <div className={styles.stats}>
              {stats.map(s => (
                <div key={s.label} className={styles.stat}>
                  <span className={styles.statValue}>{s.value}</span>
                  <span className={styles.statLabel}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: pillars */}
          <div className={styles.right}>
            {pillars.map(p => (
              <div key={p.title} className={styles.pillar}>
                <div className={styles.pillarIcon}>{p.icon}</div>
                <div>
                  <h3 className={styles.pillarTitle}>{p.title}</h3>
                  <p className={styles.pillarDesc}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
