import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import SearchLayout from "./layout/SearchLayout"; // ✅ new wrapper for pages with search bar

import HomePage from "./pages/HomePage";
import DoctorsPage from "./pages/DoctorsPage";
import SearchResultsPage from "./pages/SearchResultsPage";
import DoctorProfilePage from "./pages/DoctorProfilePage";
import TermsPage from "./pages/TermsPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";

const App = () => {
  const [route, setRoute] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => setRoute(window.location.hash);
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const renderPage = () => {
    // Clean up hash -> remove "#" or "#/"
    const cleaned = route.replace(/^#\/?/, "");
    const path = cleaned.split("/"); // e.g. ["search", "mumbai", "cardiologist"]

    const base = path[0]; // first part of route

    switch (base) {
      case "search":
        if (path[1] && path[2]) {
          const location = decodeURIComponent(path[1]);
          const specialty = decodeURIComponent(path[2]);
          return (
            <SearchLayout initialLocation={location} initialSpecialty={specialty}>
              <SearchResultsPage location={location} specialty={specialty} />
            </SearchLayout>
          );
        }
        return (
          <Layout>
            <HomePage />
          </Layout>
        );

      case "doctor":
        if (path[1]) {
          const slug = decodeURIComponent(path[1]);
          return (
            <SearchLayout>
              <DoctorProfilePage slug={slug} />
            </SearchLayout>
          );
        }
        break;

      case "doctors":
        return (
          <SearchLayout>
            <DoctorsPage />
          </SearchLayout>
        );

      case "terms":
        return (
          <Layout>
            <TermsPage />
          </Layout>
        );

      case "privacy":
        return (
          <Layout>
            <PrivacyPolicyPage />
          </Layout>
        );

      case "":
      default:
        return (
          <Layout>
            <HomePage />
          </Layout>
        );
    }
  };

  return renderPage();
};

export default App;
