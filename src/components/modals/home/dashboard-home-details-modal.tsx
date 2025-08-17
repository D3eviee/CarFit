import { DashboardCalendarModalAppointmentDetailsClient } from "@/components/dashboard/calendar/modal/dashboard-calendar-modal-appointment-details-client";
import { DashboardCalendarModalAppointmentDetailsHeader } from "@/components/dashboard/calendar/modal/dashboard-calendar-modal-appointment-details-header";
import { DashboardCalendarModalAppointmentDetailsMessage } from "@/components/dashboard/calendar/modal/dashboard-calendar-modal-appointment-details-message";
import { DashboardCalendarModalAppointmentDetailsNavigation } from "@/components/dashboard/calendar/modal/dashboard-calendar-modal-appointment-details-navigation";
import { DashboardCalendarModalAppointmentDetailsServices } from "@/components/dashboard/calendar/modal/dashboard-calendar-modal-appointment-details-services";
import { AppoinmentProps } from "@/lib/types";
import { DashboardHomeDetailsModalCancel } from "./dashboard-home-details-modal-cancel";

export const DashboardHomeDetailsModal = ({appointmentData}:{appointmentData:AppoinmentProps}) => {
  const {appointmentId, charge, service, clientPhone, clientName, clientImage, duration, reservationStart, status, clientMessage } = appointmentData

  return(
    <div className="w-full h-full flex flex-col bg-white gap-6 md:shadow-2xl md:rounded-3xl md:max-w-[85%] md:max-h-[80%] lg:max-w-3/4 xl:max-w-1/2">
      <DashboardCalendarModalAppointmentDetailsNavigation/>
      
      {/* APPOINTMENT DETAILS */}
      <div className="w-full h-full flex flex-col px-4 gap-6">
        <DashboardCalendarModalAppointmentDetailsHeader
          key={status}
          reservationStart={reservationStart} 
          duration={duration} 
          service={service} 
          status={status}
        />

        <div className="w-full h-full flex flex-col gap-6 md:flex-row">
          <div className="w-full flex flex-col gap-6 ">
            <DashboardCalendarModalAppointmentDetailsClient
            clientName={clientName}
            clientPhone={clientPhone}
            imageUrl={clientImage}
            />

            {clientMessage && <DashboardCalendarModalAppointmentDetailsMessage clientMessage={clientMessage}/>}
          </div>
        
          <DashboardCalendarModalAppointmentDetailsServices
              charge={charge}
              service={service}
          />
        </div>
      </div>

      {/* CANCEL APPOINTMENT BUTTON */}
      {status != "Odwołana" && <div className="w-full py-8">
        <DashboardHomeDetailsModalCancel appointmentId={appointmentId}/>
      </div>}
    </div>
  )
}