import React, { createContext, useState, ReactNode } from "react";

// Optional: define Doctor type
export interface Doctor {
  id: number;
  name: string;
  type: string;
}

// Context type
interface DoctorContextType {
  selectedDetails: Doctor | null;
  setSelectedDetails: React.Dispatch<React.SetStateAction<Doctor | null>>;

  profileData: Doctor | {};
  setProfileData: React.Dispatch<React.SetStateAction<Doctor | {}>>;
}


// Create context
export const DoctorContext = createContext<DoctorContextType | undefined>(undefined);

// Props type
interface DoctorContextProviderProps {
  children: ReactNode;
}

// Provider component
export default function DoctorContextProvider({ children }: DoctorContextProviderProps) {
  const [selectedDetails, setSelectedDetails] = useState<Doctor | null>(null);
  const [profileData, setProfileData] = useState<Doctor | {}>({});

const value = { selectedDetails, setSelectedDetails , profileData, setProfileData}
  return (
    <DoctorContext.Provider value={value}>
      {children}
    </DoctorContext.Provider>
  );
}
