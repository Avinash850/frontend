import React, { useContext, useEffect, useState } from "react";
import { getDoctorDetails } from "../services/doctorsService";
import defaultImage from "../assets/images/default_icon.png";
import { DoctorContext } from "../context/DoctorContextProvider";

const DoctorListByFilter = ({ id, type, onSelectDoctor }) => {
  const [doctorData, setDoctorData] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const {selectedLocation} = useContext(DoctorContext)

  useEffect(() => {
    if (!id || !type || !selectedLocation) return;

    const fetchDoctors = async () => {
      try {
        setLoading(true);
        console.log("doctoryListFilter:", selectedLocation)
        // Fetch data dynamically using breadcrumb click (id, type)
        const res = await getDoctorDetails({ id, type, selectedLocation });
        if (res) {
          setDoctorData(res.data || null);
          setHospitals(res.hospitals || []);
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [id, type, selectedLocation]);

  if (loading) {
    return <div className="text-gray-500 text-center py-10">Loading doctor details...</div>;
  }

  if (!doctorData) {
    return <div className="text-gray-500 text-center py-10">No doctor details found.</div>;
  }

  return (
    <div className="mt-6 space-y-8">
      {/* Doctor Profile Card */}
      <div
        className="border rounded-xl shadow-sm p-6 hover:shadow-md transition cursor-pointer max-w-md mx-auto"
        onClick={() => onSelectDoctor(doctorData)}
      >
        <div className="flex flex-col items-center">
          <img
            src={doctorData.profile_image || defaultImage}
            alt={doctorData.name}
            className="w-28 h-28 rounded-full object-cover border border-gray-200"
          />
          <h3 className="mt-3 font-semibold text-lg text-gray-800">
            {doctorData.name}
          </h3>
          <p className="text-indigo-600 text-sm">{doctorData.specialization_name}</p>
          <p className="text-gray-500 text-sm">{doctorData.degree}</p>
          <p className="text-gray-500 text-sm mt-1">{doctorData.location}</p>
          <p className="text-gray-600 text-sm mt-2 italic">{doctorData.about}</p>
        </div>
      </div>

      {/* Associated Hospitals */}
      {hospitals.length > 0 && (
        <div>
          <h4 className="font-semibold text-gray-700 text-lg mb-3 text-center">
            Associated Hospitals
          </h4>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hospitals.map((hosp) => (
              <div
                key={hosp.id}
                className="border rounded-xl shadow-sm p-4 hover:shadow-md transition cursor-pointer"
              >
                <img
                  src={hosp.image ? hosp.image : defaultImage}
                  alt={hosp.name}
                  className="w-full h-40 object-cover rounded-md mb-3"
                />
                <h5 className="font-semibold text-gray-800">{hosp.name}</h5>
                <p className="text-gray-500 text-sm">{hosp.address}</p>
                <p className="text-gray-600 text-sm mt-1">
                  ⏰ {hosp.timing} | ☎ {hosp.phone_1}
                </p>
                {hosp.website && (
                  <a
                    href={`https://${hosp.website}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 text-sm underline mt-2 inline-block"
                  >
                    Visit Website
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorListByFilter;
