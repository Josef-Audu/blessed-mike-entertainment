"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

const navItems = [
  { name: "Sports", slug: "sports" },
  { name: "Music Updates", slug: "music" },
  { name: "Entertainment", slug: "entertainment" },
  { name: "Pop Culture", slug: "pop-culture" },
];

export default function NavbarComponent() {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category");

  return (
    <nav className="w-full bg-zinc-950 border-b border-zinc-900 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
        <Link href="/" className="text-xl font-black uppercase tracking-tighter text-white hover:opacity-90">
          BLESSED <span className="text-amber-500">MIKE{"'"}S</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.slug}
              href={`/?category=${item.slug}`}
              className={`text-xs font-bold uppercase tracking-widest transition-colors ${activeCategory === item.slug ? "text-amber-500 underline underline-offset-4" : "text-zinc-400 hover:text-white"}`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
