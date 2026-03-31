import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { BRANCHES } from "../utils/constants";

export default function Home() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) navigate(`/browse?search=${encodeURIComponent(search)}`);
    else navigate("/browse");
  };

  return (
    <main className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-[#0d1b2a] via-[#112236]/50 to-[#0d1b2a]">
      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-24 sm:py-32 px-4 sm:px-6 text-center">
        {/* Background glow effects */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-amber-500/15 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute top-20 right-0 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-amber-500/5 rounded-full blur-[100px]" />
        </div>

        <p className="inline-block text-xs font-mono text-amber-400 border border-amber-400/40 bg-amber-400/5 rounded-full px-4 py-2 mb-8 tracking-widest uppercase font-semibold hover:bg-amber-400/10 transition">
          🎓 Free for all students
        </p>
        <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-black text-white leading-tight mb-6 bg-gradient-to-r from-white via-amber-200 to-white bg-clip-text text-transparent">
          All Your College<br />
          <span className="bg-gradient-to-r from-amber-400 to-amber-300 bg-clip-text text-transparent">Notes. One Place.</span>
        </h1>
        <p className="text-slate-300 text-lg sm:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
          Notes, past papers, assignments &amp; reference books — organised by
          branch, year, semester &amp; subject. Download instantly, no sign-up needed.
        </p>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="max-w-lg mx-auto mb-12">
          <div className="flex gap-2 bg-gradient-to-br from-white/10 to-white/5 p-1 rounded-3xl border border-white/10 hover:border-amber-400/30 transition">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="🔍 Search subjects, topics, anything…"
              className="flex-1 bg-transparent text-white placeholder-slate-500 px-6 py-3 text-base focus:outline-none"
            />
            <button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-400 hover:shadow-lg hover:shadow-amber-500/50 text-black font-bold rounded-2xl transition duration-200 hover:scale-105 active:scale-95"
            >
              Search
            </button>
          </div>
        </form>

        {/* Stats row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mt-16">
          {[
            ["9+",    "Engineering Branches"],
            ["8",     "Semesters"],
            ["∞",     "Free Forever"],
          ].map(([val, label]) => (
            <div key={label} className="text-center">
              <div className="font-display text-5xl font-black bg-gradient-to-r from-amber-400 to-amber-300 bg-clip-text text-transparent">{val}</div>
              <div className="text-sm text-slate-400 mt-2 uppercase tracking-wider font-medium">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Branches grid ───────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-black text-white mb-2">
            Browse by Branch
          </h2>
          <p className="text-slate-400">Choose your engineering stream to explore notes</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {BRANCHES.map((branch) => (
            <Link
              key={branch.code}
              to={`/browse?branch=${branch.code}`}
              className="group bg-gradient-to-br from-[#112236] to-[#0d1b2a] hover:from-[#1a3a5c] hover:to-[#112236] border border-white/5 hover:border-amber-400/40 rounded-2xl p-5 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10 hover:-translate-y-1"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition duration-300">
                {{ CSE:"💻", "CSE-AI":"🤖", "CSE-DS":"📊", "CSE-IoT":"🔗", ECE:"📡", EE:"⚡", MECH:"⚙️", CIVIL:"🏗️", IT:"🖥️" }[branch.code]}
              </div>
              <div className="font-bold text-base text-white group-hover:text-amber-300 transition">
                {branch.code}
              </div>
              <div className="text-xs text-slate-500 mt-2 leading-snug">{branch.name}</div>
            </Link>
          ))}
        </div>

        {/* Material type tiles */}
        <div className="mt-20 mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-black text-white mb-2">
            What are you looking for?
          </h2>
          <p className="text-slate-400">We have all types of study materials</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { icon: "📄", label: "Notes",       type: "notes",      desc: "Lecture notes & summaries" },
            { icon: "📝", label: "Past Papers",  type: "paper",      desc: "Previous exams & solutions" },
            { icon: "✏️", label: "Assignments",  type: "assignment", desc: "Lab & theory work" },
            { icon: "📚", label: "Books",       type: "book",       desc: "Reference materials" },
          ].map((item) => (
            <Link
              key={item.type}
              to={`/browse?type=${item.type}`}
              className="group bg-gradient-to-br from-[#112236] to-[#0d1b2a] hover:from-amber-500/20 hover:to-amber-500/5 border border-white/5 hover:border-amber-400/40 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10 hover:-translate-y-1 text-center"
            >
              <div className="text-5xl mb-4 group-hover:scale-125 transition duration-300">{item.icon}</div>
              <div className="font-bold text-white group-hover:text-amber-300 transition mb-1">{item.label}</div>
              <div className="text-xs text-slate-500 group-hover:text-slate-400 transition">{item.desc}</div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
