import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import { FiMapPin } from "react-icons/fi";
import { ImSpinner2 } from "react-icons/im";
import { MdLocationCity } from "react-icons/md";
import { DoctorContext } from "../../context/DoctorContextProvider";

const LocationSearch = ({ disabled }) => {
  const {
    selectedLocation,
    setSelectedLocation,
    locationError,
    locationQuery,
    setLocationQuery,
  } = useContext(DoctorContext);

  const [query, setQuery] = useState("");
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showList, setShowList] = useState(false);
  const [userTyping, setUserTyping] = useState(false);

  const dropdownRef = useRef(null);

  /* ===================== SYNC INPUT WITH CONTEXT ===================== */
  useEffect(() => {
    if (!userTyping && selectedLocation) {
      setQuery(selectedLocation);
    }
  }, [selectedLocation]);

  /* ===================== BREADCRUMB SUPPORT ===================== */
  useEffect(() => {
    if (!locationQuery) return;

    setQuery(locationQuery);
    setUserTyping(false);
    setShowList(false);
    setLocationQuery(null);
  }, [locationQuery, setLocationQuery]);

  /* ===================== CLOSE ON OUTSIDE CLICK ===================== */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowList(false);
        setUserTyping(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ===================== FETCH LOCATIONS ===================== */
  useEffect(() => {
    if (disabled) return;
    if (!userTyping) return;
    if (query.trim().length < 2) return;

    const timer = setTimeout(fetchLocations, 350);
    return () => clearTimeout(timer);
  }, [query, userTyping, disabled]);

  const fetchLocations = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/locations/suggest`,
        { params: { q: query } }
      );

      const results = data?.results || {};
      setLocations([...(results.areas || []), ...(results.cities || [])]);
    } catch (err) {
      console.error("❌ Location search error:", err);
      setLocations([]);
    } finally {
      setIsLoading(false);
    }
  };

  /* ===================== SELECT LOCATION ===================== */
  const handleSelect = (item) => {
    const cityName = item.name;

    setSelectedLocation(cityName);
    localStorage.setItem("selected_city", cityName);

    setQuery(cityName);
    setShowList(false);
    setUserTyping(false);
  };

  return (
    <div className="relative w-full max-w-md mx-auto" ref={dropdownRef}>
      <div
        className={`flex items-center bg-white border rounded-full shadow-sm px-4
        ${
          locationError
            ? "border-red-500 ring-2 ring-red-400"
            : "border-gray-300 focus-within:ring-2 focus-within:ring-blue-500"
        }`}
      >
        {isLoading ? (
          <ImSpinner2 className="animate-spin text-blue-500 mr-3" />
        ) : (
          <FiMapPin className="text-gray-500 mr-3" size={20} />
        )}

        <input
          type="text"
          value={query}
          disabled={disabled}
          onFocus={() => {
            setShowList(true);
            setUserTyping(true);
          }}
          onChange={(e) => {
            setQuery(e.target.value);
            setUserTyping(true);
            setShowList(true);
          }}
          placeholder="Search city or area"
          className="flex-1 py-3 bg-transparent outline-none text-gray-700"
        />
      </div>

      {showList && (
        <div className="absolute top-14 left-0 right-0 bg-white border border-gray-200 rounded-2xl shadow-xl max-h-80 overflow-y-auto z-50">
          {isLoading ? (
            <div className="flex justify-center items-center py-6 text-gray-500">
              <ImSpinner2 className="animate-spin mr-2" /> Searching...
            </div>
          ) : locations.length ? (
            <ul className="divide-y divide-gray-100">
              {locations.map((loc, index) => (
                <li
                  key={index}
                  onClick={() => handleSelect(loc)}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer"
                >
                  <MdLocationCity className="text-lg text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-800">{loc.name}</p>
                    <p className="text-sm text-gray-500">
                      {loc.location_level === "area"
                        ? `${loc.city}, ${loc.state}`
                        : loc.state}
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
