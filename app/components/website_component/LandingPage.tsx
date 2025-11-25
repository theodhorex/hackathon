import React, { useState, useEffect } from 'react';
import { Sparkles, Activity, Users, Shield, Calendar, CreditCard, Settings, Search, BarChart3, TrendingUp, TrendingDown, Play } from 'lucide-react';

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
        
        {/* Geometric Shapes */}
        <div className="absolute top-1/4 right-1/4 w-32 h-32 border border-blue-400/20 rotate-45 animate-spin-slow" />
        <div className="absolute bottom-1/4 left-1/4 w-24 h-24 border border-purple-400/20 animate-spin-reverse" />
        
        {/* Circuit Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10">
          <line x1="10%" y1="20%" x2="30%" y2="20%" stroke="currentColor" strokeWidth="1" className="text-blue-400 animate-pulse" />
          <circle cx="30%" cy="20%" r="3" fill="currentColor" className="text-blue-400" />
          <line x1="30%" y1="20%" x2="30%" y2="40%" stroke="currentColor" strokeWidth="1" className="text-blue-400 animate-pulse" />
          
          <line x1="70%" y1="60%" x2="90%" y2="60%" stroke="currentColor" strokeWidth="1" className="text-purple-400 animate-pulse" />
          <circle cx="70%" cy="60%" r="3" fill="currentColor" className="text-purple-400" />
          <line x1="70%" y1="60%" x2="70%" y2="80%" stroke="currentColor" strokeWidth="1" className="text-purple-400 animate-pulse" />
        </svg>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-8 py-6">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-6 h-6 text-blue-400" />
          <span className="text-xl font-bold">Galaxy</span>
        </div>
        <div className="hidden md:flex items-center space-x-8 text-sm text-gray-400">
          <a href="#" className="hover:text-white transition">Company</a>
          <a href="#" className="hover:text-white transition">Features</a>
          <a href="#" className="hover:text-white transition">Pricing</a>
          <a href="#" className="hover:text-white transition">Integrations</a>
          <a href="#" className="hover:text-white transition">Insights</a>
        </div>
        <button className="px-6 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-sm font-medium transition backdrop-blur-sm">
          Buy Template - $69
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-8 pt-20 pb-32 text-center">
        {/* Update Badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8 backdrop-blur-sm">
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span className="text-sm">Update 2.0 - AI Integration</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            Revolutionize
          </span>{' '}
          your digital<br />
          saas products
        </h1>

        <p className="text-gray-400 text-lg mb-16 max-w-2xl mx-auto">
          Create stunning, professional-quality websites in record time with our powerful UI kit. Elevate your SAAS game today!
        </p>

        {/* Dashboard Preview */}
        <div className="max-w-5xl mx-auto relative">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full" />
          
          <div className="relative bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
            <div className="flex gap-8">
              {/* Sidebar */}
              <div className="w-48 space-y-4">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-8">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <NavItem icon={<Activity />} text="Activity" active />
                <NavItem icon={<Users />} text="Users" />
                <NavItem icon={<Shield />} text="Security" />
                <NavItem icon={<Calendar />} text="Schedule" />
                <NavItem icon={<CreditCard />} text="Payouts" />
                <NavItem icon={<Settings />} text="Settings" />
              </div>

              {/* Main Content */}
              <div className="flex-1">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Good Morning</p>
                    <h2 className="text-2xl font-bold">Welcome</h2>
                  </div>
                  <div className="absolute top-1/3 left-1/4 w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full animate-[orbit_8s_linear_infinite] shadow-lg shadow-pink-500/50 flex items-center justify-center text-2xl">
                    ⭐
                  </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-4 gap-4 mb-8">
                  <StatCard label="Activity" value="$540.50" trend="up" />
                  <StatCard label="Total Amount" value="$682.5" chart />
                  <StatCard label="New Clients" value="$350.40" mini />
                  <StatCard label="Active Now" value="$350.4" mini />
                </div>

                {/* Balance Section */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-semibold">Balance</h3>
                      <span className="flex items-center text-green-400 text-xs">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-1" />
                        On track
                      </span>
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

                  {/* Chart */}
                  <div className="relative h-32">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 transition">
                        <Play className="w-5 h-5 ml-1" />
                      </button>
                    </div>
                    <svg className="w-full h-full" viewBox="0 0 600 120">
                      <path
                        d="M 0,80 Q 50,70 100,75 T 200,60 T 300,50 T 400,70 T 500,65 T 600,55"
                        fill="none"
                        stroke="url(#gradient)"
                        strokeWidth="2"
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#3b82f6" />
                          <stop offset="100%" stopColor="#8b5cf6" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>

                {/* Timeline Cards */}
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <TimelineCard title="Your Timeline" value="$25,216" />
                  <TimelineCard title="Your Timeline" value="$25,216" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Partner Logos */}
        <div className="flex items-center justify-center space-x-12 mt-20 opacity-50">
          <span className="text-sm font-semibold">SQUARESPACE</span>
          <span className="text-sm font-semibold">maze</span>
          <span className="text-sm font-semibold">afterpay</span>
          <span className="text-sm font-semibold">classpass</span>
          <span className="text-sm font-semibold">SQUARESPACE</span>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 px-8 py-20">
        <div className="text-center mb-16">
          <p className="text-blue-400 text-sm uppercase tracking-wider mb-4">HOW IT WORKS</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-400">
              Powerful
            </span>{' '}
            growth solutions
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Craft exceptional, top-notch websites swiftly using our robust UI toolkit. Boost your SAAS performance now!
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={<Users className="w-12 h-12" />}
            title="Expert Guidance"
            description="Create stunning, professional-quality websites in record time with our powerful UI kit."
          />
          <FeatureCard
            icon={<div className="relative w-24 h-24">
              <div className="absolute inset-0 border-4 border-blue-500 rounded-full" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-blue-500 rounded-full" />
              <div className="absolute top-4 right-4 w-6 h-6 border-4 border-purple-400 rounded-full" />
              <div className="absolute bottom-4 left-4 w-6 h-6 border-4 border-pink-400 rounded-full" />
            </div>}
            title="Fast and Easy Setup"
            description="Create stunning, professional-quality websites in record time with our powerful UI kit."
          />
          <FeatureCard
            icon={<div className="relative w-24 h-24">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg transform -rotate-12" />
              <BarChart3 className="absolute inset-0 m-auto w-12 h-12 text-pink-400" />
            </div>}
            title="Advanced Analytics"
            description="Create stunning, professional-quality websites in record time with our powerful UI kit."
          />
          <FeatureCard
            icon={<div className="relative w-24 h-24">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-900 rounded-lg" />
              <div className="absolute top-4 left-4 right-4 h-1 bg-slate-600 rounded" />
              <div className="absolute top-8 left-4 right-8 h-1 bg-slate-600 rounded" />
              <div className="absolute bottom-12 left-4 right-4 h-12 bg-gradient-to-b from-slate-600 to-slate-700 rounded" />
            </div>}
            title="Seamless Integration"
            description="Create stunning, professional-quality websites in record time with our powerful UI kit."
            badge="AI Integration"
            cta="Get Started"
          />
          <FeatureCard
            icon={<div className="relative w-24 h-24">
              <div className="absolute top-0 left-4 w-12 h-16 bg-gradient-to-br from-pink-400 to-purple-500 rounded-lg transform rotate-12" />
              <div className="absolute top-8 left-0 w-12 h-16 bg-slate-700 rounded-lg" />
              <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-slate-600 to-slate-800 rounded-lg transform -rotate-12" />
            </div>}
            title="Customizable Solutions"
            description="Create stunning, professional-quality websites in record time with our powerful UI kit."
          />
        </div>
      </footer>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-40px, 30px) scale(1.15); }
          66% { transform: translate(30px, -20px) scale(0.85); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, -40px) scale(1.05); }
        }
        @keyframes float-particle {
          0%, 100% { transform: translate(0, 0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translate(100px, -100px); opacity: 0; }
        }
        @keyframes scan {
          0% { top: -2px; opacity: 0; }
          50% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes scan-delayed {
          0% { top: -2px; opacity: 0; }
          50% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes spin-slow {
          from { transform: rotate(45deg); }
          to { transform: rotate(405deg); }
        }
        @keyframes spin-reverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        .animate-float {
          animation: float 20s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 25s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 30s ease-in-out infinite;
        }
        .animate-scan {
          animation: scan 8s linear infinite;
        }
        .animate-scan-delayed {
          animation: scan-delayed 8s linear infinite 4s;
        }
        .animate-spin-slow {
          animation: spin-slow 30s linear infinite;
        }
        .animate-spin-reverse {
          animation: spin-reverse 25s linear infinite;
        }
      `}</style>
    </div>
  );
}

function NavItem({ icon, text, active }) {
  return (
    <div className={`flex items-center space-x-3 px-4 py-2 rounded-lg cursor-pointer transition ${
      active ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
    }`}>
      <div className="w-5 h-5">{icon}</div>
      <span className="text-sm">{text}</span>
    </div>
  );
}

function StatCard({ label, value, trend, chart, mini }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
      <p className="text-gray-400 text-xs mb-2">{label}</p>
      <div className="flex items-center justify-between">
        <span className="text-xl font-bold">{value}</span>
        {chart && (
          <div className="flex items-end space-x-1 h-8">
            {[4, 6, 3, 7, 5].map((h, i) => (
              <div key={i} className="w-1 bg-blue-500 rounded-full" style={{ height: `${h * 4}px` }} />
            ))}
          </div>
        )}
        {mini && (
          <div className="flex items-end space-x-1 h-6">
            {[3, 5, 4].map((h, i) => (
              <div key={i} className="w-1 bg-blue-500 rounded-full" style={{ height: `${h * 3}px` }} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function TimelineCard({ title, value }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
      <div className="flex items-start space-x-2 mb-4">
        <div className="w-8 h-1 bg-white/20 rounded mt-1" />
        <div className="flex-1">
          <p className="text-gray-400 text-xs mb-1">{title}</p>
          <div className="text-sm text-gray-500">Transaction details here</div>
        </div>
      </div>
      <div className="text-2xl font-bold text-gray-600">{value}</div>
    </div>
  );
}

function FeatureCard({ icon, title, description, badge, cta }) {
  return (
    <div className="bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-blue-500/50 transition group">
      {badge && (
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full mb-4 text-xs">
          <Sparkles className="w-3 h-3 text-blue-400" />
          <span>{badge}</span>
        </div>
      )}
      <div className="mb-6 flex items-center justify-center">{icon}</div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-400 text-sm mb-6">{description}</p>
      {cta && (
        <button className="px-6 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-sm font-medium transition">
          {cta}
        </button>
      )}
    </div>
  );
}