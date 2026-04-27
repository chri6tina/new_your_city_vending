import { notFound } from 'next/navigation'
import PageHero from '../../components/PageHero'
import { neighborhoods, getNeighborhood } from '../../../lib/neighborhoods'

export async function generateStaticParams() {
  return neighborhoods.map(n => ({ neighborhood: n.slug }))
}

export async function generateMetadata({ params }) {
  const { neighborhood } = await params
  const data = getNeighborhood(neighborhood)
  if (!data) return {}
  return {
    title: `Free Vending Machines in ${data.name}, ${data.borough} | NYC Vending`,
    description: `Free vending machine and micro market installation in ${data.name}, ${data.borough}. Serving businesses in ${data.name} since 2005 — no cost, no contracts, 5–7 day install.`,
  }
}

const boroughColors = {
  manhattan: 'rgba(10,22,50,0.72)',
  brooklyn: 'rgba(15,40,30,0.70)',
  queens: 'rgba(40,15,60,0.70)',
  'the-bronx': 'rgba(50,15,15,0.70)',
  'staten-island': 'rgba(10,35,45,0.70)',
}

const services = [
  { icon: '🥤', name: 'Vending Machines', desc: 'Traditional and AI smart vending machines for snacks, drinks, and fresh food.' },
  { icon: '🏪', name: 'Micro Markets', desc: 'Open-shelf convenience stores inside your breakroom with 200+ product options.' },
  { icon: '☕', name: 'Coffee Service', desc: 'Bean-to-cup espresso machines and pod systems fully maintained at no cost.' },
  { icon: '🍎', name: 'Pantry Service', desc: 'Curated healthy snacks, fruit, and beverages delivered and restocked automatically.' },
]

const businessTypes = [
  { icon: '🏢', label: 'Corporate Offices' },
  { icon: '🏭', label: 'Warehouses' },
  { icon: '🏥', label: 'Medical Offices' },
  { icon: '📞', label: 'Call Centers' },
  { icon: '🚗', label: 'Auto Dealerships' },
  { icon: '🏨', label: 'Hotels' },
  { icon: '🎓', label: 'Schools' },
  { icon: '⚙️', label: 'Light Manufacturing' },
]

const steps = [
  { num: '01', title: 'Tell Us About Your Space', desc: 'Fill out our quick form with your location, team size, and what you\'re looking for.' },
  { num: '02', title: 'Free Site Visit', desc: 'One of our local NYC team members comes to your location — no obligation, no pressure.' },
  { num: '03', title: 'We Install Everything', desc: 'We bring the equipment and set it up, usually within 5–7 business days of your approval.' },
  { num: '04', title: 'We Handle the Rest', desc: 'We restock, maintain, and service everything. You never have to think about it again.' },
]

const faqs = (name, borough) => [
  {
    q: `Do you actually serve ${name}, ${borough}?`,
    a: `Yes — we service all of ${borough}, including ${name}. We have a local service team that covers every neighborhood in the five boroughs, typically responding within 24 hours.`,
  },
  {
    q: 'Is there really no cost to my business?',
    a: `There's no cost for installation, the equipment, stocking, or maintenance. We make our revenue from product sales. If your team buys snacks and drinks (they will), the model works.`,
  },
  {
    q: 'What size business do you serve in ${name}?',
    a: `We typically work with businesses that have 20 or more employees on-site regularly. We've served everything from small ${name} offices to large facilities — if you have people on-site, we can likely help.`,
  },
  {
    q: 'How long does installation take?',
    a: `From first contact to installed machine is usually 5–7 business days. We move fast — our goal is to get your team stocked as quickly as possible.`,
  },
  {
    q: 'Are there any contracts or long-term commitments?',
    a: `No long-term contracts. We work on a flexible basis — if it's not working for your space, you can end the service with reasonable notice.`,
  },
]

