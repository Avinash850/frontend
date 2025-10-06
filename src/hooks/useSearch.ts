import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchLocationSuggestions, fetchSearchSuggestions } from "../services/searchService";

export function useSearch(initialLocation = "", initialQuery = "") {
  const [location, setLocation] = useState(initialLocation);
  const [query, setQuery] = useState(initialQuery);
  const [locationSuggestions, setLocationSuggestions] = useState<any[]>([]);
  const [querySuggestions, setQuerySuggestions] = useState<any[]>([]);
  const navigate = useNavigate();

  // ⛳ Fetch location suggestions
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (location.length >= 2) {
        const results = await fetchLocationSuggestions(location);
        setLocationSuggestions(results);
      } else {
        setLocationSuggestions([]);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [location]);

  // 🔍 Fetch query suggestions
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.length >= 2) {
        const results = await fetchSearchSuggestions(query);
        // Merge all suggestion arrays (doctors, hospitals, etc.)
        const combined = Object.values(results).flat();
        setQuerySuggestions(combined);
      } else {
        setQuerySuggestions([]);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (location && query) {
      navigate(`/search/${encodeURIComponent(location)}/${encodeURIComponent(query)}`);
    }
  };

  return {
    location,
    setLocation,
    query,
    setQuery,
    handleSearch,
    locationSuggestions,
    querySuggestions,
  };
}
