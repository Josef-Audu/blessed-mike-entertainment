"use client";

"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const categoryLinks = [
  { name: "Sports Arena", href: "/?category=sports" },
  { name: "Music Updates", href: "/?category=music" },
  { name: "Entertainment", href: "/?category=entertainment" },
  { name: "Pop Culture", href: "/?category=pop-culture" },
];

const companyLinks = [
  { name: "About Us", href: "/about" },
  { name: "Contact Press", href: "/contact-press" },
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Terms of Service", href: "/terms-of-service" },
];

function FooterLink({ href, children }) {
  return <motion.div whileHover={{ x: 4 }}><Link href={href} className="inline-block transition-colors hover:text-amber-400">{children}</Link></motion.div>;
}

export default function Footer() {
  return (
    <footer className="border-t border-zinc-900 bg-zinc-950 font-sans text-zinc-400">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4">
            <Link href="/" className="text-xl font-black uppercase tracking-tight text-white">Blessed <span className="text-amber-400">Mike&apos;s</span></Link>
            <p className="max-w-xs text-sm leading-relaxed">The digital colosseum for Nigerian sports highlights, explosive afrobeats coverage, movie reviews, and pop culture breakdowns.</p>
            <div className="mt-2 flex gap-4">{["twitter", "instagram", "youtube", "tiktok"].map((platform) => <motion.a key={platform} href={`#${platform}`} aria-label={platform} whileHover={{ y: -3, scale: 1.08 }} className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 text-xs font-semibold text-zinc-400 transition-colors hover:border-amber-500/30 hover:text-amber-400">{platform[0]}</motion.a>)}</div>
          </div>
          <div><h2 className="mb-6 text-sm font-bold uppercase tracking-wider text-white">Categories</h2><ul className="flex flex-col gap-3 text-sm">{categoryLinks.map((link) => <li key={link.name}><FooterLink href={link.href}>{link.name}</FooterLink></li>)}</ul></div>
          <div><h2 className="mb-6 text-sm font-bold uppercase tracking-wider text-white">Company</h2><ul className="flex flex-col gap-3 text-sm">{companyLinks.map((link) => <li key={link.name}><FooterLink href={link.href}>{link.name}</FooterLink></li>)}</ul></div>
          <div>
            <h2 className="mb-6 text-sm font-bold uppercase tracking-wider text-white">Stay in the loop</h2>
            <p className="mb-4 text-sm leading-relaxed">Get the freshest headlines delivered straight to your inbox.</p>
            <form onSubmit={(event) => event.preventDefault()} className="flex flex-col gap-2">
              <label htmlFor="footer-email" className="sr-only">Email address</label>
              <input id="footer-email" type="email" placeholder="Enter your email address" required className="w-full rounded-lg border border-zinc-800/80 bg-zinc-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-amber-500" />
              <motion.button type="submit" whileHover={{ y: -2, scale: 1.01 }} whileTap={{ scale: 0.98 }} className="w-full rounded-lg bg-amber-500 py-3 text-sm font-bold uppercase tracking-wider text-zinc-950 transition-colors hover:bg-amber-400 hover:shadow-[0_12px_36px_rgba(245,158,11,0.16)]">Subscribe now</motion.button>
            </form>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 border-t border-zinc-900 pt-8 text-xs sm:flex-row">
          <p>© 2026 Blessed Mike&apos;s Entertainment. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <motion.a whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.96 }} target="_blank" rel="noopener noreferrer" href="mailto:Michaelchimeremuezeprosper@gmail.com" className="rounded-full border border-zinc-800 bg-zinc-900 px-4 py-2 text-xs font-semibold text-zinc-300">Email us</motion.a>
            <motion.a whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.96 }} target="_blank" rel="noopener noreferrer" href="https://wa.me/2347044281541?text=Hello%2C%20I%20would%20like%20to%20make%20an%20inquiry." className="rounded-full border border-amber-500 bg-amber-500 px-4 py-2 text-xs font-black text-zinc-950">WhatsApp</motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
}
