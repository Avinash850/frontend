import React from "react";
import { 
  FaStethoscope, 
  FaHospital, 
  FaMapMarkerAlt, 
  FaUsers, 
  FaHeart, 
  FaSearch, 
  FaCalendarCheck, 
  FaShieldAlt,
  FaBaby,
  FaHandsHelping
} from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import lab_test from "../assets/images/lab.jpg";


const About = () => {
    const navigate = useNavigate();

  const features = [
    {
      icon: <FaSearch className="text-3xl" />,
      title: "Doctor Discovery",
      description: "Find gynecologists and maternity specialists based on experience, location, and care focus.",
      color: "bg-pink-50 border-pink-100"
    },
    {
      icon: <FaHospital className="text-3xl" />,
      title: "Hospital & Clinic Search",
      description: "Explore maternity hospitals and clinics with transparent and essential details.",
      color: "bg-blue-50 border-blue-100"
    },
    {
      icon: <FaCalendarCheck className="text-3xl" />,
      title: "Care Access",
      description: "Enable easier access to appointments and medical facilities when it matters most.",
      color: "bg-green-50 border-green-100"
    },
    {
      icon: <FaShieldAlt className="text-3xl" />,
      title: "Trusted Information",
      description: "Provide clear, relevant pregnancy healthcare information to support informed decisions.",
      color: "bg-purple-50 border-purple-100"
    }
  ];

  const stats = [
    { icon: <FaStethoscope />, value: "500+", label: "Verified Doctors" },
    { icon: <FaHospital />, value: "200+", label: "Hospitals & Clinics" },
    { icon: <FaMapMarkerAlt />, value: "50+", label: "Cities Covered" },
    { icon: <FaUsers />, value: "10k+", label: "Families Supported" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-pink-50 via-white to-blue-50 py-16 md:py-24 px-10">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              {/* <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <FaHeart className="text-pink-600" />
                Trusted Pregnancy Care Platform
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Your Journey to
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500">
                  Motherhood Starts Here
                </span>
              </h1>
              
              <p className="text-lg text-gray-600 mb-8 max-w-2xl">
                Prega Journey is a digital healthcare platform designed to help women and families 
                find trusted pregnancy and maternity care — doctors, hospitals, and clinics — with 
                confidence and peace of mind.
              </p> */}

              <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <FaHeart className="text-pink-600" />
            Trusted Digital Healthcare Platform
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Your Journey to
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500">
                Better Health Starts Here
            </span>
            </h1>

            <p className="text-lg text-gray-600 mb-8 max-w-2xl">
            Prega Journey is a digital healthcare platform that helps individuals and families
            discover trusted doctors, hospitals, and clinics across multiple specialties —
            making quality healthcare simple, accessible, and reliable.
            </p>

              
              <div className="flex flex-wrap gap-4">
                <button className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-pink-200 transition-all duration-300 hover:-translate-y-1">
                  Explore Services
                </button>
                <button className="border-2 border-pink-300 text-pink-600 px-8 py-3 rounded-full font-semibold hover:bg-pink-50 transition-all duration-300">
                  Watch Our Story
                </button>
              </div>
            </div>
            
            <div className="lg:w-1/2 relative">
              <div className="relative">
                <img
                //  src="https://images.unsplash.com/photo-1516979187457-637abb4f9353?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
                 src={lab_test}
                  alt="PregaJourney"
                  className="rounded-3xl shadow-2xl w-full h-[500px] object-cover"
                />
                <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-3 rounded-full">
                      <FaBaby className="text-2xl text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">98%</p>
                      <p className="text-gray-600">Satisfaction Rate</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-white p-4 rounded-2xl shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <FaHandsHelping className="text-xl text-blue-600" />
                  </div>
                  <p className="font-semibold">24/7 Support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center group hover:scale-105 transition-transform duration-300"
              >
                <div className="bg-gradient-to-br from-pink-50 to-blue-50 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-all duration-300">
                  <div className="text-pink-600 text-2xl">
                    {stat.icon}
                  </div>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </h3>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50 px-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 relative">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80"
                  alt="Doctor consultation"
                  className="rounded-3xl shadow-xl w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/10 to-blue-500/10 rounded-3xl"></div>
              </div>
              
              {/* Experience badge */}
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-pink-500 to-rose-500 text-white p-6 rounded-2xl shadow-xl">
                <p className="text-2xl font-bold">5+ Years</p>
                <p className="opacity-90">Of Trusted Service</p>
              </div>
            </div>
            
            {/* <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Empowering Your
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500">
                  Pregnancy Journey
                </span>
              </h2>
              
              <div className="space-y-4 mb-8">
                <p className="text-gray-600 text-lg">
                  Pregnancy involves critical healthcare decisions. At Prega Journey, we exist 
                  to simplify those decisions by offering a reliable platform where users can 
                  explore verified medical professionals and maternity facilities.
                </p>
                
                <p className="text-gray-600 text-lg">
                  We are not a medical provider. We are a technology platform focused on 
                  helping patients reach the right care faster and with confidence.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  <h4 className="font-bold text-gray-900 mb-2">Verified Professionals</h4>
                  <p className="text-sm text-gray-600">All doctors and hospitals are thoroughly vetted</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  <h4 className="font-bold text-gray-900 mb-2">Transparent Reviews</h4>
                  <p className="text-sm text-gray-600">Real experiences from real families</p>
                </div>
              </div>
            </div> */}


            <div className="lg:w-1/2">
  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
    Empowering Your
    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500">
      Healthcare Journey
    </span>
  </h2>
  
  <div className="space-y-4 mb-8">
    <p className="text-gray-600 text-lg">
      Making the right healthcare choices can be challenging. At Prega Journey, we simplify
      this process by providing a trusted digital platform where users can discover verified
      doctors, hospitals, and clinics across multiple specialties.
    </p>
    
    <p className="text-gray-600 text-lg">
      We are not a medical provider. We are a technology-driven platform focused on helping
      people connect with the right healthcare services quickly, transparently, and with confidence.
    </p>
  </div>
  
  <div className="grid grid-cols-2 gap-4">
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
      <h4 className="font-bold text-gray-900 mb-2">Verified Professionals</h4>
      <p className="text-sm text-gray-600">Doctors and healthcare providers are carefully reviewed</p>
    </div>
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
      <h4 className="font-bold text-gray-900 mb-2">Transparent Reviews</h4>
      <p className="text-sm text-gray-600">Authentic feedback from real patients</p>
    </div>
  </div>
</div>

          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-16 bg-white px-10">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How We Support Your Journey
            </h2>
            <p className="text-gray-600 text-lg">
              Our comprehensive platform offers everything you need for a smooth pregnancy journey
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`${feature.color} p-6 rounded-2xl border-2 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group cursor-pointer`}
              >
                <div className="mb-4 text-pink-600">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-pink-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gradient-to-br from-pink-50 via-white to-blue-50 px-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-3xl shadow-lg">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl mb-6">
                <FaHeart className="text-2xl text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 text-lg">
                To make pregnancy healthcare discovery simple, transparent, and dependable 
                by connecting patients with trusted medical professionals through technology.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-3xl shadow-lg">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl mb-6">
                <FaStethoscope className="text-2xl text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600 text-lg">
                To become a trusted digital companion for pregnancy care, supporting families 
                with clarity, confidence, and accessibility throughout their journey to parenthood.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-10">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-3xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-pink-100 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of families who have found their perfect care partners through Prega Journey
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                    onClick={() => {
                        window.scrollTo(0, 0);
                        navigate('/delhi/doctors');
                    }}
                    className="bg-white text-pink-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300"
                    >
                    Find a Doctor
                    </button>

                    <button onClick={() => { window.scrollTo(0, 0); navigate('/delhi/hospitals');}} className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-all duration-300">
                        Browse Hospitals
                    </button>
            </div>
          </div>
        </div>
      </section>


    {/* Awards & Recognition */}
    <section className="py-16 bg-gradient-to-b from-white to-gray-50 px-10">
    <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Recognized & Trusted
        </h2>
        <p className="text-gray-600 text-lg">
            Our commitment to excellence has been recognized by leading organizations in healthcare and technology
        </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
            { name: "HealthTech Innovator 2023", org: "Digital Health Awards", icon: "🏆" },
            { name: "Best Startup", org: "Women's Health Forum", icon: "⭐" },
            { name: "Patient Choice", org: "Healthcare Excellence", icon: "❤️" },
            { name: "Top 50 Startups", org: "Tech Impact Awards", icon: "🚀" }
        ].map((award, index) => (
            <div 
            key={index}
            className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
            <div className="text-4xl mb-4">{award.icon}</div>
            <h3 className="font-bold text-gray-900 mb-2">{award.name}</h3>
            <p className="text-gray-600 text-sm">{award.org}</p>
            </div>
        ))}
        </div>
        
        <div className="mt-12 p-8 bg-gradient-to-r from-pink-50 to-blue-50 rounded-2xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Partnerships & Collaborations</h3>
            <p className="text-gray-600">Working with leading healthcare providers and institutions</p>
            </div>
            <div className="flex gap-8 flex-wrap justify-center">
            <div className="bg-white p-4 rounded-xl shadow-sm">
                <span className="font-bold text-gray-700">Hospital Network</span>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm">
                <span className="font-bold text-gray-700">Insurance Partners</span>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm">
                <span className="font-bold text-gray-700">Govt. Initiatives</span>
            </div>
            </div>
        </div>
        </div>
    </div>
    </section>

    {/* Impact Stories */}
    <section className="py-16 bg-white px-10">
    <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Stories That Inspire Us
        </h2>
        <p className="text-gray-600 text-lg">
            Hear from families who found their perfect care journey through Prega Journey
        </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
            {
            quote: "Found the perfect doctor for my high-risk pregnancy within hours!",
            name: "Priya Sharma",
            location: "Mumbai",
            weeks: "32 weeks",
            image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1371&q=80"
            },
            {
            quote: "The hospital reviews helped us choose the best maternity center for our twins.",
            name: "Ananya & Rohan",
            location: "Bangalore",
            weeks: "Twins - 6 months",
            image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1364&q=80"
            },
            {
            quote: "As first-time parents, having all information in one place was a lifesaver.",
            name: "The Patel Family",
            location: "Delhi",
            weeks: "New parents",
            image: "https://images.unsplash.com/photo-1511988617509-a57c8a288659?ixlib=rb-4.0.3&auto=format&fit=crop&w=1371&q=80"
            }
        ].map((story, index) => (
            <div 
            key={index}
            className="bg-gradient-to-b from-white to-gray-50 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
            <div className="h-48 overflow-hidden">
                <img
                src={story.image}
                alt={story.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
            </div>
            <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                <span className="text-sm text-pink-600 font-semibold">{story.weeks}</span>
                </div>
                <p className="text-gray-700 mb-4 italic">"{story.quote}"</p>
                <div className="border-t pt-4">
                <p className="font-bold text-gray-900">{story.name}</p>
                <p className="text-gray-600 text-sm">{story.location}</p>
                </div>
            </div>
            </div>
        ))}
        </div>
        
        <div className="text-center mt-12">
        <button className="inline-flex items-center gap-2 text-pink-600 font-semibold hover:text-pink-700 transition-colors duration-300">
            Read More Success Stories
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
        </button>
        </div>
    </div>
    </section>


      {/* Disclaimer */}
      <section className="py-8 bg-gray-900 px-10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">
            <span className="font-semibold">Important:</span> Prega Journey is a healthcare discovery platform 
            and does not provide medical advice. Always consult qualified healthcare professionals 
            for medical concerns. We connect you with trusted care, but medical decisions should 
            be made in consultation with licensed practitioners.
          </p>
        </div>
      </section>

      

      <style jsx>{`
        .bg-grid-pattern {
          background-image: linear-gradient(to right, #f3f4f6 1px, transparent 1px),
                            linear-gradient(to bottom, #f3f4f6 1px, transparent 1px);
          background-size: 50px 50px;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .floating {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default About;
