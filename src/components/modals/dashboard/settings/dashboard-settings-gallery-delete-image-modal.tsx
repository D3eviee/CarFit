'use client'
import { deleteBusinessGalleryImage } from "@/app/dashboard/settings/actions";
import { Spinner } from "@/components/spinner";
import { useModalStore, useToastStore } from "@/lib/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const DashboardSettingsGalleryDeleteImageModal = ({ imageId}:{imageId:string}) => {
  const queryClient = useQueryClient()
  const closeModal = useModalStore(store => store.closeModal)
  const showToast = useToastStore(store => store.showToast)

  const {mutate: imageDeletionMutation, isPending:imageDeletionIsPending} = useMutation({
    mutationKey: ["deleteGalleryImage"],
    mutationFn: async () => {
      const deleteResult =  await deleteBusinessGalleryImage(imageId)
      if(!deleteResult.success){
        showToast(deleteResult.message, "error")
        return
      }
      
      showToast(deleteResult.message, "success")
      closeModal()
      return deleteResult
    },
    onSuccess: () => queryClient.invalidateQueries({queryKey: ["getBusinessGalleryImages"]})
  })

  const handleImageDeletion = async () => {
    imageDeletionMutation()
  }

  return (
     <div className="flex flex-col px-4 pt-5 pb-3 bg-white backdrop-blur-[3px] ring-1 ring-white inset-shadow-white rounded-2xl max-w-[300px]  text-black space-y-5">
        <p className="px-1 text-[#191919] text-[15px] text-pretty text-left font-normal tracking-tighter">Czy na pewno chcesz usunąć zdjęcie?</p>
      
      {/* CONTENT */}
      <div className="w-full flex flex-row gap-2.5">
        <div 
          onClick={closeModal}
          className="w-full text-center justify-center py-2 bg-[#F2F2F7] backdrop-blur-sm text-[#0C0C0C] rounded-3xl shadow-bnw-y-small shadow-inner-glass  hover:cursor-pointer hover:bg-[#E1E1E6] active:scale-105"
        >
          Anuluj
        </div>
        
        <div 
          onClick={handleImageDeletion}
          className="w-full text-center justify-center py-2 bg-[#FF383C] backdrop- text-white rounded-3xl shadow-inner-glass hover:cursor-pointer hover:bg-[#FF494D] active:scale-105"
        >
          {imageDeletionIsPending ? <Spinner/> : "Usuń"}
        </div>
      </div>
    </div>
  )
}