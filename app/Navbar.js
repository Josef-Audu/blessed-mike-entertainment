"use client";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/70 backdrop-blur-md border-b border-zinc-900 text-white transition-all">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Branding / Logo - Safely escaped apostrophe */}
        <div className="font-sports text-2xl font-bold tracking-wider uppercase">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">Blessed</span> {"Mike's"}
        </div>

        {/* Desktop Navigation Menu Links */}
        <div className="hidden md:flex items-center gap-8 font-sports text-sm uppercase tracking-widest font-medium mx-auto">
          <a href="#sports" className="text-zinc-300 hover:text-amber-400 transition duration-200">Sports</a>
          <a href="#music" className="text-zinc-300 hover:text-amber-400 transition duration-200">Music Updates</a>
          <a href="#entertainment" className="text-zinc-300 hover:text-amber-400 transition duration-200">Entertainment</a>
          <a href="#pop-culture" className="text-zinc-300 hover:text-amber-400 transition duration-200">Pop Culture</a>
        </div>

        {/* Mobile Hamburger Button Menu toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="md:hidden text-zinc-300 hover:text-white focus:outline-none p-2"
          aria-label="Toggle Menu"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown Navigation Drawer */}
      {isOpen && (
        <div className="md:hidden bg-zinc-950/95 backdrop-blur-lg border-b border-zinc-900 px-6 py-6 flex flex-col gap-5 font-sports text-base uppercase tracking-wider">
          <a href="#sports" className="text-zinc-300 hover:text-amber-400 py-1 border-b border-zinc-900" onClick={() => setIsOpen(false)}>Sports</a>
          <a href="#music" className="text-zinc-300 hover:text-amber-400 py-1 border-b border-zinc-900" onClick={() => setIsOpen(false)}>Music Updates</a>
          <a href="#entertainment" className="text-zinc-300 hover:text-amber-400 py-1 border-b border-zinc-900" onClick={() => setIsOpen(false)}>Entertainment</a>
          <a href="#pop-culture" className="text-zinc-300 hover:text-amber-400 py-1" onClick={() => setIsOpen(false)}>Pop Culture</a>
        </div>
      )}
    </nav>
  );
}