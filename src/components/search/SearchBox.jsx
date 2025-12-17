import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import { FiSearch } from "react-icons/fi";
import { ImSpinner2 } from "react-icons/im";
import { FaUserMd } from "react-icons/fa";
import { MdLocalHospital, MdOutlineLocalPharmacy } from "react-icons/md";
import { DoctorContext } from "../../context/DoctorContextProvider";
import { getDoctorDetails } from "../../services/doctorsService";
import { SearchIcon } from "../Icons";

const SearchBox = () => {
  const autoSelectRef = useRef(false);

  const {
    setSelectedDetails,
    setProfileData,
    setHospitalData,
    searchQuery,
    setMixedData,
    setSearchQuery,
    profileData,
    setClinicData,
    selectedLocation,
    validateLocation,
  } = useContext(DoctorContext);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState({
    doctors: [],
    hospitals: [],
    clinics: [],
    specializations: [],
    services: [],
    procedures: [],
    symptoms: [],
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showList, setShowList] = useState(false);
  const [selectedName, setSelectedName] = useState(null);
  const dropdownRef = useRef(null);

  const getDefaultSuggestions = () => {
    const text = query.toLowerCase();

    if (["do", "doc", "doct", "doctor"].some((w) => "doctor".startsWith(text))) {
      return [
        {
          selectedLocation: selectedLocation || "Delhi",
          id: null,
          name: "Doctor",
          type: "doctor",
        },
      ];
    }

    return [];
  };

  // useEffect(() =>{
  //   if(!searchQuery) return;

  //   setQuery(searchQuery)
  // }, [searchQuery])
  console.log("searchQuery---->", searchQuery)

useEffect(() => {
  const syncFromHash = () => {
    const hash = window.location.hash;
    const parts = hash.replace(/^#\/?/, "").split("/");
    const type = parts[0];
    const name = parts[2] ? decodeURIComponent(parts[2]) : null;

    if (!type) return;

    if (type === "doctor" && name) {
      setSelectedName(name);
      setQuery(name);
    }

    if (type === "specialization" && name) {
      setSelectedName(null);
      setQuery(name);
    }
  };

  syncFromHash();
  window.addEventListener("hashchange", syncFromHash);
  return () => window.removeEventListener("hashchange", syncFromHash);
}, []);

  // ✅ Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowList(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Debounced search
  useEffect(() => {
    const delay = setTimeout(() => {
      handleSearch();
    }, 400);
    return () => clearTimeout(delay);
  }, [query]);

  const findExactMatch = (query, results) => {
    if (!query) return null;

    const q = query.trim().toLowerCase();

    const allItems = [
      ...results.doctors,
      ...results.hospitals,
      ...results.clinics,
      ...results.specializations,
      ...results.services,
      ...results.procedures,
      ...results.symptoms,
    ];

    const matches = allItems.filter(
      (item) => item?.name?.trim().toLowerCase() === q
    );

    return matches.length === 1 ? matches[0] : null;
  };

  useEffect(() => {
  if (!searchQuery) return;

  setQuery(searchQuery);
  // setSelectedName(null); // ✅ remove old doctor name
  setShowList(true);

  autoSelectRef.current = true;
  handleSearch(searchQuery);
}, [searchQuery]);



  const handleSearch = async (overrideQuery = null) => {
    const effectiveQuery = overrideQuery ?? query;

    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/suggest?q=${effectiveQuery || ""}&location=${selectedLocation || 1}`
      );

      const newResults = !effectiveQuery.trim()
        ? {
            doctors: [],
            hospitals: [],
            clinics: [],
            specializations: data?.specializations || [],
            services: [],
            procedures: [],
            symptoms: [],
          }
        : {
            doctors: data?.doctors || [],
            hospitals: data?.hospitals || [],
            clinics: data?.clinics || [],
            specializations: data?.specializations || [],
            services: data?.services || [],
            procedures: data?.procedures || [],
            symptoms: data?.symptoms || [],
          };

      setResults(newResults);

      if (autoSelectRef.current && searchQuery) {
        const matchedItem = findExactMatch(searchQuery, newResults);
        if (matchedItem) {
          handleSelect(matchedItem);
        }
        autoSelectRef.current = false;
      }
    } catch (error) {
      console.error("handleSearch error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ When user selects a result
  const handleSelect = (item) => {
    setSelectedName(item.name);
    setQuery(item.name);
    setSelectedDetails({ id: item.id, type: item.type });
    setShowList(false);
    handleViewProfile({ id: item.id, type: item.type, selectedLocation });
  };

  const handleViewProfile = async (payload) => {
    try {
      const res = await getDoctorDetails(payload);

      if (!res) return;

      if (res.type === "doctor" && res.meta.count === 1 && res.meta.single) {
        setProfileData(res.items[0]);
        const id = res.items[0].id;
        const type = payload.type;
        const nameSlug = encodeURIComponent(res.items[0].name);
        window.location.hash = `/${type}/${id}/${nameSlug}`;

        setSearchQuery(null);
      }

      if (res.type === "hospital" && res.meta.count === 1 && res.meta.single) {
        setHospitalData(res.items[0]);
        const id = res.items[0].id;
        const type = payload.type;
        const nameSlug = encodeURIComponent(res.items[0].name);
        window.location.hash = `/${type}/${id}/${nameSlug}`;
        setSearchQuery(null);
      }

      if (res.type === "clinic" && res.meta.count === 1 && res.meta.single) {
        setClinicData(res.items[0]);
        const id = res.items[0].id;
        const type = payload.type;
        const nameSlug = encodeURIComponent(res.items[0].name);
        window.location.hash = `/${type}/${id}/${nameSlug}`;
        setSearchQuery(null);
      }

      if (res.meta.single === false) {
        setMixedData(res.related);
        const nameSlug = encodeURIComponent(query);
        window.location.hash = `/${payload.type}/${payload.id}/${nameSlug}`;
        // setSearchQuery(null);
      }
    } catch (error) {
      console.error("err->", error);
    }
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

  const renderSection = (title, items, icon, colorClass) => {
    if (!items.length) return null;
    return (
      <div className="mb-2">
        <div className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 rounded-t-lg">
          <span className={colorClass}>{icon}</span> {title}
        </div>
        <ul className="divide-y divide-gray-100">
          {items.map((item) => (
            <li
              key={`${item.type}-${item.id || item.name}`}
              onClick={() => handleSelect(item)}
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer transition-all"
            >
              {item.type === "doctor" && (
                <FaUserMd className="text-blue-500 text-lg" />
              )}
              {item.type === "clinic" && (
                <MdOutlineLocalPharmacy className="text-green-500 text-lg" />
              )}
              {item.type === "hospital" && (
                <MdLocalHospital className="text-red-500 text-lg" />
              )}
              <span className="text-gray-800 text-[15px]">
                {highlightText(item.name)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="relative w-full max-w-lg mx-auto" ref={dropdownRef}>
      <div className="flex items-center bg-white border border-gray-300 rounded-full shadow-sm px-4">
        {isLoading ? (
          <ImSpinner2 className="animate-spin text-blue-500 mr-3" />
        ) : (
          <FiSearch className="text-gray-500 mr-3" size={20} />
        )}
        <input
          type="text"
          value={query}
          onFocus={() => setShowList(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelectedName(null);
          }}
          placeholder="Search for doctors, clinics, or specializations"
          className="flex-1 py-3 bg-transparent outline-none text-gray-700"
        />
      </div>

      {showList && (
        <div className="absolute top-14 left-0 right-0 bg-white border border-gray-200 rounded-2xl shadow-xl max-h-80 overflow-y-auto z-50">
          {isLoading ? (
            <div className="flex justify-center items-center py-6 text-gray-500">
              <ImSpinner2 className="animate-spin mr-2" /> Searching...
            </div>
          ) : !query.trim() ? (
            renderSection(
              "Specializations",
              results.specializations,
              <FaUserMd />,
              "text-blue-500"
            )
          ) : (
            <>
              {renderSection(
                "",
                getDefaultSuggestions(),
                <SearchIcon />,
                "text-blue-500"
              )}
              {renderSection(
                "Doctors",
                results.doctors,
                <FaUserMd />,
                "text-blue-500"
              )}
              {renderSection(
                "Hospitals",
                results.hospitals,
                <MdLocalHospital />,
                "text-red-500"
              )}
              {renderSection(
                "Clinics",
                results.clinics,
                <MdOutlineLocalPharmacy />,
                "text-green-500"
              )}
              {renderSection(
                "Specializations",
                results.specializations,
                <FaUserMd />,
                "text-purple-500"
              )}
              {renderSection(
                "Services",
                results.services,
                <MdOutlineLocalPharmacy />,
                "text-indigo-500"
              )}
              {renderSection(
                "Procedures",
                results.procedures,
                <MdOutlineLocalPharmacy />,
                "text-amber-500"
              )}
              {renderSection(
                "Symptoms",
                results.symptoms,
                <FaUserMd />,
                "text-rose-500"
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBox;
