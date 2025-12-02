import React, { useState, useEffect } from 'react';

// Icons
const Menu = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

const X = ({ size = 26 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

// Types
interface NavbarProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

interface NavLink {
  href: string;
  label: string;
}

// Navigation Links
const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/features", label: "Features" },
  { href: "/docs", label: "Docs" },
  
];

// Helper function to check if link is active
const isLinkActive = (href: string, currentPath: string): boolean => {
  // Exact match for home page
  if (href === "/" && currentPath === "/") {
    return true;
  }
  
  // For other pages, check if current path starts with href
  if (href !== "/" && currentPath.startsWith(href)) {
    return true;
  }
  
  return false;
};

// Navbar Component
export default function Navbar({ mobileMenuOpen, setMobileMenuOpen }: NavbarProps) {
  const [currentPath, setCurrentPath] = useState("");

  // Detect current route on mount and when URL changes
  useEffect(() => {
    // Get initial path
    setCurrentPath(window.location.pathname);

    // Listen for route changes (for SPAs using pushState)
    const handleRouteChange = () => {
      setCurrentPath(window.location.pathname);
    };

    // Listen to popstate event (browser back/forward)
    window.addEventListener('popstate', handleRouteChange);

    // For SPAs, you might also want to listen to custom events
    // window.addEventListener('routechange', handleRouteChange);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      // window.removeEventListener('routechange', handleRouteChange);
    };
  }, []);

  return (
    <>
      <nav className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-black bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Genesis
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 text-sm font-medium">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`transition-colors ${
                isLinkActive(link.href, currentPath) ? 'text-pink-400' : 'hover:text-pink-400'
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden hover:text-pink-400 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
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
        {/* Mobile Menu Panel */}
        <div 
          className={`absolute top-0 right-0 w-64 h-full bg-[#140024] p-6 transition-transform duration-500 ease-out ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button 
            onClick={() => setMobileMenuOpen(false)} 
            className="mb-6 ml-auto block hover:text-pink-400 transition-colors"
            aria-label="Close menu"
          >
            <X size={26} />
          </button>

          {/* Mobile Navigation Links */}
          <nav className="flex flex-col gap-4 text-sm">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`transition-all transform hover:translate-x-2 ${
                  isLinkActive(link.href, currentPath) ? 'text-pink-400' : 'hover:text-pink-400'
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
}