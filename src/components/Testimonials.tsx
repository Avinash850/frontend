import React from 'react';

const StarIcon = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);

const TestimonialCard = ({ quote, name, image }) => (
    <div className="bg-white p-6 rounded-xl shadow-md flex flex-col h-full">
        <div className="flex items-center mb-4">
            <img className="w-14 h-14 rounded-full object-cover mr-4" src={image} alt={name} />
            <div>
                <p className="font-bold text-lg text-slate-800">{name}</p>
                <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} className="w-5 h-5 text-yellow-400" />
                    ))}
                </div>
            </div>
        </div>
        <p className="text-slate-600 italic flex-grow">"{quote}"</p>
    </div>
);

const Testimonials = () => {
    const testimonials = [
        {
            quote: "The online consultation was seamless and the doctor was very understanding. Highly recommend this platform for anyone needing quick medical advice.",
            name: 'Sarah L.',
            image: 'https://i.pravatar.cc/150?u=sarah'
        },
        {
            quote: "Booking an appointment was incredibly easy. I found a specialist near me in minutes. The experience was stress-free from start to finish.",
            name: 'Michael B.',
            image: 'https://i.pravatar.cc/150?u=michael'
        },
        {
            quote: "I was skeptical about online doctors, but Prega Journey changed my mind. The platform is user-friendly and the doctors are professional and caring.",
            name: 'Jessica P.',
            image: 'https://i.pravatar.cc/150?u=jessica'
        },
        {
            quote: "Finding a reliable gynecologist through Prega Journey was a breeze. The entire process was smooth and the support team was very helpful.",
            name: 'Emily R.',
            image: 'https://i.pravatar.cc/150?u=emily'
        }
    ];

    return (
        <section className="py-16 bg-slate-50">
            <div className="container mx-auto px-6 lg:px-[10rem]">
                <div className="text-center mb-12">
                     <h2 className="text-3xl font-bold text-slate-800">What Our Patients Say</h2>
                     <p className="mt-2 text-lg text-slate-600">Real experiences from families who found their trusted partner in us.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <TestimonialCard key={index} {...testimonial} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;