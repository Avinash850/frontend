import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import { FiMapPin, FiSearch } from "react-icons/fi";
import { ImSpinner2 } from "react-icons/im";
import { MdLocationCity } from "react-icons/md";
import { DoctorContext } from "../../context/DoctorContextProvider";

const LocationSearch = () => {
  const { setSelectedLocation,
    locationError,
    setLocationError, locationQuery, setLocationQuery} = useContext(DoctorContext);
  const [query, setQuery] = useState("Delhi");
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showList, setShowList] = useState(false);
  const dropdownRef = useRef(null);


useEffect(() => {
  if (!locationQuery) return;

  setQuery(locationQuery);
  handleSearch();
  setLocationQuery(null)
}, [locationQuery]);

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowList(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Fetch default list on mount (optional)
  useEffect(() => {
    handleSearch();
  }, []);

  // ✅ Debounce typing
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (query.trim().length >= 0) handleSearch();
    }, 400);
    return () => clearTimeout(timeout);
  }, [query]);

  const handleSearch = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/locations/suggest?q=${query}`
      );
      setLocations(data?.results || []);
      //   setShowList(true);
    } catch (err) {
      console.error("❌ handleSearch:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelect = (item) => {
  setSelectedLocation(item?.id || "Delhi");
  setQuery(item.name);
  // setLocationError(false);
  setShowList(false);
};


  const highlightText = (text) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    return text.split(regex).map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={i} className="font-semibold text-blue-600">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="relative w-full max-w-md mx-auto" ref={dropdownRef}>
      {/* Input Box */}
      <div 
      // className="flex items-center bg-white border border-gray-300 rounded-full shadow-sm focus-within:ring-2 focus-within:ring-blue-500 transition-all duration-200 px-4"
      className={`flex items-center bg-white border rounded-full shadow-sm px-4
      ${locationError ? "border-red-500 ring-2 ring-red-400" : "border-gray-300 focus-within:ring-2 focus-within:ring-blue-500"}
    `}
      >
        {isLoading ? (
          <ImSpinner2 className="animate-spin text-blue-500 mr-3" />
        ) : (
          <FiMapPin className="text-gray-500 mr-3" size={20} />
        )}
        <input
          type="text"
          value={query}
          onFocus={() => setShowList(true)}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search city, area or locality"
          className="flex-1 py-3 bg-transparent outline-none text-gray-700 placeholder-gray-400 required"
        />
      </div>

       {/* Tooltip / Error */}
        {/* {locationError && (
          <p className="absolute left-4 top-[52px] text-sm text-red-500">
            Please select a location
          </p>
        )} */}

      {/* Dropdown */}
      {showList && (
        <div className="absolute top-14 left-0 right-0 bg-white border border-gray-200 rounded-2xl shadow-xl max-h-80 overflow-y-auto z-50">
          {isLoading ? (
            <div className="flex justify-center items-center py-6 text-gray-500">
              <ImSpinner2 className="animate-spin mr-2" /> Searching...
            </div>
          ) : locations.length > 0 ? (
            <ul className="divide-y divide-gray-100">
              {locations.map((loc, ind) => (
                <li
                  key={ind}
                  onClick={() => handleSelect(loc)}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer transition-all"
                >
                  <MdLocationCity className="text-blue-500 text-lg" />
                  <div className="flex w-full flex-col text-left">
                    <p className="text-gray-800 text-[15px] font-medium">
                      {highlightText(loc.name)}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {loc.city}, {loc.state}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="py-6 text-center text-gray-500">
              No locations found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LocationSearch;
