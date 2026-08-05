import { Reveal } from "@/components/PageAnimate";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const CTABackground = dynamic(() => import("@/components/CTABackground"), { ssr: false });

export const metadata = {
  title: "Contact Press | Blessed Mike's Entertainment",
  description: "Media inquiries, interview requests, partnerships, and brand resources.",
};

export default function ContactPressPage() {
  return (
    <div className="bg-zinc-950 text-white">
      <CTABackground />
      <section className="relative border-b border-zinc-900 px-5 py-24 sm:px-8 md:py-28">
        <Reveal className="mx-auto max-w-7xl">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-amber-500">Company / Press room</p>
          <div className="mt-5 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <motion.h1 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="font-sports text-5xl font-bold uppercase leading-none sm:text-7xl">Let&apos;s make<br /><span className="text-zinc-500">the headline.</span></motion.h1>
            <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="max-w-xl leading-8 text-zinc-400">For interviews, editorial partnerships, event accreditation, corrections, and licensing requests, send our press desk the details below.</motion.p>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.72fr_1.28fr] lg:py-28">
        <Reveal className="space-y-8">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-500">Press contact</p>
            <h2 className="mt-3 text-2xl font-bold">Michaelchimeremuezeprosper@gmail.com</h2>
            <p className="mt-3 text-sm leading-7 text-zinc-500">Use the buttons to email or message the press desk directly.</p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <motion.a whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.96 }} target="_blank" rel="noopener noreferrer" href="mailto:Michaelchimeremuezeprosper@gmail.com" className="inline-flex items-center rounded-full border border-amber-500/30 bg-amber-500 px-5 py-2 text-sm font-black uppercase tracking-[0.14em] text-zinc-950">Email press</motion.a>
              <motion.a whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.96 }} target="_blank" rel="noopener noreferrer" href="https://wa.me/2347044281541?text=Hello%2C%20I%20would%20like%20to%20make%20an%20inquiry." className="inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900 px-5 py-2 text-sm font-black uppercase tracking-[0.14em] text-amber-500">Message on WhatsApp</motion.a>
            </div>
          </div>
          <div className="border-t border-zinc-900 pt-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">Best response window</p>
            <p className="mt-3 text-sm leading-7 text-zinc-300">Monday-Friday, 9:00-17:00 WAT. Mark time-sensitive requests clearly in the subject line.</p>
          </div>
          <div className="border-t border-zinc-900 pt-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">Brand resources</p>
            <div className="mt-4 space-y-3">
              {["Primary logo pack", "Editorial screenshots", "Brand usage guide"].map((item) => (
                <div key={item} className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/25 px-4 py-3 text-sm">
                  <span>{item}</span><span className="text-[10px] font-black uppercase tracking-widest text-amber-500">Coming soon</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <form action="mailto:Michaelchimeremuezeprosper@gmail.com" method="post" encType="text/plain" className="rounded-3xl border border-zinc-800 bg-zinc-900/20 p-6 shadow-2xl shadow-black/30 sm:p-9">
            <div className="grid gap-6 sm:grid-cols-2">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Your name<input name="name" required className="mt-2 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm font-normal normal-case tracking-normal text-white outline-none transition focus:border-amber-500" /></label>
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Work email<input name="email" type="email" required className="mt-2 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm font-normal normal-case tracking-normal text-white outline-none transition focus:border-amber-500" /></label>
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Publication<input name="publication" className="mt-2 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm font-normal normal-case tracking-normal text-white outline-none transition focus:border-amber-500" /></label>
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Deadline<input name="deadline" type="date" className="mt-2 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm font-normal normal-case tracking-normal text-white outline-none transition focus:border-amber-500" /></label>
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 sm:col-span-2">Inquiry type<select name="inquiry-type" className="mt-2 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm font-normal normal-case tracking-normal text-white outline-none transition focus:border-amber-500"><option>Interview request</option><option>Editorial partnership</option><option>Event accreditation</option><option>Licensing request</option><option>Correction or clarification</option><option>Other</option></select></label>
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 sm:col-span-2">Your message<textarea name="message" required minLength={20} rows={7} className="mt-2 w-full resize-y rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm font-normal normal-case tracking-normal text-white outline-none transition focus:border-amber-500" /></label>
            </div>
            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-md text-xs leading-5 text-zinc-500">Submitting opens your device&apos;s email application. Do not include confidential or embargoed material until the press mailbox is confirmed.</p>
              <motion.button type="submit" whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.96 }} className="rounded-full bg-amber-500 px-6 py-3 text-xs font-black uppercase tracking-[0.18em] text-zinc-950 transition">Prepare inquiry</motion.button>
            </div>
          </form>
        </Reveal>
      </section>
    </div>
  );
}
