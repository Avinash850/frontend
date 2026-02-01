import React, { useState } from "react";
import { FaStar, FaPhone } from "react-icons/fa";
import defaultImage from "../assets/images/default_icon.png";
import { useNavigate } from "react-router-dom";

const HospitalProfileTabs = ({ hospital }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showAllServices, setShowAllServices] = useState(false);
  const [showAllOverviewServices, setShowAllOverviewServices] = useState(false);

  const [galleryImages, setGalleryImages] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const navigate = useNavigate();
  if (!hospital) return null;

  const doctors = hospital.doctors || [];
  const services = hospital.services || [];
  const images = hospital.images || [];

  const citySlug = (hospital.city_name || "")
    .toLowerCase()
    .replace(/\s+/g, "-");

  /* ===== helper: text → slug ===== */
  const toSlug = (text = "") =>
    text
      .toLowerCase()
      .trim()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

  const handleServiceClick = (name) => {
    if (!name || !citySlug) return;
    navigate(`/${citySlug}/${toSlug(name)}`);
  };

  const tabs = [
    { key: "overview", title: "Overview" },
    { key: "doctors", title: `Doctors (${doctors.length})` },
    { key: "stories", title: `Stories (${hospital.patients_stories || 0})` },
    { key: "services", title: "Services" },
    { key: "questions", title: "Questions" },
  ];

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
          <h4
            className="text-blue-600 font-semibold text-lg cursor-pointer hover:underline"
            onClick={goToDoctorProfile}
          >
            Dr. {doctor.name}
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

      <div className="p-6 text-sm text-gray-700">
        {/* OVERVIEW */}
        {activeTab === "overview" && (
          <>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                About {hospital.name}
              </h3>
              <p className="leading-relaxed">
                {hospital.about || hospital.short_description || ""}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              {/* SERVICES (OVERVIEW) */}
              <div>
                <h4 className="font-semibold mb-2">Services</h4>

                {/* <ul className="grid grid-cols-2 gap-y-1 text-sm text-gray-700">
                  {(showAllOverviewServices
                    ? services
                    : services.slice(0, 6)
                  ).map((s) => (
                    <li
                      key={s.id}
                      onClick={() => handleServiceClick(s.name)}
                      className="leading-snug line-clamp-2 cursor-pointer hover:text-blue-600"
                      title={s.name}
                    >
                      {s.name}
                    </li>
                  ))}
                </ul> */}

                <ul className="space-y-1 text-sm text-gray-700">
                  {(showAllOverviewServices ? services : services.slice(0, 6)).map((s) => (
                    <li
                      key={s.id}
                      onClick={() => handleServiceClick(s.name)}
                      className="cursor-pointer hover:text-blue-600 leading-relaxed break-words"
                    >
                      {s.name}
                    </li>
                  ))}
                </ul>
                
                {services.length > 6 && (
                  <button
                    onClick={() =>
                      setShowAllOverviewServices((prev) => !prev)
                    }
                    className="mt-2 text-blue-600 text-sm font-medium hover:underline"
                  >
                    {showAllOverviewServices
                      ? "View less"
                      : `View all (${services.length})`}
                  </button>
                )}
              </div>

              <div>
                <h4 className="font-semibold mb-2">Timings</h4>
                <p>{hospital.timing || ""}</p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Photos</h4>
                <div className="flex items-center gap-2">
                  {images.slice(0, 4).map((img, i) => (
                    <img
                      key={i}
                      src={img.image_url || defaultImage}
                      onClick={() => {
                        setGalleryImages(images);
                        setActiveImageIndex(i);
                      }}
                      className="w-12 h-12 rounded object-cover border cursor-pointer"
                    />
                  ))}

                  {images.length > 4 && (
                    <div
                      onClick={() => {
                        setGalleryImages(images);
                        setActiveImageIndex(4);
                      }}
                      className="w-12 h-12 flex items-center justify-center bg-gray-100 text-xs rounded border cursor-pointer"
                    >
                      +{images.length - 4}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {/* DOCTORS */}
        {/* {activeTab === "doctors" && (
          doctors.length > 0
            ? doctors.map(renderDoctorCard)
            : <p className="text-gray-500">No doctors listed.</p>
        )} */}




            {activeTab === "doctors" && (
              <div>
                {/* HEADER */}
                <h2 className="text-lg font-semibold mb-4">
                  Doctors in {hospital.name}
                </h2>

                {/* FILTER BAR (UI only, logic later) */}
                <div className="border border-gray-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-gray-600 mb-2">
                    Filter specialties…
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <button className="px-4 py-1 text-sm rounded-full bg-blue-600 text-white">
                      All ({doctors.length})
                    </button>
                    
                    {Array.from(
                      new Set(doctors.map(d => d.designation).filter(Boolean))
                    ).map((spec, i) => (
                      <button
                        key={i}
                        className="px-4 py-1 text-sm rounded-full bg-gray-100 text-gray-700"
                      >
                        {spec}
                      </button>
                    ))}
                  </div>
                </div>

                {/* DOCTOR LIST */}
                  <div className="space-y-6">
                    {doctors.map((doctor) => (
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
                                  navigate(`/${hospital.city_name?.toLowerCase()}/doctor/${doctor.slug}`)
                                }
                              >
                                Dr. {doctor.name}
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
                              <p>
                                💬 {doctor.patients_count} Patient Stories
                              </p>
                            )}

                            {doctor.consultation_fee && (
                              <p className="font-semibold">
                                ₹{doctor.consultation_fee}
                              </p>
                            )}

                            {doctor.timings && (
                              <p>
                                🕒 {doctor.timings}
                              </p>
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
                    ))}
                  </div>
                </div>
            )}


        {/* STORIES */}
        {activeTab === "stories" && (
          <p className="text-gray-500">
            Patient stories will be available soon.
          </p>
        )}









        {/* SERVICES TAB */}
        {activeTab === "services" && (
          <div>
            <ul className="columns-1 md:columns-3 gap-x-8 list-disc list-inside space-y-2">
              {(showAllServices ? services : services.slice(0, 12)).map((s) => (
                <li
                  key={s.id}
                  onClick={() => handleServiceClick(s.name)}
                  className="text-sm text-gray-700 break-inside-avoid cursor-pointer hover:text-blue-600"
                >
                  {s.name}
                </li>
              ))}
            </ul>

            {services.length > 12 && (
              <button
                onClick={() => setShowAllServices((prev) => !prev)}
                className="mt-4 text-blue-600 text-sm font-medium hover:underline"
              >
                {showAllServices
                  ? "View less"
                  : `View all (${services.length})`}
              </button>
            )}
          </div>
        )}



        {/* QUESTIONS */}
        {activeTab === "questions" && (
          <p className="text-gray-500">
            Questions will be available soon.
          </p>
        )}
      </div>

      {/* IMAGE MODAL */}
      {galleryImages && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="relative bg-white rounded-lg p-4 max-w-lg w-full">
            <button
              onClick={() => setGalleryImages(null)}
              className="absolute top-2 right-3 text-xl text-gray-600"
            >
              ✕
            </button>

            <img
              src={galleryImages[activeImageIndex].image_url}
              className="w-full h-80 object-cover rounded"
            />

            <div className="flex justify-between mt-3">
              <button
                disabled={activeImageIndex === 0}
                onClick={() => setActiveImageIndex((i) => i - 1)}
                className="text-blue-600 disabled:opacity-40"
              >
                Prev
              </button>

              <button
                disabled={activeImageIndex === galleryImages.length - 1}
                onClick={() => setActiveImageIndex((i) => i + 1)}
                className="text-blue-600 disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HospitalProfileTabs;
