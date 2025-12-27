import React, { useEffect, useRef, useState } from "react";
import { FaStar, FaPhone } from "react-icons/fa";
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

        setClinic(res?.items?.[0] || null);
      } catch {
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

  const rating = clinic.rating > 0 ? clinic.rating : 3.5;

  return (
    <div className="max-w-7xl mx-auto my-10 px-4">
      <HeroSearch />

      <div className="mt-6 mb-4">
        <BreadcrumbNav profileData={clinic} profileType="clinic" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT */}
        <div className="lg:col-span-8 bg-white p-8 rounded-[24px] shadow border border-gray-200">
          <div className="flex flex-col md:flex-row gap-8 justify-between">
            {/* LEFT INFO */}
            <div className="flex gap-6">
              <img
                src={clinic.image_url || defaultImage}
                alt={clinic.name}
                className="w-20 h-20 object-contain"
                onError={(e) => (e.currentTarget.src = defaultImage)}
              />

              <div>
                <h1 className="text-lg font-semibold text-gray-900">
                  {clinic.name}
                </h1>

                {clinic.short_description && (
                  <p className="text-sm text-gray-700">
                    {clinic.short_description}
                  </p>
                )}

                {/* Rating */}
                <div className="flex items-center gap-2 mt-1 text-sm">
                  <span className="text-green-600 font-medium">
                    {rating}
                  </span>

                  <div className="flex text-green-600">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={
                          i < Math.round(rating)
                            ? ""
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>

                  <span className="text-gray-600">
                    ({clinic.patients_stories || 0} patient stories)
                  </span>
                </div>

                <p className="text-sm text-gray-600 mt-2">
                  {clinic.city_name}
                </p>

                <p className="text-sm text-gray-700">
                  {clinic.address}
                </p>

                {(clinic.display_address || clinic.address) && (
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      clinic.display_address || clinic.address
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-blue-600 inline-block mt-1"
                  >
                    Get Directions
                  </a>
                )}
              </div>
            </div>

            {/* RIGHT – CALL NOW */}
            {clinic.phone_1 && (
              <div className="flex items-end">
                <a
                  href={`tel:${clinic.phone_1}`}
                  className="bg-sky-500 text-white px-6 py-3 rounded flex items-center gap-2"
                >
                  <FaPhone />
                  Call Now
                </a>
              </div>
            )}
          </div>

          {/* TABS */}
          <div className="mt-8">
            <ClinicProfileTabs clinic={clinic} />
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
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
