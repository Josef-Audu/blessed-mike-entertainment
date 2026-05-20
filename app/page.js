import Image from "next/image";

export default function Home() {
  // Data for Trending and Featured Content
  const trendingArticles = [
    {
      id: 1,
      category: "Sports",
      categoryColor: "text-amber-400 bg-amber-500/10 ring-amber-500/20",
      title: "Super Eagles Secure Thrilling Victory in AFCON Qualifiers",
      description: "An incredible overhead strike in the 89th minute seals a historical comeback victory, sending fans into absolute frenzy nationwide.",
      time: "2 hours ago",
      image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop&q=80",
      isFeatured: true, 
    },
    {
      id: 2,
      category: "Music Updates",
      categoryColor: "text-blue-400 bg-blue-500/10 ring-blue-500/20",
      title: "Afrobeats Heavyweights Hint at Massive Global Collaboration",
      time: "4 hours ago",
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=60",
      isFeatured: false,
    },
    {
      id: 3,
      category: "Entertainment",
      categoryColor: "text-purple-400 bg-purple-500/10 ring-purple-500/20",
      title: "Top Blockbusters Breaking Box Office Records This Weekend",
      time: "1 day ago",
      image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&auto=format&fit=crop&q=60",
      isFeatured: false,
    },
    {
      id: 4,
      category: "Pop Culture",
      categoryColor: "text-emerald-400 bg-emerald-500/10 ring-emerald-500/20",
      title: "The Viral Social Media Trends Shaping Nigerian Youth Culture",
      time: "2 days ago",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=60",
      isFeatured: false,
    },
  ];

  // Blueprint Core Categories
  const blueprintCategories = [
    { name: "Sports Arena", count: "14 Articles", color: "from-amber-600 to-yellow-500", icon: "⚽" },
    { name: "Music Updates", count: "28 Articles", color: "from-blue-600 to-indigo-500", icon: "🎵" },
    { name: "Entertainment", count: "19 Articles", color: "from-purple-600 to-pink-500", icon: "🎬" },
    { name: "Pop Culture", count: "22 Articles", color: "from-emerald-600 to-teal-500", icon: "⚡" },
  ];

  // Chronological Latest Posts Feed Data
  const latestPosts = [
    {
      id: 5,
      category: "Music Updates",
      title: "Burna Boy Shuts Down London Stadium for the Second Time",
      excerpt: "The African Giant makes history again with a masterful 3-hour stadium performance in front of eighty thousand screaming global fans.",
      time: "3 hours ago",
      image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&auto=format&fit=crop&q=60"
    },
    {
      id: 6,
      category: "Entertainment",
      title: "Funke Akindele Breaks New Nollywood Box Office Record",
      excerpt: "Her highly anticipated cinematic release secures over 500 million Naira in its first week alone, completely redefining domestic theater trends.",
      time: "5 hours ago",
      image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&auto=format&fit=crop&q=60"
    },
    {
      id: 7,
      category: "Pop Culture",
      categoryColor: "text-emerald-400",
      title: "Lagos Fashion Week Unveils Cutting Edge African Streetwear Designs",
      excerpt: "Young indigenous designers steal the center stage with sustainable outfits celebrating traditional fabrics mixed with modern tech aesthetics.",
      time: "Yesterday",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&auto=format&fit=crop&q=60"
    }
  ];

  return (
    <div className="bg-zinc-950 min-h-screen text-white">
      
      {/* ================= 1. HERO SECTION ================= */}
      <section className="relative h-screen flex flex-col items-center justify-center pt-28 lg:pt-20 p-6 text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/football-hero.jpg"
            alt="Football match action"
            fill
            priority
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 z-10 bg-zinc-950/75" />

        <div className="relative z-20 max-w-4xl flex flex-col items-center px-4">
          <span className="inline-flex items-center rounded-full bg-amber-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-400 ring-1 ring-inset ring-amber-500/20 mb-8 font-sports">
            ⚡ Sports & Entertainment Hub
          </span>

          <h1 className="text-6xl font-bold tracking-tight text-white sm:text-7xl xl:text-8xl mb-8 uppercase font-sports leading-[0.95] drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
            Welcome to <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">
              {"Blessed Mike's"}
            </span>
          </h1>

          <p className="text-xl text-zinc-100 mb-12 max-w-2xl font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
            The ultimate arena for breaking sports news, match analysis, viral entertainment updates, and Nigerian pop culture.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="#trending" className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-zinc-950 font-bold uppercase tracking-wide rounded-lg hover:from-amber-400 hover:to-yellow-400 text-center transition transform hover:-translate-y-0.5 shadow-[0_4px_30px_rgba(245,158,11,0.3)] font-sports">
              Explore Latest News
            </a>
            <a href="#categories" className="w-full sm:w-auto px-10 py-4 bg-zinc-900/80 text-zinc-100 font-semibold uppercase tracking-wide rounded-lg border border-zinc-700 hover:bg-zinc-800 hover:text-white text-center transition transform hover:-translate-y-0.5 font-sports">
              Browse Categories
            </a>
          </div>
        </div>
      </section>


      {/* ================= 2. TRENDING & FEATURED STORIES ================= */}
      <section id="trending" className="relative z-30 max-w-7xl mx-auto px-6 py-24 scroll-mt-20 bg-zinc-950">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-zinc-900 pb-6">
          <div>
            <span className="text-amber-500 text-xs font-bold uppercase tracking-widest font-sports block mb-2">
              {"What's Hot Right Now"}
            </span>
            <h2 className="text-4xl font-bold uppercase font-sports tracking-wide">
              Trending Stories
            </h2>
          </div>
          <p className="text-zinc-400 text-sm max-w-md mt-4 md:mt-0">
            Stay ahead of the curve with real-time updates directly from the pitch, the studio, and the streets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingArticles.map((article) => {
            if (article.isFeatured) {
              return (
                <div 
                  key={article.id} 
                  className="group md:col-span-2 lg:col-span-2 bg-zinc-900/30 rounded-xl overflow-hidden border border-zinc-800/60 hover:border-amber-500/40 transition duration-300 flex flex-col sm:flex-row cursor-pointer shadow-lg min-h-[320px]"
                >
                  <div className="relative h-64 sm:h-auto w-full sm:w-1/2 bg-zinc-900 overflow-hidden">
                    <Image 
                      src={article.image} 
                      alt={article.title}
                      fill
                      unoptimized
                      className="object-cover group-hover:scale-105 transition duration-500 ease-in-out" 
                    />
                  </div>
                  <div className="p-6 lg:p-8 flex flex-col justify-between w-full sm:w-1/2 bg-zinc-900/20">
                    <div>
                      <span className={`inline-block text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded ring-1 ring-inset mb-4 ${article.categoryColor}`}>
                        🔥 Featured {article.category}
                      </span>
                      <h3 className="text-xl lg:text-2xl font-bold text-white group-hover:text-amber-400 transition duration-200 leading-snug mb-3">
                        {article.title}
                      </h3>
                      <p className="text-sm text-zinc-400 line-clamp-3 leading-relaxed">
                        {article.description}
                      </p>
                    </div>
                    <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-500 font-medium mt-4">
                      <span>{article.time}</span>
                      <span className="text-amber-400 font-bold group-hover:translate-x-1 transition-transform duration-200">
                        Read Feature Article →
                      </span>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div 
                key={article.id} 
                className="group bg-zinc-900/40 rounded-xl overflow-hidden border border-zinc-900 hover:border-zinc-800 transition duration-300 flex flex-col cursor-pointer"
              >
                <div className="relative h-48 w-full bg-zinc-900 overflow-hidden">
                  <Image 
                    src={article.image} 
                    alt={article.title}
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-105 transition duration-500 ease-in-out" 
                  />
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <span className={`inline-block text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded ring-1 ring-inset mb-4 ${article.categoryColor}`}>
                    {article.category}
                  </span>
                  <h3 className="text-base font-bold text-zinc-200 group-hover:text-amber-400 transition duration-200 line-clamp-2 mb-4 leading-snug">
                    {article.title}
                  </h3>
                  <div className="mt-auto pt-4 border-t border-zinc-900/60 flex items-center justify-between text-xs text-zinc-500 font-medium">
                    <span>{article.time}</span>
                    <span className="text-amber-500 group-hover:translate-x-1 transition-transform duration-200">
                      Read →
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>


      {/* ================= 3. BLUEPRINT CATEGORIES GRID ================= */}
      <section id="categories" className="relative z-30 max-w-7xl mx-auto px-6 py-20 bg-zinc-950 border-t border-zinc-900/60">
        <div className="text-center mb-16">
          <span className="text-amber-500 text-xs font-bold uppercase tracking-widest font-sports block mb-2">
            {"Tailored Channels"}
          </span>
          <h2 className="text-4xl font-bold uppercase font-sports tracking-wide">
            Browse By Category
          </h2>
          <p className="text-zinc-400 text-sm max-w-md mx-auto mt-3">
            {"Jump straight into your favorite entertainment domain with our structured platform streams."}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {blueprintCategories.map((cat) => (
            <div 
              key={cat.name}
              className="group relative p-6 bg-zinc-900/30 rounded-xl border border-zinc-900 hover:border-zinc-800 transition duration-300 cursor-pointer overflow-hidden flex flex-col justify-between h-40"
            >
              {/* Subtle Glowing Background Mesh effect on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-[0.03] transition duration-300`} />
              
              <div className="flex justify-between items-start">
                <span className="text-2xl">{cat.icon}</span>
                <span className="text-[10px] text-zinc-500 font-bold tracking-wider uppercase bg-zinc-950 px-2.5 py-1 rounded border border-zinc-800">
                  {cat.count}
                </span>
              </div>
              
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition duration-200 mb-1">
                  {cat.name}
                </h3>
                <span className="text-xs text-zinc-500 group-hover:text-zinc-400 transition duration-200 flex items-center gap-1">
                  {"Explore channel →"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* ================= 4. LATEST POSTS FEED ================= */}
      <section className="relative z-30 max-w-7xl mx-auto px-6 py-24 bg-zinc-950 border-t border-zinc-900/60">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main List Feed Column (Takes up 2 slots) */}
          <div className="lg:col-span-2">
            <div className="mb-10">
              <span className="text-amber-500 text-xs font-bold uppercase tracking-widest font-sports block mb-2">
                {"Timeline"}
              </span>
              <h2 className="text-3xl font-bold uppercase font-sports tracking-wide">
                Latest Publications
              </h2>
            </div>

            <div className="flex flex-col gap-8">
              {latestPosts.map((post) => (
                <div 
                  key={post.id}
                  className="group flex flex-col sm:flex-row gap-6 p-4 rounded-xl border border-transparent hover:border-zinc-900/80 hover:bg-zinc-900/10 transition duration-300 cursor-pointer"
                >
                  {/* Thumbnail */}
                  <div className="relative h-44 sm:h-36 w-full sm:w-48 bg-zinc-900 rounded-lg overflow-hidden flex-shrink-0">
                    <Image 
                      src={post.image}
                      alt={post.title}
                      fill
                      unoptimized
                      className="object-cover group-hover:scale-102 transition duration-300"
                    />
                  </div>
                  
                  {/* Summary Details */}
                  <div className="flex flex-col justify-between py-1">
                    <div>
                      <span className="text-[10px] font-bold text-amber-500 tracking-widest uppercase block mb-2">
                        {post.category}
                      </span>
                      <h3 className="text-lg font-bold text-zinc-100 group-hover:text-amber-400 transition duration-200 mb-2 leading-snug">
                        {post.title}
                      </h3>
                      <p className="text-sm text-zinc-400 line-clamp-2 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>
                    <span className="text-xs text-zinc-500 mt-3 block">{post.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Context Sidebar Area (Takes up 1 slot) */}
          <div className="bg-zinc-900/20 border border-zinc-900 rounded-2xl p-6 h-fit lg:sticky lg:top-24">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              📢 Hub Notice
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed mb-6">
              {"Welcome to version 1.0 of Blessed Mike's Entertainment center! All streams are pre-rendered for super fast performance as required by the product workflow roadmap."}
            </p>
            <div className="p-4 bg-zinc-950/60 rounded-xl border border-zinc-800/40 text-center">
              <span className="text-xs font-semibold text-zinc-500 block mb-1">{"Current Phase"}</span>
              <span className="text-sm font-bold text-amber-400 uppercase tracking-wide">{"Phase 2: Frontend Framework"}</span>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}