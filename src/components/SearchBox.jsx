import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import { FiSearch } from "react-icons/fi";
import { ImSpinner2 } from "react-icons/im";
import { FaUserMd } from "react-icons/fa";
import { MdLocalHospital, MdOutlineLocalPharmacy } from "react-icons/md";
import { DoctorContext } from "../context/DoctorContextProvider";
import { getDoctorDetails } from "../services/doctorsService";

const SearchBox = () => {
  const { setSelectedDetails , selectedDetails, setProfileData} = useContext(DoctorContext);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState({ doctors: [], clinics: [], hospitals: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [showList, setShowList] = useState(false);
  const [selectedName, setSelectedName] = useState(null);
  const [selectedPayload, setSelectedPayload] = useState(null); // 👈 store payload here
  const dropdownRef = useRef(null);

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowList(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Debounce search on typing
  useEffect(() => {
    const delay = setTimeout(() => {
      // 👇 only call search if user typed and NOT after selecting
      if (query && query.trim().length > 1 && !selectedName) {
        handleSearch();
      } else if (query.trim().length === 0) {
        // show default suggest list if input cleared
        handleSearch();
      }
    }, 400);

    return () => clearTimeout(delay);
  }, [query]);

  // ✅ Initial load (default suggestions)
  useEffect(() => {
    handleSearch();
  }, []);

  const handleSearch = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/suggest?q=${query || ""}`);
      setResults(data || { doctors: [], clinics: [], hospitals: [] });
    } catch (error) {
      console.error("handleSearch error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ When user selects a suggestion
  const handleSelect = (item) => {
    setSelectedName(item.name);
    setSelectedDetails({ id: item.id, type: item.type });
    setShowList(false);

    console.log("Selected payload →", { id: item.id, type: item.type });
    handleViewProfile({ id: item.id, type: item.type })

    // 👉 here you can call another API with selectedPayload
    // fetchDoctorDetails({ id: item.id, type: item.type });
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

  const handleViewProfile = async(payl) => {
    try {
      console.log("paylll->", payl)
      const res = await getDoctorDetails(payl)
      if(res?.data){
        setProfileData(res.data)
        const slugOrId = res.data.name || res.data.id;
        window.location.hash = `/doctor/${slugOrId}`;
      }
      console.log("ofjsfj:", res)
    } catch (error) {
     console.log("err->", error) 
    }
  }

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
              key={`${item.type}-${item.id}`}
              onClick={() => handleSelect(item)}
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer transition-all"
            >
              {item.type === "doctor" && <FaUserMd className="text-blue-500 text-lg" />}
              {item.type === "clinic" && <MdOutlineLocalPharmacy className="text-green-500 text-lg" />}
              {item.type === "hospital" && <MdLocalHospital className="text-red-500 text-lg" />}
              <span className="text-gray-800 text-[15px]">{highlightText(item.name)}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="relative w-full max-w-lg mx-auto" ref={dropdownRef}>
      {/* Search Input */}
      <div className="flex items-center bg-white border border-gray-300 rounded-full shadow-sm focus-within:ring-2 focus-within:ring-blue-500 transition-all duration-200 px-4">
        {isLoading ? (
          <ImSpinner2 className="animate-spin text-blue-500 mr-3" />
        ) : (
          <FiSearch className="text-gray-500 mr-3" size={20} />
        )}
        <input
          type="text"
          value={selectedName || query}
          onFocus={() => setShowList(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelectedName(null); // reset selected name to enable search again
          }}
          placeholder="Search for doctors, clinics or hospitals"
          className="flex-1 py-3 bg-transparent outline-none text-gray-700 placeholder-gray-400"
        />
      </div>

      {/* Dropdown List */}
      {showList && (
        <div className="absolute top-14 left-0 right-0 bg-white border border-gray-200 rounded-2xl shadow-xl max-h-80 overflow-y-auto z-50">
          {isLoading ? (
            <div className="flex justify-center items-center py-6 text-gray-500">
              <ImSpinner2 className="animate-spin mr-2" /> Searching...
            </div>
          ) : results.doctors.length || results.hospitals.length || results.clinics.length ? (
            <>
              {renderSection("Doctors", results.doctors, <FaUserMd />, "text-blue-500")}
              {renderSection("Hospitals", results.hospitals, <MdLocalHospital />, "text-red-500")}
              {renderSection("Clinics", results.clinics, <MdOutlineLocalPharmacy />, "text-green-500")}
            </>
          ) : (
            <div className="py-6 text-center text-gray-500">No matches found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBox;
