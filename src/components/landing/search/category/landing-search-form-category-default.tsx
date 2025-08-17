import { SERVICES_CATEGORIES } from "@/lib/data";

type LandingSearchFormCategoryDefaultProps = {
  onClose: () => void
  setInputState: (option:string) => void
}

export const LandingSearchFormCategoryDefault = ({onClose, setInputState}: LandingSearchFormCategoryDefaultProps) => {
  const handleSelection = (option:string) => {
    setInputState(option) 
    onClose() 
  }

  const categories = SERVICES_CATEGORIES.map(item => item.name)

  return (
    <div className="flex flex-col gap-2">
      <p className="p-1 text-sm text-[#0C0C0C] font-medium">Kategorie</p>
      {categories.map((defaultOption, index) => (
        <div 
        key={index} 
        onClick={() => handleSelection(defaultOption)}
        className="text-sm text-[#0C0C0C] font-base px-3 py-3  rounded-xl hover:bg-[#F2F2F7]"
        >
          {defaultOption}
        </div>
      ))}
    </div>
  )
}