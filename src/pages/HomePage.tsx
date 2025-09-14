import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import OnlineConsultation from '../components/OnlineConsultation';
import Specialities from '../components/Specialities';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import Blogs from '../components/Blogs';
import GetInTouch from '../components/GetInTouch';

const HomePage = () => (
    <>
        <Hero />
        <Services />
        <OnlineConsultation />
        <Specialities />
        <HowItWorks />
        <Testimonials />
        <FAQ />
        <Blogs />
        <GetInTouch />
    </>
);

export default HomePage;
