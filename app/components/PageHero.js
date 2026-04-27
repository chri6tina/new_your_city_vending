import Image from 'next/image'

/**
 * Shared hero component used across homepage, borough, neighborhood, and service pages.
 * Visual design is consistent — unique content (headline/sub/badge) makes each page distinct for SEO.
 *
 * Props:
 *  - badge       string  — small pill above headline
 *  - headline    string | ReactNode — the <h1> content
 *  - sub         string — paragraph below headline
 *  - primaryCta  { label, href }
 *  - secondaryCta { label, href } (optional)
 *  - pills       string[] — frosted trust pills at bottom
 *  - image       string — /public image path (default: NYC hero)
 *  - overlayColor string — rgba for the overlay gradient
 *  - minHeight   string — e.g. '92vh', '65vh'
 */
export default function PageHero({
  badge,
  headline,
  sub,
  primaryCta = { label: 'Request a Free Site Visit →', href: '/#contact' },
  secondaryCta = { label: 'See Our Services', href: '#services-section' },
  pills = ['✅ Free Installation', '🔄 Always Restocked', '🔧 Full Maintenance', '📝 No Contracts'],
  image = '/new_york_city_hero.jpg',
  overlayColor = 'rgba(5,15,35,0.70)',
  minHeight = '70vh',
}) {
  return (
    <section style={{
      position: 'relative',
      minHeight,
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
    }}>
      {/* Background photo */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Image
          src={image}
          alt="NYC Vending Services"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center top' }}
          priority
          quality={85}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(160deg, ${overlayColor} 0%, ${overlayColor.replace(/[\d.]+\)$/, v => `${Math.max(0, parseFloat(v) - 0.15)})`)} 100%)`,
        }} />
      </div>

      {/* Content */}
      <div className="container" style={{
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        padding: '120px 0 80px',
        maxWidth: '680px',
      }}>
        {/* Badge */}
        {badge && (
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255,255,255,0.12)',
            border: '1px solid rgba(255,255,255,0.28)',
            color: 'rgba(255,255,255,0.92)',
            fontSize: '13px',
            fontWeight: 600,
            padding: '8px 16px',
            borderRadius: '100px',
            width: 'fit-content',
            backdropFilter: 'blur(4px)',
          }}>
            {badge}
          </span>
        )}

        {/* Headline */}
        <h1 style={{
          fontSize: 'clamp(34px, 5vw, 58px)',
          fontWeight: 900,
          color: 'white',
          lineHeight: 1.07,
          letterSpacing: '-0.03em',
        }}>
          {headline}
        </h1>

        {/* Subtext */}
        {sub && (
          <p style={{
            fontSize: 'clamp(15px, 2vw, 18px)',
            color: 'rgba(255,255,255,0.82)',
            lineHeight: 1.65,
            maxWidth: '580px',
          }}>
            {sub}
          </p>
        )}

        {/* CTAs */}
        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
          <a href={primaryCta.href} style={{
            background: 'white',
            color: '#0A1628',
            fontSize: '16px',
            fontWeight: 800,
            padding: '15px 28px',
            borderRadius: '10px',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}>
            {primaryCta.label}
          </a>
          {secondaryCta && (
            <a href={secondaryCta.href} style={{
              color: 'rgba(255,255,255,0.88)',
              fontSize: '15px',
              fontWeight: 600,
              paddingBottom: '2px',
              borderBottom: '2px solid rgba(255,255,255,0.35)',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}>
              {secondaryCta.label}
            </a>
          )}
        </div>

        {/* Trust pills */}
        {pills && pills.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {pills.map(p => (
              <span key={p} style={{
                background: 'rgba(255,255,255,0.10)',
                border: '1px solid rgba(255,255,255,0.20)',
                color: 'rgba(255,255,255,0.82)',
                fontSize: '12px',
                fontWeight: 600,
                padding: '6px 14px',
                borderRadius: '100px',
                backdropFilter: 'blur(4px)',
              }}>
                {p}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
