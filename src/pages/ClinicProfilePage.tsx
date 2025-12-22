import React, { useEffect, useRef, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { HeroSearch } from "../components/HeroSearch";
import defaultImage from "../assets/images/default_icon.png";
import { getDoctorDetails } from "../services/doctorsService";
import BreadcrumbNav from "./BreadCrumbNav";
import GetInTouchForm from "../components/GetInTouch";
import ClinicProfileTabs from "./ClinicTab";

const ClinicProfile = () => {
  const { city, slug } = useParams();
  const [clinic, setClinic] = useState(null);
  const [loading, setLoading] = useState(true);
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    if (!city || !slug) return;
    if (hasFetchedRef.current) return;

    const fetchClinic = async () => {
      try {
        setLoading(true);

        const res = await getDoctorDetails({
          type: "clinic",
          slug,
          city,
          profile: true,
        });

        if (res?.items?.length) {
          setClinic(res.items[0]);
        } else {
          setClinic(null);
        }
      } catch (err) {
        console.error("Clinic profile fetch failed:", err);
        setClinic(null);
      } finally {
        setLoading(false);
      }
    };

    fetchClinic();
  }, [city, slug]);

  if (loading) {
    return <div className="text-center py-16 text-gray-500">Loading…</div>;
  }

  if (!clinic) {
    return <div className="text-center py-16 text-gray-500">Clinic not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto my-10 px-4">
      <HeroSearch /> {/* Optional: mode="readonly" */}

      <div className="mt-6 mb-4">
        <BreadcrumbNav profileData={clinic} profileType="clinic"/>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl shadow border border-gray-200">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0 w-32 h-32 md:w-40 md:h-40 p-3">
              <img
                src={clinic.image_url || defaultImage}
                alt={clinic.name}
                className="w-full h-full object-cover rounded-xl border border-gray-200"
                onError={(e) => (e.currentTarget.src = defaultImage)}
              />
            </div>

            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
                {clinic.name}
              </h2>

              {clinic.short_description && (
                <p className="mt-2 text-sm text-gray-500">{clinic.short_description}</p>
              )}

              <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-600">
                {clinic.rating && (
                  <span className="flex items-center gap-1">
                    <FaStar className="text-green-500" />
                    {clinic.rating} Rating
                  </span>
                )}

                {(clinic.area_name || clinic.city_name) && (
                  <span>
                    {clinic.area_name ? `${clinic.area_name}, ` : ""}
                    {clinic.city_name || ""}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-8">
            <ClinicProfileTabs clinic={clinic}/>
          </div>
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-4">
          <div className="sticky top-24">
            <GetInTouchForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClinicProfile;
