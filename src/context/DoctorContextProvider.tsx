import React, { createContext, useState, ReactNode } from "react";

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

  /* ---------- Location ---------- */
  selectedLocation: string | number | null;
  setSelectedLocation: React.Dispatch<React.SetStateAction<string | number | null>>;

  locationError: boolean;
  setLocationError: React.Dispatch<React.SetStateAction<boolean>>;
  validateLocation: () => boolean;

  /* ---------- Breadcrumb → Search EVENTS ---------- */
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

  /* ---------- Profile data ---------- */
  const [profileData, setProfileData] = useState<any>(null);
  const [hospitalData, setHospitalData] = useState<any>(null);
  const [clinicData, setClinicData] = useState<any>(null);
  const [mixedData, setMixedData] = useState<any>(null);

  /* ---------- Location ---------- */
  const [selectedLocation, setSelectedLocation] = useState<
    string | number | null
  >(null);

  const [locationError, setLocationError] = useState(false);

  /* ---------- Breadcrumb EVENTS ---------- */
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

  /* ---------- Context value ---------- */
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
