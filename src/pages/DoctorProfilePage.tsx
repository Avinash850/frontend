import React, { useState, useEffect } from 'react';

const DoctorProfilePage = ({ slug }) => {
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDoctorDetails = async () => {
            setLoading(true);
            try {
                const response = await fetch('/data/doctors.json');
                const allDoctors = await response.json();
                const foundDoctor = allDoctors.find(doc => doc.slug === slug);
                setDoctor(foundDoctor);
            } catch (error) {
                console.error("Failed to fetch doctor details:", error);
            } finally {
                setLoading(false);
            }
        };

        if (slug) {
            fetchDoctorDetails();
        }
    }, [slug]);

    if (loading) {
        return <div className="container mx-auto px-6 py-8 text-center">Loading doctor profile...</div>;
    }

    if (!doctor) {
        return <div className="container mx-auto px-6 py-8 text-center">Doctor not found.</div>;
    }

    return (
        <div className="bg-slate-50">
            <div className="container mx-auto px-6 py-12">
                {/* Doctor Card */}
                <div className="bg-white p-6 rounded-lg shadow-lg mb-8 flex flex-col md:flex-row items-start">
                    <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6 text-center">
                        <img src={doctor.image} alt={doctor.name} className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-indigo-100" />
                        {doctor.satisfaction && (
                             <div className="mt-4 bg-green-100 text-green-800 text-sm font-semibold inline-flex items-center px-3 py-1 rounded-full">
                                <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path></svg>
                                {doctor.satisfaction}% Satisfaction ({doctor.reviewCount} reviews)
                            </div>
                        )}
                    </div>
                    <div className="flex-grow">
                        <h1 className="text-3xl font-bold text-slate-800">{doctor.name}</h1>
                        <p className="text-slate-600 mt-1">{doctor.specialty}</p>
                        <p className="text-slate-500 text-sm">{doctor.experience} years experience</p>
                        {doctor.bio && <p className="mt-4 text-slate-700">{doctor.bio}</p>}
                    </div>
                    <div className="w-full md:w-auto mt-6 md:mt-0 md:ml-6 flex-shrink-0">
                        <button className="w-full bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-indigo-700 transition duration-300">
                           Book Appointment
                        </button>
                    </div>
                </div>

                {/* Practice Locations */}
                {doctor.practiceLocations && doctor.practiceLocations.length > 0 && (
                    <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
                        <h2 className="text-2xl font-bold text-slate-800 mb-4">Practice Locations</h2>
                        <div className="space-y-4">
                            {doctor.practiceLocations.map((loc, index) => (
                                <div key={index} className="border-b last:border-b-0 pb-4 last:pb-0">
                                    <h3 className="text-xl font-semibold text-indigo-700">{loc.clinicName}</h3>
                                    <p className="text-slate-600">{loc.area}, {loc.city}</p>
                                    <div className="flex justify-between items-center mt-2">
                                        <p className="text-lg font-semibold text-slate-800">₹{loc.consultationFee} <span className="text-sm font-normal text-slate-500">Consultation Fee</span></p>
                                        <button className="border border-indigo-500 text-indigo-500 font-semibold py-2 px-4 rounded-lg hover:bg-indigo-500 hover:text-white transition duration-300 text-sm">
                                            Book Clinic Visit
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                
                {/* About Section */}
                 <div className="bg-white p-6 rounded-lg shadow-lg">
                     <h2 className="text-2xl font-bold text-slate-800 mb-4">About {doctor.name}</h2>
                     <div className="prose max-w-none text-slate-700">
                        {doctor.bio && <p>{doctor.bio}</p>}
                        {doctor.specializations && doctor.specializations.length > 0 && (
                            <>
                                <h3 className="text-xl font-semibold mt-6 mb-2">Specializations</h3>
                                <ul className="list-disc list-inside">
                                   {doctor.specializations.map((spec, i) => <li key={i}>{spec}</li>)}
                                </ul>
                            </>
                        )}
                         {doctor.education && doctor.education.length > 0 && (
                            <>
                                <h3 className="text-xl font-semibold mt-6 mb-2">Education</h3>
                                <ul className="list-disc list-inside">
                                {doctor.education.map((edu, i) => <li key={i}>{edu}</li>)}
                                </ul>
                            </>
                         )}
                     </div>
                 </div>

            </div>
        </div>
    );
};

export default DoctorProfilePage;
