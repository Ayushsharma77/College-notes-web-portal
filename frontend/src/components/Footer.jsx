import { Link } from "react-router-dom";
import BrandLogo from "./BrandLogo";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-white/5 bg-gradient-to-b from-[#0d1b2a] to-[#081320]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <BrandLogo className="w-fit" />
          <p className="text-slate-400 text-sm mt-3 leading-relaxed">
            A simple, student-first notes portal for quick access to semester resources.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white mb-3">Quick Links</h4>
          <div className="space-y-2 text-sm">
            <Link to="/" className="text-slate-400 hover:text-amber-300 transition inline-block">Home</Link>
            <Link to="/browse" className="block text-slate-400 hover:text-amber-300 transition">Browse</Link>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white mb-3">Materials</h4>
          <div className="space-y-2 text-sm">
            <Link to="/browse?type=assignment" className="block text-slate-400 hover:text-amber-300 transition">Assignments</Link>
            <Link to="/browse?type=book" className="block text-slate-400 hover:text-amber-300 transition">Books</Link>
            <Link to="/browse?branch=CSE" className="block text-slate-400 hover:text-amber-300 transition">CSE</Link>
            <Link to="/browse?branch=ECE" className="block text-slate-400 hover:text-amber-300 transition">ECE</Link>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white mb-3">Admin</h4>
          <div className="space-y-2 text-sm">
            <Link to="/login" className="block text-slate-400 hover:text-amber-300 transition">Admin Login</Link>
            <p className="text-slate-500 text-xs leading-relaxed">
              Upload and manage notes through the dashboard.
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 text-xs text-slate-500 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
          <p>© {year} NoteVault. All rights reserved.</p>
          <p>Built for students, by students.</p>
        </div>
      </div>
    </footer>
  );
}
