import { useState } from "react";
import ClinicForm from "./ClinicForm";
import ClinicGallery from "./ClinicGallery";

const ClinicEditWrapper = ({ clinic, onClose, onSaved }: any) => {
  const [tab, setTab] = useState<"details" | "gallery">("details");

  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-6 border-b mb-4">
        <button
          onClick={() => setTab("details")}
          className={`pb-2 ${
            tab === "details"
              ? "border-b-2 border-blue-600 font-medium"
              : "text-gray-500"
          }`}
        >
          Details
        </button>

        <button
          onClick={() => setTab("gallery")}
          className={`pb-2 ${
            tab === "gallery"
              ? "border-b-2 border-blue-600 font-medium"
              : "text-gray-500"
          }`}
        >
          Gallery
        </button>
      </div>

      {tab === "details" && (
        <ClinicForm
          mode="edit"
          initialData={clinic}
          onClose={onClose}
          onSaved={onSaved}
        />
      )}

      {tab === "gallery" && (
        <ClinicGallery clinicId={clinic.id} />
      )}
    </div>
  );
};

export default ClinicEditWrapper;
