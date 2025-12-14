import React, { useContext, useEffect, useState } from "react";
import { FaStar, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { DoctorContext } from "../context/DoctorContextProvider";
import { HeroSearch } from "../components/HeroSearch";
import defaultImage from "../assets/images/default_icon.png"
import { getDoctorDetails } from "../services/doctorsService";
import DoctorProfileTabs from "./DoctorTab";
import BreadcrumbNav from "./BreadCrumbNav";
import DoctorListByFilter from "../components/DoctorListByFilter";

const DoctorProfile = () => {
    const { profileData, setProfileData } = useContext(DoctorContext);
    const [loading, setLoading] = useState(false);
     const [filterView, setFilterView] = useState(null);


  // console.log("profileData---->", profileData)

  useEffect(() => {
  const fetchDoctorFromUrl = async () => {
    const hash = window.location.hash;
    const parts = hash.replace(/^#\/?/, "").split("/");

    const type = parts[0]; // doctor
    const doctorId = parts[1];

    if (!doctorId || type !== "doctor") return;

    // If already loaded correctly, skip
    if (profileData && String(profileData.id) === doctorId) return;

    try {
      setLoading(true);

      const payload = {
        id: doctorId,
        type: "doctor",
      };

      const res = await getDoctorDetails(payload);

      const doctor =
        res.items[0]

      if (doctor) {
        setProfileData(doctor);
      }
    } catch (error) {
      console.error("Failed to fetch doctor profile:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchDoctorFromUrl();
}, [window.location.hash]);

 const handleBreadcrumbClick = (type, value) => {
    setFilterView({ type, value });
  };

  const handleSelectDoctor = (doctor) => {
    setProfileData(doctor);
    setFilterView(null);
  };

  if (loading)
    return <div className="text-center text-gray-500 py-16">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto my-10 p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
      <HeroSearch />

      {profileData?.name && (
        <BreadcrumbNav
          profileData={profileData}
          // onBreadcrumbClick={handleBreadcrumbClick}
        />
      )}

      {filterView ? (
        <DoctorListByFilter
          filterType={filterView.type}
          filterValue={filterView.value}
          onSelectDoctor={handleSelectDoctor}
        />
      ) : profileData?.name ? (
        <>
          {/* ✅ Your existing doctor profile section remains unchanged */}
          <div className="flex flex-col md:flex-row gap-6 mt-4">
            <div className="flex-shrink-0 w-32 h-32 md:w-40 md:h-40 p-4">
              <img
                src={profileData.profile_image || defaultImage}
                alt={profileData.name}
                className="w-full h-full object-contain rounded-full"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = defaultImage;
                }}
              />
            </div>

            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                {profileData.name}
              </h2>
              <p className="text-indigo-600 font-semibold mt-1">
                {profileData.specialization_name} | {profileData.degree}
              </p>
              <p className="mt-2 text-gray-600">{profileData.location}</p>
            </div>
          </div>

          <div className="mt-8">
            <DoctorProfileTabs />
          </div>
        </>
      ) : (
        <div className="text-center py-16 text-gray-500">
          Select a doctor to view profile details
        </div>
      )}
    </div>
  );
};

export default DoctorProfile;
