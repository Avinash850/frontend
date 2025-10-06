import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000", // fallback for safety
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false, // ✅ keep false unless you are using cookies/session auth
});

// Optional: Add interceptors (good for debugging or auth headers)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("❌ API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default API;
