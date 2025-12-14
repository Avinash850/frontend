
import React from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import HeaderAdmin from "./HeaderAdmin";

const SidebarLayout: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname === path
      ? "bg-[#f15c53] text-white"
      : "text-slate-300 hover:bg-slate-800 hover:text-white";


  return (
    <div className="flex flex-col min-h-screen">
      <HeaderAdmin />

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-slate-900 p-5">
          <nav className="space-y-2">
            {[
              { path: "/admin/dashboard", label: "Dashboard", icon: "dashboard" },
              { path: "/admin/doctors", label: "Doctors", icon: "medical_services" },
              { path: "/admin/clinics", label: "Clinics", icon: "local_hospital" },
              { path: "/admin/hospitals", label: "Hospitals", icon: "apartment" },
              { path: "/admin/blogs", label: "Blogs", icon: "article" },
              { path: "/admin/posts", label: "Posts", icon: "post_add" },
              { path: "/admin/enquiry", label: "Enquiries", icon: "support_agent" },
              { path: "/admin/profile", label: "Profile", icon: "account_circle" },
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  block px-4 py-3 rounded-lg
                  transition-all duration-200
                  ${isActive(item.path)}
                `}
              >
                <span className="flex items-center gap-3">
                  <span className="material-icons text-[20px] leading-none">
                    {item.icon}
                  </span>
                  <span className="leading-none">{item.label}</span>
                </span>


              </Link>
            ))}
          </nav>
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-6 bg-slate-100">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default SidebarLayout;
