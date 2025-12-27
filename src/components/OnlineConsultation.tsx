import React from 'react';

import pregnancy from '../assets/images/consultation/pregnancy.png';
import skin from '../assets/images/consultation/skin.png';
// import sexual from '../assets/images/consultation/sexual.png';
// import cold from '../assets/images/consultation/cold.png';
// import child from '../assets/images/consultation/child.png';
// import mental from '../assets/images/consultation/mental.png';
import sexual from '../assets/images/consultation/skin.png';
import cold from '../assets/images/consultation/skin.png';
import child from '../assets/images/consultation/skin.png';
import mental from '../assets/images/consultation/skin.png';


const specialties = [
    {
        name: 'Period doubts or Pregnancy',
        icon: pregnancy,
        bgColor: 'bg-rose-100',
        url: `${import.meta.env.VITE_FRONTEND_URL}/delhi/period_pregnancy`
    },
    {
        name: 'Acne, pimple or skin issues',
        icon: skin,
        bgColor: 'bg-orange-100',
        url: `${import.meta.env.VITE_FRONTEND_URL}/delhi/skin_issues`
    },
    {
        name: 'Performance issues in bed',
        icon: sexual,
        bgColor: 'bg-purple-100',
        url: `${import.meta.env.VITE_FRONTEND_URL}/delhi/sexual_performance_issues`
    },
    {
        name: 'Cold, cough or fever',
        icon: cold,
        bgColor: 'bg-teal-100',
        url: `${import.meta.env.VITE_FRONTEND_URL}/delhi/cold_cough_fever`
    },
    {
        name: 'Child not feeling well',
        icon: child,
        bgColor: 'bg-yellow-100',
        url: `${import.meta.env.VITE_FRONTEND_URL}/delhi/child_unwell`
    },
    {
        name: 'Depression or anxiety',
        icon: mental,
        bgColor: 'bg-indigo-100',
        url: `${import.meta.env.VITE_FRONTEND_URL}/delhi/depression_anxiety`
    }
];


const viewAllUrl = `${import.meta.env.VITE_FRONTEND_URL}/delhi/specializations`;

const OnlineConsultation = () => {
    return (
        <section className="py-16 bg-slate-50">
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-800">
                            Consult Top Doctors Online
                        </h2>
                        <p className="text-slate-600">
                            Private online consultations with verified doctors in all specialists
                        </p>
                    </div>

                    <button
                        onClick={() => window.location.href = viewAllUrl}
                        className="hidden md:block border border-indigo-500 text-indigo-500 font-semibold py-2 px-6 rounded-lg hover:bg-indigo-500 hover:text-white transition duration-300"
                    >
                        View All Specialities
                    </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
                    {specialties.map((spec, index) => (
                        <div
                            key={index}
                            onClick={() => window.location.href = spec.url}
                            className="flex flex-col items-center p-4 rounded-lg cursor-pointer hover:bg-indigo-50 transition-colors"
                        >
                            <div className={`w-24 h-24 mb-4 rounded-full ${spec.bgColor} flex items-center justify-center`}>
                                <img
                                    src={spec.icon}
                                    alt={spec.name}
                                    className="w-10 h-10 object-contain"
                                />
                            </div>

                            <h3 className="font-semibold text-slate-700 leading-tight">
                                {spec.name}
                            </h3>

                            <a
                                href={spec.url}
                                onClick={(e) => e.stopPropagation()}
                                className="text-indigo-600 font-semibold mt-2 text-sm hover:underline"
                            >
                                CONSULT NOW
                            </a>
                        </div>
                    ))}
                </div>

                <button
                    onClick={() => window.location.href = viewAllUrl}
                    className="mt-8 md:hidden w-full border border-indigo-500 text-indigo-500 font-semibold py-2 px-6 rounded-lg hover:bg-indigo-500 hover:text-white transition duration-300"
                >
                    View All Specialities
                </button>
            </div>
        </section>
    );
};

export default OnlineConsultation;
