import API from "./api";

export const hospitalService = {
  getHospitals: async () => {
    const res = await API.get("/api/hospitals");
    return res.data;
  },

  getHospitalById: async (id: number) => {
    const res = await API.get(`/api/hospitals/${id}`);
    return res.data;
  },

  createHospital: async (formData: FormData) => {
    const res = await API.post("/api/hospitals", formData, { headers: { "Content-Type": "multipart/form-data" }});
    return res.data;
  },

  updateHospital: async (id: number, formData: FormData) => {
    const res = await API.put(`/api/hospitals/${id}`, formData, { headers: { "Content-Type": "multipart/form-data" }});
    return res.data;
  },

  deleteHospital: async (id: number) => {
    const res = await API.delete(`/api/hospitals/${id}`);
    return res.data;
  },

  // master endpoints used by the form
  getSpecializations: async () => (await API.get("/api/masters/specializations")).data,
  getServices: async () => (await API.get("/api/masters/services")).data,
  getProcedures: async () => (await API.get("/api/masters/procedures")).data,
  getSymptoms: async () => (await API.get("/api/masters/symptoms")).data,
  getCities: async () => (await API.get("/api/masters/cities")).data,
  getAreas: async () => (await API.get("/api/masters/areas")).data,
};
