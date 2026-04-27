import { notFound } from 'next/navigation'
import Image from 'next/image'

const boroughData = {
  manhattan: {
    name: 'Manhattan',
    icon: '🏙️',
    tagline: 'NYC\'s Business Capital — Fully Served',
    description: 'From Midtown corporate towers to Downtown startups and Harlem community centers, we provide vending machines, micro markets, and coffee services to Manhattan businesses of every size — at zero cost.',
    neighborhoods: ['Midtown', 'Downtown', 'Financial District', 'Harlem', 'Upper East Side', 'Upper West Side', 'Chelsea', 'Hell\'s Kitchen', 'Tribeca', 'SoHo', 'Greenwich Village', 'Murray Hill'],
    highlight: 'Fastest install turnaround in Manhattan — often within 3–5 business days.',
    bgColor: '#0A1628',
  },
  brooklyn: {
    name: 'Brooklyn',
    icon: '🌉',
    tagline: 'Brooklyn\'s Local Vending Experts',
    description: 'From the creative offices of Williamsburg to the warehouses of Bushwick and the corporate campuses of Downtown Brooklyn, we keep Brooklyn businesses stocked and satisfied — for free.',
    neighborhoods: ['Downtown Brooklyn', 'Williamsburg', 'Bushwick', 'Park Slope', 'DUMBO', 'Greenpoint', 'Crown Heights', 'Flatbush', 'Bay Ridge', 'Red Hook', 'Sunset Park', 'Borough Park'],
    highlight: 'Proudly serving Brooklyn\'s booming business community since 2005.',
    bgColor: '#1A0A28',
  },
  queens: {
    name: 'Queens',
    icon: '✈️',
    tagline: 'Queens\' Most Trusted Vending Service',
    description: 'Queens is NYC\'s most diverse borough — and our team reflects that. We serve businesses near JFK, LaGuardia, and throughout the borough with reliable vending, micro markets, and pantry solutions.',
    neighborhoods: ['Long Island City', 'Astoria', 'Flushing', 'Jamaica', 'Bayside', 'Forest Hills', 'Jackson Heights', 'Sunnyside', 'Woodside', 'Elmhurst', 'Howard Beach', 'Ridgewood'],
    highlight: 'Bilingual team available. We serve Queens\' diverse business community.',
    bgColor: '#0A2818',
  },
  'the-bronx': {
    name: 'The Bronx',
    icon: '🌿',
    tagline: 'The Bronx\'s Go-To Vending Partner',
    description: 'From the South Bronx\'s industrial corridor to Co-op City\'s residential campuses and Fordham\'s university district, we bring modern vending and refreshment services to The Bronx at no cost.',
    neighborhoods: ['South Bronx', 'Fordham', 'Co-op City', 'Riverdale', "Hunt's Point", 'Morris Park', 'Pelham Bay', 'Tremont', 'Mott Haven', 'Highbridge', 'Concourse', 'Throgs Neck'],
    highlight: 'Supporting Bronx businesses and institutions with free, professional vending.',
    bgColor: '#0A2010',
  },
  'staten-island': {
    name: 'Staten Island',
    icon: '⛴️',
    tagline: 'Staten Island\'s Local Vending Specialists',
    description: 'Staten Island\'s tight-knit business community deserves great refreshment services too. We serve offices, warehouses, schools, and facilities across the borough — installation is always free.',
    neighborhoods: ['St. George', 'New Springville', 'Tottenville', 'Great Kills', 'Stapleton', 'Annadale', 'Richmond Valley', 'Eltingville', 'Grasmere', 'Dongan Hills', 'Oakwood', 'New Dorp'],
    highlight: 'Island-wide coverage with the same fast turnaround as our Manhattan clients.',
    bgColor: '#1A1A0A',
  },
}

const services = [
  { img: '/service_traditional_vending.png', name: 'Traditional Vending', desc: 'Snack & beverage machines, fully stocked and maintained at no cost.' },
  { img: '/service_ai_vending.png', name: 'AI Smart Vending', desc: 'Touchscreen machines with cashless payments and real-time inventory.' },
  { img: '/service_micro_market.png', name: 'Micro Markets', desc: 'Full self-checkout mini-store in your break room, open 24/7.' },
  { img: '/service_coffee.png', name: 'Coffee Services', desc: 'Premium bean-to-cup coffee machines with top-shelf beans.' },
  { img: '/service_pantry.png', name: 'Pantry Services', desc: 'Open-access stocked pantry restocked on your schedule.' },
  { img: '/service_custom.png', name: 'Custom Solutions', desc: 'Tailored vending programs for large facilities & stadiums.' },
]

export async function generateStaticParams() {
  return Object.keys(boroughData).map(borough => ({ borough }))
}

export async function generateMetadata({ params }) {
  const { borough } = await params
  const data = boroughData[borough]
  if (!data) return {}
  return {
    title: `Vending Services in ${data.name}, NYC | New York City Vending`,
    description: `Free vending machines, micro markets & coffee services in ${data.name}. We install, stock & maintain everything at zero cost. Serving ${data.neighborhoods.slice(0, 4).join(', ')} and more.`,
  }
}

