import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import defaultImage from "../assets/images/default_icon.png";
import { useNavigate } from "react-router-dom";

const DoctorProfileTabs = ({ doctor }) => {
  const [activeTab, setActiveTab] = useState("info");
  const navigate = useNavigate();

  if (!doctor) return null;

  const clinics = doctor.clinics || [];
  const hospitals = doctor.hospitals || [];

  const practices = [
    ...clinics.map((c) => ({ ...c, type: "clinic" })),
    ...hospitals.map((h) => ({ ...h, type: "hospital" })),
  ];

  const citySlug = (doctor.city_name || "")
    .toLowerCase()
    .replace(/\s+/g, "-");

  const specialization = doctor.specialization_name || "medical care";
  const doctorName = doctor.name;
  const city = doctor.city_name || "your city";

  const stories = [
    `Dr. ${doctorName} explained my condition clearly and made me feel comfortable throughout the consultation.`,
    `I visited Dr. ${doctorName} for ${specialization.toLowerCase()} treatment. The diagnosis was accurate and effective.`,
    `Very professional and patient-friendly doctor. Highly recommended for ${specialization.toLowerCase()} in ${city}.`,
  ];

  const questions = [
    {
      q: `What is the common treatment for ${specialization.toLowerCase()} issues?`,
      a: `Dr. ${doctorName} usually recommends treatment based on patient history, lifestyle, and severity of symptoms.`,
    },
    {
      q: `When should I consult a ${specialization.toLowerCase()} specialist?`,
      a: `If symptoms persist or affect daily life, it is advisable to consult a specialist like Dr. ${doctorName}.`,
    },
  ];

  const healthfeed = [
    `Tips to maintain good ${specialization.toLowerCase()} health`,
    `When to seek medical help for ${specialization.toLowerCase()} problems`,
    `Lifestyle changes recommended by ${specialization.toLowerCase()} specialists`,
  ];

  /* =========================
     PRACTICE CARD (RESPONSIVE)
     ========================= */
  const PracticeCard = ({ item }) => {
    const goToProfile = () => {
      if (!item.slug || !item.type) return;
      navigate(`/${citySlug}/${item.type}/${item.slug}`);
    };

    return (
      <div className="border rounded-xl p-4 mb-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Image */}
          <img
            src={item.image_url || defaultImage}
            onClick={goToProfile}
            className="w-20 h-20 rounded-lg border object-cover cursor-pointer mx-auto sm:mx-0"
          />

          {/* Info */}
          <div className="flex-1 text-center sm:text-left">
            <h4
              onClick={goToProfile}
              className="text-blue-600 font-semibold cursor-pointer hover:underline"
            >
              {item.name}
            </h4>

            {item.rating && (
              <div className="flex justify-center sm:justify-start items-center text-green-600 text-sm mt-1">
                {item.rating} <FaStar className="ml-1" />
              </div>
            )}

            <p className="text-sm mt-2 text-gray-700">
              <b>Timing:</b> {item.timing || "Available on appointment"}
            </p>

            <p className="text-sm text-gray-700">
              <b>Fee:</b> ₹{item.consultation_fee || "N/A"}
            </p>

            <p className="text-sm text-gray-600 mt-1">
              {item.address || item.practice_address}
            </p>
          </div>

          {/* CTA */}
          <div className="flex sm:items-end">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm w-full sm:w-auto">
              Book Appointment
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow border">
      {/* Tabs (Scrollable on mobile) */}
      <div className="flex border-b overflow-x-auto whitespace-nowrap">
        {["info", "stories", "consult", "healthfeed"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-3 font-semibold text-sm border-b-2 flex-shrink-0 ${
              activeTab === tab
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-600"
            }`}
          >
            {tab === "info" && "Info"}
            {tab === "stories" && `Stories (${stories.length})`}
            {tab === "consult" && "Consult Q&A"}
            {tab === "healthfeed" && "Healthfeed"}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5">
        {activeTab === "info" &&
          practices.map((p, i) => <PracticeCard key={i} item={p} />)}

        {activeTab === "stories" && (
          <div className="space-y-4">
            {stories.map((s, i) => (
              <div key={i} className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium text-gray-800">"{s}"</p>
                <p className="text-sm text-gray-500 mt-1">
                  — Verified Patient
                </p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "consult" && (
          <div className="space-y-4">
            {questions.map((q, i) => (
              <div key={i} className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold">Q: {q.q}</p>
                <p className="text-sm text-gray-700 mt-1">A: {q.a}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "healthfeed" && (
          <div className="space-y-3">
            {healthfeed.map((h, i) => (
              <div key={i} className="bg-gray-50 p-3 rounded-lg">
                <p className="font-semibold text-gray-800">{h}</p>
                <p className="text-sm text-gray-600 mt-1">
                  Curated by medical experts
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorProfileTabs;
