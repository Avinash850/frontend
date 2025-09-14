import React, { useState, useEffect } from 'react';

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


const SearchResultsPage = ({ location, specialty }) => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDoctors = async () => {
            setLoading(true);
            try {
                const response = await fetch('/data/doctors.json');
                const allDoctors = await response.json();
                // Basic filtering logic - can be expanded
                const filtered = allDoctors.filter(doc => 
                    doc.specialty.toLowerCase().includes(specialty.replace(/-/g, ' '))
                );
                setDoctors(filtered);
            } catch (error) {
                console.error("Failed to fetch doctors:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDoctors();
    }, [location, specialty]);

    const formattedLocation = location.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    const formattedSpecialty = specialty.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

    return (
        <div className="bg-slate-100">
            <div className="container mx-auto px-6 py-8">
                {/* Search Bar and Filters */}
                <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                    {/* Simplified search bar */}
                    <div className="flex items-center border border-gray-300 rounded-lg">
                        <input type="text" value={formattedLocation} className="p-2 w-1/3 border-r" readOnly/>
                        <input type="text" value={formattedSpecialty} className="p-2 w-2/3" readOnly/>
                    </div>
                </div>
                 <div className="bg-indigo-700 text-white p-3 rounded-lg shadow-sm mb-6 flex space-x-4">
                    {/* Simplified filters */}
                    <select className="bg-indigo-700 border-none focus:ring-0"><option>Gender</option></select>
                    <select className="bg-indigo-700 border-none focus:ring-0"><option>Patient Stories</option></select>
                    <select className="bg-indigo-700 border-none focus:ring-0"><option>Experience</option></select>
                    <select className="bg-indigo-700 border-none focus:ring-0"><option>All Filters</option></select>
                    <select className="bg-indigo-700 border-none focus:ring-0 ml-auto"><option>Sort By: Relevance</option></select>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Column: Doctor List */}
                    <div className="w-full lg:w-2/3">
                        <h2 className="text-xl font-semibold text-slate-800 mb-4">{doctors.length} {formattedSpecialty}s available in {formattedLocation}</h2>
                        {loading ? <p>Loading...</p> : doctors.map(doc => <DoctorResultCard key={doc.slug} doctor={doc} />)}
                    </div>

                    {/* Right Column: Map */}
                    <div className="w-full lg:w-1/3">
                        <div className="sticky top-24">
                           <div className="bg-gray-300 h-96 rounded-lg flex items-center justify-center">
                                <p className="text-slate-600">[Map Placeholder]</p>
                           </div>
                           <div className="bg-white p-4 rounded-lg shadow-sm mt-4 text-center">
                                <h4 className="font-semibold">Need help?</h4>
                                <p className="text-sm text-slate-600">Our team is here to assist you.</p>
                                <button className="mt-2 w-full bg-slate-200 text-slate-800 font-semibold py-2 rounded-lg">Contact Us</button>
                           </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchResultsPage;