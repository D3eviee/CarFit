'use client'
import { useParams, useRouter } from "next/navigation";
import { useAppointmentStore, useCalendarStore, useModalStore } from "@/lib/store";

export const BookingAbortModal = () =>  {
  const router = useRouter()
  const path = useParams()

  // ZUSTAND STORE FOR CLOSING MODAL
  const closeModal = useModalStore(store => store.closeModal)

  // ZUSTAND STORE FOR RESEETING BOOKING PROCESS
  const setSelectedDate = useCalendarStore((store) => store.setSelectedDate)
  const resetSelectedServices = useAppointmentStore((store) => store.resetSelectedServices)
  const resetAppointmentTime = useAppointmentStore((store) => store.resetAppointmentTime)
  const resetClientMessage = useAppointmentStore((store) => store.resetClientMessage)

  const handleBookingAbort = () => {
    router.push(`/service/${path.business}`)
    closeModal()
    resetSelectedServices()
    resetAppointmentTime()
    resetClientMessage()
    setSelectedDate(new Date)
  }

  return (
    <div className="flex flex-col px-3 pt-5 pb-3 bg-white backdrop-blur-[3px] ring-1 ring-white inset-shadow-white rounded-2xl max-w-[300px]  text-black space-y-5">
        <p className="px-1 text-[#191919] text-[15px] text-pretty text-left font-normal tracking-tighter">Czy na pewno chcesz opuścić stronę? Postęp rezerwacji zostanie utracony.</p>
      
      {/* CONTENT */}
      <div className="w-full flex flex-row gap-2.5">
        <div 
          onClick={closeModal}
          className="w-full text-center justify-center py-2 bg-[#F2F2F7] backdrop-blur-sm text-[#0C0C0C] rounded-3xl shadow-bnw-y-small shadow-inner-glass  hover:cursor-pointer hover:bg-[#E1E1E6] active:scale-105"
        >
          Anuluj
        </div>
        
        <div 
          onClick={handleBookingAbort}
          className="w-full text-center justify-center py-2 bg-[#191919] backdrop- text-white rounded-3xl shadow-inner-glass hover:cursor-pointer hover:bg-[#333] active:scale-105"
        >
          Wyjdź
        </div>
      </div>
    </div>
  )
}