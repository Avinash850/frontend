import React, { useState, useEffect } from 'react';
import { getDoctors } from "../services/doctorsService";
import { HeroSearch } from '../components/HeroSearch';
import ClinicList from '../components/ClinicCard';


// const Doctors = () => {
//   const [doctors, setDoctors] = useState<any[]>([]);

//   useEffect(() => {
//     getDoctors()
//       .then((data) => setDoctors(data))
//       .catch((err) => console.error(err));
//   }, []);

//   return (
//     <div>
//       <h2>Doctors List</h2>
//       <ul>
//         {doctors.map((doc) => (
//           <li key={doc.id}>{doc.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };


// Re-defining DoctorResultCard here to keep this component self-contained for simplicity.
// In a larger app, this would be a shared component.
const DoctorResultCard = ({ doctor }) => (
    <div className="bg-white p-5 rounded-lg shadow-sm mb-6 flex flex-col sm:flex-row">
        <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-5 text-center">
            <img src={doctor.image} alt={doctor.name} className="w-24 h-24 rounded-full mx-auto object-cover" />
        </div>
        <div className="flex-grow">
            <h3 className="text-xl font-bold text-indigo-600 hover:underline">
                <a href={`#/doctor/${doctor.slug}`}>{doctor.name}</a>
            </h3>
            <p className="text-slate-600">{doctor.specialty}</p>
            <p className="text-slate-500 text-sm mt-1">{doctor.experience} years experience overall</p>
            <div className="my-3 text-sm">
                <p className="font-semibold">{doctor.practiceLocations[0].area}, {doctor.practiceLocations[0].city}</p>
                <p className="text-slate-500">{doctor.practiceLocations[0].clinicName}</p>
                <p className="mt-1">
                    <span className="font-semibold">₹{doctor.practiceLocations[0].consultationFee}</span> Consultation fee at clinic
                </p>
            </div>
            {doctor.satisfaction && (
                 <div className="bg-green-100 text-green-800 text-sm font-semibold inline-flex items-center px-2.5 py-0.5 rounded-full">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path></svg>
                    {doctor.satisfaction}% ({doctor.reviewCount} stories)
                </div>
            )}
        </div>
        <div className="flex-shrink-0 mt-4 sm:mt-0 sm:ml-5 flex flex-col items-center justify-center">
            <p className="text-green-600 font-semibold text-sm mb-2">Available Today</p>
            <a href={`#/doctor/${doctor.slug}`} className="w-full sm:w-auto bg-indigo-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-indigo-700 transition duration-300 text-center">
                Book Appointment
            </a>
        </div>
    </div>
);


const DoctorsPage = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchDoctors = async () => {
            setLoading(true);
            try {
                const response = await fetch('/data/doctors.json');
                const allDoctors = await response.json();
                setDoctors(allDoctors);
            } catch (error) {
                console.error("Failed to fetch doctors:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDoctors();
    }, []);

    const filteredDoctors = doctors.filter(doctor => 
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-4xl mx-auto my-10 p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
       
                   <HeroSearch/>
                   
                   <ClinicList/>
       
               </div>
    );
};

export default DoctorsPage;
