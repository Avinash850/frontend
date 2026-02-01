import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "./pages/HomePage";
import DoctorProfile from "./pages/DoctorProfilePage";
import HospitalProfile from "./pages/HospitalProfilePage";
import ClinicProfile from "./pages/ClinicProfilePage";
import MixedSearchResults from "./pages/MixedSearchResult";
import TermsPage from "./pages/TermsPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import LoginPage from "./pages/LoginPage";
import BlogListPage from "./pages/publicBlogs/BlogListPage";
import BlogDetailPage from "./pages/publicBlogs/BlogDetailPage";
import LabTest from "./pages/LabTestPage";
import VideoConsultPage from "./pages/VideoConsultPage";
import PrivateRoute from "./components/PrivateRoute";
import SidebarLayout from "./layout/SidebarLayout";
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import DoctorsAdminPage from "./pages/admin/DoctorsAdminPage";
import EnquiryAdminPage from "./pages/admin/EnquiryAdminPage";
import HospitalsAdminPage from "./pages/admin/HospitalsAdminPage";
import PostsAdminPage from "./pages/admin/PostsAdminPage";
import UsersAdminPage from "./pages/admin/UsersAdminPage";
import BlogsAdminPage from "./pages/admin/BlogsAdminPage";
import ClinicsAdminPage from "./pages/admin/ClinicsAdminPage";
import CompanyAdminPage from "./pages/admin/CompanyAdminPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import About from "./pages/About";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* ===================== AUTH ===================== */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />



         {/* ===================== ADMIN (PROTECTED) ===================== */}
        <Route element={<PrivateRoute />}>
          <Route path="/admin" element={<SidebarLayout />}>
            <Route index element={<DashboardAdmin />} />
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

        {/* ===================== STATIC ===================== */}
        <Route path="/terms" element={<Layout><TermsPage /></Layout>} />
        <Route path="/privacy" element={<Layout><PrivacyPolicyPage /></Layout>} />
        <Route path="/blogs" element={<Layout><BlogListPage /></Layout>} />
        <Route path="/blogs/:slug" element={<Layout><BlogDetailPage /></Layout>} />
        <Route path="/video-consult" element={<Layout><VideoConsultPage /></Layout>} />
        <Route path="/lab-tests" element={<Layout><LabTest /></Layout>} />
        <Route path="/about" element={<Layout><About /></Layout>} />

        {/* ===================== PROFILES (MOST SPECIFIC) ===================== */}
        <Route path="/:city/doctor/:slug" element={<Layout><DoctorProfile /></Layout>} />
        <Route path="/:city/hospital/:slug" element={<Layout><HospitalProfile /></Layout>} />
        <Route path="/:city/clinic/:slug" element={<Layout><ClinicProfile /></Layout>} />

        {/* ===================== SEARCH LISTINGS ===================== */}

        {/* Area + keyword */}
        <Route
          path="/:city/:keyword/:area"
          element={
            <Layout>
              <MixedSearchResults />
            </Layout>
          }
        />

        {/* Keyword only */}
        <Route
          path="/:city/:keyword"
          element={
            <Layout>
              <MixedSearchResults />
            </Layout>
          }
        />

        {/* City only (🔥 THIS WAS MISSING BEFORE) */}
        <Route
          path="/:city"
          element={
            <Layout>
              <MixedSearchResults />
            </Layout>
          }
        />

        {/* ===================== HOME (LEAST SPECIFIC) ===================== */}
        <Route path="/" element={<Layout><HomePage /></Layout>} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
