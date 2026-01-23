import React from "react";
import { FaThumbsUp, FaPhoneAlt } from "react-icons/fa";
import { BsCalendarDate } from "react-icons/bs";

const DoctorCard = ({ doctor }) => {
  if (!doctor?.slug) return null;

  const citySlug = (doctor.city_name || "delhi")
    .toLowerCase()
    .replace(/\s+/g, "-");

  const doctorUrl = `#/${citySlug}/doctor/${doctor.slug}`;

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-200 py-6">

      {/* Left Section */}
      <div className="flex items-start gap-5 w-full md:w-auto">
        {/* Doctor Image */}
        <div className="w-28 h-28 flex-shrink-0">
          <img
            src={doctor.image_url || "/default-doctor.png"}
            alt={doctor.name}
            className="w-full h-full object-cover rounded-full border"
          />
        </div>

        {/* Doctor Info */}
        <div>
          <a href={doctorUrl}>
            <h2 className="text-sky-600 text-lg font-semibold hover:underline cursor-pointer">
              Dr. {doctor.name}
            </h2>
          </a>

          {doctor.specialization_name && (
            <p className="text-gray-700 text-sm">
              {doctor.specialization_name}
            </p>
          )}

          {doctor.experience_years && (
            <p className="text-gray-600 text-sm">
              {doctor.experience_years} years experience overall
            </p>
          )}

          {(doctor.area_name || doctor.city_name) && (
            <p className="mt-1 text-gray-800 font-medium">
              {doctor.area_name ? `${doctor.area_name}, ` : ""}
              {doctor.city_name}
            </p>
          )}

          {doctor.consultation_fee && (
            <p className="text-gray-700 text-sm">
              ₹{doctor.consultation_fee}{" "}
              <span className="text-gray-500">Consultation Fees</span>
            </p>
          )}

          {/* Rating */}
          <div className="mt-2 flex items-center gap-3">
            <div className="flex items-center bg-green-100 px-2 py-1 rounded-md">
              <FaThumbsUp className="text-green-600 mr-1 text-sm" />
              <span className="text-green-600 font-bold text-sm">
                {doctor.rating || "0"}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="mt-4 md:mt-0 flex flex-col items-center">
        <div className="flex items-center text-gray-600 text-sm mb-2">
          <BsCalendarDate className="mr-2" />
          Available Tomorrow
        </div>

        <a
          href={doctorUrl}
          className="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-2 rounded-md w-40 text-center"
        >
          Book Clinic Visit
        </a>

        <button className="flex items-center justify-center gap-2 border border-sky-500 text-sky-500 hover:bg-sky-50 font-medium px-6 py-2 rounded-md w-40 mt-2">
          <FaPhoneAlt /> Contact Hospital
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;
