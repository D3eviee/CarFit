'use client'
import { getActiveMonthAppointments } from "@/app/dashboard/calendar/actions"
import { Error } from "@/components/error"
import { FormError } from "@/components/forms/form-error"
import TextLabel from "@/components/forms/text-label"
import { Spinner } from "@/components/spinner"
import { AddNewAppointmentManual } from "@/lib/schema"
import { useToastStore } from "@/lib/store"
import { useQuery } from "@tanstack/react-query"
import { addMinutes, eachMinuteOfInterval, format, set } from "date-fns"
import { pl } from "date-fns/locale"
import { UseFormRegister } from "react-hook-form"

type DashboardCalendarModalCategorySelectProps = {
  workingHoursData:{
    dayOfWeek: string
    open: string
    isOpen: boolean
    close: string
  }[]
  register: UseFormRegister<AddNewAppointmentManual>
  selectedDate: string
  selectedServiceDuration: number
  error: string
}

export const DashboardCalendarModalTimeSelect = ({workingHoursData, selectedDate, register, selectedServiceDuration, error}:DashboardCalendarModalCategorySelectProps) => {
  const showToast = useToastStore(store => store.showToast)

  const { data: appointments, status: appointmentsStatus} = useQuery({
    queryKey: ["getAppointmentsForSelectedDate", selectedDate],
    queryFn: async () => {
      const monthAppointmentsResponse = await getActiveMonthAppointments(new Date(selectedDate))
      if(!monthAppointmentsResponse.success) {
        showToast(monthAppointmentsResponse.message, "error")
        return null
      }
      return monthAppointmentsResponse.data
    } 
  })

  const selectedDayOfWeek = format(new Date(selectedDate), "iiii", {locale: pl})
  const selectedDayOfWeekFormatted = selectedDayOfWeek[0].toUpperCase() + selectedDayOfWeek.slice(1)
  const activeDayOpeningData = workingHoursData.find((day) => day.dayOfWeek == selectedDayOfWeekFormatted)
  const [serviceOpeningHour, serviceOpeningMinutes] = (activeDayOpeningData?.open ?? "06:00").split(":");
  const [serviceClosingHour, serviceClosingMinutes] =  (activeDayOpeningData?.close ?? "06:00").split(":");
  const openingServiceTime = set(new Date(selectedDate), { hours: Number(serviceOpeningHour), minutes: Number(serviceOpeningMinutes), seconds: 0})
  const closingServiceTime = set(new Date(selectedDate), { hours: Number(serviceClosingHour), minutes: Number(serviceClosingMinutes), seconds: 0 })
  const hours = eachMinuteOfInterval({start: openingServiceTime, end: closingServiceTime}, {step:15})

  if (appointmentsStatus === "pending") return <Spinner/>
  if (appointmentsStatus === "error") return <Error/>

  return (
    <div className="flex flex-col w-2/5">
      <TextLabel htmlFor="time" text="Godzina" />
      <select className="border-[0.5px] border-[#E8E8E8] px-2 py-2.5" id="time" {...register('time')} required>
        <option value="" disabled hidden>Godzina</option>
        {hours.map((time, index) => {
          const isReserved = appointments?.some((item) => time >= item.reservationStart && time < item.reservationEnd)
          
          if (isReserved) return null
          else{
            const serviceEnd = addMinutes(time, Number(selectedServiceDuration))
            const isBetween = appointments!.some((item) =>time < item.reservationEnd && serviceEnd > item.reservationStart)
            
            if(isBetween) return null
            const afterWorkingHours = addMinutes(time, selectedServiceDuration) > closingServiceTime

            if(afterWorkingHours) return null
            return <option key={index} value={String(time)}>{`${format(time, "HH")}:${format(time, "mm")}`}</option>
          }
        })}
      </select>
      <FormError error={error}/>
    </div>
  )
}