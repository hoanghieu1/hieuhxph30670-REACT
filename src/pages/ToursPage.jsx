import { useMemo, useState, useEffect } from "react";
import TourCard from "../components/TourCard";
import { useLocation } from "react-router-dom";

export default function ToursPage({ tours }) {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    // read ?loc=... from URL and set it as initial filter
    const params = new URLSearchParams(search);
    const loc = params.get("loc");
    if (loc) {
      setFilters([loc]);
    }
  }, [search]);

  const locations = useMemo(() => {
    return Array.from(new Set(tours.map((t) => t.location)));
  }, [tours]);

  const toggleFilter = (loc) => {
    setFilters((prev) => (prev.includes(loc) ? prev.filter((p) => p !== loc) : [...prev, loc]));
  };

  const visible = useMemo(() => {
    return tours.filter((t) => {
      const q = query.trim().toLowerCase();
      const matchesQuery =
        q === "" ||
        t.name.toLowerCase().includes(q) ||
        t.location.toLowerCase().includes(q) ||
        (t.description && t.description.toLowerCase().includes(q));

      const matchesFilter = filters.length === 0 || filters.includes(t.location);
      return matchesQuery && matchesFilter;
    });
  }, [tours, query, filters]);

  return (
    <main className="flex-1 flex justify-center items-start px-4 py-10">
      <div className="w-full max-w-7xl rounded-xl border-2 border-slate-300 bg-white px-8 py-10">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">All Tours</h1>
            <p className="text-sm text-slate-600">Tất cả các tour hiện có</p>
          </div>
          <div className="flex items-center gap-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="px-3 py-2 border rounded-md w-56"
            />
            <button className="px-3 py-2 bg-blue-600 text-white rounded-md">🔍</button>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-sm font-semibold mb-2">Filter by:</p>
          <div className="flex flex-wrap gap-2">
            {locations.map((loc) => (
              <button
                key={loc}
                onClick={() => toggleFilter(loc)}
                className={`px-3 py-1 rounded-full border ${filters.includes(loc) ? 'bg-blue-600 text-white' : 'bg-white text-slate-700'}`}>
                {loc}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visible.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      </div>
    </main>
  );
}
