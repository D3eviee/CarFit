'use client'
import { useAppointmentStore } from "@/lib/store";
import { cn } from "@/utils";
import { Minus, Plus } from "lucide-react";
import { MouseEvent } from "react";

export const BookingServicesCategoryItemAddButton = ({serviceId}:{serviceId: string}) => {
  const toggleSelectedService = useAppointmentStore((store) => store.toggleSelectedService)
  const selectedServices = useAppointmentStore((store) => store.selectedServices)

  const handleAddingService = (e: MouseEvent<HTMLDivElement>) => {
     e.stopPropagation()
    toggleSelectedService(serviceId)
  }

  return (
      <div 
      className={cn("bg-[#F2F2F8] inset-shadow-glass text-sm text-[#191919] font-semibold px-2 py-2 rounded-xl ring-[#F2F2F8] ring-offset-[2px] ring-1 transition-all duration-100 ease-out hover:cursor-pointer active:scale-xs",
        selectedServices.find((selectedService) => selectedService == serviceId ) && "bg-linear-to-b from-[#313131] to-[#141414] text-white ring-none" 
      )}
      onClick={handleAddingService}
      >
        {selectedServices.find((selectedService) => selectedService == serviceId ) ? <Minus size={15}/> : <Plus size={15}/>}
      </div>
  )
}