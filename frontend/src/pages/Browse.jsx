import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../utils/api";
import NoteCard from "../components/NoteCard";
import FilterBar from "../components/FilterBar";
import Pagination from "../components/Pagination";

const DEFAULT_FILTERS = {
  branch: "", year: "", semester: "", subject: "", type: "", search: "",
};

const filtersFromParams = (searchParams) => ({
  branch: searchParams.get("branch") || "",
  year: searchParams.get("year") || "",
  semester: searchParams.get("semester") || "",
  subject: searchParams.get("subject") || "",
  type: searchParams.get("type") || "",
  search: searchParams.get("search") || "",
});

const sameFilters = (a, b) =>
  a.branch === b.branch &&
  a.year === b.year &&
  a.semester === b.semester &&
  a.subject === b.subject &&
  a.type === b.type &&
  a.search === b.search;

export default function Browse() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState(() => filtersFromParams(searchParams));

  const [notes,   setNotes]   = useState([]);
  const [total,   setTotal]   = useState(0);
  const [pages,   setPages]   = useState(1);
  const [page,    setPage]    = useState(1);
  const [loading, setLoading] = useState(false);
  const [sort,    setSort]    = useState("newest");

  const fetchNotes = useCallback(async (f, p = 1, s = "newest") => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      Object.entries(f).forEach(([k, v]) => { if (v) params.set(k, v); });
      params.set("page", p);
      params.set("limit", 18);
      const { data } = await api.get(`/notes?${params}`);
      
      // Sort the notes based on the sort parameter
      let sortedNotes = [...data.data];
      switch(s) {
        case "popular":
          sortedNotes.sort((a, b) => b.downloads - a.downloads);
          break;
        case "oldest":
          sortedNotes.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
          break;
        case "newest":
        default:
          sortedNotes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }
      
      setNotes(sortedNotes);
      setTotal(data.total);
      setPages(data.pages);
    } finally {
      setLoading(false);
    }
  }, []);

  // Sync URL -> filters (handles navbar/footer query link clicks)
  useEffect(() => {
    const nextFilters = filtersFromParams(searchParams);
    setFilters((prev) => (sameFilters(prev, nextFilters) ? prev : nextFilters));
    setPage(1);
  }, [searchParams]);

  // Sync filters -> URL
  useEffect(() => {
    const params = {};
    Object.entries(filters).forEach(([k, v]) => { if (v) params[k] = v; });
    setSearchParams(params, { replace: true });
  }, [filters]);

  // Fetch whenever filters/page/sort changes
  useEffect(() => {
    fetchNotes(filters, page, sort);
  }, [filters, page, sort, fetchNotes]);

  const handleFiltersChange = (newFilters) => {
    setPage(1);
    setFilters(newFilters);
  };

  const clearFilters = () => {
    setPage(1);
    setFilters(DEFAULT_FILTERS);
  };

  const hasActiveFilters = Object.values(filters).some(Boolean);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex-1">
          <h1 className="font-display text-3xl font-bold text-white mb-1">Browse Notes</h1>
          {!loading && (
            <p className="text-slate-500 text-sm">{total} file{total !== 1 ? "s" : ""} found</p>
          )}
        </div>
        <div className="flex items-center gap-3">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="bg-[#112236] border border-white/10 text-sm text-slate-200 rounded-xl px-4 py-2 focus:outline-none focus:border-amber-400/50 transition"
          >
            <option value="newest">📅 Newest</option>
            <option value="oldest">⏳ Oldest</option>
            <option value="popular">⬇️ Most Downloaded</option>
          </select>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-xs text-slate-400 hover:text-amber-400 border border-white/10 hover:border-amber-400/30 px-3 py-2 rounded-full transition bg-white/5 hover:bg-white/10 font-medium"
            >
              ✕ Clear
            </button>
          )}
        </div>
      </div>

      <FilterBar filters={filters} onChange={handleFiltersChange} />

      <div className="mt-6">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-48 rounded-2xl bg-gradient-to-br from-[#112236] to-[#0d1b2a] animate-pulse" />
            ))}
          </div>
        ) : notes.length === 0 ? (
          <div className="text-center py-24 px-4">
            <div className="text-7xl mb-4 animate-bounce">🔍</div>
            <h3 className="font-display text-2xl text-white mb-3">No notes found</h3>
            <p className="text-slate-500 text-base max-w-sm mx-auto mb-8">
              Try adjusting your search or filters. We're constantly adding new notes!
            </p>
            <button
              onClick={clearFilters}
              className="inline-block px-6 py-2 bg-amber-500 hover:bg-amber-400 text-black font-semibold rounded-full transition hover:scale-105"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} />
            ))}
          </div>
        )}
      </div>

      <Pagination page={page} pages={pages} onChange={setPage} />
    </div>
  );
}
