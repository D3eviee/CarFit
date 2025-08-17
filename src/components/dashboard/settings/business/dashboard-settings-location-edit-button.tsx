'use client'
import { DashboardSettingsEditLocationModal } from "@/components/modals/dashboard/settings/dashboard-settings-edit-location-modal"
import { useModalStore } from "@/lib/store"

type DashboardSettingsLocationEditButtonProps = {
    locationData: {
        town: string
        district: string
        street: string
        zipcode: string            
    }
}

export const DashboardSettingsLocationEditButton = ({locationData}: DashboardSettingsLocationEditButtonProps) => {
    const openModal = useModalStore(store => store.openModal)
    const handleOpeningEdit = () => openModal( 
        <DashboardSettingsEditLocationModal  district={locationData.district} zipcode={locationData.zipcode} town={locationData.town} street={locationData.street}/>
    )

    return (
        <div 
            onClick={handleOpeningEdit}
            className="w-fit text-center text-sm px-4 py-2 rounded-2xl bg-linear-to-b  from-[#313131] to-[#141414] shadow-md text-[#F2F2F7] hover:cursor-pointer hover:bg-[#333333]"
        >
            Edytuj
        </div>
    )
}