import React from 'react';

const OnlineConsultation = () => {
    const specialties = [
        { name: 'Period doubts or Pregnancy', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-rose-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 4a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" /><path d="M7 7a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1z" /></svg>, bgColor: 'bg-rose-100' },
        { name: 'Acne, pimple or skin issues', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-orange-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>, bgColor: 'bg-orange-100' },
        { name: 'Performance issues in bed', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-purple-500" viewBox="0 0 20 20" fill="currentColor"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.022 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" /></svg>, bgColor: 'bg-purple-100' },
        { name: 'Cold, cough or fever', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-teal-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" /></svg>, bgColor: 'bg-teal-100' },
        { name: 'Child not feeling well', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-yellow-500" viewBox="0 0 20 20" fill="currentColor"><path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" /></svg>, bgColor: 'bg-yellow-100' },
        { name: 'Depression or anxiety', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" /></svg>, bgColor: 'bg-indigo-100' },
    ];
    return (
        <section className="py-16 bg-slate-50">
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-800">Consult Top Doctors Online</h2>
                        <p className="text-slate-600">Private online consultations with verified doctors in all specialists</p>
                    </div>
                    <button className="hidden md:block border border-indigo-500 text-indigo-500 font-semibold py-2 px-6 rounded-lg hover:bg-indigo-500 hover:text-white transition duration-300">
                        View All Specialities
                    </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
                    {specialties.map((spec, index) => (
                        <div key={index} className="flex flex-col items-center p-4 rounded-lg cursor-pointer hover:bg-indigo-50 transition-colors">
                            <div className={`w-24 h-24 mb-4 rounded-full ${spec.bgColor} flex items-center justify-center`}>
                               {spec.icon}
                            </div>
                            <h3 className="font-semibold text-slate-700 leading-tight">{spec.name}</h3>
                            <a href="#" className="text-indigo-600 font-semibold mt-2 text-sm hover:underline">CONSULT NOW</a>
                        </div>
                    ))}
                </div>
                 <button className="mt-8 md:hidden w-full border border-indigo-500 text-indigo-500 font-semibold py-2 px-6 rounded-lg hover:bg-indigo-500 hover:text-white transition duration-300">
                    View All Specialities
                </button>
            </div>
        </section>
    );
};

export default OnlineConsultation;