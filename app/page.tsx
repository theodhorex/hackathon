'use client'

import React, { useState, useEffect, useRef, Suspense, lazy } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, Phone, ArrowRight, CheckCircle, BarChart3, Target, Users, TrendingUp } from 'lucide-react'
import SpotlightCard from './components/landing-page/SpotlightCard'
import CircularGallery from './components/landing-page/CircularGallery'
import Particles from './components/landing-page/Particles'
import router from 'next/router'

// Lazy load Spline
const Spline = lazy(() => import('@splinetool/react-spline'))

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
}

const staggerChildren = {
  animate: { transition: { staggerChildren: 0.1 } }
}

// Hero Spline Background Component with Galaxy Animation
function HeroSplineBackground() {
  return (
    <div className="absolute inset-0 z-0" style={{
      width: '100%',
      height: '100%',
      overflow: 'hidden',
    }}>
      <Suspense fallback={
        <div className="absolute inset-0 bg-black">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-black to-black" />
        </div>
      }>
        <Spline
          className="absolute inset-0"
          style={{
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
          }}
          scene="https://prod.spline.design/us3ALejTXl6usHZ7/scene.splinecode"
        />
      </Suspense>
      {/* Dimming overlay - makes galaxy 20% darker */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />
      {/* Gradient overlays for text readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(to right, rgba(0, 0, 0, 0.7), transparent 30%, transparent 70%, rgba(0, 0, 0, 0.7)),
            linear-gradient(to bottom, transparent 40%, rgba(0, 0, 0, 0.85))
          `,
        }}
      />
    </div>
  );
}

export default function OpticorePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [hoveredNavItem, setHoveredNavItem] = useState<string | null>(null)
  const [isMounted, setIsMounted] = useState(false)
  const heroContentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const services = [
    {
      icon: <Target size={32} />,
      title: 'Instant IP Verification',
      description: 'Verify the status of any IP in real time to determine whether it is registered, protected, or at risk of infringement—directly from your browser.'
    },
    {
      icon: <BarChart3 size={32} />,
      title: 'Seamless IP Registration',
      description: 'Register your IP with a fast, streamlined, and automated workflow that removes complexity and ensures validated ownership.'
    },
    {
      icon: <Users size={32} />,
      title: 'Yakoa-Powered Detection',
      description: 'Leverage our Yakoa integration for deeper detection, similarity analysis, and identification of potential fraud or plagiarism across digital platforms.'
    },
    {
      icon: <TrendingUp size={32} />,
      title: 'Compliance & Regulation Insights',
      description: 'Access regulatory insights to understand whether an IP is compliant, restricted, or potentially in violation of policy standards.'
    },
    {
      icon: <CheckCircle size={32} />,
      title: 'PeRisk Intelligence Dashboard',
      description: 'Monitor risks, infringement alerts, and IP status through a real-time analytics dashboard built for clarity and precision.'
    }
  ]

  const processSteps = [
    {
      number: '01',
      code: 'S-01',
      title: 'Scan',
      description: 'Activate the extension to instantly scan any IP or digital identifier. IP Shield gathers metadata and checks registration status in real time.'
    },
    {
      number: '02',
      code: 'S-02',
      title: 'Verify',
      description: 'Our system analyzes authenticity, ownership, similarity, and potential risks using integrated Yakoa intelligence and regulatory datasets.'
    },
    {
      number: '03',
      code: 'S-03',
      title: 'Evaluate',
      description: 'Receive a clear, structured result showing whether the IP is registered, unregistered, at risk, or potentially infringing.'
    },
    {
      number: '04',
      code: 'S-04',
      title: 'Register',
      description: 'If unregistered, proceed with a guided registration flow designed to be fast, compliant, and frictionless—directly through the extension.'
    }
  ]

  const clients = ['NIKE', 'ADIDAS', 'REEBOK', 'PUMA', 'VANS', 'CONVERSE', 'NEW BALANCE', 'UNDER ARMOUR']
  const partners = ['Microsoft', 'Google', 'Amazon', 'Oracle', 'IBM', 'Salesforce', 'SAP', 'Adobe']

  const stats = [
    { label: 'QUALITY', value: 95 },
    { label: 'EFFICIENCY', value: 88 },
    { label: 'RELIABILITY', value: 92 },
    { label: 'INNOVATION', value: 85 }
  ]

  const [particlesOpacity, setParticlesOpacity] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (heroContentRef.current) {
        requestAnimationFrame(() => {
          const scrollPosition = window.pageYOffset
          const maxScroll = 400
          const opacity = 1 - Math.min(scrollPosition / maxScroll, 1)
          if (heroContentRef.current) {
            heroContentRef.current.style.opacity = opacity.toString()
          }

          // Show Particles after product showcase section
          // Approximate position: hero (100vh) + partners (200px) + screenshot (800px) = ~1500px
          const productShowcaseEnd = window.innerHeight + 1000
          const particlesThreshold = productShowcaseEnd
          const newParticlesOpacity = Math.min((scrollPosition - particlesThreshold) / 400, 1)
          setParticlesOpacity(Math.max(0, newParticlesOpacity))
        })
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinkClass = (itemName: string) => {
    const isCurrentItemHovered = hoveredNavItem === itemName
    const isAnotherItemHovered = hoveredNavItem !== null && !isCurrentItemHovered
    const colorClass = isCurrentItemHovered ? 'text-white' : isAnotherItemHovered ? 'text-gray-500' : 'text-gray-300'
    return `text-sm transition duration-150 ${colorClass}`
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Particles Background - Appears after product showcase with gradient blend */}
      <div
        className="fixed inset-0 z-0 pointer-events-none transition-opacity duration-1000"
        style={{ opacity: particlesOpacity }}
      >
        {/* Gradient blend overlay to smoothly transition from dark sections above */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-transparent" style={{ height: '30%' }} />

        <Particles
          particleCount={150}
          particleSpread={15}
          speed={0.3}
          particleColors={['#a78bfa', '#ec4899', '#8b5cf6', '#ffffff']}
          moveParticlesOnHover={true}
          particleHoverFactor={0.5}
          alphaParticles={true}
          particleBaseSize={80}
          sizeRandomness={1.5}
          cameraDistance={20}
          disableRotation={false}
          pixelRatio={1}
        />
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 px-4 lg:px-8 py-4"
      >
        <div className="max-w-7xl mx-auto bg-black/40 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3">
          <div className="flex items-center justify-between">
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2">
              {/* <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">O</span>
              </div> */}
              <img className='w-8 h-8 rounded-lg' src="assets/main-logo.png" alt="" />
              <span className="text-lg font-bold tracking-wider">IP Shield</span>
            </motion.div>

            <div className="hidden lg:flex items-center gap-8">
              {['Home', 'About', 'Services', 'Process', 'Clients'].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  whileHover={{ scale: 1.05 }}
                  onMouseEnter={() => setHoveredNavItem(item)}
                  onMouseLeave={() => setHoveredNavItem(null)}
                  className={navLinkClass(item)}
                >
                  {item}
                </motion.a>
              ))}
            </div>

            <motion.button
              onClick={() => window.open("https://google.com", "_blank")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden lg:block px-6 py-2 bg-white text-black rounded-full text-sm font-semibold hover:bg-white/90 transition-all"
            >
              Get Extension
            </motion.button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden"
            >
              <div className="px-6 py-4 space-y-4">
                {['Home', 'About', 'Services', 'Process', 'Clients'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="block text-gray-300 hover:text-white transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
                <button className="w-full px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-sm font-semibold">
                  Start A Project
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav >

      {/* Hero Section with Spline Galaxy Animated Background */}
      < section id="home" className="relative min-h-screen flex items-center overflow-hidden" >
        <HeroSplineBackground />

        <div ref={heroContentRef} className="relative z-10 w-full pt-32 pb-20 px-4 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              variants={staggerChildren}
              initial="initial"
              animate="animate"
              className="text-center space-y-6"
            >
              <motion.div
                variants={fadeUp}
                className={`inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-xs uppercase tracking-wider text-white/70 ring-1 ring-white/10 backdrop-blur ${isMounted ? 'animate-fadeInUp' : 'opacity-0'}`}
              >
                <span className="h-2 w-2 rounded-full bg-purple-400 animate-pulse" />
                POWERED BY YAKOA INTELLIGENCE
                <img
                  src="assets/yakoa.png"
                  alt="Yakoa Logo"
                  className="h-4 w-4 object-contain"
                />
              </motion.div>

              <motion.h1
                variants={fadeUp}
                style={{ animationDelay: '200ms' }}
                className={`text-5xl lg:text-8xl font-black tracking-tight leading-none ${isMounted ? 'animate-fadeInUp' : 'opacity-0'}`}
              >
                Bring Trust and Clarity <br /> to Every Digital Asset. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600">
                  IP Shield
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                style={{ animationDelay: '300ms' }}
                className={`max-w-3xl mx-auto text-base lg:text-xl text-gray-300 leading-relaxed ${isMounted ? 'animate-fadeInUp' : 'opacity-0'}`}
              >
                Experience instant IP verification and advanced similarity detection through a seamless browser extension powered by Yakoa intelligence.
              </motion.p>

              <motion.div
                variants={fadeUp}
                style={{ animationDelay: '400ms' }}
                className={`flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 ${isMounted ? 'animate-fadeInUp' : 'opacity-0'}`}
              >
                <button className="px-8 py-3 bg-white text-black rounded-full text-sm font-semibold hover:bg-white/90 transition-all shadow-lg flex items-center gap-2">
                  Get Extension
                  <ArrowRight size={16} />
                </button>

                <button className="px-8 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-semibold hover:bg-white/20 transition-all flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                  How It Works?
                </button>
              </motion.div>

              <motion.div
                variants={fadeUp}
                style={{ animationDelay: '500ms' }}
                className={`flex items-center justify-center gap-4 pt-8 ${isMounted ? 'animate-fadeInUp' : 'opacity-0'}`}
              >
                {['DC', 'YT', 'X'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-sm hover:bg-white/10 transition-all"
                  >
                    {social}
                  </a>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        >
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/50 to-transparent" />
          <div className="w-8 h-8 border border-white/30 rounded-full flex items-center justify-center">
            <ChevronDown size={16} />
          </div>
        </motion.div>
      </section >

      {/* Partners Section */}
      < section className="relative z-20 py-16 px-4 lg:px-8 bg-black/50" >
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-sm text-gray-500 uppercase tracking-wider mb-8">Trusted By Industry Leaders</p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-50">
            {partners.map((brand) => (
              <div key={brand} className="text-sm font-semibold text-white/70 hover:text-white/90 transition-all">
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section >

      {/* Interactive Screenshot Section with CircularGallery */}
      < section className="relative z-20 py-20 px-4 lg:px-8 overflow-hidden bg-black" >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-xs tracking-[0.3em] text-purple-400 font-semibold uppercase mb-4 block">
              Product Showcase
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              See IP Shield In Action
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8">
              Experience the power of instant verification and intelligent detection right from your browser
            </p>
          </motion.div>

          <div className="w-full h-[600px] md:h-[700px]">
            <CircularGallery
              items={[
                {
                  image: '/assets/screenshot-demo/Cuplikan layar 2025-12-08 223547.png',
                  text: ''
                },
                {
                  image: '/assets/screenshot-demo/Cuplikan layar 2025-12-08 223619.png',
                  text: ''
                },
                {
                  image: '/assets/screenshot-demo/Cuplikan layar 2025-12-08 223707.png',
                  text: ''
                },
                {
                  image: '/assets/screenshot-demo/Cuplikan layar 2025-12-08 223829.png',
                  text: ''
                },
                {
                  image: '/assets/screenshot-demo/Cuplikan layar 2025-12-08 223934.png',
                  text: ''
                },
                {
                  image: '/assets/screenshot-demo/Cuplikan layar 2025-12-08 224139.png',
                  text: ''
                },
                {
                  image: '/assets/screenshot-demo/Cuplikan layar 2025-12-08 224258.png',
                  text: ''
                }
              ]}
              bend={3}
              textColor="#a78bfa"
              borderRadius={0.05}
              font="600 28px 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
              scrollSpeed={0.5}
              scrollEase={0.05}
            />
          </div>
        </div>
      </section >

      {/* About Section */}
      < section id="about" className="relative py-32 px-4 lg:px-8" >
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <h2 className="text-[120px] lg:text-[200px] font-black leading-none text-white/5 tracking-tighter">
              ABOUT
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6 pt-8"
          >
            <span className="text-xs tracking-[0.3em] text-purple-400 font-semibold uppercase">
              Who We Are
            </span>

            <h3 className="text-2xl lg:text-3xl font-bold leading-tight">
              Redefining how the world verifies and secures IP through instant, intelligent, and transparent technology.
            </h3>

            <p className="text-gray-400 leading-relaxed">
              IP Shield is a next-generation verification platform engineered to bring clarity and trust to the digital space. Built by a multidisciplinary team blending cybersecurity, regulatory intelligence, and modern product engineering, we transform a complex IP workflow into a frictionless experience—right from your browser. Powered by seamless integration with Yakoa, IP Shield delivers enhanced detection accuracy, deeper intelligence, and broader protection coverage for every digital asset. Our mission is simple: empower creators, developers, and businesses to instantly validate ownership, detect risks, and register their IP with confidence. With a focus on automation, precision, and real-time insight, we are shaping the future of digital asset protection.
            </p>

            <div className="flex items-center gap-3 pt-4">
              <button className="px-6 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-semibold hover:bg-white/20 transition-all flex items-center gap-2">
                READ MORE
                <ArrowRight size={14} />
              </button>
              <button className="w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center">
                <Phone size={16} />
              </button>
            </div>
          </motion.div>
        </div>
      </section >

      {/* Services Section */}
      < section id="services" className="relative py-32 px-4 lg:px-8 bg-black/20" >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-xs tracking-[0.3em] text-purple-400 font-semibold uppercase mb-4 block">
              What We Do
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Protect and Verify Digital Assets<br /> With Intelligent IP Shield Solutions
            </h2>
          </motion.div>

          {/* First row - 3 items */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {services.slice(0, 3).map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 space-y-4 hover:bg-white/10 transition-all group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold">{service.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{service.description}</p>
                <button className="flex items-center gap-2 text-sm font-semibold text-purple-400 hover:gap-3 transition-all">
                  LEARN MORE
                  <ArrowRight size={14} />
                </button>
              </motion.div>
            ))}
          </div>

          {/* Second row - 2 items centered */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {services.slice(3, 5).map((service, index) => (
              <motion.div
                key={index + 3}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (index + 3) * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 space-y-4 hover:bg-white/10 transition-all group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold">{service.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{service.description}</p>
                <button className="flex items-center gap-2 text-sm font-semibold text-purple-400 hover:gap-3 transition-all">
                  LEARN MORE
                  <ArrowRight size={14} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section >

      {/* Process Section */}
      < section id="process" className="relative py-32 px-4 lg:px-8" >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <span className="text-xs tracking-[0.3em] text-purple-400 font-semibold uppercase mb-4 block">
              How It Works
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold">A Simple, Intelligent Workflow for IP Verification</h2>
          </motion.div>

          <div className="space-y-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all group"
              >
                <div className="grid lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-2">
                    <span className="text-5xl font-black text-white/10">{step.number}</span>
                  </div>
                  <div className="lg:col-span-3">
                    <h3 className="text-4xl font-black tracking-tight">{step.code}</h3>
                    <span className="text-xs tracking-[0.2em] text-gray-500 uppercase">{step.title}</span>
                  </div>
                  <div className="lg:col-span-6">
                    <p className="text-gray-400 leading-relaxed">{step.description}</p>
                  </div>
                  <div className="lg:col-span-1 flex justify-end">
                    <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center group-hover:bg-purple-500/20 group-hover:border-purple-500/50 transition-all">
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section >

      {/* Why IP Shield Section with SpotlightCards */}
      < section id="clients" className="relative py-32 px-4 lg:px-8 bg-black/20" >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl lg:text-7xl font-black mb-8">
              Why <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                IP Shield?
              </span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Trusted By Creators & Developers
            </p>
          </motion.div>

          {/* SpotlightCards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 - Instant IP Verification */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0 }}
            >
              <SpotlightCard className="h-full" spotlightColor="rgba(168, 85, 247, 0.25)">
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4">
                    <Target className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-white">Instant IP Verification</h3>
                  <p className="text-gray-400 leading-relaxed mb-4">
                    Verify the registration status of any IP in real time. IP Shield analyzes official records and metadata instantly from your browser.
                  </p>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-full">
                    <span className="text-xs font-semibold text-purple-400">&lt;1 second response time</span>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>

            {/* Card 2 - Advanced Similarity Detection */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <SpotlightCard className="h-full" spotlightColor="rgba(236, 72, 153, 0.25)">
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center mb-4">
                    <CheckCircle className="w-6 h-6 text-pink-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-white">Advanced Similarity Detection</h3>
                  <p className="text-gray-400 leading-relaxed mb-4">
                    Integrated with Yakoa to detect duplicates, similarity patterns, and potential IP fraud using AI-powered fingerprinting.
                  </p>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-pink-500/10 border border-pink-500/20 rounded-full">
                    <span className="text-xs font-semibold text-pink-400">98% similarity-matching accuracy</span>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>

            {/* Card 3 - One-Click IP Registration */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <SpotlightCard className="h-full" spotlightColor="rgba(59, 130, 246, 0.25)">
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-white">One-Click IP Registration</h3>
                  <p className="text-gray-400 leading-relaxed mb-4">
                    Register your IP through a guided, automated flow that simplifies the entire process with validated ownership.
                  </p>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full">
                    <span className="text-xs font-semibold text-blue-400">97% successful submissions</span>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>

            {/* Card 4 - Compliance Intelligence */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <SpotlightCard className="h-full" spotlightColor="rgba(34, 197, 94, 0.25)">
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4">
                    <BarChart3 className="w-6 h-6 text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-white">Compliance Intelligence</h3>
                  <p className="text-gray-400 leading-relaxed mb-4">
                    Instantly understand whether an IP is compliant or in potential violation of key regulations, policies, or licensing rules.
                  </p>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full">
                    <span className="text-xs font-semibold text-green-400">Covers major global frameworks</span>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>

            {/* Card 5 - Risk Scoring System */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <SpotlightCard className="h-full" spotlightColor="rgba(249, 115, 22, 0.25)">
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-orange-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-white">Risk Scoring System</h3>
                  <p className="text-gray-400 leading-relaxed mb-4">
                    Receive a clear fraud-risk score with insight on red flags, duplication, and potential misuse across digital platforms.
                  </p>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-500/10 border border-orange-500/20 rounded-full">
                    <span className="text-xs font-semibold text-orange-400">Real-time risk alerts</span>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>

            {/* Card 6 - Browser-Native Extension */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <SpotlightCard className="h-full" spotlightColor="rgba(168, 85, 247, 0.25)">
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4">
                    <ArrowRight className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-white">Browser-Native Extension</h3>
                  <p className="text-gray-400 leading-relaxed mb-4">
                    Access instant IP verification and registration directly from your browser. No dashboards, no extra tools—everything happens in a lightweight, extension-first workflow.
                  </p>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-full">
                    <span className="text-xs font-semibold text-purple-400">One-click access anytime</span>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          </div>
        </div>
      </section >

      {/* Footer */}
      < footer className="relative py-16 px-4 lg:px-8 border-t border-white/10" >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                {/* <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500" /> */}
                <img className='w-8 h-8 rounded-lg' src="assets/main-logo.png" alt="" />
                <span className="text-xl font-bold">IP Shield</span>
              </div>
              <p className="text-sm text-gray-400 mb-4">Real-time IP Verification & Protection</p>
              <div className="flex gap-3">
                {['DC', 'YT', 'X'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-8 h-8 bg-white/5 border border-white/10 rounded flex items-center justify-center text-xs hover:bg-white/10 transition-all"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Our Mission</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Team</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Product / Features Section</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Extension</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>hello@wagmidev.xyz</li>
                <li>Built by WAGMI Dev</li>
              </ul>
            </div>
          </div>

          <div className="text-center pt-8 border-t border-white/10">
            <p className="text-sm text-gray-500">
              © 2025 WAGMI Dev. Powered by Yakoa Intelligence. All rights reserved.
            </p>
          </div>
        </div>
      </footer >

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>

    </div >
  )
}