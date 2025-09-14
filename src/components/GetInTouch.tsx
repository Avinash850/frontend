import React from 'react';

const GetInTouch = () => {
    // A simple SVG icon for the submit button
    const SendIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.428A1 1 0 009.172 15V4.828a1 1 0 00-1.02-0.998L2.793 4.575a1 1 0 00-1.169 1.409l7 14c.28.56.986.56 1.266 0l7-14a1 1 0 00-1.169-1.409l-5.403 1.25a1 1 0 00-.894.998V4.28a1 1 0 001.02.998l5.403-1.25a1 1 0 001.169-1.409l-7-14z" />
        </svg>
    );

    return (
        <section className="py-16 bg-slate-50">
            <div className="container mx-auto px-6 max-w-4xl">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-800">Get in Touch</h2>
                    <p className="mt-3 text-lg text-slate-600">
                        Ready to take the next step? Our experts are here to help you every step of the way.
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-xl">
                    <form>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Patient Name */}
                            <div>
                                <label htmlFor="patient-name" className="block text-sm font-semibold text-slate-700 mb-2">Patient Name *</label>
                                <input 
                                    type="text" 
                                    id="patient-name" 
                                    placeholder="Enter your full name" 
                                    className="w-full bg-slate-100 text-slate-800 placeholder-slate-400 p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
                                />
                            </div>
                            {/* Mobile Number */}
                            <div>
                                <label htmlFor="mobile-number" className="block text-sm font-semibold text-slate-700 mb-2">Mobile Number *</label>
                                <input 
                                    type="tel" 
                                    id="mobile-number" 
                                    placeholder="Enter your mobile number" 
                                    className="w-full bg-slate-100 text-slate-800 placeholder-slate-400 p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
                                />
                            </div>
                            {/* Select City */}
                            <div className="relative">
                                <label htmlFor="city" className="block text-sm font-semibold text-slate-700 mb-2">Select City *</label>
                                <select 
                                    id="city" 
                                    className="w-full bg-slate-100 text-slate-800 p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition appearance-none pr-8">
                                    <option>Select an area</option>
                                    <option>New York</option>
                                    <option>Los Angeles</option>
                                    <option>Chicago</option>
                                    <option>Houston</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 top-7 flex items-center px-3 text-slate-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                </div>
                            </div>
                            {/* Select Concern */}
                             <div className="relative">
                                <label htmlFor="disease" className="block text-sm font-semibold text-slate-700 mb-2">Select Concern *</label>
                                <select 
                                    id="disease" 
                                    className="w-full bg-slate-100 text-slate-800 p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition appearance-none pr-8">
                                    <option>Select a concern</option>
                                    <option>Cardiology</option>
                                    <option>Dermatology</option>
                                    <option>Pediatrics</option>
                                    <option>General Inquiry</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 top-7 flex items-center px-3 text-slate-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                </div>
                            </div>
                        </div>
                        {/* Submit Button */}
                        <div className="pt-6">
                           <button 
                                type="submit" 
                                className="w-full bg-gradient-to-r from-indigo-600 to-rose-500 hover:from-indigo-700 hover:to-rose-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center gap-2 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            >
                                <SendIcon />
                                Book Free Appointment
                            </button>
                        </div>
                    </form>
                     <p className="text-center text-sm text-slate-500 mt-6">
                        Our team will be in touch with you shortly.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default GetInTouch;