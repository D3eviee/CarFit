'use client'
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { dashboardProfileEditPersonalData, DashboardProfileEditPersonalData } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useModalStore, useToastStore } from "@/lib/store";
import { ModalBackButton } from "../buttons/modal-back-button";
import { Spinner } from "../spinner";
import TextLabel from "../forms/text-label";
import TextInput from "../forms/text-input";
import { FormError } from "../forms/form-error";
import { updateDashboardProfileData } from "@/app/dashboard/profile/actions";
import DashboardProfileDataModalImage from "./dashboard-profile-data-edit-modal-image";

type DashboardProfileDataEditModalProps = {
  email: string
  owner: string                
}

export default function DashboardProfileDataEditModal({ owner, email }:DashboardProfileDataEditModalProps){
  const queryClient = useQueryClient()
  const closeModal = useModalStore(store => store.closeModal)
  const showToast = useToastStore(store => store.showToast)

  const {register, formState, handleSubmit, watch} = useForm<DashboardProfileEditPersonalData>({
    resolver: zodResolver(dashboardProfileEditPersonalData),
    defaultValues: {
      owner: owner,
      email: email,
    }
  })

  const watchEmail = watch("email")
  const watchOwner = watch("owner")

  const {mutate: saveDashboardProfileData, isPending:saveDashboardProfileDataPending} = useMutation({
    mutationKey: ["saveUserProfileData"],
    mutationFn: async () => {
      const oldData = { owner, email}
      const newData = { owner: watchOwner, email: watchEmail}
      
      const result = await updateDashboardProfileData(oldData, newData)
      if(!result.success) {
        showToast(result.message, "error")
        return null
      }
      showToast("Zapisano", "success")
      closeModal()
      return result.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["getBusinessProfileInformation"]})
    }
  })
  
  const onSubmit: SubmitHandler<DashboardProfileEditPersonalData> = async () => {
    saveDashboardProfileData()
  }
  
  const isSaveButtonDisabled = (watchEmail == email && watchOwner == owner) ? true : false

  return(
    <div className="w-full h-full flex flex-col gap-10 bg-white sm:max-w-[400px] sm:h-fit sm:rounded-2xl sm:inset-shadow-glass sm:shadow-xs sm:ring sm:ring-[#D4D4D4] sm:py-5">
      {/* NAV */}
      <div className="w-full px-4 py-4">
        <ModalBackButton/>
      </div>

      {/* EDIT FIELDS */}
      <div className="px-8 flex flex-col gap-10">
        {/* IMAGE SECTION */}
       <DashboardProfileDataModalImage/>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <TextLabel htmlFor="owner" text="Imię i nazwisko"/>
            <TextInput
              id="owner"
              type="text"
              {...register("owner")}
            />
            <FormError error={formState.errors.owner?.message}/>
          </div>

          <div className="flex flex-col gap-1">
            <TextLabel htmlFor="email" text="Email"/>
            <TextInput
              id="email"
              type="email"
              {...register("email")}
            />
            <FormError error={formState.errors.email?.message}/>
          </div>

          <button
            type="submit" 
            disabled={isSaveButtonDisabled || saveDashboardProfileDataPending}
            className="w-full text-center font-semibold text-sm py-3 rounded-xl bg-[#242426] shadow-md text-white hover:cursor-pointer hover:bg-[#333333] disabled:bg-[#CCCCCC] disabled:cursor-not-allowed active:scale-105" 
          >
            {saveDashboardProfileDataPending ? <Spinner/> : "Zapisz"}
          </button> 
        </form>
      </div>
    </div>
  )
}