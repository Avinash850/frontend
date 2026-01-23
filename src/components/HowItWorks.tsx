import React from 'react';

const HowItWorks = () => {
  const steps = [
    {
      number: '01',
      title: 'Find the Right Doctor',
      description: 'Search by specialty, location, or availability to find the best match for your needs.',
      gradient: 'from-indigo-500 to-purple-500',
    },
    {
      number: '02',
      title: 'Book Instantly',
      description: 'Choose a convenient time slot and confirm your appointment in seconds.',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      number: '03',
      title: 'Get Care',
      description: 'Meet your doctor online or in person and get the care you deserve.',
      gradient: 'from-pink-500 to-rose-500',
    },
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-6 lg:px-[10rem]">
        <h2 className="text-4xl font-bold text-center text-slate-800 mb-4">
          How It Works
        </h2>
        <p className="text-center text-slate-500 mb-14 max-w-xl mx-auto">
          Book your appointment in three simple steps
        </p>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="group relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div
                className={`w-14 h-14 mb-6 flex items-center justify-center rounded-xl bg-gradient-to-r ${step.gradient} text-white text-lg font-bold`}
              >
                {step.number}
              </div>

              <h3 className="text-xl font-semibold text-slate-800 mb-3">
                {step.title}
              </h3>

              <p className="text-slate-600 leading-relaxed">
                {step.description}
              </p>

              <div className="absolute inset-0 rounded-2xl ring-1 ring-slate-100 group-hover:ring-indigo-200 transition" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
