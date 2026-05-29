"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function NavbarContent() {
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeCategory = mounted ? searchParams.get("category") : null;

  const navItems = [
    { name: "Sports", slug: "sports" },
    { name: "Music Updates", slug: "music" },
    { name: "Entertainment", slug: "entertainment" },
    { name: "Pop Culture", slug: "pop-culture" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
      
      {/* Click logo to clear filters and see all posts */}
      <Link href="/" className="text-xl font-black uppercase tracking-tighter text-white hover:opacity-90">
        BLESSED <span className="text-amber-500">MIKE'S</span>
      </Link>

      {/* Navigation Categories */}
      <div className="hidden md:flex items-center gap-8">
        {navItems.map((item) => {
          const isActive = activeCategory === item.slug;
          return (
            <Link
              key={item.slug}
              href={`/?category=${item.slug}`}
              className={`text-xs font-bold uppercase tracking-widest transition-colors duration-200 ${
                isActive 
                  ? "text-amber-500 underline underline-offset-4" 
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </div>

    </div>
  );
}

export default function Navbar() {
  return (
    <nav className="w-full bg-zinc-950 border-b border-zinc-900 sticky top-0 z-50">
      <Suspense 
        fallback={
          <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
            <div className="text-xl font-black uppercase tracking-tighter text-white">
              BLESSED <span className="text-amber-500">MIKE'S</span>
            </div>
          </div>
        }
      >
        <NavbarContent />
      </Suspense>
    </nav>
  );
}