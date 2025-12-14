import React, { useContext, useEffect, useState } from "react";
import { FaStar, FaPhone } from "react-icons/fa";
import { DoctorContext } from "../context/DoctorContextProvider";

// ✅ Temporary dummy data (later replace with API data)
const doctorProfileDatax = {
  id: 1,
  name: "Dr. Priya Sharma",
  specialty: "Dermatologist",
  location: "Greater Noida West, Greater Noida",
  clinic: "Opal Care Clinic",
  rating: 4.0,
  fee: 600,
  mode: "ON - CALL",
  address: "Shop Number LG-39, Mahagun Mart, Gaur City-2, Opposite 11th Avenue, Greater Noida",
  images: [
    "/img1.jpg",
    "/img2.jpg",
    "/img3.jpg",
    "/img4.jpg",
    "/img5.jpg",
  ],
  tabs: [
    {
      title: "Info",
      key: "info",
    },
    {
      title: "Stories(23)",
      key: "stories",
    },
    {
      title: "Consult Q&A",
      key: "consult",
    },
    {
      title: "Healthfeed",
      key: "healthfeed",
    },
  ],
};

const DoctorProfileTabs = () => {
  // const [doctorProfileData, setDoctorProfileData] = useState(null) 
      const {profileData, setProfileData } = useContext(DoctorContext);
  
  const [activeTab, setActiveTab] = useState("info");



  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-5">
      {/* Tabs Header */}
      <div className="flex border-b border-gray-200 mb-4 overflow-x-auto">
        {profileData?.tabs?.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 text-sm font-semibold whitespace-nowrap transition-all border-b-2 ${
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
        {/* Info Tab */}
        {activeTab === "info" && (
          <div>
            <p className="text-gray-800 font-medium mb-1">
              {profileData.location}
            </p>

            <h2 className="text-blue-600 font-semibold text-lg mb-1">
              {profileData.clinic}
            </h2>

            <div className="flex items-center flex-wrap gap-3 mb-3 text-sm">
              <div className="flex items-center bg-green-100 text-green-700 font-semibold px-2 py-1 rounded">
                {profileData.rating} <FaStar className="ml-1 text-green-600" />
              </div>
              <p className="font-bold text-gray-800">{profileData.mode}</p>
              <p className="text-gray-700">₹{profileData.fee}</p>
            </div>

            <p className="text-gray-700 mb-1">{profileData.address}</p>
            <p className="text-blue-500 font-medium mb-3 cursor-pointer">
              Get Directions
            </p>

            {/* Clinic Images */}
            <div className="flex items-center gap-2 mb-4">
              {profileData?.images?.slice(0, 4).map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt="clinic"
                  className="w-14 h-14 rounded-md object-cover border border-gray-200"
                />
              ))}
              <div className="w-14 h-14 flex items-center justify-center bg-gray-100 rounded-md text-gray-600 font-semibold border border-gray-200">
                +{profileData?.images?.length - 4}
              </div>
            </div>

            <div className="flex justify-end">
              <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium shadow-md transition-all">
                <FaPhone /> Call Now
              </button>
            </div>
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
