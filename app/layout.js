import { Inter } from 'next/font/google'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LeadForm from './components/LeadForm'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata = {
  title: 'New York City Vending | Free Vending Machine Installation — All 5 Boroughs',
  description: "NYC's premier vending machine service provider. Free installation, zero cost to your business. Micro markets, AI vending, coffee services & pantry — serving Manhattan, Brooklyn, Queens, Bronx & Staten Island.",
  keywords: 'vending machine NYC, micro market New York, office coffee service NYC, AI vending machine, pantry service New York, free vending machine installation',
  verification: {
    google: 'GmE9TaqA728CsH3vtA9F5L8T4MS2w7bK_vsubWa6xx4',
  },
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Disable scroll restoration before browser can jump down on refresh */}
        <script dangerouslySetInnerHTML={{ __html: `if('scrollRestoration' in history){history.scrollRestoration='manual';}` }} />
      </head>
      <body>
        <Navbar />
        {children}
        <LeadForm />
        <Footer />
      </body>
    </html>
  )
}
