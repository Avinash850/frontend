import React from "react";

const ServiceCard = ({ title, description, image, onClick }) => (
  <div
    onClick={onClick}
    className="cursor-pointer bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden max-w-[320px] mx-auto"
  >
    {/* Image (VERTICAL / TALL) */}
    <div className="h-[220px] w-full">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover"
      />
    </div>

    {/* Content */}
    <div className="p-5">
      <h3 className="text-lg font-semibold text-slate-900 mb-1">
        {title}
      </h3>
      <p className="text-sm text-slate-600 leading-relaxed">
        {description}
      </p>
    </div>
  </div>
);

const Services = () => {
  const baseUrl = import.meta.env.VITE_FRONTEND_URL;

  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-slate-800 mb-12">
          Find Care Near You
        </h2>

        {/* PRACTO-LIKE CENTERED VERTICAL CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
          <ServiceCard
            title="Find a Doctor Near You"
            description="Book appointments with trusted and verified doctors."
            image="https://images.unsplash.com/photo-1586773860418-d37222d8fce3"
            onClick={() =>
              (window.location.href = `${baseUrl}/delhi/doctors`)
            }
          />

          <ServiceCard
            title="Find a Hospital Near You"
            description="Explore well-equipped hospitals and clinics around you."
            image="https://images.unsplash.com/photo-1586773860418-d37222d8fce3"
            onClick={() =>
              (window.location.href = `${baseUrl}/delhi/hospitals`)
            }
          />
        </div>
      </div>
    </section>
  );
};

export default Services;
