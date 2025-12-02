import React from 'react';
import Nav from "./navbar"


const { useState, useEffect, useRef } = React;


// ============= ICONS COMPONENTS =============
const Twitter = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);

const Send = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"></line>
    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
  </svg>
);

const Youtube = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
  </svg>
);

const Instagram = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const Users = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

const Zap = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
  </svg>
);

const Shield = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
);

const TrendingUp = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
    <polyline points="17 6 23 6 23 12"></polyline>
  </svg>
);

const Award = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="7"></circle>
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
  </svg>
);

const ChevronDown = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

const X = ({ size = 26 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const Target = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <circle cx="12" cy="12" r="6"></circle>
    <circle cx="12" cy="12" r="2"></circle>
  </svg>
);

const Menu = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

// ============= NAVBAR COMPONENT =============
const Navbar = ({ mobileMenuOpen, setMobileMenuOpen }) => {
  return (
    <>
      <nav className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="text-2xl font-black bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Genesis
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 text-sm font-medium">
          <a href="/" className="hover:text-pink-400 transition-colors">Home</a>
          <a href="/features" className="hover:text-pink-400 transition-colors">Features</a>
          <a href="/docs" className="hover:text-pink-400 transition-colors">Docs</a>
          <a href="/about" className="text-pink-400">About</a>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden hover:text-pink-400 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-30 transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div 
          className={`absolute top-0 right-0 w-64 h-full bg-[#140024] p-6 transition-transform duration-500 ease-out ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            onClick={() => setMobileMenuOpen(false)} 
            className="mb-6 ml-auto block hover:text-pink-400 transition-colors"
          >
            <X size={26} />
          </button>
          <nav className="flex flex-col gap-4 text-sm">
            <a href="/" className="hover:text-pink-400 transition-all transform hover:translate-x-2">Home</a>
            <a href="/features" className="hover:text-pink-400 transition-all transform hover:translate-x-2">Features</a>
            <a href="/docs" className="hover:text-pink-400 transition-all transform hover:translate-x-2">Docs</a>
            <a href="/about" className="text-pink-400">About</a>
          </nav>
        </div>
      </div>
    </>
  );
};

// ============= MAIN COMPONENT =============
export default function AboutUs() {
  const [isVisible, setIsVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visibleSections, setVisibleSections] = useState({});
  const canvasRef = useRef(null);

  // Animation on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Canvas particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2,
      });
    }

    let animationId;
    const animate = () => {
      ctx.fillStyle = "rgba(10, 1, 24, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(236, 72, 153, ${Math.random() * 0.5 + 0.3})`;
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => cancelAnimationFrame(animationId);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Data
  const values = [
    {
      icon: Shield,
      title: "Security First",
      description: "Built with industry-leading security protocols to protect your assets and ensure safe transactions.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Experience blazing-fast transactions powered by Arbitrum's Layer 2 technology.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Governed by our community through transparent voting mechanisms and decentralized decisions.",
      color: "from-pink-500 to-rose-500",
    },
    {
      icon: TrendingUp,
      title: "Scalable Infrastructure",
      description: "Designed to scale globally for millions of users and creators.",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Award,
      title: "High Originality",
      description: "Powered by advanced content authenticity scanning and metadata intelligence.",
      color: "from-yellow-500 to-amber-500",
    },
  ];

  const stats = [
    { label: "Active Users", value: "10K+", icon: Users },
    { label: "Transactions", value: "1M+", icon: TrendingUp },
    { label: "Network Uptime", value: "99.9%", icon: Shield },
    { label: "Countries", value: "50+", icon: Target },
  ];

  return (
    <div className="relative min-h-screen text-white overflow-hidden bg-[#0A0118]">
      {/* Background Canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none z-0" />
      
      {/* Grid Background */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none z-0" />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-20 border-b border-white/10 backdrop-blur-xl bg-[#0A0118]/50">
        {/*<Navbar mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />*/}
        <Nav mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      </header>

      <div className="h-20"></div>

      {/* Hero Section */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-24">
        <div className="relative">
          <div className="absolute -top-20 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute -top-10 right-1/4 w-80 h-80 bg-pink-500/20 rounded-full blur-[100px]" style={{ animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) 1s infinite' }} />

          <div className={`relative transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <div className="inline-block px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-sm font-medium text-purple-300 backdrop-blur-sm mb-6">
              🚀 Welcome to Our Story
            </div>

            <h1 className="text-4xl md:text-7xl font-black max-w-4xl leading-[1.1] tracking-tight">
              About Our{' '}
              <span className="relative inline-block">
                <span className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-500 blur-2xl opacity-50"></span>
                <span className="relative bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent bg-[length:200%_100%]" style={{ animation: 'gradientText 3s ease infinite' }}>
                  Technology
                </span>
              </span>
              <br />& Vision
            </h1>

            <p className="text-white/70 text-lg mt-8 max-w-2xl leading-relaxed">
              We build next-generation verification and ownership tools powered by advanced content authenticity analysis and decentralized registration.
            </p>

            <div className="flex flex-wrap gap-4 mt-10">
              <a href="#values" className="group relative px-8 py-4 font-bold text-lg rounded-xl overflow-hidden transform hover:scale-105 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 bg-[length:200%_100%]" style={{ animation: 'gradientMove 3s ease infinite' }}></div>
                <span className="relative z-10 flex items-center gap-2">
                  Explore Values
                  <ChevronDown size={18} className="group-hover:translate-y-1 transition-transform" />
                </span>
              </a>
              <a href="#stats" className="px-8 py-4 font-bold text-lg rounded-xl bg-purple-500/10 border border-purple-500/20 hover:bg-purple-500/20 hover:border-purple-400/50 transition-all duration-300 backdrop-blur-sm transform hover:scale-105">
                View Stats
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" data-animate="stats" className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => {
            const StatIcon = stat.icon;
            return (
              <div
                key={i}
                className={`group relative transition-all duration-700 ${
                  visibleSections.stats ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-500"></div>
                <div className="relative p-6 bg-gradient-to-br from-purple-950/50 via-purple-900/30 to-pink-900/30 rounded-2xl border border-purple-500/20 backdrop-blur-xl hover:border-purple-400/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
                  <StatIcon />
                  <div className="text-3xl font-black bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-1 mt-3">
                    {stat.value}
                  </div>
                  <div className="text-xs font-bold text-purple-300 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Values Section */}
      <section id="values" data-animate="values" className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        <div className={`text-center mb-16 transition-all duration-1000 ${visibleSections.values ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-block px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-sm font-medium text-purple-300 backdrop-blur-sm mb-6">
            💎 Our Principles
          </div>
          <h2 className="text-4xl md:text-5xl font-black leading-tight">
            Our Core{' '}
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Values
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((v, i) => {
            const ValueIcon = v.icon;
            return (
              <div
                key={i}
                className={`group relative transition-all duration-700 ${
                  visibleSections.values ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                }`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition duration-500 bg-[length:200%_100%]" style={{ animation: 'gradientMove 3s ease infinite' }}></div>
                <div className="relative h-full p-8 rounded-3xl bg-gradient-to-br from-purple-950/80 via-purple-900/50 to-pink-900/50 border border-purple-500/20 backdrop-blur-xl hover:border-purple-400/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
                  <div className="relative mb-6 inline-block">
                    <div className={`absolute inset-0 bg-gradient-to-br ${v.color} opacity-20 blur-xl rounded-2xl`}></div>
                    <div className={`relative w-16 h-16 bg-gradient-to-br ${v.color} p-3 rounded-2xl transform group-hover:rotate-6 transition-transform duration-500`}>
                      <ValueIcon />
                    </div>
                  </div>
                  <h3 className="text-2xl font-black mb-3 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-pink-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                    {v.title}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {v.description}
                  </p>
                  <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-xl"></div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" data-animate="mission" className="relative z-10 max-w-6xl mx-auto px-6 py-24">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 rounded-3xl blur-3xl"></div>
          <div className={`relative bg-gradient-to-br from-purple-950/50 via-purple-900/30 to-pink-900/30 rounded-3xl p-12 md:p-16 border-2 border-purple-500/20 backdrop-blur-xl overflow-hidden transition-all duration-1000 ${
              visibleSections.mission ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}>
            <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-pink-500/20 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-purple-500/20 to-transparent rounded-full blur-3xl"></div>
            <div className="relative text-center space-y-6">
              <div className="inline-block px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-sm font-medium text-purple-300 backdrop-blur-sm mb-4">
                🎯 Our Mission
              </div>
              <h2 className="text-4xl md:text-5xl font-black leading-tight max-w-3xl mx-auto">
                Building the Future of{' '}
                <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Decentralized Finance
                </span>
              </h2>
              <p className="text-white/70 text-lg leading-relaxed max-w-2xl mx-auto">
                Our mission is to create a more accessible, transparent, and efficient financial system that empowers everyone to participate in the global economy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-16 mt-20 backdrop-blur-xl bg-[#0A0118]/50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center space-y-8 mb-12">
            <div className="relative inline-block group cursor-pointer">
              <div className="absolute -inset-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg blur-xl opacity-20 group-hover:opacity-40 transition duration-500"></div>
              <h3 className="relative text-5xl font-black bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent bg-[length:200%_100%]" style={{ animation: 'gradientMove 3s ease infinite' }}>
                Genesis
              </h3>
            </div>

            <div className="flex justify-center gap-3">
              {[
                { Icon: Twitter, color: 'from-sky-400 to-blue-500' },
                { Icon: Instagram, color: 'from-pink-400 to-purple-500' },
                { Icon: Youtube, color: 'from-red-400 to-rose-500' },
                { Icon: Send, color: 'from-blue-400 to-cyan-400' },
              ].map(({ Icon, color }, i) => (
                <button key={i} className="group relative p-4 rounded-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1">
                  <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-10 group-hover:opacity-20 rounded-xl transition-opacity duration-300`}></div>
                  <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-100 rounded-xl blur-lg transition-opacity duration-300`}></div>
                  <Icon />
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm mb-8">
            {['Terms', 'Privacy', 'Security', 'Docs', 'Support'].map((link) => (
              <a key={link} href="#" className="text-gray-500 hover:text-white transition-colors duration-300">
                {link}
              </a>
            ))}
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-600">
              © 2025 Genesis. All rights reserved. Built on Arbitrum Chain.
            </p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes gradientMove {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes gradientText {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  );
}