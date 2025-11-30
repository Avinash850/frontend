import axios from "axios";

const API = import.meta.env.VITE_API_BASE_URL;

export const blogService = {
  // ✅ Fetch all categories
  getCategories: async () => {
    return axios.get(`${API}/api/blog-categories`);
  },

  // ✅ Create new category
  createCategory: async (payload: { name: string; slug: string }) => {
    return axios.post(`${API}/api/blog-categories`, payload);
  },

  // ✅ Update category
  updateCategory: async (id: number, payload: { name: string; slug: string }) => {
    return axios.put(`${API}/api/blog-categories/${id}`, payload);
  },

  // ✅ Update only status
  updateCategoryStatus: async (id: number, status: number) => {
    return axios.patch(`${API}/api/blog-categories/${id}/status`, { status });
  }
};
