import React from 'react';

// Define SVG icons as React components for clarity and reusability
const GynaecologyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.667 0l3.181-3.183m-4.991-2.691V5.25a3.375 3.375 0 00-3.375-3.375H8.25a3.375 3.375 0 00-3.375 3.375v2.692" />
    </svg>
);

const FertilityIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.474-4.474c-.048-.58-.024-1.193-.14-1.743m-2.114 2.114a2.25 2.25 0 10-3.182-3.182 2.25 2.25 0 003.182 3.182z" />
    </svg>
);

const LaparoscopyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 13.5l-3 3m0 0l-3-3m3 3v-6" />
    </svg>
);

const UrologyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125V14.25m-17.25 4.5v-1.875a3.375 3.375 0 013.375-3.375h9.75a3.375 3.375 0 013.375 3.375V18.75" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 3.75v1.5a3.75 3.75 0 003.75 3.75h.038a3.75 3.75 0 003.712-3.712V3.75m-7.5 0V3.75a3.75 3.75 0 00-3.75-3.75H3.75A3.75 3.75 0 000 3.75v.038a3.75 3.75 0 003.712 3.712h.038A3.75 3.75 0 007.5 5.25v-1.5" />
    </svg>
);

const ENTIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.478 6.182a.75.75 0 011.06 0L12 13.636l7.462-7.454a.75.75 0 111.06 1.06L13.06 14.696l7.462 7.454a.75.75 0 11-1.06 1.06L12 15.756l-7.462 7.454a.75.75 0 11-1.06-1.06L10.94 14.696 3.478 7.242a.75.75 0 010-1.06z" />
    </svg>
);

const AestheticsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.962 11.962a.375.375 0 100 .75.375.375 0 000-.75z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.038 11.962a.375.375 0 100 .75.375.375 0 000-.75z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0" />
    </svg>
);

const specialities = [
    {
        name: 'Gynaecology',
        description: 'Treatment of diseases related to female reproductive organs...',
        icon: <GynaecologyIcon />,
        bgColor: 'bg-pink-100'
    },
    {
        name: 'Fertility',
        description: 'Treatment of health issues related to male and female infertility...',
        icon: <FertilityIcon />,
        bgColor: 'bg-emerald-100'
    },
    {
        name: 'Laparoscopy',
        description: 'Keyhole surgery for abdominal and pelvic disorders...',
        icon: <LaparoscopyIcon />,
        bgColor: 'bg-sky-100'
    },
    {
        name: 'Urology',
        description: 'Surgical treatment for urogenital issues in men and women...',
        icon: <UrologyIcon />,
        bgColor: 'bg-amber-100'
    },
    {
        name: 'ENT (Ear, Nose, Throat)',
        description: 'Minimal access surgery (MIS) for ear, nose and throat...',
        icon: <ENTIcon />,
        bgColor: 'bg-red-100'
    },
    {
        name: 'Aesthetics',
        description: 'Reconstruction or improvement of physical appearance...',
        icon: <AestheticsIcon />,
        bgColor: 'bg-purple-100'
    }
];

const SpecialityCard = ({ name, description, icon, bgColor }) => (
    <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 flex items-center space-x-4 cursor-pointer">
        <div className={`w-20 h-20 rounded-lg flex-shrink-0 flex items-center justify-center ${bgColor}`}>
            {icon}
        </div>
        <div className="flex-grow">
            <h3 className="font-bold text-lg text-slate-800">{name}</h3>
            <p className="text-slate-600 text-sm mt-1">{description}</p>
        </div>
        <div className="flex-shrink-0">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
        </div>
    </div>
);


const Specialities = () => {
    return (
        <section className="py-16 bg-slate-100">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">Our Specialities</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {specialities.map((speciality, index) => (
                        <SpecialityCard key={index} {...speciality} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Specialities;