'use client'
import { DashboardCalendarAddAppointmetModal } from "@/components/modals/dashboard-calendar-add-appointmet-modal";
import { useModalStore } from "@/lib/store";

export const DashboardCalendarAddApppointmentButton = () =>  {
  const openModal = useModalStore(store => store.openModal)
  const handleOpeningModal = () => openModal(<DashboardCalendarAddAppointmetModal/>)

  return (
    <button 
      className="py-1.5 px-3 text-sm font-medium text-[#FFF] bg-black rounded-md shadow-[0px_1px_1px_0px_#00000040] outline-none hover:cursor-pointer hover:bg-[#111] active:scale-95"
      onClick={handleOpeningModal}
    >
      Nowa wizyta
    </button>
  )
}