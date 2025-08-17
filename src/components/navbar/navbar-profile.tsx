'use client'
import Image from "next/image";
import profile_picture from '../../../public/default_user_image.png';
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import NavbarProfileDropdown from "./navbar-profile-dropdown";
import { NavbarProfileProps } from "@/lib/types";

// the purpose of this component is to dispaly small profile header in navigation bar when client is loged in
export default function NavbarProfile({userData}:{userData:NavbarProfileProps}) {
  // menu profile modal state
  const [isOpen, setIsOpen] = useState<boolean>(false);
  
  return (
    <div
      className="relative py-2 px-2 flex gap-2 items-center rounded-xl hover:cursor-pointer hover:bg-[#F2F2F7]" 
      onClick={() => setIsOpen(true)}
    >
      <div className="relative w-9 h-9 rounded-full shadow-[0px_0px_3px_1px_#00000030] overflow-clip">
         <Image 
          src={userData.image || profile_picture} 
          alt="profile image" 
          fill
          className="object-cover"
        />
      </div>
     
      {/* text and state arrow */}
      <div className="flex flex-row gap-0.5 items-center">
        <p className="text-xs text-[#191919] font-normal">{userData.name}</p>
        {!isOpen 
          ? <ChevronDown  className="mt-px" color="#363638" size={20} strokeWidth={1}/>
          : <ChevronUp  className="mt-px" color="#363638" size={20} strokeWidth={1}/>
        }
      </div>
      
      {/* modal for profile  header  */}
      <NavbarProfileDropdown isOpen={isOpen} onClose={() => setIsOpen(false)} userData={userData}/>
    </div>
  )
}