'use client'
import { CalendarCog } from "lucide-react"
import { useState } from "react"
import { DashboardCalendarMobileCalendarTypeDropdown } from "./dashboard-calendar-mobile-calendar-type-dropdown"

export const DashboardCalendarMobileType = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
    <div 
      className="relative border-[0.5px] border-[#D4D4D] p-1 bg-[#F2F4F8] rounded-md"
      onClick={() => setOpen(true)}  
    >
    <CalendarCog size={25} color="#000" strokeWidth={1}/>
    </div>
    <DashboardCalendarMobileCalendarTypeDropdown
      open={open}
      onClose={() => setOpen(false)}
    />
    </>
  )
}