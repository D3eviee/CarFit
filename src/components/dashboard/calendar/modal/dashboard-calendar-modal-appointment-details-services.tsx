type DashboardCalendarModalAppointmentDetailsServicesProps = {
  service: {
    name: string
    price: string
  }[]
  charge: number
}
 
export const DashboardCalendarModalAppointmentDetailsServices = ({service, charge}:DashboardCalendarModalAppointmentDetailsServicesProps) => {
  return (
    <div className="w-full h-fit flex flex-col gap-3 p-4 bg-[#F9F9F9] rounded-2xl ring-[0.5px] ring-[#D4D4D4] shadow-sm">
      {service.map((service, index) => 
        <div key={index} className="px-1 flex flex-row justify-between">
          <p className="text-sm text-[#191919] font-normal">{service.name}</p>
          <p className="text-sm text-[#191919] font-light">{service.price} PLN</p>
        </div>
      )}
      
      <hr className="w-full text-[#D4D4D4]"/>
      
      {/* Total */}
      <div className="px-1 flex flex-row justify-between">
        <p className="text-sm text-[#191919] font-medium">Suma</p>
        <p className="text-sm text-[#191919] font-medium">{charge} PLN</p>
      </div>
    </div>
  )
}