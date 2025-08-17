'use client'
import { updateBusinessWorkingHours } from "@/app/dashboard/settings/actions";
import { ModalBackButton } from "@/components/buttons/modal-back-button";
import { DashboardSettingsWorkingDaysEditGrid } from "@/components/dashboard/settings/working-days/dashboard-settings-working-days-edit-grid";
import { Spinner } from "@/components/spinner";
import { useModalStore, useSettingsEditingWorkingHours, useToastStore } from "@/lib/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const DashboardSettingsEditWorkingHoursModal = () => {
  const queryClient = useQueryClient()
  const days = useSettingsEditingWorkingHours(store => store.days)
  const closeModal = useModalStore(store => store.closeModal)
  const showToast = useToastStore(store => store.showToast)
  const dayNames = days.map((item) => item.dayOfWeek)

  const {mutate: editWorkingHoursMutation, isPending:editWorkingHoursIsPending} = useMutation({
    mutationKey: ["editWorkingHours"],
    mutationFn: async () => {
      const workingDataResponse = await updateBusinessWorkingHours(days)
      if(!workingDataResponse.success){
        showToast(workingDataResponse.message, "error")
        return
      }
       showToast("Zapisano", "success")
       closeModal()
       return workingDataResponse.data
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['getBusinessWorkingHours'] })
  })
  
    const handleSavingWorkingHours = () => {
      editWorkingHoursMutation();
    }
  
  return(
    <div className="w-full h-full flex flex-col gap-5 bg-white sm:max-w-[400px] sm:h-fit sm:rounded-2xl sm:inset-shadow-glass sm:shadow-xs sm:ring sm:ring-[#D4D4D4] sm:py-5">
      {/* NAV */}
      <div className="w-full px-4 py-4">
        <ModalBackButton/>
      </div>

      {/* EDIT FIELDS */}
      <div className="px-4 flex flex-col gap-10">
        <DashboardSettingsWorkingDaysEditGrid days={dayNames}/>
        
        <button
          type="button" 
          onClick={handleSavingWorkingHours}
          className="w-full text-center font-semibold text-sm py-3 rounded-xl bg-[#242426] shadow-md text-white hover:cursor-pointer hover:bg-[#333333] disabled:bg-[#CCCCCC] disabled:cursor-not-allowed active:scale-105" 
        >
          {editWorkingHoursIsPending ? <Spinner/> : "Zapisz" } 
        </button> 
      </div>
    </div>
  )
}