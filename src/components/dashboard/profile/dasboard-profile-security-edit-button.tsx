'use client'
import { DashboardProfileSecurityEditModal } from "@/components/modals/dashboarod-profile-security-edit-modal"
import { useModalStore } from "@/lib/store"

export const DashboardProfileSecurityEditButton = () => {
    const openModal = useModalStore(store => store.openModal)
    const handleOpeningEdit = () => openModal( <DashboardProfileSecurityEditModal/>)

    return (
        <div 
            onClick={handleOpeningEdit}
            className="w-fit text-center text-sm px-4 py-2 rounded-2xl bg-linear-to-b  from-[#313131] to-[#141414] shadow-md text-[#F2F2F7] hover:cursor-pointer hover:bg-[#333333]"
        >
            Zmień hasło
        </div>
    )
}