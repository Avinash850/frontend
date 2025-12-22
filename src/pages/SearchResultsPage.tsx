import React, { useEffect, useState } from "react";

/* ---------------- Doctor Card ---------------- */
const DoctorResultCard = ({ doctor, citySlug }) => {
  return (
    <div className="bg-white p-5 rounded-lg shadow-sm mb-6 flex flex-col sm:flex-row">
      <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-5 text-center">
        <img
          src={doctor.image_url || "/default-doctor.png"}
          alt={doctor.name}
          className="w-24 h-24 rounded-full mx-auto object-cover"
        />
      </div>

      <div className="flex-grow">
        <h3 className="text-xl font-bold text-indigo-600 hover:underline">
          <a href={`#/${citySlug}/doctor/${doctor.slug}`}>
            {doctor.name}
          </a>
        </h3>

        {doctor.specialization_name && (
          <p className="text-slate-600">{doctor.specialization_name}</p>
        )}

        {doctor.experience_years && (
          <p className="text-slate-500 text-sm mt-1">
            {doctor.experience_years} years experience overall
          </p>
        )}

        <div className="my-3 text-sm">
          <p className="font-semibold">
            {doctor.area_name}, {doctor.city_name}
          </p>

          {doctor.consultation_fee > 0 && (
            <p className="mt-1">
              <span className="font-semibold">
                ₹{doctor.consultation_fee}
              </span>{" "}
              Consultation fee
            </p>
          )}
        </div>
      </div>

      <div className="flex-shrink-0 mt-4 sm:mt-0 sm:ml-5 flex items-center">
        <a
          href={`#/${citySlug}/doctor/${doctor.slug}`}
          className="bg-indigo-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-indigo-700 transition"
        >
          Book Appointment
        </a>
      </div>
    </div>
  );
};

/* ---------------- Search Results Page ---------------- */
const SearchResultsPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // hash format: #/delhi/gynecologist OR #/delhi/doctor/dr-abc
  const hash = window.location.hash.replace(/^#\/?/, "");
  const parts = hash.split("/");

  const citySlug = parts[0];
  const entity = parts[1];       // doctor | gynecologist | hospital
  const slug = parts[2] || null; // profile slug (optional)

  const isProfilePage = entity === "doctor" && slug;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams({
          city: citySlug,
          type: entity === "doctor" ? "doctor" : "specialization",
          ...(slug ? { slug } : {}),
          profile: isProfilePage ? "true" : "false"
        });

        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/search/details?${params}`
        );

        const data = await res.json();

        setItems(data.items || []);
      } catch (e) {
        console.error(e);
        setError("Failed to load results");
      } finally {
        setLoading(false);
      }
    };

    if (citySlug && entity) {
      fetchData();
    }
  }, [citySlug, entity, slug]);

  const formattedCity = citySlug
    ?.replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  const formattedEntity = entity
    ?.replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="container mx-auto px-6 py-8">

        {/* Header */}
        <h1 className="text-2xl font-semibold text-slate-800 mb-6">
          {formattedEntity} in {formattedCity}
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Results */}
          <div className="w-full lg:w-2/3">
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {!loading && items.length === 0 && (
              <p>No results found</p>
            )}

            {!loading &&
              items.map((doc) => (
                <DoctorResultCard
                  key={doc.id}
                  doctor={doc}
                  citySlug={citySlug}
                />
              ))}
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-1/3">
            <div className="sticky top-24">
              <div className="bg-gray-300 h-96 rounded-lg flex items-center justify-center">
                <p className="text-slate-600">[Map Placeholder]</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SearchResultsPage;
