'use client'
import { addMinutes, format } from "date-fns";
import { pl } from "date-fns/locale";

type DashboardCalendarModalAppointmentDetailsHeaderProps = {
    reservationStart:Date
    duration: number
    service: {
        name: string
        price: string
    }[]
    status: string
}
 
export const DashboardCalendarModalAppointmentDetailsHeader = ({duration, reservationStart, service, status}:DashboardCalendarModalAppointmentDetailsHeaderProps) => {
  const rawShortAppointmentMonth = format(reservationStart, "LLL", { locale: pl })
  const shortAppointmentMonth = rawShortAppointmentMonth.charAt(0).toUpperCase() + rawShortAppointmentMonth.slice(1)

  const rawDayOfWeek = format(reservationStart, "EEEE", { locale: pl })
  const dayOfWeek = rawDayOfWeek.charAt(0).toUpperCase() + rawDayOfWeek.slice(1)
  const appointmentDayOfMonth = format(reservationStart, "d", { locale: pl })
  const appointmentYear = format(reservationStart, "y")
  const fullDate = `${dayOfWeek}, ${appointmentDayOfMonth} ${shortAppointmentMonth} ${appointmentYear}` 

  // helpers for appointment time
  const appointmentEndTime = addMinutes(reservationStart, duration)
  const formattedAppointmentStart = `${format(reservationStart, 'kk')}:${format(reservationStart, 'mm')}`
  const formattedAppointmentEnd = `${format(appointmentEndTime, 'kk')}:${format(appointmentEndTime, 'mm')}`
  const fullTime = `${formattedAppointmentStart} - ${formattedAppointmentEnd}`

  return(
    <div className="w-full flex flex-col gap-4 px-1">
        {/* TITLE */}
        <div className="flex flex-col gap-1">
            {service.map((service, index) => 
                <h1 key={index} className="text-lg text-[#191919] font-medium leading-none">{service.name}</h1>
            )}
        </div>
        {/* SERVICES DATE */}
        <div className="flex flex-col gap-0.5">
            <p className="text-sm text-[#191919] font-normal">{fullDate}</p>
            <p className="text-sm text-[#191919] font-normal">{fullTime}</p>
        </div>
        {/* EVENT STATUS */}
        {status == "Odwołana" && 
            <p className="w-fit text-small text-[#FFF] font-medium leading-none  px-2 py-1 rounded-md bg-[#FF5F58]">{status}</p>
        }
        {status  == "Oczekująca" && 
            <p className="w-fit text-small text-[#FFF] font-medium leading-none  px-2 py-1 rounded-md bg-[#FDBC2C]">{status}</p>
        }
        {status  == "Zarezerwowana" &&
            <p className="w-fit text-small text-white font-medium leading-none  px-2 py-1 rounded-md bg-[#28C840]">{status}</p>
        }
    </div>
  )
}

