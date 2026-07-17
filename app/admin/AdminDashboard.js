"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

async function protectedFetch(url, options) {
  let response = await fetch(url, options);
  if (response.status === 401) {
    const refreshed = await fetch("/api/admin/auth/session", { cache: "no-store" });
    if (refreshed.ok) response = await fetch(url, options);
  }
  return response;
}

export default function AdminDashboard() {
  const [checkingSession, setCheckingSession] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [mediaPreview, setMediaPreview] = useState("");
  const [isVideo, setIsVideo] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "sports",
    content: "",
  });

  useEffect(() => {
    let active = true;
    async function initialize() {
      try {
        const session = await fetch("/api/admin/auth/session", { cache: "no-store" });
        if (!session.ok) return;
        const postsResponse = await fetch("/api/admin/posts", { cache: "no-store" });
        const result = await postsResponse.json();
        if (active && postsResponse.ok) {
          setIsAuthenticated(true);
          setPosts(result.posts || []);
        }
      } finally {
        if (active) setCheckingSession(false);
      }
    }
    initialize();
    return () => { active = false; };
  }, []);

  useEffect(() => () => {
    if (mediaPreview) URL.revokeObjectURL(mediaPreview);
  }, [mediaPreview]);

  async function refreshPosts() {
    setLoading(true);
    try {
      const response = await protectedFetch("/api/admin/posts", { cache: "no-store" });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to load posts.");
      setPosts(result.posts || []);
    } catch {
      setMessage({ type: "error", text: "Unable to load posts." });
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin(event) {
    event.preventDefault();
    setAuthError("");
    setSubmitting(true);
    try {
      const response = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to sign in.");
      setPassword("");
      setIsAuthenticated(true);
      await refreshPosts();
    } catch (error) {
      setAuthError(error.message);
      setPassword("");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    setIsAuthenticated(false);
    setPosts([]);
    setMessage({ type: "", text: "" });
  }

  function handleTitleChange(event) {
    const title = event.target.value;
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
    setFormData((current) => ({ ...current, title, slug }));
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  }

  function handleFileChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > 25 * 1024 * 1024) {
      setMessage({ type: "error", text: "Media must be 25 MB or smaller." });
      event.target.value = "";
      return;
    }
    setSelectedFile(file);
    setIsVideo(file.type.startsWith("video/"));
    setMediaPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setMessage({ type: "", text: "" });
    try {
      const body = new FormData();
      for (const [key, value] of Object.entries(formData)) body.set(key, value);
      if (selectedFile) body.set("media", selectedFile);

      const response = await protectedFetch("/api/admin/posts", { method: "POST", body });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to create post.");

      setFormData({ title: "", slug: "", category: "sports", content: "" });
      setSelectedFile(null);
      setMediaPreview("");
      setMessage({ type: "success", text: "Post published successfully." });
      await refreshPosts();
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(post) {
    if (!window.confirm(`Delete “${post.title}” and its comments?`)) return;
    setMessage({ type: "", text: "" });
    try {
      const response = await protectedFetch(`/api/admin/posts/${encodeURIComponent(post.id)}`, {
        method: "DELETE",
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to delete post.");
      setPosts((current) => current.filter((item) => item.id !== post.id));
      setMessage({ type: "success", text: "Post deleted." });
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    }
  }

  if (checkingSession) {
    return <div className="min-h-screen bg-zinc-950 text-zinc-500 grid place-items-center text-xs uppercase tracking-widest">Verifying session…</div>;
  }

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-4">
        <form onSubmit={handleLogin} className="w-full max-w-md bg-zinc-900/20 border border-zinc-900 p-8 rounded-xl space-y-4">
          <h1 className="text-xs font-black uppercase tracking-[0.3em] text-center text-zinc-400">Restricted Admin Access</h1>
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="username" required placeholder="Admin email" className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-4 py-3 text-sm" />
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" required minLength={8} maxLength={128} placeholder="Password" className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-4 py-3 text-sm" />
          {authError && <p className="text-xs text-rose-400" role="alert">{authError}</p>}
          <button disabled={submitting} className="w-full bg-amber-500 text-black font-black uppercase tracking-widest text-xs py-3 rounded-md disabled:opacity-50">{submitting ? "Verifying…" : "Sign in"}</button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white pb-24">
      <header className="border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 flex justify-between items-center">
          <div><p className="text-amber-500 text-[10px] uppercase tracking-widest">Authenticated operator</p><h1 className="text-2xl font-black uppercase">Admin Console</h1></div>
          <div className="flex gap-3"><Link href="/" className="text-xs px-3 py-2 border border-zinc-800 rounded">View site</Link><button onClick={handleLogout} className="text-xs px-3 py-2 border border-rose-500/30 text-rose-400 rounded">Sign out</button></div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        {message.text && <p role="status" className={`mb-6 p-4 border rounded text-sm ${message.type === "success" ? "border-emerald-500/30 text-emerald-400" : "border-rose-500/30 text-rose-400"}`}>{message.text}</p>}
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <form onSubmit={handleSubmit} className="lg:col-span-5 bg-zinc-900/20 border border-zinc-900 p-6 rounded-xl space-y-5">
            <h2 className="text-xs font-black uppercase tracking-widest text-amber-500">Publish post</h2>
            <input name="title" value={formData.title} onChange={handleTitleChange} required minLength={3} maxLength={180} placeholder="Title" className="w-full bg-zinc-950 border border-zinc-800 rounded px-4 py-3" />
            <input name="slug" value={formData.slug} onChange={handleChange} required maxLength={160} pattern="[a-z0-9]+(?:-[a-z0-9]+)*" placeholder="url-slug" className="w-full bg-zinc-950 border border-zinc-800 rounded px-4 py-3 font-mono text-sm" />
            <select name="category" value={formData.category} onChange={handleChange} className="w-full bg-zinc-950 border border-zinc-800 rounded px-4 py-3">
              <option value="sports">Sports</option><option value="music">Music</option><option value="entertainment">Entertainment</option><option value="pop-culture">Pop culture</option>
            </select>
            <input type="file" accept="image/jpeg,image/png,image/webp,video/mp4,video/quicktime,video/webm" onChange={handleFileChange} className="w-full text-sm text-zinc-400" />
            <p className="text-[10px] text-zinc-500">JPEG, PNG, WEBP, MP4, MOV, or WEBM · maximum 25 MB</p>
            {mediaPreview && <div className="aspect-video overflow-hidden rounded bg-black">{isVideo ? <video src={mediaPreview} controls className="w-full h-full object-cover" /> : <img src={mediaPreview} alt="Upload preview" className="w-full h-full object-cover" />}</div>}
            <textarea name="content" value={formData.content} onChange={handleChange} required minLength={10} maxLength={30000} rows={8} placeholder="Post content" className="w-full bg-zinc-950 border border-zinc-800 rounded p-4 resize-y" />
            <button disabled={submitting} className="w-full bg-amber-500 text-black font-black uppercase tracking-widest text-xs py-4 rounded disabled:opacity-50">{submitting ? "Publishing…" : "Publish securely"}</button>
          </form>

          <section className="lg:col-span-7">
            <div className="flex justify-between mb-5"><h2 className="text-xs font-black uppercase tracking-widest text-zinc-400">Published posts ({posts.length})</h2><button onClick={refreshPosts} disabled={loading} className="text-xs text-amber-500">Refresh</button></div>
            <div className="space-y-3">
              {posts.map((post) => <div key={post.id} className="p-4 border border-zinc-900 rounded flex justify-between gap-4"><div className="min-w-0"><p className="text-[10px] text-amber-500 uppercase">{post.category}</p><h3 className="font-bold truncate">{post.title}</h3><p className="text-xs text-zinc-600 font-mono">/{post.slug}</p></div><button onClick={() => handleDelete(post)} className="text-xs text-rose-400">Delete</button></div>)}
              {!loading && posts.length === 0 && <p className="text-zinc-600 text-sm">No posts found.</p>}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
