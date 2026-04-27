import Image from 'next/image'
import { notFound } from 'next/navigation'
import { services } from '../../../lib/services'

export async function generateStaticParams() {
  return services.map(s => ({ service: s.slug }))
}

export async function generateMetadata({ params }) {
  const { service } = await params
  const data = services.find(s => s.slug === service)
  if (!data) return {}
  return {
    title: `${data.name} in NYC | Free Installation | NYC Vending`,
    description: `${data.description} Serving all 5 NYC boroughs. Free installation, no contracts, 5–7 day turnaround.`,
  }
}

export default async function ServicePage({ params }) {
  const { service } = await params
  const data = services.find(s => s.slug === service)
  if (!data) notFound()

  return (
    <main>
      {/* ── Hero ── */}
      <section style={{ background: '#0A1628', padding: '80px 0 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.12, background: 'radial-gradient(circle at 70% 50%, #3B82F6 0%, transparent 60%)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center', paddingBottom: '0' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', paddingBottom: '80px' }}>
            <span style={{ fontSize: '36px' }}>{data.icon}</span>
            <span style={{ display: 'inline-block', background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.4)', color: '#93C5FD', fontSize: '12px', fontWeight: 700, padding: '6px 14px', borderRadius: '100px', width: 'fit-content', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Free for Qualifying NYC Businesses
            </span>
            <h1 style={{ fontSize: 'clamp(30px, 4vw, 52px)', fontWeight: 900, color: 'white', lineHeight: 1.08, letterSpacing: '-0.03em' }}>
              {data.name}
            </h1>
            <p style={{ color: '#FCD34D', fontWeight: 700, fontSize: '15px' }}>{data.tagline}</p>
            <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.78)', lineHeight: 1.7 }}>
              {data.description}
            </p>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', fontSize: '13px', color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>
              <span>👥 Ideal for: {data.idealFor}</span>
              <span>📅 Install: {data.installTime}</span>
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a href="/#contact" style={{ background: 'white', color: '#0A1628', fontSize: '15px', fontWeight: 800, padding: '14px 24px', borderRadius: '10px', textDecoration: 'none' }}>
                Request Free Installation →
              </a>
            </div>
          </div>
          <div style={{ position: 'relative', height: '400px', borderRadius: '20px 20px 0 0', overflow: 'hidden' }}>
            <Image
              src={data.image}
              alt={data.name}
              fill
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              priority
              quality={90}
            />
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section style={{ padding: '72px 0', background: '#F8FAFC' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="section-label">What's Included</span>
            <h2 className="section-title" style={{ marginTop: '8px' }}>Everything at Zero Cost to You</h2>
            <p className="section-desc">Installation, stocking, maintenance, and restocking — all covered.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {data.features.map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', background: 'white', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '18px 20px' }}>
                <span style={{ color: '#16A34A', fontWeight: 900, fontSize: '18px', flexShrink: 0 }}>✓</span>
                <span style={{ fontSize: '15px', color: '#374151', fontWeight: 500, lineHeight: 1.5 }}>{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Best For ── */}
      <section style={{ padding: '72px 0', background: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="section-label">Who It's For</span>
            <h2 className="section-title" style={{ marginTop: '8px' }}>Which NYC Businesses Benefit Most</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {data.bestFor.map((b, i) => (
              <div key={i} style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '14px', padding: '24px 28px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>{b.type}</h3>
                <p style={{ fontSize: '14px', color: '#64748B', lineHeight: 1.65 }}>{b.reason}</p>
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
            <h2 className="section-title" style={{ marginTop: '8px' }}>Common Questions About {data.shortName}</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {data.faqs.map((faq, i) => (
              <div key={i} style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '24px 28px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>{faq.q}</h3>
                <p style={{ fontSize: '15px', color: '#4B5563', lineHeight: 1.7 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '80px 0', background: '#0A1628', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '600px' }}>
          <h2 style={{ fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 900, color: 'white', letterSpacing: '-0.025em' }}>
            Ready to Add {data.shortName} to Your NYC Business?
          </h2>
          <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.65, margin: '16px 0 32px' }}>
            Free site visit. No obligation. Installed within a week.
          </p>
          <a href="/#contact" className="btn btn-primary" style={{ fontSize: '17px', padding: '18px 40px', display: 'inline-block' }}>
            Request a Free Site Visit →
          </a>
        </div>
      </section>
    </main>
  )
}
