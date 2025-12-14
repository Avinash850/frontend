import axios from "axios";

const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:8001";

export const enquiryService = {
  // ✅ Get all enquiries
  getEnquiries: async () => {
    return axios.get(`${API}/api/enquiries`);
  },

  // ✅ Get single enquiry
  getEnquiryById: async (id: number) => {
    return axios.get(`${API}/api/enquiries/${id}`);
  },

  createEnquiry: async (payload: {
    name: string;
    mobile: string;
    city?: string | null;
    service: string;
    message?: string | null;
    email?: string | null;
  }) => {
    return axios.post(`${API}/api/enquiries`, payload);
  },

};
