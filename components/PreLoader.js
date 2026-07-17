"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function PreLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 620);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="status"
          aria-live="polite"
          aria-label="Loading Blessed Mike's Entertainment"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.32 } }}
          className="fixed inset-0 z-[100] grid place-items-center bg-zinc-950"
        >
          <div className="flex flex-col items-center gap-5">
            <div className="relative h-16 w-16">
              <motion.span className="absolute inset-0 rounded-full border border-amber-500/20" animate={{ scale: [0.82, 1.16], opacity: [0.7, 0] }} transition={{ duration: 1.15, repeat: Infinity, ease: "easeOut" }} />
              <motion.span className="absolute inset-1 rounded-full border-2 border-transparent border-t-amber-400 border-r-amber-500/50" animate={{ rotate: 360 }} transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }} />
              <span className="absolute inset-0 grid place-items-center font-sports text-sm font-bold text-amber-400">BM</span>
            </div>
            <div className="text-center"><p className="text-[10px] font-black uppercase tracking-[0.32em] text-amber-500">Entering the arena</p><span className="mt-2 block h-px w-36 overflow-hidden bg-zinc-800"><motion.span className="block h-full bg-amber-500" initial={{ x: "-100%" }} animate={{ x: "100%" }} transition={{ duration: 0.85, repeat: Infinity, ease: "easeInOut" }} /></span></div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
