'use client'
import { useMobileNavigationStore } from "@/lib/store";
import DashboardMobileNavbarMenu from "./dashboard-mobile-navbar-menu";

export default function DashboardMobileNavbarMenuButton() {
  const openMenu = useMobileNavigationStore(store => store.openMenu)
  const handleOpenMenu = () => openMenu(<DashboardMobileNavbarMenu/>)

  return (
    <div 
      className="bg-linear-to-b from-[#313131] to-[#141414] text-white py-1 px-5 rounded-[4px] lg:hidden"
      onClick={handleOpenMenu}
    >
      Menu
    </div>
  )
}