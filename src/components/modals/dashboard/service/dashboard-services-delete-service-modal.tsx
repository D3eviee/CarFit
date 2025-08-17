'use client'
import { useModalStore, useToastStore } from "@/lib/store";
import { deleteService } from "@/app/dashboard/services/actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Spinner } from "@/components/spinner";

export const DashboardServicesDeleteServiceModal = ({serviceId}: {serviceId:string}) => {
  const queryClient = useQueryClient()
  const closeModal = useModalStore(store => store.closeModal)
  const showToast = useToastStore(store => store.showToast)

  const { mutate: deleteServiceMutation, isPending:deleteCategoryMutationIsPending } = useMutation({
    mutationFn: async (categoryId: string) => {
      const response = await deleteService(categoryId)
      if(!response.success) {
        showToast(response.message, "error")
        return 
      }
      closeModal()
      showToast(response.message, "success")
      return response.data
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["getServicesForBusiness"] })
  })

  const handleDeletingService = () => {
    deleteServiceMutation(serviceId)
  }

  return(
    <div className="w-[360px] flex flex-col px-3 pt-5 pb-3 bg-white ring-1 ring-white inset-shadow-white rounded-2xl text-black space-y-5">
      <p className="px-1 text-[#191919] text-middle text-pretty text-left font-normal tracking-tighter">Czy na pewno usunąć usługę?</p>
      <div className="w-full flex flex-row gap-2.5">
        <div 
          onClick={closeModal}
          className="w-full text-center justify-center py-2 bg-[#F2F2F7] backdrop-blur-sm text-[#0C0C0C] rounded-3xl shadow-bnw-y-small shadow-inner-glass  hover:cursor-pointer hover:bg-[#E1E1E6] active:scale-105"
        >
          Anuluj
        </div>
        
        <div 
          onClick={handleDeletingService}
          className="w-full text-center justify-center py-2 bg-[#FF453A] backdrop- text-white rounded-3xl shadow-inner-glass hover:cursor-pointer hover:bg-[#333] active:scale-105"
        >
         {deleteCategoryMutationIsPending ? <Spinner/>  : "Usuń"} 
        </div>
      </div>
    </div>
  )
}    