import { useEffect, useState } from "react";
import { clinicService } from "../services/clinicService";

const MIN_IMAGES = 1;
const MAX_IMAGES = 10;
const MAX_SIZE_MB = 5;

const ClinicGallery = ({ clinicId }: { clinicId: number }) => {
  const [existingImages, setExistingImages] = useState<any[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadImages();
  }, [clinicId]);

  const loadImages = async () => {
    try {
      const data = await clinicService.getClinicImages(clinicId);
      setExistingImages(Array.isArray(data) ? data : []);
    } catch {
      setExistingImages([]);
    }
  };

  useEffect(() => {
    const urls = files.map((f) => URL.createObjectURL(f));
    setPreviews(urls);
    return () => urls.forEach(URL.revokeObjectURL);
  }, [files]);

  const handleSelect = (e: any) => {
    const selected = Array.from(e.target.files || []);

    if (existingImages.length + selected.length > MAX_IMAGES) {
      alert(`Max ${MAX_IMAGES} images allowed`);
      return;
    }

    const invalid = selected.find(
      (f: File) => f.size > MAX_SIZE_MB * 1024 * 1024
    );
    if (invalid) {
      alert(`Each image must be under ${MAX_SIZE_MB} MB`);
      return;
    }

    setFiles((p) => [...p, ...selected]);
  };

  const removeNew = (i: number) =>
    setFiles((p) => p.filter((_, x) => x !== i));

  const deleteExisting = async (id: number) => {
    if (!confirm("Delete this image?")) return;
    await clinicService.deleteClinicImage(id);
    loadImages();
  };

  const uploadImages = async () => {
    if (files.length < MIN_IMAGES) {
      alert(`Select at least ${MIN_IMAGES} image`);
      return;
    }

    setLoading(true);
    await clinicService.uploadClinicImages(clinicId, files);
    setFiles([]);
    setLoading(false);
    loadImages();
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500">
        Upload 1–10 images (max 5 MB each)
      </p>

      <label className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer inline-block mr-4">
        + Select Images
        <input
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={handleSelect}
        />
      </label>

      {/* Existing */}
      {existingImages.length > 0 && (
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
          {existingImages.map((img) => (
            <div key={img.id} className="relative">
              <img
                src={img.image_url}
                className="aspect-square object-cover rounded border"
              />
              <button
                onClick={() => deleteExisting(img.id)}
                className="absolute top-1 right-1 bg-black/70 text-white text-xs px-2 rounded"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {/* New */}
      {previews.length > 0 && (
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
          {previews.map((src, i) => (
            <div key={i} className="relative">
              <img
                src={src}
                className="aspect-square object-cover rounded border"
              />
              <button
                onClick={() => removeNew(i)}
                className="absolute top-1 right-1 bg-black/70 text-white text-xs px-2 rounded"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        disabled={loading || !files.length}
        onClick={uploadImages}
        className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-40"
      >
        {loading ? "Uploading..." : "Upload Images"}
      </button>
    </div>
  );
};

export default ClinicGallery;
