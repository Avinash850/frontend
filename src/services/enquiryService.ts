import axios from "axios";

const API = import.meta.env.VITE_API_BASE_URL;

export const enquiryService = {
  // ✅ Get all enquiries
  getEnquiries: async () => {
    return axios.get(`${API}/api/enquiries`);
  },

  // ✅ Get single enquiry (optional — useful for view modal if needed)
  getEnquiryById: async (id: number) => {
    return axios.get(`${API}/api/enquiries/${id}`);
  }
};
