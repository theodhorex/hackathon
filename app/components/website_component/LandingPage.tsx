import React, { useState, useEffect, useRef } from 'react';
import { Twitter, Send, MessageCircle, Youtube, Instagram, ChevronDown, Menu, X, Shield, Zap, Code, BookOpen, ChevronRight, Activity, Globe, Lock } from 'lucide-react';

// =================================================================
// KONFIGURASI TEMA
// =================================================================
const THEME_COLORS = {
  YAKOA_GRADIENT: "from-blue-500/90 to-cyan-500/90",
  STORY_GRADIENT: "from-purple-500/90 to-pink-500/90",
  BASE_DARK: 'bg-[#060815]', // Background sangat gelap
  ACCENT_CYAN: 'text-cyan-400',
  ACCENT_PURPLE: 'text-purple-400',
};

export default function IPSagaLanding() {
  // =================================================================
  // STATE & REFS
  // =================================================================
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // =================================================================
  // EFFECTS (ANIMASI & SCROLL)
  // =================================================================
  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    
    // --- Particle Animation Setup ---
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    const particles: Array<{x: number, y: number, vx: number, vy: number, size: number, color: string}> = [];
    const MAX_PARTICLES = 100; // Jumlah partikel optimal
    
    // Inisialisasi Partikel
    for (let i = 0; i < MAX_PARTICLES; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        color: i % 2 === 0 ? 'rgba(100, 255, 255, 0.4)' : 'rgba(236, 72, 153, 0.4)' // Cyan & Pink
      });
    }

    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        
        // Bounce off walls
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        
        // Connect nearby particles
        for(let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p2.x - p.x;
            const dy = p2.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 120) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.strokeStyle = `rgba(100, 255, 255, ${(1 - dist / 120) * 0.08})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
      });
      
      animationId = requestAnimationFrame(animate);
    };
    animate();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // =================================================================
  // DATA KONTEN
  // =================================================================
  const stats = [
    { label: 'IPs Protected via Story', value: '18,021', color: 'from-purple-500 to-pink-500', icon: <Lock className="w-6 h-6 mb-2 text-pink-400" /> },
    { label: 'Infringements Detected', value: '1,374', color: 'from-cyan-500 to-blue-500', icon: <Activity className="w-6 h-6 mb-2 text-cyan-400" /> },
    { label: 'Royalty Distributed', value: '$5.7M', color: 'from-amber-500 to-yellow-500', icon: <Zap className="w-6 h-6 mb-2 text-amber-400" /> },
    { label: 'Network Coverage', value: 'Global', color: 'from-green-500 to-emerald-500', icon: <Globe className="w-6 h-6 mb-2 text-emerald-400" /> },
  ];

  const features = [
    { 
        icon: <Zap size={24} className={THEME_COLORS.ACCENT_CYAN} />, 
        title: 'Yakoa Real-Time Scanner', 
        description: 'Teknologi pemindaian bertenaga AI yang mendeteksi konten original Anda di seluruh marketplace web3 dan web2 secara instan.',
        gradient: THEME_COLORS.YAKOA_GRADIENT,
    },
    { 
        icon: <Code size={24} className={THEME_COLORS.ACCENT_PURPLE} />, 
        title: 'Story IP Minting', 
        description: 'Ubah karya seni Anda menjadi Aset IP yang dapat diprogram di blockchain. Tetapkan aturan lisensi dan royalti Anda sendiri.',
        gradient: THEME_COLORS.STORY_GRADIENT,
    },
    { 
        icon: <BookOpen size={24} className={'text-emerald-400'} />, 
        title: 'Decentralized Royalty', 
        description: 'Sistem pembayaran otomatis yang memastikan Anda mendapatkan bayaran setiap kali IP Anda digunakan atau di-remix oleh orang lain.',
        gradient: 'from-emerald-500 to-green-500',
    },
  ];

  const menuItems = ['Features', 'Protocols', 'Metrics', 'Team', 'Docs'];

  // =================================================================
  // KOMPONEN KECIL
  // =================================================================
  const NavItem = ({ href, children }: { href: string, children: React.ReactNode }) => (
    <a
      href={href}
      className="text-sm font-medium text-gray-300 hover:text-white transition-all duration-300 relative group py-2"
    >
      {children}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
    </a>
  );

  // =================================================================
  // RENDER HALAMAN
  // =================================================================
  return (
    <div className={`min-h-screen ${THEME_COLORS.BASE_DARK} text-white overflow-x-hidden relative font-sans antialiased selection:bg-cyan-500/30`}>
      
      {/* 1. BACKGROUND CANVAS (FIXED & FULLSCREEN) */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-60" />
      
      {/* Grid Overlay Statis */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(100,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(100,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none z-0" />
      
      {/* Gradient Glow Overlay */}
      <div className="fixed top-0 left-1/4 w-1/2 h-1/2 bg-purple-900/20 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="fixed bottom-0 right-1/4 w-1/2 h-1/2 bg-cyan-900/20 rounded-full blur-[120px] pointer-events-none z-0"></div>

      {/* Main Content Wrapper */}
      <div className="relative z-10">
        
        {/* --- NAVIGATION --- */}
        <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrollY > 20 ? 'bg-[#060815]/80 backdrop-blur-xl border-b border-white/5 shadow-2xl' : 'bg-transparent'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              
              {/* Logo */}
              <div className="relative group cursor-pointer" onClick={() => window.scrollTo(0,0)}>
                <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
                <div className="relative text-2xl font-black bg-gradient-to-r from-cyan-400 via-white to-purple-400 bg-clip-text text-transparent flex items-center gap-2 group-hover:scale-105 transition-transform duration-300">
                   <Shield className="w-8 h-8 text-cyan-400" />
                   IP SHIELD
                </div>
              </div>
              
              {/* Desktop Menu */}
              <div className="hidden lg:flex items-center space-x-8">
                {menuItems.map((item) => (
                    <NavItem key={item} href={`#${item.toLowerCase()}`}>{item}</NavItem>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4">
                <a href="#" className="hidden sm:flex relative px-6 py-2.5 font-bold text-sm rounded-xl overflow-hidden group hover:scale-105 transition-transform duration-300 shadow-lg shadow-cyan-900/20">
                  <div className={`absolute inset-0 bg-gradient-to-r ${THEME_COLORS.YAKOA_GRADIENT} opacity-90 group-hover:opacity-100 transition-opacity`}></div>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <span className="relative z-10 flex items-center gap-2 text-white">
                    Get Extension <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </a>

                {/* Mobile Menu Toggle */}
                <button 
                    className="lg:hidden p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>
        </nav>
        
        {/* --- MOBILE MENU OVERLAY --- */}
        <div className={`fixed inset-0 z-40 bg-[#060815]/95 backdrop-blur-xl transition-transform duration-300 lg:hidden ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="flex flex-col items-center justify-center h-full space-y-8 p-6">
                {menuItems.map((item) => (
                    <a 
                        key={item} 
                        href={`#${item.toLowerCase()}`} 
                        className="text-2xl font-bold text-gray-300 hover:text-cyan-400 transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        {item}
                    </a>
                ))}
                <a href="#" className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold text-white text-xl shadow-xl shadow-cyan-900/20">
                    Download Extension
                </a>
            </div>
        </div>

        {/* --- HERO SECTION --- */}
        <header className="relative pt-48 pb-32 text-center overflow-hidden px-4">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-full blur-[100px] pointer-events-none"></div>
          
          <h1 className={`text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight tracking-tight transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="block mb-2 text-white">Protect Your Vision</span>
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(100,255,255,0.3)]">
              With Story & Yakoa
            </span>
          </h1>

          <p className={`max-w-2xl mx-auto text-lg md:text-xl text-gray-400 mb-12 leading-relaxed transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Platform perlindungan kekayaan intelektual (IP) definitif untuk era Web3. Deteksi pelanggaran secara real-time dan daftarkan karya Anda di blockchain.
          </p>
          
          <div className={`flex flex-col sm:flex-row justify-center gap-6 items-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Primary CTA */}
            <a href="#" className={`relative w-full sm:w-auto px-8 py-4 font-bold text-lg rounded-full overflow-hidden group shadow-lg shadow-cyan-500/20 ${THEME_COLORS.ACCENT_CYAN} hover:scale-105 transition-transform duration-300`}>
              <div className={`absolute inset-0 bg-gradient-to-r ${THEME_COLORS.YAKOA_GRADIENT} transition-all duration-300 group-hover:brightness-110`}></div>
              <span className="relative z-10 text-white flex items-center justify-center gap-2">
                <Zap size={20} className="group-hover:rotate-12 transition-transform" /> 
                Start Protecting Now
              </span>
            </a>
            
            {/* Secondary CTA */}
            <a href="#" className="relative w-full sm:w-auto px-8 py-4 font-bold text-lg rounded-full overflow-hidden group border border-gray-700 hover:border-purple-500/50 backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <span className={`relative z-10 ${THEME_COLORS.ACCENT_PURPLE} flex items-center justify-center gap-2 group-hover:text-purple-300`}>
                <Code size={20} /> 
                Explorer Protocol
              </span>
            </a>
          </div>

          {/* Floating UI Elements (Decoration) */}
          <div className="hidden lg:block absolute left-10 top-1/3 animate-bounce duration-[3000ms]">
            <div className="bg-gray-900/80 backdrop-blur-md p-4 rounded-2xl border border-cyan-500/30 shadow-2xl">
                <Shield className="w-8 h-8 text-cyan-400 mb-2" />
                <div className="h-2 w-20 bg-gray-700 rounded mb-1"></div>
                <div className="h-2 w-12 bg-gray-700 rounded"></div>
            </div>
          </div>
          <div className="hidden lg:block absolute right-10 bottom-1/3 animate-bounce duration-[4000ms]">
            <div className="bg-gray-900/80 backdrop-blur-md p-4 rounded-2xl border border-purple-500/30 shadow-2xl">
                <Lock className="w-8 h-8 text-purple-400 mb-2" />
                <div className="h-2 w-20 bg-gray-700 rounded mb-1"></div>
                <div className="h-2 w-16 bg-gray-700 rounded"></div>
            </div>
          </div>
        </header>

        {/* --- STATS SECTION --- */}
        <section id="metrics" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="relative group p-6 rounded-2xl bg-gray-900/40 border border-gray-800 backdrop-blur-sm overflow-hidden text-left shadow-lg hover:shadow-2xl hover:border-gray-600 transition-all duration-300 hover:-translate-y-1">
                <div className={`absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300`}>
                    {stat.icon}
                </div>
                <div className={`absolute -inset-1 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                <div className="relative mt-4">
                    <p className="text-4xl font-black text-white mb-2 drop-shadow-md">{stat.value}</p>
                    <p className="text-sm uppercase font-bold text-gray-400 tracking-wider group-hover:text-gray-300 transition-colors">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- FEATURES SECTION --- */}
        <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
            <div className="text-center mb-16">
                <h2 className="text-sm font-bold text-cyan-400 uppercase tracking-widest mb-2">Powerhouse Technology</h2>
                <h3 className="text-4xl md:text-5xl font-black text-white mb-4">The Dual-Protocol Advantage</h3>
                <p className="text-gray-400 max-w-2xl mx-auto text-lg">Menggabungkan deteksi AI canggih dengan infrastruktur blockchain yang tak terbantahkan.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                    <div key={index} className="relative p-8 rounded-3xl bg-[#0a0c1f] border border-gray-800 shadow-xl transition-all duration-500 hover:scale-[1.02] hover:border-gray-600 group z-10 overflow-hidden">
                        {/* Gradient Blob Background on Hover */}
                        <div className={`absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 rounded-full blur-3xl transition-opacity duration-500`}></div>
                        
                        <div className="relative flex items-center justify-center w-14 h-14 mb-6 rounded-2xl bg-gray-800/50 border border-gray-700 group-hover:border-white/20 transition-colors">
                            <span className="group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                                {feature.icon}
                            </span>
                        </div>
                        
                        <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all">
                            {feature.title}
                        </h3>
                        <p className="text-gray-400 leading-relaxed mb-6 group-hover:text-gray-300 transition-colors">
                            {feature.description}
                        </p>
                        
                        <a href="#" className="inline-flex items-center text-sm font-bold text-white/70 group-hover:text-cyan-400 transition-colors">
                            Learn technical details <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                ))}
            </div>
        </section>
        
        {/* --- TEAM/COMMUNITY SECTION --- */}
        <section id="team" className="py-24 border-t border-white/5 bg-white/[0.02]">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-10">Trusted by Creators Worldwide</h2>
                <div className="flex flex-wrap justify-center gap-8 opacity-50 hover:opacity-100 transition-opacity duration-500">
                    {['YAKOA', 'STORY', 'ETHEREUM', 'POLYGON', 'SOLANA'].map((partner) => (
                        <span key={partner} className="text-xl font-black tracking-widest text-gray-400 mx-4">{partner}</span>
                    ))}
                </div>
            </div>
        </section>

        {/* --- FOOTER --- */}
        <footer className="border-t border-white/10 bg-[#04050a] pt-16 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                {/* Brand Column */}
                <div className="col-span-1 md:col-span-1">
                    <div className="flex items-center gap-2 mb-4">
                        <Shield className="w-6 h-6 text-cyan-400" />
                        <span className="text-xl font-black text-white">IP SHIELD</span>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed mb-6">
                        Melindungi hak kekayaan intelektual kreator di era digital dengan teknologi blockchain dan AI.
                    </p>
                </div>

                {/* Links Columns */}
                <div>
                    <h4 className="font-bold text-white mb-4">Platform</h4>
                    <ul className="space-y-2 text-sm text-gray-500">
                        {['Features', 'Pricing', 'API', 'Integration', 'Roadmap'].map(item => (
                            <li key={item}><a href="#" className="hover:text-cyan-400 transition-colors">{item}</a></li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-white mb-4">Resources</h4>
                    <ul className="space-y-2 text-sm text-gray-500">
                        {['Documentation', 'Whitepaper', 'Community', 'Help Center', 'Partners'].map(item => (
                            <li key={item}><a href="#" className="hover:text-cyan-400 transition-colors">{item}</a></li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-white mb-4">Connect</h4>
                    <div className="flex space-x-4">
                        {[Twitter, Send, MessageCircle, Youtube, Instagram].map((Icon, index) => (
                            <a 
                                key={index} 
                                href="#" 
                                className="p-2 rounded-lg bg-white/5 hover:bg-cyan-500/20 text-gray-400 hover:text-cyan-400 transition-all duration-300 hover:-translate-y-1"
                            >
                                <Icon size={18} />
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-xs text-gray-600">
                  &copy; {new Date().getFullYear()} IP Shield Inc. All rights reserved. Powered by Yakoa & Story Protocol.
                </p>
                <div className="flex space-x-6 text-xs text-gray-600">
                    <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    <a href="#" className="hover:text-white transition-colors">Cookie Settings</a>
                </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}