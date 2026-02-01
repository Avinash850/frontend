import React, { useEffect, useMemo, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import MultiSelect from "./MultiSelect";
import { hospitalService } from "../services/hospitalService";
import { quillModules, quillFormats } from "@/editor/quillConfig";
import { number } from "framer-motion";

type Props = {
  mode: "add" | "edit";
  initialData?: any;
  onClose: () => void;
  onSaved?: () => void;
};

const emptyForm = {
  id: null,
  name: "",
  timing: "",
  short_description: "",
  about: "",
  phone_1: "",
  phone_2: "",
  website: "",
  address: "",
  seo_title: "",
  seo_keywords: "",
  seo_description: "",
  imageFile: null as File | null,
  imagePreview: "",
  specializations: [] as number[],
  services: [] as number[],
  procedures: [] as number[],
  symptoms: [] as number[],
  city_id: "",
  area_id: "",

  // ✅ added fields
  designation: "",
  payment_type: "",
  rating: "",
  patients_count: "",
  patients_stories: "",
  is_profile_claimed: false,
  show_call_button: false,
};

const HospitalForm: React.FC<Props> = ({ mode, initialData, onClose, onSaved }) => {
  const [form, setForm] = useState({ ...emptyForm });
  const [loadingMasters, setLoadingMasters] = useState(false);

  const [specializations, setSpecializations] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [procedures, setProcedures] = useState<any[]>([]);
  const [symptoms, setSymptoms] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [areas, setAreas] = useState<any[]>([]);

  const filteredAreas = useMemo(() => {
    if (!form.city_id) return areas;
    return areas.filter((a) => String(a.city_id) === String(form.city_id));
  }, [areas, form.city_id]);

  const safe = (v: any) => (v === null || v === undefined ? "" : v);

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setForm({
        ...emptyForm,
        id: initialData.id,
        name: safe(initialData.name),
        timing: safe(initialData.timing),
        short_description: safe(initialData.short_description),
        about: typeof initialData.about === "string" ? initialData.about : "",
        phone_1: safe(initialData.phone_1),
        phone_2: safe(initialData.phone_2),
        website: safe(initialData.website),
        address: safe(initialData.address),
        seo_title: safe(initialData.seo_title),
        seo_keywords: safe(initialData.seo_keywords),
        seo_description: safe(initialData.seo_description),
        imagePreview: safe(initialData.image_url),

        specializations: Array.isArray(initialData.specializations)
          ? initialData.specializations.map((s: any) => s.id ?? s)
          : [],
        services: Array.isArray(initialData.services)
          ? initialData.services.map((s: any) => s.id ?? s)
          : [],
        procedures: Array.isArray(initialData.procedures)
          ? initialData.procedures.map((p: any) => p.id ?? p)
          : [],
        symptoms: Array.isArray(initialData.symptoms)
          ? initialData.symptoms.map((s: any) => s.id ?? s)
          : [],

        city_id: safe(initialData.city_id),
        area_id: safe(initialData.area_id),

        // ✅ added prefill
        designation: safe(initialData.designation),
        payment_type: safe(initialData.payment_type),
        rating: normalizeRating(initialData.rating),
        patients_count: safe(initialData.patients_count),
        patients_stories: safe(initialData.patients_stories),
        is_profile_claimed: Boolean(initialData.is_profile_claimed),
        show_call_button: Boolean(initialData.show_call_button),
      });
    }
  }, [initialData, mode]);

  const normalizeRating = (v: any) => {
  const n = Number(v);
  if (isNaN(n)) return "0";
  return (Math.round(n * 2) / 2).toString();
};


  useEffect(() => {
    const loadMasters = async () => {
      try {
        setLoadingMasters(true);
        const [spRes, servRes, procRes, symRes, cityRes, areaRes] =
          await Promise.all([
            hospitalService.getSpecializations(),
            hospitalService.getServices(),
            hospitalService.getProcedures(),
            hospitalService.getSymptoms(),
            hospitalService.getCities(),
            hospitalService.getAreas(),
          ]);

        setSpecializations(spRes || []);
        setServices(servRes || []);
        setProcedures(procRes || []);
        setSymptoms(symRes || []);
        setCities(cityRes || []);
        setAreas(areaRes || []);
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

  const csv = (arr: number[]) => arr.join(",");

  const handleSubmit = async () => {
    if (!form.name.trim()) {
      alert("Name is required");
      return;
    }

    const payload = new FormData();
    payload.append("name", form.name);
    payload.append("timing", form.timing || "");
    payload.append("short_description", form.short_description || "");
    payload.append("about", form.about || "");
    payload.append("phone_1", form.phone_1 || "");
    payload.append("phone_2", form.phone_2 || "");

    payload.append("website", form.website || "");
    payload.append("address", form.address || "");

    if (form.city_id) payload.append("city_id", String(form.city_id));
    if (form.area_id) payload.append("area_id", String(form.area_id));

    payload.append("seo_title", form.seo_title || "");
    payload.append("seo_keywords", form.seo_keywords || "");
    payload.append("seo_description", form.seo_description || "");

    payload.append("specializations", csv(form.specializations));
    payload.append("services", csv(form.services));
    payload.append("procedures", csv(form.procedures));
    payload.append("symptoms", csv(form.symptoms));

    // ✅ added payload fields
    payload.append("designation", form.designation || "");
    payload.append("payment_type", String(form.payment_type || 0));
    payload.append("rating", String(form.rating || 0));
    payload.append("patients_count", String(form.patients_count || 0));
    payload.append("patients_stories", String(form.patients_stories || 0));
    payload.append("is_profile_claimed", form.is_profile_claimed ? "1" : "0");
    payload.append("show_call_button", form.show_call_button ? "1" : "0");

    if (form.imageFile) payload.append("image", form.imageFile);

    try {
      if (mode === "add") {
        await hospitalService.createHospital(payload);
      } else {
        await hospitalService.updateHospital(form.id, payload);
      }

      onSaved && onSaved();
      onClose();
    } catch (err) {
      console.error("Save failed", err);
      alert("Failed to save hospital");
    }
  };

  return (
    <div className="max-h-[80vh] overflow-y-auto px-1">
      <div className="space-y-4 pb-4">
        {/* BASIC FIELDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
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
                <label className="block text-sm font-medium mb-1">Timing</label>
                <input
                  value={form.timing}
                  onChange={(e) => setForm({ ...form, timing: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Short Description
              </label>
              <textarea
                value={form.short_description}
                onChange={(e) =>
                  setForm({ ...form, short_description: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-md"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Address</label>
              <textarea
                rows={3}
                value={form.address}
                onChange={e =>
                  setForm({ ...form, address: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            {/* ✅ NEW FIELDS (only addition, position correct) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                placeholder="Designation"
                value={form.designation}
                onChange={(e) =>
                  setForm({ ...form, designation: e.target.value })
                }
                className="px-3 py-2 border rounded-md"
              />

             <div>
  <label className="block text-sm font-medium mb-1">Payment Type</label>
  <select
    value={form.payment_type}
    onChange={(e) =>
      setForm({ ...form, payment_type: e.target.value })
    }
    className="px-3 py-2 border rounded-md"
  >
    <option value="">Select Payment Type</option>
    <option value="1">Online</option>
    <option value="2">Cash</option>
    <option value="3">Both Accepted</option>
  </select>
</div>


              {/* <input
                type="number"
                step="0.5"
                min="1"
                max="5"
                placeholder="Rating (1–5)"
                value={form.rating}
                onChange={(e) =>
                  setForm({ ...form, rating: e.target.value })
                }
                className="px-3 py-2 border rounded-md"
              /> */}
              <div>
  <label className="block text-sm font-medium mb-1">Rating</label>
  <select
    value={form.rating}
    onChange={(e) =>
      setForm({ ...form, rating: e.target.value })
    }
    className="px-3 py-2 border rounded-md"
  >
    {[0,0.5,1,1.5,2,2.5,3,3.5,4,4.5,5].map(v => (
      <option key={v} value={String(v)}>{v}</option>
    ))}
  </select>
</div>


             <div>
  <label className="block text-sm font-medium mb-1">
    Total Patients
  </label>
  <input
    type="number"
    value={form.patients_count}
    onChange={(e) =>
      setForm({ ...form, patients_count: e.target.value })
    }
    className="px-3 py-2 border rounded-md"
  />
</div>

<div>
  <label className="block text-sm font-medium mb-1">
    Patient Stories
  </label>
  <input
    type="number"
    value={form.patients_stories}
    onChange={(e) =>
      setForm({ ...form, patients_stories: e.target.value })
    }
    className="px-3 py-2 border rounded-md"
  />
</div>


              {/* <input
                type="number"
                placeholder="Patients Stories"
                value={form.patients_stories}
                onChange={(e) =>
                  setForm({ ...form, patients_stories: e.target.value })
                }
                className="px-3 py-2 border rounded-md"
              /> */}
              <div>
                   <label className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  checked={form.is_profile_claimed}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      is_profile_claimed: e.target.checked,
                    })
                  }
                />
                Profile Claimed
              </label>
              </div>
              <div>
                   <label className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  checked={form.show_call_button}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      show_call_button: e.target.checked,
                    })
                  }
                />
                Show Call Button
              </label>
              </div>
             
            </div>
          </div>

          {/* IMAGE */}
          <div>
            <label className="block text-sm font-medium mb-1">Image</label>
            <div className="border p-2 rounded">
              {form.imagePreview ? (
                <div className="relative">
                  <img
                    src={form.imagePreview}
                    className="w-full h-40 object-cover rounded"
                  />
                  <button
                    onClick={() => handleImageChange(null)}
                    className="absolute top-2 right-2 bg-black/60 text-white px-2 rounded"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div className="py-6 flex items-center justify-center text-gray-500">
                  No image
                </div>
              )}

              <div className="mt-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e: any) =>
                    handleImageChange(e.target.files?.[0] ?? null)
                  }
                />
              </div>
            </div>
          </div>
        </div>
          
         <div className="grid grid-cols-2 gap-3">
              {/* <div>
                <label className="block text-sm font-medium mb-1">Phone No 1</label>
                 <input
                  type="number"
                  value={form.phone_1}
                  onChange={(e) => setForm({ ...form, phone_1: Number(e.target.value) })}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone No 2</label>
                 <input
                  type="number"
                  value={form.phone_2}
                  onChange={(e) => setForm({ ...form, phone_2: Number(e.target.value) })}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div> */}

              <div>
  <label className="block text-sm font-medium mb-1">Phone No 1</label>
  <input
    type="tel"
    inputMode="numeric"
    pattern="[0-9]*"
    value={form.phone_1}
    onChange={(e) =>
      setForm({
        ...form,
        phone_1: e.target.value.replace(/\D/g, ""),
      })
    }
    className="w-full px-3 py-2 border rounded-md"
  />
