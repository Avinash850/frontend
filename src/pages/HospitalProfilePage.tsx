import React, { useEffect, useRef, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { HeroSearch } from "../components/HeroSearch";
import defaultImage from "../assets/images/default_icon.png";
import { getDoctorDetails } from "../services/doctorsService";
import HospitalProfileTabs from "./HospitalTab";
import BreadcrumbNav from "./BreadCrumbNav";
import GetInTouchForm from "../components/GetInTouch";

const HospitalProfile = () => {
  const { city, slug } = useParams();
  const [hospital, setHospital] = useState(null);
  const [loading, setLoading] = useState(true);
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    if (!city || !slug) return;
    if (hasFetchedRef.current) return;

    const fetchHospital = async () => {
      try {
        setLoading(true);

        const res = await getDoctorDetails({
          type: "hospital",
          slug,
          city,
          profile: true,
        });

        if (res?.items?.length) {
          setHospital(res.items[0]);
        } else {
          setHospital(null);
        }
      } catch (err) {
        console.error("Hospital profile fetch failed:", err);
        setHospital(null);
      } finally {
        setLoading(false);
      }
    };

    fetchHospital();
  }, [city, slug]);

  if (loading) {
    return <div className="text-center py-16 text-gray-500">Loading…</div>;
  }

  if (!hospital) {
    return <div className="text-center py-16 text-gray-500">Hospital not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto my-10 px-4">
      <HeroSearch /> {/* Optional: mode="readonly" */}

      <div className="mt-6 mb-4">
        <BreadcrumbNav profileData={hospital} profileType="hospital" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl shadow border border-gray-200">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0 w-32 h-32 md:w-40 md:h-40 p-3">
              <img
                src={hospital.image_url || defaultImage}
                alt={hospital.name}
                className="w-full h-full object-cover rounded-xl border border-gray-200"
                onError={(e) => (e.currentTarget.src = defaultImage)}
              />
            </div>

            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
                {hospital.name}
              </h2>

              {hospital.short_description && (
                <p className="mt-2 text-sm text-gray-500">
                  {hospital.short_description}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-600">
                {hospital.rating && (
                  <span className="flex items-center gap-1">
                    <FaStar className="text-green-500" />
                    {hospital.rating} Rating
                  </span>
                )}

                {(hospital.area_name || hospital.city_name) && (
                  <span>
                    {hospital.area_name ? `${hospital.area_name}, ` : ""}
                    {hospital.city_name}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8">
            <HospitalProfileTabs hospital={hospital} />
          </div>
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 z-10">
            <GetInTouchForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalProfile;
