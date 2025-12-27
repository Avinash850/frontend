import React from 'react';
import Gynaecology from '../assets/images/Specialities/icons/gynaecology.png'
import fertility from '../assets/images/Specialities/icons/fertility.png'
import laparoscopy from '../assets/images/Specialities/icons/laparoscopy.png'
import urology from '../assets/images/Specialities/icons/urology.png'
import ent from '../assets/images/Specialities/icons/ent.png'
import aesthetics from '../assets/images/Specialities/icons/aesthetics.png'


const specialities = [
    {
        name: 'Gynaecology',
        description: 'Treatment of diseases related to female reproductive organs...',
        icon: Gynaecology,
        bgColor: 'bg-pink-100',
        url: `${import.meta.env.VITE_FRONTEND_URL}/delhi/gynecologist-obstetrician`
    },
    {
        name: 'Fertility',
        description: 'Treatment of health issues related to male and female infertility...',
        icon: fertility,
        bgColor: 'bg-emerald-100',
        url: `${import.meta.env.VITE_FRONTEND_URL}/delhi/fertility-specialist`
    },
    {
        name: 'Laparoscopy',
        description: 'Keyhole surgery for abdominal and pelvic disorders...',
        icon: laparoscopy,
        bgColor: 'bg-sky-100',
        url: `${import.meta.env.VITE_FRONTEND_URL}/delhi/laparoscopy`
    },
    {
        name: 'Urology',
        description: 'Surgical treatment for urogenital issues in men and women...',
        icon: urology,
        bgColor: 'bg-amber-100',
        url: `${import.meta.env.VITE_FRONTEND_URL}/delhi/urologist`
    },
    {
        name: 'ENT (Ear, Nose, Throat)',
        description: 'Minimal access surgery (MIS) for ear, nose and throat...',
        icon: ent,
        bgColor: 'bg-red-100',
        url: `${import.meta.env.VITE_FRONTEND_URL}/delhi/Otolaryngologist`
    },
    {
        name: 'Aesthetics',
        description: 'Reconstruction or improvement of physical appearance...',
        icon: aesthetics,
        bgColor: 'bg-purple-100',
        url: `${import.meta.env.VITE_FRONTEND_URL}/delhi/aesthetic`
    }
];

const SpecialityCard = ({ name, description, icon, bgColor, url }) => {
    const handleClick = () => {
        window.location.href = url;
    };

    return (
        <div
            onClick={handleClick}
            className="bg-white p-4 sm:p-5 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 cursor-pointer"
        >
            <div className={`w-20 h-20 rounded-lg flex-shrink-0 flex items-center justify-center ${bgColor}`}>
                <img
                    src={icon}
                    alt={name}
                    className="w-10 h-10 object-contain"
                />
            </div>

            <div className="flex-grow">
                <h3 className="font-bold text-lg sm:text-xl text-slate-800">
                    {name}
                </h3>
                <p className="text-slate-600 text-sm sm:text-base mt-1">
                    {description}
                </p>
            </div>

            <div className="flex-shrink-0 mt-2 sm:mt-0">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-indigo-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                </svg>
            </div>
        </div>
    );
};

const Specialities = () => {
    return (
        <section className="py-12 sm:py-16 bg-slate-100">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-center text-slate-800 mb-8 sm:mb-12">
                    Our Specialities
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {specialities.map((speciality, index) => (
                        <SpecialityCard key={index} {...speciality} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Specialities;