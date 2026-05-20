"use client";

import { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";

export default function SingleArticle({ params }) {
  // Next.js 15/16 Requirement: safely unwrap the params Promise using React's use() hook
  const resolvedParams = use(params);
  const articleSlug = resolvedParams?.slug || "featured-story";

  // ================= STATE MANAGEMENT FOR INTERACTIVE BLUEPRINT FEATURES =================
  const [reactions, setReactions] = useState({
    fire: 142,
    love: 98,
    funny: 12,
    interesting: 34,
  });

  const handleReaction = (type) => {
    setReactions((prev) => ({ ...prev, [type]: prev[type] + 1 }));
  };

  const [comments, setComments] = useState([
    {
      id: 1,
      username: "Chidi_99",
      comment: "What a spectacular goal! The stadium completely erupted when that overhead kick went in. Absolute masterclass!",
      created_at: "2 hours ago",
    },
    {
      id: 2,
      username: "Amaka_M",
      comment: "This comeback was completely unexpected. Brilliant coordination from the wingers in the second half.",
      created_at: "1 hour ago",
    }
  ]);
  const [newUsername, setNewUsername] = useState("");
  const [newCommentText, setNewCommentText] = useState("");

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newUsername.trim() || !newCommentText.trim()) return;

    const freshComment = {
      id: Date.now(),
      username: newUsername.trim(),
      comment: newCommentText.trim(),
      created_at: "Just now",
    };

    setComments([freshComment, ...comments]);
    setNewUsername("");
    setNewCommentText("");
  };

  const relatedPosts = [
    {
      id: 2,
      title: "Afrobeats Heavyweights Hint at Massive Global Collaboration",
      category: "Music Updates",
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&auto=format&fit=crop&q=60",
      href: "/posts/afrobeats-collaboration"
    },
    {
      id: 3,
      title: "Top Blockbusters Breaking Box Office Records This Weekend",
      category: "Entertainment",
      image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&auto=format&fit=crop&q=60",
      href: "/posts/box-office-records"
    }
  ];

  return (
    <article className="bg-zinc-950 min-h-screen text-white pt-28 pb-24 font-sans">
      <div className="max-w-4xl mx-auto px-6">
        
        <div className="mb-6">
          <Link href="/" className="text-xs font-bold uppercase tracking-wider text-amber-500 hover:text-amber-400 transition">
            ← Back to Arena Hub
          </Link>
        </div>

        <header className="mb-8">
          <span className="inline-block text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 ring-1 ring-amber-500/20 mb-4">
            🔥 Live Coverage
          </span>
          <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight font-sports leading-tight mb-4">
            Super Eagles Secure Thrilling Victory in AFCON Qualifiers
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500 font-medium border-b border-zinc-900 pb-6">
            <span>Published by <strong className="text-zinc-300">Blessed Mike Admin</strong></span>
            <span>•</span>
            <span>2 hours ago</span>
            <span>•</span>
            <span className="text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded text-[11px]">Dynamic Slug: {articleSlug}</span>
          </div>
        </header>

        <div className="relative h-[250px] sm:h-[450px] w-full rounded-2xl overflow-hidden border border-zinc-900 mb-10 shadow-xl bg-zinc-900">
          <Image
            src="https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1200&auto=format&fit=crop&q=80"
            alt="Football match action"
            fill
            priority
            className="object-cover"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-3">
            <div className="prose prose-invert text-zinc-300 text-base sm:text-lg leading-relaxed flex flex-col gap-6 mb-12">
              <p className="font-semibold text-white text-xl sm:text-2xl leading-snug">
                {"An incredible overhead bicycle kick strike in the 89th minute sealed a historical comeback victory, sending sports fans into an absolute frenzy nationwide during tonight's high-stakes qualifier encounter."}
              </p>
              <p>
                {"The match started with high tactical pressure from the visitors, who successfully exposed early defensive spaces to grab an unexpected lead in the opening twenty minutes. The stadium fell silent as structural play ground down under heavy pressure."}
              </p>
              <p>
                {"However, after a major halftime re-alignment from the coaching technical staff, the team returned with renewed vigor. The passing combinations opened wide routes across the wings, driving aggressive baseline cross-deliveries directly into the penalty area."}
              </p>
              <p>
                {"With only sixty seconds left on the regulation clock, the definitive moment arrived. A deflected clearance bounced clean into the air, setting up an open acrobatic flip that flew cleanly into the upper left corner of the net, guaranteeing all 3 vital qualifier points."}
              </p>
            </div>

            <div className="border-y border-zinc-900 py-8 mb-12">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-4">
                {"How do you react to this story?"}
              </h4>
              <div className="flex flex-wrap gap-3">
                <button onClick={() => handleReaction("fire")} className="px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl flex items-center gap-2 transition text-sm">
                  <span>🔥</span> <span className="font-bold text-amber-500">Fire</span> <span className="text-zinc-500 text-xs">{reactions.fire}</span>
                </button>
                <button onClick={() => handleReaction("love")} className="px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl flex items-center gap-2 transition text-sm">
                  <span>❤️</span> <span className="font-bold text-pink-500">Love</span> <span className="text-zinc-500 text-xs">{reactions.love}</span>
                </button>
                <button onClick={() => handleReaction("funny")} className="px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl flex items-center gap-2 transition text-sm">
                  <span>😂</span> <span className="font-bold text-yellow-500">Funny</span> <span className="text-zinc-500 text-xs">{reactions.funny}</span>
                </button>
                <button onClick={() => handleReaction("interesting")} className="px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl flex items-center gap-2 transition text-sm">
                  <span>🤔</span> <span className="font-bold text-blue-400">Interesting</span> <span className="text-zinc-500 text-xs">{reactions.interesting}</span>
                </button>
              </div>
            </div>

            <section className="mb-12">
              <h3 className="text-xl font-bold uppercase font-sports tracking-wide mb-6">
                Community Discussion ({comments.length})
              </h3>
              
              <form onSubmit={handleAddComment} className="bg-zinc-900/30 border border-zinc-900 rounded-xl p-5 mb-8 flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1">{"Your Username"}</label>
                    <input 
                      type="text"
                      value={newUsername}
                      onChange={(e) => setNewUsername(e.target.value)}
                      placeholder="e.g., Ngozi_Lagos"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500 transition"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1">{"Your Comment Message"}</label>
                  <textarea 
                    rows="3"
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    placeholder="Join the arena conversation..."
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500 transition resize-none"
                    required
                  />
                </div>
                <button type="submit" className="self-start px-6 py-2 bg-amber-500 text-zinc-950 text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-amber-400 transition">
                  {"Post Comment"}
                </button>
              </form>

              <div className="flex flex-col gap-4">
                {comments.map((c) => (
                  <div key={c.id} className="p-5 bg-zinc-900/10 border border-zinc-900/80 rounded-xl flex flex-col gap-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-amber-400">@{c.username}</span>
                      <span className="text-zinc-600 font-medium">{c.created_at}</span>
                    </div>
                    <p className="text-sm text-zinc-300 leading-relaxed">{c.comment}</p>
                    <div className="mt-1">
                      <button type="button" className="text-[10px] font-bold text-zinc-500 hover:text-white uppercase tracking-wider transition">
                        {"Reply"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 flex flex-col gap-6">
              <div className="bg-zinc-900/30 border border-zinc-900 rounded-2xl p-5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
                  📢 Broadcast Post
                </h4>
                <div className="flex flex-col gap-2">
                  <a href="#share-facebook" className="w-full py-2 px-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg text-xs text-zinc-300 font-medium flex items-center gap-2 transition">
                    <span className="text-blue-500 font-bold">F</span> {"Share on Facebook"}
                  </a>
                  <a href="#share-whatsapp" className="w-full py-2 px-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg text-xs text-zinc-300 font-medium flex items-center gap-2 transition">
                    <span className="text-emerald-500 font-bold">W</span> {"Share on WhatsApp"}
                  </a>
                  <a href="#share-twitter" className="w-full py-2 px-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg text-xs text-zinc-300 font-medium flex items-center gap-2 transition">
                    <span className="text-white font-bold">X</span> {"Share on X / Twitter"}
                  </a>
                  <a href="#share-telegram" className="w-full py-2 px-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg text-xs text-zinc-300 font-medium flex items-center gap-2 transition">
                    <span className="text-sky-400 font-bold">T</span> {"Share on Telegram"}
                  </a>
                  <a href="#share-linkedin" className="w-full py-2 px-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg text-xs text-zinc-300 font-medium flex items-center gap-2 transition">
                    <span className="text-blue-400 font-bold">L</span> {"Share on LinkedIn"}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-16 pt-12 border-t border-zinc-900">
          <div className="mb-8">
            <span className="text-amber-500 text-xs font-bold uppercase tracking-widest font-sports block mb-1">
              {"Recommendations"}
            </span>
            <h3 className="text-2xl font-bold uppercase font-sports tracking-wide">
              Related Publications
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedPosts.map((post) => (
              <Link href={post.href} key={post.id} className="group bg-zinc-900/20 border border-zinc-900 rounded-xl overflow-hidden hover:border-zinc-800 transition flex flex-col sm:flex-row h-28 cursor-pointer">
                <div className="relative w-full sm:w-28 h-full bg-zinc-900 flex-shrink-0 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="p-4 flex flex-col justify-center">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-amber-500 mb-1 block">
                    {post.category}
                  </span>
                  <h4 className="text-sm font-bold text-zinc-200 group-hover:text-amber-400 transition line-clamp-2 leading-tight">
                    {post.title}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </article>
  );
}