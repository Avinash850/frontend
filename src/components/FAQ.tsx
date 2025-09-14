import React, { useState } from 'react';

const faqData = [
    {
        question: 'How do I book an appointment?',
        answer: 'You can book an appointment by using the search bar on our homepage to find a doctor, selecting a suitable time slot from their profile, and confirming your details. The entire process takes just a few minutes.'
    },
    {
        question: 'Are the online consultations secure?',
        answer: 'Absolutely. We use end-to-end encryption for all our video consultations to ensure that your conversation with the doctor is completely private and confidential.'
    },
    {
        question: 'Can I get a prescription from a video consultation?',
        answer: 'Yes, if the doctor deems it medically necessary, they can issue a digital prescription which will be sent to you immediately after the consultation.'
    },
    {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit and debit cards, as well as popular digital wallets for a seamless payment experience.'
    }
];

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-gray-200 py-4">
            <button
                className="w-full flex justify-between items-center text-left text-lg font-semibold text-slate-800 focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>{question}</span>
                <span>
                    {isOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                    )}
                </span>
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-96 mt-4' : 'max-h-0'
                }`}
            >
                <p className="text-slate-600">
                    {answer}
                </p>
            </div>
        </div>
    );
};


const FAQ = () => {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-6 max-w-4xl">
                <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">Frequently Asked Questions</h2>
                <div className="space-y-4">
                    {faqData.map((faq, index) => (
                        <FAQItem key={index} question={faq.question} answer={faq.answer} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;