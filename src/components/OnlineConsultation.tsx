import React from 'react';

import pregnancy from '../assets/images/consultation/pregnancy.png';
import skin from '../assets/images/consultation/skin.png';
import sexual from '../assets/images/consultation/sexual.png';
import cold from '../assets/images/consultation/cold.png';
import male from '../assets/images/consultation/male-infertility.png';
import female from '../assets/images/consultation/female-infertility.png';
import frozen_transfer from '../assets/images/consultation/frozen_transfer.png';
import egg_freezing from '../assets/images/consultation/egg_freezing.png';
import high_risk_pregnancy from '../assets/images/consultation/high_risk_pregnancy.png';
import blastocyst_culture_and_transfer from '../assets/images/consultation/blastocyst_culture_and_transfer.png';
import andrology from '../assets/images/consultation/andrology.png';


const specialties = [
    {
        name: 'In Vitro Fertilization (IVF)',
        icon: pregnancy,
        bgColor: 'bg-rose-100',
        url: `${import.meta.env.VITE_FRONTEND_URL}/delhi/in-vitro-fertilization-ivf`
    },
    {
        name: 'Intrauterine Insemination (IUI)',
        icon: skin,
        bgColor: 'bg-orange-100',
        url: `${import.meta.env.VITE_FRONTEND_URL}/delhi/intrauterine-insemination-iui`
    },
    {
        name: 'Altruistic Surrogacy',
        icon: sexual,
        bgColor: 'bg-purple-100',
        url: `${import.meta.env.VITE_FRONTEND_URL}/delhi/altruistic-surrogacy`
    },
    {
        name: 'Ectopic Pregnancy',
        icon: cold,
        bgColor: 'bg-teal-100',
        url: `${import.meta.env.VITE_FRONTEND_URL}/delhi/ectopic-pregnancy`
    },
    {
        name: 'Ovulation Induction (OI)',
        icon: male,
        bgColor: 'bg-yellow-100',
        url: `${import.meta.env.VITE_FRONTEND_URL}/delhi/ovulation-induction-oi-ovarian-stimulation`
    },
    {
        name: 'Frozen Embryo Transfer',
        icon: frozen_transfer,
        bgColor: 'bg-indigo-100',
        url: `${import.meta.env.VITE_FRONTEND_URL}/delhi/frozen embryo transfer fet`
    },
    {
        name: 'Fertility Preservation',
        icon: egg_freezing,
        bgColor: 'bg-indigo-100',
        url: `${import.meta.env.VITE_FRONTEND_URL}/delhi/egg-freezing-fertility-preservation`
    },
    {
        name: 'High Risk Pregnancy',
        icon: high_risk_pregnancy,
        bgColor: 'bg-indigo-100',
        url: `${import.meta.env.VITE_FRONTEND_URL}/delhi/high-risk-pregnancy`
    },
    {
        name: 'Blastocyst Transfer Treatment',
        icon: blastocyst_culture_and_transfer,
        bgColor: 'bg-indigo-100',
        url: `${import.meta.env.VITE_FRONTEND_URL}/delhi/blastocyst-culture-and-transfer`
    },
    {
        name: 'Andrology',
        icon: andrology,
        bgColor: 'bg-indigo-100',
        url: `${import.meta.env.VITE_FRONTEND_URL}/delhi/andrology`
    },
];


const viewAllUrl = `${import.meta.env.VITE_FRONTEND_URL}/delhi/specializations`;

const OnlineConsultation = () => {
    return (
        <section className="py-16 bg-slate-50">
            <div className="container mx-auto px-6 lg:px-[10rem]">
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-800">
                            Find Top Doctors
                        </h2>
                        <p className="text-slate-600">
                            With verified doctors in all specialists
                        </p>
                    </div>

                    {/* <button
                        onClick={() => window.location.href = viewAllUrl}
                        className="hidden md:block border border-indigo-500 text-indigo-500 font-semibold py-2 px-6 rounded-lg hover:bg-indigo-500 hover:text-white transition duration-300"
                    >
                        View All Specialities
                    </button> */}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 text-center">
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
