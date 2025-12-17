import React, { useContext, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { DoctorContext } from "../context/DoctorContextProvider";
import { HeroSearch } from "../components/HeroSearch";
import defaultImage from "../assets/images/default_icon.png";
import { getDoctorDetails } from "../services/doctorsService";
import BreadcrumbNav from "./BreadCrumbNav";
import GetInTouchForm from "../components/GetInTouch";
import ClinicProfileTabs from "./ClinicTab";

const ClinicProfile = () => {
  const { clinicData, setClinicData } = useContext(DoctorContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchClinicFromUrl = async () => {
      const hash = window.location.hash;
      const parts = hash.replace(/^#\/?/, "").split("/");

      const type = parts[0];
      const clinicId = parts[1];

      if (!clinicId || type !== "clinic") return;
      if (clinicData && String(clinicData.id) === clinicId) return;

      try {
        setLoading(true);
        const res = await getDoctorDetails({
          id: clinicId,
          type: "clinic",
        });

        if (res?.items?.length) {
          setClinicData(res.items[0]);
        }
      } catch (error) {
        console.error("Failed to fetch clinic profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClinicFromUrl();
  }, [clinicData, setClinicData]);

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

      {clinicData?.name && (
        <div className="mt-6 mb-4">
          <BreadcrumbNav profileData={clinicData} />
        </div>
      )}

      {clinicData?.name ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* LEFT SIDE – 70% */}
          <div className="lg:col-span-8 bg-white p-6 rounded-2xl shadow border border-gray-200">

            {/* Clinic Header */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0 w-32 h-32 md:w-40 md:h-40 p-3">
                <img
                  src={clinicData.image_url || defaultImage}
                  alt={clinicData.name}
                  className="w-full h-full object-cover rounded-xl border border-gray-200"
                  onError={(e) => {
                    e.currentTarget.src = defaultImage;
                  }}
                />
              </div>

              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
                  {clinicData.name}
                </h2>

                {clinicData.short_description && (
                  <p className="mt-2 text-sm text-gray-500">
                    {clinicData.short_description}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-600">
                  {clinicData.rating && (
                    <span className="flex items-center gap-1">
                      <FaStar className="text-green-500" />
                      {clinicData.rating} Rating
                    </span>
                  )}

                  {clinicData.city_name && (
                    <span>
                      {clinicData.city_name}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="mt-8">
              <ClinicProfileTabs />
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
          Select a clinic to view profile details
        </div>
      )}
    </div>
  );
};

export default ClinicProfile;
