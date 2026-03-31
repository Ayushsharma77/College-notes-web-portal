import { Link } from "react-router-dom";
import { TYPE_COLOR } from "../utils/constants";

export default function NoteCard({ note }) {
  const typeStyle = TYPE_COLOR[note.type] || TYPE_COLOR.notes;

  const typeIcon = {
    notes:      "📄",
    paper:      "📝",
    assignment: "✏️",
    book:       "📚",
  }[note.type] || "📄";

  return (
    <Link to={`/notes/${note._id}`}>
      <div className="group bg-gradient-to-br from-[#112236] to-[#0d1b2a] border border-white/5 hover:border-amber-400/40 rounded-2xl p-5 flex flex-col gap-3 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10 hover:-translate-y-1 cursor-pointer h-full">
        {/* Top row */}
        <div className="flex items-start justify-between gap-2">
          <span className={`text-xs font-mono px-2 py-0.5 rounded-full border transition ${typeStyle} group-hover:shadow-md`}>
            {typeIcon} {note.type.charAt(0).toUpperCase() + note.type.slice(1)}
          </span>
          <span className="text-xs text-slate-500 font-mono bg-white/5 px-2 py-0.5 rounded">Sem {note.semester}</span>
        </div>

        {/* Title */}
        <h3 className="font-display text-base font-bold text-white leading-snug group-hover:text-amber-300 transition line-clamp-2">
          {note.title}
        </h3>

        {/* Subject + Branch */}
        <div className="flex flex-wrap gap-1.5">
          <span className="text-xs bg-white/8 group-hover:bg-amber-500/20 text-slate-300 px-2 py-0.5 rounded-md transition">{note.subject}</span>
          <span className="text-xs bg-white/8 text-slate-400 px-2 py-0.5 rounded-md">{note.branch}</span>
          <span className="text-xs bg-white/8 text-slate-400 px-2 py-0.5 rounded-md">Year {note.year}</span>
        </div>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between pt-3 border-t border-white/5 group-hover:border-amber-400/20 transition">
          <span className="text-xs text-slate-500 group-hover:text-slate-400 transition">⬇ {note.downloads}</span>
          <span className="text-xs font-semibold text-amber-400 group-hover:text-amber-300 transition flex items-center gap-1">
            View <span className="group-hover:translate-x-1 transition">→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
