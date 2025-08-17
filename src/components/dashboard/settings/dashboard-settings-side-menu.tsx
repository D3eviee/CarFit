'use client'
import { cn } from "@/utils";
type SettingsBusinessMenuProps = {
  openView?: string
  changeViewFn?: (link:string) => void 
  pages: {
    title: string
    view: string
  }[]
}

export const DasboardSettingsSideMenu = ({openView, changeViewFn, pages}:SettingsBusinessMenuProps) => {
  return (
    <div className="h-fit w-full flex flex-col gap-4 p-0.5 border-[0.5px] border-[#D4D4D4] shadow-lg rounded-2xl md:w-1/3 lg:w-[200px]">
      <div className="flex flex-row md:flex-col p-0.5 gap-1 md:gap-3 md:p-2">
        {pages.map((page, index) => (
          <p 
            key={index}
            className={cn("text-center w-full px-2 py-2 text-sm font-light text-[#555555] rounded-xl  hover:cursor-pointer lg:text-left active:scale-95",  
            openView == page.view ? "bg-[#111] text-white font-medium" : "hover:bg-[#F2F4F8]")}
            onClick={() => changeViewFn(page.view)}
          >
            {page.title}
          </p>
        ))}
      </div>
    </div>
  )
}