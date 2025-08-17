"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LandingSearchFormLocation } from "./location/landing-search-form-location";
import { LandingSearchFormCategory }  from "./category/landing-search-form-category";

export const LandingSearchForm = () => {
  const router = useRouter()
  const [category, setCategory] = useState("")
  const [location, setLocation] = useState("");

   const handleSubmit = () => {
    const params = new URLSearchParams();
    if (location.trim()) params.append('location', location);
    if (category.trim()) params.append('category', category);

    const queryString = params.toString()
    const url = `/search?${queryString}`;
    router.push(url);
  };

  return (
    <form className="flex flex-col px-4 py-6 bg-[#F2F2F7] inset-shadow-glass rounded-3xl gap-3 md:flex-row md:rounded-2xl md:px-3 md:py-2">
      <div className="w-full flex flex-col gap-3 sm:flex-row">
        <LandingSearchFormCategory
        categoryState={category}
        setCategoryState={setCategory}
        />
        <LandingSearchFormLocation
          locationState={location}
          setLocationState={setLocation}
        />
      </div>

      <button
        type="button" 
        onClick={handleSubmit}
        className="w-full font-medium text-base px-6 py-3 rounded-xl bg-linear-to-b from-[#313131] to-[#141414] shadow-md text-white md:w-fit md:rounded-xl md:px-9 hover:cursor-pointer active:scale-xs"
      >
        Szukaj
      </button>
    </form>
  )
}