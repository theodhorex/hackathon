import React, { useState, useEffect, useRef } from 'react';
import { Twitter, Send, MessageCircle, Youtube, Instagram, ChevronDown, Menu, X } from 'lucide-react';

export default function GenesisLanding() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('swap');
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    
    // Particle animation
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles: Array<{x: number, y: number, vx: number, vy: number, size: number}> = [];
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2
      });
    }
    
    let animationId: number;
    const animate = () => {
      ctx.fillStyle = 'rgba(10, 1, 24, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
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
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const stats = [
    { label: 'TOTAL VALUE LOCKED', value: '$99,233,374', color: 'from-pink-500 to-rose-500' },
    { label: 'CIRCULATING SUPPLY', value: '18,021,367', color: 'from-purple-500 to-pink-500' },
    { label: 'CIRCULATING MARKET CAP', value: '$5,768,639', color: 'from-blue-500 to-purple-500' },
    { label: 'THE PRICE', value: '$0.32', color: 'from-cyan-500 to-blue-500' },
  ];

  const bottomStats = [
    { label: 'EPOCH ENDS IN', value: '$5,454,114', color: 'from-violet-500 to-purple-500' },
    { label: '24H VOLUME', value: '2D 10H 18M', color: 'from-fuchsia-500 to-pink-500' },
  ];

  const team = [
    {
      name: 'Brooklyn Simmons',
      role: 'Founder',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
    },
    {
      name: 'Guy Hawkins',
      role: 'Ceo',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
    },
    {
      name: 'Courtney Henry',
      role: 'Manager',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0118] text-white overflow-hidden relative">
      {/* Animated Background Canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
      
      {/* Grid Overlay */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none z-0" />

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-700 ${scrollY > 50 ? 'bg-[#0a0118]/95 backdrop-blur-xl border-b border-purple-500/20 shadow-lg shadow-purple-500/5' : 'bg-transparent'} ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="relative group cursor-pointer">
              <div className="absolute -inset-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
              <div className="relative text-2xl font-black bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Genesis
              </div>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden lg:flex space-x-8">
              {['Home', 'Swap', 'Liquidity', 'Lock', 'Vote', 'Rewards'].map((item, i) => (
                <a
                  key={item}
                  href="#"
                  className="text-sm font-medium text-gray-300 hover:text-white transition-all duration-300 relative group"
                  style={{ transitionDelay: `${i * 50}ms` }}
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
              <button className="text-sm font-medium text-gray-300 hover:text-white transition-all duration-300 flex items-center gap-1">
                More <ChevronDown size={16} />
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button className="hidden sm:block p-2.5 bg-purple-500/10 hover:bg-purple-500/20 rounded-xl transition-all duration-300 transform hover:scale-110 hover:rotate-3 border border-purple-500/20">
                <Twitter size={18} className="text-purple-300" />
              </button>
              <button className="hidden sm:block p-2.5 bg-pink-500/10 hover:bg-pink-500/20 rounded-xl transition-all duration-300 transform hover:scale-110 hover:-rotate-3 border border-pink-500/20">
                <Send size={18} className="text-pink-300" />
              </button>
              <button className="relative px-6 py-2.5 font-semibold text-sm rounded-xl overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 bg-[length:200%_100%] animate-[gradient_3s_ease_infinite]"></div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 transition-opacity duration-300"></div>
                <span className="relative z-10">Swap Now</span>
              </button>
              <button className="lg:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0a0118]/98 backdrop-blur-xl border-t border-purple-500/20">
            <div className="px-4 py-6 space-y-4">
              {['Home', 'Swap', 'Liquidity', 'Lock', 'Vote', 'Rewards', 'More'].map((item) => (
                <a key={item} href="#" className="block text-sm font-medium text-gray-300 hover:text-white transition-colors">
                  {item}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className={`space-y-8 transition-all duration-1000 delay-200 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
              <div className="inline-block px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-sm font-medium text-purple-300 backdrop-blur-sm">
                🚀 Welcome to Genesis DEX
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight">
                The{' '}
                <span className="relative inline-block">
                  <span className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-500 blur-2xl opacity-50"></span>
                  <span className="relative bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-[gradient_3s_ease_infinite] bg-[length:200%_100%]">
                    Native DEX
                  </span>
                </span>{' '}
                of<br />
                Arbitrum Chain
              </h1>
              <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
                Amet Minim Mollit Non Deserunt Ullamco Est Sit Aliqua Dolor Do Amet Sint. Velit Officia Consequat Duis Enim Velit Mollit. Exercitation Veniam Eum Deserunt Ullamco.
              </p>
              <button className="group relative px-8 py-4 font-bold text-lg rounded-xl overflow-hidden transform hover:scale-105 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 bg-[length:200%_100%] animate-[gradient_3s_ease_infinite]"></div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2)_0%,transparent_70%)] transition-opacity duration-300"></div>
                <span className="relative z-10 flex items-center gap-2">
                  Swap Now
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>
            </div>
            
            {/* 3D Floating Elements */}
            <div className={`relative transition-all duration-1000 delay-500 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
              <div className="relative w-full h-[500px] flex items-center justify-center">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/30 via-purple-500/30 to-blue-500/30 rounded-full blur-[100px] animate-pulse"></div>
                
                {/* Floating 3D Objects */}
                <div className="relative w-full h-full">
                  {/* Main Crystal/Diamond */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 animate-[float_6s_ease-in-out_infinite]">
                    <div className="relative w-full h-full">
                      <div className="absolute inset-0 bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400 rounded-3xl rotate-45 transform-gpu animate-[spin_20s_linear_infinite] shadow-2xl shadow-purple-500/50"></div>
                      <div className="absolute inset-4 bg-gradient-to-tl from-pink-300 via-purple-300 to-blue-300 rounded-3xl rotate-45 transform-gpu animate-[spin_15s_linear_infinite_reverse] opacity-80"></div>
                    </div>
                  </div>
                  
                  {/* Orbiting Icons */}
                  <div className="absolute top-1/4 right-1/4 w-20 h-20 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-2xl animate-[orbit_10s_linear_infinite] shadow-lg shadow-blue-500/50 flex items-center justify-center text-3xl rotate-12">
                    💎
                  </div>
                  <div className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl animate-[orbit_12s_linear_infinite_reverse] shadow-lg shadow-pink-500/50 flex items-center justify-center text-4xl -rotate-12">
                    🪙
                  </div>
                  <div className="absolute top-1/3 left-1/4 w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full animate-[orbit_8s_linear_infinite] shadow-lg shadow-pink-500/50 flex items-center justify-center text-2xl">
                    ⭐
                  </div>
                </div>
                
                {/* Floating Badge */}
                <div className="absolute top-20 right-10 px-4 py-2 bg-purple-500/20 backdrop-blur-xl border border-purple-400/30 rounded-full animate-[float_4s_ease-in-out_infinite] shadow-lg">
                  <span className="text-sm font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">Backed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Wave Line Animation */}
          <div className="mt-16 relative h-24">
            <svg className="w-full h-full" viewBox="0 0 1440 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ec4899" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
              <path
                d="M0,50 Q360,10 720,50 T1440,50"
                fill="none"
                stroke="url(#waveGradient)"
                strokeWidth="3"
                opacity="0.6"
              >
                <animate
                  attributeName="d"
                  values="M0,50 Q360,10 720,50 T1440,50;M0,50 Q360,90 720,50 T1440,50;M0,50 Q360,10 720,50 T1440,50"
                  dur="4s"
                  repeatCount="indefinite"
                />
              </path>
            </svg>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {stats.map((stat, i) => (
              <div
                key={i}
                className={`group relative transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-500"></div>
                <div className="relative p-6 bg-gradient-to-br from-purple-950/50 via-purple-900/30 to-pink-900/30 rounded-2xl border border-purple-500/20 backdrop-blur-xl hover:border-purple-400/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 shadow-xl">
                  <div className="text-xs font-bold text-purple-300 mb-3 uppercase tracking-wider">{stat.label}</div>
                  <div className={`text-3xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                    {stat.value}
                  </div>
                  <div className="absolute top-2 right-2 w-12 h-12 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-xl"></div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {bottomStats.map((stat, i) => (
              <div
                key={i}
                className={`group relative transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{ transitionDelay: `${(i + 4) * 100}ms` }}
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-500"></div>
                <div className="relative p-6 bg-gradient-to-br from-purple-950/50 via-purple-900/30 to-pink-900/30 rounded-2xl border border-purple-500/20 backdrop-blur-xl hover:border-purple-400/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 shadow-xl">
                  <div className="text-xs font-bold text-purple-300 mb-3 uppercase tracking-wider">{stat.label}</div>
                  <div className={`text-3xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                    {stat.value}
                  </div>
                  <div className="absolute top-2 right-2 w-12 h-12 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-xl"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {['Swap', 'Staking', 'Vote'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={`relative px-10 py-4 font-bold text-lg rounded-xl transition-all duration-500 transform hover:scale-105 ${
                  activeTab === tab.toLowerCase()
                    ? 'text-white shadow-2xl'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {activeTab === tab.toLowerCase() && (
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 rounded-xl animate-[gradient_3s_ease_infinite] bg-[length:200%_100%]"></div>
                )}
                {activeTab !== tab.toLowerCase() && (
                  <div className="absolute inset-0 bg-purple-500/10 rounded-xl border border-purple-500/20 hover:bg-purple-500/20"></div>
                )}
                <span className="relative z-10">{tab}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Staking Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent"></div>
        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="relative w-full h-[400px] flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 via-orange-500/20 to-pink-500/20 rounded-full blur-[120px] animate-pulse"></div>
                
                {/* Stacked Coins Animation */}
                <div className="relative">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 w-32 h-32 bg-gradient-to-br from-yellow-400 via-orange-400 to-yellow-500 rounded-full shadow-2xl shadow-yellow-500/50 border-4 border-yellow-300/50"
                      style={{
                        transform: `translate(-50%, -50%) translateY(${-i * 15}px) rotateX(60deg)`,
                        animation: `float ${4 + i * 0.5}s ease-in-out infinite`,
                        animationDelay: `${i * 0.2}s`,
                        zIndex: 5 - i
                      }}
                    >
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-yellow-200/50 to-transparent"></div>
                      <div className="absolute inset-0 flex items-center justify-center text-4xl font-black text-yellow-900">$</div>
                    </div>
                  ))}
                </div>
                
                {/* Floating Particles */}
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-[float_3s_ease-in-out_infinite]"
                    style={{
                      left: `${20 + Math.random() * 60}%`,
                      top: `${20 + Math.random() * 60}%`,
                      animationDelay: `${Math.random() * 2}s`
                    }}
                  ></div>
                ))}
              </div>
            </div>
            
            <div className="space-y-8 order-1 lg:order-2">
              <div className="inline-block px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-sm font-medium text-purple-300 backdrop-blur-sm">
                💰 Earn Passive Income
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight">
                Investing In{' '}
                <span className="relative inline-block">
                  <span className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-500 blur-2xl opacity-50"></span>
                  <span className="relative bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Staking
                  </span>
                </span>
                <br />
                Get Passive Income
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                Amet Minim Mollit Non Deserunt Ullamco Est Sit Aliqua Dolor Do Amet Sint. Velit Officia Consequat Duis Enim Velit Mollit. Exercitation Veniam.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="group relative px-8 py-4 font-bold text-lg rounded-xl overflow-hidden transform hover:scale-105 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 bg-[length:200%_100%] animate-[gradient_3s_ease_infinite]"></div>
                  <span className="relative z-10 flex items-center gap-2">
                    Start Stake
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </button>
                <button className="px-8 py-4 font-bold text-lg rounded-xl bg-purple-500/10 border border-purple-500/20 hover:bg-purple-500/20 hover:border-purple-400/50 transition-all duration-300 backdrop-blur-sm">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-sm font-medium text-purple-300 backdrop-blur-sm mb-6">
              👥 Our Leadership
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight">
              Meet With Our
              <br />
              <span className="relative inline-block mt-2">
                <span className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-500 blur-2xl opacity-50"></span>
                <span className="relative bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Team
                </span>
              </span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <div
                key={i}
                className={`group transition-all duration-700 transform hover:scale-105 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
                style={{ transitionDelay: `${i * 200}ms` }}
              >
                <div className="relative h-full">
                  <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition duration-500 animate-[gradient_3s_ease_infinite] bg-[length:200%_100%]"></div>
                  <div className="relative h-full bg-gradient-to-br from-purple-950/80 via-purple-900/50 to-pink-900/50 rounded-3xl overflow-hidden border border-purple-500/20 backdrop-blur-xl">
                    {/* Top Gradient Bar */}
                    <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-br from-pink-500 via-purple-500 to-pink-500 bg-[length:200%_100%] animate-[gradient_3s_ease_infinite]"></div>
                    
                    {/* Content */}
                    <div className="relative p-8 flex flex-col items-center pt-20">
                      {/* Profile Image */}
                      <div className="relative mb-6 group-hover:scale-110 transition-transform duration-500">
                        <div className="absolute -inset-2 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full blur-lg opacity-50"></div>
                        <div className="relative w-28 h-28 rounded-full border-4 border-purple-900/50 overflow-hidden ring-4 ring-purple-500/20">
                          <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                        </div>
                        {/* Online Status Dot */}
                        <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-400 rounded-full border-2 border-purple-900 animate-pulse"></div>
                      </div>
                      
                      {/* Name & Role */}
                      <h3 className="text-xl font-black mb-1 text-white">{member.name}</h3>
                      <p className="text-sm font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-6">{member.role}</p>
                      
                      {/* Description */}
                      <p className="text-sm text-gray-400 text-center leading-relaxed mb-6">
                        Amet Minim Mollit Non Deserunt Ullamco Est Sit Aliqua Dolor Do Amet Sint. Velit Mollit. Exercitation Veniam Consequat Sunt Nostrud Amet.
                      </p>
                      
                      {/* Social Links */}
                      <div className="flex gap-2">
                        {[Twitter, MessageCircle, Send].map((Icon, idx) => (
                          <button
                            key={idx}
                            className="p-2 bg-purple-500/10 hover:bg-purple-500/20 rounded-lg transition-all duration-300 transform hover:scale-110 border border-purple-500/20"
                          >
                            <Icon size={16} className="text-purple-300" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent"></div>
        <div className="max-w-5xl mx-auto relative">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 rounded-3xl opacity-30 group-hover:opacity-50 blur-2xl transition duration-1000 animate-[gradient_5s_ease_infinite] bg-[length:200%_100%]"></div>
            <div className="relative bg-gradient-to-br from-purple-950/80 via-purple-900/50 to-pink-900/50 rounded-3xl p-12 md:p-16 border-2 border-purple-500/30 backdrop-blur-2xl overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-pink-500/20 to-transparent rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-purple-500/20 to-transparent rounded-full blur-3xl"></div>
              
              <div className="relative text-center space-y-8">
                <div className="inline-block px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-sm font-medium text-purple-300 backdrop-blur-sm mb-4">
                  🎯 Ready to Start?
                </div>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight">
                  Get Ready{' '}
                  <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    & Start Now
                  </span>
                </h2>
                <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto">
                  Amet Minim Mollit Non Deserunt Ullamco Est Sit Aliqua Dolor Do Amet Sint. Velit Officia Consequat Duis Enim Velit Mollit.
                </p>
                <div className="flex flex-wrap justify-center gap-4 pt-4">
                  <button className="group relative px-10 py-4 font-bold text-lg rounded-xl overflow-hidden transform hover:scale-105 transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 bg-[length:200%_100%] animate-[gradient_3s_ease_infinite]"></div>
                    <span className="relative z-10 flex items-center gap-2">
                      Swap Now
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </button>
                  <button className="px-10 py-4 font-bold text-lg rounded-xl bg-white/5 border border-purple-500/20 hover:bg-white/10 hover:border-purple-400/50 transition-all duration-300 backdrop-blur-sm">
                    View Docs
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 sm:px-6 lg:px-8 border-t border-purple-500/10 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-8">
            {/* Logo */}
            <div className="relative inline-block group cursor-pointer">
              <div className="absolute -inset-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg blur-xl opacity-20 group-hover:opacity-40 transition duration-500"></div>
              <h3 className="relative text-6xl font-black bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent bg-[length:200%_100%] animate-[gradient_3s_ease_infinite]">
                Genesis
              </h3>
            </div>
            
            {/* Social Icons */}
            <div className="flex justify-center gap-3">
              {[
                { Icon: Send, color: 'from-blue-400 to-cyan-400' },
                { Icon: Twitter, color: 'from-sky-400 to-blue-500' },
                { Icon: MessageCircle, color: 'from-purple-400 to-pink-400' },
                { Icon: Youtube, color: 'from-red-400 to-rose-500' },
                { Icon: Instagram, color: 'from-pink-400 to-purple-500' }
              ].map(({ Icon, color }, i) => (
                <button
                  key={i}
                  className="group relative p-4 rounded-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-10 group-hover:opacity-20 rounded-xl transition-opacity duration-300`}></div>
                  <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-100 rounded-xl blur-lg transition-opacity duration-300`}></div>
                  <Icon size={22} className={`relative z-10 text-gray-400 group-hover:text-white transition-colors duration-300`} />
                </button>
              ))}
            </div>
            
            {/* Description */}
            <p className="text-sm text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Amet Minim Mollit Non Deserunt Ullamco Est Sit Aliqua Dolor Do Amet Sint. Velit Officia Consequat Duis Enim Velit Mollit.
            </p>
            
            {/* Links */}
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              {['Terms', 'Privacy', 'Security', 'Docs', 'Support'].map((link) => (
                <a key={link} href="#" className="text-gray-500 hover:text-white transition-colors duration-300">
                  {link}
                </a>
              ))}
            </div>
            
            {/* Copyright */}
            <div className="pt-8 border-t border-purple-500/10">
              <p className="text-xs text-gray-600">
                © 2025 Genesis. All rights reserved. Built on Arbitrum Chain.
              </p>
            </div>
          </div>
        </div>

        {/* Animated Wave Background */}
        <div className="mt-16 relative h-48 overflow-hidden opacity-30">
          <svg className="w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <defs>
              <linearGradient id="footerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ec4899" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            <path
              d="M0,160 Q360,100 720,160 T1440,160 L1440,320 L0,320 Z"
              fill="url(#footerGradient)"
            >
              <animate
                attributeName="d"
                values="M0,160 Q360,100 720,160 T1440,160 L1440,320 L0,320 Z;M0,160 Q360,220 720,160 T1440,160 L1440,320 L0,320 Z;M0,160 Q360,100 720,160 T1440,160 L1440,320 L0,320 Z"
                dur="8s"
                repeatCount="indefinite"
              />
            </path>
            <path
              d="M0,200 Q360,140 720,200 T1440,200 L1440,320 L0,320 Z"
              fill="url(#footerGradient)"
              opacity="0.5"
            >
              <animate
                attributeName="d"
                values="M0,200 Q360,140 720,200 T1440,200 L1440,320 L0,320 Z;M0,200 Q360,260 720,200 T1440,200 L1440,320 L0,320 Z;M0,200 Q360,140 720,200 T1440,200 L1440,320 L0,320 Z"
                dur="10s"
                repeatCount="indefinite"
              />
            </path>
          </svg>
        </div>
      </footer>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes orbit {
          0% { transform: rotate(0deg) translateX(150px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(150px) rotate(-360deg); }
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}