'use client'
import { DashboardCalendarAppointmentDetailsModal } from "@/components/modals/dashboard-calendar-appointment-details-modal"
import { useModalStore } from "@/lib/store"
import { CalendarAppointmentOverviewProps } from "@/lib/types"
import { cn } from "@/utils"
import { addMinutes, format } from "date-fns"

export const DashboardCalendarEventListItem = ({appointmentData}:{appointmentData:CalendarAppointmentOverviewProps}) => {
  const openModal = useModalStore(store => store.openModal)
  const eventEnd = addMinutes(appointmentData.reservationStart, appointmentData.duration)
  const eventStartFormated = `${format(appointmentData.reservationStart, 'kk')}:${format(appointmentData.reservationStart, 'mm')}`
  const eventEndFormated = `${format(eventEnd, 'kk')}:${format(eventEnd, 'mm')}`

  const handleOpeningDetailsModal = () => openModal(<DashboardCalendarAppointmentDetailsModal appointmentData={appointmentData}/>)

  return (
    <div 
      onClick={handleOpeningDetailsModal}
      className="w-full px-2.5 py-3  rounded-xl flex flex-row justify-between items-center border-b-[0.5px] border-b-[#F2F2F2] hover:cursor-pointer hover:bg-[#F2F2F7]"
    >
        <div className="relative flex flex-row gap-2 items-center">
          <div className={cn("w-1.5 h-1.5 rounded-full", 
            appointmentData.status == "Odwołana" && "bg-[#FF5F58]",
            appointmentData.status == "Oczekująca" && "bg-[#FDBC2C]",
            appointmentData.status == "Zarezerwowana" && "bg-[#28C840]",
          )}/>

          <div className="flex flex-col gap-1.5">
            {appointmentData.service.map((service, index) => (
            <h1 key={index} className="text-md text-[#111] font-medium leading-none">{service.name}</h1>))}
          </div>
      </div>
      <p className="text-sm font-normal leading-none">{eventStartFormated} - {eventEndFormated}</p>
    </div>    
  );
}