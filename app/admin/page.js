"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function AdminDashboard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "Sports", // Default choice
    content: "",
    image_url: "",
  });

  const [message, setMessage] = useState({ type: "", text: "" });

  // Fetch posts to display in management panel
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
    fetchPosts();
  }, []);

  // Sync title changes to automatically format a clean URL slug
  const handleTitleChange = (e) => {
    const titleVal = e.target.value;
    const generatedSlug = titleVal
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/-+/g, "-") // Collapse consecutive hyphens
      .trim();

    setFormData((prev) => ({
      ...prev,
      title: titleVal,
      slug: generatedSlug,
    }));
  };

  // Handle Input Form Values Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit new entry to Supabase
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    if (!formData.title || !formData.slug || !formData.content) {
      setMessage({ type: "error", text: "Title, Slug, and Content fields are required." });
      return;
    }

    try {
      setSubmitting(true);
      
      const { error } = await supabase.from("posts").insert([
        {
          title: formData.title.toUpperCase(), // Keeping headers impactful & capitalized
          slug: formData.slug,
          category: formData.category,
          content: formData.content,
          image_url: formData.image_url || null,
        },
      ]);

      if (error) throw error;

      setMessage({ type: "success", text: "Entry successfully broadcasted to the Arena feed!" });
      
      // Clear Form Setup
      setFormData({
        title: "",
        slug: "",
        category: "Sports",
        content: "",
        image_url: "",
      });

      // Refresh management feed list
      fetchPosts();
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  // Delete an item from the Arena Feed
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to terminate this broadcast item?")) return;

    try {
      const { error } = await supabase.from("posts").delete().eq("id", id);
      if (error) throw error;

      setMessage({ type: "success", text: "Broadcast entry deleted successfully." });
      fetchPosts();
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white selection:bg-amber-500 selection:text-black font-sans antialiased">
      
      {/* HEADER BAR */}
      <header className="border-b border-zinc-900 bg-zinc-950/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
            <h1 className="text-sm font-black uppercase tracking-widest font-mono text-zinc-200">
              Arena Control Center // Dashboard
            </h1>
          </div>
          <Link 
            href="/" 
            className="text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-amber-500 border border-zinc-800 hover:border-amber-500/30 px-4 py-2 rounded-md transition-all bg-zinc-900/40"
          >
            ← View Live Portal
          </Link>
        </div>
      </header>

      {/* DASHBOARD CONTENT GRID */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        
        {/* GLOBAL STATUS MESSAGES */}
        {message.text && (
          <div className={`mb-8 p-4 rounded-lg border text-xs font-bold uppercase tracking-wider font-mono ${
            message.type === "success" 
              ? "bg-emerald-950/20 border-emerald-500/30 text-emerald-400" 
              : "bg-rose-950/20 border-rose-500/30 text-rose-400"
          }`}>
            {message.type === "success" ? "✓ SUCCESS: " : "⚠ ERROR: "} {message.text}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT COLUMN: CREATE BROADCAST ENTRY FORM */}
          <section className="lg:col-span-5 bg-zinc-900/20 border border-zinc-900 p-6 md:p-8 rounded-xl backdrop-blur-sm">
            <h2 className="text-xs font-black uppercase tracking-widest text-amber-500 font-mono mb-6 pb-2 border-b border-zinc-900/60 flex items-center gap-2">
              ⚡ Deploy New Broadcast
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Title Field */}
              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-zinc-400 font-mono mb-2">
                  Broadcast Title
                </label>
                <input 
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleTitleChange}
                  placeholder="e.g. Super Eagles Secure Comeback Victory"
                  className="w-full bg-zinc-950 border border-zinc-900 rounded-md px-4 py-3 text-sm font-medium text-white placeholder-zinc-700 focus:outline-none focus:border-amber-500 transition-colors uppercase"
                />
              </div>

              {/* Slug Field (Read-only or manual modification hint) */}
              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-zinc-500 font-mono mb-2">
                  URL Route Path Slug (Auto-Generated)
                </label>
                <input 
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  placeholder="super-eagles-secure-comeback-victory"
                  className="w-full bg-zinc-950/40 border border-zinc-900/60 rounded-md px-4 py-2.5 text-xs font-mono text-zinc-500 focus:outline-none focus:border-zinc-800"
                />
              </div>

              {/* Category Dropdown */}
              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-zinc-400 font-mono mb-2">
                  Stream Category
                </label>
                <select 
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full bg-zinc-950 border border-zinc-900 rounded-md px-4 py-3 text-sm font-medium text-white focus:outline-none focus:border-amber-500 transition-colors appearance-none cursor-pointer"
                >
                  <option value="Sports">SPORTS</option>
                  <option value="Music">MUSIC</option>
                  <option value="Entertainment">ENTERTAINMENT</option>
                </select>
              </div>

              {/* Local or Remote Image URL Path */}
              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-zinc-400 font-mono mb-2">
                  Cover Image Destination Path (Optional)
                </label>
                <input 
                  type="text"
                  name="image_url"
                  value={formData.image_url}
                  onChange={handleChange}
                  placeholder="e.g. /images/football-match.jpg or remote https link"
                  className="w-full bg-zinc-950 border border-zinc-900 rounded-md px-4 py-3 text-sm font-medium text-white placeholder-zinc-700 focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>

              {/* Content Main Text Block */}
              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-zinc-400 font-mono mb-2">
                  Main Content Broadcast Body
                </label>
                <textarea 
                  name="content"
                  rows={6}
                  value={formData.content}
                  onChange={handleChange}
                  placeholder="Type out full news story breakdown or dynamic updates here..."
                  className="w-full bg-zinc-950