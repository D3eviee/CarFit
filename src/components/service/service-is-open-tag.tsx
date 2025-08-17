import { WorkingDay } from "@/lib/types"
import { format, getISODay } from "date-fns"

// this component displays a tag whether a service is closed
// if closed its's gonna show when the next open day is
export const ServiceIsOpenTag = ({workingHoursData}:{workingHoursData:WorkingDay[]}) => {
    const dayLabels: Record<string, string> = {
        "Poniedziałek" : "poniedziałek",
        "Wtorek" : "wtorek",
        "Środa" : "środę",
        "Czwartek" : "czwartek",
        "Piątek" : "piątek",
        "Sobota" : "sobotę",
        "Niedziela" : "niedzielę",
    }

    const now = new Date()
    const todayDayIndex = getISODay(now)
    const nowHour = format(now , "k")
    const nowMinute = format(now , "m")
    const nowTime = `${nowHour}:${nowMinute}`

    const todayWorkingHoursData = workingHoursData[todayDayIndex-1]
    const openingTime = todayWorkingHoursData.open
    const closingTime = todayWorkingHoursData.close
    const isOpenNow = (nowTime >= openingTime && nowTime <= closingTime)
    const isOpenToday = todayWorkingHoursData.isOpen
    const sameDayAfterHours = isOpenToday &&  (nowTime > closingTime)

    const nextOpenDayData = [...workingHoursData.slice(todayDayIndex), ...workingHoursData.slice(0, todayDayIndex)].find(item => item.isOpen)
    const dayLabel = dayLabels[nextOpenDayData.dayOfWeek];
    const nextOpenDayOpeningTime  = todayWorkingHoursData.open
    const nextOpenDayFormatted = `Czynne w ${dayLabel} od ${nextOpenDayOpeningTime}`;
    
    const openTag = () => {
        if(isOpenNow && isOpenToday){
            return (
                <div className="w-fit bg-[#3BB05A] flex flex-row space-x-1 py-0.5 px-2.5 rounded-lg border-[0.5px] border-[#4CC06B] shadow-sm borders md:py-0">
                    <p className="text-[#FFF] text-[15px] font-semibold">Otwarte do {closingTime}</p>
                </div>
                )
        }else{
            if(sameDayAfterHours){
                return (
                    <div className="w-fit bg-[#DB594A] flex flex-row space-x-1 py-0.5 px-2.5 rounded-lg border-[0.5px] border-[#EC6A5C] md:py-0">
                        <p className="text-[#FFF] text-[15px] font-medium">Zamknięte - czynne od {openingTime}</p>
                    </div> 
                )
            }else{
                return(
                    <div className="w-fit bg-[#DB594A] flex flex-row space-x-1 py-0.5 px-2.5 rounded-lg border-[0.5px] border-[#EC6A5C]  md:py-0">                     
                        <p className="text-[#FFF] text-[15px] font-medium">Zamknięte - {nextOpenDayFormatted}</p>               
                    </div>
                    
        )}
    }}

    return (
        <>{openTag()}</>
    )
}