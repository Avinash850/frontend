import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import lab_test from "../assets/images/lab_test2.png";

import "swiper/css";
import "swiper/css/navigation";

/* ================= DATA ================= */

const slides = [
  {
    image: lab_test,
    title: "Advanced Diagnostic Labs",
  },
  {
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67",
    title: "Trusted Health Checkups",
  },
  {
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
    title: "Accurate Lab Testing",
  },
  {
    image: "https://images.unsplash.com/photo-1612277795421-9bc7706a4a34",
    title: "Home Sample Collection",
  },
];

/* ================= PAGE ================= */

export default function LabTestPage() {
  return (
    <div className="bg-[#F8FAFC] text-[#0F172A]">

      {/* ================= HERO SLIDER ================= */}
      <section className="relative">
        <Swiper
          modules={[Autoplay, Navigation]}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          speed={1000}
          loop
          navigation
          className="h-[420px] md:h-[520px]"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <motion.div
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="relative w-full h-full"
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-r 
                  from-[#0F4C81]/85 via-[#0F4C81]/60 to-[#1CA7A6]/70" />

                <motion.div
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="absolute inset-0 flex items-center justify-center px-6 text-center"
                >
                  <h1 className="text-white text-3xl md:text-5xl font-bold max-w-4xl">
                    {slide.title}
                  </h1>
                </motion.div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* ================= TOP BOOKED TESTS ================= */}
      <Section  title="Top Booked Diagnostic Tests">
        <CardSlider
          items={[
            "Complete Blood Count",
            "Blood Sugar",
            "Thyroid Profile",
            "Lipid Profile",
            "Vitamin D",
            "Vitamin B12",
            "HbA1c",
            "Liver Function Test",
          ]}
        />
      </Section>

      {/* ================= POPULAR PACKAGES ================= */}
      <Section title="Popular Health Checkup Packages">
        <Swiper
          loop
          speed={900}
          autoplay={{ delay: 2800, pauseOnMouseEnter: true }}
          modules={[Autoplay]}
          spaceBetween={20}
          breakpoints={{
            320: { slidesPerView: 1.2 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {[
            ["Basic Checkup", "₹999"],
            ["Advanced Checkup", "₹1999"],
            ["Full Body Checkup", "₹2999"],
            ["Diabetes Care", "₹1499"],
            ["Heart Health", "₹2499"],
          ].map(([title, price]) => (
            <SwiperSlide key={title}>
              <motion.div
                whileHover={{ y: -10, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-2xl transition"
              >
                <h3 className="font-bold text-lg">{title}</h3>
                <p className="text-xl text-[#3d4461] font-bold mt-2">
                  {price}
                </p>
                <button className="mt-4 w-full bg-[#3d4461] text-white py-2 rounded-xl">
                  View Details
                </button>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Section>

      {/* ================= FIND BY HEALTH CONCERN ================= */}
      <Section title="Find Tests by Health Concern" bg="bg-[#E6F4F3]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            "Diabetes","Heart","Kidney","Liver",
            "Women Health","Men Health","Cancer","Thyroid",
          ].map((item) => (
            <motion.div
              key={item}
              whileHover={{ y: -8, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="bg-white p-6 rounded-xl text-center font-semibold shadow hover:bg-[#3d4461] hover:text-white transition"
            >
              {item}
            </motion.div>
          ))}
        </div>
      </Section>


      {/* ================= WHY CHOOSE OUR LAB ================= */}
      <Section title="Why Choose Our Diagnostic Labs" bg="bg-[#E6F4F3]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {[
            {
              title: "NABL & ISO Certified",
              desc: "International quality standards ensuring accurate and reliable test results.",
              icon: "🧪",
            },
            {
              title: "Home Sample Collection",
              desc: "Free and safe doorstep sample collection by trained professionals.",
              icon: "🏠",
            },
            {
              title: "Fast & Accurate Reports",
              desc: "Most reports delivered within 24 hours with high precision.",
              icon: "⏱️",
            },
            {
              title: "Affordable Pricing",
              desc: "Transparent pricing with no hidden charges.",
              icon: "💰",
            },
            {
              title: "Expert Pathologists",
              desc: "Reports reviewed by experienced and certified medical experts.",
              icon: "👨‍⚕️",
            },
            {
              title: "Advanced Technology",
              desc: "State-of-the-art lab equipment for accurate diagnostics.",
              icon: "🔬",
            },
            {
              title: "Secure Digital Reports",
              desc: "Access your reports anytime through secure online systems.",
              icon: "🔒",
            },
            {
              title: "Wide Test Coverage",
              desc: "1000+ diagnostic tests covering all major health conditions.",
              icon: "📋",
            },
          ].map((item) => (
            <motion.div
              key={item.title}
              whileHover={{ y: -10, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-2xl transition"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>
    </div>
  );
}


function Section({
  title,
  children,
  bg = "bg-white",
  text = "text-[#0F172A]",
}: any) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.25 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`${bg} py-20 px-6`}
    >
      <div className={`max-w-7xl mx-auto ${text}`}>
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          {title}
        </h2>
        {children}
      </div>
    </motion.section>
  );
}

function CardSlider({ items }: { items: string[] }) {
  return (
    <Swiper
      loop
      speed={800}
      autoplay={{ delay: 2500, pauseOnMouseEnter: true }}
      modules={[Autoplay]}
      spaceBetween={16}
      breakpoints={{
        320:{slidesPerView:1.5},
        640:{slidesPerView:2.5},
        1024:{slidesPerView:4},
      }}
    >
      {items.map((item)=>(
        <SwiperSlide key={item}>
          <motion.div
            whileHover={{ y: -8, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="bg-white p-6 rounded-xl shadow text-center font-semibold hover:shadow-xl transition border-2 border-solid"
          >
            {item}
          </motion.div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
