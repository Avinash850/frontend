import React, { useState } from "react";

interface SearchBarProps {
  initialLocation?: string;
  initialSpecialty?: string;
  onSearch?: (location: string, specialty: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  initialLocation = "",
  initialSpecialty = "",
  onSearch,
}) => {
  const [location, setLocation] = useState(initialLocation);
  const [specialty, setSpecialty] = useState(initialSpecialty);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(location, specialty);
    } else {
      window.location.hash = `#/search/${location}/${specialty}`;
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto my-6 px-4">
      <form
        className="flex flex-col md:flex-row gap-3"
        onSubmit={handleSubmit}
      >
        {/* Location Input */}
        <input
          type="text"
          className="flex-1 rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        {/* Specialty Input */}
        <input
          type="text"
          className="flex-1 rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search doctor, hospital, clinic"
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors w-full md:w-auto"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
