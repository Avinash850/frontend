import React from 'react';

const ServiceCard = ({ icon, title, description }) => (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 mx-auto mb-4">
            {icon}
        </div>
        <h3 className="text-xl font-semibold text-slate-800 mb-2">{title}</h3>
        <p className="text-slate-600">{description}</p>
    </div>
);

const Services = () => (
    <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-slate-800 mb-10">Our Core Services</h2>
            <div className="grid md:grid-cols-3 gap-8">
                <ServiceCard 
                    icon={<svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>}
                    title="Instant Video Consultation"
                    description="Connect with a doctor instantly, 24/7, from the comfort of your home."
                />
                <ServiceCard 
                    icon={<svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>}
                    title="Find Doctors Near You"
                    description="Book appointments with verified doctors in your city with ease."
                />
                <ServiceCard 
                    icon={<svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>}
                    title="Book Lab Tests"
                    description="Schedule diagnostic tests and get reports delivered to your email."
                />
            </div>
        </div>
    </section>
);

export default Services;