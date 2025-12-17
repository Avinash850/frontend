import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
import { Video, ShieldCheck, Clock, UserCheck } from "lucide-react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function VideoConsultPage() {
  return (
    <div className="bg-white text-slate-900">

      {/* ================= HERO ================= */}
      <section className="relative h-[640px]">
        <img
          src="https://images.unsplash.com/photo-1758691462749-a95ce1bd7f96"
          className="w-full h-full object-cover"
          alt="Hospital Telemedicine"
        />
        <div className="absolute inset-0 bg-black/55" />

        <div className="absolute inset-0 flex items-center px-10">
          <div className="max-w-3xl text-white">
            <h1 className="text-5xl font-bold leading-tight">
              Trusted Virtual Care From Leading Medical Experts
            </h1>
            <p className="mt-6 text-xl text-white/90">
              Secure video consultations with board-certified doctors — anytime, anywhere.
            </p>
            <button className="mt-10 bg-blue-600 px-12 py-4 rounded-lg text-lg font-semibold">
              Start Video Consultation
            </button>
          </div>
        </div>
      </section>

      {/* ================= CORE VALUE PILLARS ================= */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-16">
            Why Patients Trust Our Virtual Care
          </h2>

          <div className="grid md:grid-cols-4 gap-12">
            {[
              { icon: Video, title: "HD Video Consultations", desc: "Crystal-clear video & audio quality." },
              { icon: ShieldCheck, title: "Secure & Private", desc: "HIPAA-compliant encrypted sessions." },
              { icon: UserCheck, title: "Verified Specialists", desc: "Licensed & experienced physicians." },
              { icon: Clock, title: "Save Time", desc: "No travel, no waiting rooms." },
            ].map((item) => (
              <div key={item.title}>
                <item.icon className="h-12 w-12 text-blue-600 mx-auto" />
                <h3 className="mt-6 text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-slate-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      {/* <section className="bg-slate-50 py-28">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-20">
            How Video Consultation Works
          </h2>

          <div className="grid md:grid-cols-4 gap-14 text-center">
            {[
              "Choose a Doctor",
              "Book a Slot",
              "Join Video Call",
              "Receive Prescription",
            ].map((step, i) => (
              <div key={step}>
                <div className="h-14 w-14 mx-auto rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg">
                  {i + 1}
                </div>
                <h3 className="mt-6 font-semibold text-lg">{step}</h3>
              </div>
            ))}
          </div>
        </div>
      </section> */}



      {/* ================= HOW VIDEO CONSULTATION WORKS ================= */}
<section className="py-32 bg-gradient-to-b from-slate-50 to-white">
  <div className="max-w-6xl mx-auto px-6">

    <motion.h2
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl font-bold text-center mb-24"
    >
      Your Video Consultation Journey
    </motion.h2>

    <div className="relative">

      {/* Vertical Line */}
      <div className="absolute left-1/2 top-0 h-full w-[2px] bg-blue-200 hidden md:block" />

      {[
        {
          step: "01",
          title: "Choose a Specialist",
          desc: "Browse verified doctors and select the right specialist for your needs.",
        },
        {
          step: "02",
          title: "Book a Time Slot",
          desc: "Pick a convenient date and time for your consultation.",
        },
        {
          step: "03",
          title: "Join Secure Video Call",
          desc: "Connect instantly through our encrypted video platform.",
        },
        {
          step: "04",
          title: "Get Digital Prescription",
          desc: "Receive medical advice and prescriptions immediately.",
        },
      ].map((item, i) => (
        <motion.div
          key={item.step}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15 }}
          className={`
            relative mb-20 md:w-1/2
            ${i % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16 md:ml-auto"}
          `}
        >
          {/* Step Circle */}
          <div
            className={`
              absolute top-0
              ${i % 2 === 0 ? "md:-right-[34px]" : "md:-left-[34px]"}
              h-14 w-14 rounded-full
              bg-blue-600 text-white
              flex items-center justify-center
              font-bold text-lg
              shadow-lg
            `}
          >
            {item.step}
          </div>

          {/* Card */}
          <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-3">
              {item.title}
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              {item.desc}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>




      {/* ================= DOCTORS ================= */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-20">
            Meet Our Medical Specialists
          </h2>

          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            loop
            autoplay={{ delay: 3000 }}
            pagination={{ clickable: true }}
            navigation
            spaceBetween={30}
            breakpoints={{
              640: { slidesPerView: 1.2 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <SwiperSlide key={i}>
                <div className="overflow-hidden rounded-3xl shadow-lg bg-white">
                  <img
                    src={`https://randomuser.me/api/portraits/men/${i + 10}.jpg`}
                    className="h-72 w-full object-cover"
                    alt="Doctor"
                  />
                  <div className="p-6">
                    <h3 className="text-lg font-semibold">Dr. Specialist {i}</h3>
                    <p className="text-sm text-slate-600">Senior Consultant</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>


      {/* ================= INTERACTIVE VIDEO CONSULT EXPERIENCE ================= */}
      <section className="py-32 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">

          {/* LEFT CONTENT */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold mb-12"
            >
              A Smarter Way to Consult Doctors Online
            </motion.h2>

            {[
              {
                title: "Real-Time Doctor Interaction",
                desc: "Face-to-face consultations with experienced specialists.",
              },
              {
                title: "Hospital-Grade Security",
                desc: "HIPAA-compliant, encrypted video sessions.",
              },
              {
                title: "Instant Medical Guidance",
                desc: "Prescriptions & advice during the same call.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                whileHover={{ x: 12 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="
                  group relative mb-6 p-6 rounded-2xl
                  bg-white border border-slate-200
                  shadow-sm hover:shadow-xl
                  cursor-pointer
                "
              >
                <h3 className="text-xl font-semibold mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-sm">
                  {item.desc}
                </p>

                {/* Accent bar */}
                <div className="absolute left-0 top-0 h-full w-1 bg-blue-600 rounded-l opacity-0 group-hover:opacity-100 transition" />
              </motion.div>
            ))}
          </div>

          {/* RIGHT VISUAL */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Main Video Card */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5"
                className="w-full h-[420px] object-cover"
              />

              {/* Video UI Overlay */}
              <div className="absolute inset-0 bg-black/25" />

              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-900">
                    Dr. Amanda Lewis
                  </p>
                  <p className="text-xs text-slate-500">
                    Internal Medicine
                  </p>
                </div>

                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold">
                  Live Call
                </button>
              </div>
            </div>

            {/* Floating Info */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 5 }}
              className="
                absolute -top-8 -right-8
                bg-white p-4 rounded-2xl
                shadow-xl text-sm
              "
            >
              🔒 Secure & Encrypted
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="relative h-[420px]">
        <img
          src="https://images.unsplash.com/photo-1538108149393-fbbd81895907"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-blue-900/75" />
        <div className="absolute inset-0 flex items-center justify-center text-center text-white">
          <div>
            <h2 className="text-4xl font-bold mb-6">
              Healthcare Without Boundaries
            </h2>
            <p className="text-xl mb-10">
              Consult trusted doctors from the comfort of your home.
            </p>
            <button className="bg-white text-blue-900 px-12 py-4 rounded-lg font-semibold text-lg">
              Book Video Consultation
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
