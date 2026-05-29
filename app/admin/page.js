"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function AdminDashboard() {
  const [mounted, setMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcodeInput, setPasscodeInput] = useState("");
  const [authError, setAuthError] = useState("");

  // Dashboard Core States
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  // Media Upload States
  const [selectedFile, setSelectedFile] = useState(null);
  const [mediaPreview, setMediaPreview] = useState("");
  const [isFileTypeVideo, setIsFileTypeVideo] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "sports",
    content: "",
  });
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    setMounted(true);
    const sessionToken = sessionStorage.getItem("arena_admin_session");
    if (sessionToken === "authorized_arena_operator") {
      setIsAuthenticated(true);
    }
  }, []);

  async function fetchPosts() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (err) {
      console.error("Dashboard pull error:", err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (mounted && isAuthenticated) {
      fetchPosts();
    }
  }, [isAuthenticated, mounted]);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setAuthError("");
    const securePasscode = process.env.NEXT_PUBLIC_ADMIN_PASSCODE || "arena2026";

    if (passcodeInput === securePasscode) {
      sessionStorage.setItem("arena_admin_session", "authorized_arena_operator");
      setIsAuthenticated(true);
    } else {
      setAuthError("CRITICAL ERROR: ACCESS KEY INVALID. DEPLOYMENT TERMINATED.");
      setPasscodeInput("");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("arena_admin_session");
    setIsAuthenticated(false);
    setMessage({ type: "", text: "" });
  };

  const handleTitleChange = (e) => {
    const titleVal = e.target.value;
    const generatedSlug = titleVal
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "") 
      .replace(/\s+/g, "-") 
      .replace(/-+/g, "-") 
      .trim();

    setFormData((prev) => ({
      ...prev,
      title: titleVal,
      slug: generatedSlug,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);
    setIsFileTypeVideo(file.type.startsWith("video/"));
    
    if (mediaPreview) URL.revokeObjectURL(mediaPreview);
    setMediaPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    if (!formData.title || !formData.slug || !formData.content) {
      alert("ATTENTION: Title, Slug, and Content fields are strictly required.");
      setMessage({ type: "error", text: "Title, Slug, and Content fields are required." });
      return;
    }

    try {
      setSubmitting(true);
      let publicMediaUrl = null;

      // Stream file to Supabase Storage if file was picked
      if (selectedFile) {
        const fileExt = selectedFile.name.split(".").pop();
        const uniqueFileName = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${fileExt}`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("media")
          .upload(uniqueFileName, selectedFile, {
            cacheControl: "3600",
            upsert: false
          });

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from("media")
          .getPublicUrl(uniqueFileName);

        publicMediaUrl = urlData.publicUrl;
      }
      
      const { error } = await supabase.from("posts").insert([
        {
          title: formData.title.toUpperCase(), 
          slug: formData.slug,
          category: formData.category,
          content: formData.content,
          image_url: publicMediaUrl,
        },
      ]);

      if (error) throw error;

      alert("UPLOADED SUCCESSFULLY! Broadcast segment has been deployed to the live arena.");
      setMessage({ type: "success", text: "Entry with media successfully broadcasted to the Arena feed!" });
      
      // Cleanup UI form states
      setFormData({ title: "", slug: "", category: "sports", content: "" });
      setSelectedFile(null);
      if (mediaPreview) URL.revokeObjectURL(mediaPreview);
      setMediaPreview("");
      fetchPosts();
    } catch (err) {
      alert(`UPLOAD FAILED!\nReason: ${err.message}`);
      setMessage({ type: "error", text: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  // Optimized to handle cascading comment elimination simultaneously
  const handleDelete = async (postSlug, postId) => {
    if (!confirm("Are you sure you want to terminate this broadcast item? This will completely erase all associated comments as well.")) return;

    try {
      // 1. First sweep the comments table clean of associated post metrics
      await supabase
        .from("comments")
        .delete()
        .eq("post_slug", postSlug);

      // 2. Erase the core post record from index
      const { error } = await supabase
        .from("posts")
        .delete()
        .eq("id", postId);
        
      if (error) throw error;

      alert("Broadcast entry and all associated comments permanently deleted.");
      fetchPosts();
    } catch (err) {
      alert(`Delete failed: ${err.message}`);
    }
  };

  if (!mounted) {
    return <div className="min-h-screen bg-zinc-950 text-white" />;
  }

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-zinc-950 text-white flex items-center justify-center font-sans antialiased px-4">
        <div className="w-full max-w-md bg-zinc-900/20 border border-zinc-900 p-8 rounded-xl text-center">
          <div className="flex justify-center mb-4">
            <span className="w-3 h-3 rounded-full bg-rose-500 animate-pulse" />
          </div>
          <h1 className="text-xs font-black uppercase tracking-[0.3em] font-mono text-zinc-400 mb-2">RESTRICTED ACCESS PORTAL</h1>
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <input 
              type="password"
              value={passcodeInput}
              onChange={(e) => setPasscodeInput(e.target.value)}
              placeholder="ENTER SECURE OPERATOR ACCESS KEY"
              className="w-full bg-zinc-950 border border-zinc-900 focus:border-amber-500 rounded-md px-4 py-3 text-center text-xs font-mono uppercase tracking-widest text-white placeholder-zinc-700 focus:outline-none"
              autoFocus
            />
            {authError && <p className="text-[10px] text-rose-500 font-mono font-bold uppercase p-2 bg-rose-950/20 border border-rose-500/20 rounded">{authError}</p>}
            <button type="submit" className="w-full bg-zinc-900 hover:bg-amber-500 text-zinc-400 hover:text-black border border-zinc-800 hover:border-amber-500 font-black uppercase tracking-widest text-xs py-3 rounded-md transition-all font-mono">Verify Credentials →</button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white selection:bg-amber-500 selection:text-black font-sans antialiased">
      <header className="border-b border-zinc-900 bg-zinc-950/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
            <h1 className="text-sm font-black uppercase tracking-widest font-mono text-zinc-200">Arena Control Center // Operator Authenticated</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-amber-500 border border-zinc-800 hover:border-amber-500/30 px-4 py-2 rounded-md transition-all">← View Live Portal</Link>
            <button onClick={handleLogout} className="text-xs font-mono uppercase font-bold text-zinc-600 hover:text-rose-400">[Exit Console]</button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        {message.text && (
          <div className={`mb-8 p-4 rounded-lg border text-xs font-bold uppercase tracking-wider font-mono ${message.type === "success" ? "bg-emerald-950/20 border-emerald-500/30 text-emerald-400" : "bg-rose-950/20 border-rose-500/30 text-rose-400"}`}>
            {message.type === "success" ? "✓ SUCCESS: " : "⚠ ERROR: "} {message.text}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* CREATE BROADCAST ENTRY FORM */}
          <section className="lg:col-span-5 bg-zinc-900/20 border border-zinc-900 p-6 md:p-8 rounded-xl">
            <h2 className="text-xs font-black uppercase tracking-widest text-amber-500 font-mono mb-6 pb-2 border-b border-zinc-900/60">⚡ Deploy New Broadcast</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-zinc-400 font-mono mb-2">Broadcast Title</label>
                <input type="text" name="title" value={formData.title} onChange={handleTitleChange} placeholder="e.g. Super Eagles Secure Victory" className="w-full bg-zinc-950 border border-zinc-900 rounded-md px-4 py-3 text-sm font-medium text-white focus:outline-none focus:border-amber-500 uppercase" />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-zinc-500 font-mono mb-2">URL Route Path Slug (Auto-Generated)</label>
                <input type="text" name="slug" value={formData.slug} onChange={handleChange} className="w-full bg-zinc-950/40 border border-zinc-900/60 rounded-md px-4 py-2.5 text-xs font-mono text-zinc-500 focus:outline-none" />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-zinc-400 font-mono mb-2">Stream Category</label>
                <select name="category" value={formData.category} onChange={handleChange} className="w-full bg-zinc-950 border border-zinc-900 rounded-md px-4 py-3 text-xs font-mono tracking-widest uppercase text-white focus:outline-none focus:border-amber-500">
                  <option value="sports">SPORTS</option>
                  <option value="music">MUSIC UPDATES</option>
                  <option value="entertainment">ENTERTAINMENT</option>
                  <option value="pop-culture">POP CULTURE</option>
                </select>
              </div>

              {/* DEVICE FILE UPLOADER COMPONENT */}
              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-zinc-400 font-mono mb-2">Upload Device Media (Image or Video)</label>
                <div className="relative border border-zinc-900 bg-zinc-950 rounded-md p-4 transition-all hover:border-zinc-800">
                  <input 
                    type="file" 
                    accept="image/*,video/*" 
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-20"
                  />
                  <div className="text-center py-2">
                    <p className="text-xs font-bold text-zinc-500 uppercase tracking-wide">
                      {selectedFile ? `✓ File Selected: ${selectedFile.name.substring(0, 20)}...` : "Select Image/Video File From Device"}
                    </p>
                    <p className="text-[10px] text-zinc-600 font-mono mt-1">Supports PNG, JPG, MP4, MOV, WEBM</p>
                  </div>
                </div>

                {/* Local Pre-Transmission Workspace Preview Box */}
                {mediaPreview && (
                  <div className="mt-4 border border-zinc-900 rounded-lg aspect-video relative overflow-hidden bg-black flex items-center justify-center">
                    {isFileTypeVideo ? (
                      <video src={mediaPreview} controls className="w-full h-full object-cover" />
                    ) : (
                      <img src={mediaPreview} alt="Upload Preview" className="w-full h-full object-cover" />
                    )}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-zinc-400 font-mono mb-2">Main Content Broadcast Body</label>
                <textarea name="content" rows={5} value={formData.content} onChange={handleChange} placeholder="Type out full news story breakdown..." className="w-full bg-zinc-950 border border-zinc-900 rounded-md p-4 text-sm font-medium text-zinc-300 focus:outline-none focus:border-amber-500 resize-none leading-relaxed" />
              </div>

              <button type="submit" disabled={submitting} className="w-full bg-amber-500 disabled:bg-zinc-800 text-black disabled:text-zinc-600 font-black uppercase tracking-widest text-xs py-4 rounded-md transition-all hover:bg-amber-400 font-mono">
                {submitting ? "Uploading Media & Deploying..." : "⚡ Execute Live Broadcast"}
              </button>
            </form>
          </section>

          {/* MANAGE & DELETE EXISTING LOG ENTRIES */}
          <section className="lg:col-span-7">
            <h2 className="text-xs font-black uppercase tracking-widest text-zinc-400 font-mono mb-6 pb-2 border-b border-zinc-900">📋 Existing Feed Grid Logs ({posts.length})</h2>
            {loading ? (
              <div className="py-20 text-center text-xs font-mono text-zinc-600 uppercase tracking-widest animate-pulse">Querying Feed Datastores...</div>
            ) : posts.length === 0 ? (
              <div className="py-20 text-center border border-dashed border-zinc-900 rounded-xl"><p className="text-zinc-600 text-xs italic">No entries reside inside the live feed database.</p></div>
            ) : (
              <div className="space-y-3 max-h-[75vh] overflow-y-auto pr-2">
                {posts.map((post) => (
                  <div key={post.id} className="p-4 bg-zinc-900/10 border border-zinc-900 rounded-lg flex items-center justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[9px] font-black uppercase tracking-widest text-amber-500 bg-amber-500/5 px-1.5 py-0.5 rounded border border-amber-500/10 font-mono">{post.category || "General"}</span>
                        <span className="text-[9px] text-zinc-600 font-mono truncate">/{post.slug}</span>
                      </div>
                      <h3 className="text-sm font-bold uppercase tracking-tight text-zinc-200 truncate">{post.title}</h3>
                    </div>
                    {/* Passes both parameters safely into the cascade deletion method */}
                    <button onClick={() => handleDelete(post.slug, post.id)} className="text-[10px] font-mono border border-zinc-900 text-zinc-500 hover:text-rose-400 bg-zinc-950/40 px-3 py-2 rounded transition-all">Terminate ×</button>
                  </div>
                ))}
              </div>
            )}
          </section>

        </div>
      </div>
    </main>
  );
}