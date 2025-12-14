
import React, { useContext, useEffect, useState } from "react";
import { FaStar, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

import { HeroSearch } from "../components/HeroSearch";
import defaultImage from "../assets/images/default_icon.png"
import { getDoctorDetails } from "../services/doctorsService";
import { DoctorContext } from "../context/DoctorContextProvider";

const HospitalProfile = () => {
    const { hospitalData, setHospitalData } = useContext(DoctorContext);
    const [loading, setLoading] = useState(false);
     const [filterView, setFilterView] = useState(null);


  console.log("Hospital Data---->", hospitalData)

  useEffect(() => {
  const fetchDoctorFromUrl = async () => {
    const hash = window.location.hash;
    const parts = hash.replace(/^#\/?/, "").split("/");

    const type = parts[0]; // doctor
    const doctorId = parts[1];

    if (!doctorId || type !== "hospital") return;

    // If already loaded correctly, skip
    if (hospitalData && String(hospitalData.id) === doctorId) return;

    try {
      setLoading(true);

      const payload = {
        id: doctorId,
        type: "hospital",
      };

      const res = await getDoctorDetails(payload);

      const hospital =
        res.items[0]
        // console.log("hospital res --->", hospital)

      if (hospital) {
        setHospitalData(hospital);
      }
    } catch (error) {
      console.error("Failed to fetch doctor profile:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchDoctorFromUrl();
}, []);



  if (loading)
    return <div className="text-center text-gray-500 py-16">Loading...</div>;

  return (
  <div className="bg-gray-50 min-h-screen">
    <HeroSearch />

    <div className="max-w-5xl mx-auto my-6 px-4">
      {/* Hospital Header */}
      <div className="bg-white rounded-2xl shadow-sm border p-6 flex flex-col md:flex-row gap-6">
        {/* Image */}
        <div className="w-28 h-28 md:w-36 md:h-36 flex-shrink-0">
          <img
            src={hospitalData?.image_url || defaultImage}
            alt={hospitalData?.name}
            className="w-full h-full object-contain rounded-lg border"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = defaultImage;
            }}
          />
        </div>

        {/* Details */}
        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            {hospitalData?.name}
          </h1>

          <p className="mt-1 text-gray-600">
            Fertility Clinic {/* optional static or dynamic later */}
          </p>

          <p className="mt-2 text-sm text-gray-500">
            {hospitalData?.address}
          </p>

          {/* Rating (Optional placeholder) */}
          <div className="flex items-center gap-2 mt-3">
            <span className="flex items-center bg-green-600 text-white text-sm px-2 py-1 rounded">
              <FaStar className="mr-1" /> 4.5
            </span>
            <span className="text-sm text-gray-500">(120 Ratings)</span>
          </div>
        </div>
      </div>

      {/* Contact + Timing */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {/* Contact */}
        <div className="bg-white rounded-xl border p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Contact Information
          </h3>

          {hospitalData?.phone_1 && (
            <div className="flex items-center gap-3 text-gray-700 mb-2">
              <FaPhoneAlt className="text-blue-500" />
              <span>{hospitalData.phone_1}</span>
            </div>
          )}

          {hospitalData?.website && hospitalData.website !== "1" && (
            <div className="flex items-center gap-3 text-gray-700">
              <FaEnvelope className="text-blue-500" />
              <a
                href={hospitalData.website}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline"
              >
                Visit Website
              </a>
            </div>
          )}
        </div>

        {/* Timing */}
        <div className="bg-white rounded-xl border p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Timings
          </h3>

          <p className="text-gray-700">
            {hospitalData?.timing || "Not Available"}
          </p>
        </div>
      </div>

      {/* About Hospital */}
      <div className="bg-white rounded-xl border p-6 shadow-sm mt-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-3">
          About {hospitalData?.name}
        </h3>

        <p className="text-gray-700 leading-relaxed">
          {hospitalData?.short_description || "No description available."}
        </p>
      </div>

      {/* Future Tabs Placeholder (Like Practo) */}
      <div className="bg-white rounded-xl border p-6 shadow-sm mt-6 text-center text-gray-500">
        Doctors, Services & Facilities coming soon
      </div>
    </div>
  </div>
);

};

export default HospitalProfile;
