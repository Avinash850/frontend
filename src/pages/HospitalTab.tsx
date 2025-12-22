import React, { useState } from "react";
import { FaStar, FaPhone } from "react-icons/fa";
import defaultImage from "../assets/images/default_icon.png";
import { useNavigate } from "react-router-dom";


const HospitalProfileTabs = ({ hospital }) => {
  const [activeTab, setActiveTab] = useState("overview");

  const navigate = useNavigate();

  const citySlug = (hospital.city_name || "")
    .toLowerCase()
    .replace(/\s+/g, "-");


  if (!hospital) return null;

  const doctors = hospital.doctors || [];

  const tabs = [
    { key: "overview", title: "Overview" },
    { key: "doctors", title: `Doctors (${doctors.length})` },
    { key: "stories", title: "Stories" },
    { key: "services", title: "Services" },
    { key: "questions", title: "Questions" },
  ];

  /* ===================== STATIC (SAFE, PRACTO-LIKE) ===================== */

  const stories = [
    {
      id: 1,
      title: "Very professional and clean hospital",
      content:
        "The hospital staff was very cooperative and the facilities were well maintained. Doctors explained everything clearly.",
      author: "Verified Patient",
      date: "2 months ago",
      rating: 5,
    },
    {
      id: 2,
      title: "Good experience overall",
      content:
        "Consultation and admission process was smooth. Waiting time was reasonable and staff was supportive.",
      author: "Verified Patient",
      date: "5 months ago",
      rating: 4.5,
    },
  ];

  const questions = [
    {
      id: 1,
      q: "Does this hospital provide emergency services?",
      a: "Yes, emergency services are available. Availability may vary by department.",
    },
    {
      id: 2,
      q: "Are cashless insurance facilities available?",
      a: "Most major insurance providers are accepted. Please confirm with the hospital directly.",
    },
    {
      id: 3,
      q: "What are the visiting hours?",
      a: "Visiting hours depend on department and patient condition.",
    },
  ];

  const services = hospital.services || [
    "Emergency Care",
    "Diagnostic Services",
    "Outpatient Consultation",
    "Inpatient Care",
    "Surgical Procedures",
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
        </div>

        <div className="flex items-end">
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
            <FaPhone /> Call
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200">
      {/* ===================== TABS ===================== */}
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

      {/* ===================== CONTENT ===================== */}
      <div className="p-5">
        {/* OVERVIEW */}
        {activeTab === "overview" && (
          <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-700">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                About {hospital.name}
              </h3>
              <p className="leading-relaxed">
                {hospital.description ||
                  hospital.short_description ||
                  `${hospital.name} is a trusted healthcare provider offering quality medical services.`}
              </p>

              {hospital.address && (
                <>
                  <h4 className="font-semibold mt-4">Address</h4>
                  <p>{hospital.address}</p>
                </>
              )}
            </div>

            <div>
              {hospital.timings && (
                <>
                  <h4 className="font-semibold">Timings</h4>
                  <p className="text-green-600">{hospital.timings}</p>
                </>
              )}

              {hospital.beds && (
                <p className="mt-2">
                  <strong>Number of Beds:</strong> {hospital.beds}
                </p>
              )}

              {hospital.ambulances && (
                <p>
                  <strong>Ambulances:</strong> {hospital.ambulances}
                </p>
              )}
            </div>
          </div>
        )}

        {/* DOCTORS */}
        {activeTab === "doctors" && (
          <>
            {doctors.length > 0 ? (
              doctors.map(renderDoctorCard)
            ) : (
              <p className="text-gray-500 text-sm">
                No doctors listed for this hospital.
              </p>
            )}
          </>
        )}

        {/* STORIES */}
        {activeTab === "stories" && (
          <div className="space-y-4">
            {stories.map((s) => (
              <div
                key={s.id}
                className="border border-gray-200 rounded-xl p-4 bg-gray-50"
              >
                <div className="flex items-center text-green-600 text-sm font-semibold">
                  ⭐ {s.rating}
                </div>
                <h4 className="font-semibold mt-1">{s.title}</h4>
                <p className="text-sm text-gray-700 mt-2">{s.content}</p>
                <p className="text-xs text-gray-500 mt-2">
                  — {s.author}, {s.date}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* SERVICES */}
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

        {/* QUESTIONS */}
        {activeTab === "questions" && (
          <div className="space-y-4">
            {questions.map((q) => (
              <div
                key={q.id}
                className="border border-gray-200 rounded-xl p-4"
              >
                <p className="font-medium">Q. {q.q}</p>
                <p className="text-sm text-gray-700 mt-1">A. {q.a}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HospitalProfileTabs;
