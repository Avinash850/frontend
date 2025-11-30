import axios from "axios";
import API from "./api";
// const API = import.meta.env.VITE_API_BASE_URL;


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
      const { data } = await API.get(`${import.meta.env.VITE_API_BASE_URL}/api/search/details`, {
        params: {id: payl.id, type: payl.type}
      });
      console.log("details===>", data)
      return data;
    } catch (error) {
      console.error("❌ Error fetching doctor details:", error);
    throw error;
    }
  };




// import axios from "axios";


export const doctorService = {
  // ✅ Fetch all doctors
  getDoctors: async () => {
    return axios.get(`${API}/api/doctors`);
  },

  // ✅ Create new doctor
  createDoctor: async (payload) => {
    return axios.post(`${API}/api/doctors`, payload);
  },

  // ✅ Update doctor
  updateDoctor: async (id, payload) => {
    return axios.put(`${API}/api/doctors/${id}`, payload);
  },

  // ✅ Delete doctor
  deleteDoctor: async (id) => {
    return axios.delete(`${API}/api/doctors/${id}`);
  },

  // ✅ Get single doctor (for view/edit details)
  getDoctorById: async (id) => {
    return axios.get(`${API}/api/doctors/${id}`);
  },
};
