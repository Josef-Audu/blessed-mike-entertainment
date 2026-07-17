import Link from "next/link";
import { Reveal } from "@/components/PageAnimate";

export const metadata = {
  title: "About Us | Blessed Mike's Entertainment",
  description: "Meet the Nigerian editorial team covering sport, afrobeats, film, and pop culture.",
};

const pillars = [
  { number: "01", title: "Sports, with pulse", copy: "Fast, context-rich coverage of Nigerian football, global fixtures, standout performances, and the moments supporters replay all week." },
  { number: "02", title: "Afrobeats, amplified", copy: "Releases, breakout voices, live moments, and the creative forces moving Nigerian sound from local speakers to the world stage." },
  { number: "03", title: "Screens, decoded", copy: "Sharp movie reviews and entertainment reporting that respect the audience, the craft, and the conversation around every release." },
  { number: "04", title: "Culture, in context", copy: "Clear, energetic breakdowns of the people, trends, and internet moments shaping how Nigeria talks, creates, and connects." },
];

export default function AboutPage() {
  return (
    <div className="overflow-hidden bg-zinc-950 text-white">
      <section className="relative border-b border-zinc-900 px-5 py-24 sm:px-8 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_30%,rgba(245,158,11,0.13),transparent_34%)]" />
        <div className="relative mx-auto max-w-7xl">
          <Reveal>
            <p className="mb-5 text-xs font-black uppercase tracking-[0.28em] text-amber-500">Company / Our story</p>
            <h1 className="max-w-5xl font-sports text-5xl font-bold uppercase leading-[0.94] tracking-tight sm:text-7xl lg:text-8xl">
              Nigerian stories.<br /><span className="text-zinc-500">Arena energy.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-8 text-zinc-400 sm:text-lg">
              Blessed Mike&apos;s Entertainment is an independent digital media arena built for people who want the headline, the feeling, and the context behind it.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.75fr_1.25fr] lg:py-28">
        <Reveal>
          <p className="text-xs font-black uppercase tracking-[0.25em] text-amber-500">What drives us</p>
          <h2 className="mt-4 font-sports text-4xl font-bold uppercase tracking-tight sm:text-5xl">Coverage that moves at the speed of culture.</h2>
        </Reveal>
        <div className="grid gap-px overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-800 sm:grid-cols-2">
          {pillars.map((pillar, index) => (
            <Reveal key={pillar.number} delay={index * 0.06} className="bg-zinc-950 p-7 sm:p-9">
              <span className="text-xs font-black tracking-[0.25em] text-amber-500">{pillar.number}</span>
              <h3 className="mt-8 font-sports text-2xl font-bold uppercase">{pillar.title}</h3>
              <p className="mt-3 text-sm leading-7 text-zinc-400">{pillar.copy}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-zinc-900 bg-zinc-900/20 px-5 py-20 sm:px-8">
        <Reveal className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-amber-500">Our promise</p>
            <h2 className="mt-4 font-sports text-4xl font-bold uppercase sm:text-5xl">Energetic, useful, unmistakably ours.</h2>
            <p className="mt-5 leading-8 text-zinc-400">We aim for credible reporting, distinctive editorial taste, and a community where disagreement never becomes disrespect.</p>
          </div>
          <Link href="/contact-press" className="inline-flex w-fit items-center rounded-full border border-amber-500/40 bg-amber-500 px-6 py-3 text-xs font-black uppercase tracking-[0.18em] text-zinc-950 transition hover:-translate-y-1 hover:bg-amber-300 hover:shadow-[0_16px_50px_rgba(245,158,11,0.2)]">
            Work with our press desk
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
