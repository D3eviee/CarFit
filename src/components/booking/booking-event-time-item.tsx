import { useAppointmentStore } from "@/lib/store"
import { cn } from "@/utils"
import { format, isEqual } from "date-fns"

export const BookingEventTimeItem = ({time}:{time:Date}) => {
    //ZUSTAND STORE FOR SELETING TIME
    const appointmentTime = useAppointmentStore((store) => store.appointmentTime)
    const setAppointmentTime = useAppointmentStore((store) => store.setAppointmentTime)

    const timeText = `${format(time, "kk")}:${format(time, "mm")}`

    const handleTimeSelect = () => {
        setAppointmentTime(time)
    }

    return (
        <p 
            className={cn("text-center text-sm text-[#191919] font-normal py-2 rounded-xl ring-[0.5px] ring-offset-1 ring-[#D4D4D4] inset-shadow-glass hover:cursor-pointer",
                isEqual(appointmentTime, time) ? "bg-linear-to-b from-[#141414] to-[#313131] text-[#F2F2F7] ring-0 inset-shadow-none" : "bg-[#F2F2F7] hover:bg-[#EEE]"
            )}
            onClick={handleTimeSelect}
        >
            {timeText}
        </p>
    )
}