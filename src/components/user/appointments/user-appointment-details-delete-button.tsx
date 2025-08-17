'use client'
import UserAppointmentDeleteModal from "./user-appointment-delete-modal";
import { useModalStore } from "@/lib/store";

export const UserAppointmenetDetailsDeleteButton = ({id}:{id:string}) => {
  const openModal  = useModalStore(store => store.openModal)
  const handleCancelButton = () => openModal(<UserAppointmentDeleteModal id={id}/>)
  
  return (
    <button 
      className="w-full bg-[#CF142B] shadow-inner-glass text-white py-2 rounded-lg hover:cursor-pointer hover:bg-[#BE031A]"
      onClick={handleCancelButton}
    >
      Odwołaj
    </button>
  )
}