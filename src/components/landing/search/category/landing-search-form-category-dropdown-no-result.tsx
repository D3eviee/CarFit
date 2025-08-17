import { LandingSearchFormCategoryDefault} from "./landing-search-form-category-default";

type LandingSearchFormCategoryDropdownNoResultProps = {
  onClose: () => void
  setInputState: () => void
}

export const LandingSearchFormCategoryDropdownNoResult = ({onClose, setInputState}: LandingSearchFormCategoryDropdownNoResultProps) => {
  return (
    <div className="flex flex-col gap-5">
      {/* No result text */}
      <div className="w-full flex flex-col gap-1.5 px-4 py-3 justify-center text-center bg-[#F9F9F9] border-[0.5px] border-[#D4D4D4] rounded-2xl ">
        <h1 className="text-sm text-[#0C0C0C] font-medium tracking-wide leading-none">Brak wyników</h1>
        <p className="text-xs text-[#0C0C0C] font-light tracking-wide">Wyczyść wyszukiwanie lub wybierz jedną z poniższych opcji</p>
      </div>

      {/* display more options for category */}
      <LandingSearchFormCategoryDefault onClose={onClose} setInputState={setInputState}/>
    </div>
  )
}
