import axios from "axios";

const API = import.meta.env.VITE_API_BASE_URL;

export const postService = {
  // ✅ Get all posts
  getPosts: async () => {
    return axios.get(`${API}/api/posts`);
  },

  // ✅ Get single post by ID
  getPostById: async (id: number) => {
    return axios.get(`${API}/api/posts/${id}`);
  },

  // ✅ Create new post (JSON only)
  createPost: async (data: any) => {
    return axios.post(`${API}/api/posts`, data); // send plain JSON
  },

  // ✅ Update post (JSON only)
  updatePost: async (id: number, data: any) => {
    return axios.put(`${API}/api/posts/${id}`, data); // send plain JSON
  },

  // ✅ Delete post
  deletePost: async (id: number) => {
    return axios.delete(`${API}/api/posts/${id}`);
  },
};
