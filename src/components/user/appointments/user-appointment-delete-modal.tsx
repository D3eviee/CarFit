'use client'
import { deleteAppointment } from "@/app/user/actions";
import { useModalStore } from "@/lib/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function UserAppointmentDeleteModal({id}:{id:string}){
  const queryClient = useQueryClient()
  const closeModal = useModalStore(store => store.closeModal)

  const {mutateAsync} = useMutation({
    mutationFn: async () => await deleteAppointment(id),
    onSuccess: (res) => {
      if (res.success) queryClient.invalidateQueries({ queryKey: ["getClientAppointments"] })
    }
  })

  const handleAppointmentDelete = async () => {
    const response = await mutateAsync()
    if(response.success){
      closeModal()
      closeModal()
    }
  }

  return (
    <div className="flex flex-col bg-white shadow-md rounded-2xl gap-4 px-4 pt-6 pb-4">
      <p className="text-[#191919] text-middle font-normal" >Czy jesteś pewien że chcesz odwołać wizytę?</p>
      
      <div className="flex flex-col w-full gap-3">
        <div 
          className="w-full py-2.5 bg-[#EFEFF1] rounded-3xl hover:cursor-pointer hover:bg-[#DEDEE0]"
          onClick={handleAppointmentDelete}
        >
          <p className="text-[#242426] text-sm font-base text-center">Odwołaj</p>
        </div>

        <div 
          className="w-full py-2.5 bg-[#CF142B] rounded-3xl hover:cursor-pointer hover:bg-[#BE031A]"
          onClick={closeModal}
        >
          <p className="text-white text-sm font-semibold text-center">Wyjdź</p>
        </div>
      </div>
    </div>
  )
}
