"use client";
import { LandingSearchFormLocationDropdownNoResult } from "./landing-search-form-location-dropdown-no-result";
import { useDebounce } from "@/app/search/hooks";
import { LandingSearchFormLocationDropdownResult } from "./landing-search-form-location-dropdown-result";
import { LandingSearchFormLocationDefault } from "./landing-search-form-location-default";

type LandingSearchFormLocationDropdownProps = {
  isOpen: boolean
  onClose: () => void
  locationInput:string
  setLocation: (category?:string) => void
}

export const LandingSearchFormLocationDropdown = ({isOpen, onClose, setLocation, locationInput}: LandingSearchFormLocationDropdownProps) => {
  const debouncedInput = useDebounce(locationInput, 300)
  if(!isOpen) return null

  return (
    <div className="absolute max-h-48 p-3 overflow-scroll bg-[#FFF] top-full  mt-0.5 w-full rounded-lg inset-shadow-glass z-10">
      {(locationInput.length > 0 && locationInput.length < 3) && 
        <LandingSearchFormLocationDropdownNoResult 
          onClose={onClose} 
          setLocation={setLocation}
        />
      }

      {locationInput.length == 0 && 
        <LandingSearchFormLocationDefault onClose={onClose} setLocation={setLocation}/> 
      }

      {locationInput.length >=3 && 
        <LandingSearchFormLocationDropdownResult 
          onClose={onClose} 
          setLocation={setLocation} 
          locationInput={debouncedInput}
        />
      }
    </div>
  )
}