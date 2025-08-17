import Link from "next/link";
import { GoHome } from "react-icons/go";

type SettingGridItemProps = {
  title:string 
  description:string 
  route:string
}

export function SettingGridItem({title, description, route}:SettingGridItemProps){
  return(
    <Link href={`${route}`}>
      <div 
        className="w-full h-24 flex flex-row items-center bg-[#F9F9F9] ring-[0.5px] ring-[#D4D4D4] shadow-lg p-4 rounded-2xl inset-shadow-glass hover:cursor-pointer hover:bg-[#FFF] active:scale-[0.98]"
      >
        {/* ICON */}
        <div className="w-1/7">
          <GoHome size={35} strokeWidth={0.01} color="#2B2B2B"/>
        </div>
        {/* TEXTS */}
        <div className="flex flex-col gap-0.5 px-3 w-full">
          <p className="text-[#242426] tracking-tight">{title}</p>
          <p className="font-light text-[#2B2B2B] text-small leading-4.5 text-pretty">{description}</p>
        </div>
      </div>
    </Link>
  )
}