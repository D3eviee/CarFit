type DashboardCalendarModalAppointmentDetailsClientProps = {
    clientMessage:string
}
 
export const DashboardCalendarModalAppointmentDetailsMessage = ({clientMessage}:DashboardCalendarModalAppointmentDetailsClientProps) => {
    return (
      <div className="flex flex-col gap-2 p-4 bg-[#F9F9F9] rounded-2xl ring-[0.5px] ring-[#D4D4D4] shadow-sm">
        <p className="text-sm text-[#191919] font-normal">Dodatkowe informacje</p>
        <p className="text-sm text-[#000] font-normal">{clientMessage}</p>
      </div>
  )
}

