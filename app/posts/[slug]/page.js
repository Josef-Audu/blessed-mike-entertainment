"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function SinglePostPage() {
  const { slug } = useParams();
  
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imgError, setImgError] = useState(false);

  // Simple Form State
  const [authorName, setAuthorName] = useState("");
  const [commentContent, setCommentContent] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    async function fetchPostAndComments() {
      if (!slug) return;
      
      try {
        setLoading(true);
        
        // 1. Fetch Post Detail
        const { data: postData, error: postError } = await supabase
          .from("posts")
          .select("*")
          .eq("slug", slug)
          .single();

        if (postError) throw postError;
        setPost(postData);

        // 2. Fetch Associated Comments matching the post slug
        const { data: commentData, error: commentError } = await supabase
          .from("comments")
          .select("*")
          .eq("post_slug", slug)
          .order("created_at", { ascending: false });

        if (commentError) throw commentError;
        setComments(commentData || []);

      } catch (err) {
        console.error("Error loading post data:", err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPostAndComments();
  }, [slug]);

  // Handle Likes
  const handleLike = async () => {
    if (liked) return;
    
    try {
      const updatedLikes = (post.likes || 0) + 1;
      
      setPost({ ...post, likes: updatedLikes });
      setLiked(true);

      const { error } = await supabase
        .from("posts")
        .update({ likes: updatedLikes })
        .eq("id", post.id);

      if (error) throw error;
    } catch (err) {
      console.error("Failed to update likes:", err.message);
    }
  };

  // Handle Comment Submission
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentContent.trim()) return;

    try {
      setSubmittingComment(true);

      // Synced exactly with your Supabase schema definitions
      const payload = {
        post_slug: slug,
        username: authorName.trim() || "Anonymous User",
        comment_text: commentContent.trim()
      };

      const { data, error } = await supabase
        .from("comments")
        .insert([payload])
        .select()
        .single();

      if (error) throw error;

      // Update UI with the new comment seamlessly
      setComments([data, ...comments]);
      setCommentContent("");
      setAuthorName("");
    } catch (err) {
      console.error("Comment submission failed:", err.message);
    } finally {
      setSubmittingComment(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center font-sans">
        <div className="text-zinc-500 text-sm animate-pulse">Loading content...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center px-4 font-sans">
        <p className="text-zinc-500 text-sm mb-6">Post not found.</p>
        <Link href="/" className="text-xs font-bold uppercase tracking-wider text-amber-500 border border-zinc-900 px-5 py-3 rounded bg-zinc-900/20">
          ← Back to Home
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white selection:bg-amber-500 selection:text-black font-sans antialiased pb-24">
      
      {/* HEADER */}
      <header className="border-b border-zinc-900 bg-zinc-950/40 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 md:px-6 pt-12 pb-8">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-zinc-500 hover:text-amber-500 transition-colors mb-8">
            ← Back to Home
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-[10px] font-bold tracking-widest uppercase text-amber-500 bg-amber-500/5 border border-amber-500/10 px-2.5 py-1 rounded">
              {post.category || "General"}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-zinc-100 leading-tight">
            {post.title}
          </h1>
        </div>
      </header>

      {/* BODY CONTENT */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 mt-10">
        <div className="relative aspect-video w-full bg-zinc-900 rounded-xl overflow-hidden border border-zinc-900 mb-10 flex items-center justify-center shadow-2xl">
          {post.image_url && !imgError ? (
            <Image src={post.image_url} alt={post.title} fill priority sizes="(max-w-1200px) 100vw, 1200px" onError={() => setImgError(true)} className="object-cover" />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-zinc-950 flex flex-col items-center justify-center opacity-80">
              <span className="text-zinc-600 text-xs font-bold tracking-wider uppercase">No Image Available</span>
            </div>
          )}
        </div>

        <article className="prose prose-invert max-w-none mb-12">
          <p className="text-zinc-300 text-base md:text-lg leading-relaxed font-normal whitespace-pre-wrap tracking-wide">
            {post.content}
          </p>
        </article>

        {/* LIKES SYSTEM */}
        <div className="border-y border-zinc-900 py-6 my-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={handleLike}
              disabled={liked}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg border text-xs font-bold tracking-wider uppercase transition-all ${
                liked 
                  ? "bg-amber-500/10 border-amber-500/30 text-amber-500" 
                  : "bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
              }`}
            >
              {liked ? "👍 Liked" : "👍 Like"}
            </button>
            <span className="text-xs text-zinc-500">
              <strong className="text-zinc-200 font-bold">{post.likes || 0}</strong> likes
            </span>
          </div>
        </div>

        {/* COMMENTS SECTION */}
        <section className="mt-12">
          <h3 className="text-lg font-bold tracking-wide uppercase text-zinc-100 mb-6 flex items-center gap-2">
            <span>Comments</span>
            <span className="text-xs px-2 py-0.5 bg-zinc-900 border border-zinc-800 rounded-full text-zinc-500">{comments.length}</span>
          </h3>

          {/* Clean Submission Form */}
          <form onSubmit={handleCommentSubmit} className="bg-zinc-900/20 border border-zinc-900 rounded-xl p-5 mb-10 space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1.5">Your Name</label>
                <input 
                  type="text" 
                  placeholder="Anonymous User"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-900 rounded px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-amber-500/50 transition-colors"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1.5">Comment</label>
                <textarea 
                  rows="3"
                  required
                  placeholder="Write a comment..."
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-900 rounded px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-amber-500/50 transition-colors placeholder:text-zinc-700"
                ></textarea>
              </div>
            </div>
            <div className="flex justify-end">
              <button 
                type="submit"
                disabled={submittingComment}
                className="px-5 py-2 bg-zinc-100 text-black hover:bg-amber-500 text-xs font-bold tracking-wider uppercase rounded transition-all disabled:opacity-50"
              >
                {submittingComment ? "Posting..." : "Post Comment"}
              </button>
            </div>
          </form>

          {/* Clean Comments Display List */}
          <div className="space-y-4">
            {comments.length === 0 ? (
              <div className="text-center py-8 border border-dashed border-zinc-900 rounded-xl">
                <p className="text-xs text-zinc-600 uppercase tracking-wider">No comments yet. Be the first to leave one!</p>
              </div>
            ) : (
              comments.map((comment) => (
                <div key={comment.id} className="border border-zinc-900/60 bg-zinc-950/30 rounded-lg p-4 space-y-2">
                  <div className="flex items-center justify-between border-b border-zinc-900/40 pb-1.5">
                    <span className="text-xs font-bold text-amber-500/80">
                      {comment.username || "Anonymous User"}
                    </span>
                    <span className="text-[10px] text-zinc-600">
                      {new Date(comment.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-zinc-400 text-sm leading-relaxed whitespace-pre-wrap">
                    {comment.comment_text}
                  </p>
                </div>
              ))
            )}
          </div>
        </section>

      </div>
    </main>
  );
}