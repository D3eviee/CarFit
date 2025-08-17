import { LogOut } from "lucide-react";
import { useModalStore } from "@/lib/store";
import { LogoutModal } from "../modals/logout-modal";

export function NavbarProfileDropdownLogoutButton() {
  const openModal = useModalStore(store => store.openModal)
  const handleOpeningLogoutModal = () => openModal(<LogoutModal/>)
  
  return (
    <div 
      className="flex flex-row gap-2 items-center px-2 py-1.5 rounded-md border-[0.5px] border-transparent bg-[#EC6A5C] hover:bg-[#DB593B] hover:border-[#EC6A5C] hover:cursor-pointer"
      onClick={handleOpeningLogoutModal}
    >
      <LogOut color="#FFF" strokeWidth="1.5px" size={16}/>
      <p className="text-xs text-[#FFF] font-base ">Wyloguj</p>
    </div>
  )
}