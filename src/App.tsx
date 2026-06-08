import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TrustedCompanies from './components/TrustedCompanies'
import WhyHireTeens from './components/WhyHireTeens'
import HowItWorks from './components/HowItWorks'
import SuccessStories from './components/SuccessStories'
import Stats from './components/Stats'
import Pricing from './components/Pricing'
import CTA from './components/CTA'
import Footer from './components/Footer'
import LoginModal from './components/LoginModal'
import BookDemoModal from './components/BookDemoModal'

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isDemoOpen, setIsDemoOpen] = useState(false)

  const openLogin = () => setIsLoginOpen(true)
  const closeLogin = () => setIsLoginOpen(false)
  const openDemo = () => setIsDemoOpen(true)
  const closeDemo = () => setIsDemoOpen(false)

  // Smooth scroll helper shared across components
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 80
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = element.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar
        onLogin={openLogin}
        onHireTeens={() => scrollToSection('cta')}
        scrollToSection={scrollToSection}
        scrollToTop={scrollToTop}
      />
      <main>
        <Hero
          onHireTeens={() => scrollToSection('cta')}
          onBookDemo={openDemo}
        />
        <TrustedCompanies />
        <WhyHireTeens />
        <HowItWorks />
        <SuccessStories />
        <Stats />
        <Pricing />
        <CTA
          onHireTeens={() => scrollToSection('cta')}
          onBookDemo={openDemo}
        />
      </main>
      <Footer
        scrollToSection={scrollToSection}
        scrollToTop={scrollToTop}
      />

      {/* Modals */}
      <LoginModal isOpen={isLoginOpen} onClose={closeLogin} />
      <BookDemoModal isOpen={isDemoOpen} onClose={closeDemo} />
    </div>
  )
}

export default App
