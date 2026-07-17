"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

function PostCard({ post }) {
  const [mediaError, setMediaError] = useState(false);
  const isVideo = post.image_url && [".mp4", ".mov", ".webm"].some((extension) => post.image_url.toLowerCase().endsWith(extension));

  return (
    <article className="group bg-zinc-900/10 border border-zinc-900 rounded-xl overflow-hidden hover:border-zinc-800 flex flex-col">
      <div className="relative aspect-video bg-zinc-950 overflow-hidden">
        {post.image_url && !mediaError ? (
          isVideo ? <video src={post.image_url} muted loop autoPlay playsInline onError={() => setMediaError(true)} className="w-full h-full object-cover" /> : <Image src={post.image_url} alt={post.title} fill sizes="(max-width: 768px) 100vw, 33vw" onError={() => setMediaError(true)} className="object-cover group-hover:scale-[1.03] transition-transform" />
        ) : <div className="absolute inset-0 grid place-items-center text-zinc-700 text-xs uppercase tracking-widest">News feed</div>}
      </div>
      <div className="p-6 flex-1 flex flex-col justify-between gap-5">
        <div><p className="text-[10px] font-black tracking-widest uppercase text-amber-500 mb-3">{post.category || "General"}</p><h2 className="text-xl font-bold uppercase line-clamp-2">{post.title}</h2><p className="text-zinc-400 text-xs mt-2 line-clamp-3 leading-relaxed">{post.content}</p></div>
        <Link href={`/posts/${post.slug}`} className="text-xs font-bold text-amber-500">Open entry →</Link>
      </div>
    </article>
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
        let query = supabase
          .from("posts")
          .select("id,title,slug,category,content,image_url,likes,created_at")
          .order("created_at", { ascending: false })
          .limit(100);
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
    <main className="min-h-screen bg-zinc-950 text-white">
      {!category && <section className="relative border-b border-zinc-900 py-28 md:py-36 overflow-hidden text-center"><div className="absolute inset-0 bg-black">{!heroError && <Image src="/arena.jpg" alt="Arena stadium lights" fill priority sizes="100vw" onError={() => setHeroError(true)} className="object-cover opacity-[0.06] grayscale" />}</div><div className="relative max-w-5xl mx-auto px-4"><p className="text-xs font-black tracking-widest text-amber-500 mb-6">LIVE FROM THE ARENA</p><h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">BLESSED <span className="text-amber-500">MIKE{"'"}S</span> ENTERTAINMENT</h1><p className="text-zinc-400 mt-6">Sports, music, entertainment, and pop culture updates.</p></div></section>}
      <section className="max-w-7xl mx-auto py-12 px-4 md:px-6"><div className="mb-10 border-b border-zinc-900 pb-4 flex justify-between"><h2 className="text-xs font-black uppercase tracking-widest text-zinc-400">{category ? `Portal filter // ${category}` : "Latest broadcast feed"}</h2>{category && <Link href="/" className="text-xs text-amber-500">Show all posts</Link>}</div>{loading ? <p className="py-24 text-center text-zinc-600">Loading broadcasts…</p> : posts.length ? <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">{posts.map((post) => <PostCard key={post.id} post={post} />)}</div> : <p className="py-24 text-center text-zinc-600">No posts found.</p>}</section>
    </main>
  );
}
