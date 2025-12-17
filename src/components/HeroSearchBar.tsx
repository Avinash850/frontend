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
      className="d-flex flex-column flex-lg-row gap-2 p-3 p-md-4 
        bg-white shadow-lg rounded-3 position-relative"
    >
      {/* Location */}
      <div className="position-relative flex-fill">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter city or area"
          className="form-control form-control-lg"
        />

        {locationSuggestions.length > 0 && (
          <ul
            className="list-group position-absolute w-100 mt-1 shadow z-3"
            style={{ maxHeight: "220px", overflowY: "auto" }}
          >
            {locationSuggestions.map((loc) => (
              <li
                key={loc.id}
                className="list-group-item list-group-item-action py-3"
                onClick={() => setLocation(loc.label)}
              >
                {loc.label}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Query */}
      <div className="position-relative flex-fill">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search doctors, hospitals..."
          className="form-control form-control-lg"
        />

        {querySuggestions.length > 0 && (
          <ul
            className="list-group position-absolute w-100 mt-1 shadow z-3"
            style={{ maxHeight: "220px", overflowY: "auto" }}
          >
            {querySuggestions.map((item, index) => (
              <li
                key={item.id || index}
                className="list-group-item list-group-item-action py-3"
                onClick={() => setQuery(item.name)}
              >
                <div className="fw-semibold">{item.name}</div>
                <small className="text-muted">{item.type}</small>
              </li>
            ))}
          </ul>
        )}
      </div>

      <button type="submit" className="btn btn-primary btn-lg 
          w-100 w-lg-auto px-lg-4">
        Search
      </button>
    </form>
  );
}
