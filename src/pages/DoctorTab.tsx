import React, { useContext, useState } from "react";
import { FaStar, FaPhone } from "react-icons/fa";
import { DoctorContext } from "../context/DoctorContextProvider";
import defaultImage from "../assets/images/default_icon.png";

const DoctorProfileTabs = () => {
  const { profileData } = useContext(DoctorContext);
  const [activeTab, setActiveTab] = useState("info");

  if (!profileData) return null;

  const clinics = profileData.clinics || [];
  const hospitals = profileData.hospitals || [];

  const renderPracticeCard = (item, type) => {
    const timing = item.timings || item.timing || "Timing not available";
    const fee = item.consultation_fee
      ? `₹ ${item.consultation_fee}`
      : "Fee not available";
    const address = item.practice_address || item.address;

    return (
      <div
        key={`${type}-${item.id}`}
        className="flex gap-4 border border-gray-200 rounded-xl p-4 mb-4"
      >
        {/* Image */}
        <div className="w-24 h-24 flex-shrink-0">
          <img
            src={item.image_url || defaultImage}
            alt={item.name}
            className="w-full h-full object-cover rounded-lg border"
            onError={(e) => (e.currentTarget.src = defaultImage)}
          />
        </div>

        {/* Content */}
        <div className="flex-1">
          <h4 className="text-blue-600 font-semibold text-lg">
            {item.name}
          </h4>

          {/* Rating */}
          {item.rating && (
            <div className="flex items-center text-sm mt-1 text-green-700 font-medium">
              {item.rating} <FaStar className="ml-1" />
            </div>
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

          {/* Address */}
          {address && (
            <p className="text-sm text-gray-600 mt-2">
              {address}
            </p>
          )}

          {/* Description */}
          {(item.short_description || item.about) && (
            <p className="text-sm text-gray-500 mt-2 line-clamp-2">
              {item.short_description || item.about}
            </p>
          )}
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
        {profileData?.tabs?.map((tab) => (
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
            {clinics.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Clinics</h3>
                {clinics.map((c) => renderPracticeCard(c, "clinic"))}
              </div>
            )}

            {hospitals.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Hospitals</h3>
                {hospitals.map((h) => renderPracticeCard(h, "hospital"))}
              </div>
            )}

            {clinics.length === 0 && hospitals.length === 0 && (
              <p className="text-gray-500 text-sm">
                No practice locations available.
              </p>
            )}
          </div>
        )}

        {activeTab !== "info" && (
          <div className="text-gray-500 text-sm">
            Content coming soon.
          </div>
        )}

         {/* Stories Tab */}
        {activeTab === "stories" && (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-50 p-3 rounded-lg border border-gray-100"
              >
                <p className="font-semibold text-gray-800">
                  "Very caring and attentive doctor!"
                </p>
                <p className="text-sm text-gray-600">— Patient {i + 1}</p>
              </div>
            ))}
          </div>
        )}

        {/* Consult Q&A Tab */}
        {activeTab === "consult" && (
          <div className="space-y-3">
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-50 p-3 rounded-lg border border-gray-100"
              >
                <p className="font-medium text-gray-800">
                  Q: What’s the best treatment for acne scars?
                </p>
                <p className="text-sm text-gray-600">
                  A: Doctor recommends mild chemical peel and sunscreen usage.
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Healthfeed Tab */}
        {activeTab === "healthfeed" && (
          <div className="space-y-3">
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-50 p-3 rounded-lg border border-gray-100"
              >
                <p className="font-semibold text-gray-800">
                  Tips for Healthy Skin
                </p>
                <p className="text-sm text-gray-700">
                  Stay hydrated, eat fruits, and avoid harsh soaps on your skin.
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
