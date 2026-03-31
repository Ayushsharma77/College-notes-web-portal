import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../utils/api";
import { BRANCHES, YEARS, SEMESTERS_BY_YEAR, NOTE_TYPES } from "../utils/constants";

const INITIAL = {
  title: "", description: "", branch: "", year: "", semester: "",
  subject: "", type: "notes", tags: "",
};

export default function UploadNote() {
  const navigate = useNavigate();
  const [form,    setForm]    = useState(INITIAL);
  const [file,    setFile]    = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const set = (key, val) => {
    if (key === "year") return setForm({ ...form, year: val, semester: "" });
    setForm({ ...form, [key]: val });
  };

  const sems = form.year ? SEMESTERS_BY_YEAR[Number(form.year)] : [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, branch, year, semester, subject, type } = form;
    if (!title || !branch || !year || !semester || !subject || !file) {
      return toast.error("Fill all required fields and select a PDF");
    }

    const formData = new FormData();
    Object.entries(form).forEach(([k, v]) => { if (v) formData.append(k, v); });
    formData.append("file", file);

    setLoading(true);
    setProgress(0);

    try {
      await api.post("/notes", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (e) => {
          setProgress(Math.round((e.loaded * 100) / e.total));
        },
      });
      toast.success("Note uploaded successfully!");
      navigate("/admin");
    } catch (err) {
      toast.error(err.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
      setProgress(0);
    }
  };

  const inputClass =
    "w-full bg-[#0d1b2a] border border-white/10 text-white placeholder-slate-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400/50 transition disabled:opacity-50";
  const labelClass = "block text-xs text-slate-400 mb-1.5 uppercase tracking-widest";

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-black text-white">Upload Note</h1>
        <p className="text-slate-500 text-sm mt-1">Add a new PDF to the portal</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 bg-[#112236] border border-white/5 rounded-3xl p-8">
        {/* Title */}
        <div>
          <label className={labelClass}>Title *</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => set("title", e.target.value)}
            placeholder="e.g. Data Structures Unit 2 — Trees"
            className={inputClass}
          />
        </div>

        {/* Description */}
        <div>
          <label className={labelClass}>Description</label>
          <textarea
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            placeholder="Brief description (optional)"
            rows={2}
            className={inputClass + " resize-none"}
          />
        </div>

        {/* Branch / Year / Semester */}
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className={labelClass}>Branch *</label>
            <select value={form.branch} onChange={(e) => set("branch", e.target.value)} className={inputClass}>
              <option value="">Select</option>
              {BRANCHES.map((b) => <option key={b.code} value={b.code}>{b.code}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>Year *</label>
            <select value={form.year} onChange={(e) => set("year", e.target.value)} className={inputClass} disabled={!form.branch}>
              <option value="">Select</option>
              {YEARS.map((y) => <option key={y} value={y}>Year {y}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>Semester *</label>
            <select value={form.semester} onChange={(e) => set("semester", e.target.value)} className={inputClass} disabled={!form.year}>
              <option value="">Select</option>
              {sems.map((s) => <option key={s} value={s}>Sem {s}</option>)}
            </select>
          </div>
        </div>

        {/* Subject + Type */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Subject *</label>
            <input
              type="text"
              value={form.subject}
              onChange={(e) => set("subject", e.target.value)}
              placeholder="e.g. Data Structures"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Type</label>
            <select value={form.type} onChange={(e) => set("type", e.target.value)} className={inputClass}>
              {NOTE_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className={labelClass}>Tags (comma separated)</label>
          <input
            type="text"
            value={form.tags}
            onChange={(e) => set("tags", e.target.value)}
            placeholder="tree, bst, graph, algorithm"
            className={inputClass}
          />
        </div>

        {/* File upload */}
        <div>
          <label className={labelClass}>PDF File *</label>
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-xl p-6 cursor-pointer hover:border-amber-400/40 transition">
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setFile(e.target.files[0])}
              className="hidden"
            />
            {file ? (
              <div className="text-center">
                <div className="text-3xl mb-2">📄</div>
                <p className="text-sm text-white font-medium">{file.name}</p>
                <p className="text-xs text-slate-500 mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            ) : (
              <div className="text-center">
                <div className="text-3xl mb-2">☁️</div>
                <p className="text-sm text-slate-400">Click to select PDF</p>
                <p className="text-xs text-slate-600 mt-1">Max 50 MB</p>
              </div>
            )}
          </label>
        </div>

        {/* Upload progress */}
        {loading && progress > 0 && (
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>Uploading…</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-[#0d1b2a] rounded-full h-2">
              <div
                className="bg-amber-500 h-2 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-black font-bold rounded-xl transition"
        >
          {loading ? "Uploading…" : "Upload Note"}
        </button>
      </form>
    </div>
  );
}
