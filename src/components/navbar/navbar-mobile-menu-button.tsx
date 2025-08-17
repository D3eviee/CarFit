'use client'
import { NavbarProfileProps } from "@/lib/types";
import NavbarMobileMenu from "./navbar-mobile-menu";
import { useMobileNavigationStore } from "@/lib/store";

// this component provides button for opening mobile navigation menu
export default function NavbarMobileMenuButton({userData}:{userData:NavbarProfileProps}) {
  const openMenu = useMobileNavigationStore(store => store.openMenu)
  const handleOpeningMenu = () =>  openMenu(<NavbarMobileMenu userData={userData}/>)

  return (
    <div
      className="bg-linear-to-b from-[#313131] to-[#141414] text-white py-1 px-5 rounded-[4px] md:hidden" 
      onClick={handleOpeningMenu}
    >
      Menu
    </div>
  )
}