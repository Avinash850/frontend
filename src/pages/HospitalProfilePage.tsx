import React, { useContext, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { DoctorContext } from "../context/DoctorContextProvider";
import { HeroSearch } from "../components/HeroSearch";
import defaultImage from "../assets/images/default_icon.png";
import { getDoctorDetails } from "../services/doctorsService";
import HospitalProfileTabs from "./HospitalTab";
import BreadcrumbNav from "./BreadCrumbNav";
import GetInTouchForm from "../components/GetInTouch";

const HospitalProfile = () => {
  const { hospitalData, setHospitalData } = useContext(DoctorContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchHospitalFromUrl = async () => {
      const hash = window.location.hash;
      const parts = hash.replace(/^#\/?/, "").split("/");

      const type = parts[0];
      const hospitalId = parts[1];

      if (!hospitalId || type !== "hospital") return;
      if (hospitalData && String(hospitalData.id) === hospitalId) return;

      try {
        setLoading(true);
        const payload = { id: hospitalId, type: "hospital" };
        const res = await getDoctorDetails(payload);

        if (res?.items?.length) {
          setHospitalData(res.items[0]);
        }
      } catch (error) {
        console.error("Failed to fetch hospital profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHospitalFromUrl();
  }, [hospitalData, setHospitalData]);

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

      {hospitalData?.name && (
        <div className="mt-6 mb-4">
          <BreadcrumbNav profileData={hospitalData} />
        </div>
      )}

      {hospitalData?.name ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* LEFT SIDE – 70% */}
          <div className="lg:col-span-8 bg-white p-6 rounded-2xl shadow border border-gray-200">

            {/* Hospital Header */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0 w-32 h-32 md:w-40 md:h-40 p-3">
                <img
                  src={hospitalData.image_url || defaultImage}
                  alt={hospitalData.name}
                  className="w-full h-full object-cover rounded-xl border border-gray-200"
                  onError={(e) => {
                    e.currentTarget.src = defaultImage;
                  }}
                />
              </div>

              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
                  {hospitalData.name}
                </h2>

                {hospitalData.short_description && (
                  <p className="mt-2 text-sm text-gray-500">
                    {hospitalData.short_description}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-600">
                  {hospitalData.rating && (
                    <span className="flex items-center gap-1">
                      <FaStar className="text-green-500" />
                      {hospitalData.rating} Rating
                    </span>
                  )}

                  {hospitalData.city_name && (
                    <span>
                      {hospitalData.city_name}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Tabs (same position & behavior as Doctor) */}
            <div className="mt-8">
              <HospitalProfileTabs />
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
          Select a hospital to view profile details
        </div>
      )}
    </div>
  );
};

export default HospitalProfile;
