import { Swiper, SwiperSlide } from "swiper/react";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";
import { PlayCircle, Video, ShieldCheck, Clock } from "lucide-react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";


import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";




const facilities = [
  {
    img: "https://images.unsplash.com/photo-1579684453423-f84349ef60b0",
    title: "24/7 Virtual Clinics",
  },
  {
    img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
    title: "Remote Diagnostic Support",
  },
  {
    img: "https://images.unsplash.com/photo-1606206873764-fd15e242df52",
    title: "Digital Prescriptions",
  },
];


export default function VideoConsultPage() {
  return (
    <div className="bg-white text-slate-900">

      {/* ================= HERO ================= */}
      <section className="relative h-[600px]">
        <img
          src="https://images.unsplash.com/photo-1758691462749-a95ce1bd7f96?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="w-full h-full object-cover"
          alt="American Hospital Telemedicine"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center px-10">
          <div className="max-w-3xl text-white">
            <h1 className="text-5xl font-bold leading-tight">
              Virtual Care From Leading Medical Experts
            </h1>
            <p className="mt-6 text-xl">
              Secure video visits with U.S.-trained, board-certified physicians.
            </p>
            <button className="mt-10 bg-blue-600 px-10 py-4 rounded-lg text-lg font-semibold">
              Start Video Visit
            </button>
          </div>
        </div>
      </section>




      {/* FEATURES SECTION */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16"
          >
            Why Choose Our Video Consulting?
          </motion.h2>


          <div className="grid md:grid-cols-3 gap-10">
            {[{ icon: Video, title: "HD Video Calls", desc: "Crystal clear consultations." },
            { icon: ShieldCheck, title: "Secure & Private", desc: "End-to-end encrypted." },
            { icon: Clock, title: "Save Time", desc: "No travel or waiting." }].map(
              (item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -10 }}
                  className="rounded-3xl shadow-xl p-8 bg-white hover:shadow-2xl transition"
                >
                  <item.icon className="h-12 w-12 text-primary" />
                  <h3 className="text-2xl font-semibold mt-6">{item.title}</h3>
                  <p className="mt-4 text-slate-600">{item.desc}</p>
                </motion.div>
              )
            )}
          </div>
        </div>
      </section>


      {/* ================= FACILITIES ================= */}
      {/* <section className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-16">
          World-Class Virtual Care Facilities
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              img: "https://images.unsplash.com/photo-1579684453423-f84349ef60b0",
              title: "24/7 Virtual Clinics",
            },
            {
              img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
              title: "Remote Diagnostic Support",
            },
            {
              img: "https://images.unsplash.com/photo-1606206873764-fd15e242df52",
              title: "Digital Prescriptions",
            },
          ].map((f) => (
            <div key={f.title}>
              <img src={f.img} className="rounded-xl mb-4 h-[240px] w-full object-cover" />
              <h3 className="text-xl font-semibold">{f.title}</h3>
            </div>
          ))}
        </div>
      </section> */}


{/* ================= FACILITIES (CREATIVE SWIPER) ================= */}
<section className="py-28 px-6 max-w-7xl mx-auto">
  <h2 className="text-4xl font-bold mb-16">
    World-Class Virtual Care Facilities
  </h2>

  <Swiper
    modules={[Autoplay, Pagination]}
    loop
    autoplay={{
      delay: 2600,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    }}
    pagination={{ clickable: true }}
    spaceBetween={30}
    slidesPerView={1}
    breakpoints={{
      640: { slidesPerView: 1.2 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    }}
    className="pb-14"
  >
    {facilities.map((f, i) => (
      <SwiperSlide key={i}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ y: -12, scale: 1.05 }}
          transition={{ type: "spring", stiffness: 180 }}
          className="
            group relative overflow-hidden
            rounded-[26px] bg-white
            shadow-[0_20px_40px_rgba(0,0,0,0.08)]
            hover:shadow-[0_30px_60px_rgba(0,0,0,0.14)]
            transition-all duration-500
          "
        >
          {/* IMAGE WRAPPER */}
          <div className="relative h-[260px] w-full overflow-hidden">
            {/* Shimmer Loader */}
            <div className="absolute inset-0 bg-slate-200 animate-pulse group-hover:opacity-0 transition" />

            <img
              src={f.img}
              alt={f.title}
              loading="lazy"
              className="
                h-full w-full object-cover
                scale-105 group-hover:scale-110
                transition-transform duration-700
              "
            />

            {/* Gradient Overlay */}
            <div className="
              absolute inset-0
              bg-gradient-to-t
              from-black/50 via-black/20 to-transparent
              opacity-0 group-hover:opacity-100
              transition
            " />
          </div>

          {/* CONTENT */}
          <div className="relative p-6">
            <h3 className="text-xl font-semibold text-slate-900 group-hover:text-blue-600 transition">
              {f.title}
            </h3>

            <p className="mt-2 text-sm text-slate-600 opacity-0 group-hover:opacity-100 transition">
              Secure • Reliable • Hospital-Grade
            </p>

            {/* Accent underline */}
            <div className="mt-4 h-[2px] w-0 bg-blue-600 group-hover:w-16 transition-all duration-500" />
          </div>
        </motion.div>
      </SwiperSlide>
    ))}
  </Swiper>
