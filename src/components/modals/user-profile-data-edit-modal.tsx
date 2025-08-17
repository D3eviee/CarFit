'use client'
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { ChangeClientProfileData, changeClientProfileData } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useModalStore, useToastStore } from "@/lib/store";
import { ModalBackButton } from "../buttons/modal-back-button";
import UserProfileDataEditModalImage from "./user-profile-data-edit-modal-image";
import { Spinner } from "../spinner";
import { updateClientProfileData } from "@/app/user/profile/actions";
import { useState } from "react";
import { FormError } from "../forms/form-error";

type UserProfileDataEditModalProps = {
  phone: string
  email: string
  name: string                
}

export default function UserProfileDataEditModal({name, phone, email}:UserProfileDataEditModalProps){
  const queryClient = useQueryClient()
  const closeModal = useModalStore(store => store.closeModal)
  const showToast = useToastStore(store => store.showToast)
  const [error, setError] = useState("")

  const {register, formState, handleSubmit, watch} = useForm<ChangeClientProfileData>({
    resolver: zodResolver(changeClientProfileData),
    defaultValues: {
      name: name,
      email: email,
      phone: phone,
    }
  })

  const watchEmail = watch("email")
  const watchName = watch("name")
  const watchPhone = watch("phone")

  const {mutate: saveUserProfileDataMutation, isPending:saveUserProfileDataPending} = useMutation({
    mutationKey: ["saveUserProfileData"],
    mutationFn: async () => {
      const oldData = { name, email, phone}
      const newData = { name: watchName, email: watchEmail, phone: watchPhone}
      
      const result = await updateClientProfileData(oldData, newData)
      if(!result.success) {
        setError(result.message)
        return null
      }
      showToast("Zapisano", "success")
      closeModal()
      return result.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["userProfileData"]})
    }
  })
  
  const onSubmit: SubmitHandler<ChangeClientProfileData> = async () => {
    saveUserProfileDataMutation()
  }
  
  const isSaveButtonDisabled = (watchEmail == email && watchName == name && watchPhone == phone) ? true : false

  return(
    <div className="w-full h-full flex flex-col gap-10 bg-white sm:max-w-[400px] sm:h-fit sm:rounded-2xl sm:inset-shadow-glass sm:shadow-xs sm:ring sm:ring-[#D4D4D4] sm:py-5">
      {/* NAV */}
      <div className="w-full px-4 py-4">
        <ModalBackButton/>
      </div>

      {/* EDIT FIELDS */}
      <div className="px-8 flex flex-col gap-10">
        {/* IMAGE SECTION */}
       <UserProfileDataEditModalImage/>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-[#191919] text-sm pl-1">Imię i nazwisko</label>
             <input 
              id="name"
              {...register("name")}
              type="text"
              className="w-full bg-[#F6F7FB] px-2 py-2 text-md text-[#191919] rounded-lg border outline-none border-transparent focus:border-[#CCC]"
            />
            {formState.errors.name && <p className="text-xs text-red-600">{formState.errors.name.message}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-[#191919] text-sm pl-1">Email</label>
             <input 
              id="email"
              {...register("email")}
              type="text"
              className="w-full bg-[#F6F7FB] px-2 py-2 text-md text-[#191919] rounded-lg border outline-none border-transparent focus:border-[#CCC]"
            />
            {formState.errors.email && <p className="text-xs text-red-600">{formState.errors.email.message}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="phone" className="text-[#191919] text-sm pl-1">Numer telefonu</label>
             <input 
              id="phone"
              {...register("phone")}
              type="text"
              className="w-full bg-[#F6F7FB] px-2 py-2 text-md text-[#191919] rounded-lg border outline-none border-transparent focus:border-[#CCC]"
            />
            {formState.errors.phone && <p className="text-xs text-red-600">{formState.errors.phone.message}</p>}
          </div>

          <FormError error={error}/>

          <button
            type="submit" 
            disabled={isSaveButtonDisabled || saveUserProfileDataPending}
            className="w-full text-center font-semibold text-sm py-3 rounded-xl bg-[#242426] shadow-md text-white hover:cursor-pointer hover:bg-[#333333] disabled:bg-[#CCCCCC] disabled:cursor-not-allowed active:scale-105" 
          >
            {saveUserProfileDataPending ? <Spinner/> : "Zapisz"}
          </button> 
        </form>
      </div>
    </div>
  )
}