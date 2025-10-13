
import { HeroSearch } from "./HeroSearch";

const Hero = () => {



  return (
    <section className=" py-16 md:py-28 bg-gradient-to-br from-indigo-100 via-white to-pink-100">
      {/* Animated gradient blobs for subtle background effect */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-indigo-300 opacity-20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-300 opacity-20 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="relative container mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-800 mb-6 leading-tight animate-fadeInUp">
          Your Journey to <span className="text-indigo-600">Parenthood</span>,<br className="hidden md:block" /> Guided with Care.
        </h1>
        <p className="text-lg md:text-xl text-slate-600 mb-12 animate-fadeInUp delay-200">
          Find and book appointments with the best doctors near you.
        </p>

        <HeroSearch/>
      </div>
    </section>
  );
};

export default Hero;
