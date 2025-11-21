import React, { useEffect, useState, useRef } from 'react';

export default function VelocityLanding() {
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const observerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    // Intersection Observer for scroll animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.observe').forEach((el) => {
      observerRef.current.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">
      {/* Ultra Advanced Animated Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Animated gradient orbs with mouse interaction */}
        <div className="absolute inset-0">
          <div 
            className="orb orb-1" 
            style={{
              transform: `translate(${mousePos.x * 0.02}px, ${mousePos.y * 0.02}px)`
            }}
          />
          <div 
            className="orb orb-2"
            style={{
              transform: `translate(${-mousePos.x * 0.015}px, ${mousePos.y * 0.015}px)`
            }}
          />
          <div className="orb orb-3" />
          <div className="orb orb-4" />
          <div className="orb orb-5" />
        </div>
        
        {/* Advanced geometric shapes */}
        <div className="absolute inset-0">
          {/* Animated Wireframe Cubes */}
          <div className="cube-container cube-1">
            <div className="cube">
              <div className="cube-face front"></div>
              <div className="cube-face back"></div>
              <div className="cube-face right"></div>
              <div className="cube-face left"></div>
              <div className="cube-face top"></div>
              <div className="cube-face bottom"></div>
            </div>
          </div>
          
          <div className="cube-container cube-2">
            <div className="cube">
              <div className="cube-face front"></div>
              <div className="cube-face back"></div>
              <div className="cube-face right"></div>
              <div className="cube-face left"></div>
              <div className="cube-face top"></div>
              <div className="cube-face bottom"></div>
            </div>
          </div>

          {/* Spiraling Pentagon */}
          <div className="pentagon pent-1" />
          <div className="pentagon pent-2" />
          
          {/* Morphing Blobs */}
          <div className="blob blob-1" />
          <div className="blob blob-2" />
          <div className="blob blob-3" />
          
          {/* Orbital Rings */}
          <div className="orbital-ring ring-1">
            <div className="ring-dot"></div>
          </div>
          <div className="orbital-ring ring-2">
            <div className="ring-dot"></div>
          </div>
          <div className="orbital-ring ring-3">
            <div className="ring-dot"></div>
          </div>
          
          {/* Wave Lines */}
          <svg className="wave-svg wave-1" viewBox="0 0 1200 300">
            <path d="M0,150 Q300,50 600,150 T1200,150" fill="none" stroke="rgba(255, 140, 66, 0.3)" strokeWidth="2"/>
          </svg>
          <svg className="wave-svg wave-2" viewBox="0 0 1200 300">
            <path d="M0,150 Q300,250 600,150 T1200,150" fill="none" stroke="rgba(239, 68, 68, 0.3)" strokeWidth="2"/>
          </svg>
        </div>

        {/* Particle System */}
        <div className="particles">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="particle-advanced"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 15}s`,
                animationDuration: `${10 + Math.random() * 20}s`
              }}
            />
          ))}
        </div>

        {/* Dynamic Mesh Grid */}
        <div className="mesh-grid" />
        
        {/* Scan lines */}
        <div className="scan-line scan-horizontal" />
        <div className="scan-line scan-vertical" />
      </div>

      {/* Navigation with advanced animation */}
      <nav className="relative z-50 px-6 md:px-12 py-6 flex items-center justify-between nav-reveal">
        <div className="flex items-center space-x-2 logo-bounce">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center transform hover:rotate-180 transition-transform duration-500">
            <span className="text-white font-bold">V</span>
          </div>
          <span className="text-xl font-bold">Velocity</span>
        </div>
        <div className="hidden md:flex space-x-8 text-sm nav-items">
          {['Why Velocity', 'How It Works', 'Feedback', 'Testimonials', 'Pricing'].map((item, i) => (
            <a 
              key={i} 
              href="#" 
              className="hover:text-orange-400 transition-all hover:scale-110 nav-item"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {item}
            </a>
          ))}
        </div>
        <div className="flex space-x-4 btn-group">
          <button className="px-6 py-2 border border-white rounded-full hover:bg-white hover:text-black transition-all transform hover:scale-110 hover:rotate-2">
            Projects
          </button>
          <button className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-600 rounded-full hover:shadow-xl hover:shadow-orange-500/50 transition-all transform hover:scale-110 hover:-rotate-2 pulse-btn">
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section with magnetic effect */}
      <section className="relative z-10 px-6 md:px-12 py-20 md:py-32 text-center">
        <div className="observe inline-block mb-6 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm badge-float">
          Overall turnkey founders we work 🔥
        </div>
        <h1 className="observe text-5xl md:text-7xl font-bold mb-6 hero-title">
          Launch faster.
          <br />
          <span className="bg-gradient-to-r from-orange-400 via-red-500 to-orange-600 bg-clip-text text-transparent gradient-text">
            Convert better.
          </span>
        </h1>
        <p className="observe text-gray-400 text-lg mb-8 max-w-2xl mx-auto hero-subtitle">
          We Design Landing Pages That Help Your Product
          <br />
          Launch Faster And Grow Forever
        </p>
        <div className="observe flex flex-col sm:flex-row gap-4 justify-center mb-12 hero-buttons">
          <button className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-full text-lg font-semibold hover:shadow-2xl hover:shadow-orange-500/50 transition-all transform hover:scale-110 magnetic-btn">
            Get Started Now
          </button>
          <button className="px-8 py-4 border border-white/30 rounded-full text-lg hover:bg-white/10 transition-all transform hover:scale-110 magnetic-btn">
            See Reviews
          </button>
        </div>
        <p className="observe text-sm text-gray-500 mb-4">Trusted by 100+ startups worldwide</p>
        <div className="observe flex flex-wrap justify-center items-center gap-8 opacity-60 brand-logos">
          {['LANCE', 'PromptPilot', 'System', 'CrewMax', 'Pillar'].map((brand, i) => (
            <span 
              key={i} 
              className="text-xl font-bold hover:text-orange-400 transition-all transform hover:scale-125 brand-logo"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              {brand}
            </span>
          ))}
        </div>
      </section>

      {/* Testimonials Section with card flip */}
      <section className="relative z-10 px-6 md:px-12 py-20 bg-gradient-to-b from-transparent to-black/50">
        <h2 className="observe text-3xl md:text-4xl font-bold text-center mb-4 section-title">
          What Founders Are Saying
        </h2>
        <p className="observe text-center text-gray-400 mb-12 section-subtitle">
          Startups love Velocity! Founders who didn't craft perfect tweets went from
          <br />
          launches that missed marks to conversions that grew with Velocity.
        </p>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            { name: 'Michael B.', role: 'CEO at SaaSCo', text: 'Velocity completely changed our launch. Our conversion rate doubled!' },
            { name: 'Jason L.', role: 'Founder at StartupX', text: 'The team understood exactly what we needed. Best decision ever.' },
            { name: 'Emily R.', role: 'Head of Product', text: 'Working with Velocity was seamless. They delivered beyond expectations.' }
          ].map((testimonial, i) => (
            <div 
              key={i} 
              className="observe testimonial-card bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-orange-500/50 transition-all transform hover:scale-105 hover:-translate-y-4 hover:rotate-1"
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-full mr-3 avatar-pulse" />
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-300">{testimonial.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section with 3D cards */}
      <section className="relative z-10 px-6 md:px-12 py-20">
        <h2 className="observe text-3xl md:text-4xl font-bold text-center mb-4 section-title">
          Straightforward pricing that fits
        </h2>
        <p className="observe text-center text-gray-400 mb-12 section-subtitle">
          Choose the plan that works for you, from startups to enterprises.
          <br />
          Value first, plain and fits your stack.
        </p>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            { name: 'Starter Plan', price: '$1080 USD', features: ['1 page design', 'Basic features', '48hr delivery', 'Email support'] },
            { name: 'Pro Plan', price: '$2600 USD', features: ['3+ pages design', 'Priority support', 'Design iterations', '24hr completion', 'Analytics'], highlight: true },
            { name: 'Velocity+ Plan', price: '$4200 USD', features: ['Unlimited pages', 'Dedicated designer', 'White label', 'API access'] }
          ].map((plan, i) => (
            <div 
              key={i} 
              className={`observe pricing-card rounded-2xl p-8 border transition-all transform hover:scale-110 hover:-translate-y-6 ${
                plan.highlight 
                  ? 'bg-gradient-to-br from-orange-500/20 to-red-600/20 border-orange-500 shadow-xl shadow-orange-500/30 featured-card' 
                  : 'bg-white/5 backdrop-blur-sm border-white/10 hover:border-orange-500/50'
              }`}
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              <div className="mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg mb-4 icon-rotate" />
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-4xl font-bold price-counter">{plan.price}</p>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center text-gray-300 feature-item" style={{ animationDelay: `${j * 0.1}s` }}>
                    <svg className="w-5 h-5 mr-2 text-orange-500 check-icon" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3 rounded-full font-semibold transition-all transform hover:scale-105 plan-btn ${
                plan.highlight 
                  ? 'bg-gradient-to-r from-orange-500 to-red-600 hover:shadow-xl hover:shadow-orange-500/50' 
                  : 'border border-white/30 hover:bg-white/10'
              }`}>
                Choose this plan
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Why Clients Section with stagger animation */}
      <section className="relative z-10 px-6 md:px-12 py-20">
        <h2 className="observe text-3xl md:text-4xl font-bold text-center mb-4 section-title">
          Why Clients Stick With Us
        </h2>
        <p className="observe text-center text-gray-400 mb-12 section-subtitle">
          We combine velocity, trust, and high-performing design to
          <br />
          deliver results that actually grow.
        </p>
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {[
            { title: 'Implementation and tools', desc: 'We don\'t just design, we integrate with your stack and existing tools.' },
            { title: 'High-converting', desc: 'Data-driven performance built for conversions by the numbers.' },
            { title: 'Maximum Return on ROI', desc: 'Every dollar you invest returns value through proven growth.' },
            { title: 'Clear steps and trust', desc: 'Full transparency with clear milestones and continuous updates.' }
          ].map((item, i) => (
            <div 
              key={i} 
              className="observe feature-box bg-gradient-to-br from-orange-500/10 to-red-600/10 backdrop-blur-sm border border-orange-500/20 rounded-2xl p-8 hover:border-orange-500 transition-all transform hover:scale-105 hover:-translate-y-3"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl mb-4 flex items-center justify-center icon-bounce">
                <div className="w-8 h-8 bg-white rounded-full" />
              </div>
              <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Process Section with timeline animation */}
      <section className="relative z-10 px-6 md:px-12 py-20">
        <h2 className="observe text-3xl md:text-4xl font-bold text-center mb-4 section-title">
          The Process Fast, Clear, Done
        </h2>
        <p className="observe text-center text-gray-400 mb-12 section-subtitle">
          No endless revisions. No messy handoffs. Just a process
          <br />
          that works and delivers fast.
        </p>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            { title: 'Share Your Vision', desc: 'Tell us what you need, your goals and your target audience.' },
            { title: 'We Design It', desc: 'Our team creates high-converting designs tailored to your needs.' },
            { title: 'Ready to Launch', desc: 'We deliver fully-tested, optimized pages ready to convert.' }
          ].map((step, i) => (
            <div 
              key={i} 
              className="observe process-step bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-orange-500/50 transition-all transform hover:scale-105 hover:-translate-y-4"
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl mb-4 flex items-center justify-center step-number">
                <span className="text-2xl font-bold">{i + 1}</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
              <p className="text-gray-400">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section with accordion animation */}
      <section className="relative z-10 px-6 md:px-12 py-20">
        <h2 className="observe text-3xl md:text-4xl font-bold text-center mb-4 section-title">
          Questions? We've got answers.
        </h2>
        <p className="observe text-center text-gray-400 mb-12 section-subtitle">
          Everything you need to know about Velocity.
          <br />
          If you spot more concerns here.
        </p>
        <div className="max-w-3xl mx-auto space-y-4">
          {[
            'How long does it take to deliver my landing page?',
            'What if I don\'t like the design?',
            'Can I request revisions after delivery?',
            'Do you help with copywriting too?',
            'Is development included in the pricing?'
          ].map((question, i) => (
            <div 
              key={i} 
              className="observe faq-item bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-orange-500/50 transition-all cursor-pointer transform hover:scale-102"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="flex justify-between items-center">
                <p className="font-semibold">{question}</p>
                <svg className="w-6 h-6 text-orange-500 arrow-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section with pulsing effect */}
      <section className="relative z-10 px-6 md:px-12 py-20 text-center">
        <div className="observe max-w-3xl mx-auto bg-gradient-to-br from-orange-500/20 to-red-600/20 backdrop-blur-sm border border-orange-500/30 rounded-3xl p-12 cta-container">
          <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl mx-auto mb-6 flex items-center justify-center cta-icon">
            <div className="w-10 h-10 bg-white rounded-full" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to launch something
            <br />
            that actually works?
          </h2>
          <p className="text-gray-400 mb-8">
            Let Velocity integrate the design-strategy blend those WP designs.
            <br />
            Prepare your launch with work that converts.
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-full text-lg font-semibold hover:shadow-2xl hover:shadow-orange-500/50 transition-all transform hover:scale-110 cta-button">
            Get Started Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="observe relative z-10 px-6 md:px-12 py-12 bg-gradient-to-br from-orange-500/10 to-red-600/10 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-6 md:mb-0 footer-logo">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">V</span>
            </div>
            <span className="text-xl font-bold">Velocity</span>
          </div>
          <div className="flex flex-col md:flex-row gap-8 text-sm text-gray-400 mb-6 md:mb-0">
            <div className="footer-column">
              <h4 className="text-white font-semibold mb-2">Menu</h4>
              <ul className="space-y-1">
                {['Home', 'Why Velocity', 'Pricing', 'Reviews', 'Contact'].map((item, i) => (
                  <li key={i}>
                    <a href="#" className="hover:text-orange-400 transition-all footer-link">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="footer-column">
              <h4 className="text-white font-semibold mb-2">Explore Velocity</h4>
              <ul className="space-y-1">
                {['Why Velocity', 'How It Works', 'Testimonials'].map((item, i) => (
                  <li key={i}>
                    <a href="#" className="hover:text-orange-400 transition-all footer-link">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex space-x-4 social-icons">
            {['T', 'P', 'I', 'L'].map((social, i) => (
              <a 
                key={i} 
                href="#" 
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-orange-500 transition-all transform hover:scale-125 hover:rotate-12 social-icon"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <span className="text-xs font-bold">{social}</span>
              </a>
            ))}
          </div>
        </div>
        <div className="text-center text-gray-500 text-sm mt-8">
          © 2025 Velocity. All rights reserved.
        </div>
      </footer>

      <style jsx>{`
        /* Base Animations */
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes rotateIn {
          from {
            opacity: 0;
            transform: rotate(-180deg) scale(0.5);
          }
          to {
            opacity: 1;
            transform: rotate(0deg) scale(1);
          }
        }

        /* Background Animations - Ultra Advanced */
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(40px, -40px) scale(1.15);
          }
          66% {
            transform: translate(-30px, 30px) scale(0.85);
          }
        }

        @keyframes morphBlob {
          0%, 100% {
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
            transform: translate(0, 0) rotate(0deg) scale(1);
          }
          25% {
            border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
            transform: translate(50px, -30px) rotate(90deg) scale(1.1);
          }
          50% {
            border-radius: 58% 42% 75% 25% / 76% 46% 54% 24%;
            transform: translate(80px, 20px) rotate(180deg) scale(0.9);
          }
          75% {
            border-radius: 42% 58% 35% 65% / 48% 62% 38% 52%;
            transform: translate(30px, 50px) rotate(270deg) scale(1.05);
          }
        }

        @keyframes orbit {
          from {
            transform: rotate(0deg) translateX(80px) rotate(0deg);
          }
          to {
            transform: rotate(360deg) translateX(80px) rotate(-360deg);
          }
        }

        @keyframes wave {
          0%, 100% {
            d: path("M0,150 Q300,50 600,150 T1200,150");
          }
          50% {
            d: path("M0,150 Q300,250 600,150 T1200,150");
          }
        }

        @keyframes particleFloat {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          90% {
            opacity: 0.6;
          }
          100% {
            transform: translate(var(--tx), var(--ty)) scale(0);
            opacity: 0;
          }
        }

        @keyframes scanHorizontal {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100vh);
          }
        }

        @keyframes scanVertical {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100vw);
          }
        }

        @keyframes meshPulse {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }

        @keyframes cube3d {
          0% {
            transform: rotateX(0deg) rotateY(0deg);
          }
          100% {
            transform: rotateX(360deg) rotateY(360deg);
          }
        }

        @keyframes pentagonSpin {
          from {
            transform: rotate(0deg) scale(1);
          }
          to {
            transform: rotate(360deg) scale(1.2);
          }
        }

        /* Background Elements Styles */
        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          animation: float ease-in-out infinite;
          transition: transform 0.3s ease-out;
        }

        .orb-1 {
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(255, 107, 53, 0.5) 0%, transparent 70%);
          top: -15%;
          left: -15%;
          animation-duration: 25s;
        }

        .orb-2 {
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(255, 140, 66, 0.4) 0%, transparent 70%);
          top: 30%;
          right: -10%;
          animation-duration: 30s;
          animation-delay: -8s;
        }

        .orb-3 {
          width: 700px;
          height: 700px;
          background: radial-gradient(circle, rgba(239, 68, 68, 0.3) 0%, transparent 70%);
          bottom: -20%;
          left: 15%;
          animation-duration: 35s;
          animation-delay: -15s;
        }

        .orb-4 {
          width: 550px;
          height: 550px;
          background: radial-gradient(circle, rgba(249, 115, 22, 0.4) 0%, transparent 70%);
          top: 60%;
          right: 25%;
          animation-duration: 28s;
          animation-delay: -20s;
        }

        .orb-5 {
          width: 450px;
          height: 450px;
          background: radial-gradient(circle, rgba(251, 146, 60, 0.5) 0%, transparent 70%);
          bottom: 30%;
          right: -15%;
          animation-duration: 32s;
          animation-delay: -25s;
        }

        /* 3D Cube */
        .cube-container {
          position: absolute;
          perspective: 1000px;
          width: 150px;
          height: 150px;
        }

        .cube-1 {
          top: 15%;
          left: 20%;
          animation: float 20s ease-in-out infinite;
        }

        .cube-2 {
          bottom: 20%;
          right: 25%;
          animation: float 25s ease-in-out infinite;
          animation-delay: -10s;
        }

        .cube {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          animation: cube3d 30s linear infinite;
        }

        .cube-face {
          position: absolute;
          width: 150px;
          height: 150px;
          border: 2px solid rgba(255, 140, 66, 0.4);
          background: rgba(255, 140, 66, 0.05);
        }

        .front  { transform: rotateY(0deg) translateZ(75px); }
        .back   { transform: rotateY(180deg) translateZ(75px); }
        .right  { transform: rotateY(90deg) translateZ(75px); }
        .left   { transform: rotateY(-90deg) translateZ(75px); }
        .top    { transform: rotateX(90deg) translateZ(75px); }
        .bottom { transform: rotateX(-90deg) translateZ(75px); }

        /* Pentagon */
        .pentagon {
          position: absolute;
          width: 100px;
          height: 100px;
          background: linear-gradient(135deg, rgba(239, 68, 68, 0.3), transparent);
          clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);
          animation: pentagonSpin 15s ease-in-out infinite;
        }

        .pent-1 {
          top: 25%;
          right: 15%;
          animation-duration: 20s;
        }

        .pent-2 {
          bottom: 35%;
          left: 25%;
          animation-duration: 18s;
          animation-delay: -8s;
        }

        /* Morphing Blobs */
        .blob {
          position: absolute;
          width: 200px;
          height: 200px;
          background: linear-gradient(45deg, rgba(255, 107, 53, 0.2), rgba(239, 68, 68, 0.2));
          filter: blur(40px);
          animation: morphBlob 20s ease-in-out infinite;
        }

        .blob-1 {
          top: 10%;
          left: 40%;
          animation-duration: 22s;
        }

        .blob-2 {
          bottom: 25%;
          right: 30%;
          animation-duration: 25s;
          animation-delay: -10s;
        }

        .blob-3 {
          top: 50%;
          left: 10%;
          animation-duration: 28s;
          animation-delay: -15s;
        }

        /* Orbital Rings */
        .orbital-ring {
          position: absolute;
          width: 200px;
          height: 200px;
          border: 2px solid rgba(249, 115, 22, 0.3);
          border-radius: 50%;
        }

        .ring-1 {
          top: 20%;
          right: 20%;
          animation: orbit 15s linear infinite;
        }

        .ring-2 {
          bottom: 30%;
          left: 20%;
          animation: orbit 20s linear infinite reverse;
        }

        .ring-3 {
          top: 55%;
          right: 35%;
          animation: orbit 18s linear infinite;
          animation-delay: -5s;
        }

        .ring-dot {
          width: 10px;
          height: 10px;
          background: rgba(255, 140, 66, 0.8);
          border-radius: 50%;
          box-shadow: 0 0 20px rgba(255, 140, 66, 0.8);
          position: absolute;
          top: 50%;
          left: 50%;
        }

        /* Wave SVG */
        .wave-svg {
          position: absolute;
          width: 100%;
          height: 300px;
          opacity: 0.3;
        }

        .wave-1 {
          top: 20%;
          animation: wave 10s ease-in-out infinite;
        }

        .wave-2 {
          bottom: 20%;
          animation: wave 12s ease-in-out infinite;
          animation-delay: -5s;
        }

        /* Advanced Particles */
        .particle-advanced {
          position: absolute;
          width: 4px;
          height: 4px;
          background: rgba(255, 140, 66, 0.7);
          border-radius: 50%;
          --tx: calc((Math.random() - 0.5) * 300px);
          --ty: calc((Math.random() - 0.5) * 300px);
          animation: particleFloat linear infinite;
          box-shadow: 0 0 15px rgba(255, 140, 66, 0.9);
        }

        /* Mesh Grid */
        .mesh-grid {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(255, 140, 66, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 140, 66, 0.05) 1px, transparent 1px);
          background-size: 60px 60px;
          animation: meshPulse 8s ease-in-out infinite;
        }

        /* Scan Lines */
        .scan-line {
          position: absolute;
          box-shadow: 0 0 30px rgba(255, 140, 66, 0.8);
        }

        .scan-horizontal {
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(255, 140, 66, 0.6), transparent);
          animation: scanHorizontal 10s linear infinite;
        }

        .scan-vertical {
          width: 2px;
          height: 100%;
          background: linear-gradient(180deg, transparent, rgba(255, 140, 66, 0.6), transparent);
          animation: scanVertical 12s linear infinite;
        }

        /* Component Animations */
        .observe {
          opacity: 0;
          transform: translateY(30px);
        }

        .observe.animate-in {
          animation: slideUp 0.8s ease-out forwards;
        }

        .nav-reveal {
          animation: slideDown 1s ease-out;
        }

        .logo-bounce {
          animation: scaleIn 1s ease-out;
        }

        .nav-item {
          animation: slideDown 0.8s ease-out forwards;
          opacity: 0;
        }

        .btn-group button:nth-child(1) {
          animation: slideInLeft 1s ease-out;
        }

        .btn-group button:nth-child(2) {
          animation: slideInRight 1s ease-out;
        }

        .pulse-btn {
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 0 20px rgba(249, 115, 22, 0.4);
          }
          50% {
            box-shadow: 0 0 40px rgba(249, 115, 22, 0.8);
          }
        }

        .badge-float {
          animation: float 3s ease-in-out infinite;
        }

        .hero-title {
          animation: slideUp 1s ease-out forwards;
        }

        .gradient-text {
          background-size: 200% auto;
          animation: gradientShift 3s linear infinite;
        }

        @keyframes gradientShift {
          0% {
            background-position: 0% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        .hero-subtitle {
          animation-delay: 0.2s;
        }

        .hero-buttons {
          animation-delay: 0.4s;
        }

        .magnetic-btn {
          transition: transform 0.3s ease;
        }

        .magnetic-btn:hover {
          transform: scale(1.1) translateY(-5px);
        }

        .brand-logo {
          animation: scaleIn 0.8s ease-out forwards;
          opacity: 0;
        }

        .section-title {
          animation: slideUp 1s ease-out forwards;
        }

        .section-subtitle {
          animation: slideUp 1s ease-out forwards;
          animation-delay: 0.2s;
        }

        .testimonial-card {
          transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .avatar-pulse {
          animation: pulse 2s ease-in-out infinite;
        }

        .pricing-card {
          transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
          transform-style: preserve-3d;
        }

        .pricing-card:hover {
          box-shadow: 0 30px 60px rgba(249, 115, 22, 0.3);
        }

        .featured-card {
          animation: pulse 3s ease-in-out infinite;
        }

        .icon-rotate {
          animation: rotateIn 1s ease-out;
        }

        .price-counter {
          animation: scaleIn 1s ease-out;
        }

        .feature-item {
          animation: slideInLeft 0.6s ease-out forwards;
          opacity: 0;
        }

        .check-icon {
          animation: scaleIn 0.6s ease-out;
        }

        .plan-btn {
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .feature-box {
          transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .icon-bounce {
          animation: float 3s ease-in-out infinite;
        }

        .process-step {
          transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .step-number {
          animation: rotateIn 1s ease-out;
        }

        .faq-item {
          transition: all 0.4s ease;
        }

        .arrow-bounce {
          animation: float 2s ease-in-out infinite;
        }

        .cta-container {
          animation: scaleIn 1s ease-out;
        }

        .cta-icon {
          animation: pulse 2s ease-in-out infinite;
        }

        .cta-button {
          animation: pulse 2s ease-in-out infinite;
        }

        .footer-logo {
          animation: slideUp 1s ease-out;
        }

        .footer-column {
          animation: slideUp 1s ease-out;
        }

        .footer-link {
          transition: all 0.3s ease;
        }

        .footer-link:hover {
          transform: translateX(5px);
        }

        .social-icon {
          animation: scaleIn 0.8s ease-out forwards;
          opacity: 0;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .cube-container {
            width: 100px;
            height: 100px;
          }

          .cube-face {
            width: 100px;
            height: 100px;
          }

          .orb {
            filter: blur(60px);
          }

          .orb-1, .orb-2, .orb-3, .orb-4, .orb-5 {
            width: 300px;
            height: 300px;
          }
        }
      `}</style>
    </div>
  );
}