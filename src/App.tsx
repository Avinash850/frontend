import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import SearchLayout from "./layout/SearchLayout";
import HomePage from "./pages/HomePage";
import DoctorsPage from "./pages/DoctorsPage";
import SearchResultsPage from "./pages/SearchResultsPage";
import DoctorProfilePage from "./pages/DoctorProfilePage";
import TermsPage from "./pages/TermsPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import DoctorProfile from "./pages/DoctorProfilePage";
// import BlogPage from "./pages/BlogPage";
import BlogListPage from "./pages/publicBlogs/BlogListPage";
import BlogDetailPage from "./pages/publicBlogs/BlogDetailPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from "./pages/LoginPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SidebarLayout from "./layout/SidebarLayout";
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import DoctorsAdminPage from "./pages/admin/DoctorsAdminPage";
import ClinicsAdminPage from "./pages/admin/ClinicsAdminPage";
import HospitalsAdminPage from "./pages/admin/HospitalsAdminPage";
import BlogsAdminPage from "./pages/admin/BlogsAdminPage";
import EnquiryAdminPage from "./pages/admin/EnquiryAdminPage";
import UsersAdminPage from "./pages/admin/UsersAdminPage";
import CompanyAdminPage from "./pages/admin/CompanyAdminPage";
import PrivateRoute from "./components/PrivateRoute";
import PostsAdminPage from "./pages/admin/PostsAdminPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import LabTest from "./pages/LabTestPage";
import VideoConsultPage from "./pages/VideoConsultPage";
import HospitalProfile from "./pages/HospitalProfilePage";
import ClinicProfile from "./pages/ClinicProfilePage";
import MixedSearchResults from "./pages/MixedSearchResult";


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
    const path = cleaned.split("/");

    const base = path[0];

    switch (base) {
      case "search":
        if (path[1] && path[2]) {
          const location = decodeURIComponent(path[1]);
          const specialty = decodeURIComponent(path[2]);
          return (
            <SearchLayout
              initialLocation={location}
              initialSpecialty={specialty}
            >
              <SearchResultsPage
                location={location}
                specialty={specialty}
              />
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
            // <SearchLayout>
            <Layout>

              <DoctorProfile />
            </Layout>
            // </SearchLayout>
          );
        }

        case "hospital":
        if (path[1]) {
          const slug = decodeURIComponent(path[1]);
          return (
            // <SearchLayout>
            <Layout>

              <HospitalProfile />
            </Layout>
            // </SearchLayout>
          );
        }
        case "clinic":
        if (path[1]) {
          const slug = decodeURIComponent(path[1]);
          return (
            // <SearchLayout>
            <Layout>

              <ClinicProfile />
            </Layout>
            // </SearchLayout>
          );
        }
        case "specialization":
        if (path[1]) {
          const slug = decodeURIComponent(path[1]);
          return (
            // <SearchLayout>
            <Layout>
              <MixedSearchResults />
            </Layout>
            // </SearchLayout>
          );
        }
        break;

      case "doctors":
        return (
          <Layout>
            <DoctorsPage />
          </Layout>
        );

      case "video-consult":
        return (
          <Layout>
            <VideoConsultPage />
          </Layout>
        );
      case "lab-tests":
        return (
          <Layout>
            <LabTest />
          </Layout>
        );

      case "terms":
        return (
          <Layout>
            <TermsPage />
          </Layout>
        );

      case "blogs":
        if (path[1]) {
          const slug = decodeURIComponent(path[1]);
          return (
            <Layout>
              <BlogDetailPage slug={slug} />
            </Layout>
          );
        }

        // Blog listing: #/blogs
        return (
          <Layout>
            <BlogListPage />
          </Layout>
        );

      case "privacy":
        return (
          <Layout>
            <PrivacyPolicyPage />
          </Layout>
        );

      case "login":
        return <LoginPage />;

      case "":
      default:
        return (
          <Layout>
            <HomePage />
          </Layout>
        );
    }
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* ✅ Admin routes — only open after login */}
        <Route element={<PrivateRoute />}>
          {/* Moved admin routes under /admin for clarity */}
          <Route path="/admin" element={<SidebarLayout />}>
            <Route index element={<DashboardAdmin />} /> {/* /admin */}
            <Route path="dashboard" element={<DashboardAdmin />} />
            <Route path="doctors" element={<DoctorsAdminPage />} />
            <Route path="clinics" element={<ClinicsAdminPage />} />
            <Route path="hospitals" element={<HospitalsAdminPage />} />
            <Route path="blogs" element={<BlogsAdminPage />} />
            <Route path="profile" element={<UsersAdminPage />} />
            <Route path="enquiry" element={<EnquiryAdminPage />} />
            <Route path="posts" element={<PostsAdminPage />} />
            <Route path="company" element={<CompanyAdminPage />} />
          </Route>
        </Route>

        {/* Default Route (uses your hash routing logic) */}
        <Route path="*" element={renderPage()} />
      </Routes>
    </Router>
  );
};

export default App;
