import React, { useState, useEffect } from 'react';
import { Shield, Search, Lock, Zap, CheckCircle, Download, ArrowRight, Globe, Database, Users, Award } from 'lucide-react';

export default function IPRegistryLanding() {
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[id^="section-"]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: <Shield className="w-10 h-10" />,
      title: "Secure Registration",
      description: "Register your digital assets with military-grade encryption and blockchain verification",
      number: "01"
    },
    {
      icon: <Search className="w-10 h-10" />,
      title: "Instant Verification",
      description: "Check IP ownership and authenticity in real-time with our advanced search engine",
      number: "02"
    },
    {
      icon: <Lock className="w-10 h-10" />,
      title: "Blockchain Protected",
      description: "Immutable records stored on secure blockchain network with cryptographic proof",
      number: "03"
    },
    {
      icon: <Zap className="w-10 h-10" />,
      title: "Lightning Fast",
      description: "Get results instantly with our optimized infrastructure and global CDN",
      number: "04"
    }
  ];

  const stats = [
    { label: "ACTIVE USERS", value: "50K+", icon: <Users className="w-6 h-6" /> },
    { label: "REGISTERED IPs", value: "2M+", icon: <Database className="w-6 h-6" /> },
    { label: "COUNTRIES", value: "120+", icon: <Globe className="w-6 h-6" /> },
    { label: "VERIFIED ASSETS", value: "5M+", icon: <Award className="w-6 h-6" /> }
  ];

  const benefits = [
    {
      title: "Real-time Protection",
      description: "Monitor your intellectual property 24/7 with automated alerts and instant notifications when unauthorized use is detected.",
      image: "🛡️"
    },
    {
      title: "Global Coverage",
      description: "Access a worldwide network of IP registries and databases. Verify ownership across multiple jurisdictions seamlessly.",
      image: "🌍"
    },
    {
      title: "Smart Analytics",
      description: "Get detailed insights about your IP portfolio with advanced analytics, usage tracking, and comprehensive reporting tools.",
      image: "📊"
    },
    {
      title: "Legal Compliance",
      description: "Stay compliant with international IP laws and regulations. Automatic updates ensure you're always protected legally.",
      image: "⚖️"
    }
  ];

  const handleClick = () => {
    const link = getExtensionLink();
    window.open(link, "_blank");
  };

  const getExtensionLink = () => {
    const ua = navigator.userAgent;

    if (ua.includes("Chrome")) {
      return "https://chrome.google.com/webstore/detail/metamask/...";
    }
    if (ua.includes("Firefox")) {
      return "https://addons.mozilla.org/en-US/firefox/addon/metamask/";
    }
    if (ua.includes("Edg")) {
      return "https://microsoftedge.microsoft.com/addons/detail/metamask/...";
    }
    return "https://metamask.io/download/";
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Animated Gradient Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 opacity-50"
          style={{
            background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(139, 92, 246, 0.15), transparent 50%)`
          }}
        />
        <div
          className="absolute w-[800px] h-[800px] bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"
          style={{ top: '0%', left: '0%' }}
        />
        <div
          className="absolute w-[800px] h-[800px] bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"
          style={{ top: '30%', right: '0%' }}
        />
        <div
          className="absolute w-[800px] h-[800px] bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"
          style={{ bottom: '0%', left: '30%' }}
        />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 px-6 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                <Shield className="w-7 h-7" />
              </div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              IP Shield
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
            <a href="#benefits" className="text-gray-300 hover:text-white transition-colors">Benefits</a>
            <a href="#how" className="text-gray-300 hover:text-white transition-colors">How it works</a>
            <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
          </div>
          <button onClick={handleClick} className="px-6 py-3 bg-white text-black rounded-full font-semibold hover:shadow-lg hover:shadow-white/50 transform hover:scale-105 transition-all duration-300">
            Install Now
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 pt-20 pb-32 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full text-sm font-semibold mb-8 animate-fade-in backdrop-blur-sm">
            <span className="text-purple-400">Powered By</span>
            <img
              className="w-5 h-5 rounded-full"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAM1BMVEUFByEEByEAABAAAB2Li5IgITI+Pkt4eYEAAAHFxcn///+3uLzb290NDyfz8/SoqK1kZG4P39DiAAAAAXRSTlPGMuG/4wAAAKBJREFUeAGk0IEKwyAMBNDqqTvTavv/X7vUMCClAWAHyOFTUbcthYnM8jdmDazi7g6Lpi5F0/oxNWQXkZ2rHlodYoimQa1oOeiO/c3ZqgqHiVMnC9f5J5PHfIkG9ziJB9pF+tThyumJaGLpfPkh7oYDLwgsK0we/XMcuq0NAQ59Yq6IcLLHeDWJsHbOGHFKgKqj9z4CTCCJ76iV+shL8gwAQlcIgai/2sUAAAAASUVORK5CYII="
              alt="Yakoa Logo"
            />
            <b className="text-white">Yakoa</b>
          </div>


          <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
            <span className="block text-white animate-slide-up">One Click</span>
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-slide-up animation-delay-200">
              Secure IP Verification
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in animation-delay-400">
            A browser extension that detects your IP, verifies license status, and ensures only authorized addresses gain access
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in animation-delay-600">
            <button onClick={handleClick} className="group px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300 flex items-center space-x-3">
              <Download className="w-6 h-6 group-hover:animate-bounce" />
              <span>Get Started Free</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-10 py-5 border-2 border-purple-500/50 rounded-full font-bold text-lg hover:bg-purple-500/10 hover:border-purple-500 transform hover:scale-105 transition-all duration-300 backdrop-blur-sm">
              Watch Demo
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mt-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 transform hover:-translate-y-2 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="text-purple-400 mb-3 group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-gray-500 font-semibold tracking-wider">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="section-features" className="relative z-10 px-6 py-32 max-w-7xl mx-auto">
        <div className={`transition-all duration-1000 ${isVisible['section-features'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-full text-sm font-semibold mb-6 backdrop-blur-sm">
              <span className="text-blue-400">CORE FEATURES</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Everything You Need
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Advanced tools and features designed to give you complete control over your intellectual property
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-10 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 rounded-3xl transition-all duration-500"></div>

                <div className="relative">
                  <div className="flex items-start justify-between mb-6">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
                      <div className="relative w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                        {feature.icon}
                      </div>
                    </div>
                    <div className="text-7xl font-bold text-white/5 group-hover:text-white/10 transition-colors">
                      {feature.number}
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-lg">
                    {feature.description}
                  </p>

                  <div className="mt-6 flex items-center text-purple-400 font-semibold group-hover:translate-x-2 transition-transform">
                    Learn more <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="section-benefits" className="relative z-10 px-6 py-32 max-w-7xl mx-auto">
        <div className={`transition-all duration-1000 ${isVisible['section-benefits'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full text-sm font-semibold mb-6 backdrop-blur-sm">
              <span className="text-purple-400">WHAT'S IN IT FOR YOU</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Why Choose IPGuard?
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Join thousands of creators who trust us to protect their most valuable assets
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12 transform hover:-translate-y-2 transition-all duration-500 overflow-hidden"
              >
                <div className="absolute top-0 right-0 text-9xl opacity-5 group-hover:opacity-10 transition-opacity group-hover:scale-110 transform duration-500">
                  {benefit.image}
                </div>

                <div className="relative">
                  <h3 className="text-3xl font-bold mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-lg">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="section-cta" className="relative z-10 px-6 py-32 max-w-7xl mx-auto">
        <div className={`relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-[3rem] p-16 md:p-24 text-center transform hover:scale-[1.01] transition-all duration-500 overflow-hidden ${isVisible['section-cta'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>

          <div className="relative">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Ready to Protect Your<br />Creative Work?
            </h2>
            <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join 50,000+ creators who are already securing their intellectual property with IPGuard
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={handleClick} className="group px-12 py-6 bg-white text-purple-600 rounded-full font-bold text-xl hover:shadow-2xl hover:shadow-white/30 transform hover:scale-105 transition-all duration-300 flex items-center space-x-3 mx-auto sm:mx-0">
                <Download className="w-6 h-6 group-hover:animate-bounce" />
                <span>Install Extension</span>
              </button>
              <button className="px-12 py-6 border-2 border-white rounded-full font-bold text-xl hover:bg-white/10 transform hover:scale-105 transition-all duration-300 mx-auto sm:mx-0">
                Contact Sales
              </button>
            </div>

            <div className="mt-12 flex items-center justify-center space-x-8 text-sm">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span>Free 14-day trial</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-16 max-w-7xl mx-auto border-t border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold">IPGuard</span>
            </div>
            <p className="text-gray-400">
              Protecting creative assets with blockchain technology
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Product</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-white/10 text-center text-gray-400">
          <p>&copy; 2025 IPGuard. All rights reserved.</p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -50px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(50px, 50px) scale(1.05); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 1s ease-out;
        }
        
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        
        .animation-delay-400 {
          animation-delay: 400ms;
        }
        
        .animation-delay-600 {
          animation-delay: 600ms;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}