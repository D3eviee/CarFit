'use client'
import { useModalStore } from "@/lib/store"
import { DashboardAppointmentsDetailsModalCancelModal } from "./dashboard-appointments-details-modal-cancel-modal"

export const DashboardAppointmentsDetailsModalCancel= ({appointmentId}:{appointmentId:string}) => {
  const openModal = useModalStore(store => store.openModal)
  const handleOpenCancelModal = () => openModal(<DashboardAppointmentsDetailsModalCancelModal  appointmentId={appointmentId}/>)

  return(
    <div 
      onClick={handleOpenCancelModal}
      className="mt-4 w-fit px-3 py-1 mx-auto rounded-2xl text-[#FF453A] text-middle hover:cursor-pointer hover:text-[#EE564B] active:bg-[#F2F2F7] active:scale-105"
    >
      Odwołaj wizytę
    </div>
  )
}
