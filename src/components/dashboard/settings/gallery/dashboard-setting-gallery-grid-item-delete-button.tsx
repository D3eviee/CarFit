'use client'
import { useModalStore } from "@/lib/store"
import { DashboardSettingsGalleryDeleteImageModal } from "../../../modals/dashboard/settings/dashboard-settings-gallery-delete-image-modal"

export const DashboardSettingsGalleryGridItemDeleteButton = ({id}:{id:string}) => {
  const openModal = useModalStore(store => store.openModal)
  const handleOpeningModal = () => openModal(<DashboardSettingsGalleryDeleteImageModal imageId={id}/>)

  return ( 
    <button 
      className=' bg-[#2B2B2B] text-white py-1.5 rounded-xl  shadow-black border hover:bg-[#EE3420] hover:cursor-pointer'
      onClick={handleOpeningModal}
    >
      Usuń
    </button>  
  )
}