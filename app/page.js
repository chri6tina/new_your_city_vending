import Hero from './components/Hero'
import Services from './components/Services'
import WhyUs from './components/WhyUs'
import HowItWorks from './components/HowItWorks'
import Testimonials from './components/Testimonials'
import ServiceArea from './components/ServiceArea'
import Contact from './components/Contact'

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <WhyUs />
      <HowItWorks />
      <Testimonials />
      <ServiceArea />
      <Contact />
    </main>
  )
}
