import { SearchIcon } from "../Icons";
import { getDoctorDetails } from "../../services/doctorsService";
import { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContextProvider";

export const SearchBtn = () => {

         const { selectedDetails, selectedLocation, profileData, setProfileData } = useContext(DoctorContext);

  const handleSearch = async() => {
    try {
      console.log("click =======>", selectedDetails)

      const res = await getDoctorDetails({selectedLocation})
      if(res?.data){
        setProfileData(res.data)
       const id = res.data.id;
       const type = res.type;

        const nameSlug = encodeURIComponent(res.data.name);
        window.location.hash = `/${type}/${id}/${nameSlug}`;
      }
      console.log("ofjsfj:", res)
    } catch (error) {
     console.log("err->", error) 
    }
  }

    return(
        <button
          onClick={handleSearch}
            className="w-full md:w-auto bg-gradient-to-r from-indigo-600 to-pink-500 text-white font-semibold py-3 px-8 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <SearchIcon color="white" className="w-5 h-5 animate-bounce-slow" />
            Search
          </button>
    )
}
export default SearchBtn;