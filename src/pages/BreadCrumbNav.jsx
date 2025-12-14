import React, { useContext } from "react";
import { DoctorContext } from "../context/DoctorContextProvider";

const BreadcrumbNav = ({ profileData }) => {
  // const {setAutoSelectQuery } = useContext(DoctorContext)
  const { state_name, specialization_name, area_name, name  } = profileData;

  const {
    setLocationQuery,
    setSearchQuery,
    setSelectedLocation,
  } = useContext(DoctorContext);

  const handleLocationClick = (locationValue) => {
  setLocationQuery(locationValue);
  setSelectedLocation(locationValue);

  // if (specialization_name) {
  //   setAutoSelectQuery(specialization_name);
  // }
};



  // const handleLocationClick = (locationValue) => {
  //   setLocationQuery(locationValue);
  //   setSelectedLocation(locationValue);

  //   if (specialization_name) {
  //     setSearchQuery(specialization_name);
  //   }
  // };

  const handleSearchClick = (value) => {
    setSearchQuery(value);
  };

  return (
    <nav className="text-sm text-gray-600 mb-4">
      <ul className="flex flex-wrap gap-2 items-center">
        <li
          className="cursor-pointer text-blue-600 hover:underline"
          onClick={() => (window.location.hash = "/")}
        >
          Home
        </li>

        {state_name && (
          <>
            <span>/</span>
            <li
              className="cursor-pointer text-blue-600 hover:underline"
              onClick={() => handleLocationClick(state_name)}
            >
              {state_name}
            </li>
          </>
        )}

        {specialization_name && (
          <>
            <span>/</span>
            <li
              className="cursor-pointer text-blue-600 hover:underline"
              onClick={() => handleSearchClick(specialization_name)}
            >
              {specialization_name}
            </li>
          </>
        )}

        {area_name && (
          <>
            <span>/</span>
            <li
              className="cursor-pointer text-blue-600 hover:underline"
              onClick={() => handleLocationClick(area_name)}
            >
              {area_name}
            </li>
          </>
        )}

        {name && (
          <>
            <span>/</span>
            <li className="text-gray-800 font-medium">{name}</li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default BreadcrumbNav;
