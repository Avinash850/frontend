import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8001",
  withCredentials: false,
});

// Optional: Add interceptors (good for debugging or auth headers)
// API.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.error("❌ API Error:", error.response?.data || error.message);
//     return Promise.reject(error);
//   }
// );

export default API;