export default async function NeighborhoodPage({ params }) {
  const { neighborhood } = await params
  const data = getNeighborhood(neighborhood)
  if (!data) notFound()

  const overlayColor = boroughColors[data.boroughSlug] || 'rgba(10,22,50,0.72)'
  const pageFaqs = faqs(data.name, data.borough)

  return (
    <main>
      <PageHero
        badge={`📍 ${data.borough}, New York City`}
        headline={<>Free Vending &amp; Micro Market<br /><span style={{ textDecoration: 'underline', textDecorationColor: 'rgba(255,255,255,0.35)', textUnderlineOffset: '6px', textDecorationThickness: '3px' }}>Services in {data.name}</span></>}
        sub={`We provide free vending machines, micro markets, coffee stations, and pantry services to businesses in ${data.name} — known for its ${data.knownFor}. Zero cost. No contracts. Installed in 5–7 days.`}
        primaryCta={{ label: 'Request a Free Site Visit →', href: '/#contact' }}
        secondaryCta={{ label: 'See Our Services', href: '#services-section' }}
        pills={['✅ Free Installation', '🔄 Always Restocked', '🔧 Full Maintenance', '📝 No Contracts']}
        overlayColor={overlayColor}
        minHeight="65vh"
      />

      {/* ── About the Neighborhood ── */}
      <section style={{ padding: '64px 0', background: 'white', borderBottom: '1px solid #E2E8F0' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <span className="section-label">Local Service</span>
          <h2 className="section-title" style={{ marginTop: '8px' }}>Serving {data.name} Since 2005</h2>
          <p style={{ fontSize: '17px', color: '#4B5563', lineHeight: 1.75, marginTop: '16px' }}>
            {data.name} is {data.tagline.toLowerCase()} — known for its {data.knownFor}. We've been
            providing free vending and refreshment services to {data.borough} businesses for over 20 years,
            and {data.name} is one of our most active service areas. From small professional offices
            to large-scale facilities, we understand the needs of businesses that operate here.
          </p>
          <p style={{ fontSize: '17px', color: '#4B5563', lineHeight: 1.75, marginTop: '16px' }}>
            Our local service team is based in New York City and covers {data.name} directly — no franchise middlemen,
            no national chain call centers. When you need a restock or a repair, you're talking to someone
            who knows {data.borough}.
          </p>
          {data.nearby.length > 0 && (
            <div style={{ marginTop: '24px', display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#64748B' }}>We also serve nearby:</span>
              {data.nearby.map(n => (
                <span key={n} style={{ background: '#F1F5F9', color: '#374151', fontSize: '13px', fontWeight: 600, padding: '4px 12px', borderRadius: '100px' }}>📍 {n}</span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Services ── */}
      <section id="services-section" style={{ padding: '72px 0', background: '#F8FAFC' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="section-label">What We Offer in {data.name}</span>
            <h2 className="section-title" style={{ marginTop: '8px' }}>All Services Are 100% Free</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
            {services.map(s => (
              <div key={s.name} style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '14px', padding: '28px 24px' }}>
                <div style={{ fontSize: '36px', marginBottom: '12px' }}>{s.icon}</div>
                <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>{s.name}</h3>
                <p style={{ fontSize: '14px', color: '#64748B', lineHeight: 1.65 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Business Types ── */}
      <section style={{ padding: '72px 0', background: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span className="section-label">Who We Serve</span>
            <h2 className="section-title" style={{ marginTop: '8px' }}>Built for {data.name} Businesses</h2>
            <p className="section-desc">If your team works on-site, we can help.</p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
            {businessTypes.map(b => (
              <div key={b.label} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '14px 20px' }}>
                <span style={{ fontSize: '22px' }}>{b.icon}</span>
                <span style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A' }}>{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section style={{ padding: '72px 0', background: '#0A1628' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="section-label" style={{ color: 'rgba(255,255,255,0.6)' }}>Simple Process</span>
            <h2 className="section-title" style={{ color: 'white', marginTop: '8px' }}>How to Get Started in {data.name}</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
            {steps.map(step => (
              <div key={step.num} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '14px', padding: '28px 24px' }}>
                <div style={{ fontSize: '28px', fontWeight: 900, color: 'rgba(255,255,255,0.25)', marginBottom: '12px', fontFamily: 'monospace' }}>{step.num}</div>
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'white', marginBottom: '8px' }}>{step.title}</h3>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.65 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: '72px 0', background: '#F8FAFC' }}>
        <div className="container" style={{ maxWidth: '760px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span className="section-label">FAQ</span>
            <h2 className="section-title" style={{ marginTop: '8px' }}>Common Questions from {data.name} Businesses</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {pageFaqs.map((faq, i) => (
              <div key={i} style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '24px 28px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>{faq.q}</h3>
                <p style={{ fontSize: '15px', color: '#4B5563', lineHeight: 1.7 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '80px 0', background: 'white', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '600px' }}>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 900, color: '#0A1628', letterSpacing: '-0.025em' }}>
            Ready to Add Free Vending to Your {data.name} Business?
          </h2>
          <p style={{ fontSize: '17px', color: '#4B5563', lineHeight: 1.65, margin: '16px 0 32px' }}>
            It takes 60 seconds to reach out. We'll handle everything else.
          </p>
          <a href="/#contact" className="btn btn-primary" style={{ fontSize: '17px', padding: '18px 40px', display: 'inline-block' }}>
            Request a Free Site Visit →
          </a>
        </div>
      </section>
    </main>
  )
}
