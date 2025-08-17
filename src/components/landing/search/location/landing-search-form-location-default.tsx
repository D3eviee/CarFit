type LandingSearchFormLocationDefaultProps = {
  onClose: () => void
  setLocation: (category:string) => void
}

const LOCATIONS = [
  "Warszawa", 
  "Gdańsk", 
  "Kraków", 
  "Poznań",
  "Katowice",
  "Gdynia",
  "Białystok",
  "Toruń",
  "Bydgoszcz",
];

export const LandingSearchFormLocationDefault = ({onClose, setLocation}: LandingSearchFormLocationDefaultProps) => {
  const handleSelection = (location:string) =>{
    setLocation(location) 
    onClose() 
  }

  return (
    <div className="flex flex-col gap-2">
      <p className="p-1 text-sm text-[#0C0C0C] font-medium">Miasta</p>
      {LOCATIONS.map((category, index) => (
        <div 
        key={index} 
        onClick={() => handleSelection(category)}
        className="text-sm text-[#0C0C0C] font-base px-3 py-3  rounded-xl hover:bg-[#F2F2F7]"
        >
          {category}
        </div>
      ))}
    </div>
  )
}