"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

function MainFeedContent() {
  const searchParams = useSearchParams();
  
  // Client Hydration Mount Gate
  const [mounted, setMounted] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [heroImageError, setHeroImageError] = useState(false);

  // Trigger mounting flag immediately on browser load
  useEffect(() => {
    setMounted(true);
  }, []);

  const categoryFilter = mounted ? searchParams.get("category") : null;

  useEffect(() => {
    if (!mounted) return;

    async function fetchFilteredPosts() {
      try {
        setLoading(true);
        
        let query = supabase
          .from("posts")
          .select("*")
          .order("created_at", { ascending: false });

        if (categoryFilter) {
          query = query.ilike("category", `%${categoryFilter}%`);
        }

        const { data, error } = await query;
        if (error) throw error;
        
        setPosts(data || []);
      } catch (err) {
        console.error("Error matching feed query:", err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchFilteredPosts();
  }, [categoryFilter, mounted]);

  // Clean ambient dark background placeholder during initialization
  if (!mounted || loading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
        <div className="text-zinc-500 uppercase tracking-widest text-xs animate-pulse font-mono">
          Syncing Arena Broadcasts...
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white selection:bg-amber-500 selection:text-black">
      
      {/* ==================== HERO SECTION LANDING PAGE ==================== */}
      {!categoryFilter && (
        <section className="relative bg-zinc-950 border-b border-zinc-900 py-28 md:py-36 overflow-hidden flex items-center justify-center">
          
          {/* High-Impact Cinematic Background Image with Bulletproof Fallback */}
          <div className="absolute inset-0 z-0 bg-black">
            {!heroImageError ? (
              <Image 
                src="/arena.jpg" 
                alt="Arena Stadium Lights"
                fill
                priority
                sizes="100vw"
                onError={() => setHeroImageError(true)}
                className="object-cover opacity-[0.06] object-center filter grayscale contrast-150 pointer-events-none"
              />
            ) : (
              /* Fallback high-contrast mesh texture if local image returns 404 */
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900 opacity-20"></div>
            )}
            
            {/* Smooth dark gradient layers and absolute vignette to blend the image out */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950 opacity-95 pointer-events-none"></div>
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f0f11_1px,transparent_1px),linear-gradient(to_bottom,#0f0f11_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 pointer-events-none"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10 text-center flex flex-col items-center">
            <span className="text-xs font-black uppercase tracking-widest text-amber-500 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-md mb-6 animate-pulse">
              ⚡ LIVE FROM THE ARENA
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-zinc-100 leading-none max-w-5xl mb-6 select-none">
              BLESSED <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600">MIKE'S</span> ENTERTAINMENT
            </h1>
            <p className="text-sm md:text-base text-zinc-400 max-w-2xl font-medium tracking-wide leading-relaxed lowercase first-letter:uppercase">
              Your premium portal for raw updates, dark cinematic score updates, sports breakdowns, and community arena talk.
            </p>
          </div>
        </section>
      )}

      {/* ==================== GLOBAL CONTENT FEED ==================== */}
      <div className="max-w-7xl mx-auto py-12 px-4 md:px-6">
        
        <div className="mb-10 border-b border-zinc-900 pb-4 flex justify-between items-center">
          <h2 className="text-xs font-black uppercase tracking-widest text-zinc-400 font-mono">
            {categoryFilter ? `Portal Filter // ${categoryFilter}` : "Latest Broadcast Feed"}
          </h2>
          {categoryFilter && (
            <Link href="/" className="text-xs text-amber-500 font-bold uppercase tracking-wider hover:text-amber-400 transition-colors">
              Show All Posts ×
            </Link>
          )}
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-zinc-900 rounded-xl bg-zinc-900/10">
            <p className="text-zinc-500 text-sm italic">No entries found under this specific cluster yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

// Isolated Sub-component to manage clean per-card client image errors dynamically
function PostCard({ post }) {
  const [imgError, setImgError] = useState(false);

  return (
    <article className="group bg-zinc-900/10 border border-zinc-900 rounded-xl overflow-hidden hover:border-zinc-800 transition-all duration-300 flex flex-col justify-between">
      
      <div className="relative aspect-video w-full bg-zinc-950 overflow-hidden border-b border-zinc-900 flex items-center justify-center">
        {post.image_url && !imgError ? (
          <Image 
            src={post.image_url} 
            alt={post.title} 
            fill 
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={() => setImgError(true)}
            className="object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-zinc-950 flex items-center justify-center">
            <span className="text-zinc-700 text-xs font-black tracking-[0.3em] uppercase font-mono group-hover:text-zinc-500 transition-colors duration-300">
              News Feed
            </span>
          </div>
        )}
      </div>

      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <span className="text-[10px] font-black tracking-widest uppercase text-amber-500 bg-amber-500/5 border border-amber-500/10 px-2 py-0.5 rounded block w-max mb-3">
            ⚡ {post.category || "General"}
          </span>
          <h3 className="text-xl font-bold uppercase tracking-tight line-clamp-2 text-zinc-200 group-hover:text-white transition-colors">
            {post.title}
          </h3>
          <p className="text-zinc-400 text-xs mt-2 line-clamp-3 leading-relaxed font-medium">
            {post.content}
          </p>
        </div>

        <div className="pt-4 border-t border-zinc-900/60 flex justify-between items-center">
          <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">
            {post.time_ago || "Live"}
          </span>
          <Link href={`/posts/${post.slug}`} className="text-xs font-bold text-amber-500 hover:text-amber-400 inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-all">
            Open Entry →
          </Link>
        </div>
      </div>

    </article>
  );
}

export default function Homepage() {
  return (
    <Suspense 
      fallback={
        <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
          <div className="text-zinc-500 uppercase tracking-widest text-xs font-mono animate-pulse">
            Initializing Portal Grid...
          </div>
        </div>
      }
    >
      <MainFeedContent />
    </Suspense>
  );
}