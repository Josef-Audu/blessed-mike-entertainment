"use client"; // ⚡ This tells Next.js to allow interactivity like onSubmit forms!

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 text-zinc-400 font-sans">
      <div className="max-w-7xl mx-auto px-6 py-16">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="text-xl font-black tracking-tight text-white uppercase">
              BLESSED <span className="text-amber-400">MIKE{"'"}S</span>
            </Link>
            <p className="text-sm text-zinc-400 leading-relaxed max-w-xs">
              {"The ultimate digital colosseum for Nigerian sports highlights, explosive afrobeats coverage, movie reviews, and pop culture breakdowns."}
            </p>
            {/* Social Icons Placeholder */}
            <div className="flex gap-4 mt-2">
              {["twitter", "instagram", "youtube", "tiktok"].map((platform) => (
                <a 
                  key={platform} 
                  href={`#${platform}`} 
                  className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-amber-400 hover:border-amber-500/30 transition duration-200 capitalize text-xs font-semibold"
                >
                  {platform[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links Column */}
          <div>
            <h4 className="text-sm font-bold tracking-wider text-white uppercase mb-6">
              {"Categories"}
            </h4>
            <ul className="flex flex-col gap-3 text-sm">
              {[
                { name: "Sports Arena", href: "#" },
                { name: "Music Updates", href: "#" },
                { name: "Entertainment", href: "#" },
                { name: "Pop Culture", href: "#" }
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-amber-400 transition duration-200">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Business & Legal Column */}
          <div>
            <h4 className="text-sm font-bold tracking-wider text-white uppercase mb-6">
              {"Company"}
            </h4>
            <ul className="flex flex-col gap-3 text-sm">
              {[
                { name: "About Us", href: "#" },
                { name: "Contact Press", href: "#" },
                { name: "Privacy Policy", href: "#" },
                { name: "Terms of Service", href: "#" }
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-amber-400 transition duration-200">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 className="text-sm font-bold tracking-wider text-white uppercase mb-6">
              {"Stay in the Loop"}
            </h4>
            <p className="text-sm text-zinc-400 mb-4 leading-relaxed">
              {"Get the absolute freshest headlines delivered straight to your inbox."}
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-2">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800/80 rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500 transition duration-200"
                required
              />
              <button 
                type="submit" 
                className="w-full py-3 bg-amber-500 text-zinc-950 text-sm font-bold uppercase tracking-wider rounded-lg hover:bg-amber-400 transition duration-200"
              >
                {"Subscribe Now"}
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© 2026 Blessed Mike{"'"}s Entertainment. All rights reserved.</p>
          <p className="text-zinc-600">
            {"Engineered with Next.js & Tailwind CSS"}
          </p>
        </div>

      </div>
    </footer>
  );
}