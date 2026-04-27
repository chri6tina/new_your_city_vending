'use client'

import { useState } from 'react'
import Link from 'next/link'
import styles from './Navbar.module.css'

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Service Area', href: '#service-area' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className={styles.header}>
      {/* Top bar */}
      <div className={styles.topBar}>
        <div className="container">
          <span>🗽 Serving All 5 NYC Boroughs &nbsp;·&nbsp; Free Installation &nbsp;·&nbsp; No Contracts &nbsp;·&nbsp; <a href="#contact" className={styles.topPhone}>Get a Free Quote →</a></span>
        </div>
      </div>

      {/* Main nav */}
      <nav className={styles.nav} aria-label="Main navigation">
        <div className={`container ${styles.navInner}`}>
          {/* Logo */}
          <Link href="/" className={styles.logo} onClick={() => setOpen(false)}>
            <span className={styles.logoMark}>NYC</span>
            <span className={styles.logoText}>Vending</span>
          </Link>

          {/* Desktop links */}
          <ul className={styles.navLinks}>
            {navLinks.map(l => (
              <li key={l.href}>
                <a href={l.href} className={styles.navLink}>{l.label}</a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <a href="#contact" className={`btn btn-primary ${styles.ctaBtn}`}>
            Get a Free Quote
          </a>

          {/* Hamburger */}
          <button
            className={styles.hamburger}
            onClick={() => setOpen(o => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <span className={`${styles.bar} ${open ? styles.barOpen1 : ''}`} />
            <span className={`${styles.bar} ${open ? styles.barOpen2 : ''}`} />
            <span className={`${styles.bar} ${open ? styles.barOpen3 : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className={styles.drawer}>
          <ul className={styles.drawerLinks}>
            {navLinks.map(l => (
              <li key={l.href}>
                <a href={l.href} className={styles.drawerLink} onClick={() => setOpen(false)}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#contact" className={`btn btn-primary ${styles.drawerCta}`}>
            Get a Free Quote
          </a>
        </div>
      )}
    </header>
  )
}
