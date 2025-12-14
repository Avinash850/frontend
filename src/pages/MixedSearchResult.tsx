

import React, { useContext, useEffect, useState } from "react";
import {
  FaStar,
  FaPhoneAlt,
  FaHospital,
  FaClinicMedical,
  FaUserMd,
} from "react-icons/fa";
import defaultImage from "../assets/images/default_icon.png";
import { DoctorContext } from "../context/DoctorContextProvider";
import { getDoctorDetails } from "../services/doctorsService";
import { HeroSearch } from "../components/HeroSearch";

const MixedSearchResults = () => {
    const {mixedData, setMixedData} = useContext(DoctorContext)
      const [loading, setLoading] = useState(false);

/* ---------------- Fetch clinic on refresh ---------------- */
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
          location
        });

        const clinic =res.related

        if (clinic) {
          setMixedData(clinic);
        }
      } catch (error) {
        console.error("Failed to fetch clinic profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClinicFromUrl();
  }, []);

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
      <div className="max-w-5xl mx-auto my-6 px-4">

      {/* ================= DOCTORS ================= */}
      {mixedData?.doctor?.map((doc) => (
        <div key={`doctor-${doc.id}`} className="flex gap-6 p-6">
          {/* Image */}
          <img
            src={doc.image_url || defaultImage}
            alt={doc.name}
            className="w-24 h-24 rounded-full object-cover border"
          />

          {/* Info */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-blue-600">
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

            <button className="text-blue-600 text-sm mt-3 hover:underline">
              View Profile
            </button>
          </div>

          {/* CTA */}
          <div className="flex flex-col justify-center gap-2">
            <button className="bg-blue-600 text-white px-5 py-2 rounded text-sm">
              Book Clinic Visit
            </button>
            <button className="border px-5 py-2 rounded text-sm text-blue-600">
              Contact Clinic
            </button>
          </div>
        </div>
      ))}

      {/* ================= HOSPITALS ================= */}
      {mixedData?.hospital?.map((hos) => (
        <div key={`hospital-${hos.id}`} className="flex gap-6 p-6">
          <img
            src={hos.image_url || defaultImage}
            alt={hos.name}
            className="w-24 h-24 rounded-lg object-cover border"
          />

          <div className="flex-1">
            <h3 className="text-lg font-semibold text-blue-600">
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

            <button className="text-blue-600 text-sm mt-3 hover:underline">
              View Hospital
            </button>
          </div>

          <div className="flex flex-col justify-center">
            <button className="bg-blue-600 text-white px-5 py-2 rounded text-sm">
              View Details
            </button>
          </div>
        </div>
      ))}

      {/* ================= CLINICS ================= */}
      {mixedData?.clinic?.map((clinic) => (
        <div key={`clinic-${clinic.id}`} className="flex gap-6 p-6">
          <img
            src={clinic.image_url || defaultImage}
            alt={clinic.name}
            className="w-24 h-24 rounded-lg object-cover border"
          />

          <div className="flex-1">
            <h3 className="text-lg font-semibold text-blue-600">
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

            <button className="text-blue-600 text-sm mt-3 hover:underline">
              View Clinic
            </button>
          </div>

          <div className="flex flex-col justify-center">
            <button className="bg-blue-600 text-white px-5 py-2 rounded text-sm">
              Book Clinic Visit
            </button>
          </div>
        </div>
      ))}
        </div>

    </div>
  );
};

export default MixedSearchResults;
