import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const HeaderAdmin = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleProfile = () => {
    setOpen(false);
    navigate("/admin/profile");
  };

  const handleLogout = () => {
    // ✅ Clear everything from localStorage
    localStorage.clear();

    // ✅ Optional: also clear sessionStorage
    sessionStorage.clear();

    // ✅ Close dropdown
    setOpen(false);

    // ✅ Redirect (change later if needed)
    navigate("/");
  };

  return (
    <header className="bg-gray-800 border-b border-white text-white px-8 py-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Prega Journey</h2>

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setOpen((v) => !v)}
            className="p-2 rounded-full hover:bg-gray-700 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </button>

          {open && (
            <div className="absolute right-0 mt-3 w-44 rounded-xl bg-white text-gray-800 shadow-xl overflow-hidden">
              <button
                onClick={handleProfile}
                className="w-full px-4 py-3 text-left hover:bg-gray-100 transition"
              >
                👤 Profile
              </button>

              <button
                onClick={handleLogout}
                className="w-full px-4 py-3 text-left text-red-600 hover:bg-red-50 transition"
              >
                🚪 Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderAdmin;