export default async function BoroughPage({ params }) {
  const { borough } = await params
  const data = boroughData[borough]
  if (!data) notFound()
  return (
    <main>
      {/* ── Hero ── */}
      <section style={{ position: 'relative', minHeight: '70vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        {/* Background photo */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Image
            src="/new_york_city_hero.jpg"
            alt={`Vending services in ${data.name}, NYC`}
            fill
            style={{ objectFit: 'cover', objectPosition: 'center top' }}
            priority
            quality={85}
          />
          {/* Overlay — lighter so you can see the photo */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(160deg, rgba(5,15,35,0.78) 0%, rgba(5,15,35,0.62) 50%, rgba(5,15,35,0.48) 100%)',
          }} />
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', gap: '22px', padding: '120px 0 80px', maxWidth: '660px' }}>
          {/* Badge */}
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.28)',
            color: 'rgba(255,255,255,0.92)', fontSize: '13px', fontWeight: 600,
            padding: '8px 16px', borderRadius: '100px', width: 'fit-content',
            backdropFilter: 'blur(4px)',
          }}>
            {data.icon} Free Vending Services · {data.name}, NYC
          </span>

          <h1 style={{ fontSize: 'clamp(34px, 5vw, 58px)', fontWeight: 900, color: 'white', lineHeight: 1.07, letterSpacing: '-0.03em' }}>
            Vending &amp; Micro Market<br />
            <span style={{ textDecoration: 'underline', textDecorationColor: 'rgba(255,255,255,0.35)', textUnderlineOffset: '6px', textDecorationThickness: '3px' }}>
              Services in {data.name}
            </span>
          </h1>

          <p style={{ fontSize: 'clamp(15px, 2vw, 18px)', color: 'rgba(255,255,255,0.82)', lineHeight: 1.65, maxWidth: '540px' }}>
            {data.description}
          </p>

          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
            <a href="/#contact" style={{
              background: 'white', color: '#0A1628', fontSize: '16px', fontWeight: 800,
              padding: '15px 28px', borderRadius: '10px', textDecoration: 'none', whiteSpace: 'nowrap',
            }}>
              Request a Free Site Visit →
            </a>
            <a href="#services-section" style={{
              color: 'rgba(255,255,255,0.88)', fontSize: '15px', fontWeight: 600,
              paddingBottom: '2px', borderBottom: '2px solid rgba(255,255,255,0.35)',
              textDecoration: 'none', whiteSpace: 'nowrap',
            }}>
              See Our Services
            </a>
          </div>

          {/* Trust pills */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', paddingTop: '4px' }}>
            {['✅ Free Installation', '🔄 24/7 Restocking', '🔧 Full Maintenance', '📝 No Contracts'].map(t => (
              <span key={t} style={{
                background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.20)',
                color: 'rgba(255,255,255,0.82)', fontSize: '12px', fontWeight: 600,
                padding: '6px 14px', borderRadius: '100px', backdropFilter: 'blur(4px)',
              }}>{t}</span>
            ))}
          </div>
        </div>
      </section>


      {/* ── Services ── */}
      <section style={{ padding: '80px 0', background: '#F8FAFC' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="section-label">What We Offer in {data.name}</span>
            <h2 className="section-title">All Services Are 100% Free</h2>
            <p className="section-subtitle">We install, stock, and maintain everything — your business pays nothing.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {services.map(s => (
              <div key={s.name} style={{
                background: 'white', border: '1px solid #E2E8F0',
                borderRadius: '14px', overflow: 'hidden',
                display: 'flex', flexDirection: 'column',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}>
                {/* Photo */}
                <div style={{ position: 'relative', width: '100%', height: '180px', flexShrink: 0 }}>
                  <Image
                    src={s.img}
                    alt={s.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 600px) 100vw, 33vw"
                  />
                </div>
                {/* Content */}
                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                  <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.01em' }}>{s.name}</h3>
                  <p style={{ fontSize: '14px', color: '#64748B', lineHeight: 1.6 }}>{s.desc}</p>
                  <a href="/#contact" style={{ fontSize: '13px', fontWeight: 700, color: '#2563EB', marginTop: '4px' }}>Get started →</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Neighborhoods ── */}
      <section style={{ padding: '80px 0', background: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="section-label">Coverage Area</span>
            <h2 className="section-title">Neighborhoods We Serve in {data.name}</h2>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
            {data.neighborhoods.map(n => (
              <span key={n} style={{
                background: '#EFF6FF', border: '1px solid #BFDBFE',
                color: '#1D4ED8', fontSize: '14px', fontWeight: 600,
                padding: '8px 18px', borderRadius: '100px',
              }}>
                📍 {n}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Business Types ── */}
      <section style={{ padding: '80px 0', background: '#F8FAFC' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="section-label">Who We Work With</span>
            <h2 className="section-title">Businesses We Serve in {data.name}</h2>
            <p className="section-subtitle">Any business with employees can qualify — no minimum size requirement.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            {[
              { icon: '🏢', type: 'Corporate Offices', desc: 'Keep your team energized throughout the day.' },
              { icon: '🏭', type: 'Warehouses & Logistics', desc: 'Fuel hardworking teams on every shift.' },
              { icon: '🏥', type: 'Medical Facilities', desc: 'Staff lounges, waiting rooms & break rooms.' },
              { icon: '🏫', type: 'Schools & Universities', desc: 'Students, faculty & administrative staff.' },
              { icon: '🏨', type: 'Hotels & Hospitality', desc: 'Guest floors, staff areas & event spaces.' },
              { icon: '💪', type: 'Gyms & Fitness', desc: 'Post-workout snacks and hydration stations.' },
              { icon: '🔧', type: 'Auto Dealerships', desc: 'Showrooms, service bays & waiting areas.' },
              { icon: '📞', type: 'Call Centers', desc: 'Keep agents fueled during long shifts.' },
            ].map(b => (
              <div key={b.type} style={{
                background: 'white', border: '1px solid #E2E8F0', borderRadius: '12px',
                padding: '20px', display: 'flex', flexDirection: 'column', gap: '8px',
              }}>
                <span style={{ fontSize: '28px' }}>{b.icon}</span>
                <strong style={{ fontSize: '14px', color: '#0F172A', fontWeight: 800 }}>{b.type}</strong>
                <p style={{ fontSize: '13px', color: '#64748B', lineHeight: 1.5 }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section style={{ padding: '80px 0', background: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span className="section-label">The Process</span>
            <h2 className="section-title">How It Works in {data.name}</h2>
            <p className="section-subtitle">From first contact to a fully stocked machine — we handle everything.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
            {[
              { step: '01', title: 'Tell Us About Your Space', desc: 'Fill out our quick form or give us a call. We\'ll ask about your team size, location, and what kind of service fits best.' },
              { step: '02', title: 'We Visit Your Location', desc: `Our ${data.name} team comes to you — we assess your space, recommend the right setup, and plan the installation. Zero pressure.` },
              { step: '03', title: 'We Install & Maintain Everything', desc: 'We handle delivery, installation, stocking, and all ongoing maintenance. You just enjoy the benefit — completely free.' },
            ].map(s => (
              <div key={s.step} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{
                  width: '52px', height: '52px', borderRadius: '14px',
                  background: '#0A1628', color: '#F59E0B',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '18px', fontWeight: 900, flexShrink: 0,
                }}>{s.step}</div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em' }}>{s.title}</h3>
                <p style={{ fontSize: '15px', color: '#64748B', lineHeight: 1.65 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: '80px 0', background: '#F8FAFC' }}>
        <div className="container" style={{ maxWidth: '760px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="section-label">Common Questions</span>
            <h2 className="section-title">FAQ — Vending Services in {data.name}</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              {
                q: `Is vending service really free for ${data.name} businesses?`,
                a: 'Yes — 100% free. We provide, install, stock, and maintain all equipment at no cost to your business. We make our revenue from product sales, not from you.',
              },
              {
                q: 'How many employees do we need to qualify?',
                a: 'We work with businesses of all sizes. As a general guideline, traditional vending works well for 20+ employees, and micro markets are ideal for 50+ employees. We\'ll advise you after a free site visit.',
              },
              {
                q: 'How long does installation take?',
                a: `For most ${data.name} locations we can complete installation within 3–7 business days of your site visit. Larger micro market setups may take a few extra days.`,
              },
              {
                q: 'What if we want to change products or the machine isn\'t working?',
                a: 'Just let us know. We handle all product customization requests and repairs at no cost. Our local team is on call for service issues — most are resolved same or next day.',
              },
              {
                q: 'Is there a contract or long-term commitment?',
                a: 'No long-term contracts required. We work on a flexible arrangement — we want to earn your business through great service, not lock you in.',
              },
            ].map((item, i) => (
              <div key={i} style={{
                background: 'white', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '24px 28px',
              }}>
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', marginBottom: '10px' }}>
                  {item.q}
                </h3>
                <p style={{ fontSize: '15px', color: '#64748B', lineHeight: 1.65 }}>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section style={{ padding: '80px 0', background: '#0A1628' }}>
        <div className="container" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900, color: 'white', letterSpacing: '-0.03em' }}>
            Ready to Get Started in {data.name}?
          </h2>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.72)', maxWidth: '520px', lineHeight: 1.65 }}>
            Our local team will visit your {data.name} location, assess your space, and have everything installed — at no cost to you.
          </p>
          <a href="/#contact" className="btn btn-primary" style={{ fontSize: '17px', padding: '16px 36px' }}>
            Request a Free Site Visit →
          </a>
        </div>
      </section>
    </main>
  )
}
