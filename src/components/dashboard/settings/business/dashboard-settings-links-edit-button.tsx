'use client'
import { useModalStore } from "@/lib/store"
import { DashboardSettingsEditLinksModal } from "@/components/modals/dashboard/settings/dashboard-settings-edit-links-modal"

type DashboardSettingsLinksEditButtonProps = {
    linksData: {
        facebookUrl?: string 
        instagramUrl?: string 
        websiteUrl?: string          
    }
}

export const DashboardSettingsLinksEditButton = ({linksData}: DashboardSettingsLinksEditButtonProps) => {
    const openModal = useModalStore(store => store.openModal)
    const handleOpeningEdit = () => openModal( 
        <DashboardSettingsEditLinksModal facebookUrl={linksData.facebookUrl} instagramUrl={linksData.instagramUrl} websiteUrl={linksData.websiteUrl}/>
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