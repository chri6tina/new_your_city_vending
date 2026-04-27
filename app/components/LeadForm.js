'use client'
import { useState } from 'react'

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/meevbjrd'

export default function LeadForm({ locationContext = 'New York City' }) {
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('loading')
    const form = e.target
    const data = Object.fromEntries(new FormData(form))
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" style={{
      background: 'linear-gradient(160deg, #0A1628 0%, #0f2240 100%)',
      padding: '80px 0',
    }}>
      <div className="container" style={{ maxWidth: '760px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span style={{
            display: 'inline-block',
            background: 'rgba(255,255,255,0.12)',
            border: '1px solid rgba(255,255,255,0.22)',
            color: 'rgba(255,255,255,0.85)',
            fontSize: '12px', fontWeight: 700,
            padding: '6px 16px', borderRadius: '100px',
            letterSpacing: '0.06em', textTransform: 'uppercase',
            marginBottom: '16px',
          }}>
            Free — No Obligation
          </span>
          <h2 style={{
            fontSize: 'clamp(26px, 4vw, 40px)',
            fontWeight: 900, color: 'white',
            lineHeight: 1.1, letterSpacing: '-0.025em',
          }}>
            Get Free Vending Service in<br />
            <span style={{ color: '#FCD34D' }}>{locationContext}</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '16px', marginTop: '12px', lineHeight: 1.6 }}>
            Fill out the form — we'll follow up within 24 hours with a custom recommendation for your space.
          </p>
        </div>

        {status === 'success' ? (
          <div style={{
            background: 'rgba(22,163,74,0.15)',
            border: '1px solid rgba(22,163,74,0.4)',
            borderRadius: '16px', padding: '40px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
            <h3 style={{ color: 'white', fontSize: '22px', fontWeight: 800, marginBottom: '8px' }}>
              We Got Your Request!
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px' }}>
              Expect a response within 24 hours. We look forward to serving your {locationContext} business.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '20px', padding: '40px',
            backdropFilter: 'blur(8px)',
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {/* Name */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontWeight: 600 }}>
                  Your Name *
                </label>
                <input
                  name="name" required
                  placeholder="Jane Smith"
                  style={inputStyle}
                />
              </div>

              {/* Business Name */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontWeight: 600 }}>
                  Business Name *
                </label>
                <input
                  name="business" required
                  placeholder="Acme Corp"
                  style={inputStyle}
                />
              </div>

              {/* Email */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontWeight: 600 }}>
                  Email Address *
                </label>
                <input
                  name="email" type="email" required
                  placeholder="jane@company.com"
                  style={inputStyle}
                />
              </div>

              {/* Phone */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontWeight: 600 }}>
                  Phone Number
                </label>
                <input
                  name="phone" type="tel"
                  placeholder="(212) 555-0100"
                  style={inputStyle}
                />
              </div>

              {/* Location */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontWeight: 600 }}>
                  Your Neighborhood / Borough *
                </label>
                <input
                  name="location" required
                  defaultValue={locationContext !== 'New York City' ? locationContext : ''}
                  placeholder="e.g. Williamsburg, Brooklyn"
                  style={inputStyle}
                />
              </div>

              {/* Team Size */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontWeight: 600 }}>
                  Team Size
                </label>
                <select name="teamSize" style={{ ...inputStyle, cursor: 'pointer' }}>
                  <option value="">Select...</option>
                  <option value="20-49">20–49 employees</option>
                  <option value="50-99">50–99 employees</option>
                  <option value="100-249">100–249 employees</option>
                  <option value="250+">250+ employees</option>
                </select>
              </div>

              {/* Service Interest — full width */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', gridColumn: '1 / -1' }}>
                <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontWeight: 600 }}>
                  Service You're Interested In
                </label>
                <select name="service" style={{ ...inputStyle, cursor: 'pointer' }}>
                  <option value="">Not sure — show me options</option>
                  <option value="vending-machine">Traditional Vending Machine</option>
                  <option value="ai-vending">AI Smart Vending</option>
                  <option value="micro-market">Micro Market</option>
                  <option value="coffee">Office Coffee Service</option>
                  <option value="pantry">Pantry Service</option>
                  <option value="custom">Custom / Multiple Services</option>
                </select>
              </div>

              {/* Message — full width */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', gridColumn: '1 / -1' }}>
                <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontWeight: 600 }}>
                  Anything else we should know?
                </label>
                <textarea
                  name="message" rows={3}
                  placeholder="Tell us about your space, any specific needs, or questions..."
                  style={{ ...inputStyle, resize: 'vertical', minHeight: '80px' }}
                />
              </div>
            </div>

            {status === 'error' && (
              <p style={{ color: '#FCA5A5', fontSize: '14px', marginTop: '12px', textAlign: 'center' }}>
                Something went wrong. Please try again or call us directly.
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              style={{
                width: '100%', marginTop: '24px',
                background: status === 'loading' ? 'rgba(255,255,255,0.5)' : 'white',
                color: '#0A1628', fontSize: '16px', fontWeight: 800,
                padding: '16px', borderRadius: '12px',
                border: 'none', cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                transition: 'opacity 0.2s',
              }}
            >
              {status === 'loading' ? 'Sending...' : 'Request My Free Site Visit →'}
            </button>

            <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: '12px', marginTop: '12px' }}>
              🔒 No spam. No contracts. We respond within 24 hours.
            </p>
          </form>
        )}
      </div>
    </section>
  )
}

const inputStyle = {
  background: 'rgba(255,255,255,0.08)',
  border: '1px solid rgba(255,255,255,0.18)',
  borderRadius: '10px',
  padding: '12px 16px',
  color: 'white',
  fontSize: '15px',
  outline: 'none',
  width: '100%',
  boxSizing: 'border-box',
  fontFamily: 'inherit',
}
