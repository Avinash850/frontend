// src/layout/SearchLayout.tsx
import React from "react";
import Layout from "../Layout";                 // adjust path if Layout is elsewhere
import SearchBar from "../components/SearchBar"; // your shared SearchBar

interface SearchLayoutProps {
  children: React.ReactNode;
  initialLocation?: string;
  initialSpecialty?: string;
}

const SearchLayout: React.FC<SearchLayoutProps> = ({
  children,
  initialLocation = "",
  initialSpecialty = "",
}) => {
  return (
    <Layout>
      {/* pass initial values to the shared SearchBar (it should accept these props) */}
      <SearchBar
        initialLocation={initialLocation}
        initialSpecialty={initialSpecialty}
      />
      <div className="page-content">{children}</div>
    </Layout>
  );
};

export default SearchLayout;
