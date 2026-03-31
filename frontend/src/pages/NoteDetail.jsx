import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../utils/api";
import { TYPE_COLOR } from "../utils/constants";

export default function NoteDetail() {
  const { id } = useParams();
  const [note,      setNote]      = useState(null);
  const [loading,   setLoading]   = useState(true);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    api.get(`/notes/${id}`)
      .then(({ data }) => setNote(data.data))
      .catch(() => toast.error("Note not found"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDownload = async () => {
    if (downloading) return;
    setDownloading(true);
    try {
      // Get signed download URL from backend
      const { data } = await api.get(`/notes/${id}/download`);
      // Open file in new tab
      window.open(data.downloadUrl, "_blank", "noopener,noreferrer");
      setNote((prev) => ({ ...prev, downloads: prev.downloads + 1 }));
      toast.success("Download started! 📥");
    } catch {
      toast.error("Failed to download. Try again.");
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-6 rounded-lg bg-gradient-to-r from-[#112236] to-[#0d1b2a] animate-pulse" />
        ))}
      </div>
    );
  }

  if (!note) {
    return (
      <div className="text-center py-24">
        <div className="text-6xl mb-4">🔍</div>
        <h2 className="font-display text-2xl text-white mb-2">Note not found</h2>
        <p className="text-slate-500 mb-6">The note you're looking for doesn't exist.</p>
        <Link to="/browse" className="inline-block px-6 py-2 bg-amber-500 hover:bg-amber-400 text-black font-semibold rounded-full transition">
          ← Back to Browse
        </Link>
      </div>
    );
  }

  const typeStyle = TYPE_COLOR[note.type] || TYPE_COLOR.notes;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-8">
        <Link to="/" className="hover:text-slate-300 transition">Home</Link>
        <span>/</span>
        <Link to="/browse" className="hover:text-slate-300 transition">Browse</Link>
        <span>/</span>
        <span className="text-slate-300 truncate max-w-xs">{note.title}</span>
      </div>

      {/* Card */}
      <div className="bg-gradient-to-br from-[#112236] to-[#0d1b2a] border border-white/5 rounded-3xl p-8 sm:p-10">
        {/* Type badge */}
        <span className={`inline-block text-xs font-mono px-3 py-1 rounded-full border mb-4 ${typeStyle}`}>
          {note.type.charAt(0).toUpperCase() + note.type.slice(1)}
        </span>

        {/* Title */}
        <h1 className="font-display text-3xl sm:text-4xl font-black text-white leading-tight mb-3">
          {note.title}
        </h1>

        {/* Description */}
        {note.description && (
          <p className="text-slate-400 text-base leading-relaxed mb-8 max-w-2xl">{note.description}</p>
        )}

        {/* Meta grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[
            { label: "Branch",   value: note.branch,     icon: "🏢" },
            { label: "Year",     value: `Year ${note.year}`, icon: "📅" },
            { label: "Semester", value: `Sem ${note.semester}`, icon: "📆" },
            { label: "Subject",  value: note.subject,    icon: "📚" },
          ].map(({ label, value, icon }) => (
            <div key={label} className="bg-white/5 hover:bg-white/10 rounded-xl p-3 text-center transition duration-200">
              <div className="text-lg mb-1">{icon}</div>
              <div className="text-xs text-slate-500 mb-0.5 uppercase tracking-widest">{label}</div>
              <div className="text-sm font-semibold text-white">{value}</div>
            </div>
          ))}
        </div>

        {/* Tags */}
        {note.tags?.length > 0 && (
          <div className="mb-8 pb-8 border-b border-white/5">
            <p className="text-xs text-slate-500 uppercase tracking-widest mb-3">Tags</p>
            <div className="flex flex-wrap gap-2">
              {note.tags.map((tag) => (
              <span key={tag} className="text-xs bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full border border-amber-500/30">
                #{tag}
              </span>
            ))}
            </div>
          </div>
        )}

        {/* Download section */}
        <div className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 rounded-2xl p-8 text-center border border-amber-400/20">
          <div className="text-5xl mb-4 animate-bounce">📥</div>
          <h2 className="font-display text-2xl font-bold text-white mb-2">Ready to Download?</h2>
          <p className="text-slate-400 text-base mb-6">
            Free PDF download — no account or login required
          </p>
          <button
            onClick={handleDownload}
            disabled={downloading}
            className={`w-full sm:w-auto px-10 py-4 ${
              downloading
                ? "bg-slate-600 cursor-not-allowed"
                : "bg-gradient-to-r from-amber-500 to-amber-400 hover:shadow-lg hover:shadow-amber-500/50"
            } text-black font-bold rounded-xl text-base transition duration-200 ${!downloading && "hover:scale-105"} active:scale-95`}
          >
            {downloading ? "⏳ Downloading..." : "📥 Download PDF Now"}
          </button>
          <p className="text-sm text-slate-500 mt-4">
            Total downloads: <span className="text-amber-400 font-semibold">{note.downloads}</span>
          </p>
        </div>
      </div>

      {/* Back link */}
      <div className="mt-8 text-center">
        <Link to="/browse" className="inline-flex items-center gap-2 text-slate-500 hover:text-amber-400 transition font-medium">
          ← Back to Browse
        </Link>
      </div>
    </div>
  );
}
