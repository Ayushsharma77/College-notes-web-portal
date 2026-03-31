export default function Pagination({ page, pages, onChange }) {
  if (pages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        className="px-4 py-2 rounded-xl bg-[#112236] border border-white/10 text-sm text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition"
      >
        ← Prev
      </button>

      {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`w-9 h-9 rounded-xl text-sm font-mono transition ${
            p === page
              ? "bg-amber-500 text-black font-bold"
              : "bg-[#112236] border border-white/10 text-slate-400 hover:text-white"
          }`}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => onChange(page + 1)}
        disabled={page === pages}
        className="px-4 py-2 rounded-xl bg-[#112236] border border-white/10 text-sm text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition"
      >
        Next →
      </button>
    </div>
  );
}
