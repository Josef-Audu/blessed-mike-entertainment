"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import HeroSceneLoader from "@/components/HeroSceneLoader";
import { Reveal } from "@/components/PageAnimate";
import { cascadeContainer, cascadeItem } from "@/components/motionVariants";
import { supabase } from "@/lib/supabase";

function PostCard({ post }) {
  const [mediaError, setMediaError] = useState(false);
  const isVideo = post.image_url && [".mp4", ".mov", ".webm"].some((extension) => post.image_url.toLowerCase().endsWith(extension));

  return (
    <motion.article variants={cascadeItem} whileHover={{ y: -8, scale: 1.01 }} className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-900 bg-zinc-900/15 shadow-xl shadow-black/10 transition-colors hover:border-amber-500/25 hover:shadow-[0_22px_60px_rgba(0,0,0,0.32)]">
      <div className="relative aspect-video overflow-hidden bg-zinc-950">
        {post.image_url && !mediaError ? (
          isVideo ? <video src={post.image_url} muted loop autoPlay playsInline onError={() => setMediaError(true)} className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]" /> : <Image src={post.image_url} alt={post.title} fill sizes="(max-width: 768px) 100vw, 33vw" onError={() => setMediaError(true)} className="object-cover transition duration-700 group-hover:scale-[1.04]" />
        ) : <div className="absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.08),transparent_60%)] text-xs uppercase tracking-widest text-zinc-700">News feed</div>}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/55 to-transparent opacity-60" />
      </div>
      <div className="flex flex-1 flex-col justify-between gap-5 p-6">
        <div><p className="mb-3 text-[10px] font-black uppercase tracking-widest text-amber-500">{post.category || "General"}</p><h2 className="line-clamp-2 font-sports text-2xl font-bold uppercase leading-tight">{post.title}</h2><p className="mt-3 line-clamp-3 text-xs leading-relaxed text-zinc-400">{post.content}</p></div>
        <Link href={`/posts/${post.slug}`} className="w-fit text-xs font-bold uppercase tracking-wider text-amber-500 transition group-hover:translate-x-1 group-hover:text-amber-300">Open entry <span aria-hidden="true">→</span></Link>
      </div>
    </motion.article>
  );
}

export default function HomepageClient() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [heroError, setHeroError] = useState(false);

  useEffect(() => {
    let active = true;
    async function loadPosts() {
      setLoading(true);
      try {
        let query = supabase.from("posts").select("id,title,slug,category,content,image_url,likes,created_at").order("created_at", { ascending: false }).limit(100);
        if (category) query = query.eq("category", category);
        const { data, error } = await query;
        if (error) throw error;
        if (active) setPosts(data || []);
      } catch (error) {
        console.error("Post feed failed", error.message);
      } finally {
        if (active) setLoading(false);
      }
    }
    loadPosts();
    return () => { active = false; };
  }, [category]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {!category && (
        <section className="relative min-h-[620px] overflow-hidden border-b border-zinc-900">
          <div className="absolute inset-0 bg-black">{!heroError && <Image src="/arena.jpg" alt="" fill priority sizes="100vw" onError={() => setHeroError(true)} className="object-cover opacity-[0.09] grayscale" />}<div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_42%,rgba(245,158,11,0.14),transparent_35%),linear-gradient(90deg,#09090b_0%,rgba(9,9,11,0.92)_45%,rgba(9,9,11,0.5)_100%)]" /></div>
          <HeroSceneLoader />
          <div className="relative mx-auto flex min-h-[620px] max-w-7xl items-center px-5 py-24 sm:px-8">
            <motion.div variants={cascadeContainer} initial="hidden" animate="visible" className="max-w-3xl">
              <motion.p variants={cascadeItem} className="mb-6 text-xs font-black uppercase tracking-[0.3em] text-amber-500">Live from the arena</motion.p>
              <motion.h1 variants={cascadeItem} className="font-sports text-5xl font-bold uppercase leading-[0.92] tracking-tight sm:text-7xl lg:text-8xl">Blessed <span className="text-amber-500">Mike&apos;s</span><br />Entertainment</motion.h1>
              <motion.p variants={cascadeItem} className="mt-7 max-w-xl text-base leading-7 text-zinc-400 sm:text-lg">Sports, music, entertainment, and pop culture—reported with Nigerian energy and global perspective.</motion.p>
              <motion.div variants={cascadeItem} className="mt-9 flex flex-wrap gap-4"><Link href="#latest" className="rounded-full bg-amber-500 px-6 py-3 text-xs font-black uppercase tracking-[0.18em] text-zinc-950 transition hover:-translate-y-1 hover:bg-amber-300 hover:shadow-[0_16px_50px_rgba(245,158,11,0.2)]">Explore the feed</Link><Link href="/about" className="rounded-full border border-zinc-700 bg-zinc-950/50 px-6 py-3 text-xs font-black uppercase tracking-[0.18em] text-white backdrop-blur transition hover:-translate-y-1 hover:border-amber-500/50">Our story</Link></motion.div>
            </motion.div>
          </div>
        </section>
      )}

      <section id="latest" className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
        <Reveal className="mb-10 flex items-end justify-between border-b border-zinc-900 pb-5"><div><p className="mb-2 text-[10px] font-black uppercase tracking-[0.25em] text-amber-500">Editorial desk</p><h2 className="font-sports text-2xl font-bold uppercase tracking-wide text-white">{category ? `Portal filter / ${category}` : "Latest broadcast feed"}</h2></div>{category && <Link href="/" className="text-xs font-bold uppercase tracking-wider text-amber-500 transition hover:text-amber-300">Show all posts</Link>}</Reveal>
        {loading ? <p className="py-24 text-center text-zinc-600">Loading broadcasts...</p> : posts.length ? <motion.div variants={cascadeContainer} initial="hidden" animate="visible" className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">{posts.map((post) => <PostCard key={post.id} post={post} />)}</motion.div> : <p className="py-24 text-center text-zinc-600">No posts found.</p>}
      </section>
    </div>
  );
}
