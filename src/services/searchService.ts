import API from "./api";

// 🔍 Fetch location suggestions
export const fetchLocationSuggestions = async (query: string) => {
  if (!query || query.trim().length < 2) return [];
  const res = await API.get(`/api/suggest-locations?q=${encodeURIComponent(query)}`);
  return res.data.results || [];
};

// 🩺 Fetch main search suggestions (doctors, hospitals, etc.)
export const fetchSearchSuggestions = async (query: string) => {
  if (!query || query.trim().length < 2) return {};
  const res = await API.get(`/api/suggest?q=${encodeURIComponent(query)}`);
  return res.data || {};
};

export const searchByLocationAndQuery = async (location: string, query: string) => {
  const res = await API.get(`/api/search`, {
    params: { location, query },
  });
  return res.data;
};