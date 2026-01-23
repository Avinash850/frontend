import React from "react";
import { HeroSearch } from "./HeroSearch";
import doctor from "../assets/images/doctor.jpg"
import hospital from "../assets/images/hospital.jpg"

const ServiceCard = ({ title, description, image, onClick }) => (
  <div
    onClick={onClick}
    className="cursor-pointer bg-white rounded-lg shadow-sm hover:shadow-md transition overflow-hidden w-[240px]"
  >
    {/* VERTICAL IMAGE */}
    <div className="h-[225px] w-full">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover"
      />
    </div>

    <div className="p-4">
      <h3 className="text-sm font-medium text-slate-800">
        {title}
      </h3>
      <p className="text-xs text-slate-600 mt-1">
        {description}
      </p>
    </div>
  </div>
);

const Hero = () => {
  const baseUrl = import.meta.env.VITE_FRONTEND_URL;

  return (
    <section className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-pink-100">
      <div className="container mx-auto px-6">

        {/* HEADING – MOVED UP */}
        <div className="text-center max-w-3xl mx-auto pt-14 mb-6">
          <h1 className="text-xl md:text-2xl font-medium text-slate-800">
            Your Journey to{" "}
            <span className="text-indigo-600">Parenthood</span>, Guided with Care
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Search and book trusted pregnancy care near you
          </p>
        </div>

        {/* SEARCH */}
        <div className="max-w-3xl mx-auto">
          <HeroSearch />
        </div>

      {/* GAP BETWEEN SEARCH & CARDS – MADE VISIBLE */}
      <div className="mt-20 flex justify-center gap-6">

        <ServiceCard
          title="Find a Doctor Near You"
          description="Verified doctors near you"
          image={doctor}
          onClick={() =>
            (window.location.href = `${baseUrl}/delhi/doctors`)
          }
        />

        <ServiceCard
          title="Find a Hospital Near You"
          description="Trusted hospitals & clinics"
          image={hospital}
          onClick={() =>
            (window.location.href = `${baseUrl}/delhi/hospitals`)
          }
        />

      </div>
      </div>
    </section>
  );
};

export default Hero;
