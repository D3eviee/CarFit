import { AppointmentDetails} from "@/lib/types";
import { Calendar, Clock4Icon, MapPin, NotebookPen} from "lucide-react";
import { UserAppointmenetDetailsDeleteButton } from "./user-appointment-details-delete-button";
import { format } from "date-fns";
import { displayAppointmentTime } from "@/utils";
import { ModalBackButton } from "@/components/buttons/modal-back-button";
import { pl } from "date-fns/locale";

export default function UserAppointmentDetailsModal({appointmentDetails}:{appointmentDetails: AppointmentDetails}){
  const {business, duration, reservationStart, services, status} = appointmentDetails
  const location = `${business.street}, ${business.district}, ${business.town}`
  const day = format(reservationStart, "d", {locale: pl})
  const month = format(reservationStart, "LLLL", {locale: pl})
  const monthFormatted = month[0].toUpperCase() + month.slice(1)
  const year = format(reservationStart, "y")
  const fullDate = `${day} ${monthFormatted} ${year}`
  const hour = ` ${format(reservationStart, "HH")}:${format(reservationStart, "mm")}`
  const dayOfWeek = format(reservationStart, "EEEE", {locale: pl})
  const dayOfWeekFormatted = dayOfWeek[0].toUpperCase() + dayOfWeek.slice(1)
  const total = services.reduce((sum, item) => { return Number(item.service.price)+ sum}, 0);

  return (  
    <div className="relative h-full w-full overflow-scroll bg-white md:rounded-2xl md:max-w-[600px] md:h-[650px]">
      <div className="w-full z-10 p-4 md:absolute md:bg-[#FFF] md:shadow-small md:max-w-[600px] md:rounded-t-2xl">
        <ModalBackButton />
      </div>

      <div className="mt-25 px-8 flex flex-col gap-8">
        {/* TOP HEADER */}
        <div className="flex flex-col gap-2.5">
          <h1 className="w-full text-[#191919] text-2xl font-bold text-pretty tracking-tight">{business.name}</h1>
          {status == "Zarezerwowana" && <div className='text-xs text-white bg-green-700/90 py-1 px-3 rounded-md w-fit'>{status}</div>}
          {status == "Odwołana" && <div className='text-xs text-white bg-[#CF142B] py-1 px-3 rounded-md w-fit'>{status}</div>}
        </div>

        {/* BASIC APPOINTMENT INFO */}
        <div className="relative flex flex-col gap-4">
          {/* LOCATION  */}
          <div className="flex flex-row gap-2 items-center">
            <MapPin size={20} color="#242426" strokeWidth={2}/>
            <p className="text-sm text-[#242426] font-normal">{location}</p>
          </div>
          {/* DATE */}
          <div className="flex flex-row gap-2 items-center">
            <Calendar size={20} color="#242426" strokeWidth={2}/>
            <p className="text-sm text-[#242426] font-normal">{`${dayOfWeekFormatted}, ${fullDate}, ${hour}`}</p>
          </div>
          {/* DURATION */}
          <div className="flex flex-row gap-2 items-center">
            <Clock4Icon size={20} color="#242426" strokeWidth={2}/>
            <p className="text-sm text-[#242426] font-normal">{displayAppointmentTime(duration)}</p>
          </div>
          
          {appointmentDetails.clientMessage && 
            <div className="flex flex-row gap-2 items-start">
              <NotebookPen size={20 }color="#242426" strokeWidth={2}/>
              <p className="w-full text-sm text-[#242426] font-normal text-justify">{appointmentDetails.clientMessage}</p>
            </div>
          }
        </div>

        {/* ORDERED SERVICES */}
        <div className="flex flex-col rounded-xl gap-2 px-6 py-4 ring-offset-2 ring-2 ring-[#F2F2F7] inset-shadow-glass">
          <p className="text-sm text-[#242426] font-medium">Zamówione usługi</p>
          <div className="flex flex-col gap-2">
            {services.map((service, index) => 
              <div key={index} className="flex flex-row justify-between items-center px-1">
                <p className="text-sm text-[#363638] font-light">{service.service.name}</p>
                <p className="text-sm text-[#363638] font-light tracking-normal">{service.service.price} PLN</p>
              </div>
            )}
          </div>
          <hr className="text-[#F2F2F7]"></hr>
          <div className="flex flex-row justify-between items-center pl-1 pr-0.5">
            <p className="text-[#242426] text-sm font-bold">Razem</p>
            <p className="px-1.5 py-0.5 bg-[#242426] text-white text-sm font-medium rounded-lg tracking-wide">{total} PLN</p>
          </div>
        </div>

      </div>
      {/* CANCEL APPOINTMENT BUTTON */}
        {status != "Odwołana" &&
          <div className="absolute bottom-10 w-full  px-8">
            <UserAppointmenetDetailsDeleteButton id={appointmentDetails.id}/>
          </div>
        }
    </div>
  )
}
