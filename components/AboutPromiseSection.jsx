"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/PageAnimate";

export default function AboutPromiseSection() {
  return (
    <section className="border-y border-zinc-900 bg-zinc-900/20 px-5 py-20 sm:px-8">
      <Reveal className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-amber-500">Our promise</p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="mt-4 font-sports text-4xl font-bold uppercase sm:text-5xl"
          >
            Energetic, useful, unmistakably ours.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="mt-5 leading-8 text-zinc-400"
          >
            We aim for credible reporting, distinctive editorial taste, and a community where disagreement never becomes disrespect.
          </motion.p>
        </div>
        <motion.a
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.96 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          href="/contact-press"
          className="inline-flex w-fit items-center rounded-full border border-amber-500/40 bg-amber-500 px-6 py-3 text-xs font-black uppercase tracking-[0.18em] text-zinc-950"
        >
          Work with our press desk
        </motion.a>
      </Reveal>
    </section>
  );
}
