import React, { useContext, useEffect, useState } from "react";
import {
  FaStar,
  FaPhoneAlt,
  FaHospital,
  FaClinicMedical,
} from "react-icons/fa";
import defaultImage from "../assets/images/default_icon.png";
import { DoctorContext } from "../context/DoctorContextProvider";
import { getDoctorDetails } from "../services/doctorsService";
import { HeroSearch } from "../components/HeroSearch";
import GetInTouch from "../components/GetInTouch"; // ✅ ADD

const MixedSearchResults = () => {
  const { mixedData, setMixedData } = useContext(DoctorContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem("mixed_once")) {
      sessionStorage.setItem("mixed_once", "1");
      window.location.reload();
    }
  }, []);

  const goToProfile = (type, id) => {
    window.location.href = `#/${type}/${id}`;
  };

  useEffect(() => {
    const fetchClinicFromUrl = async () => {
      const hash = window.location.hash;
      const parts = hash.replace(/^#\/?/, "").split("/");

      const type = parts[0];
      const clinicId = parts[1];
      const location = parts[2];

      if (!clinicId || type !== "specialization") return;

      try {
        setLoading(true);
        const res = await getDoctorDetails({
          id: clinicId,
          type: "specialization",
          location,
        });

        if (res?.related) {
          setMixedData(res.related);
        }
      } catch (error) {
        console.error("Failed to fetch mixed search results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClinicFromUrl();
  }, [window.location.hash]);

  if (loading) {
    return (
      <div className="text-center text-gray-500 py-16">
        Loading details...
      </div>
    );
  }

  if (!mixedData) return null;

  return (
    <div className="bg-gray-50 min-h-screen">
      <HeroSearch />

      {/* ===== MAIN LAYOUT (70 / 30) ===== */}
      <div className="max-w-7xl mx-auto my-6 px-4 grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* ================= LEFT CONTENT ================= */}
        <div className="lg:col-span-8">

          {/* ================= DOCTORS ================= */}
          {mixedData?.doctor?.map((doc) => (
            <div
              key={`doctor-${doc.id}`}
              className="flex gap-6 p-6 bg-white rounded-xl shadow-sm mb-4"
            >
              <img
                src={doc.image_url?.trim() ? doc.image_url : defaultImage}
                alt={doc.name}
                onClick={() => goToProfile("doctor", doc.id)}
                className="w-24 h-24 rounded-full object-cover border cursor-pointer"
              />

              <div className="flex-1">
                <h3
                  onClick={() => goToProfile("doctor", doc.id)}
                  className="text-lg font-semibold text-blue-600 cursor-pointer hover:underline"
                >
                  {doc.name}
                </h3>

                <p className="text-sm text-gray-600">
                  {doc.short_description || "Doctor"}
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  {doc.experience_years
                    ? `${doc.experience_years} years experience`
                    : "Experienced Doctor"}
                </p>

                <p className="text-sm text-gray-600 mt-1">
                  ₹{doc.consultation_fee || "0"} Consultation fee
                </p>

                <div className="flex items-center gap-3 mt-2">
                  <span className="flex items-center bg-green-600 text-white text-xs px-2 py-1 rounded">
                    <FaStar className="mr-1" />
                    {doc.rating || "0"}
                  </span>
                  <span className="text-xs text-gray-500">
                    Patient Stories
                  </span>
                </div>

                <button
                  onClick={() => goToProfile("doctor", doc.id)}
                  className="text-blue-600 text-sm mt-3 hover:underline"
                >
                  View Profile
                </button>
              </div>
              
            </div>
          ))}

          {/* ================= HOSPITALS ================= */}
          {mixedData?.hospital?.map((hos) => (
            <div
              key={`hospital-${hos.id}`}
              className="flex gap-6 p-6 bg-white rounded-xl shadow-sm mb-4"
            >
              <img
                src={hos.image_url?.trim() ? hos.image_url : defaultImage}
                alt={hos.name}
                onClick={() => goToProfile("hospital", hos.id)}
                className="w-24 h-24 rounded-lg object-cover border cursor-pointer"
              />

              <div className="flex-1">
                <h3
                  onClick={() => goToProfile("hospital", hos.id)}
                  className="text-lg font-semibold text-blue-600 cursor-pointer hover:underline"
                >
                  {hos.name}
                </h3>

                <p className="text-sm text-gray-600 mt-1">
                  <FaHospital className="inline mr-1" />
                  Hospital
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  {hos.address || "Location not available"}
                </p>

                <p className="text-sm text-gray-600 mt-1">
                  Timings: {hos.timing}
                </p>

                <button
                  onClick={() => goToProfile("hospital", hos.id)}
                  className="text-blue-600 text-sm mt-3 hover:underline"
                >
                  View Hospital
                </button>
              </div>
            </div>
          ))}

          {/* ================= CLINICS ================= */}
          {mixedData?.clinic?.map((clinic) => (
            <div
              key={`clinic-${clinic.id}`}
              className="flex gap-6 p-6 bg-white rounded-xl shadow-sm mb-4"
            >
              <img
                src={clinic.image_url?.trim() ? clinic.image_url : defaultImage}
                alt={clinic.name}
                onClick={() => goToProfile("clinic", clinic.id)}
                className="w-24 h-24 rounded-lg object-cover border cursor-pointer"
              />

              <div className="flex-1">
                <h3
                  onClick={() => goToProfile("clinic", clinic.id)}
                  className="text-lg font-semibold text-blue-600 cursor-pointer hover:underline"
                >
                  {clinic.name}
                </h3>

                <p className="text-sm text-gray-600 mt-1">
                  <FaClinicMedical className="inline mr-1" />
                  Clinic
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  {clinic.address}
                </p>

                <p className="text-sm text-gray-600 mt-1">
                  Timings: {clinic.timing}
                </p>

                <div className="flex items-center gap-3 mt-2">
                  <FaPhoneAlt className="text-blue-500" />
                  <span className="text-sm text-gray-700">
                    {clinic.phone_1}
                  </span>
                </div>

                <button
                  onClick={() => goToProfile("clinic", clinic.id)}
                  className="text-blue-600 text-sm mt-3 hover:underline"
                >
                  View Clinic
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ================= RIGHT SIDEBAR ================= */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 z-10">
            <GetInTouch variant="compact" />
          </div>
        </div>

      </div>
    </div>
  );
};

export default MixedSearchResults;
