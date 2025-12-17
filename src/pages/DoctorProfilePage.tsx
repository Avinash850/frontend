import React, { useContext, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { DoctorContext } from "../context/DoctorContextProvider";
import { HeroSearch } from "../components/HeroSearch";
import defaultImage from "../assets/images/default_icon.png";
import { getDoctorDetails } from "../services/doctorsService";
import DoctorProfileTabs from "./DoctorTab";
import BreadcrumbNav from "./BreadCrumbNav";
import DoctorListByFilter from "../components/DoctorListByFilter";
import GetInTouchForm from "../components/GetInTouch";

const DoctorProfile = () => {
  const { profileData, setProfileData } = useContext(DoctorContext);
  const [loading, setLoading] = useState(false);
  const [filterView, setFilterView] = useState(null);

  useEffect(() => {
    const fetchDoctorFromUrl = async () => {
      const hash = window.location.hash;
      const parts = hash.replace(/^#\/?/, "").split("/");

      const type = parts[0];
      const doctorId = parts[1];

      if (!doctorId || type !== "doctor") return;
      if (profileData && String(profileData.id) === doctorId) return;

      try {
        setLoading(true);
        const payload = { id: doctorId, type: "doctor" };
        const res = await getDoctorDetails(payload);

        if (res?.items?.length) {
          setProfileData(res.items[0]);
        }
      } catch (error) {
        console.error("Failed to fetch doctor profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorFromUrl();
  }, [profileData, setProfileData]);

  const handleSelectDoctor = (doctor) => {
    setProfileData(doctor);
    setFilterView(null);
  };

  if (loading) {
    return (
      <div className="text-center text-gray-500 py-16">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto my-10 px-4">
      <HeroSearch />

      {profileData?.name && (
        <div className="mt-6 mb-4">
          <BreadcrumbNav profileData={profileData} />
        </div>
      )}

      {filterView ? (
        <DoctorListByFilter
          filterType={filterView.type}
          filterValue={filterView.value}
          onSelectDoctor={handleSelectDoctor}
        />
      ) : profileData?.name ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* LEFT SIDE – 70% */}
          <div className="lg:col-span-8 bg-white p-6 rounded-2xl shadow border border-gray-200">

            {/* Doctor Header */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0 w-32 h-32 md:w-40 md:h-40 p-3">
                <img
                  src={profileData.image_url || defaultImage}
                  alt={profileData.name}
                  className="w-full h-full object-cover rounded-full border border-gray-200"
                  onError={(e) => {
                    e.currentTarget.src = defaultImage;
                  }}
                />
              </div>

              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
                  {profileData.name}
                </h2>

                <p className="text-indigo-600 font-medium mt-1">
                  {profileData.specialization_name}
                </p>

                <p className="text-sm text-gray-500">
                  {profileData.degree}
                </p>

                <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <FaStar className="text-green-500" />
                    {profileData.rating || "0.0"} Rating
                  </span>

                  {profileData.experience_years && (
                    <span>
                      {profileData.experience_years}+ years experience
                    </span>
                  )}
                </div>

                {profileData.short_description && (
                  <p className="mt-2 text-sm text-gray-500">
                    {profileData.short_description}
                  </p>
                )}
              </div>
            </div>

            {/* Tabs */}
            <div className="mt-8">
              <DoctorProfileTabs />
            </div>
          </div>

          {/* RIGHT SIDE – 30% */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 z-10">
              <GetInTouchForm />
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 text-gray-500">
          Select a doctor to view profile details
        </div>
      )}
    </div>
  );
};

export default DoctorProfile;
