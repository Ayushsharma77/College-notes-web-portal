import { useState, useEffect } from "react";
import { BRANCHES, YEARS, SEMESTERS_BY_YEAR, NOTE_TYPES } from "../utils/constants";
import api from "../utils/api";

export default function FilterBar({ filters, onChange }) {
  const [subjects, setSubjects] = useState([]);

  const { branch, year, semester, subject, type, search } = filters;

  // Fetch distinct subjects when branch/year/semester change
  useEffect(() => {
    if (!branch) return setSubjects([]);
    const params = new URLSearchParams();
    if (branch)   params.set("branch", branch);
    if (year)     params.set("year", year);
    if (semester) params.set("semester", semester);

    api.get(`/notes/subjects?${params}`).then(({ data }) => setSubjects(data.data));
  }, [branch, year, semester]);

  const sems = year ? SEMESTERS_BY_YEAR[year] : [];

  const set = (key, val) => {
    // Reset downstream filters when a parent filter changes
    if (key === "branch") return onChange({ ...filters, branch: val, year: "", semester: "", subject: "" });
    if (key === "year")   return onChange({ ...filters, year: val, semester: "", subject: "" });
    if (key === "semester") return onChange({ ...filters, semester: val, subject: "" });
    onChange({ ...filters, [key]: val });
  };

  const selectClass =
    "bg-gradient-to-br from-[#112236] to-[#0d1b2a] border border-white/10 hover:border-white/20 text-sm text-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-amber-400/50 focus:ring-2 focus:ring-amber-400/20 w-full transition appearance-none cursor-pointer";

  return (
    <div className="bg-gradient-to-r from-white/5 to-white/5 backdrop-blur border border-white/5 rounded-2xl p-5 space-y-3 hover:border-white/10 transition">
      {/* Search */}
      <input
        type="text"
        placeholder="🔍  Search notes, subjects…"
        value={search}
        onChange={(e) => set("search", e.target.value)}
        className={selectClass + " placeholder-slate-500 bg-[#112236] border-white/10"}
      />

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {/* Branch */}
        <select value={branch} onChange={(e) => set("branch", e.target.value)} className={selectClass}>
          <option value="">All Branches</option>
          {BRANCHES.map((b) => (
            <option key={b.code} value={b.code}>{b.code}</option>
          ))}
        </select>

        {/* Year */}
        <select value={year} onChange={(e) => set("year", e.target.value)} className={selectClass} disabled={!branch}>
          <option value="">Year</option>
          {YEARS.map((y) => <option key={y} value={y}>Year {y}</option>)}
        </select>

        {/* Semester */}
        <select value={semester} onChange={(e) => set("semester", e.target.value)} className={selectClass} disabled={!year}>
          <option value="">Semester</option>
          {sems.map((s) => <option key={s} value={s}>Sem {s}</option>)}
        </select>

        {/* Type */}
        <select value={type} onChange={(e) => set("type", e.target.value)} className={selectClass}>
          <option value="">All Types</option>
          {NOTE_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
        </select>
      </div>

      {/* Subject chips */}
      {subjects.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2">
          <button
            onClick={() => set("subject", "")}
            className={`text-xs px-3 py-1.5 rounded-full border transition duration-200 font-medium ${
              !subject
                ? "bg-gradient-to-r from-amber-500 to-amber-400 text-black border-amber-500 shadow-lg shadow-amber-500/30"
                : "border-white/20 text-slate-400 hover:text-white hover:border-white/40 hover:bg-white/5"
            }`}
          >
            All Subjects
          </button>
          {subjects.map((s) => (
            <button
              key={s}
              onClick={() => set("subject", s)}
              className={`text-xs px-3 py-1.5 rounded-full border transition duration-200 font-medium ${
                subject === s
                  ? "bg-gradient-to-r from-amber-500 to-amber-400 text-black border-amber-500 shadow-lg shadow-amber-500/30"
                  : "border-white/20 text-slate-400 hover:text-white hover:border-white/40 hover:bg-white/5"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
