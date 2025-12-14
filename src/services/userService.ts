import axios from "axios";

const API = import.meta.env.VITE_API_BASE_URL;

export const userService = {
  // ✅ Fetch all users
  getUsers: async () => {
    return axios.get(`${API}/api/users`);
  },

  // ✅ Create new user
  createUser: async (payload: { name: string; email: string }) => {
    return axios.post(`${API}/api/users`, payload);
  },

  // ✅ Update user (name only)
  updateUser: async (id: number, payload: { name: string }) => {
    return axios.put(`${API}/api/users/${id}`, payload);
  },

  // ✅ Update only status
  updateUserStatus: async (id: number, status: number) => {
    return axios.patch(`${API}/api/users/${id}/status`, { status });
  }
};
