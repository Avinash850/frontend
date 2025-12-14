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
  const { setSelectedDetails, setProfileData, setHospitalData,mixedData, setMixedData, hospitalData,profileData,setClinicData, selectedLocation, validateLocation } = useContext(DoctorContext);
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


  const getDefaultSuggestions = (location_id) => {
    const text = query.toLowerCase();

    // if user types something similar to "doctor"
    if (["do", "doc", "doct", "doctor"].some((w) => "doctor".startsWith(text))) {
      return [
        {
          selectedLocation: selectedLocation || "Delhi",
          id: null,
          name: "Doctor",
          type: "doctor"
        }
      ];
    }

    return [];
  };


  // ✅ Prefill if doctor page is loaded directly via hash
  useEffect(() => {
    const hash = window.location.hash;
    const parts = hash.replace(/^#\/?/, "").split("/");
    console.log("parts:--->", parts)
    const type = parts?.[0]
    const doctorId = parts[1];
    const doctorName = parts[2] ? decodeURIComponent(parts[2]) : null;

    if (doctorId && doctorName) {
      setSelectedName(doctorName);
      setQuery(doctorName);

      if (!profileData || String(profileData.id) !== doctorId) {
        (async () => {
          try {
            const res = await getDoctorDetails({ id: doctorId, type, selectedLocation });
            if (res){
              const data = res.items[0];
              setProfileData(data);
              setHospitalData(data)
              setClinicData(data)
              setMixedData(res.related)
            } 
          } catch (err) {
            console.error("Prefill doctor fetch failed:", err);
          }
        })();
      }
    }
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

  const handleSearch = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/suggest?q=${query || ""}&location=${selectedLocation || 1}`
      );

      // ✅ If query is empty, only keep specializations
      if (!query.trim()) {
        setResults({
          doctors: [],
          hospitals: [],
          clinics: [],
          specializations: data?.specializations || [],
          services: [],
          procedures: [],
          symptoms: [],
        });
      } else {
        setResults({
          doctors: data?.doctors || [],
          hospitals: data?.hospitals || [],
          clinics: data?.clinics || [],
          specializations: data?.specializations || [],
          services: data?.services || [],
          procedures: data?.procedures || [],
          symptoms: data?.symptoms || [],
        });
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
    console.log({ id: item.id, type: item.type, selectedLocation })
    handleViewProfile({ id: item.id, type: item.type, selectedLocation });
  };

  const handleViewProfile = async (payload) => {
    try {
      const res = await getDoctorDetails(payload);
      console.log("res?.data::__>", res)
      if (res) {
        
        if(res.type === 'doctor' && res.meta.count === 1 && res.meta.single ){
          setProfileData(res.items[0]);
        const id = res.items[0].id;
        const type = payload.type;
        const nameSlug = encodeURIComponent(res.items[0].name);
          window.location.hash = `/${type}/${id}/${nameSlug}`;
        }

        if(res.type === 'hospital' && res.meta.count === 1 && res.meta.single ){
          setHospitalData(res.items[0]);
        const id = res.items[0].id;
        const type = payload.type;
        const nameSlug = encodeURIComponent(res.items[0].name);
          window.location.hash = `/${type}/${id}/${nameSlug}`;
        }
        if(res.type === 'clinic' && res.meta.count === 1 && res.meta.single ){
          setClinicData(res.items[0]);
        const id = res.items[0].id;
        const type = payload.type;
        const nameSlug = encodeURIComponent(res.items[0].name);
          window.location.hash = `/${type}/${id}/${nameSlug}`;
        }
        if(res.meta.single === false ){
        setMixedData(res.related)
        const id = payload.id;
        const type = payload.type;
        const location = payload.selectedLocation;
        console.log("spec pal-->", payload)
        const nameSlug = encodeURIComponent(location);
        console.log("${type}/${id}/${nameSlug}-->", `${type}/${id}/${nameSlug}`)
          window.location.hash = `/${type}/${id}/${nameSlug}`;
        }

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
            setSelectedName(null);
          }}

          // value={selectedName || query}
          // onFocus={(e) => {
          //   const isValid = validateLocation();
          //   if (!isValid) {
          //     e.target.blur(); // force focus back
          //     return;
          //   }
          //   setShowList(true);
          // }}
          // onChange={(e) => {
          //   const isValid = validateLocation();
          //   if (!isValid) return;

          //   setQuery(e.target.value);
          //   setSelectedName(null);
          // }}

          placeholder="Search for doctors, clinics, or specializations"
          className="flex-1 py-3 bg-transparent outline-none text-gray-700 placeholder-gray-400"
        />
      </div>

      {/* Dropdown */}
      {showList && (
        <div className="absolute top-14 left-0 right-0 bg-white border border-gray-200 rounded-2xl shadow-xl max-h-80 overflow-y-auto z-50">
          {isLoading ? (
            <div className="flex justify-center items-center py-6 text-gray-500">
              <ImSpinner2 className="animate-spin mr-2" /> Searching...
            </div>
          ) : !query.trim() ? (
            renderSection("Specializations", results.specializations, <FaUserMd />, "text-blue-500")
          ) : results.doctors.length ||
            results.hospitals.length ||
            results.clinics.length ||
            results.specializations.length ||
            results.services.length ||
            results.procedures.length ||
            results.symptoms.length ||
            getDefaultSuggestions().length ? (
            <>
              {renderSection("", getDefaultSuggestions(), <SearchIcon />, "text-blue-500")}

              {renderSection("Doctors", results.doctors, <FaUserMd />, "text-blue-500")}
              {renderSection("Hospitals", results.hospitals, <MdLocalHospital />, "text-red-500")}
              {renderSection("Clinics", results.clinics, <MdOutlineLocalPharmacy />, "text-green-500")}


              {renderSection("Specializations", results.specializations, <FaUserMd />, "text-purple-500")}
              {renderSection("Services", results.services, <MdOutlineLocalPharmacy />, "text-indigo-500")}
              {renderSection("Procedures", results.procedures, <MdOutlineLocalPharmacy />, "text-amber-500")}
              {renderSection("Symptoms", results.symptoms, <FaUserMd />, "text-rose-500")}
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
