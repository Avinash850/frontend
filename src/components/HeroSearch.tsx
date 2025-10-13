import { SearchIcon } from "./Icons";
import SearchBox from "./SearchBox";
import LocationSearch from "./LocationSearch";
import { getDoctorDetails } from "../services/doctorsService";
import { useContext } from "react";
import { DoctorContext } from "../context/DoctorContextProvider";


export const HeroSearch =  () => {

     const { selectedDetails, setSelectedDetails, profileData, setProfileData } = useContext(DoctorContext);
  

  const handleSearch = async() => {
    try {
      const res = await getDoctorDetails(selectedDetails)
      if(res?.data){
        setProfileData(res.data)
        const slugOrId = res.data.name || res.data.id;
        window.location.hash = `/doctor/${slugOrId}`;
      }
      console.log("ofjsfj:", res)
    } catch (error) {
     console.log("err->", error) 
    }
  }

    return(
        <div className="max-w-4xl mx-auto bg-white/70 backdrop-blur-md border border-slate-200 p-5 rounded-2xl shadow-2xl flex flex-col md:flex-row items-center gap-3 relative animate-fadeInUp delay-300">
          <LocationSearch />
          <div className="hidden md:block w-px h-10 bg-slate-300" />
          <SearchBox />
          <button
          onClick={handleSearch}
            className="w-full md:w-auto bg-gradient-to-r from-indigo-600 to-pink-500 text-white font-semibold py-3 px-8 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <SearchIcon color="white" className="w-5 h-5 animate-bounce-slow" />
            Search
          </button>
        </div>
    )
}