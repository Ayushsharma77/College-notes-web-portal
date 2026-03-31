import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import BrandLogo from "./BrandLogo";

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname, location.search]);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    if (mobileMenuOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [mobileMenuOpen]);

  const handleLogout = () => {
    logout();
    toast.success("Logged out");
    navigate("/");
    setMobileMenuOpen(false);
  };

  const isActive = (path, query = "") => {
    if (location.pathname !== path) return false;

    const params = new URLSearchParams(location.search);

    // Keep "Browse" exclusive: active only when no type filter is selected.
    if (!query) {
      return !params.get("type");
    }

    const [key, value] = query.split("=");
    if (!key || !value) return false;
    return params.get(key) === value;
  };

  const navLinkClass = (active) =>
    active
      ? "text-amber-400"
      : "text-slate-300 hover:text-amber-300";

  const navLinks = [
    { to: "/", label: "Home", path: "/" },
    { to: "/browse", label: "Browse", path: "/browse" },
    ...(isAdmin ? [
      { to: "/admin", label: "Dashboard", path: "/admin" },
      { to: "/admin/upload", label: "Upload", path: "/admin/upload" }
    ] : [])
  ];

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-b from-[#0d1b2a]/95 to-[#0d1b2a]/80 backdrop-blur-md border-b border-white/5 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div onClick={() => setMobileMenuOpen(false)}>
          <BrandLogo className="hover:opacity-90" />
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map(({ to, label, path, query }) => (
            <Link
              key={to}
              to={to}
              className={`pb-1 transition duration-200 relative ${navLinkClass(isActive(path, query))}`}
            >
              {label}
              {isActive(path, query) && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full" />
              )}
            </Link>
          ))}
        </div>

        {/* Auth Section */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="hidden sm:block text-xs sm:text-sm text-slate-300 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                👤 {user.name}
                {isAdmin && <span className="ml-2 text-amber-400 font-mono">[admin]</span>}
              </span>
              <button
                onClick={handleLogout}
                className="text-sm px-3 sm:px-4 py-1.5 rounded-full border border-white/20 text-slate-300 hover:bg-white/5 hover:text-white transition duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="hidden sm:inline-flex text-sm px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 text-black font-semibold hover:shadow-lg hover:shadow-amber-500/50 transition duration-200 hover:scale-105"
            >
              Admin Login
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition ${
              mobileMenuOpen
                ? "text-amber-400 bg-white/10"
                : "text-white hover:bg-white/10"
            }`}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gradient-to-b from-[#112236] to-[#0d1b2a] border-t border-white/5 py-4 px-4 space-y-2 animate-in fade-in slide-in-from-top-3 duration-200">
          {navLinks.map(({ to, label, path, query }) => (
            <Link
              key={to}
              to={to}
              className={`block px-4 py-2.5 rounded-lg transition ${
                isActive(path, query)
                  ? "bg-amber-500/20 text-amber-400 font-semibold"
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              }`}
            >
              {label}
            </Link>
          ))}

          {!user && (
            <Link
              to="/login"
              className="block px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-black font-semibold text-center transition mt-3"
            >
              Admin Login
            </Link>
          )}

          {user && (
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2.5 rounded-lg border border-white/15 text-slate-200 hover:bg-red-500/20 hover:border-red-400/50 hover:text-red-300 transition mt-3"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
