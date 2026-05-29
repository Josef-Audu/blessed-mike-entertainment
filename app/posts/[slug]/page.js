"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function SinglePostPage() {
  const { slug } = useParams();
  
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    async function fetchPostBySlug() {
      if (!slug) return;
      
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .eq("slug", slug)
          .single();

        if (error) throw error;
        setPost(data);
      } catch (err) {
        console.error("Error pulling single broadcast log:", err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPostBySlug();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
        <div className="text-zinc-500 uppercase tracking-widest text-xs animate-pulse font-mono">
          Decrypting Arena Feed Segment...
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center px-4">
        <p className="text-zinc-500 text-sm font-mono uppercase tracking-widest mb-6">
          ⚠ Broadcast Segment Offline / Not Found
        </p>
        <Link 
          href="/" 
          className="text-xs font-bold uppercase tracking-wider text-amber-500 border border-zinc-900 hover:border-amber-500/30 px-5 py-3 rounded bg-zinc-900/20 transition-all"
        >
          ← Return to Main Grid
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white selection:bg-amber-500 selection:text-black font-sans antialiased pb-24">
      
      {/* DETAILED ARTICLE HERO HEADER AREA */}
      <header className="border-b border-zinc-900 bg-zinc-950/40 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 md:px-6 pt-12 pb-8">
          
          {/* Back Nav Button */}
          <Link 
            href="/" 
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-zinc-500 hover:text-amber-500 transition-colors mb-8 group"
          >
            <span className="group-hover:-translate-x-0.5 transition-transform">←</span> Return To Live Feed
          </Link>

          {/* Post Metadata Segment */}
          <div className="flex items-center gap-4 mb-4">
            <span className="text-[10px] font-black tracking-widest uppercase text-amber-500 bg-amber-500/5 border border-amber-500/10 px-2.5 py-1 rounded">
              ⚡ {post.category || "General"}
            </span>
            <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">
              Timestamp // {post.time_ago || "Live Transmission"}
            </span>
          </div>

          {/* Post Title */}
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-zinc-100 leading-tight">
            {post.title}
          </h1>

        </div>
      </header>

      {/* ARTICLE BODY & COVER MULTIMEDIA CONTENT CONTAINER */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 mt-10">
        
        {/* Cinematic Main Feature Visual Frame */}
        <div className="relative aspect-video w-full bg-zinc-900 rounded-xl overflow-hidden border border-zinc-900 mb-10 flex items-center justify-center shadow-2xl">
          {post.image_url && !imgError ? (
            <Image 
              src={post.image_url} 
              alt={post.title} 
              fill 
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
              onError={() => setImgError(true)}
              className="object-cover"
            />
          ) : (
            /* Tactical ambient mesh grid background fallback if cover img doesn't resolve */
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-zinc-950 flex flex-col items-center justify-center space-y-2 opacity-80">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
              <span className="text-zinc-600 text-xs font-black tracking-[0.4em] uppercase font-mono">
                Arena Secure Stream
              </span>
            </div>
          )}
        </div>

        {/* Dynamic Rich Text Render Layout Block */}
        <article className="prose prose-invert max-w-none">
          <p className="text-zinc-300 text-base md:text-lg leading-relaxed font-medium whitespace-pre-wrap tracking-wide">
            {post.content}
          </p>
        </article>

        {/* BOTTOM METADATA SEPARATOR CARD */}
        <footer className="mt-16 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-600 font-mono text-[10px] uppercase tracking-widest">
          <div>
            Route Parameter: <span className="text-zinc-400">/posts/{post.slug}</span>
          </div>
          <div>
            Data Sync ID: <span className="text-zinc-400">#{post.id}</span>
          </div>
        </footer>

      </div>
    </main>
  );
}