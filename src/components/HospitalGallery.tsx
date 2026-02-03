import { useEffect, useState } from "react";
import { hospitalService } from "../services/hospitalService";

type Props = {
  hospitalId: number;
};

const MIN_IMAGES = 1;
const MAX_IMAGES = 10;
const MAX_SIZE_MB = 5;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

const HospitalGallery: React.FC<Props> = ({ hospitalId }) => {
  const [existingImages, setExistingImages] = useState<any[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // load existing images
  useEffect(() => {
    loadImages();
  }, [hospitalId]);

  const loadImages = async () => {
    try {
      const data = await hospitalService.getHospitalImages(hospitalId);
      setExistingImages(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load gallery", err);
    }
  };

  // previews for new files
  useEffect(() => {
    const urls = files.map((f) => URL.createObjectURL(f));
    setPreviews(urls);

    return () => urls.forEach((u) => URL.revokeObjectURL(u));
  }, [files]);

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    if (!selected.length) return;

    const invalid = selected.find((f) => f.size > MAX_SIZE_BYTES);
    if (invalid) {
      alert(`Each image must be less than ${MAX_SIZE_MB} MB`);
      return;
    }

    if (existingImages.length + files.length + selected.length > MAX_IMAGES) {
      alert(`Maximum ${MAX_IMAGES} images allowed`);
      return;
    }

    setFiles((prev) => [...prev, ...selected]);
  };

  const removeNew = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const deleteExisting = async (imageId: number) => {
    const ok = window.confirm("Delete this image?");
    if (!ok) return;

    try {
      await hospitalService.deleteHospitalImage(imageId);
      loadImages();
    } catch (err) {
      alert("Failed to delete image");
    }
  };

  const handleUpload = async () => {
    if (files.length < MIN_IMAGES) {
      alert(`Select at least ${MIN_IMAGES} image`);
      return;
    }

    try {
      setLoading(true);
      await hospitalService.uploadHospitalImages(hospitalId, files);
      setFiles([]);
      loadImages();
    } catch (err) {
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Hospital Gallery</h3>
      <p className="text-sm text-gray-500">
        Upload 1–10 images (max 5 MB each)
      </p>

      {/* Upload */}
      <label className="inline-block px-4 py-2 bg-blue-600 text-white rounded cursor-pointer mr-4">
        + Select Images
        <input
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={handleSelect}
        />
      </label>

      {/* Existing images */}
      {existingImages.length > 0 && (
        <div>
          <p className="text-sm font-medium mb-2">Uploaded Images</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {existingImages.map((img) => (
              <div key={img.id} className="relative border rounded">
                <img src={img.image_url} className="h-24 w-full object-cover" />
                <button
                  onClick={() => deleteExisting(img.id)}
                  className="absolute top-1 right-1 bg-black/70 text-white text-xs px-2 py-1 rounded"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* New previews */}
      {previews.length > 0 && (
        <div>
          <p className="text-sm font-medium mb-2">New Images</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {previews.map((src, i) => (
              <div key={i} className="relative border rounded">
                <img src={src} className="h-24 w-full object-cover" />
                <button
                  onClick={() => removeNew(i)}
                  className="absolute top-1 right-1 bg-black/70 text-white text-xs px-2 py-1 rounded"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload button */}
      <button
        disabled={loading || files.length === 0}
        onClick={handleUpload}
        className={`px-4 py-2 rounded text-white ${
          loading
            ? "bg-gray-400"
            : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {loading ? "Uploading..." : "Upload Images"}
      </button>
    </div>
  );
};

export default HospitalGallery;
