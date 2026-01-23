import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import { FiSearch } from "react-icons/fi";
import { ImSpinner2 } from "react-icons/im";
import { FaUserMd } from "react-icons/fa";
import { MdLocalHospital, MdOutlineLocalPharmacy } from "react-icons/md";
import { DoctorContext } from "../../context/DoctorContextProvider";
import { useNavigate } from "react-router-dom";

const SearchBox = ({ disabled }) => {
  const navigate = useNavigate();
  const {
    selectedLocation,
    searchQuery,
    setSearchQuery,
    setSelectedLocation,
  } = useContext(DoctorContext);

  /* ===================== LOCAL UI STATE ===================== */
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showList, setShowList] = useState(false);
  const [userTyping, setUserTyping] = useState(false);

  const dropdownRef = useRef(null);

  /* =========================================================
     1️⃣ BREADCRUMB → SEARCH (ONE TIME ONLY)
     ========================================================= */
  useEffect(() => {
    if (!searchQuery) return;

    setQuery(searchQuery);
    setUserTyping(false);
    setShowList(false);

    // 🔑 prevent future overrides
    setSearchQuery(null);
  }, [searchQuery, setSearchQuery]);

  /* ===================== HELPERS ===================== */
  const getCitySlug = () => {
    if (!selectedLocation) return "delhi";

    if (typeof selectedLocation === "string") {
      return selectedLocation.toLowerCase().replace(/\s+/g, "-");
    }

    if (typeof selectedLocation === "object") {
      return (
        selectedLocation.slug ||
        selectedLocation.name?.toLowerCase().replace(/\s+/g, "-") ||
        "delhi"
      );
    }

    return "delhi";
  };

  /* ===================== CLOSE ON OUTSIDE CLICK ===================== */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowList(false);
        setUserTyping(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ===================== FETCH SUGGESTIONS (USER ONLY) ===================== */
  useEffect(() => {
    if (disabled) return;
    if (!userTyping) return;
    if (typeof query !== "string") return;
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }

    const timer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timer);
  }, [query, userTyping, disabled]);

  const fetchSuggestions = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/suggest`,
        { params: { q: query } }
      );
      setResults(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("❌ suggest error:", err);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

const handleSelect = (item) => {
  console.log("HANDLE SELECT FIRED", item);

  setQuery(item.name);
  setShowList(false);
  setUserTyping(false);

  const citySlug = getCitySlug(); // from selectedLocation (localStorage)

  // ✅ INTENT SEARCH (UNCHANGED)
  if (item.type === "intent") {
    navigate(`/${citySlug}/${item.slug}`);
    return;
  }

  // ✅ PROFILE TYPES → use entity city, NOT selectedLocation
  if (["doctor", "hospital", "clinic"].includes(item.type)) {
    const entityCitySlug = item.city_slug || citySlug;

    // sync localStorage + location UI to profile city
    if (item.city) {
       setSelectedLocation(item.city);  
      localStorage.setItem("selected_city", item.city);
    }

    navigate(`/${entityCitySlug}/${item.type}/${item.slug}`);
    return;
  }

  // ✅ SPECIALIZATION / SERVICE / SYMPTOM (unchanged)
  navigate(`/${citySlug}/${item.slug}`);
};




  const handleKeyDown = (e) => {
  if (e.key !== "Enter") return;
  if (!query.trim()) return;

  e.preventDefault();
  setShowList(false);
  setUserTyping(false);

  const citySlug = getCitySlug();
  const keyword = query.toLowerCase().trim();

  // 🔥 INTENT FIRST
  if (["do", "doc", "doctor", "doctors"].includes(keyword)) {
    navigate(`/${citySlug}/doctors`);
    return;
  }

  if (["hos", "hospital", "hospitals"].includes(keyword)) {
    navigate(`/${citySlug}/hospitals`);
    return;
  }

  if (["cli", "clinic", "clinics"].includes(keyword)) {
    navigate(`/${citySlug}/clinics`);
    return;
  }

  // fallback → keyword search
  navigate(`/${citySlug}/${keyword.replace(/\s+/g, "-")}`);
};


  /* ===================== RENDER HELPERS ===================== */
  const byType = (type) => results.filter((r) => r.type === type);

  const renderItem = (item, icon) => (
    <div
      key={`${item.type}-${item.slug}`}
      onClick={() => handleSelect(item)}
      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer"
    >
      {icon}
      <span>{item.name}</span>
    </div>
  );

//   const renderItem = (item, icon) => (
//   <div
//     key={`${item.type}-${item.slug}`}
//     onMouseDown={() => handleSelect(item)} // 🔥 FIX
//     className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer"
//   >
//     {icon}
//     <span>{item.name}</span>
//   </div>
// );


  const renderSection = (title, items, icon) => {
    if (!items.length) return null;
    return (
      <>
        <div className="px-4 py-2 text-sm font-semibold bg-gray-100">
          {title}
        </div>
        {items.map((item) => renderItem(item, icon))}
      </>
    );
  };

  /* ===================== UI ===================== */
  return (
    <div className="relative w-full md:max-w-lg mx-auto" ref={dropdownRef}>
      <div className="flex items-center bg-white border border-gray-300 rounded-full px-4">
        {isLoading ? (
          <ImSpinner2 className="animate-spin text-blue-500 mr-3" />
        ) : (
          <FiSearch className="text-gray-500 mr-3" size={18} />
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
          onKeyDown={handleKeyDown}
          placeholder="Search doctors, clinics, specializations"
          // className="flex-1 py-3 bg-transparent outline-none text-gray-700"
          className="flex-1 py-2.5 md:py-3 bg-transparent outline-none text-gray-700 text-sm md:text-base"
        />
      </div>

      {showList && (
        <div className="absolute top-14 left-0 right-0 bg-white border border-gray-200 rounded-2xl shadow-xl max-h-80 overflow-y-auto z-50">
          {isLoading ? (
            <div className="flex justify-center items-center py-6 text-gray-500">
              <ImSpinner2 className="animate-spin mr-2" /> Searching...
            </div>
          ) : (
            <>
             {renderSection("Search for", byType("intent"), <FiSearch />)}
              {renderSection("Specializations", byType("specialization"), <FaUserMd />)}
              {renderSection("Doctors", byType("doctor"), <FaUserMd />)}
              {renderSection("Hospitals", byType("hospital"), <MdLocalHospital />)}
              {renderSection("Clinics", byType("clinic"), <MdOutlineLocalPharmacy />)}
              {renderSection("Services", byType("service"), <MdOutlineLocalPharmacy />)}
              {renderSection("Symptoms", byType("symptom"), <FaUserMd />)}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBox;
