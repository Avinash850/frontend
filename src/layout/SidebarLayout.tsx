// src/layout/SidebarLayout.tsx
import React, { useState } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import HeaderAdmin from "./HeaderAdmin";

const SidebarLayout: React.FC = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);

  const isActive = (path: string) =>
    activeTab === path ? "bg-blue-500" : "text-red hover:bg-blue-200";

  return (
    <div className="flex flex-col min-h-screen">
      <HeaderAdmin />

      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-64 bg-gray-800 text-white p-5">
          <div className="space-y-4">
            <Link
              to="/admin/dashboard"
              className={`block py-2 px-4 rounded ${isActive("/admin/dashboard")}`}
              onClick={() => setActiveTab("/admin/dashboard")}
            >
              Dashboard
            </Link>
            <Link
              to="/admin/doctors"
              className={`block py-2 px-4 rounded ${isActive("/admin/doctors")}`}
              onClick={() => setActiveTab("/admin/doctors")}
            >
              Doctors
            </Link>
            <Link
              to="/admin/clinics"
              className={`block py-2 px-4 rounded ${isActive("/admin/clinics")}`}
              onClick={() => setActiveTab("/admin/clinics")}
            >
              Clinics
            </Link>
            <Link
              to="/admin/hospitals"
              className={`block py-2 px-4 rounded ${isActive("/admin/hospitals")}`}
              onClick={() => setActiveTab("/admin/hospitals")}
            >
              Hospitals
            </Link>
            <Link
              to="/admin/blogs"
              className={`block py-2 px-4 rounded ${isActive("/admin/blogs")}`}
              onClick={() => setActiveTab("/admin/blogs")}
            >
              Blogs
            </Link>
            <Link
              to="/admin/posts"
              className={`block py-2 px-4 rounded ${isActive("/admin/posts")}`}
              onClick={() => setActiveTab("/admin/posts")}
            >
              Posts
            </Link>
            <Link
              to="/admin/company"
              className={`block py-2 px-4 rounded ${isActive("/admin/company")}`}
              onClick={() => setActiveTab("/admin/company")}
            >
              Company
            </Link>
            <Link
              to="/admin/enquiry"
              className={`block py-2 px-4 rounded ${isActive("/admin/enquiry")}`}
              onClick={() => setActiveTab("/admin/enquiry")}
            >
              Enquiries
            </Link>
            <Link
              to="/admin/profile"
              className={`block py-2 px-4 rounded ${isActive("/admin/profile")}`}
              onClick={() => setActiveTab("/admin/profile")}
            >
              Profile
            </Link>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 bg-gray-100">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <Outlet /> {/* ✅ renders DoctorsAdminPage and other nested routes */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarLayout;
