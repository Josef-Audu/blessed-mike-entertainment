"use client";

import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => <div className="hero-orb-fallback" />,
});

export default function HeroSceneLoader() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 right-[-22%] w-[90%] opacity-80 sm:right-[-10%] sm:w-[70%] lg:right-[-2%] lg:w-[52%]"
    >
      <HeroScene />
    </div>
  );
}
