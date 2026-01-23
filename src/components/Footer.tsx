import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSearchDiscover } from "../services/doctorsService";

const Footer = ({ city = "delhi" }) => {
  const navigate = useNavigate();

  const [discover, setDiscover] = useState({
    top_hospitals: [],
    top_doctors: [],
    top_services: [],
  });

  useEffect(() => {
    const fetchDiscover = async () => {
      try {
        const res = await getSearchDiscover({ city, limit: 8 });
        setDiscover(res || {});
      } catch (e) {
        console.error("Footer discover error", e);
      }
    };

    fetchDiscover();
  }, [city]);

  return (
    <footer className="bg-slate-800 text-white">

      {/* 🔹 MAIN FOOTER CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-12 border-b border-slate-700">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Top Hospitals */}
          <div>
            <h4 className="font-semibold mb-4">
              Top Hospitals in {city}
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              {discover.top_hospitals.slice(0, 8).map(h => (
                <li
                  key={h.id}
                  onClick={() =>
                    navigate(`/${city}/hospital/${h.slug}`)
                  }
                  className="cursor-pointer hover:text-white"
                >
                  {h.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Top Doctors */}
          <div>
            <h4 className="font-semibold mb-4">
              Top Doctors in {city}
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              {discover.top_doctors.slice(0, 8).map(d => (
                <li
                  key={d.id}
                  onClick={() =>
                    navigate(`/${city}/doctor/${d.slug}`)
                  }
                  className="cursor-pointer hover:text-white"
                >
                  Dr. {d.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Top Services */}
          <div>
            <h4 className="font-semibold mb-4">
              Top Services
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              {discover.top_services.slice(0, 8).map(s => (
                <li
                  key={s.id}
                  onClick={() =>
                    navigate(`/${city}/${s.slug}`)
                  }
                  className="cursor-pointer hover:text-white"
                >
                  {s.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Prega Journey + Social */}
          <div>
            <h3 className="font-bold text-lg mb-3">
              Prega Journey
            </h3>

            <p className="text-slate-400 text-sm mb-5">
              Your trusted partner in the journey to parenthood. We connect you
              with the best doctors and services to ensure you receive the care
              you deserve.
            </p>

            <h4 className="font-semibold mb-3">
              Follow Us
            </h4>

            <div className="flex space-x-4 text-slate-400 text-sm">
                <div className="flex space-x-4">
                    {/* Social Icons Placeholder */}
                    <a href="#" className="text-slate-400 hover:text-white"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.582 0 0 .582 0 1.305v21.39C0 23.418.582 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.742 0 1.325-.582 1.325-1.305V1.305C24 .582 23.418 0 22.675 0z" /></svg></a>
                    <a href="#" className="text-slate-400 hover:text-white"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z" /></svg></a>
                    <a href="#" className="text-slate-400 hover:text-white"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616v.064c0 2.295 1.634 4.208 3.801 4.649-.625.17-1.284.26-1.96.26-.305 0-.6-.03- .89-.083.609 1.882 2.373 3.256 4.478 3.3-1.623 1.276-3.673 2.032-5.894 2.032-.382 0-.76-.022-1.13-.066 2.099 1.35 4.596 2.138 7.283 2.138 8.736 0 13.51-7.243 13.51-13.51 0-.206-.005-.412-.013-.616.928-.67 1.729-1.5 2.368-2.454z" /></svg></a>
                {/* <a href="#" className="hover:text-white">Facebook</a> */}
                {/* <a href="#" className="hover:text-white">Instagram</a>
                <a href="#" className="hover:text-white">Twitter</a> */}
                </div>
          </div>

        </div>
      </div>
      </div>

      {/* 🔹 COPYRIGHT (UNCHANGED) */}
      <div className="py-6 text-center text-sm text-slate-400">
        <p>
          © {new Date().getFullYear()} Prega Journey. All rights reserved.
        </p>

        <div className="mt-3 space-x-6">
          <button
            onClick={() => navigate("/terms")}
            className="hover:text-white"
          >
            Terms of Service
          </button>
          <button
            onClick={() => navigate("/privacy")}
            className="hover:text-white"
          >
            Privacy Policy
          </button>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
