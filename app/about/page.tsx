"use client"

import React from 'react';

const { useState, useEffect, useRef } = React;

// ============= ICONS =============
const Menu = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

const X = ({ size = 26 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const Zap = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
  </svg>
);

const Shield = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
);

const Users = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const TrendingUp = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
    <polyline points="17 6 23 6 23 12"></polyline>
  </svg>
);

const Award = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="7"></circle>
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
  </svg>
);

const Target = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <circle cx="12" cy="12" r="6"></circle>
    <circle cx="12" cy="12" r="2"></circle>
  </svg>
);

const ArrowRight = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);

// ============= NAVBAR COMPONENT =============
const Navbar = ({ mobileMenuOpen, setMobileMenuOpen }) => {
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    setCurrentPath(window.location.pathname);
    
    const handleRouteChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/features", label: "Features" },
    { href: "/docs", label: "Docs" },
    { href: "/about", label: "About" },
  ];

  const isLinkActive = (href) => {
    if (href === "/" && currentPath === "/") return true;
    if (href !== "/" && currentPath.startsWith(href)) return true;
    return false;
  };

  return (
    <>
      <nav className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="text-2xl font-black bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Genesis
        </div>
        
        <div className="hidden md:flex gap-8 text-sm font-medium">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`transition-colors ${
                isLinkActive(link.href) ? 'text-pink-400' : 'hover:text-pink-400'
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <button 
          className="md:hidden hover:text-pink-400 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu />
        </button>
      </nav>

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
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`transition-all transform hover:translate-x-2 ${
                  isLinkActive(link.href) ? 'text-pink-400' : 'hover:text-pink-400'
                }`}
              >
                {link.label}
              </a>
            ))}
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

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5,
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
        ctx.fillStyle = `rgba(236, 72, 153, ${Math.random() * 0.4 + 0.2})`;
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => cancelAnimationFrame(animationId);
  }, []);

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
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const values = [
    {
      icon: Shield,
      title: "Security First",
      description: "Built with industry-leading security protocols to protect your assets.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Experience blazing-fast transactions with Layer 2 technology.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Governed by our community through transparent mechanisms.",
      color: "from-pink-500 to-rose-500",
    },
    {
      icon: TrendingUp,
      title: "Scalable",
      description: "Designed to scale globally for millions of users.",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Award,
      title: "High Quality",
      description: "Powered by advanced authenticity scanning technology.",
      color: "from-yellow-500 to-amber-500",
    },
    {
      icon: Target,
      title: "Precision",
      description: "Accurate and reliable verification every single time.",
      color: "from-indigo-500 to-purple-500",
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
      <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none z-0" />
      <div className="fixed inset-0 bg-[linear-gradient(rgba(139,92,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.02)_1px,transparent_1px)] bg-[size:80px_80px] pointer-events-none z-0" />

      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 backdrop-blur-xl bg-[#0A0118]/90">
        <Navbar mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      </header>

      <div className="h-20"></div>

      {/* Hero Section - Minimalist & Centered */}
      <section className="relative z-10 px-6 py-32 md:py-40">
        <div className="max-w-5xl mx-auto text-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[1.1]">
              <span className="relative inline-block">
                <span className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 blur-3xl opacity-30"></span>
                <span className="relative bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  About Genesis
                </span>
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto leading-relaxed mb-12">
              We build next-generation verification and ownership tools powered by advanced content authenticity analysis and decentralized registration.
            </p>

            <button className="group relative px-10 py-5 font-bold text-lg rounded-full overflow-hidden transition-all hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 bg-[length:200%_100%]" style={{ animation: 'gradientMove 3s ease infinite' }}></div>
              <span className="relative flex items-center gap-2">
                Get Started
                <ArrowRight />
              </span>
            </button>
          </div>

          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[150px]" />
        </div>
      </section>

      {/* Stats Section - Clean Grid */}
      <section id="stats" data-animate="stats" className="relative z-10 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => {
              const StatIcon = stat.icon;
              return (
                <div
                  key={i}
                  className={`text-center transition-all duration-700 ${
                    visibleSections.stats ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30">
                    <StatIcon />
                  </div>
                  <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/50 font-medium uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Story Section - Clean Card */}
      <section id="story" data-animate="story" className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <div className={`transition-all duration-1000 ${visibleSections.story ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/20 backdrop-blur-xl rounded-3xl p-12 md:p-16 border border-purple-500/20">
              <h2 className="text-4xl md:text-5xl font-black mb-8 text-center">
                Our <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Story</span>
              </h2>
              <div className="space-y-6 text-white/70 leading-relaxed text-lg">
                <p>
                  Founded in 2020, Genesis emerged from a simple belief: blockchain technology should be accessible to everyone, not just tech experts.
                </p>
                <p>
                  What started as a small team of blockchain enthusiasts has grown into a thriving platform serving over 50,000 users across 50+ countries. We've processed millions of transactions while maintaining 99.9% uptime.
                </p>
                <p>
                  Today, Genesis stands at the forefront of Web3 innovation, combining advanced security protocols with intuitive design.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section - Bento Grid Style */}
      <section id="values" data-animate="values" className="relative z-10 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${visibleSections.values ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              Core <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Values</span>
            </h2>
            <p className="text-white/60 text-lg">The principles that guide everything we do</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => {
              const ValueIcon = v.icon;
              return (
                <div
                  key={i}
                  className={`group transition-all duration-700 ${
                    visibleSections.values ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="h-full bg-gradient-to-br from-purple-900/40 to-pink-900/20 backdrop-blur-xl rounded-2xl p-8 border border-purple-500/20 hover:border-purple-400/40 transition-all hover:scale-105">
                    <div className={`inline-flex p-4 bg-gradient-to-br ${v.color} rounded-xl mb-6`}>
                      <ValueIcon />
                    </div>
                    <h3 className="text-xl font-black mb-3">{v.title}</h3>
                    <p className="text-white/60 leading-relaxed text-sm">{v.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" data-animate="mission" className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <div className={`transition-all duration-1000 ${visibleSections.mission ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/30 backdrop-blur-xl rounded-3xl p-12 md:p-16 border border-purple-500/20 text-center">
              <h2 className="text-4xl md:text-5xl font-black mb-6">
                Building the Future of{' '}
                <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Decentralized Finance
                </span>
              </h2>
              <p className="text-white/70 text-lg leading-relaxed max-w-2xl mx-auto mb-10">
                Our mission is to create a more accessible, transparent, and efficient financial system that empowers everyone to participate in the global economy.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <button className="group relative px-8 py-4 font-bold rounded-full overflow-hidden transition-all hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 bg-[length:200%_100%]" style={{ animation: 'gradientMove 3s ease infinite' }}></div>
                  <span className="relative">Join Our Community</span>
                </button>
                <button className="px-8 py-4 font-bold rounded-full border-2 border-purple-500/40 hover:border-purple-400/60 hover:bg-purple-500/10 transition-all hover:scale-105">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="h-32"></div>

      <style>{`
        @keyframes gradientMove {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  );
}