import React from "react";

/**
 * Simple, modern navbar that is sticky and visually matches the landing page.
 * Copy-paste this file as `navbar.tsx`.
 */

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-transparent backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">G</div>
          <h1 className="text-lg font-semibold">IP Shield</h1>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm text-gray-300">
          <a href="#" className="hover:text-white transition">Home</a>
          <a href="#" className="hover:text-white transition">Docs</a>
          <a href="#" className="hover:text-white transition">About</a>
          <a href="#" className="hover:text-white transition">Contact</a>
        </nav>

        <div className="flex items-center gap-4">
          <button className="hidden md:inline-block px-4 py-2 text-sm rounded-lg bg-white/8 hover:bg-white/12 border border-white/10 transition">
            Try Now
          </button>

          {/* hamburger for small screens */}
          <button className="md:hidden p-2 rounded-lg bg-white/6 hover:bg-white/10 transition">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
