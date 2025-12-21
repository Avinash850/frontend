import { SearchIcon } from "./Icons";
import SearchBox from "./search/SearchBox";
import LocationSearch from "./search/LocationSearch";

import SearchBtn from "./search/SearchBtn";


export const HeroSearch = ({ mode }) => {
  
  return(
    <div className="max-w-4xl mx-auto bg-white/70 backdrop-blur-md border p-5 rounded-2xl shadow flex gap-3 relative animate-fadeInUp delay-300 z-50">
      <LocationSearch disabled={mode === "readonly"} />
      <div className="hidden md:block w-px h-10 bg-slate-300" />
      <SearchBox disabled={mode === "readonly"} />
    </div>
  );
};
