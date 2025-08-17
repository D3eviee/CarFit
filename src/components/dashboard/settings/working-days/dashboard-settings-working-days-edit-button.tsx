'use client'
import { DashboardSettingsEditWorkingHoursModal } from "@/components/modals/dashboard/settings/dashboard-settings-edit-working-hours-modal"
import { useModalStore, useSettingsEditingWorkingHours } from "@/lib/store"

type DashboardSettingWorkingDaysEditButtonProps = {
  workingHoursData: {
    dayOfWeek: string
    open: string
    close: string
    isOpen: boolean
  }[]
}

export const DashboardSettingWorkingDaysEditButton = ({workingHoursData}:DashboardSettingWorkingDaysEditButtonProps) => {
    const openModal = useModalStore(store => store.openModal)
    const setDays = useSettingsEditingWorkingHours(store => store.setDays)
    const handleOpeningEdit = () => {
      setDays(workingHoursData)
      openModal(<DashboardSettingsEditWorkingHoursModal/>)
    }

    return (
      <div 
        onClick={handleOpeningEdit}
        className="w-fit text-center text-sm px-4 py-2 rounded-2xl bg-linear-to-b  from-[#313131] to-[#141414] shadow-md text-[#F2F2F7] hover:cursor-pointer hover:bg-[#333333]"
      >
        Edytuj
      </div>
    )
}