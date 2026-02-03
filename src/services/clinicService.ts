import API from "./api";

export const clinicService = {
  getClinics: async () => {
    const res = await API.get("/api/clinics");
    return res.data;
  },

  getClinicById: async (id: number) => {
    const res = await API.get(`/api/clinics/${id}`);
    return res.data;
  },

  createClinic: async (formData: FormData) => {
    const res = await API.post("/api/clinics", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  updateClinic: async (id: number, formData: FormData) => {
    const res = await API.put(`/api/clinics/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  deleteClinic: async (id: number) => {
    const res = await API.delete(`/api/clinics/${id}`);
    return res.data;
  },

  // masters
  getSpecializations: async () => (await API.get("/api/masters/specializations")).data,
  getServices: async () => (await API.get("/api/masters/services")).data,
  getProcedures: async () => (await API.get("/api/masters/procedures")).data,
  getSymptoms: async () => (await API.get("/api/masters/symptoms")).data,
  getDoctors: async () => (await API.get("/api/masters/doctors")).data,
  getCities: async () => (await API.get("/api/masters/cities")).data,
  getAreas: async () => (await API.get("/api/masters/areas")).data,


  /* ===============================
   CLINIC GALLERY APIS
   =============================== */

getClinicImages: async (clinicId: number) => {
  const res = await API.get(`/api/clinics/${clinicId}/images`);
  return res.data;
},

uploadClinicImages: async (clinicId: number, files: File[]) => {
  const fd = new FormData();
  files.forEach((file) => fd.append("images", file));

  const res = await API.post(
    `/api/clinics/${clinicId}/images`,
    fd,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return res.data;
},

deleteClinicImage: async (imageId: number) => {
  const res = await API.delete(`/api/clinic-images/${imageId}`);
  return res.data;
},

};
