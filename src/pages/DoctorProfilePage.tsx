import React, { useEffect, useState } from "react";
import {FaCheckCircle,FaThumbsUp} from "react-icons/fa";
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
  const [aboutExpanded, setAboutExpanded] = useState(false);
  const [showAllServices, setShowAllServices] = useState(false);
  const [showAllSpecializations, setShowAllSpecializations] = useState(false);


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
      } catch {
        setDoctor(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [city, slug]);

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

  const ratingPercent = doctor.rating
    ? Math.round((doctor.rating / 5) * 100)
    : 0;

  const aboutText = doctor.description || "";
  const MAX_LENGTH = 180;
  const isLong = aboutText.length > MAX_LENGTH;
  const visibleText = aboutExpanded
    ? aboutText
    : aboutText.slice(0, MAX_LENGTH);

  return (
    <div className="max-w-7xl mx-auto my-8 px-4">
      <HeroSearch />

      <div className="mt-4 mb-4">
        <BreadcrumbNav profileData={doctor} profileType="doctor" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl shadow border">
          <div className="flex flex-col sm:flex-row gap-6">
            <img
              src={doctor.image_url || defaultImage}
              alt={doctor.name}
              className="w-32 h-32 rounded-full object-cover border"
              onError={(e) => (e.currentTarget.src = defaultImage)}
            />

            <div className="flex-1">
              {/* Name + claimed */}
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-semibold">
                  {doctor.name}
                </h1>

                {doctor.is_profile_claimed === 1 && (
                  <span className="text-xs text-green-600 font-medium">
                    Profile is claimed
                  </span>
                )}
              </div>

              {doctor.degree && (
                <p className="text-sm mt-1">{doctor.degree}</p>
              )}

              {doctor.designation && (
                <p className="text-sm text-gray-600">
                  {doctor.designation}
                </p>
              )}

              {doctor.experience_years && (
                <p className="text-sm mt-1">
                  {doctor.experience_years} Years Experience Overall
                </p>
              )}

              {doctor.registration_number && (
                <div className="flex items-center gap-2 text-green-600 text-sm mt-2">
                  <FaCheckCircle />
                  Medical Registration Verified
                </div>
              )}

              {/* Rating */}
              <div className="flex items-center gap-2 mt-3 text-sm">
                <FaThumbsUp className="text-green-600" />
                <span className="font-semibold text-green-700">
                  {ratingPercent}%
                </span>
                {doctor.patients_count > 0 && (
                  <span className="text-gray-600">
                    ({doctor.patients_count} patients)
                  </span>
                )}
              </div>

              {/* About */}
              {aboutText && (
                <div className="mt-4 text-sm text-gray-700">
                  <p>
                    {visibleText}
                    {isLong && !aboutExpanded && "..."}
                  </p>
                  {isLong && (
                    <button
                      className="text-blue-600 mt-1"
                      onClick={() =>
                        setAboutExpanded(!aboutExpanded)
                      }
                    >
                      {aboutExpanded ? "Read less" : "Read more"}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="mt-8">
            <DoctorProfileTabs doctor={doctor} />
          </div>

          {/* Doctor Details Card */}
          <div className="mt-6 bg-white rounded-2xl shadow border p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Services */}
              {Array.isArray(doctor.services) && doctor.services.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Services
                  </h3>

                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                    {(showAllServices
                      ? doctor.services
                      : doctor.services.slice(0, 3)
                    ).map(service => (
                      <li key={service.id}>{service.name}</li>
                    ))}
                  </ul>

                  {doctor.services.length > 3 && (
                    <button
                      className="text-blue-600 text-sm mt-1"
                      onClick={() => setShowAllServices(!showAllServices)}
                    >
                      {showAllServices ? "View less" : "View all"}
                    </button>
                  )}
                </div>
              )}

              {/* Specializations */}
              {Array.isArray(doctor.specializations) && doctor.specializations.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Specializations
                  </h3>

                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                    {(showAllSpecializations
                      ? doctor.specializations
                      : doctor.specializations.slice(0, 3)
                    ).map(spec => (
                      <li key={spec.id}>{spec.name}</li>
                    ))}
                  </ul>

                  {doctor.specializations.length > 3 && (
                    <button
                      className="text-blue-600 text-sm mt-1"
                      onClick={() =>
                        setShowAllSpecializations(!showAllSpecializations)
                      }
                    >
                      {showAllSpecializations ? "View less" : "View all"}
                    </button>
                  )}
                </div>
              )}

              {/* Education */}
              {(doctor.degree ||
                doctor.doctor_college ||
                doctor.pass_year) && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Education
                  </h3>

                  <ul className="list-disc list-inside text-sm text-gray-700">
                    <li>
                      {doctor.degree}
                      {doctor.doctor_college &&
                        ` - ${doctor.doctor_college}`}
                      {doctor.pass_year &&
                        `, ${doctor.pass_year}`}
                    </li>
                  </ul>
                </div>
              )}

              {/* Registrations */}
              {(doctor.registration_number ||
                doctor.doctor_council) && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Registrations
                  </h3>

                  <ul className="list-disc list-inside text-sm text-gray-700">
                    <li>
                      {doctor.registration_number}
                      {doctor.doctor_council &&
                        ` - ${doctor.doctor_council}`}
                      {doctor.doctor_council_year &&
                        `, ${doctor.doctor_council_year}`}
                    </li>
                  </ul>
                </div>
              )}

            </div>
          </div>

        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4">
          <div className="sticky top-24">
            <GetInTouchForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