</div>

<div>
  <label className="block text-sm font-medium mb-1">Phone No 2</label>
  <input
    type="tel"
    inputMode="numeric"
    pattern="[0-9]*"
    value={form.phone_2}
    onChange={(e) =>
      setForm({
        ...form,
        phone_2: e.target.value.replace(/\D/g, ""),
      })
    }
    className="w-full px-3 py-2 border rounded-md"
  />
</div>

               <div>
                <label className="block text-sm font-medium mb-1">Website</label>
                <input
                  value={form.website}
                  onChange={e =>
                    setForm({ ...form, website: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
            </div>

        {/* CITY & AREA */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">City</label>
            <select
              value={form.city_id}
              onChange={(e) =>
                setForm({ ...form, city_id: e.target.value, area_id: "" })
              }
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
              onChange={(e) =>
                setForm({ ...form, area_id: e.target.value })
              }
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

        {/* MULTI SELECTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MultiSelect
            label="Specializations"
            options={specializations}
            selected={form.specializations}
            onChange={(vals) =>
              setForm({ ...form, specializations: vals })
            }
          />

          <MultiSelect
            label="Services"
            options={services}
            selected={form.services}
            onChange={(vals) => setForm({ ...form, services: vals })}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MultiSelect
            label="Procedures"
            options={procedures}
            selected={form.procedures}
            onChange={(vals) =>
              setForm({ ...form, procedures: vals })
            }
          />

          <MultiSelect
            label="Symptoms"
            options={symptoms}
            selected={form.symptoms}
            onChange={(vals) =>
              setForm({ ...form, symptoms: vals })
            }
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">About</label>
          <ReactQuill
            key={form.id || "new"}
            value={form.about || ""}
            onChange={(val) => setForm({ ...form, about: val })}
            modules={quillModules}
            formats={quillFormats}
          />
        </div>

        {/* SEO */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              SEO Title
            </label>
            <input
              value={form.seo_title}
              onChange={(e) =>
                setForm({ ...form, seo_title: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              SEO Keywords
            </label>
            <input
              value={form.seo_keywords}
              onChange={(e) =>
                setForm({ ...form, seo_keywords: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            SEO Description
          </label>
          <textarea
            value={form.seo_description}
            onChange={(e) =>
              setForm({ ...form, seo_description: e.target.value })
            }
            className="w-full px-3 py-2 border rounded-md"
            rows={3}
          />
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex justify-end gap-3 pt-2">
          <button className="px-4 py-2 border rounded" onClick={onClose}>
            Cancel
          </button>

          <button
            className="px-4 py-2 bg-green-600 text-white rounded"
            onClick={handleSubmit}
          >
            {mode === "add" ? "Save" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HospitalForm;
