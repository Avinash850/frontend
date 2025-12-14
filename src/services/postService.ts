import API from "./api";

export const postService = {
  // ✅ Get all posts
  getPosts: async () => {
    const res = await API.get("/api/posts");
    return res.data;
  },

  // ✅ Get single post by ID
  getPostById: async (id: number) => {
    const res = await API.get(`/api/posts/${id}`);
    return res.data;
  },

  // ✅ Create post (multipart – image + categories)
  createPost: async (formData: FormData) => {
    const res = await API.post("/api/posts", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  // ✅ Update post (multipart – image + categories)
  updatePost: async (id: number, formData: FormData) => {
    const res = await API.put(`/api/posts/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  // ✅ Delete post
  deletePost: async (id: number) => {
    const res = await API.delete(`/api/posts/${id}`);
    return res.data;
  },

  // ✅ Categories master (for multi-select)
  getCategories: async () => {
    const res = await API.get("/api/categories");
    return res.data;
  },
};
