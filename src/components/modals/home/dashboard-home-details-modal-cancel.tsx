'use client'
import { useModalStore } from "@/lib/store"
import { DashboardHomeDetailsModalCancelModal } from "./dashboard-home-details-modal-cancel-modal"

export const DashboardHomeDetailsModalCancel= ({appointmentId}:{appointmentId:string}) => {
  const openModal = useModalStore(store => store.openModal)
  const handleOpenCancelModal = () => openModal(<DashboardHomeDetailsModalCancelModal  appointmentId={appointmentId}/>)

  return(
    <div 
      onClick={handleOpenCancelModal}
      className="mt-4 w-fit px-3 py-1 mx-auto rounded-2xl text-[#FF453A] text-middle hover:cursor-pointer hover:text-[#EE564B] active:bg-[#F2F2F7] active:scale-105"
    >
      Odwołaj wizytę
    </div>
  )
}
