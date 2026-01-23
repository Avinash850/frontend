import React, { useEffect, useMemo, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import MultiSelect from "./MultiSelect";
import { doctorService } from "../services/doctorsService";
import { quillModules, quillFormats } from "@/editor/quillConfig";

type Props = {
  mode: "add" | "edit";
  initialData?: any;
  onClose: () => void;
  onSaved?: (savedItem?: any) => void;
};

type DoctorFormState = {
  id: number | null;
  name: string;
  degree: string;
  designation: string;
  experience_years: number | "";
  consultation_fee: number | "";
  phone_1: string;
  phone_2: string;
  registration_number: string;
  email: string;
  rating: string;
  short_description: string;
  address: string;
  description: string;
  seo_title: string;
  seo_keywords: string;
  seo_description: string;
  json_schema: string;
  imageFile: File | null;
  imagePreview: string;

  gender: string;
  patients_count: number | "";
  is_profile_claimed: boolean;
  is_on_call: boolean;

  specializations: number[];
  clinics: number[];
  hospitals: number[];
  procedures: number[];
  services: number[];
  symptoms: number[];
  city_id: string | number;
  area_id: string | number;
  doctor_college: string;
  pass_year: number | "";
  doctor_council: string;
  doctor_council_year: number | "";
};

const emptyForm: DoctorFormState = {
  id: null,
  name: "",
  degree: "",
  designation: "",
  experience_years: "",
  consultation_fee: "",
  phone_1: "",
  phone_2: "",
  registration_number: "",
  email: "",
  rating: "",
  short_description: "",
  address: "",
  description: "",
  seo_title: "",
  seo_keywords: "",
  seo_description: "",
  json_schema: "",
  imageFile: null,
  imagePreview: "",

  gender: "male",
  patients_count: "",
  is_profile_claimed: false,
  is_on_call: false,

  specializations: [],
  clinics: [],
  hospitals: [],
  procedures: [],
  services: [],
  symptoms: [],
  city_id: "",
  area_id: "",
  doctor_college: "",
  pass_year: "",
  doctor_council: "",
  doctor_council_year: "",
};

const DoctorForm: React.FC<Props> = ({ mode, initialData, onClose, onSaved }) => {
  const [form, setForm] = useState<DoctorFormState>(emptyForm);
  const [loadingMasters, setLoadingMasters] = useState(false);

  const [specializations, setSpecializations] = useState<any[]>([]);
  const [clinics, setClinics] = useState<any[]>([]);
  const [hospitals, setHospitals] = useState<any[]>([]);
  const [procedures, setProcedures] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [symptoms, setSymptoms] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [areas, setAreas] = useState<any[]>([]);

  const filteredAreas = useMemo(() => {
    if (!form.city_id) return areas;
    return areas.filter((a) => String(a.city_id) === String(form.city_id));
  }, [areas, form.city_id]);

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setForm((f) => ({
        ...f,
        id: initialData.id ?? null,
        name: initialData.name ?? "",
        degree: initialData.degree ?? "",
        designation: initialData.designation ?? "",

        experience_years:
          initialData.experience_years === null ||
          initialData.experience_years === undefined
            ? ""
            : Number(initialData.experience_years),

        consultation_fee: initialData.consultation_fee === null ||  initialData.consultation_fee === undefined ? "" : Number(initialData.consultation_fee),

        patients_count:
          initialData.patients_count === null ||
          initialData.patients_count === undefined
            ? ""
            : Number(initialData.patients_count),

        rating: initialData.rating === null || initialData.rating === undefined
            ? ""
            : String(Number(initialData.rating).toFixed(1)).replace(/\.0$/, ""),


        phone_1: initialData.phone_1 ?? "",
        phone_2: initialData.phone_2 ?? "",
        registration_number: initialData.registration_number ?? "",
        email: initialData.email ?? "",
        short_description: initialData.short_description ?? "",
        address: initialData.address ?? "",
        description:
          typeof initialData.description === "string"
            ? initialData.description
            : "",

        seo_title: initialData.seo_title ?? "",
        seo_keywords: initialData.seo_keywords ?? "",
        seo_description: initialData.seo_description ?? "",
        json_schema: initialData.json_schema ?? "",

        imageFile: null,
        imagePreview: initialData.image_url ?? "",

        gender: initialData.gender ?? "male",
        is_profile_claimed: !!initialData.is_profile_claimed,
        is_on_call: !!initialData.is_on_call,

        specializations: Array.isArray(initialData.specializations)
          ? initialData.specializations.map((s: any) =>
              typeof s === "object" ? s.id : s
            )
          : [],

        clinics: Array.isArray(initialData.clinics)
          ? initialData.clinics.map((c: any) =>
              typeof c === "object" ? c.id : c
            )
          : [],

        hospitals: Array.isArray(initialData.hospitals)
          ? initialData.hospitals.map((h: any) =>
              typeof h === "object" ? h.id : h
            )
          : [],

        procedures: Array.isArray(initialData.procedures)
          ? initialData.procedures.map((p: any) =>
              typeof p === "object" ? p.id : p
            )
          : [],

        services: Array.isArray(initialData.services)
          ? initialData.services.map((s: any) =>
              typeof s === "object" ? s.id : s
            )
          : [],

        symptoms: Array.isArray(initialData.symptoms)
          ? initialData.symptoms.map((s: any) =>
              typeof s === "object" ? s.id : s
            )
          : [],

        city_id: initialData.city_id ?? "",
        area_id: initialData.area_id ?? "",
        doctor_college: initialData.doctor_college ?? "",
        // pass_year: initialData.pass_year ?? "",
        doctor_council: initialData.doctor_council ?? "",
        // doctor_council_year: initialData.doctor_council_year ?? "",
         pass_year: initialData.pass_year === null ||  initialData.pass_year === undefined ? "" : Number(initialData.pass_year),
         doctor_council_year: initialData.doctor_council_year === null ||  initialData.doctor_council_year === undefined ? "" : Number(initialData.doctor_council_year),
      }));
    }
  }, [initialData, mode]);

  useEffect(() => {
    const loadMasters = async () => {
      try {
        setLoadingMasters(true);
        const [spRes, clRes, hRes, pRes, sRes, syRes, cityRes, areaRes] =
          await Promise.all([
            fetch(
              `${import.meta.env.VITE_API_BASE_URL}/api/masters/specializations`
            ).then((r) => r.json()),
            fetch(
              `${import.meta.env.VITE_API_BASE_URL}/api/masters/clinics`
            ).then((r) => r.json()),
            fetch(
              `${import.meta.env.VITE_API_BASE_URL}/api/masters/hospitals`
            ).then((r) => r.json()),
            fetch(
              `${import.meta.env.VITE_API_BASE_URL}/api/masters/procedures`
            ).then((r) => r.json()),
            fetch(
              `${import.meta.env.VITE_API_BASE_URL}/api/masters/services`
            ).then((r) => r.json()),
            fetch(
              `${import.meta.env.VITE_API_BASE_URL}/api/masters/symptoms`
            ).then((r) => r.json()),
            fetch(
              `${import.meta.env.VITE_API_BASE_URL}/api/masters/cities`
            ).then((r) => r.json()),
            fetch(
              `${import.meta.env.VITE_API_BASE_URL}/api/masters/areas`
            ).then((r) => r.json()),
          ]);

        setSpecializations(Array.isArray(spRes) ? spRes : []);
        setClinics(Array.isArray(clRes) ? clRes : []);
        setHospitals(Array.isArray(hRes) ? hRes : []);
        setProcedures(Array.isArray(pRes) ? pRes : []);
        setServices(Array.isArray(sRes) ? sRes : []);
        setSymptoms(Array.isArray(syRes) ? syRes : []);
        setCities(Array.isArray(cityRes) ? cityRes : []);
        setAreas(Array.isArray(areaRes) ? areaRes : []);
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
      degree: form.degree,
      experience_years: form.experience_years === "" ? 0 : form.experience_years,
      consultation_fee:
        form.consultation_fee === "" ? 0 : form.consultation_fee,
      phone_1: form.phone_1,
      phone_2: form.phone_2,
      registration_number: form.registration_number,
      email: form.email,
      rating: form.rating === "" ? null : form.rating,
      designation: form.designation,
      short_description: form.short_description,
      address: form.address,
      description: form.description,
      seo_title: form.seo_title,
      seo_keywords: form.seo_keywords,
      seo_description: form.seo_description,
      json_schema: form.json_schema,

      gender: form.gender,
      patients_count: form.patients_count === "" ? 0 : form.patients_count,
      is_profile_claimed: form.is_profile_claimed,
      is_on_call: form.is_on_call,

      city_id: form.city_id || null,
      area_id: form.area_id || null,
      specializations: form.specializations,
      clinics: form.clinics,
      hospitals: form.hospitals,
      procedures: form.procedures,
      services: form.services,
      symptoms: form.symptoms,
      doctor_college: form.doctor_college,
      pass_year: form.pass_year,
      doctor_council: form.doctor_council,
      doctor_council_year: form.doctor_council_year,
    };

    if (mode === "add") {
      await doctorService.createDoctor(payload, form.imageFile);
    } else {
      await doctorService.updateDoctor(form.id, payload, form.imageFile);
    }

    onSaved?.({});
    onClose();
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
                <label className="block text-sm font-medium mb-1">Degree</label>
                <input
                  value={form.degree}
                  onChange={(e) => setForm({ ...form, degree: e.target.value })}
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
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">Experience Years</label>
                 <input
                    type="number"
                    min={0}
                    value={form.experience_years}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        experience_years: e.target.value === "" ? "" : Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 border rounded-md"
                  />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Registration Number</label>
                <input
                  value={form.registration_number}
                  onChange={(e) => setForm({ ...form, registration_number: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              {/* <div>
                <label className="block text-sm font-medium mb-1">Rating</label>
                <input
                    type="number"
                    min={0}
                    max={5}
                    step={0.1}
                    value={form.rating}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === "") {
                        setForm({ ...form, rating: "" });
                        return;
                      }
                      const num = Number(val);
                      if (num >= 0 && num <= 5) {
                        setForm({ ...form, rating: num });
                      }
                    }}
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Enter 1 to 5 value"
                  />

              </div> */}

               <div>
                <label className="block text-sm font-medium mb-1">
                  Rating
                </label>
                <select
                  value={form.rating}
                  onChange={e => setForm({ ...form, rating: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  {[0,0.5,1,1.5,2,2.5,3,3.5,4,4.5,5].map(v => (
                    <option key={v} value={String(v)}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>
               <div>
                <label className="block text-sm font-medium mb-1">Consultation Fee</label>
                <input
                    type="number"
                    min={0}
                    value={form.consultation_fee}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        consultation_fee: e.target.value === "" ? "" : Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 border rounded-md"
                  />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">Phone No 1</label>
                 <input
                  value={form.phone_1}
                  onChange={(e) => setForm({ ...form, phone_1: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone No 2</label>
                 <input
                  value={form.phone_2}
                  onChange={(e) => setForm({ ...form, phone_2: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
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

            {/* ✅ NEW FIELDS – EXACTLY BELOW SHORT DESCRIPTION */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">Gender</label>
                <select
                  value={form.gender}
                  onChange={(e) => setForm({ ...form, gender: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Patients Count</label>
                <input
                    type="number"
                    min={0}
                    value={form.patients_count}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        patients_count: e.target.value === "" ? "" : Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 border rounded-md"
                  />
              </div>

              <div className="flex items-center gap-2 mt-6">
                <input
                  type="checkbox"
                  checked={form.is_profile_claimed}
                  onChange={(e) => setForm({ ...form, is_profile_claimed: e.target.checked })}
                />
                <label className="text-sm">Profile Claimed</label>
              </div>

              <div className="flex items-center gap-2 mt-6">
                <input
                  type="checkbox"
                  checked={form.is_on_call}
                  onChange={(e) => setForm({ ...form, is_on_call: e.target.checked })}
                />
                <label className="text-sm">On Call</label>
              </div>
            </div>
          </div>

          {/* IMAGE COLUMN – UNCHANGED */}
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

        {/* EVERYTHING BELOW IS 100% ORIGINAL – UNCHANGED */}
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
          <ReactQuill
            key={form.id || "new"}
            value={form.description || ""}
            onChange={(val) => setForm({ ...form, description: val })}
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
        
         {/* DOctor & Education */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Doctor College</label>
            <input
              value={form.doctor_college}
              onChange={(e) => setForm({ ...form, doctor_college: e.target.value })}
              className="w-full px-3 py-2 border rounded-md" placeholder="Doctor College"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Doctor Passing year</label>
            <input
                    type="number"
                    min={0}
                    value={form.pass_year}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        pass_year: e.target.value === "" ? "" : Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 border rounded-md"
                  />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Doctor Council</label>
            <input
              value={form.doctor_council}
              onChange={(e) => setForm({ ...form, doctor_council: e.target.value })}
              className="w-full px-3 py-2 border rounded-md" placeholder="Doctor Council"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Doctor Council year</label>
             <input
                    type="number"
                    min={0}
                    value={form.doctor_council_year}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        doctor_council_year: e.target.value === "" ? "" : Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 border rounded-md"
                  />
          </div>
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
