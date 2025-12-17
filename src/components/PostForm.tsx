import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { postService } from "../services/postService";
import MultiSelect from "./MultiSelect";
import { quillModules, quillFormats } from "@/editor/quillConfig";

type Props = {
  mode: "add" | "edit";
  initialData?: any;
  categories?: any[];
  onClose: () => void;
  onSaved?: () => void;
};

const emptyForm = {
  id: null as number | null,
  name: "",
  short_description: "",
  description: "",
  seo_title: "",
  seo_keywords: "",
  seo_description: "",
  json_schema: "",
  categories: [] as number[],
  imageFile: null as File | null,
  imagePreview: "",
};

const PostForm: React.FC<Props> = ({
  mode,
  initialData,
  categories = [],
  onClose,
  onSaved,
}) => {
  const [form, setForm] = useState({ ...emptyForm });

  const safe = (v: any) => (v === null || v === undefined ? "" : v);

  // EDIT PREFILL
  useEffect(() => {
    if (mode === "edit" && initialData) {
      setForm({
        ...emptyForm,
        id: initialData.id,
        name: safe(initialData.name),
        short_description: safe(initialData.short_description),
        description: safe(initialData.description),
        seo_title: safe(initialData.seo_title),
        seo_keywords: safe(initialData.seo_keywords),
        seo_description: safe(initialData.seo_description),
        json_schema: safe(initialData.json_schema),
        categories: Array.isArray(initialData.categories)
          ? initialData.categories.map((c: any) =>
              typeof c === "number" ? c : c.id
            )
          : [],
        imagePreview: safe(initialData.image_url),
      });
    }
  }, [initialData, mode]);

  const handleImageChange = (file: File | null) => {
    if (!file) {
      setForm((s) => ({ ...s, imageFile: null, imagePreview: "" }));
      return;
    }
    const url = URL.createObjectURL(file);
    setForm((s) => ({ ...s, imageFile: file, imagePreview: url }));
  };

  // AUTO SLUG (NO USER INPUT)
  const generateSlug = (name: string) =>
    name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const handleSubmit = async () => {
    if (!form.name.trim()) {
      alert("Name is required");
      return;
    }

    const fd = new FormData();

    fd.append("name", form.name);
    fd.append("slug", generateSlug(form.name)); // 🔒 AUTO SLUG
    fd.append("short_description", form.short_description);
    fd.append("description", form.description);
    fd.append("seo_title", form.seo_title);
    fd.append("seo_keywords", form.seo_keywords);
    fd.append("seo_description", form.seo_description);
    fd.append("json_schema", form.json_schema);

    // MULTI CATEGORY
    form.categories.forEach((id) =>
      fd.append("categories[]", String(id))
    );

    if (form.imageFile) {
      fd.append("image", form.imageFile);
    }

    try {
      if (mode === "add") {
        await postService.createPost(fd);
      } else {
        await postService.updatePost(form.id!, fd);
      }
      onSaved && onSaved();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to save post");
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
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            {/* MULTI CATEGORY */}
            <MultiSelect
              label="Categories"
              options={categories}
              selected={form.categories}
              onChange={(vals) =>
                setForm({ ...form, categories: vals })
              }
              placeholder="Select categories"
            />

            <div>
              <label className="block text-sm font-medium mb-1">
                Short Description
              </label>
              <textarea
                value={form.short_description}
                onChange={(e) =>
                  setForm({
                    ...form,
                    short_description: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border rounded-md"
                rows={3}
              />
            </div>

            {/* SEO FIELDS */}
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
                  setForm({
                    ...form,
                    seo_keywords: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border rounded-md"
                placeholder="keyword1, keyword2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                SEO Description
              </label>
              <textarea
                value={form.seo_description}
                onChange={(e) =>
                  setForm({
                    ...form,
                    seo_description: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border rounded-md"
                rows={2}
              />
            </div>
          </div>

          {/* IMAGE */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Image
            </label>
            <div className="border p-2 rounded">
              {form.imagePreview ? (
                <img
                  src={form.imagePreview}
                  className="w-full h-40 object-cover rounded"
                />
              ) : (
                <div className="text-gray-400 py-10 text-center">
                  No image
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                className="mt-2"
                onChange={(e) =>
                  handleImageChange(
                    e.target.files?.[0] ?? null
                  )
                }
              />
            </div>
          </div>
        </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <ReactQuill
              key={form.id ?? "new"}
              value={form.description || ""}
              onChange={(val) => setForm({ ...form, description: val })}
              modules={quillModules}
              formats={quillFormats}
            />
          </div>

        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 border rounded-md"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-600 text-white rounded-md"
          >
            {mode === "add" ? "Create" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostForm;
