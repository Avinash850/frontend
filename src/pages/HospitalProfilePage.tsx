import React, { useEffect, useRef, useState } from "react";
import { FaStar, FaPhone } from "react-icons/fa";
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
  const [showAllProcedures, setShowAllProcedures] = useState(false);
  const [showAllSpecializations, setShowAllSpecializations] = useState(false);


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
        setHospital(res?.items?.[0] || null);
      } catch {
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
    return (
      <div className="text-center py-16 text-gray-500">
        Hospital not found
      </div>
    );
  }

  const rating = hospital.rating > 0 ? hospital.rating : 3.5;

  return (
    <div className="max-w-7xl mx-auto my-8 px-4">
      <HeroSearch />

      <div className="mt-4 mb-4">
        <BreadcrumbNav profileData={hospital} profileType="hospital" />
      </div>

      {/* 70 / 30 GRID — same as Doctor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT CARD */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl shadow border">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left content */}
            <div className="flex gap-6">
              <img
                src={hospital.image_url || defaultImage}
                alt={hospital.name}
                className="w-32 h-32 object-cover rounded-2xl border"
                onError={(e) => (e.currentTarget.src = defaultImage)}
              />

              <div>
                <h1 className="text-2xl font-semibold text-gray-900">
                  {hospital.name}
                </h1>

                {hospital.designation && (
                  <p className="text-sm text-gray-700 mt-1">
                    {hospital.designation}
                  </p>
                )}

                {/* Rating */}
                <div className="flex items-center gap-2 mt-3 text-sm">
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
                    ({hospital.patients_stories || 0} patient stories)
                  </span>
                </div>

                <p className="text-sm text-gray-600 mt-2">
                  {hospital.city_name}
                </p>

                <p className="text-sm text-gray-700">
                  {hospital.address}
                </p>

                {(hospital.display_address || hospital.address) && (
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      hospital.display_address || hospital.address
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

            {/* Call Now — inside card */}
            {hospital.phone_1 && (
              <div className="flex items-end">
                <a
                  href={`tel:${hospital.phone_1}`}
                  className="bg-sky-500 text-white px-6 py-3 rounded-md flex items-center gap-2"
                >
                  <FaPhone />
                  Call Now
                </a>
              </div>
            )}
          </div>

          <div className="mt-8">
            <HospitalProfileTabs hospital={hospital} />
          </div>

          {/* Procedures in Hospital */}
          {Array.isArray(hospital.procedures) && hospital.procedures.length > 0 && (
            <div className="mt-6 bg-white rounded-2xl shadow border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Procedures in {hospital.name}
              </h2>

              <div className="flex flex-wrap gap-2">
                {(showAllProcedures
                  ? hospital.procedures
                  : hospital.procedures.slice(0, 5)
                ).map(proc => (
                  <span
                    key={proc.id}
                    className="px-4 py-2 bg-gray-100 text-sm rounded-full text-gray-800"
                  >
                    {proc.name}
                  </span>
                ))}

                {hospital.procedures.length > 5 && !showAllProcedures && (
                  <button
                    className="px-4 py-2 text-sm text-blue-600"
                    onClick={() => setShowAllProcedures(true)}
                  >
                    +{hospital.procedures.length - 5} procedures
                  </button>
                )}
              </div>

              {showAllProcedures && (
                <button
                  className="text-blue-600 text-sm mt-3"
                  onClick={() => setShowAllProcedures(false)}
                >
                  View less
                </button>
              )}
            </div>
          )}

          {/* Specialists in Hospital */}
          {Array.isArray(hospital.specializations) &&
            hospital.specializations.length > 0 && (
              <div className="mt-6 bg-white rounded-2xl shadow border p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Specialists in {hospital.name}
                </h2>

                <div className="flex flex-wrap gap-2">
                  {(showAllSpecializations
                    ? hospital.specializations
                    : hospital.specializations.slice(0, 6)
                  ).map(spec => (
                    <span
                      key={spec.id}
                      className="px-4 py-2 bg-gray-100 text-sm rounded-full text-gray-800"
                    >
                      {spec.name}
                      {spec.doctors_count
                        ? ` (${spec.doctors_count})`
                        : ""}
                    </span>
                  ))}

                  {hospital.specializations.length > 6 &&
                    !showAllSpecializations && (
                      <button
                        className="px-4 py-2 text-sm text-blue-600"
                        onClick={() => setShowAllSpecializations(true)}
                      >
                        +{hospital.specializations.length - 6} specialities
                      </button>
                    )}
                </div>

                {showAllSpecializations && (
                  <button
                    className="text-blue-600 text-sm mt-3"
                    onClick={() => setShowAllSpecializations(false)}
                  >
                    View less
                  </button>
                )}
              </div>
          )}
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

export default HospitalProfile;
