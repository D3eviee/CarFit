'use client'
import { cn } from "@/utils"
import { HelpCircle, Settings } from "lucide-react"
import Link from "next/link"
import { SidebarLogoutButton } from "./sidebar-logout-button"
import { useDashboardSidebar } from "@/lib/store"

export const SidebarNavigationOptions = ({activePage}:{activePage:string}) => {
  const isMenuOpen = useDashboardSidebar(store => store.isMenuOpen)
  const mainPages = [
    { link: "/dashboard/settings", text: "Ustawienia", icon: Settings },
    { link: "/dashboard/support", text: "Pomoc", icon: HelpCircle },
  ]

  return (
    <div className="w-full flex flex-col gap-2.5">
      {mainPages.map((path, index) => {
        const isActive =  activePage == path.link
        const Icon = path.icon
        
        return (
          <Link href={path.link} key={index}>
            <div 
              className={cn("w-full py-1.5 px-2 flex flex-row items-center gap-2 rounded-lg hover:bg-[#F2F2F2] active:scale-95", 
              isActive && "bg-[#FFF] ring-[0.5px] ring-[#DFDFE1] shadow-md hover:bg-[#FFF]",
              isMenuOpen ? "justify-start" : "justify-center")}
            >
              <Icon size={isMenuOpen ? 18 : 20} strokeWidth={isActive ? 2 : 1.5} className={cn("text-[#7B7C7E]", isActive && "text-[#36373A]")}/>
              {isMenuOpen && <p className={cn("text-sm text-[#7B7C7E]", isActive && "text-[#36373A] font-medium")}>{path.text}</p>}
            </div>
          </Link>
        )
      })}
      
      <SidebarLogoutButton/>
    </div>
  )
}