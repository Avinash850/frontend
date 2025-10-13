import React, { useContext } from "react";
import { FaStar, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { DoctorContext } from "../context/DoctorContextProvider";
import { HeroSearch } from "../components/HeroSearch";

const DoctorProfile = () => {
  const { profileData } = useContext(DoctorContext);

  console.log("profileData===>0", profileData)

  return (
    <div className="max-w-4xl mx-auto my-10 p-6 bg-white rounded-2xl shadow-lg border border-gray-200">

        <HeroSearch/>
        {
            profileData?.name ? <>
             <div className="flex flex-col md:flex-row gap-6 mt-16">
        {/* Profile Image */}
        <div className="flex-shrink-0">
          <img
            // src={profileData.profile_image || "/images/default_doctor.jpg"}
            alt={profileData.name}
            className="w-40 h-40 md:w-48 md:h-48 object-cover rounded-full border-2 border-indigo-500"
          />
        </div>

        {/* Doctor Info */}
        <div className="flex-1">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            {profileData.name}
          </h2>
          <p className="text-indigo-600 font-semibold mt-1">
            {profileData.specialization_name} | {profileData.degree}
          </p>

          <div className="flex items-center mt-3 gap-4">
            <span className="text-gray-600">
              <strong>Experience:</strong> {profileData.experience_years} yrs
            </span>
            <span className="flex items-center text-yellow-500 gap-1">
              <FaStar /> {profileData.rating || "0.0"}
            </span>
          </div>

          <div className="mt-4 text-gray-700">
            <p className="mb-2">
              <strong>Registration No:</strong> {profileData.registration_number}
            </p>
            <p className="mb-2">
              <strong>Location:</strong> {profileData.address}, {profileData.city_name}
            </p>
            <p className="mb-2">
              <strong>Consultation Fee:</strong> ₹{profileData.consultation_fee || "0"}
            </p>
          </div>

          {/* Contact Info */}
          <div className="mt-4 flex flex-col sm:flex-row sm:gap-6 text-gray-700">
            <a
              href={`tel:${profileData.phone_1}`}
              className="flex items-center gap-2 hover:text-indigo-600 transition"
            >
              <FaPhoneAlt /> {profileData.phone_1}
            </a>
            {profileData.phone_2 && (
              <a
                href={`tel:${profileData.phone_2}`}
                className="flex items-center gap-2 hover:text-indigo-600 transition"
              >
                <FaPhoneAlt /> {profileData.phone_2}
              </a>
            )}
            <a
              href={`mailto:${profileData.email}`}
              className="flex items-center gap-2 hover:text-indigo-600 transition"
            >
              <FaEnvelope /> {profileData.email}
            </a>
          </div>

          {/* About Section */}
          {profileData.about && (
            <div className="mt-6 text-gray-700">
              <h3 className="font-semibold text-lg mb-2">About</h3>
              <p>{profileData.about}</p>
            </div>
          )}
        </div>
      </div>
            </>:<>
             <div className="text-center py-16 text-gray-500">
        Select a doctor to view profile details
      </div>
            </>
        }
     
    </div>
  );
};

export default DoctorProfile;
