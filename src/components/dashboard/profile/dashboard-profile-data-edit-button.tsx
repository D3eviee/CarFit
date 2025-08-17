'use client'
import DashboardProfileDataEditModal from "@/components/modals/dashboard-profile-data-edit-modal"
import { useModalStore } from "@/lib/store"

type DashboardProfileDataEditButtonProps = {
    email: string
    owner: string                
}

export default function DashboardProfileDataEditButton({email, owner}: DashboardProfileDataEditButtonProps){
    const openModal = useModalStore(store => store.openModal)
    const handleOpeningEdit = () => openModal(<DashboardProfileDataEditModal email={email} owner={owner}/> )

    return (
        <div 
            onClick={handleOpeningEdit}
            className="w-fit text-center text-sm px-4 py-2 rounded-2xl bg-linear-to-b  from-[#313131] to-[#141414] shadow-md text-[#F2F2F7] hover:cursor-pointer hover:bg-[#333333]"
        >
            Edytuj profil
        </div>
    )
}