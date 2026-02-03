import React, { useState } from "react";
import { FaStar, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import defaultImage from "../assets/images/default_icon.png";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaCreditCard } from "react-icons/fa";

import { useEffect } from "react";
import { hospitalService } from "../services/hospitalService";
import { clinicService } from "../services/clinicService";


const DoctorProfileTabs = ({ doctor }) => {
  const [activeTab, setActiveTab] = useState("info");
  const [showAll, setShowAll] = useState(false);

  // image modal state
  const [galleryImages, setGalleryImages] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const navigate = useNavigate();
  if (!doctor) return null;

  const clinics = doctor.clinics || [];
  const hospitals = doctor.hospitals || [];

  const practices = [
    ...clinics.map((c) => ({ ...c, type: "clinic" })),
    ...hospitals.map((h) => ({ ...h, type: "hospital" })),
  ];

  const citySlug = (doctor.city_name || "")
    .toLowerCase()
    .replace(/\s+/g, "-");

  const visiblePractices = showAll ? practices : practices.slice(0, 1);

  /* =========================
     PRACTICE CARD
     ========================= */
  const PracticeCard = ({ item }) => {
    const [galleryImagesList, setGalleryImagesList] = useState([]);

    useEffect(() => {
      if (!item?.id || !item?.type) return;

      const loadImages = async () => {
        try {
          let data = [];

          if (item.type === "hospital") {
            data = await hospitalService.getHospitalImages(item.id);
          } else if (item.type === "clinic") {
            data = await clinicService.getClinicImages(item.id);
          }

          setGalleryImagesList(Array.isArray(data) ? data : []);
        } catch (err) {
          console.error("Failed to load gallery images", err);
          setGalleryImagesList([]);
        }
      };

      loadImages();
    }, [item.id, item.type]);

    const goToProfile = () => {
      if (!item.slug || !item.type) return;
      navigate(`/${citySlug}/${item.type}/${item.slug}`);
    };

    // const images =
    //   item.type === "hospital"
    //     ? galleryImagesList
    //     : item.image_url
    //     ? [{ image_url: item.image_url }]
    //     : [];

    //  const images =
    //   item.images && item.images.length
    //     ? item.images
    //     : item.image_url
    //     ? [{ image_url: item.image_url }]
    //     : [];

    return (
      <div className="border-b py-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* LEFT */}
          <div className="md:col-span-5">
            <p className="text-sm text-gray-600 mb-1">
              {doctor.area_name}, {doctor.city_name}
            </p>

            <h4
              onClick={goToProfile}
              className="text-blue-600 font-semibold cursor-pointer hover:underline"
            >
              {item.name}
            </h4>

            {item.rating > 0 && (
              <div className="flex items-center gap-1 text-green-600 text-sm mt-1">
                <span>{item.rating}</span>
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
            )}

            <p className="text-sm text-gray-700 mt-2">
              {item.display_address || item.address}
            </p>

            {/* <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                item.display_address || item.address || ""
              )}`}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-blue-600 mt-1 inline-block"
            >
              Get Directions
            </a> */}

            {/* Images */}
            {galleryImagesList.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {galleryImagesList.slice(0, 3).map((img, i) => (
                  <img
                    key={i}
                    src={img.image_url || defaultImage}
                    onClick={() => {
                      setGalleryImages(galleryImagesList);
                      setActiveImageIndex(i);
                    }}
                    className="w-12 h-12 rounded object-cover border cursor-pointer"
                  />
                ))}

                {galleryImagesList.length > 3 && (
                  <div
                    onClick={() => {
                      setGalleryImages(galleryImagesList);
                      setActiveImageIndex(3);
                    }}
                    className="w-12 h-12 flex items-center justify-center bg-gray-100 text-xs rounded border cursor-pointer"
                  >
                    +{galleryImagesList.length - 3}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* MIDDLE */}
          {/* <div className="md:col-span-3 text-sm text-gray-700">
            <p className="font-medium">
              {item.is_on_call === 1
                ? "ON-CALL"
                : item.display_timing || "Available on appointment"}
            </p>
          </div> */}
          {/* MIDDLE */}
          {/* <div className="md:col-span-4 text-sm text-gray-700">
            {item.is_on_call === 1 ? (
              <p className="font-medium">ON-CALL</p>
            ) : item.display_timing_days && item.display_timing_time ? (
              <>
                <p className="font-medium">{item.display_timing_days}</p>
                <p className="text-gray-600">{item.display_timing_time}</p>
              </>
            ) 
            : (
              <p className="font-medium">Available on appointment</p>
            )
            }
          </div> */}
          <div className="md:col-span-4 text-sm text-gray-700">
            {item.timing
            
            }
          </div>



          {/* RIGHT */}
          {/* <div className="md:col-span-3 text-right">
            {item.is_profile_claimed === 1 && (
              <div className="inline-flex items-center gap-1 mb-2 text-purple-600 text-sm font-medium">
                <span>Prime</span>
                <FaCheckCircle className="text-purple-600 text-xs" />
                <span className="text-gray-500 font-normal">
                  Verified details
                </span>
              </div>
            )}

            {item.consultation_fee && (
              <p className="text-lg font-semibold mb-3">
                ₹{item.consultation_fee}
              </p>
            )}

            {item.phone_1 && (
              <a
                href={`tel:${item.phone_1}`}
                className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-md text-sm"
              >
                <FaPhone /> Call Now
              </a>
            )}
          </div> */}

          {/* RIGHT */}
          <div className="md:col-span-3 flex flex-col items-end justify-between">
            
            {/* TOP INFO (Prime + Online Payment) */}
            <div className="text-right space-y-1">

              {item.payment_type === 1 && (
                <div className="flex items-center justify-end gap-1 text-gray-600 text-sm">
                  <FaCreditCard className="text-xs" />
                  <span>Online Payment Available</span>
                </div>
              )}
            </div>

            {item.is_profile_claimed === 1 && (
                // <div className="inline-flex items-center gap-1 text-purple-600 text-sm font-medium">
                //   <span>Prime</span>
                //   <FaCheckCircle className="text-xs" />
                //   <span className="text-xs font-normal">
                //     Verified details
                //   </span>
                // </div>

                <div className="text-right">
                  <div className="inline-flex items-center gap-1 text-purple-600 text-sm font-medium">
                    <span>Prime</span>
                    <FaCheckCircle className="text-xs" />
                  </div>

                  <div className="text-xs text-purple-500 leading-tight">
                    Verified details
                  </div>
                </div>
              )}

            {/* FEE */}
            {item.consultation_fee && (
              <p className="text-lg font-semibold mt-4">
                ₹{item.consultation_fee}
              </p>
            )}

            {/* ACTION BUTTON (BOTTOM RIGHT) */}
            {item.phone_1 &&  item.show_call_button === 1 &&(
              <a
                href={`tel:${item.phone_1}`}
                className="mt-4 inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-md text-sm"
              >
                <FaPhone /> Call Now
              </a>
            )}
          </div>

        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow border">
      {/* Tabs */}
      <div className="flex border-b overflow-x-auto whitespace-nowrap">
        {["info", "stories", "consult", "healthfeed"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-3 font-semibold text-sm border-b-2 flex-shrink-0 ${
              activeTab === tab
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-600"
            }`}
          >
            {tab === "info" && "Info"}
            {tab === "stories" && "Stories"}
            {tab === "consult" && "Consult Q&A"}
            {tab === "healthfeed" && "Healthfeed"}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5">
        {activeTab === "info" && (
          <>
            {visiblePractices.map((p, i) => (
              <PracticeCard key={i} item={p} />
            ))}

            {practices.length > 1 && !showAll && (
              <div className="text-center mt-4">
                <button
                  onClick={() => setShowAll(true)}
                  className="border border-blue-600 text-blue-600 px-6 py-1 rounded-md text-sm"
                >
                  More
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* IMAGE MODAL */}
      {galleryImages && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="relative bg-white rounded-lg p-4 max-w-lg w-full">
            <button
              onClick={() => setGalleryImages(null)}
              className="absolute top-2 right-3 text-xl text-gray-600"
            >
              ✕
            </button>

            <img
              src={galleryImages[activeImageIndex].image_url}
              className="w-full h-80 object-cover rounded"
            />

            <div className="flex justify-between mt-3">
              <button
                disabled={activeImageIndex === 0}
                onClick={() =>
                  setActiveImageIndex((i) => i - 1)
                }
                className="text-blue-600 disabled:opacity-40"
              >
                Prev
              </button>

              <button
                disabled={
                  activeImageIndex === galleryImages.length - 1
                }
                onClick={() =>
                  setActiveImageIndex((i) => i + 1)
                }
                className="text-blue-600 disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorProfileTabs;
