'use client'

import { useState } from 'react'
import styles from './Contact.module.css'

const services = [
  'Traditional Vending', 'AI Smart Vending', 'Micro Market',
  'Coffee Services', 'Pantry Services', 'Custom / Not Sure',
]
const boroughs = ['Manhattan', 'Brooklyn', 'Queens', 'The Bronx', 'Staten Island', 'Other / Outside NYC']

export default function Contact() {
  const [form, setForm] = useState({ name: '', company: '', phone: '', email: '', borough: '', service: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: wire to real backend / email service
    setSubmitted(true)
  }

  return (
    <section className={styles.section} id="contact">
      <div className="container">
        <div className={styles.layout}>
          {/* Left info */}
          <div className={styles.info}>
            <span className="section-label">Get in Touch</span>
            <h2 className="section-title" style={{ color: 'white' }}>
              Get a Free Quote Today
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.72)', marginTop: 14, fontSize: 16, lineHeight: 1.65 }}>
              Fill out the form and our NYC team will get back to you within 2 business hours. Most locations are up and running within a week.
            </p>

            <div className={styles.contactDetails}>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>⏱️</span>
                <div>
                  <div className={styles.contactLabel}>Response Time</div>
                  <div className={styles.contactValue}>Within 2 business hours</div>
                </div>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>✅</span>
                <div>
                  <div className={styles.contactLabel}>Zero Cost</div>
                  <div className={styles.contactValue}>Free installation, no contracts</div>
                </div>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>📍</span>
                <div>
                  <div className={styles.contactLabel}>Service Area</div>
                  <div className={styles.contactValue}>All 5 NYC Boroughs + LI, Westchester, NJ</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right form */}
          <div className={styles.formWrap}>
            {submitted ? (
              <div className={styles.success}>
                <div className={styles.successIcon}>✅</div>
                <h3>We Got Your Request!</h3>
                <p>Our team will reach out within 2 business hours. Thank you!</p>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label className={styles.label}>Full Name *</label>
                    <input className={styles.input} type="text" required placeholder="John Smith" value={form.name} onChange={set('name')} />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Company Name *</label>
                    <input className={styles.input} type="text" required placeholder="Acme Corp" value={form.company} onChange={set('company')} />
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label className={styles.label}>Phone Number *</label>
                    <input className={styles.input} type="tel" required placeholder="(212) 555-0000" value={form.phone} onChange={set('phone')} />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Email Address *</label>
                    <input className={styles.input} type="email" required placeholder="john@company.com" value={form.email} onChange={set('email')} />
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label className={styles.label}>Borough / Location *</label>
                    <select className={styles.input} required value={form.borough} onChange={set('borough')}>
                      <option value="">Select borough…</option>
                      {boroughs.map(b => <option key={b}>{b}</option>)}
                    </select>
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Service Interested In</label>
                    <select className={styles.input} value={form.service} onChange={set('service')}>
                      <option value="">Select service…</option>
                      {services.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Additional Details</label>
                  <textarea className={`${styles.input} ${styles.textarea}`} placeholder="Tell us about your space, number of employees, etc." rows={4} value={form.message} onChange={set('message')} />
                </div>
                <button type="submit" className={`btn btn-primary ${styles.submit}`}>
                  Send My Free Quote Request →
                </button>
                <p className={styles.disclaimer}>No obligation. No cost. We&apos;ll never spam you.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
