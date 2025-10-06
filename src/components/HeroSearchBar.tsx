import { useSearch } from "../hooks/useSearch";

export default function HeroSearchBar() {
  const {
    location,
    setLocation,
    query,
    setQuery,
    handleSearch,
    locationSuggestions,
    querySuggestions,
  } = useSearch();

  return (
    <form
      onSubmit={handleSearch}
      className="d-flex flex-column flex-md-row gap-2 p-4 bg-white shadow-lg rounded-3 position-relative"
    >
      {/* Location Input */}
      <div className="position-relative flex-fill">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter city or area"
          className="form-control"
        />
        {locationSuggestions.length > 0 && (
          <ul className="list-group position-absolute w-100 mt-1 shadow-sm z-10">
            {locationSuggestions.map((loc) => (
              <li
                key={loc.id}
                className="list-group-item list-group-item-action"
                onClick={() => {
                  setLocation(loc.label);
                }}
              >
                {loc.label}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Search Input */}
      <div className="position-relative flex-fill">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for doctors, hospitals, clinics..."
          className="form-control"
        />
        {querySuggestions.length > 0 && (
          <ul className="list-group position-absolute w-100 mt-1 shadow-sm z-10">
            {querySuggestions.map((item, index) => (
              <li
                key={item.id || index}
                className="list-group-item list-group-item-action"
                onClick={() => {
                  setQuery(item.name);
                }}
              >
                {item.name} <small className="text-muted">({item.type})</small>
              </li>
            ))}
          </ul>
        )}
      </div>

      <button type="submit" className="btn btn-primary px-4">
        Search
      </button>
    </form>
  );
}
