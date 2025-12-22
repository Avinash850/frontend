import React, { createContext, useState, ReactNode } from "react";
import { useEffect } from "react";

/* ===================== Types ===================== */

export interface Doctor {
  id: number;
  name: string;
  type: string;
}

interface DoctorContextType {
  /* ---------- Selected search item ---------- */
  selectedDetails: Doctor | null;
  setSelectedDetails: React.Dispatch<React.SetStateAction<Doctor | null>>;

  /* ---------- Doctor / Hospital / Clinic profiles ---------- */
  profileData: any;
  setProfileData: React.Dispatch<React.SetStateAction<any>>;

  hospitalData: any;
  setHospitalData: React.Dispatch<React.SetStateAction<any>>;

  clinicData: any;
  setClinicData: React.Dispatch<React.SetStateAction<any>>;

  mixedData: any;
  setMixedData: React.Dispatch<React.SetStateAction<any>>;

  selectedLocation: string | null;
  setSelectedLocation: React.Dispatch<React.SetStateAction<string | null>>;

  locationError: boolean;
  setLocationError: React.Dispatch<React.SetStateAction<boolean>>;
  validateLocation: () => boolean;

  locationQuery: string | null;
  setLocationQuery: React.Dispatch<React.SetStateAction<string | null>>;

  searchQuery: string | null;
  setSearchQuery: React.Dispatch<React.SetStateAction<string | null>>;
}

/* ===================== Context ===================== */

export const DoctorContext = createContext<DoctorContextType | undefined>(
  undefined
);

/* ===================== Provider ===================== */

interface DoctorContextProviderProps {
  children: ReactNode;
}

export default function DoctorContextProvider({
  children,
}: DoctorContextProviderProps) {
  /* ---------- Search selection ---------- */
  const [selectedDetails, setSelectedDetails] = useState<Doctor | null>(null);

  /* ---------- Profiles ---------- */
  const [profileData, setProfileData] = useState<any>(null);
  const [hospitalData, setHospitalData] = useState<any>(null);
  const [clinicData, setClinicData] = useState<any>(null);
  const [mixedData, setMixedData] = useState<any>(null);

  /* ---------- Location (ONLY for search pages) ---------- */
  const [selectedLocation, setSelectedLocation] = useState<string | null>("Delhi");
  const [locationError, setLocationError] = useState(false);

    useEffect(() => {
  // 1️⃣ If already stored → use it
  const savedLocation = localStorage.getItem("selected_city");
  if (savedLocation) {
    setSelectedLocation(savedLocation);
    return;
  }

  // 2️⃣ Try browser location (best effort)
  if (!navigator.geolocation) {
    setSelectedLocation("Delhi");
    localStorage.setItem("selected_city", "Delhi");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      try {
        const { latitude, longitude } = position.coords;

        // OPTIONAL: reverse geocoding (later)
        // For now → default to Delhi
        const detectedCity = "Delhi";

        setSelectedLocation(detectedCity);
        localStorage.setItem("selected_city", detectedCity);
      } catch {
        setSelectedLocation("Delhi");
        localStorage.setItem("selected_city", "Delhi");
      }
    },
    () => {
      // Permission denied / error
      setSelectedLocation("Delhi");
      localStorage.setItem("selected_city", "Delhi");
    }
  );
}, []);

  /* ---------- Breadcrumb triggers ---------- */
  const [locationQuery, setLocationQuery] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string | null>(null);

  /* ---------- Helpers ---------- */
  const validateLocation = () => {
    if (!selectedLocation) {
      setLocationError(true);
      return false;
    }
    setLocationError(false);
    return true;
  };

  /* ---------- IMPORTANT: NO URL LOGIC HERE ---------- */
  /*  rule:
     - Context is ONLY for search
     - Profiles must NOT depend on context
  */

  const value: DoctorContextType = {
    selectedDetails,
    setSelectedDetails,

    profileData,
    setProfileData,

    hospitalData,
    setHospitalData,

    clinicData,
    setClinicData,

    mixedData,
    setMixedData,

    selectedLocation,
    setSelectedLocation,

    locationError,
    setLocationError,
    validateLocation,

    locationQuery,
    setLocationQuery,

    searchQuery,
    setSearchQuery,
  };

  return (
    <DoctorContext.Provider value={value}>
      {children}
    </DoctorContext.Provider>
  );
}
