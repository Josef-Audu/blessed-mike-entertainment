"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function PostPageClient() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imgError, setImgError] = useState(false);
  const [authorName, setAuthorName] = useState("");
  const [commentContent, setCommentContent] = useState("");
  const [website, setWebsite] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);
  const [liked, setLiked] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const [postResult, commentResult] = await Promise.all([
          supabase.from("posts").select("id,title,slug,category,content,image_url,likes,created_at").eq("slug", slug).single(),
          supabase.from("comments").select("id,post_slug,username,comment_text,created_at").eq("post_slug", slug).order("created_at", { ascending: false }).limit(200),
        ]);
        if (postResult.error) throw postResult.error;
        if (commentResult.error) throw commentResult.error;
        if (active) {
          setPost(postResult.data);
          setComments(commentResult.data || []);
        }
      } catch (error) {
        console.error("Post load failed", error.message);
      } finally {
        if (active) setLoading(false);
      }
    }
    if (slug) load();
    return () => { active = false; };
  }, [slug]);

  async function handleLike() {
    if (liked || !post) return;
    setFormError("");
    const response = await fetch(`/api/posts/${encodeURIComponent(post.id)}/like`, { method: "POST" });
    const result = await response.json();
    if (!response.ok) {
      setFormError(result.error || "Unable to register the like.");
      return;
    }
    setPost((current) => ({ ...current, likes: result.likes }));
    setLiked(true);
  }

  async function handleCommentSubmit(event) {
    event.preventDefault();
    setSubmittingComment(true);
    setFormError("");
    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postSlug: slug, username: authorName, commentText: commentContent, website }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to post comment.");
      if (result.comment) setComments((current) => [result.comment, ...current]);
      setAuthorName("");
      setCommentContent("");
    } catch (error) {
      setFormError(error.message);
    } finally {
      setSubmittingComment(false);
    }
  }

  if (loading) return <div className="min-h-screen bg-zinc-950 text-zinc-500 grid place-items-center">Loading content…</div>;
  if (!post) return <div className="min-h-screen bg-zinc-950 text-white grid place-items-center"><Link href="/" className="text-amber-500">← Back to home</Link></div>;

  return (
    <main className="min-h-screen bg-zinc-950 text-white pb-24">
      <header className="border-b border-zinc-900"><div className="max-w-4xl mx-auto px-4 py-12"><Link href="/" className="text-xs text-zinc-500 hover:text-amber-500">← Back to home</Link><p className="text-amber-500 text-xs uppercase mt-8">{post.category}</p><h1 className="text-3xl md:text-5xl font-black uppercase mt-3">{post.title}</h1></div></header>
      <div className="max-w-4xl mx-auto px-4 mt-10">
        <div className="relative aspect-video bg-zinc-900 rounded-xl overflow-hidden mb-10">
          {post.image_url && !imgError ? <Image src={post.image_url} alt={post.title} fill priority sizes="(max-width: 1200px) 100vw, 1200px" onError={() => setImgError(true)} className="object-cover" /> : <div className="absolute inset-0 grid place-items-center text-zinc-600">No image available</div>}
        </div>
        <article><p className="text-zinc-300 text-lg leading-relaxed whitespace-pre-wrap">{post.content}</p></article>
        <div className="border-y border-zinc-900 py-6 my-10 flex items-center gap-4"><button onClick={handleLike} disabled={liked} className="px-5 py-2 rounded border border-zinc-800 disabled:text-amber-500">{liked ? "Liked" : "Like"}</button><span className="text-sm text-zinc-500">{post.likes || 0} likes</span></div>
        {formError && <p role="alert" className="mb-5 text-sm text-rose-400">{formError}</p>}
        <section>
          <h2 className="text-lg font-bold uppercase mb-6">Comments ({comments.length})</h2>
          <form onSubmit={handleCommentSubmit} className="bg-zinc-900/20 border border-zinc-900 rounded-xl p-5 mb-10 space-y-4">
            <input value={authorName} onChange={(event) => setAuthorName(event.target.value)} maxLength={80} placeholder="Your name (optional)" className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2" />
            <textarea value={commentContent} onChange={(event) => setCommentContent(event.target.value)} minLength={2} maxLength={2000} required rows={3} placeholder="Write a comment…" className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2" />
            <div className="absolute -left-[10000px]" aria-hidden="true"><label>Website<input tabIndex={-1} autoComplete="off" value={website} onChange={(event) => setWebsite(event.target.value)} /></label></div>
            <button disabled={submittingComment} className="px-5 py-2 bg-amber-500 text-black font-bold rounded disabled:opacity-50">{submittingComment ? "Posting…" : "Post comment"}</button>
          </form>
          <div className="space-y-4">{comments.map((comment) => <div key={comment.id} className="border border-zinc-900 rounded p-4"><div className="flex justify-between mb-2"><strong className="text-sm text-amber-500">{comment.username || "Anonymous User"}</strong><span className="text-xs text-zinc-600">{new Date(comment.created_at).toLocaleDateString()}</span></div><p className="text-zinc-400 whitespace-pre-wrap">{comment.comment_text}</p></div>)}</div>
        </section>
      </div>
    </main>
  );
}
