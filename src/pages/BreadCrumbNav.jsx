import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DoctorContext } from "../context/DoctorContextProvider";

/* ===================== Utils ===================== */
const slugify = (text = "") =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

/* ===================== Component ===================== */
const BreadcrumbNav = ({ profileData, profileType = "doctor" }) => {
  const navigate = useNavigate();
  const { setLocationQuery, setSearchQuery } = useContext(DoctorContext);

  if (!profileData) return null;

  const {
    city_name,
    specialization_name,
    area_name,
    name,
  } = profileData;

  const citySlug = city_name ? slugify(city_name) : null;
  const specializationSlug = specialization_name
    ? slugify(specialization_name)
    : null;
  const areaSlug = area_name ? slugify(area_name) : null;

  return (
    <nav className="text-sm text-gray-600 mb-4">
      <ul className="flex flex-wrap gap-2 items-center">

        {/* Home */}
        <li
          className="cursor-pointer text-blue-600 hover:underline"
          onClick={() => {
            setLocationQuery(null);
            setSearchQuery(null);
            navigate("/");
          }}
        >
          Home
        </li>

        {/* City */}
        {/* {city_name && citySlug && (
          <>
            <span>/</span>
            <li
              className="cursor-pointer text-blue-600 hover:underline"
              onClick={() => {
                setLocationQuery(city_name);
                setSearchQuery(null);
                navigate(`/${citySlug}`);
              }}
            >
              {city_name}
            </li>
          </>
        )} */}

        {/* City */}
        {city_name && citySlug && (
          <>
            <span>/</span>
            <li
              className="cursor-pointer text-blue-600 hover:underline"
              onClick={() => {
                // Doctor → city only
                if (profileType === "doctor") {
                  setLocationQuery(city_name);
                  setSearchQuery(null);
                  // navigate(`/${citySlug}`);
                  navigate(`/${citySlug}/doctors`);
                  return;
                }

                // Hospital / Clinic / Lab → city + type
                const typeSlug =
                  profileType === "hospital"
                    ? "hospitals"
                    : profileType === "clinic"
                    ? "clinics"
                    : "labs";

                setLocationQuery(city_name);
                setSearchQuery(typeSlug);
                navigate(`/${citySlug}/${typeSlug}`);
              }}
            >
              {city_name}
            </li>
          </>
        )}


        {/* Specialization (ONLY doctor) */}
        {profileType === "doctor" &&
          specialization_name &&
          specializationSlug && (
            <>
              <span>/</span>
              <li
                className="cursor-pointer text-blue-600 hover:underline"
                onClick={() => {
                  setLocationQuery(city_name);
                  setSearchQuery(specialization_name);
                  navigate(`/${citySlug}/${specializationSlug}`);
                }}
              >
                {specialization_name}
              </li>
            </>
          )}

        {/* Area */}
        {area_name && areaSlug && (
          <>
            <span>/</span>
            <li
              className="cursor-pointer text-blue-600 hover:underline"
              onClick={() => {
                // Doctor: /city/specialization/area
                if (profileType === "doctor" && specializationSlug) {
                  setLocationQuery(area_name);
                  setSearchQuery(specialization_name);
                  navigate(`/${citySlug}/${specializationSlug}/${areaSlug}`);
                }
                // Hospital / Clinic: /city/area
                // else {
                //   setLocationQuery(area_name);
                //   setSearchQuery(null);
                //   navigate(`/${citySlug}/${areaSlug}`);
                // }
                else {
                  const typeSlug =
                    profileType === "hospital"
                      ? "hospitals"
                      : profileType === "clinic"
                      ? "clinics"
                      : "labs";

                  setLocationQuery(city_name);   // 👈 ALWAYS CITY
                  setSearchQuery(typeSlug);      // 👈 TYPE ONLY

                  navigate(`/${citySlug}/${typeSlug}`);
                }

              }}
            >
              {area_name}
            </li>
          </>
        )}

        {/* Profile name (disabled) */}
        {name && (
          <>
            <span>/</span>
            <li className="text-gray-800 font-medium cursor-default">
              {name}
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default BreadcrumbNav;
