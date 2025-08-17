"use client";
import { useDebounce } from "@/app/search/hooks";
import { LandingSearchFormCategoryDropdownNoResult } from "./landing-search-form-category-dropdown-no-result";
import { LandingSearchFormCategoryDefault } from "./landing-search-form-category-default";
import { LandingSearchDropdownCategoryResult } from "./landing-search-form-category-dropdown-result";

type LandingSearchFormCategoryDropdownProps = {
  isOpen: boolean
  onClose: () => void
  categoryInput:string
  setCategory: (category?:string) => void
}

export const LandingSearchFormCategoryDropdown =({isOpen, onClose, setCategory, categoryInput}: LandingSearchFormCategoryDropdownProps) => {
  const debouncedInput = useDebounce(categoryInput, 300)

  if(!isOpen) return null
  return (
    <div className="absolute max-h-48 p-3 overflow-scroll bg-[#FFF] top-full mt-1 w-full rounded-lg inset-shadow-glass z-10">
      {(categoryInput.length > 0 && categoryInput.length < 2) && 
        <LandingSearchFormCategoryDropdownNoResult onClose={onClose} setInputState={setCategory} />
      }

      {categoryInput.length == 0 && <LandingSearchFormCategoryDefault onClose={onClose} setInputState={setCategory}/>}

      {categoryInput.length > 1 &&
        <LandingSearchDropdownCategoryResult
          categoryInput={debouncedInput} 
          onClose={onClose}
          setCategory={setCategory}
        />
      }
    </div>
  )
}