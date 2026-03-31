import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../utils/api";
import { TYPE_COLOR } from "../utils/constants";

export default function AdminDashboard() {
  const [notes,   setNotes]   = useState([]);
  const [total,   setTotal]   = useState(0);
  const [page,    setPage]    = useState(1);
  const [pages,   setPages]   = useState(1);
  const [search,  setSearch]  = useState("");
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  const fetchNotes = async (p = 1, q = "") => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: p, limit: 15 });
      if (q) params.set("search", q);
      const { data } = await api.get(`/notes?${params}`);
      setNotes(data.data);
      setTotal(data.total);
      setPages(data.pages);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchNotes(page, search); }, [page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchNotes(1, search);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this note permanently?")) return;
    setDeleting(id);
    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted");
      fetchNotes(page, search);
    } catch {
      toast.error("Failed to delete");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
        <div className="flex-1">
          <h1 className="font-display text-3xl font-black text-white">Admin Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1">{total} notes in the database</p>
        </div>
        <Link
          to="/admin/upload"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl text-sm transition"
        >
          ＋ Upload Note
        </Link>
      </div>

      {/* Search */}
      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title…"
          className="flex-1 bg-[#112236] border border-white/10 text-white placeholder-slate-500 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-400/50 transition"
        />
        <button type="submit" className="px-5 py-2.5 bg-[#1a3a5c] hover:bg-[#1e4570] text-white text-sm rounded-xl transition">
          Search
        </button>
      </form>

      {/* Table */}
      <div className="bg-[#112236] border border-white/5 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5 text-xs text-slate-500 uppercase tracking-widest">
                <th className="text-left px-5 py-3">Title</th>
                <th className="text-left px-4 py-3">Branch</th>
                <th className="text-left px-4 py-3">Yr/Sem</th>
                <th className="text-left px-4 py-3">Type</th>
                <th className="text-left px-4 py-3">Subject</th>
                <th className="text-right px-4 py-3">⬇</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-slate-500">Loading…</td>
                </tr>
              ) : notes.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-slate-500">No notes found.</td>
                </tr>
              ) : (
                notes.map((note) => (
                  <tr key={note._id} className="border-b border-white/5 hover:bg-white/2 transition">
                    <td className="px-5 py-3 font-medium text-white max-w-[220px] truncate">
                      <Link to={`/notes/${note._id}`} className="hover:text-amber-400 transition">
                        {note.title}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-slate-400 font-mono text-xs">{note.branch}</td>
                    <td className="px-4 py-3 text-slate-400 text-xs">{note.year} / {note.semester}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${TYPE_COLOR[note.type]}`}>
                        {note.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-400 text-xs max-w-[140px] truncate">{note.subject}</td>
                    <td className="px-4 py-3 text-right text-slate-500 font-mono text-xs">{note.downloads}</td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => handleDelete(note._id)}
                        disabled={deleting === note._id}
                        className="text-xs text-red-400 hover:text-red-300 disabled:opacity-40 transition"
                      >
                        {deleting === note._id ? "…" : "Delete"}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {pages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`w-8 h-8 rounded-lg text-xs font-mono transition ${
                p === page
                  ? "bg-amber-500 text-black font-bold"
                  : "bg-[#1a3a5c] text-slate-400 hover:text-white"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
