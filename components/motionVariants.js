export const premiumEase = [0.22, 1, 0.36, 1];

export const cascadeContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.08,
      staggerChildren: 0.1,
      staggerDirection: 1,
    },
  },
};

export const cascadeItem = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: premiumEase },
  },
};

export const pageCascade = {
  hidden: { opacity: 0, y: -12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.42,
      ease: premiumEase,
      when: "beforeChildren",
      staggerChildren: 0.08,
      staggerDirection: 1,
    },
  },
  exit: { opacity: 0, y: 8, transition: { duration: 0.18 } },
};
