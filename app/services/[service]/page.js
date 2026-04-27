import { notFound } from 'next/navigation'
import PageHero from '../../../components/PageHero'
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
      <PageHero
        badge={`${data.icon} Free for Qualifying NYC Businesses · ${data.idealFor}`}
        headline={<><span style={{ textDecoration: 'underline', textDecorationColor: 'rgba(255,255,255,0.35)', textUnderlineOffset: '6px', textDecorationThickness: '3px' }}>{data.name}</span><br />for NYC Businesses</>}
        sub={`${data.tagline}. ${data.description}`}
        primaryCta={{ label: 'Request Free Installation →', href: '/#contact' }}
        secondaryCta={{ label: "See What's Included", href: '#features-section' }}
        pills={[`✅ Free Installation`, `📅 Installed in ${data.installTime}`, '🔄 Always Restocked', '📝 No Contracts']}
        image={data.image}
        overlayColor="rgba(5,15,35,0.68)"
        minHeight="65vh"
      />

      {/* ── Features ── */}
      <section id="features-section" style={{ padding: '72px 0', background: '#F8FAFC' }}>
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
