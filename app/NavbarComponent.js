"use client";

import Link from "next/link";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

const navItems = [
  { name: "Sports", slug: "sports" },
  { name: "Music Updates", slug: "music" },
  { name: "Entertainment", slug: "entertainment" },
  { name: "Pop Culture", slug: "pop-culture" },
];

export default function NavbarComponent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category");

  const handleNavClick = () => setIsMenuOpen(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-900/90 bg-zinc-950/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col px-4 md:px-6">
        <div className="flex h-16 items-center justify-between md:h-20">
          <Link
            href="/"
            onClick={() => setIsMenuOpen(false)}
            className="text-sm font-black uppercase tracking-[0.3em] text-white transition-all duration-200 ease-in-out hover:text-amber-500 active:scale-95 sm:text-base md:text-xl"
          >
            <span className="text-white">BLESSED</span>{" "}
            <span className="text-amber-500">MIKE&apos;S</span>
          </Link>

          <div className="hidden items-center gap-2 md:flex">
            {navItems.map((item) => {
              const isActive = activeCategory === item.slug;

              return (
                <Link
                  key={item.slug}
                  href={`/?category=${item.slug}`}
                  className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-200 ease-in-out active:scale-95 ${
                    isActive
                      ? "bg-amber-500/10 text-amber-500"
                      : "text-zinc-300 hover:bg-zinc-900 hover:text-amber-500"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900/80 text-zinc-200 transition-all duration-200 ease-in-out hover:border-amber-500/50 hover:text-amber-500 active:scale-95 md:hidden"
          >
            <span className="relative flex h-4 w-5 flex-col justify-center">
              <span
                className={`absolute h-0.5 w-5 rounded-full bg-current transition-all duration-300 ease-in-out ${
                  isMenuOpen ? "translate-y-0 rotate-45" : "-translate-y-2 rotate-0"
                }`}
              />
              <span
                className={`h-0.5 w-5 rounded-full bg-current transition-all duration-300 ease-in-out ${
                  isMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute h-0.5 w-5 rounded-full bg-current transition-all duration-300 ease-in-out ${
                  isMenuOpen ? "translate-y-0 -rotate-45" : "translate-y-2 rotate-0"
                }`}
              />
            </span>
          </button>
        </div>

        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
            isMenuOpen ? "max-h-64 opacity-100 pb-3" : "max-h-0 opacity-0 pb-0"
          }`}
        >
          <div className="flex flex-col gap-2 rounded-2xl border border-zinc-800/80 bg-zinc-900/80 p-3 shadow-2xl shadow-black/30">
            {navItems.map((item) => {
              const isActive = activeCategory === item.slug;

              return (
                <Link
                  key={item.slug}
                  href={`/?category=${item.slug}`}
                  onClick={handleNavClick}
                  className={`rounded-xl px-3 py-3 text-xs font-bold uppercase tracking-widest transition-all duration-200 ease-in-out active:scale-95 ${
                    isActive
                      ? "bg-amber-500/10 text-amber-500"
                      : "text-zinc-300 hover:bg-zinc-800 hover:text-amber-500"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
