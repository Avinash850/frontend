import React, { useContext, useEffect, useState } from "react";
import { FaStar, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
// import { Helmet } from "react-helmet-async";

import { HeroSearch } from "../components/HeroSearch";
import defaultImage from "../assets/images/default_icon.png";
import { getDoctorDetails } from "../services/doctorsService";
import { DoctorContext } from "../context/DoctorContextProvider";

const ClinicProfile = () => {
  const { clinicData, setClinicData } = useContext(DoctorContext);

  const [loading, setLoading] = useState(false);
  const [clinicDoctors, setClinicDoctors] = useState([]);

  /* ---------------- Fetch clinic on refresh ---------------- */
  useEffect(() => {
    const fetchClinicFromUrl = async () => {
      const hash = window.location.hash;
      const parts = hash.replace(/^#\/?/, "").split("/");

      const type = parts[0];
      const clinicId = parts[1];

      if (!clinicId || type !== "clinic") return;

      if (clinicData && String(clinicData.id) === clinicId) return;

      try {
        setLoading(true);

        const res = await getDoctorDetails({
          id: clinicId,
          type: "clinic",
        });

        const clinic =
          res?.data ||
          res?.items?.[0] ||
          null;

        if (clinic) {
          setClinicData(clinic);
        }
      } catch (error) {
        console.error("Failed to fetch clinic profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClinicFromUrl();
  }, []);

  /* ---------------- Fetch doctors in clinic ---------------- */
  useEffect(() => {
    if (!clinicData?.id) return;

    const fetchClinicDoctors = async () => {
      try {
        const res = await getDoctorDetails({
          type: "doctor",
          clinic_id: clinicData.id,
        });

        setClinicDoctors(res?.items || []);
      } catch (err) {
        console.error("Failed to fetch clinic doctors:", err);
      }
    };

    fetchClinicDoctors();
  }, [clinicData]);

  if (loading) {
    return (
      <div className="text-center text-gray-500 py-16">
        Loading clinic details...
      </div>
    );
  }

  if (!clinicData) return null;

  return (
    <div className="bg-gray-50 min-h-screen">
      <>
        <title>{clinicData.seo_title || clinicData.name}</title>
        <meta
          name="description"
          content={clinicData.seo_description || clinicData.short_description}
        />
        <meta
          name="keywords"
          content={clinicData.seo_keywords || ""}
        />
      </>

      <HeroSearch />

      <div className="max-w-5xl mx-auto my-6 px-4">
        {/* ================= Header ================= */}
        <div className="bg-white rounded-2xl shadow-sm border p-6 flex flex-col md:flex-row gap-6">
          <div className="w-28 h-28 md:w-36 md:h-36 flex-shrink-0">
            <img
              src={clinicData.image_url || defaultImage}
              alt={clinicData.name}
              className="w-full h-full object-contain rounded-lg border"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = defaultImage;
              }}
            />
          </div>

          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              {clinicData.name}
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              {clinicData.address}
            </p>

            <div className="flex items-center gap-2 mt-3">
              <span className="flex items-center bg-green-600 text-white text-sm px-2 py-1 rounded">
                <FaStar className="mr-1" /> 4.4
              </span>
              <span className="text-sm text-gray-500">(Clinic Ratings)</span>
            </div>
          </div>
        </div>

        {/* ================= Contact & Timing ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="bg-white rounded-xl border p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Contact Information
            </h3>

            {clinicData.phone_1 && (
              <div className="flex items-center gap-3 text-gray-700 mb-2">
                <FaPhoneAlt className="text-blue-500" />
                <span>{clinicData.phone_1}</span>
              </div>
            )}

            {clinicData.phone_2 && (
              <div className="flex items-center gap-3 text-gray-700 mb-2">
                <FaPhoneAlt className="text-blue-500" />
                <span>{clinicData.phone_2}</span>
              </div>
            )}

            {clinicData.website && (
              <div className="flex items-center gap-3 text-gray-700">
                <FaEnvelope className="text-blue-500" />
                <a
                  href={`https://${clinicData.website}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Visit Website
                </a>
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl border p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Timings
            </h3>
            <p className="text-gray-700">
              {clinicData.timing || "Not Available"}
            </p>
          </div>
        </div>

        {/* ================= About Clinic ================= */}
        <div className="bg-white rounded-xl border p-6 shadow-sm mt-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            About {clinicData.name}
          </h3>

          {clinicData.about ? (
            <div
              className="prose max-w-none text-gray-700"
              dangerouslySetInnerHTML={{ __html: clinicData.about }}
            />
          ) : (
            <p className="text-gray-700">
              {clinicData.short_description || "No description available."}
            </p>
          )}
        </div>

        {/* ================= Doctors ================= */}
        {clinicDoctors.length > 0 && (
          <div className="bg-white rounded-xl border p-6 shadow-sm mt-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Doctors at this Clinic
            </h3>

            <ul className="divide-y">
              {clinicDoctors.map((doc) => (
                <li
                  key={doc.id}
                  className="py-4 flex items-center justify-between"
                >
                  <div>
                    <p className="font-semibold text-gray-800">
                      {doc.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {doc.specialization_name}
                    </p>
                  </div>

                  <span className="text-blue-600 text-sm font-medium">
                    View Profile
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClinicProfile;
