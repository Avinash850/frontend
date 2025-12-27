import React, { createContext, useState, ReactNode, useEffect } from "react";

/* ===================== Types ===================== */

export interface Doctor {
  id: number;
  name: string;
  type: string;
}

interface DoctorContextType {
  selectedDetails: Doctor | null;
  setSelectedDetails: React.Dispatch<React.SetStateAction<Doctor | null>>;

  profileData: any;
  setProfileData: React.Dispatch<React.SetStateAction<any>>;

  hospitalData: any;
  setHospitalData: React.Dispatch<React.SetStateAction<any>>;

  clinicData: any;
  setClinicData: React.Dispatch<React.SetStateAction<any>>;

  mixedData: any;
  setMixedData: React.Dispatch<React.SetStateAction<any>>;

  /* 🔑 CITY NAME ONLY */
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
  const [selectedDetails, setSelectedDetails] = useState<Doctor | null>(null);

  const [profileData, setProfileData] = useState<any>(null);
  const [hospitalData, setHospitalData] = useState<any>(null);
  const [clinicData, setClinicData] = useState<any>(null);
  const [mixedData, setMixedData] = useState<any>(null);

  /* 🔥 IMPORTANT: start with NULL, not Delhi */
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [locationError, setLocationError] = useState(false);

  /* ===================== LOAD SAVED CITY (ONCE) ===================== */
  useEffect(() => {
    const savedCity = localStorage.getItem("selected_city");

    if (savedCity) {
      setSelectedLocation(savedCity);
    } else {
      setSelectedLocation("Delhi"); // default ONLY first time
      localStorage.setItem("selected_city", "Delhi");
    }
  }, []);

  const [locationQuery, setLocationQuery] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string | null>(null);

  const validateLocation = () => {
    if (!selectedLocation) {
      setLocationError(true);
      return false;
    }
    setLocationError(false);
    return true;
  };

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
