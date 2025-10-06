import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function useSearch(initialLocation = "", initialQuery = "") {
  const [location, setLocation] = useState(initialLocation);
  const [query, setQuery] = useState(initialQuery);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (location && query) {
      navigate(`/search/${location}/${query}`);
    }
  };

  return {
    location,
    setLocation,
    query,
    setQuery,
    handleSearch,
  };
}
