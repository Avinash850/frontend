import React, { useEffect, useState, useContext, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import { HeroSearch } from "../components/HeroSearch";
import GetInTouch from "../components/GetInTouch";
import defaultImage from "../assets/images/default_icon.png";
import { DoctorContext } from "../context/DoctorContextProvider";
import { FaCheckCircle } from "react-icons/fa";

const VISIBLE_DOCTORS = 3;

const MixedSearchResults = () => {
  const { city, keyword, area } = useParams();
  const navigate = useNavigate();
  const { setLocationQuery, setSearchQuery } = useContext(DoctorContext);
  const [doctorIndex, setDoctorIndex] = useState(0);


  const [items, setItems] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const [gender, setGender] = useState("");
  const [experience, setExperience] = useState("");
  const [sort, setSort] = useState("");

  const [page, setPage] = useState(1);
  const limit = 10;
  const loaderRef = useRef(null);

  useEffect(() => {
    if (!city) return;

    setSearchQuery(keyword ? keyword.replace(/-/g, " ") : null);
    setLocationQuery(area ? area.replace(/-/g, " ") : city.replace(/-/g, " "));
  }, [city, keyword, area]);

  const fetchResults = async (pageToLoad = 1, reset = false) => {
    try {
      reset ? setLoading(true) : setLoadingMore(true);

      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/search/intent`,
        {
          params: {
            city,
            q: keyword,
            area,
            page: pageToLoad,
            limit,
            gender: gender || undefined,
            experience: experience || undefined,
            sort: sort || undefined,
          },
        }
      );

      setItems((prev) => (reset ? data.items : [...prev, ...data.items]));
      setMeta(data.meta);
    } catch (err) {
      if (reset) setItems([]);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    if (!city) return;
    setPage(1);
    fetchResults(1, true);
  }, [city, keyword, area, gender, experience, sort]);

  useEffect(() => {
    if (!meta?.has_more || loadingMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setPage((p) => p + 1);
      },
      { threshold: 0.3 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [meta?.has_more, loadingMore]);

  useEffect(() => {
    if (page > 1) fetchResults(page, false);
  }, [page]);

  const goToProfile = (type, slug) => {
    if (!slug) return;
    navigate(`/${city}/${type}/${slug}`);
  };

  const formatKeyword = (keyword = "") =>
    keyword
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(" ");

  const headingText = meta
    ? `${meta.total} ${formatKeyword(meta.keyword)}${
        meta.total === 1 ? "" : "s"
      } available in ${city}`
    : "";

  if (loading) {
    return <div className="text-center py-16 text-gray-500">Loading…</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <HeroSearch />

      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">

          {/* FILTERS (doctor only) */}
          {(meta.intent === "doctor"  && 
            <div className="flex flex-wrap gap-4 mb-6 bg-white p-4 rounded-xl shadow-sm">
              <select value={gender} onChange={(e) => setGender(e.target.value)} className="border rounded px-3 py-2 text-sm">
                <option value="">Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>

              <select value={experience} onChange={(e) => setExperience(e.target.value)} className="border rounded px-3 py-2 text-sm">
                <option value="">Experience</option>
                <option value="5">5+ years</option>
                <option value="10">10+ years</option>
                <option value="15">15+ years</option>
                <option value="20">20+ years</option>
              </select>

              <select value={sort} onChange={(e) => setSort(e.target.value)} className="border rounded px-3 py-2 text-sm">
                <option value="">Sort By</option>
                <option value="experience_desc">Experience: High to Low</option>
              </select>
            </div>
          )}

          {/* HEADING */}
          {/* {meta && (
            <h1 className="text-xl font-semibold text-gray-800 mb-4 mt-4">
              {headingText}
            </h1>
          )} */}
          {meta && (
            <>
              <h1 className="text-xl font-semibold text-gray-800 mb-1 mt-4">
                {headingText}
              </h1>
              <p className="text-sm text-gray-600 flex items-center gap-2 mb-4">
                <FaCheckCircle className="text-green-600" />
                Schedule appointments with verified doctors and shorter wait times
              </p>
            </>
          )}



          {/* NO RESULTS */}
          {items.length === 0 && (
            <div className="bg-white p-6 rounded-xl text-gray-500">
              No results found
            </div>
          )}

          {/* RESULTS */}
          {items.map((item) => {
            if (!item?.data) return null;
            const { entity_type, data } = item;

            if (entity_type === "doctor") {
              return (
                <div
                  key={`doctor-${data.id}`}
                  className="flex gap-6 p-6 bg-white rounded-xl shadow-sm mb-4"
                >
                  <div className="relative w-24 h-24">
                    <img
                      src={data.image_url?.trim() || defaultImage}
                      onClick={() => goToProfile("doctor", data.slug)}
                      className="w-24 h-24 rounded-full object-cover border cursor-pointer"
                      onError={(e) => (e.currentTarget.src = defaultImage)}
                    />
                    {data.is_profile_claimed === 1 && (
                      <span className="absolute -bottom-1 -right-1 bg-white rounded-full p-1">
                        <FaCheckCircle className="text-blue-600 text-lg" />
                      </span>
                    )}
                  </div>

                  <div className="flex-1">
                    <h3
                      onClick={() => goToProfile("doctor", data.slug)}
                      className="text-lg font-semibold text-blue-600 cursor-pointer"
                    >
                      Dr. {data.name}
                    </h3>

                    <p className="text-sm text-gray-600">
                      {data.specialization_name}
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      {data.experience_years
                        ? `${data.experience_years} years experience`
                        : "Experienced Doctor"}
                    </p>

                    <p className="text-sm mt-1">
                      ₹{data.consultation_fee || "N/A"} Consultation fee
                    </p>

                    <div className="flex items-center gap-3 mt-2">
                      <span className="flex items-center bg-green-600 text-white text-xs px-2 py-1 rounded">
                        <FaStar className="mr-1" />
                        {Number(data.rating) > 0 ? data.rating : 4}
                      </span>
                      <span className="text-xs text-gray-500">
                        {data.area_name}, {data.city_name}
                      </span>
                    </div>
                  </div>
                </div>
              );
            }

            if (entity_type === "hospital" || entity_type === "clinic") {
              const totalDoctors = data.preview_doctors?.length || 0;

              const visibleDoctors =
                data.preview_doctors?.slice(
                  doctorIndex,
                  doctorIndex + VISIBLE_DOCTORS
                ) || [];

              return (
                <div
                  key={`${entity_type}-${data.id}`}
                  className="bg-white p-6 rounded-xl shadow-sm mb-6"
                >
                  <div className="flex justify-between">
                    <div className="flex gap-4">
                      <img
                        src={data.image_url?.trim() || defaultImage}
                        className="w-20 h-20 object-contain border rounded"
                        onError={(e) => (e.currentTarget.src = defaultImage)}
                      />

                      <div>
                        <h3
                          onClick={() => goToProfile(entity_type, data.slug)}
                          className="text-lg font-semibold text-blue-600 cursor-pointer"
                        >
                          {data.name}
                        </h3>

                        <p className="text-sm text-gray-600">
                          {entity_type === "hospital"
                            ? "Multi-speciality Hospital"
                            : "Clinic"}{" "}
                          • {data.area_name}, {data.city_name}
                        </p>

                        <p className="text-sm text-green-600 mt-1">
                          {data.timing || "Timings available"}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="flex items-center gap-1 justify-end">
                        <FaStar className="text-green-600" />
                        <span>{Number(data.rating) > 0 ? data.rating : 4}</span>
                      </div>

                      <button
                        onClick={() => goToProfile(entity_type, data.slug)}
                        className="mt-3 px-4 py-2 bg-blue-600 text-white rounded"
                      >
                        View Profile
                      </button>
                    </div>
                  </div>

                  {totalDoctors > 0 && (
                    <div className="relative mt-4">
                      {totalDoctors > VISIBLE_DOCTORS && (
                        <button
                          onClick={() =>
                            setDoctorIndex((i) => Math.max(i - 1, 0))
                          }
                          disabled={doctorIndex === 0}
                          className="absolute -left-3 top-1/2 -translate-y-1/2 bg-white border rounded-full w-8 h-8 shadow disabled:opacity-30"
                        >
                          ‹
                        </button>
                      )}

                      <div className="flex gap-4">
                        {visibleDoctors.map((doc) => (
                          <div
                            key={doc.id}
                            onClick={() =>
                              goToProfile("doctor", doc.slug)
                            }
                            className="border rounded-lg p-3 w-44 cursor-pointer hover:shadow"
                          >
                            <img
                              src={doc.image_url || defaultImage}
                              className="w-12 h-12 rounded-full"
                              onError={(e) =>
                                (e.currentTarget.src = defaultImage)
                              }
                            />
                            <p className="text-sm font-semibold mt-1">
                              {doc.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {doc.specialization_name}
                            </p>
                          </div>
                        ))}
                      </div>

                      {totalDoctors > VISIBLE_DOCTORS && (
                        <button
                          onClick={() =>
                            setDoctorIndex((i) =>
                              i + VISIBLE_DOCTORS < totalDoctors
                                ? i + 1
                                : i
                            )
                          }
                          disabled={
                            doctorIndex + VISIBLE_DOCTORS >= totalDoctors
                          }
                          className="absolute -right-3 top-1/2 -translate-y-1/2 bg-white border rounded-full w-8 h-8 shadow disabled:opacity-30"
                        >
                          ›
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            }

            return null;
          })}

          {meta?.has_more && (
            <div ref={loaderRef} className="text-center py-6 text-gray-500">
              Loading more…
            </div>
          )}
        </div>

        <div className="lg:col-span-4">
          <div className="sticky top-24">
            <GetInTouch variant="compact" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MixedSearchResults;
