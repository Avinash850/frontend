import React, { useState } from "react";
import { FaStar, FaPhone } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import defaultImage from "../assets/images/default_icon.png";

const ClinicProfileTabs = ({ clinic }) => {
  const { city } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  if (!clinic) return null;

  const doctors = clinic.doctors || [];
  const services = clinic.services || [];
  const citySlug = city || "delhi";

  /* ===================== PRACTO-LIKE TABS ===================== */
  const tabs = [
    { key: "overview", title: "Overview" },
    { key: "doctors", title: `Doctors (${doctors.length})` },
    { key: "stories", title: "Stories" },
    { key: "services", title: "Services" },
    { key: "questions", title: "Questions" },
  ];

  /* ===================== DOCTOR CARD ===================== */

  const renderDoctorCard = (doctor) => {
    const goToDoctorProfile = () => {
      if (!doctor.slug) return;
      navigate(`/${citySlug}/doctor/${doctor.slug}`);
    };

    return (
      <div
        key={doctor.id}
        className="flex gap-4 border border-gray-200 rounded-xl p-4 mb-4"
      >
        {/* IMAGE (clickable) */}
        <div className="w-20 h-20 flex-shrink-0">
          <img
            src={doctor.image_url || defaultImage}
            alt={doctor.name}
            className="w-full h-full object-cover rounded-full border cursor-pointer"
            onClick={goToDoctorProfile}
            onError={(e) => (e.currentTarget.src = defaultImage)}
          />
        </div>

        {/* CONTENT */}
        <div className="flex-1">
          {/* NAME (clickable) */}
          <h4
            className="text-blue-600 font-semibold text-lg cursor-pointer hover:underline"
            onClick={goToDoctorProfile}
          >
            {doctor.name}
          </h4>

          {doctor.specialization_name && (
            <p className="text-sm text-indigo-600">
              {doctor.specialization_name}
            </p>
          )}

          {doctor.experience_years && (
            <p className="text-sm text-gray-600 mt-1">
              {doctor.experience_years}+ years experience
            </p>
          )}

          {doctor.rating && (
            <div className="flex items-center text-sm mt-1 text-green-700 font-medium">
              {doctor.rating} <FaStar className="ml-1" />
            </div>
          )}

          <p className="text-sm text-gray-700 mt-2">
            Consultation Fee:{" "}
            {doctor.consultation_fee
              ? `₹ ${doctor.consultation_fee}`
              : "Not available"}
          </p>
        </div>

        {/* ACTION */}
        <div className="flex items-end">
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
            <FaPhone /> Call
          </button>
        </div>
      </div>
    );
  };

  /* ===================== UI ===================== */
  return (
    <div className="bg-white border border-gray-200 rounded-2xl">
      {/* Tabs Header */}
      <div className="flex border-b border-gray-200 px-4 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-3 text-sm font-semibold border-b-2 whitespace-nowrap ${
              activeTab === tab.key
                ? "text-blue-600 border-blue-600"
                : "text-gray-600 border-transparent hover:text-blue-500"
            }`}
          >
            {tab.title}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-5">
        {/* ===================== OVERVIEW ===================== */}
        {activeTab === "overview" && (
          <div className="grid md:grid-cols-3 gap-6 text-sm text-gray-700">
            {/* LEFT */}
            <div className="md:col-span-2">
              <h3 className="font-semibold text-gray-900 mb-2">
                About {clinic.name}
              </h3>

              <p className="leading-relaxed">
                {clinic.description ||
                  `${clinic.name} is a trusted clinic providing quality healthcare services.`}
              </p>

              {clinic.address && (
                <div className="mt-4">
                  <h4 className="font-semibold">Address</h4>
                  <p>{clinic.address}</p>
                </div>
              )}

              {clinic.timings && (
                <div className="mt-4">
                  <h4 className="font-semibold">Timings</h4>
                  <p className="text-green-600">{clinic.timings}</p>
                </div>
              )}
            </div>

            {/* RIGHT */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Services
              </h4>
              <ul className="space-y-2">
                {services.slice(0, 6).map((s, i) => (
                  <li
                    key={i}
                    className="border border-gray-200 rounded-lg p-2 bg-gray-50"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* ===================== DOCTORS ===================== */}
        {activeTab === "doctors" && (
          <>
            {doctors.length > 0 ? (
              doctors.map(renderDoctorCard)
            ) : (
              <p className="text-gray-500 text-sm">
                No doctors listed for this clinic.
              </p>
            )}
          </>
        )}

        {/* ===================== STORIES ===================== */}
        {activeTab === "stories" && (
          <p className="text-gray-500 text-sm">
            Patient stories coming soon.
          </p>
        )}

        {/* ===================== SERVICES ===================== */}
        {activeTab === "services" && (
          <ul className="grid md:grid-cols-2 gap-3 text-sm text-gray-700">
            {services.map((s, i) => (
              <li
                key={i}
                className="border border-gray-200 rounded-lg p-3 bg-gray-50"
              >
                {s}
              </li>
            ))}
          </ul>
        )}

        {/* ===================== QUESTIONS ===================== */}
        {activeTab === "questions" && (
          <p className="text-gray-500 text-sm">
            Questions & answers coming soon.
          </p>
        )}
      </div>
    </div>
  );
};

export default ClinicProfileTabs;
