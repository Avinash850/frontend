import React, { useState } from "react";
import { FaStar, FaPhone } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import defaultImage from "../assets/images/default_icon.png";

const ClinicProfileTabs = ({ clinic }) => {
  const { city } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [expanded, setExpanded] = useState(false);

  if (!clinic) return null;

  const doctors = clinic.doctors || [];
  const services = clinic.services || [];
  const citySlug = city || "delhi";

  const tabs = [
    { key: "overview", title: "Overview" },
    { key: "doctors", title: `Doctors (${doctors.length})` },
    { key: "stories", title: `Stories (${clinic.patients_stories || 0})` },
    { key: "services", title: "Services" },
    { key: "questions", title: "Questions" },
  ];

  const aboutText = clinic.about || clinic.short_description || "";
  const MAX_LEN = 220;
  const showText = expanded ? aboutText : aboutText.slice(0, MAX_LEN);

  return (
    <div className="bg-white border border-gray-200 rounded-2xl">
      {/* TABS */}
      <div className="flex border-b border-gray-200 px-6 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-3 text-sm font-semibold border-b-2 ${
              activeTab === tab.key
                ? "text-blue-600 border-blue-600"
                : "text-gray-600 border-transparent hover:text-blue-500"
            }`}
          >
            {tab.title}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div className="p-6 text-sm text-gray-700">
        {/* ================= OVERVIEW (PRACTO STYLE) ================= */}
        {activeTab === "overview" && (
          <>
            {/* ABOUT */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                About {clinic.name}
              </h3>

              <p className="leading-relaxed">
                {showText}
                {aboutText.length > MAX_LEN && !expanded && "..."}
              </p>

              {aboutText.length > MAX_LEN && (
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="text-blue-600 text-sm mt-1"
                >
                  {expanded ? "Read less" : "Read more"}
                </button>
              )}
            </div>

            {/* BOTTOM GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              {/* TIMINGS */}
              <div>
                <h4 className="font-semibold mb-2">Timings</h4>
                <p>{clinic.timing || "Not available"}</p>
              </div>

              {/* SERVICES (2 COLS) */}
              <div>
                <h4 className="font-semibold mb-2">Services</h4>
                <ul className="grid grid-cols-2 gap-y-1">
                  {services.slice(0, 8).map((s) => (
                    <li key={s.id}>{s.name}</li>
                  ))}
                </ul>

                {services.length > 8 && (
                  <button className="text-blue-600 text-sm mt-2">
                    View all ({services.length})
                  </button>
                )}
              </div>

              {/* PHOTOS (FUTURE READY) */}
              <div>
                <h4 className="font-semibold mb-2">Photos</h4>
                <p className="text-gray-400">No photos available</p>
              </div>
            </div>
          </>
        )}

        {/* ================= DOCTORS ================= */}
        {activeTab === "doctors" && (
          <div>
            <h2 className="text-lg font-semibold mb-4">
              Doctors in {clinic.name}
            </h2>

            <div className="space-y-6">
              {doctors.length > 0 ? (
                doctors.map((doctor) => (
                  <div
                    key={doctor.id}
                    className="border border-gray-200 rounded-xl p-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                      {/* LEFT */}
                      <div className="md:col-span-7 flex gap-4">
                        <img
                          src={doctor.image_url || defaultImage}
                          alt={doctor.name}
                          className="w-24 h-24 object-cover rounded border"
                        />

                        <div>
                          <h3
                            className="text-blue-600 font-semibold text-lg cursor-pointer hover:underline"
                            onClick={() =>
                              navigate(`/${citySlug}/doctor/${doctor.slug}`)
                            }
                          >
                            {doctor.name}
                          </h3>

                          {doctor.degree && (
                            <p className="text-sm">{doctor.degree}</p>
                          )}

                          {doctor.experience_years && (
                            <p className="text-sm text-gray-600">
                              {doctor.experience_years} years experience overall
                            </p>
                          )}

                          {doctor.designation && (
                            <p className="text-sm text-gray-600">
                              {doctor.designation}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* RIGHT */}
                      <div className="md:col-span-5 text-sm space-y-2">
                        {doctor.patients_count > 0 && (
                          <p>💬 {doctor.patients_count} Patient Stories</p>
                        )}

                        {doctor.consultation_fee && (
                          <p className="font-semibold">
                            ₹{doctor.consultation_fee}
                          </p>
                        )}

                        {doctor.timings && (
                          <p>🕒 {doctor.timings}</p>
                        )}

                        {/* ACTION BUTTONS */}
                        <div className="flex gap-3 mt-4">
                          <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-md text-sm">
                            Contact Clinic
                          </button>

                          <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm">
                            Book Clinic Visit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">
                  No doctors listed for this clinic.
                </p>
              )}
            </div>
          </div>
        )}


        {/* ================= STORIES ================= */}
        {activeTab === "stories" && (
          <p className="text-gray-500">Patient stories coming soon.</p>
        )}

        {/* ================= SERVICES ================= */}
        {activeTab === "services" && (
          <ul className="grid md:grid-cols-2 gap-3">
            {services.map((s) => (
              <li
                key={s.id}
                className="border border-gray-200 rounded-lg p-3 bg-gray-50"
              >
                {s.name}   {/* ✅ FIX */}
              </li>
            ))}
          </ul>
        )}

        {/* ================= QUESTIONS ================= */}
        {activeTab === "questions" && (
          <p className="text-gray-500">Questions coming soon.</p>
        )}
      </div>
    </div>
  );
};

export default ClinicProfileTabs;
