import React from 'react';

const HowItWorks = () => {
  const steps = [
    { number: 1, title: 'Search for a Doctor', description: 'Use our search bar to find doctors by specialty or location.' },
    { number: 2, title: 'Book an Appointment', description: 'Select a time slot that works for you and confirm your booking.' },
    { number: 3, title: 'Consult with Your Doctor', description: 'Have your consultation online or in-person as scheduled.' },
  ];
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-10">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-indigo-100 text-indigo-600 font-bold text-2xl rounded-full">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-slate-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;