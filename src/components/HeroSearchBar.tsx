import { useSearch } from "../hooks/useSearch";

export default function HeroSearchBar() {
  const { location, setLocation, query, setQuery, handleSearch } = useSearch();

  return (
    <form onSubmit={handleSearch} className="d-flex flex-column flex-md-row gap-2 p-4 bg-white shadow-lg rounded-3">
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Enter city"
        className="form-control flex-fill"
      />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for doctors, clinics, hospitals..."
        className="form-control flex-fill"
      />
      <button type="submit" className="btn btn-primary px-4">
        Search
      </button>
    </form>
  );
}
