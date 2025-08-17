'use client'
import UserAppointmentDeleteModal from "./user-appointment-delete-modal";
import { useModalStore } from "@/lib/store";

export default function UserAppointmenetDetailsRescheduleButton({id}:{id:string}){
  const openModal = useModalStore(store => store.openModal)
  const handleOpeninModal = () => openModal(<UserAppointmentDeleteModal id={id}/>)

  return (
    <button 
      className="w-full bg-[#1877f2] text-white py-1 rounded hover:cursor-pointer hover:bg-[#0766E1]"
      onClick={handleOpeninModal}
    >
      Przełóź
    </button>
  )
}
