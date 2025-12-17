import React, { useContext, useState } from "react";
import { FaStar, FaPhone } from "react-icons/fa";
import { DoctorContext } from "../context/DoctorContextProvider";
import defaultImage from "../assets/images/default_icon.png";

const HospitalProfileTabs = () => {
  const { hospitalData } = useContext(DoctorContext);
  const [activeTab, setActiveTab] = useState("info");

  if (!hospitalData) return null;

  const doctors = hospitalData.doctors || [];

  const renderDoctorCard = (doctor) => {
    const timing = doctor.timings || "Timing not available";
    const fee = doctor.consultation_fee
      ? `₹ ${doctor.consultation_fee}`
      : "Fee not available";

    return (
      <div
        key={doctor.id}
        className="flex gap-4 border border-gray-200 rounded-xl p-4 mb-4"
      >
        {/* Image */}
        <div className="w-24 h-24 flex-shrink-0">
          <img
            src={doctor.image_url || defaultImage}
            alt={doctor.name}
            className="w-full h-full object-cover rounded-full border"
            onError={(e) => (e.currentTarget.src = defaultImage)}
          />
        </div>

        {/* Content */}
        <div className="flex-1">
          <h4 className="text-blue-600 font-semibold text-lg">
            {doctor.name}
          </h4>

          {doctor.specialization_name && (
            <p className="text-sm text-indigo-600">
              {doctor.specialization_name}
            </p>
          )}

          {doctor.degree && (
            <p className="text-sm text-gray-500">
              {doctor.degree}
            </p>
          )}

          {/* Rating */}
          {doctor.rating && (
            <div className="flex items-center text-sm mt-1 text-green-700 font-medium">
              {doctor.rating} <FaStar className="ml-1" />
            </div>
          )}

          {/* Experience */}
          {doctor.experience_years && (
            <p className="text-sm text-gray-600 mt-1">
              {doctor.experience_years}+ years experience
            </p>
          )}

          {/* Timing & Fee */}
          <div className="text-sm text-gray-700 mt-2 space-y-1">
            <p>
              <span className="font-medium">Timing:</span> {timing}
            </p>
            <p>
              <span className="font-medium">Fee:</span> {fee}
            </p>
          </div>
        </div>

        {/* Action */}
        <div className="flex items-end">
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
            <FaPhone /> Call
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-5">
      {/* Tabs Header */}
      <div className="flex border-b border-gray-200 mb-4 overflow-x-auto">
        {hospitalData?.tabs?.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 text-sm font-semibold whitespace-nowrap border-b-2 ${
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
      <div className="p-2">
        {activeTab === "info" && (
          <div className="space-y-6">
            {doctors.length > 0 ? (
              doctors.map((d) => renderDoctorCard(d))
            ) : (
              <p className="text-gray-500 text-sm">
                No doctors available in this hospital.
              </p>
            )}
          </div>
        )}

        {activeTab !== "info" && (
          <div className="text-gray-500 text-sm">
            Content coming soon.
          </div>
        )}

        {/* Dummy tabs kept safe for future */}
        {activeTab === "stories" && (
          <div className="text-gray-500 text-sm">
            Stories coming soon.
          </div>
        )}

        {activeTab === "consult" && (
          <div className="text-gray-500 text-sm">
            Consult Q&A coming soon.
          </div>
        )}

        {activeTab === "healthfeed" && (
          <div className="text-gray-500 text-sm">
            Healthfeed coming soon.
          </div>
        )}
      </div>
    </div>
  );
};

export default HospitalProfileTabs;
