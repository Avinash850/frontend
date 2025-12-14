import { SearchIcon } from "./Icons";
import SearchBox from "./search/SearchBox";
import LocationSearch from "./search/LocationSearch";

import SearchBtn from "./search/SearchBtn";


export const HeroSearch =  () => {

    return(
        <div className="max-w-4xl mx-auto bg-white/70 backdrop-blur-md border border-slate-200 p-5 rounded-2xl shadow-2xl flex flex-col md:flex-row items-center gap-3 relative animate-fadeInUp delay-300">
          <LocationSearch />
          <div className="hidden md:block w-px h-10 bg-slate-300" />
          <SearchBox />
          <SearchBtn/>
        </div>
    )
}