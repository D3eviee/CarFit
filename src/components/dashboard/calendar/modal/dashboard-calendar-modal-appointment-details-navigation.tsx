import { ModalBackButton } from "@/components/buttons/modal-back-button";

export const DashboardCalendarModalAppointmentDetailsNavigation = () => {
  return (
    <div className="px-3 py-2 w-full flex flex-row justify-between items-center">
        <ModalBackButton/>
        {/* <div 
            className="w-fit bg-main-[#F2F2F7]/30 backdrop-blur-xs ring-1 ring-white shadow-sm rounded-full inset-shadow-glass py-2 px-3 hover:cursor-pointer hover:bg-[#FAFAFA]/30 hover:scale-105 active:scale-95 transition duration-75 ease-in text-[#2B2B2B] text-md"
        >
            Edytuj
        </div> */}
    </div>
  )
}

