import React from "react";
import { useLoader } from "../context/LoaderContext";

const GlobalLoader = () => {
  const { loading } = useLoader();

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40">
      <div className="bg-white px-6 py-4 rounded shadow text-lg font-medium">
        Loading...
      </div>
    </div>
  );
};

export default GlobalLoader;
