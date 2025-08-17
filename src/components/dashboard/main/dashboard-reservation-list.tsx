import { AppoinmentProps } from "@/lib/types";
import { DashboardReservationListItem } from "./dashboard-reservation-list-item";

export const DashboardReservationList = ({reservations}: {reservations:AppoinmentProps[]}) => {
  return (
    <div className="w-full p-5 flex flex-col gap-4 ring-[0.5px] ring-[#D4D4D4] shadow-lg rounded-3xl lg:w-2/3 xl:w-[800px]">
      <p className="text-[#191919] text-md font-medium">Dzisiejsze wizyty</p>
      <div className="flex flex-col gap-3 overflow-scroll">
        {reservations?.map((item, index) => (<DashboardReservationListItem key={index} reservation={item}/>))}
        {reservations.length == 0 && <p className="text-center text-sm text-[#191919] font-light py-10">Brak wizyt</p>}
      </div>
    </div>
  )
}