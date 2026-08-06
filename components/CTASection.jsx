"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const CTABackground = dynamic(() => import("@/components/CTABackground"), { ssr: false });

export default function CTASection() {
  return (
    <section className="relative overflow-hidden border-y border-zinc-900 bg-zinc-950/80 px-5 py-20 sm:px-8 lg:py-24">
      <CTABackground />
      <div className="relative mx-auto max-w-7xl space-y-10">
        <div className="rounded-[2rem] border border-zinc-800 bg-zinc-950/95 p-8 shadow-[0_40px_120px_-48px_rgba(15,23,42,0.8)] backdrop-blur-xl sm:p-10 lg:p-12">
          <div className="flex flex-col gap-6">
            <div className="space-y-4">
              <p className="text-xs font-black uppercase tracking-[0.28em] text-amber-500">Get in touch</p>
              <h2 className="max-w-3xl text-3xl font-semibold uppercase tracking-tight text-white sm:text-4xl lg:text-5xl">Work with BLESSED MIKE&apos;S editorial desk.</h2>
              <p className="max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">For brand stories, interviews, partnerships, and press inquiries, use the links below to contact the desk directly.</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <motion.a whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }} href="mailto:Michaelchimeremuezeprosper@gmail.com" target="_blank" rel="noopener noreferrer" className="rounded-3xl border border-zinc-800 bg-zinc-900/80 px-5 py-6 text-left transition hover:border-amber-500/60">
                <p className="text-xs font-black uppercase tracking-[0.24em] text-amber-500">Email</p>
                <p className="mt-3 text-sm font-semibold text-white">Michaelchimeremuezeprosper@gmail.com</p>
              </motion.a>

              <motion.a whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }} href="https://wa.me/2347044281541?text=Hello%2C%20I%20would%20like%20to%20make%20an%20inquiry." target="_blank" rel="noopener noreferrer" className="rounded-3xl border border-zinc-800 bg-zinc-900/80 px-5 py-6 text-left transition hover:border-amber-500/60">
                <p className="text-xs font-black uppercase tracking-[0.24em] text-amber-500">WhatsApp</p>
                <p className="mt-3 text-sm font-semibold text-white">Message the press desk</p>
              </motion.a>

              <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }} className="rounded-3xl border border-zinc-800 bg-zinc-900/80 px-5 py-6 text-left transition hover:border-amber-500/60">
                <p className="text-xs font-black uppercase tracking-[0.24em] text-amber-500">Phone</p>
                <p className="mt-3 text-sm font-semibold text-white">07044281541</p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
