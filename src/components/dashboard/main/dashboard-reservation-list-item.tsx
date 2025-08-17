import { format, getDate } from "date-fns";
import { displayAppointmentTime } from "@/utils";
import { AppoinmentProps } from "@/lib/types";
import { useModalStore } from "@/lib/store";
import { DashboardHomeDetailsModal } from "@/components/modals/home/dashboard-home-details-modal";
import { pl } from "date-fns/locale";

export const DashboardReservationListItem = ({reservation}:{reservation:AppoinmentProps}) => {
  const {duration, status, charge, reservationStart, service} = reservation
  const openModal = useModalStore(store => store.openModal)
  const handleOpeningModal = () => openModal(<DashboardHomeDetailsModal appointmentData={reservation}/>)

  const monthDay = getDate(reservation.reservationStart)
  const monthRaw = format(reservation.reservationStart, "MMM", {locale: pl})
  const monthFormatted = monthRaw[0].toUpperCase() + monthRaw.slice(1)

  const dayOfWeek = format(reservationStart, "EEEE", {locale: pl})
  const dayOfWeekFormatted = dayOfWeek[0].toUpperCase() + dayOfWeek.slice(1)
  const day = format(reservationStart, "d")
  const fullMonthRaw = format(reservationStart, "MMMM", {locale: pl})
  const fullMonthFormatted = fullMonthRaw[0].toUpperCase() + fullMonthRaw.slice(1)
  const hour = format(reservationStart, "k")
  const minute = format(reservationStart, "mm")

  return (
    <div 
      onClick={handleOpeningModal}
      className="w-full flex flex-row gap-2 px-2 py-4 bg-[#F2F2F7] border-[0.5px] border-[#D4D4D4] rounded-2xl hover:cursor-pointer active:scale-[0.99] transition-all duration-75 ease-in"
    >
      {/* EVENT DATE */}
      <div className="flex flex-col text-right">
        <h1 className="leading-5 text-xl  text-[#191919] font-normal">{monthDay}</h1>
        <h1 className="leading-5 text-md  text-[#191919] font-light">{monthFormatted}</h1>
      </div>

      {/* DEVIDER LINE */}
      <hr className="h-full w-[0.5px] bg-[#E8E9EB]"/>
      
      {/* CONTENT BOX */}
      <div className="flex flex-col gap-2 w-full">
        {/* EVENT TIME */}
        <p className="text-sm text-[#191919]">{`${hour}:${minute} | ${dayOfWeekFormatted} ${day} ${fullMonthFormatted}`}</p>       

        {/* EVENT SERVICES */}
        <div className="flex flex-row flex-wrap gap-2">
          {service.map((item) => <p  key={item.name} className="text-xs border-[0.5px] border-[#EEE] text-[#000] font-normal bg-[#FFF] px-2 py-1 rounded-lg">{item.name}</p>)}
        </div>

        {/* EVENT DURATION AND CHANGE */}
        <div className="flex flex-row items-center gap-2">
            {/* EVENT DURATION*/}
            <div className="px-3 py-1 flex flex-row items-center bg-[#5D44F8] rounded-lg">

              <p className="text-xs text-[#FFF] font-medium leading-none ">{displayAppointmentTime(duration)}</p>
            </div>
            {/* EVENT CHARGE*/}
            <div className="px-3 py-1 flex flex-row items-center bg-[#098EFF] rounded-lg">
              <p className="text-xs text-[#FFF] font-medium leading-none">{charge} PLN</p>
            </div>
        </div> 
        {/* EVENT STATUS */}
        {status == "Odwołana" && <p className="w-fit text-xs text-[#FFF] font-medium leading-none  px-2 py-1 rounded-md bg-[#FF5F58]">{status}</p>}
        {status == "Oczekująca" && <p className="w-fit text-xs text-[#FFF] font-medium leading-none  px-2 py-1 rounded-md bg-[#FDBC2C]">{status}</p>}
        {status == "Zarezerwowana" && <p className="w-fit text-xs text-[#FFF] font-medium leading-none  px-2 py-1 rounded-md bg-[#28C840]">{status}</p>}
      </div>
    </div>
  )
}
