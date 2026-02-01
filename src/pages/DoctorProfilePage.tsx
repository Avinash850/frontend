import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaThumbsUp } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import { HeroSearch } from "../components/HeroSearch";
import defaultImage from "../assets/images/default_icon.png";
import { getDoctorDetails, getSearchDiscover  } from "../services/doctorsService";
import DoctorProfileTabs from "./DoctorTab";
import BreadcrumbNav from "./BreadCrumbNav";
import GetInTouchForm from "../components/GetInTouch";
import usePageTitle from "../hooks/usePageTitle";

const DoctorProfile = () => {
  const { city, slug } = useParams();
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);
  const [seo, setSeo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [aboutExpanded, setAboutExpanded] = useState(false);
  const [showAllServices, setShowAllServices] = useState(false);
  const [showAllSpecializations, setShowAllSpecializations] = useState(false);
  const [discover, setDiscover] = useState({
  top_doctors: [],
  top_services: [],
  top_procedures: [],
});



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

        // if (res?.seo) {
        //   setSeo(res.seo);
        // }

        // ✅ NEW
        const discoverRes = await getSearchDiscover({ city });
        setDiscover(discoverRes);

      } catch {
        setDoctor(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [city, slug]);
  
  usePageTitle(
  doctor
    ? `Dr. ${doctor.name} | ${doctor.specialization_name} in ${doctor.area_name}, ${doctor.city_name}`
    : "Doctor Profile"
);


  /* ================= SEO EFFECT (ONLY ADDITION) ================= */
  // useEffect(() => {
  //   if (!seo) return;

  //   // if (seo.title) {
  //   //   document.title = seo.title;
  //   // }

  //   if (seo.description) {
  //     let metaDesc = document.querySelector("meta[name='description']");
  //     if (!metaDesc) {
  //       metaDesc = document.createElement("meta");
  //       metaDesc.setAttribute("name", "description");
  //       document.head.appendChild(metaDesc);
  //     }
  //     metaDesc.setAttribute("content", seo.description);
  //   }
  // }, [seo]);
  /* ============================================================= */
  

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

  const aboutText = doctor.short_description || "";
  const MAX_LENGTH = 180;
  const isLong = aboutText.length > MAX_LENGTH;
  const visibleText = aboutExpanded
    ? aboutText
    : aboutText.slice(0, MAX_LENGTH);

  /* ===== helper: text → slug ===== */
  const toSlug = (text = "") =>
    text
      .toLowerCase()
      .trim()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

  const handleRedirect = (name) => {
    if (!city || !name) return;
    navigate(`/${city}/${toSlug(name)}`);
  };

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
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-semibold">
                  Dr. {doctor.name}
                </h1>

                {doctor.is_profile_claimed === 1 && (
                  <span className="text-xs text-green-600 font-medium">
                    Verified Profile
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
                        setAboutExpanded(!aboutExpanded)}
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
                      <li
                        key={service.id}
                        onClick={() => handleRedirect(service.name)}
                        className="cursor-pointer hover:text-blue-600"
                      >
                        {service.name}
                      </li>
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
              {Array.isArray(doctor.specializations) &&
                doctor.specializations.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Specializations
                    </h3>

                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                      {(showAllSpecializations
                        ? doctor.specializations
                        : doctor.specializations.slice(0, 3)
                      ).map(spec => (
                        <li
                          key={spec.id}
                          onClick={() => handleRedirect(spec.name)}
                          className="cursor-pointer hover:text-blue-600"
                        >
                          {spec.name}
                        </li>
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
           {/* <div className="sticky top-24">
            <GetInTouchForm />
          </div> */}
        </div>

        {/* Sidebar */}
       <div className="lg:col-span-4 space-y-6">
           <GetInTouchForm />
          {/* Top Doctors */}
          {discover.top_doctors.length > 0 && (
            <div className="bg-white rounded-2xl shadow border p-5">
              <h3 className="font-semibold mb-3">
                Top Doctors in {city}
              </h3>
              <ul className="space-y-2 text-sm">
                {discover.top_doctors.slice(0, 20).map(d => (
                  <li
                    key={d.id}
                    className="text-blue-600 cursor-pointer hover:underline"
                    onClick={() =>
                      navigate(`/${city}/doctor/${d.slug}`)
                    }
                  >
                    Dr. {d.name}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Top Services */}
          {discover.top_services.length > 0 && (
            <div className="bg-white rounded-2xl shadow border p-5">
              <h3 className="font-semibold mb-3">
                Top Services in {city}
              </h3>
              <ul className="space-y-2 text-sm">
                {discover.top_services.slice(0, 20).map(s => (
                  <li
                    key={s.id}
                    className="text-blue-600 cursor-pointer hover:underline"
                    onClick={() =>
                      navigate(`/${city}/${s.slug}`)
                    }
                  >
                    {s.name}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Top Procedures */}
          {discover.top_procedures.length > 0 && (
            <div className="bg-white rounded-2xl shadow border p-5">
              <h3 className="font-semibold mb-3">
                Top Procedures in {city}
              </h3>
              <ul className="space-y-2 text-sm">
                {discover.top_procedures.slice(0, 20).map(p => (
                  <li
                    key={p.id}
                    className="text-blue-600 cursor-pointer hover:underline"
                    onClick={() =>
                      navigate(`/${city}/${p.slug}`)
                    }
                  >
                    {p.name}
                  </li>
                ))}
              </ul>
            </div>
          )}

      </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
