import useWorkingDays, { useModalStore } from "@/lib/store";
import { WorkingDay } from "@/lib/types";
import { useState } from "react";

export const BusinessOnboardingWorkingDaysEditModal = ({day}:{ day: WorkingDay}) => {
  const closeModal = useModalStore(store => store.closeModal)
  const updateWorkingHours = useWorkingDays((state) => state.updateWorkingHours);
  const [selectedOpen, setSelectedOpen] = useState(day.open);
  const [selectedClose, setSelectedClose] = useState(day.close)

  const hours = Array.from({ length: (21 - 6 + 1) * 4 }, (_, i) => {
    const totalMinutes = 6 * 60 + i * 15;
    const hour = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hour.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
  })

  const availableCloseHours = hours.filter(h => h > selectedOpen)

  const handleSave = () => {
    updateWorkingHours(day.dayOfWeek, selectedOpen, selectedClose)
    closeModal()
  }

  return (
    <div className="w-[380px] sm:w-[420px] flex flex-col gap-3 px-3 pt-5 pb-3 bg-white backdrop-blur-[3px] ring-1 ring-white inset-shadow-white rounded-2xl text-black space-y-5">
      {/*HEADER*/}
      <p className="w-full text-[#363638] text-xs text-center font-medium">{day.dayOfWeek}</p>
      {/*INPUTS*/}
      <div className="w-full px-2 flex justify-between items-center ">
        <p className="w-full text-sm tracking-tight text-[#191919] font-normal ">Godziny otwarcia</p>
        <div className="w-full flex flex-row justify-center gap-3">
          <div className="before:content-['START'] before:absolute before:text-[9px] before:text-[#AAAAAA] before:font-normal before:p-px before:bg-white before:z-10 before:translate-x-[5px] before:translate-y-[-8px]">
            <select
              id="openTime"
              value={selectedOpen}
              className="py-1 px-4 w-24 text-center text-[#333333] border border-[#AAAAAA] rounded-md"
              onChange={(e) => {
                const newOpen = e.target.value;
                setSelectedOpen(newOpen);
                if (selectedClose <= newOpen) {
                  const laterOption = hours.find(h => h > newOpen)
                  if (laterOption) setSelectedClose(laterOption)
                }
              }}
            >
              {hours.map(hour => (
                <option key={hour} value={hour}>{hour}</option>
              ))}
          </select>  
        </div>
          <div className="before:content-['KONIEC'] before:absolute before:text-[9px] before:text-[#AAAAAA] before:font-normal before:p-px before:bg-white before:z-10 before:translate-x-[5px] before:translate-y-[-8px]">
            <select
              id="closeTime"
              value={selectedClose}
              className="py-1 px-4 w-24 text-center text-[#333333] border border-[#AAAAAA] rounded-md"
              onChange={(e) => setSelectedClose(e.target.value)}
            >
              {availableCloseHours.map(hour => (
                <option key={hour} value={hour}>{hour}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

        {/*LOWER BUTTONS*/}
      <div className="w-full flex flex-row gap-2.5">
      <div 
        onClick={closeModal}
        className="w-full text-center justify-center py-2 bg-[#F2F2F7] backdrop-blur-sm text-[#0C0C0C] rounded-3xl shadow-bnw-y-small shadow-inner-glass  hover:cursor-pointer hover:bg-[#E1E1E6] active:scale-105"
      >
        Anuluj
      </div>
        
      <div 
        onClick={handleSave}
        className="w-full text-center justify-center py-2 bg-[#191919] backdrop- text-white rounded-3xl shadow-inner-glass hover:cursor-pointer hover:bg-[#333] active:scale-105"
      >
        Zapisz
      </div>
    </div>
  </div>
  );
}