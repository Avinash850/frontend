import React, { useEffect, useMemo, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import MultiSelect from "./MultiSelect";
import { clinicService } from "../services/clinicService";

type Props = {
  mode: "add" | "edit";
  initialData?: any;
  onClose: () => void;
  onSaved?: () => void;
};

const emptyForm = {
  id: null as number | null,
  name: "",
  slug: "",
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

  specializations: [] as number[],
  services: [] as number[],
  procedures: [] as number[],
  symptoms: [] as number[],
  doctors: [] as number[],
};

const safe = (v: any) => (v === null || v === undefined ? "" : v);

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

  // PREFILL (EDIT)
  useEffect(() => {
    if (mode === "edit" && initialData) {
      setForm({
        ...emptyForm,
        id: initialData.id,
        name: safe(initialData.name),
        slug: safe(initialData.slug),
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

        specializations: initialData.specializations || [],
        services: initialData.services || [],
        procedures: initialData.procedures || [],
        symptoms: initialData.symptoms || [],
        doctors: initialData.doctors || [],
      });
    }
  }, [initialData, mode]);

  // LOAD MASTERS
  useEffect(() => {
    const load = async () => {
      const [
        sp, se, pr, sy, dr, ct, ar
      ] = await Promise.all([
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
    setForm(s => ({ ...s, imageFile: file, imagePreview: URL.createObjectURL(file) }));
  };

  const csv = (arr: number[]) => arr.join(",");

  const handleSubmit = async () => {
    const payload = new FormData();

    Object.entries(form).forEach(([k, v]: any) => {
      if (Array.isArray(v)) payload.append(k, csv(v));
      else if (v !== null) payload.append(k, String(v));
    });

    if (form.imageFile) payload.append("image", form.imageFile);

    if (mode === "add") await clinicService.createClinic(payload);
    else await clinicService.updateClinic(form.id!, payload);

    onSaved?.();
    onClose();
  };

  return (
    <div className="max-h-[80vh] overflow-y-auto space-y-4">
      {/* BASIC */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 space-y-3">
          <input placeholder="Name" value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            className="w-full border p-2 rounded" />

          <div className="grid grid-cols-2 gap-3">
            <input placeholder="Slug" value={form.slug}
              onChange={e => setForm({ ...form, slug: e.target.value })}
              className="border p-2 rounded" />
            <input placeholder="Timing" value={form.timing}
              onChange={e => setForm({ ...form, timing: e.target.value })}
              className="border p-2 rounded" />
          </div>

          <textarea placeholder="Short Description"
            value={form.short_description}
            onChange={e => setForm({ ...form, short_description: e.target.value })}
            className="border p-2 rounded" />
        </div>

        {/* IMAGE */}
        <div>
          {form.imagePreview && <img src={form.imagePreview} className="h-40 w-full object-cover rounded" />}
          <input type="file" onChange={e => handleImageChange(e.target.files?.[0] || null)} />
        </div>
      </div>

      {/* CONTACT */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <input placeholder="Phone 1" value={form.phone_1} onChange={e => setForm({ ...form, phone_1: e.target.value })} className="border p-2 rounded" />
        <input placeholder="Phone 2" value={form.phone_2} onChange={e => setForm({ ...form, phone_2: e.target.value })} className="border p-2 rounded" />
        <input placeholder="Website" value={form.website} onChange={e => setForm({ ...form, website: e.target.value })} className="border p-2 rounded" />
      </div>

      <textarea placeholder="Address" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} className="border p-2 rounded" />

      {/* LOCATION */}
      <div className="grid grid-cols-2 gap-4">
        <select value={form.city_id} onChange={e => setForm({ ...form, city_id: e.target.value, area_id: "" })} className="border p-2 rounded">
          <option value="">City</option>
          {cities.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>

        <select value={form.area_id} onChange={e => setForm({ ...form, area_id: e.target.value })} className="border p-2 rounded">
          <option value="">Area</option>
          {filteredAreas.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
        </select>
      </div>

      {/* MULTI SELECTS – SAME AS HOSPITAL */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MultiSelect label="Specializations" options={specializations} selected={form.specializations} onChange={v => setForm({ ...form, specializations: v })} />
        <MultiSelect label="Services" options={services} selected={form.services} onChange={v => setForm({ ...form, services: v })} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MultiSelect label="Procedures" options={procedures} selected={form.procedures} onChange={v => setForm({ ...form, procedures: v })} />
        <MultiSelect label="Symptoms" options={symptoms} selected={form.symptoms} onChange={v => setForm({ ...form, symptoms: v })} />
      </div>

      <MultiSelect label="Doctors" options={doctors} selected={form.doctors} onChange={v => setForm({ ...form, doctors: v })} />

      {/* ABOUT */}
      <ReactQuill value={form.about} onChange={v => setForm({ ...form, about: v })} />

      {/* SEO */}
      <input placeholder="SEO Title" value={form.seo_title} onChange={e => setForm({ ...form, seo_title: e.target.value })} className="border p-2 rounded" />
      <input placeholder="SEO Keywords" value={form.seo_keywords} onChange={e => setForm({ ...form, seo_keywords: e.target.value })} className="border p-2 rounded" />
      <textarea placeholder="SEO Description" value={form.seo_description} onChange={e => setForm({ ...form, seo_description: e.target.value })} className="border p-2 rounded" />

      <textarea placeholder="JSON Schema" value={form.json_schema} onChange={e => setForm({ ...form, json_schema: e.target.value })} className="border p-2 rounded" />

      {/* ACTIONS */}
      <div className="flex justify-end gap-3">
        <button onClick={onClose} className="border px-4 py-2 rounded">Cancel</button>
        <button onClick={handleSubmit} className="bg-green-600 text-white px-4 py-2 rounded">
          {mode === "add" ? "Save" : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default ClinicForm;
