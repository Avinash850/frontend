import React, { useEffect, useMemo, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import MultiSelect from "./MultiSelect";
import { clinicService } from "../services/clinicService";
import { quillModules, quillFormats } from "@/editor/quillConfig";

type Props = {
  mode: "add" | "edit";
  initialData?: any;
  onClose: () => void;
  onSaved?: () => void;
};

const emptyForm = {
  id: null as number | null,
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
  json_schema: "",
  imageFile: null as File | null,
  imagePreview: "",
  city_id: "",
  area_id: "",

  /* 🔽 NEW FIELDS (ONLY ADDITION) */
  rating: "0",
  patients_count: "",
  patients_stories: "",
  payment_type: "",
  is_profile_claimed: false,

  specializations: [] as number[],
  services: [] as number[],
  procedures: [] as number[],
  symptoms: [] as number[],
  doctors: [] as number[],
};

const safe = (v: any) => (v ?? "");

const ClinicForm: React.FC<Props> = ({ mode, initialData, onClose, onSaved }) => {
  const [form, setForm] = useState({ ...emptyForm });

  const [specializations, setSpecializations] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [procedures, setProcedures] = useState<any[]>([]);
  const [symptoms, setSymptoms] = useState<any[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [areas, setAreas] = useState<any[]>([]);

  const filteredAreas = useMemo(() => {
    if (!form.city_id) return areas;
    return areas.filter(a => String(a.city_id) === String(form.city_id));
  }, [areas, form.city_id]);

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setForm({
        ...emptyForm,
        id: initialData.id,
        name: safe(initialData.name),
        timing: safe(initialData.timing),
        short_description: safe(initialData.short_description),
        about: safe(initialData.about),
        phone_1: safe(initialData.phone_1),
        phone_2: safe(initialData.phone_2),
        website: safe(initialData.website),
        address: safe(initialData.address),
        seo_title: safe(initialData.seo_title),
        seo_keywords: safe(initialData.seo_keywords),
        seo_description: safe(initialData.seo_description),
        json_schema: safe(initialData.json_schema),
        imagePreview: safe(initialData.image_url),
        city_id: safe(initialData.city_id),
        area_id: safe(initialData.area_id),

        /* 🔽 NEW PREFILL */
        rating: String(initialData.rating ?? "0"),
        patients_count: safe(initialData.patients_count),
        patients_stories: safe(initialData.patients_stories),
        payment_type: safe(initialData.payment_type),
        is_profile_claimed: Boolean(Number(initialData.is_profile_claimed)),

        specializations: Array.isArray(initialData.specializations)
          ? initialData.specializations.map((s: any) =>
              typeof s === "object" ? s.id : s
            )
          : [],
        services: Array.isArray(initialData.services)
          ? initialData.services.map((s: any) =>
              typeof s === "object" ? s.id : s
            )
          : [],
        procedures: Array.isArray(initialData.procedures)
          ? initialData.procedures.map((p: any) =>
              typeof p === "object" ? p.id : p
            )
          : [],
        symptoms: Array.isArray(initialData.symptoms)
          ? initialData.symptoms.map((s: any) =>
              typeof s === "object" ? s.id : s
            )
          : [],
        doctors: Array.isArray(initialData.doctors)
          ? initialData.doctors.map((d: any) =>
              typeof d === "object" ? d.id : d
            )
          : [],
      });
    }
  }, [initialData, mode]);

  useEffect(() => {
    const load = async () => {
      const [sp, se, pr, sy, dr, ct, ar] = await Promise.all([
        clinicService.getSpecializations(),
        clinicService.getServices(),
        clinicService.getProcedures(),
        clinicService.getSymptoms(),
        clinicService.getDoctors(),
        clinicService.getCities(),
        clinicService.getAreas(),
      ]);

      setSpecializations(sp || []);
      setServices(se || []);
      setProcedures(pr || []);
      setSymptoms(sy || []);
      setDoctors(dr || []);
      setCities(ct || []);
      setAreas(ar || []);
    };
    load();
  }, []);

  const handleImageChange = (file: File | null) => {
    if (!file) {
      setForm(s => ({ ...s, imageFile: null, imagePreview: "" }));
      return;
    }
    setForm(s => ({
      ...s,
      imageFile: file,
      imagePreview: URL.createObjectURL(file),
    }));
  };

  const handleSubmit = async () => {
    const payload = new FormData();

    payload.append("name", form.name);
    payload.append("timing", form.timing);
    payload.append("short_description", form.short_description);
    payload.append("about", form.about);
    payload.append("phone_1", form.phone_1);
    payload.append("phone_2", form.phone_2);
    payload.append("website", form.website);
    payload.append("address", form.address);
    payload.append("seo_title", form.seo_title);
    payload.append("seo_keywords", form.seo_keywords);
    payload.append("seo_description", form.seo_description);
    payload.append("json_schema", form.json_schema);

    /* 🔽 NEW PAYLOAD */
    payload.append("rating", form.rating);
    payload.append("patients_count", String(form.patients_count || 0));
    payload.append("patients_stories", String(form.patients_stories || 0));
    payload.append("payment_type", String(form.payment_type || 0));
    payload.append(
      "is_profile_claimed",
      form.is_profile_claimed ? "1" : "0"
    );

    if (form.city_id) payload.append("city_id", String(form.city_id));
    if (form.area_id) payload.append("area_id", String(form.area_id));

    if (form.specializations.length)
      payload.append("specializations", form.specializations.join(","));
    if (form.services.length)
      payload.append("services", form.services.join(","));
    if (form.procedures.length)
      payload.append("procedures", form.procedures.join(","));
    if (form.symptoms.length)
      payload.append("symptoms", form.symptoms.join(","));
    if (form.doctors.length)
      payload.append("doctors", form.doctors.join(","));

    if (form.imageFile) payload.append("image", form.imageFile);

    if (mode === "add") await clinicService.createClinic(payload);
    else await clinicService.updateClinic(form.id!, payload);

    onSaved?.();
    onClose();
  };

  return (
    <div className="max-h-[80vh] overflow-y-auto px-1">
      <div className="space-y-4 pb-4">

        {/* BASIC */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                value={form.name}
                onChange={e =>
                  setForm({ ...form, name: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Timing
                </label>
                <input
                  value={form.timing}
                  onChange={e =>
                    setForm({ ...form, timing: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Short Description
              </label>
              <textarea
                rows={3}
                value={form.short_description}
                onChange={e =>
                  setForm({
                    ...form,
                    short_description: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            {/* 🔽 ONLY NEW UI BLOCK */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Rating
                </label>
                <select
                  value={form.rating}
                  onChange={e =>
                    setForm({ ...form, rating: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-md"
                >
                  {[0,0.5,1,1.5,2,2.5,3,3.5,4,4.5,5].map(v => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Patients Count
                </label>
                <input
                  type="number"
                  value={form.patients_count}
                  onChange={e =>
                    setForm({
                      ...form,
                      patients_count: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Patients Stories
                </label>
                <input
                  type="number"
                  value={form.patients_stories}
                  onChange={e =>
                    setForm({
                      ...form,
                      patients_stories: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Payment Type
                </label>
                <select
                  value={form.payment_type}
                  onChange={e =>
                    setForm({
                      ...form,
                      payment_type: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="">Select Payment Type</option>
                  <option value="1">Online</option>
                  <option value="2">Cash</option>
                  <option value="3">Both Accepted</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.is_profile_claimed}
                onChange={e =>
                  setForm({
                    ...form,
                    is_profile_claimed: e.target.checked,
                  })
                }
              />
              <label className="text-sm">Profile Claimed</label>
            </div>
          </div>

          {/* IMAGE */}
          <div>
            <label className="block text-sm font-medium mb-1">Image</label>
            <div className="border p-2 rounded">
              {form.imagePreview && (
                <img
                  src={form.imagePreview}
                  className="h-40 w-full object-cover rounded"
                />
              )}
              <input
                type="file"
                onChange={e =>
                  handleImageChange(
                    e.target.files?.[0] || null
                  )
                }
              />
            </div>
          </div>
        </div>

        {/* EVERYTHING BELOW IS 100% YOUR ORIGINAL CODE — UNTOUCHED */}

        {/* CONTACT */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-sm font-medium mb-1">Phone 1</label>
            <input
              value={form.phone_1}
              onChange={e =>
                setForm({ ...form, phone_1: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Phone 2</label>
            <input
              value={form.phone_2}
              onChange={e =>
                setForm({ ...form, phone_2: e.target.value })
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

        {/* LOCATION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">City</label>
            <select
              value={form.city_id}
              onChange={e =>
                setForm({
                  ...form,
                  city_id: e.target.value,
                  area_id: "",
                })
              }
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="">Select City</option>
              {cities.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Area</label>
            <select
              value={form.area_id}
              onChange={e =>
                setForm({ ...form, area_id: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="">Select Area</option>
              {filteredAreas.map(a => (
                <option key={a.id} value={a.id}>{a.name}</option>
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
            onChange={v =>
              setForm({ ...form, specializations: v })
            }
          />
          <MultiSelect
            label="Services"
            options={services}
            selected={form.services}
            onChange={v =>
              setForm({ ...form, services: v })
            }
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MultiSelect
            label="Procedures"
            options={procedures}
            selected={form.procedures}
            onChange={v =>
              setForm({ ...form, procedures: v })
            }
          />
          <MultiSelect
            label="Symptoms"
            options={symptoms}
            selected={form.symptoms}
            onChange={v =>
              setForm({ ...form, symptoms: v })
            }
          />
        </div>

        <MultiSelect
          label="Doctors"
          options={doctors}
          selected={form.doctors}
          onChange={v =>
            setForm({ ...form, doctors: v })
          }
        />

        {/* ABOUT */}
        <div>
          <label className="block text-sm font-medium mb-1">About</label>
          <ReactQuill
            value={form.about || ""}
            onChange={v =>
              setForm({ ...form, about: v })
            }
            modules={quillModules}
            formats={quillFormats}
          />
        </div>

        {/* SEO & JSON */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">SEO Title</label>
            <input
              value={form.seo_title}
              onChange={e =>
                setForm({ ...form, seo_title: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">SEO Keywords</label>
            <input
              value={form.seo_keywords}
              onChange={e =>
                setForm({ ...form, seo_keywords: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">SEO Description</label>
          <textarea
            rows={3}
            value={form.seo_description}
            onChange={e =>
              setForm({ ...form, seo_description: e.target.value })
            }
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">JSON Schema</label>
          <textarea
            rows={4}
            value={form.json_schema}
            onChange={e =>
              setForm({ ...form, json_schema: e.target.value })
            }
            className="w-full px-3 py-2 border rounded-md font-mono text-sm"
          />
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md border"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-md bg-green-600 text-white"
          >
            {mode === "add" ? "Save" : "Save Changes"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default ClinicForm;
