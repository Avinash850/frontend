import { useState } from "react";
import HospitalForm from "./HospitalForm";
import HospitalGallery from "./HospitalGallery";

const HospitalEditWrapper = ({ hospital, onClose, onSaved }: any) => {
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

      {/* Content */}
      {tab === "details" && (
        <HospitalForm
          mode="edit"
          initialData={hospital}
          onClose={onClose}
          onSaved={onSaved}
        />
      )}

      {tab === "gallery" && (
        <HospitalGallery hospitalId={hospital.id} />
      )}
    </div>
  );
};

export default HospitalEditWrapper;
