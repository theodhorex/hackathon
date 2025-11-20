import React, { useEffect, useRef } from "react";
import {
  Sparkles,
  Activity,
  Users,
  Shield,
  Calendar,
  CreditCard,
  Settings,
  Search,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Play,
} from "lucide-react";

/**
 * Improved LandingPage with smooth particle parallax on scroll.
 * - Particles are positioned fixed (so they don't reflow when scrolling)
 * - Parallax target is based on window.scrollY
 * - Smooth motion via requestAnimationFrame + lerp (no layout thrash)
 */

type Particle = {
  leftPct: number;
  topPct: number;
  size: number;
  parallax: number; // -0.2 .. 0.2
  speedOffset: number;
};

export default function LandingPage() {
  const particlesCount = 36;
  const particlesRef = useRef<Particle[]>([]);
  const elsRef = useRef<Array<HTMLDivElement | null>>([]);
  const animRef = useRef<number | null>(null);
  const lastScrollRef = useRef<number>(0);
  const currentOffsetsRef = useRef<number[]>([]); // current Y offset for each particle (for lerp)

  // initialize particles once
  useEffect(() => {
    const arr: Particle[] = [];
    for (let i = 0; i < particlesCount; i++) {
      arr.push({
        leftPct: Math.random() * 100,
        topPct: Math.random() * 100,
        size: 1 + Math.random() * 3, // px size multiplier
        parallax: (Math.random() - 0.5) * 0.4, // -0.2 .. +0.2
        speedOffset: Math.random() * 2,
      });
    }
    particlesRef.current = arr;
    currentOffsetsRef.current = new Array(arr.length).fill(0);
  }, []); // run once

  // update lastScrollRef on scroll (no re-render)
  useEffect(() => {
    const onScroll = () => {
      lastScrollRef.current = window.scrollY || window.pageYOffset;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // RAF loop that lerps particle transforms to target (based on scroll)
  useEffect(() => {
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      const scrollY = lastScrollRef.current;
      const winH = window.innerHeight || 1;

      for (let i = 0; i < particlesRef.current.length; i++) {
        const p = particlesRef.current[i];
        const el = elsRef.current[i];
        if (!el) continue;

        // compute target offset: center-based subtle parallax
        // Using topPct to vary influence (particles near center move slightly differently)
        const centerFactor = (p.topPct / 50) - 1; // -1 .. +1
        const baseTarget = -scrollY * p.parallax * (0.6 + Math.abs(centerFactor) * 0.8);

        // small oscillation based on time to keep it lively (use speedOffset)
        const time = performance.now() / 1000;
        const wobble = Math.sin(time * (0.2 + p.speedOffset * 0.4)) * (0.5 + p.size * 0.25);

        const target = baseTarget + wobble;

        // lerp current offset -> target
        const cur = currentOffsetsRef.current[i] ?? 0;
        const next = lerp(cur, target, 0.12); // 0.12 smoothing factor = fairly smooth
        currentOffsetsRef.current[i] = next;

        // apply transform using translate3d (GPU accelerated)
        // keep initial left/top as percent and just translate in px
        el.style.transform = `translate3d(0px, ${next}px, 0) scale(${1})`;
        el.style.opacity = `${0.35 + Math.min(0.65, p.size * 0.15)}`; // subtle size-based alpha
      }

      animRef.current = requestAnimationFrame(tick);
    };

    animRef.current = requestAnimationFrame(tick);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  // regenerate positions on resize to avoid out-of-viewport placements
  useEffect(() => {
    const onResize = () => {
      // slightly nudge random positions to fit new viewport (so they feel "repositioned")
      particlesRef.current = particlesRef.current.map((p) => ({
        ...p,
        leftPct: Math.min(98, Math.max(1, p.leftPct + (Math.random() - 0.5) * 6)),
        topPct: Math.min(98, Math.max(1, p.topPct + (Math.random() - 0.5) * 6)),
      }));
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950 text-white overflow-x-hidden">
      {/* Animated Futuristic Background - fixed so does not reflow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Gradient Orbs (kept) */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl" style={{ willChange: "transform, opacity" }} />
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl" style={{ willChange: "transform, opacity" }} />
        <div className="absolute bottom-20 left-1/3 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl" style={{ willChange: "transform, opacity" }} />

        {/* Grid Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-18" style={{ color: "rgba(96, 165, 250, 0.12)" }}>
          <defs>
            <pattern id="grid2" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="currentColor" strokeWidth="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid2)" />
        </svg>

        {/* Particles managed by JS for smooth parallax */}
        {particlesRef.current.length === 0 ? null : (
          particlesRef.current.map((p, i) => (
            <div
              key={i}
              ref={(el) => (elsRef.current[i] = el)}
              className="absolute rounded-full bg-blue-400"
              style={{
                left: `${p.leftPct}%`,
                top: `${p.topPct}%`,
                width: `${2 + p.size}px`,
                height: `${2 + p.size}px`,
                transform: "translate3d(0,0,0)",
                transition: "opacity 0.35s linear",
                willChange: "transform, opacity",
                pointerEvents: "none",
                mixBlendMode: "screen",
              }}
            />
          ))
        )}

        {/* subtle scanning lines as CSS animation (kept) */}
        <div className="absolute inset-0">
          <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent animate-scan" />
          <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-purple-400/30 to-transparent animate-scan-delayed" />
        </div>

        {/* Some geometric shapes */}
        <div className="absolute top-1/4 right-1/4 w-32 h-32 border border-blue-400/20 rotate-45" style={{ filter: "blur(0.2px)" }} />
        <div className="absolute bottom-1/4 left-1/4 w-24 h-24 border border-purple-400/20" />
      </div>

      {/* Navigation (use separate Navbar component file if you like) */}
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
        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8 backdrop-blur-sm">
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span className="text-sm">Update 2.0 - AI Integration</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            Revolutionize
          </span>{" "}
          your digital<br />
          saas products
        </h1>

        <p className="text-gray-400 text-lg mb-16 max-w-2xl mx-auto">
          Create stunning, professional-quality websites in record time with our powerful UI kit. Elevate your SAAS game today!
        </p>

        {/* small dashboard preview omitted for brevity in this snippet */}
        <div className="max-w-5xl mx-auto relative">
          <div className="absolute inset-0 bg-blue-500/12 blur-3xl rounded-full" />
          <div className="relative bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
            {/* content retained from your original code (sidebar / cards) */}
            <div className="flex gap-8">
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
              <div className="flex-1">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Good Morning</p>
                    <h2 className="text-2xl font-bold">Welcome</h2>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="text"
                      placeholder="Search"
                      className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm w-64 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-8">
                  <StatCard label="Activity" value="$540.50" trend="up" />
                  <StatCard label="Total Amount" value="$682.5" chart />
                  <StatCard label="New Clients" value="$350.40" mini />
                  <StatCard label="Active Now" value="$350.4" mini />
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-semibold">Balance</h3>
                      <span className="flex items-center text-green-400 text-xs">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-1" />
                        On track
                      </span>
                    </div>
                    <select className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-sm">
                      <option>Monthly</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div>
                      <p className="text-gray-400 text-xs mb-1">Total Balance</p>
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold">43.50%</span>
                        <span className="flex items-center text-green-400 text-xs">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          +4.5%
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs mb-1">Income</p>
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-semibold">$52,422</span>
                        <span className="flex items-center text-red-400 text-xs">
                          <TrendingDown className="w-3 h-3 mr-1" />
                          -2.4%
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs mb-1">Expenses</p>
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-semibold">$52,422</span>
                        <span className="flex items-center text-red-400 text-xs">
                          <TrendingDown className="w-3 h-3 mr-1" />
                          -1.2%
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="relative h-32">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 transition">
                        <Play className="w-5 h-5 ml-1" />
                      </button>
                    </div>
                    <svg className="w-full h-full" viewBox="0 0 600 120" preserveAspectRatio="none">
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

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <TimelineCard title="Your Timeline" value="$25,216" />
                  <TimelineCard title="Your Timeline" value="$25,216" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center space-x-12 mt-20 opacity-50">
          <span className="text-sm font-semibold">SQUARESPACE</span>
          <span className="text-sm font-semibold">maze</span>
          <span className="text-sm font-semibold">afterpay</span>
          <span className="text-sm font-semibold">classpass</span>
          <span className="text-sm font-semibold">SQUARESPACE</span>
        </div>
      </section>

      {/* Features Section - keep same as before */}
      <section className="relative z-10 px-8 py-20">
        <div className="text-center mb-16">
          <p className="text-blue-400 text-sm uppercase tracking-wider mb-4">HOW IT WORKS</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-400">
              Powerful
            </span>{" "}
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
          {/* other feature cards... */}
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
        </div>
      </section>

      {/* inline css animations kept for subtle effects */}
      <style jsx>{`
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
        .animate-scan {
          animation: scan 10s linear infinite;
        }
        .animate-scan-delayed {
          animation: scan-delayed 10s linear infinite 3s;
        }
      `}</style>
    </div>
  );
}

/* helper subcomponents (the same as you used) */
function NavItem({ icon, text, active }: { icon: React.ReactNode; text: string; active?: boolean }) {
  return (
    <div className={`flex items-center space-x-3 px-4 py-2 rounded-lg cursor-pointer transition ${
      active ? "bg-white/10 text-white" : "text-gray-400 hover:text-white hover:bg-white/5"
    }`}>
      <div className="w-5 h-5">{icon}</div>
      <span className="text-sm">{text}</span>
    </div>
  );
}

function StatCard({ label, value, trend, chart, mini }: any) {
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

function TimelineCard({ title, value }: any) {
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

function FeatureCard({ icon, title, description, badge, cta }: any) {
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
