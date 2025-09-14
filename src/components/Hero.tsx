import React, { useState, useEffect, useCallback } from 'react';
import { LocationIcon, SearchIcon } from './Icons';

// Helper function to normalize strings for robust matching
const normalizeString = (str) => str.toLowerCase().replace(/[.,@\s]/g, '');

const Hero = () => {
    const [location, setLocation] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isSuggestionsVisible, setIsSuggestionsVisible] = useState(false);

    // Fetch user's location
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                // In a real app, you would use a reverse geocoding API.
                setLocation('New Delhi');
            },
            () => {
                console.warn("Could not get user's location.");
                setLocation('New Delhi'); // Default fallback
            }
        );
    }, []);

    const fetchSuggestions = useCallback(async (query) => {
        if (query.length < 3) {
            setSuggestions([]);
            return;
        }

        try {
            const normalizedQuery = normalizeString(query);
            if (!normalizedQuery) {
                setSuggestions([]);
                return;
            }

            const [doctorsRes, clinicsRes] = await Promise.all([
                fetch('/data/doctors.json'),
                fetch('/data/clinics.json'),
            ]);
            const doctors = await doctorsRes.json();
            const clinics = await clinicsRes.json();

            const filteredDoctors = doctors.filter(doc => normalizeString(doc.name).includes(normalizedQuery));
            const filteredClinics = clinics.filter(clinic => normalizeString(clinic.name).includes(normalizedQuery));

            let newSuggestions = [];
            if (filteredDoctors.length > 0) {
                newSuggestions.push({ type: 'header', label: 'Doctors' });
                newSuggestions = [...newSuggestions, ...filteredDoctors.map(d => ({ ...d, type: 'doctor' }))];
            }
            if (filteredClinics.length > 0) {
                newSuggestions.push({ type: 'header', label: 'Clinics' });
                newSuggestions = [...newSuggestions, ...clinics.map(c => ({ ...c, type: 'clinic' }))];
            }

            setSuggestions(newSuggestions);

        } catch (error) {
            console.error("Failed to fetch suggestions:", error);
        }
    }, []);
    
    useEffect(() => {
        const handler = setTimeout(() => {
            if (searchTerm) fetchSuggestions(searchTerm);
        }, 300);

        return () => clearTimeout(handler);
    }, [searchTerm, fetchSuggestions]);

    const handleSearchFocus = async () => {
        setIsSuggestionsVisible(true);
        if(!searchTerm){
             try {
                const res = await fetch('/data/specialities.json');
                const specialities = await res.json();
                setSuggestions(specialities.map(s => ({...s, type: 'speciality'})));
            } catch (error) {
                console.error("Failed to fetch specialities:", error);
            }
        }
    };
    
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        if(e.target.value.length < 3) {
            handleSearchFocus();
        }
    }

    const handleSuggestionClick = (item) => {
        setIsSuggestionsVisible(false);
        setSearchTerm('');
        setSuggestions([]);

        if (item.type === 'doctor' && item.slug) {
            window.location.hash = `#/doctor/${item.slug}`;
        } else if (item.type === 'speciality') {
            const locationSlug = location.toLowerCase().replace(/\s/g, '-');
            const specialitySlug = item.label.toLowerCase().replace(/\//g, '-').replace(/\s/g, '-');
            window.location.hash = `#/search/${locationSlug}/${specialitySlug}`;
        }
    };

    return (
        <section className="hero-gradient py-12 md:py-24">
            <div className="container mx-auto px-6 text-center">
                <h1 className="text-3xl md:text-5xl font-bold text-slate-800 mb-4">Your Journey to Parenthood, Guided with Care.</h1>
                <p className="text-lg md:text-xl text-slate-600 mb-10">Find and book appointments with the best doctors near you.</p>
                <div 
                    className="max-w-3xl mx-auto bg-white p-4 rounded-xl shadow-lg flex flex-col md:flex-row items-center gap-2 relative"
                >
                    <div className="relative w-full md:w-1/3">
                        <LocationIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="City, State"
                            className="w-full pl-10 pr-3 py-3 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div className="relative w-full md:w-2/3">
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search for doctors, clinics, hospitals, etc."
                            className="w-full pl-10 pr-3 py-3 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            onFocus={handleSearchFocus}
                            onChange={handleSearchChange}
                            onBlur={() => setTimeout(() => setIsSuggestionsVisible(false), 200)}
                            value={searchTerm}
                        />
                        {isSuggestionsVisible && suggestions.length > 0 && (
                            <div className="absolute top-full left-0 w-full bg-white mt-2 rounded-lg shadow-lg z-10 text-left">
                                <ul className="py-2">
                                    {suggestions.map((item, index) => {
                                        if (item.type === 'header') {
                                            return <li key={index} className="px-4 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider">{item.label}</li>;
                                        }
                                        return (
                                            <li key={index} onMouseDown={() => handleSuggestionClick(item)} className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-3">
                                                <SearchIcon className="w-5 h-5 text-gray-400"/>
                                                <div>
                                                   <p className="font-semibold text-slate-800">{item.name || item.label}</p>
                                                   {item.specialty && <p className="text-sm text-slate-500">{item.specialty}</p>}
                                                </div>
                                                {item.type === 'speciality' && <span className="ml-auto text-xs font-semibold text-gray-400">SPECIALITY</span>}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        )}
                    </div>
                    <button className="w-full md:w-auto bg-indigo-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-indigo-700 transition duration-300 flex items-center justify-center gap-2">
                        <SearchIcon color="white" className="w-5 h-5"/>
                        Search
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Hero;