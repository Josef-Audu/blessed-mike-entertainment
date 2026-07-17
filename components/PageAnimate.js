"use client";

import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import PreLoader from "./PreLoader";
import { cascadeItem, pageCascade, premiumEase } from "./motionVariants";

export default function PageAnimate({ children }) {
  const pathname = usePathname();

  return (
    <MotionConfig reducedMotion="user">
      <PreLoader key={pathname} />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={pathname} variants={pageCascade} initial="hidden" animate="visible" exit="exit">
          {children}
        </motion.div>
      </AnimatePresence>
    </MotionConfig>
  );
}

export function Reveal({ children, className = "", delay = 0 }) {
  const variants = {
    hidden: cascadeItem.hidden,
    visible: {
      ...cascadeItem.visible,
      transition: { duration: 0.5, delay, ease: premiumEase },
    },
  };

  return (
    <motion.div className={className} variants={variants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
      {children}
    </motion.div>
  );
}
