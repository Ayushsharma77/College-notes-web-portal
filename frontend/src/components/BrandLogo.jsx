import { Link } from "react-router-dom";

export default function BrandLogo({ to = "/", className = "", showText = true, small = false }) {
  const sizeClass = small ? "h-8 w-8" : "h-10 w-10";

  return (
    <Link to={to} className={`inline-flex items-center gap-2.5 group ${className}`.trim()}>
      <img
        src="/logo-mark.svg"
        alt="NoteVault"
        className={`${sizeClass} rounded-xl ring-1 ring-white/10 shadow-md shadow-black/30 group-hover:scale-105 transition`}
      />
      {showText && (
        <span className="font-display text-lg sm:text-xl font-black bg-gradient-to-r from-white to-amber-200 bg-clip-text text-transparent leading-none">
          Note<span className="text-amber-400">Vault</span>
        </span>
      )}
    </Link>
  );
}
