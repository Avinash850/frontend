import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import { HeroSearch } from "../components/HeroSearch";
import GetInTouch from "../components/GetInTouch";
import defaultImage from "../assets/images/default_icon.png";
import { DoctorContext } from "../context/DoctorContextProvider";

const MixedSearchResults = () => {
  const { city, keyword, area } = useParams();
  const navigate = useNavigate();

  const {
    setLocationQuery,
    setSearchQuery,
  } = useContext(DoctorContext);

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [intent, setIntent] = useState(null);


  /* =================================================
     URL → SEARCH INPUT HYDRATION (PRACTO STYLE)
     ================================================= */
  useEffect(() => {
    if (!city) return;

    // 🔹 Search box text
    if (keyword) {
      setSearchQuery(keyword.replace(/-/g, " "));
    } else {
      setSearchQuery(null);
    }

    // 🔹 Location input text
    if (area) {
      setLocationQuery(area.replace(/-/g, " "));
    } else {
      setLocationQuery(city.replace(/-/g, " "));
    }
  }, [city, keyword, area, setLocationQuery, setSearchQuery]);

  /* ===================== FETCH RESULTS ===================== */
  useEffect(() => {
    if (!city) return;

    const fetchResults = async () => {
      try {
        setLoading(true);

        const { data } = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/search/intent`,
          {
            params: {
              city,
              q: keyword || null,
              area: area || null,
            },
          }
        );

        setItems(data.items || []);
        setIntent(data.meta?.intent || null);

      } catch (err) {
        console.error("❌ Mixed search error:", err);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [city, keyword, area]);

  const resolveProfileRoute = (intent) => {
  if (!intent) return null;

  if (intent === "hospital") return "hospital";
  if (intent === "clinic") return "clinic";

  // ALL doctor-related intents
  return "doctor";
};

 const goToDoctor = (slug) => {
  const routeType = resolveProfileRoute(intent);
  if (!routeType) return;

  navigate(`/${city}/${routeType}/${slug}`);
};



  const formatText = (text = "") =>
    text.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

  if (loading) {
    return <div className="text-center py-16 text-gray-500">Loading…</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <HeroSearch />

      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* LEFT */}
        <div className="lg:col-span-8">
          <h1 className="text-xl font-semibold mb-4">
            {keyword
              ? `${formatText(keyword)} Doctors in ${formatText(area || city)}`
              : `Doctors in ${formatText(city)}`}
          </h1>

          {items.length === 0 && (
            <div className="bg-white p-6 rounded-xl text-gray-500">
              No doctors found
            </div>
          )}

          {items.map((doc) => (
            <div
              key={doc.id}
              className="flex gap-6 p-6 bg-white rounded-xl shadow-sm mb-4"
            >
              <img
                src={doc.image_url || defaultImage}
                alt={doc.name}
                onClick={() => goToDoctor(doc.slug)}
                className="w-24 h-24 rounded-full object-cover border cursor-pointer"
              />

              <div className="flex-1">
                <h3
                  onClick={() => goToDoctor(doc.slug)}
                  className="text-lg font-semibold text-blue-600 cursor-pointer hover:underline"
                >
                  {doc.name}
                </h3>

                <p className="text-sm text-gray-600">
                  {doc.specialization_name}
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  {doc.experience_years
                    ? `${doc.experience_years} years experience`
                    : "Experienced Doctor"}
                </p>

                <p className="text-sm text-gray-600 mt-1">
                  ₹{doc.consultation_fee || "N/A"} Consultation fee
                </p>

                {/* <div className="flex items-center gap-3 mt-2">
                  <span className="flex items-center bg-green-600 text-white text-xs px-2 py-1 rounded">
                    <FaStar className="mr-1" />
                    {doc.rating || "0"}
                  </span>
                  <span className="text-xs text-gray-500">
                    {doc.area_name}, {doc.city_name}
                  </span>
                </div> */}
                <div className="flex items-center gap-3 mt-2">
                  <span className="flex items-center bg-green-600 text-white text-xs px-2 py-1 rounded">
                      <FaStar className="mr-1" />
                      {doc.rating && Number(doc.rating) > 0 ? doc.rating : 4}
                  </span>
                </div>
                <button
                  onClick={() => goToDoctor(doc.slug)}
                  className="text-blue-600 text-sm mt-3 hover:underline"
                >
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 z-10">
            <GetInTouch variant="compact" />
          </div>
        </div>

      </div>
    </div>
  );
};

export default MixedSearchResults;
