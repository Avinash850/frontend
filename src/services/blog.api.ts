import API from "./api";

// 🏷 Fetch public blog categories
export const fetchBlogCategories = async () => {
  const res = await API.get("/api/public/blog-categories");
  return res.data;
};

// 📰 Fetch blogs with pagination + optional category
export const fetchBlogs = async (params: {
  page: number;
  limit: number;
  category?: string;
}) => {
  const res = await API.get("/api/public/blogs", { params });
  return res.data;
};

// 📄 Fetch single blog detail by slug
export const fetchBlogDetail = async (slug: string) => {
  const res = await API.get(`/api/public/blogs/${slug}`);
  return res.data;
};


export const fetchRelatedBlogs = async (params: {
  category?: string;
  exclude: string;
  limit?: number;
}) => {
  const res = await API.get("/api/public/blogs/related", { params });
  return res.data;
};