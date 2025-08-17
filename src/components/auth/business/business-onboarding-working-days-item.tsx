'use client'
import { Edit } from "lucide-react";
import useWorkingDays, { useModalStore } from "@/lib/store";
import { WorkingDay } from "@/lib/types";
import { BusinessOnboardingWorkingDaysEditModal } from "@/components/modals/business-onboarding-working-days-edit-modal";

export const BusinessoOnboardingWorkingDaysItem = ({day}:{day: WorkingDay}) => {
  const updateIsOpen = useWorkingDays((state) => state.updateIsOpen)
  const openModal = useModalStore(store => store.openModal)

  const handleOpeningEditModal = () => openModal(<BusinessOnboardingWorkingDaysEditModal day={day}/>)
  
  return (
    <div className="flex flex-row items-center px-3 py-5 rounded-xl bg-[#F2F2F8] inset-shadow-glass">
      <div className="w-full flex flex-row items-center gap-3">
        <input 
          type="checkbox" 
          className="w-4 h-4" 
          defaultChecked={day.isOpen} 
          onChange={(e)=>{updateIsOpen(day.dayOfWeek, e.target.checked)}}
        />
        <p className="font-normal text-[#191919] text-sm">{day.dayOfWeek}</p>
      </div>
      
      <div className="w-full flex flex-row items-center gap-10">
        <p className="w-full text-right text-sm  text-[#191919] font-light ">{day.isOpen ? `${day.open} - ${day.close}` : "Zamknięte"}</p>
        {day.isOpen && 
          <Edit 
            color="#191919" 
            strokeWidth={1.5} 
            size={25} 
            className="hover:cursor-pointer hover:stroke-[#333333]"
            onClick={handleOpeningEditModal}
          /> }
      </div>
    </div>
  );
};
