import { CalendarAppointmentOverviewProps } from "@/lib/types";
import { getHours, getMinutes } from "date-fns";
import Image from "next/image";
import client_profile_picture from "@/../public/default_user_image.png"
import { displayAppointmentHours } from "@/utils";
import { useModalStore } from "@/lib/store";
import { DashboardCalendarAppointmentDetailsModal } from "@/components/modals/dashboard-calendar-appointment-details-modal";

export const DashboardCalendarPrimaryWeekViewAppointment = ({appointment}:{appointment:CalendarAppointmentOverviewProps}) => {
  const {clientImage, clientName, duration, reservationStart, service} = appointment
  const openModal = useModalStore(store => store.openModal)
  const handleOpeningDetailsModal = () => openModal(<DashboardCalendarAppointmentDetailsModal appointmentData={appointment}/>)
  const startHour = getHours(reservationStart)-6;

  const startMinutes = getMinutes(reservationStart);
  const blockHeight = Math.round(duration * 1.31);
  const top = (startHour * 80 + startMinutes * 1.33)+4;
  const firstService = service[0].name
  const numberOfServices = service.length
  
  return (
    <div
      onClick={handleOpeningDetailsModal}
      className="absolute left-1/2 -translate-x-1/2 trans w-[95%] text-white text-sm bg-[#191919] rounded-xl hover:cursor-pointer hover:bg-[#2B2B2B] active:scale-[0.98]"
      style={{ top:`${top}px`, height: `${blockHeight}px`}}
    >
      {duration <= 30 && 
        <div className="flex flex-row justify-between items-center px-1 h-full ">
          <p className="font-medium text-xs text-[#F9F9F9]">{firstService} {numberOfServices > 1 && `+ ${numberOfServices-1} usługa`}</p>
        </div>
      }

      {( duration > 30 && duration <= 90 ) && 
        <div className="flex flex-col h-full p-2">
          <p className="font-medium text-xs text-[#F9F9F9]">{firstService} {numberOfServices > 1 && `+ ${numberOfServices-1} usługa`}</p>
          <p className="font-normal text-xs text-[#F9F9F9]">{displayAppointmentHours(reservationStart, duration)}</p>
        </div>
      }

      {duration > 90 && 
        <div className="flex flex-col justify-between h-full p-2">
          <div className="flex flex-col justify-between">
            <p className="font-medium text-xs text-[#F9F9F9]">{firstService} {numberOfServices > 1 && `+ ${numberOfServices-1} usługa`}</p>
            <p className="font-normal text-xs text-[#F9F9F9]">{displayAppointmentHours(reservationStart, duration)}</p>
          </div>

          <div className="w-full flex flex-row gap-2 items-center">
            <div className="relative min-w-6 min-h-6 max-w-6 max-h-6 overflow-hidden rounded-full aspect-square">
              <Image 
                src={clientImage || client_profile_picture}
                alt="client picture"
                className="object-cover"
                fill
              />
            </div>
            <div className="w-full flex flex-col">
              <p className="font-normal text-xs text-[#F9F9F9]">{clientName}</p>
            </div>
          </div>
        </div>
      }  
    </div>
  )
}