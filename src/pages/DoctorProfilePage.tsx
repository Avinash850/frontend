import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { HeroSearch } from "../components/HeroSearch";
import defaultImage from "../assets/images/default_icon.png";
import { getDoctorDetails } from "../services/doctorsService";
import DoctorProfileTabs from "./DoctorTab";
import BreadcrumbNav from "./BreadCrumbNav";
import GetInTouchForm from "../components/GetInTouch";

const DoctorProfile = () => {
  const { city, slug } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!city || !slug) return;

    const fetchDoctor = async () => {
      try {
        setLoading(true);

        const res = await getDoctorDetails({
          type: "doctor",
          slug,
          city,
          profile: true,
        });

        setDoctor(res?.items?.[0] || null);
      } catch (err) {
        setDoctor(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [city, slug]); // 👈 THIS is enough

  if (loading) {
    return <div className="text-center py-16 text-gray-500">Loading…</div>;
  }

  if (!doctor) {
    return (
      <div className="text-center py-16 text-gray-500">
        Doctor not found
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto my-8 px-4">
      <div className="mb-6">
        <HeroSearch />
      </div>

      <div className="mb-4">
        <BreadcrumbNav profileData={doctor} profileType="doctor" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-8 bg-white p-5 sm:p-6 rounded-2xl shadow border">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center sm:items-start">
            <img
              src={doctor.image_url || defaultImage}
              alt={doctor.name}
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border"
              onError={(e) => (e.currentTarget.src = defaultImage)}
            />

            <div className="text-center sm:text-left">
              <h1 className="text-xl sm:text-2xl font-semibold">
                {doctor.name}
              </h1>

              <p className="text-indigo-600">
                {doctor.specialization_name}
              </p>

              <div className="flex justify-center sm:justify-start items-center gap-3 mt-2 text-sm">
                <FaStar className="text-green-500" />
                {doctor.rating || "0.0"}
                {doctor.experience_years && (
                  <span>{doctor.experience_years}+ yrs exp</span>
                )}
              </div>

              {doctor.short_description && (
                <p className="mt-3 text-gray-600">
                  {doctor.short_description}
                </p>
              )}
            </div>
          </div>

          <div className="mt-8">
            <DoctorProfileTabs doctor={doctor} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-24">
            <GetInTouchForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
