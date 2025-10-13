import axios from "axios";
import API from "./api";

// ✅ Fetch all doctors (optionally filter by query or location)
export const getDoctors = async (query?: string, location?: string) => {
  try {
    const res = await API.get("/api/doctors", {
      params: { q: query || "", location: location || "" },
    });
    return res.data;
  } catch (error) {
    console.error("❌ Error fetching doctors:", error);
    throw error;
  }
};

// ✅ Fetch single doctor by ID
export const getDoctorById = async (id: string) => {
  try {
    const res = await API.get(`/api/doctors/${id}`);
    return res.data;
  } catch (error) {
    console.error(`❌ Error fetching doctor with ID ${id}:`, error);
    throw error;
  }
};

// ✅ Fetch location suggestions (for the location search input)
export const getLocationSuggestions = async (query: string) => {
  try {
    if (!query || query.length < 3) return { results: [] };
    const res = await API.get("/api/locations/suggest", {
      params: { q: query },
    });
    return res.data;
  } catch (error) {
    console.error("❌ Error fetching location suggestions:", error);
    throw error;
  }
};

// ✅ Fetch doctor name suggestions (for autocomplete dropdown)
export const getDoctorSuggestions = async (query: string, location?: string) => {
  try {
    if (!query || query.length < 2) return { results: [] };
    const res = await API.get("/api/doctors/suggest", {
      params: { q: query, location },
    });
    return res.data;
  } catch (error) {
    console.error("❌ Error fetching doctor suggestions:", error);
    throw error;
  }
};

export const getDoctorDetails = async (payl) => {
    try {
      const { data } = await API.get(`http://localhost:8001/api/search/details`, {
        params: {id: payl.id, type: payl.type}
      });
      console.log("details===>", data)
      return data;
    } catch (error) {
      console.error("❌ Error fetching doctor details:", error);
    throw error;
    }
  };