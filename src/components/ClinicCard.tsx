

import React from "react";

export const ClinicCard = ({ clinic }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-200 py-6">
      {/* Left Section */}
      <div className="flex items-start gap-5">
        {/* Clinic Image */}
        <div className="w-28 h-28 flex-shrink-0">
          <img
            src={clinic.logo}
            alt={clinic.name}
            className="w-full h-full object-contain rounded-full border"
          />
        </div>

        {/* Clinic Info */}
        <div>
          <h2 className="text-blue-500 text-lg font-medium hover:underline cursor-pointer">
            {clinic.name}
          </h2>
          <p className="text-gray-600 text-sm">{clinic.experience} years experience</p>
          <p className="mt-1 text-gray-800 font-medium">{clinic.location}</p>
          <p className="text-gray-700 text-sm">
            ₹{clinic.fees} <span className="text-gray-500">Consultation Fees</span>
          </p>

          {/* Rating & Stories */}
          <div className="mt-2 flex items-center gap-3">
            <div className="flex items-center bg-green-100 px-2 py-1 rounded-md">
              <span className="text-green-600 font-bold text-sm">{clinic.rating}%</span>
            </div>
            <span className="text-gray-700 text-sm font-medium">
              {clinic.stories} Patient Stories
            </span>
          </div>
        </div>
      </div>

      {/* Right Section - Button */}
      <div className="mt-4 md:mt-0">
        <button className="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-2 rounded-md">
          Book Clinic Visit
        </button>
      </div>
    </div>
  );
};


const ClinicList = () => {
  // For now, hardcoded data (later replace with API response)
  const clinics = [
    {
      id: 1,
      name: "Dr. Saket's Dental Makeover",
      experience: 19,
      location: "Indirapuram",
      type: "doctors",
      fees: 500,
      rating: 98,
      stories: 247,
      logo: "https://i.ibb.co/kQvWFGc/makeover.png",
    },
    {
      id: 2,
      name: "Dr. Grover's Dental & Orthodontic Clinic & Implant Centre",
      experience: 27,
      location: "Old Raj Nagar",
      fees: 500,
      rating: 96,
      stories: 531,
      logo: "https://i.ibb.co/Fb3h4Mv/grover.png",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-sm rounded-lg p-6">
      {clinics.map((clinic) => (
        <ClinicCard key={clinic.id} clinic={clinic} />
      ))}
    </div>
  );
};

export default ClinicList;
