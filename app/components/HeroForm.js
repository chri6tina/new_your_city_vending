'use client'

import { useState } from 'react'
import styles from './HeroForm.module.css'

const services = [
  'Traditional Vending',
  'AI Smart Vending',
  'Micro Market',
  'Coffee Services',
  'Pantry Services',
  'Not Sure — Show Me Options',
]

const employeeCounts = [
  '1 – 10',
  '11 – 25',
  '26 – 50',
  '51 – 100',
  '101 – 250',
  '250+',
]

export default function HeroForm() {
  const [form, setForm] = useState({
    name: '', company: '', employees: '', service: '', email: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('https://formspree.io/f/meevbjrd', {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setSubmitted(true)
      } else {
        setError('Something went wrong. Please try again.')
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className={styles.card}>
        <div className={styles.success}>
          <div className={styles.successIcon}>✅</div>
          <h3>We&apos;ll Be in Touch!</h3>
          <p>Our NYC team will reach out within 2 business hours.</p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <span className={styles.cardBadge}>📋 Quick & Easy — No Obligation</span>
        <h3 className={styles.cardTitle}>Request a Free Site Visit</h3>
        <p className={styles.cardSubtitle}>We&apos;ll come to you and find the right fit</p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        {/* Row 1: Name + Company */}
        <div className={styles.row}>
          <input
            className={styles.input}
            type="text"
            placeholder="Your Name *"
            required
            value={form.name}
            onChange={set('name')}
          />
          <input
            className={styles.input}
            type="text"
            placeholder="Company Name *"
            required
            value={form.company}
            onChange={set('company')}
          />
        </div>

        {/* Row 2: Employees + Service */}
        <div className={styles.row}>
          <select
            className={`${styles.input} ${styles.select}`}
            required
            value={form.employees}
            onChange={set('employees')}
          >
            <option value="">No. of Employees *</option>
            {employeeCounts.map(e => <option key={e} value={e}>{e} employees</option>)}
          </select>
          <select
            className={`${styles.input} ${styles.select}`}
            value={form.service}
            onChange={set('service')}
          >
            <option value="">Service Interested In</option>
            {services.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>

        {/* Row 3: Email */}
        <input
          className={styles.input}
          type="email"
          placeholder="Email Address *"
          required
          value={form.email}
          onChange={set('email')}
        />

        <button type="submit" className={styles.submit} disabled={loading}>
          {loading ? 'Sending…' : 'Get My Free Quote →'}
        </button>

        {error && <p style={{ color: 'red', fontSize: '13px', textAlign: 'center' }}>{error}</p>}
        <p className={styles.disclaimer}>🔒 No spam. No cost. No obligation.</p>
      </form>
    </div>
  )
}
