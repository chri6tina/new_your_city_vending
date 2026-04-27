import PageHero from './PageHero'

const boroughs = ['Manhattan', 'Brooklyn', 'Queens', 'The Bronx', 'Staten Island']

export default function Hero() {
  return (
    <>
      <PageHero
        badge="🏠 Family Owned & Operated · Serving NYC Since 2005"
        headline={
          <>
            Your Neighborhood<br />
            <span style={{
              textDecoration: 'underline',
              textDecorationColor: 'rgba(255,255,255,0.35)',
              textUnderlineOffset: '6px',
              textDecorationThickness: '3px',
            }}>
              Vending &amp; Micro Market
            </span><br />
            Experts in New York City
          </>
        }
        sub="We bring vending machines, micro markets, coffee stations, and pantry services to New York businesses — completely free to install and maintain."
        primaryCta={{ label: 'Request a Free Site Visit →', href: '#contact' }}
        secondaryCta={{ label: 'See Our Services', href: '#services' }}
        pills={[...boroughs.map(b => `📍 ${b}`)]}
        overlayColor="rgba(5,15,35,0.72)"
        minHeight="92vh"
      />

      {/* Trust stats row */}
      <div style={{
        background: 'white',
        borderBottom: '1px solid #E2E8F0',
        padding: '20px 0',
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {[
            { stat: '20+', label: 'Years in NYC' },
            { stat: '500+', label: 'Businesses Served' },
            { stat: '5–7 Day', label: 'Install Turnaround' },
            { stat: '$0', label: 'Cost to Your Business' },
          ].map((item, i) => (
            <div key={item.stat} style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                <span style={{ fontSize: '22px', fontWeight: 900, color: '#0A1628', lineHeight: 1 }}>{item.stat}</span>
                <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 500 }}>{item.label}</span>
              </div>
              {i < 3 && <div style={{ width: '1px', height: '36px', background: '#E2E8F0' }} />}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
