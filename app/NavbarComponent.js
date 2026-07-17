"use client";

import { motion } from "framer-motion";
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
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-900/90 bg-zinc-950/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 md:px-6">
        <motion.div whileHover={{ scale: 1.025 }} whileTap={{ scale: 0.98 }}>
          <Link href="/" className="text-xl font-black uppercase tracking-tighter text-white transition hover:drop-shadow-[0_0_18px_rgba(245,158,11,0.22)]">Blessed <span className="text-amber-500">Mike&apos;s</span></Link>
        </motion.div>
        <div className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <motion.div key={item.slug} whileHover={{ y: -2 }} whileTap={{ scale: 0.96 }}>
              <Link href={`/?category=${item.slug}`} className={`block rounded-full px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors ${activeCategory === item.slug ? "bg-amber-500/10 text-amber-400" : "text-zinc-400 hover:bg-zinc-900 hover:text-white"}`}>{item.name}</Link>
            </motion.div>
          ))}
        </div>
      </div>
    </nav>
  );
}
