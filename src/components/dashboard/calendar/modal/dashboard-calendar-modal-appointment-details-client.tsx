'use client'
import Image from "next/image"
import default_image from '@/../public/default_user_image.png'
type DashboardCalendarModalAppointmentDetailsClientProps = {
    imageUrl:string
    clientName: string
    clientPhone: string
}
 
export const DashboardCalendarModalAppointmentDetailsClient = ({clientName, clientPhone, imageUrl}:DashboardCalendarModalAppointmentDetailsClientProps) => {
    const phoneFormatted = clientPhone.replace(/(.{3})/g, "$1 ")
    
    return (
      <div className="flex flex-col gap-4 p-4 bg-[#F9F9F9] rounded-2xl ring-[0.5px] ring-[#D4D4D4] shadow-sm">
        <div className="flex flex-row gap-3 items-center">
          <div className="relative w-10 h-10 rounded-full overflow-hidden ring-1 ring-[#F2F2F7] shadow-md">
            <Image alt="user image" src={imageUrl || default_image} fill />
          </div>
          <p className="text-[#191919]">{clientName}</p>
        </div>

        {/* USER INFORMATION */}
        <div className="px-1 flex flex-row justify-between">
          <p className="text-sm text-[#111] font-normal">Telefon</p>
          <p className="text-sm text-[#111] font-light">{phoneFormatted}</p>
        </div>
      </div>
  )
}