</section>

      

      {/* ================= HOW IT WORKS ================= */}
      <section className="bg-slate-100 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-20 text-center">
            How Video Consultation Works
          </h2>

          <div className="grid md:grid-cols-4 gap-10 text-center">
            {[
              ["Choose Doctor", "https://cdn-icons-png.flaticon.com/512/387/387561.png"],
              ["Schedule Visit", "https://cdn-icons-png.flaticon.com/512/2921/2921222.png"],
              ["Video Consultation", "https://cdn-icons-png.flaticon.com/512/1687/1687828.png"],
              ["Get Treatment", "https://cdn-icons-png.flaticon.com/512/2966/2966327.png"],
            ].map(([title, icon], i) => (
              <div key={title}>
                <img src={icon} className="h-16 mx-auto mb-6" />
                <h3 className="font-semibold text-lg">{title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= DOCTORS ================= */}
    <section className="py-28 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          Meet Our Specialists
        </h2>

        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          loop
          speed={1200}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }}
          pagination={{ clickable: true }}
          navigation
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1.2 },
            768: { slidesPerView: 2.2 },
            1024: { slidesPerView: 3 }
          }}
          className="pb-16"
        >
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <SwiperSlide key={i}>
              <motion.div
                whileHover={{ y: -12, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="
                  relative overflow-hidden rounded-[28px]
                  bg-white shadow-[0_20px_40px_rgba(0,0,0,0.08)]
                "
              >
                {/* Doctor Image */}
                <img
                  src={`https://randomuser.me/api/portraits/men/${i + 10}.jpg`}
                  alt={`Dr Specialist ${i}`}
                  className="h-72 w-full object-cover"
                  loading="lazy"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                {/* Content */}
                <div className="absolute bottom-0 p-6 text-white">
                  <h3 className="text-xl font-semibold">
                    Dr. Specialist {i}
                  </h3>
                  <p className="text-sm opacity-90">
                    Senior Consultant
                  </p>

                  {/* Availability */}
                  <span className="inline-flex items-center mt-3 text-xs bg-green-500/90 px-3 py-1 rounded-full">
                    <span className="mr-1">●</span> Available Online
                  </span>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>

      {/* ================= FINAL CTA ================= */}
      <section className="relative h-[420px]">
        <img
          src="https://images.unsplash.com/photo-1538108149393-fbbd81895907"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-blue-900/70" />
        <div className="absolute inset-0 flex items-center justify-center text-center text-white">
          <div>
            <h2 className="text-4xl font-bold mb-6">
              Healthcare Without Boundaries
            </h2>
            <p className="text-xl mb-10">
              Access expert medical care anytime, anywhere.
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
