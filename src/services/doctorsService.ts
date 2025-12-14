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
  // console.log("payl details -:", payl)
    try {
      const { data } = await API.get(`${import.meta.env.VITE_API_BASE_URL}/api/search/details`, {
        params: {id: payl.id, type: payl.type, location: payl.selectedLocation}
      });
      // console.log("details===>", data)
      return data;
    } catch (error) {
      console.error("❌ Error fetching doctor details:", error);
    throw error;
    }
  };




// import axios from "axios";


// Helper – prepare FormData for create & update
const buildFormData = (payload: any, imageFile: File | null) => {
  const formData = new FormData();

  // append all primitive values
  Object.keys(payload).forEach((key) => {
    const value = payload[key];

    // for arrays → append individually
    if (Array.isArray(value)) {
      value.forEach((v) => formData.append(`${key}[]`, v));
    } else {
      formData.append(key, value ?? "");
    }
  });

  // append image file if exists
  if (imageFile) {
    formData.append("image", imageFile);
  }

  return formData;
};



export const doctorService = {
  // ================================
  // GET ALL DOCTORS
  // ================================
  getDoctors: async () => {
    const res = await API.get(`/api/doctors`);
    return res.data;
  },

  // ================================
  // CREATE DOCTOR
  // ================================
  createDoctor: async (payload: any, imageFile: File | null) => {
    const formData = buildFormData(payload, imageFile);

    const res = await API.post(`/api/doctors`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return res.data;
  },

  // ================================
  // UPDATE DOCTOR
  // ================================
  updateDoctor: async (id: number, payload: any, imageFile: File | null) => {
    const formData = buildFormData(payload, imageFile);

    const res = await API.put(`/api/doctors/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return res.data;
  },

  // ================================
  // DELETE DOCTOR
  // ================================
  deleteDoctor: async (id: number) => {
    const res = await API.delete(`/api/doctors/${id}`);
    return res.data;
  },

  // ================================
  // GET SINGLE DOCTOR
  // ================================
  getDoctorById: async (id: number) => {
    const res = await API.get(`/api/doctors/${id}`);
    return res.data;
  },
};
