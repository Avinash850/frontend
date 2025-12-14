import React, { useEffect, useMemo, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import MultiSelect from "./MultiSelect";
import { doctorService } from "../services/doctorsService";

type Props = {
  mode: "add" | "edit";
  initialData?: any; // pass doctor object for edit (may contain relational arrays or not)
  onClose: () => void;
  onSaved?: (savedItem?: any) => void;
};

const emptyForm = {
  id: null as number | null,
  name: "",
  slug: "",
  designation: "",
  type: "Medical Team",
  short_description: "",
  description: "",
  seo_title: "",
  seo_keywords: "",
  seo_description: "",
  json_schema: "",
  imageFile: null as File | null,
  imagePreview: "" as string,
  // new relational fields
  specializations: [] as number[],
  clinics: [] as number[],
  hospitals: [] as number[],
  procedures: [] as number[],
  services: [] as number[],
  symptoms: [] as number[],
  city_id: "" as string | number,
  area_id: "" as string | number,
};

const DoctorForm: React.FC<Props> = ({ mode, initialData, onClose, onSaved }) => {
  const [form, setForm] = useState({ ...emptyForm });
  const [loadingMasters, setLoadingMasters] = useState(false);

  // master lists
  const [specializations, setSpecializations] = useState<any[]>([]);
  const [clinics, setClinics] = useState<any[]>([]);
  const [hospitals, setHospitals] = useState<any[]>([]);
  const [procedures, setProcedures] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [symptoms, setSymptoms] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [areas, setAreas] = useState<any[]>([]);

  // filtered areas by selected city
  const filteredAreas = useMemo(() => {
    if (!form.city_id) return areas;
    return areas.filter((a) => String(a.city_id) === String(form.city_id));
  }, [areas, form.city_id]);

  useEffect(() => {
    // init form if edit
    if (mode === "edit" && initialData) {
      setForm((f) => ({
        ...f,
        id: initialData.id ?? null,
        name: initialData.name ?? "",
        slug: initialData.slug ?? "",
        designation: initialData.designation ?? "",
        type: initialData.type ?? "Medical Team",
        short_description: initialData.short_description ?? "",
        description: initialData.description ?? "",
        seo_title: initialData.seo_title ?? "",
        seo_keywords: initialData.seo_keywords ?? "",
        seo_description: initialData.seo_description ?? "",
        json_schema: initialData.json_schema ?? "",
        imageFile: null,
        imagePreview: initialData.image_url ?? "",
        // relational arrays: expect arrays of ids, but support both arrays of objects and arrays of ids
        specializations: Array.isArray(initialData.specializations)
          ? initialData.specializations.map((s: any) => (typeof s === "object" ? s.id : s))
          : [],
        clinics: Array.isArray(initialData.clinics) ? initialData.clinics.map((c: any) => (typeof c === "object" ? c.id : c)) : [],
        hospitals: Array.isArray(initialData.hospitals)
          ? initialData.hospitals.map((h: any) => (typeof h === "object" ? h.id : h))
          : [],
        procedures: Array.isArray(initialData.procedures) ? initialData.procedures.map((p: any) => (typeof p === "object" ? p.id : p)) : [],
        services: Array.isArray(initialData.services) ? initialData.services.map((s: any) => (typeof s === "object" ? s.id : s)) : [],
        symptoms: Array.isArray(initialData.symptoms) ? initialData.symptoms.map((s: any) => (typeof s === "object" ? s.id : s)) : [],
        city_id: initialData.city_id ?? "",
        area_id: initialData.area_id ?? "",
      }));
    }
  }, [initialData, mode]);

  useEffect(() => {
    // load master lists once (on mount)
    const loadMasters = async () => {
      try {
        setLoadingMasters(true);
        const [spRes, clRes, hRes, pRes, sRes, syRes, cityRes, areaRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_BASE_URL}/api/masters/specializations`).then((r) => r.json()),
          fetch(`${import.meta.env.VITE_API_BASE_URL}/api/masters/clinics`).then((r) => r.json()),
          fetch(`${import.meta.env.VITE_API_BASE_URL}/api/masters/hospitals`).then((r) => r.json()),
          fetch(`${import.meta.env.VITE_API_BASE_URL}/api/masters/procedures`).then((r) => r.json()),
          fetch(`${import.meta.env.VITE_API_BASE_URL}/api/masters/services`).then((r) => r.json()),
          fetch(`${import.meta.env.VITE_API_BASE_URL}/api/masters/symptoms`).then((r) => r.json()),
          fetch(`${import.meta.env.VITE_API_BASE_URL}/api/masters/cities`).then((r) => r.json()),
          fetch(`${import.meta.env.VITE_API_BASE_URL}/api/masters/areas`).then((r) => r.json()),
        ]);

        setSpecializations(Array.isArray(spRes) ? spRes : []);
        setClinics(Array.isArray(clRes) ? clRes : []);
        setHospitals(Array.isArray(hRes) ? hRes : []);
        setProcedures(Array.isArray(pRes) ? pRes : []);
        setServices(Array.isArray(sRes) ? sRes : []);
        setSymptoms(Array.isArray(syRes) ? syRes : []);
        setCities(Array.isArray(cityRes) ? cityRes : []);
        setAreas(Array.isArray(areaRes) ? areaRes : []);
      } catch (err) {
        console.error("Failed to load masters", err);
      } finally {
        setLoadingMasters(false);
      }
    };

    loadMasters();
  }, []);

  const handleImageChange = (file: File | null) => {
    if (!file) {
      setForm((s) => ({ ...s, imageFile: null, imagePreview: "" }));
      return;
    }
    const url = URL.createObjectURL(file);
    setForm((s) => ({ ...s, imageFile: file, imagePreview: url }));
  };

  const handleSubmit = async () => {
    if (!form.name.trim()) {
      alert("Name is required");
      return;
    }

    const payload: any = {
      name: form.name,
      slug: form.slug || form.name.toLowerCase().replace(/\s+/g, "-"),
      designation: form.designation,
      type: form.type,
      short_description: form.short_description,
      description: form.description,
      seo_title: form.seo_title,
      seo_keywords: form.seo_keywords,
      seo_description: form.seo_description,
      json_schema: form.json_schema,
      city_id: form.city_id || null,
      area_id: form.area_id || null,
      // relation arrays
      specializations: form.specializations,
      clinics: form.clinics,
      hospitals: form.hospitals,
      procedures: form.procedures,
      services: form.services,
      symptoms: form.symptoms,
    };

    try {
      if (mode === "add") {
        await doctorService.createDoctor(payload, form.imageFile);
      } else {
        await doctorService.updateDoctor(form.id, payload, form.imageFile);
      }
      onSaved && onSaved({});
      onClose();
    } catch (err) {
      console.error("Failed to save doctor", err);
      alert("Failed to save doctor");
    }
  };

  return (
    <div className="max-h-[80vh] overflow-y-auto px-1">
      <div className="space-y-4 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">Name*</label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">Slug</label>
                <input
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Designation</label>
                <input
                  value={form.designation}
                  onChange={(e) => setForm({ ...form, designation: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Type</label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option>Medical Team</option>
                <option>Visiting Specialist</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Short description</label>
              <textarea
                value={form.short_description}
                onChange={(e) => setForm({ ...form, short_description: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
                rows={3}
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium mb-1">Image</label>
            <div className="border p-2 rounded">
              {form.imagePreview ? (
                <div className="relative">
                  <img src={form.imagePreview} alt="preview" className="w-full h-40 object-cover rounded" />
                  <button
                    onClick={() => handleImageChange(null)}
                    className="absolute top-2 right-2 bg-black/60 text-white px-2 rounded"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-2 py-6">
                  <div className="text-sm text-gray-500">No image</div>
                </div>
              )}
              <div className="mt-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e.target.files?.[0] ?? null)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">City</label>
            <select
              value={form.city_id}
              onChange={(e) => setForm({ ...form, city_id: e.target.value, area_id: "" })}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="">Select City</option>
              {cities.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Area</label>
            <select
              value={form.area_id}
              onChange={(e) => setForm({ ...form, area_id: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="">Select Area</option>
              {filteredAreas.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Multi-select groups */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MultiSelect
            label="Specializations"
            options={specializations}
            selected={form.specializations}
            onChange={(vals) => setForm({ ...form, specializations: vals })}
            placeholder="Select specializations"
          />

          <MultiSelect
            label="Clinics"
            options={clinics}
            selected={form.clinics}
            onChange={(vals) => setForm({ ...form, clinics: vals })}
            placeholder="Select clinics"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MultiSelect
            label="Hospitals"
            options={hospitals}
            selected={form.hospitals}
            onChange={(vals) => setForm({ ...form, hospitals: vals })}
            placeholder="Select hospitals"
          />

          <MultiSelect
            label="Procedures"
            options={procedures}
            selected={form.procedures}
            onChange={(vals) => setForm({ ...form, procedures: vals })}
            placeholder="Select procedures"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MultiSelect
            label="Services"
            options={services}
            selected={form.services}
            onChange={(vals) => setForm({ ...form, services: vals })}
            placeholder="Select services"
          />

          <MultiSelect
            label="Symptoms"
            options={symptoms}
            selected={form.symptoms}
            onChange={(vals) => setForm({ ...form, symptoms: vals })}
            placeholder="Select symptoms"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <ReactQuill value={form.description} onChange={(val) => setForm({ ...form, description: val })} />
        </div>

        {/* SEO & JSON */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">SEO Title</label>
            <input
              value={form.seo_title}
              onChange={(e) => setForm({ ...form, seo_title: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">SEO Keywords</label>
            <input
              value={form.seo_keywords}
              onChange={(e) => setForm({ ...form, seo_keywords: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="comma separated"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">SEO Description</label>
          <textarea
            value={form.seo_description}
            onChange={(e) => setForm({ ...form, seo_description: e.target.value })}
            className="w-full px-3 py-2 border rounded-md"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">JSON Schema</label>
          <textarea
            value={form.json_schema}
            onChange={(e) => setForm({ ...form, json_schema: e.target.value })}
            className="w-full px-3 py-2 border rounded-md"
            rows={4}
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button className="px-4 py-2 rounded-md border" onClick={onClose}>
            Cancel
          </button>
          <button onClick={handleSubmit} className="px-4 py-2 rounded-md bg-green-600 text-white">
            {mode === "add" ? "Save" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorForm;
