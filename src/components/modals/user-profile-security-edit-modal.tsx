'use client'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Spinner } from "@/components/spinner";
import { useModalStore, useToastStore } from "@/lib/store";
import { ModalBackButton } from "../buttons/modal-back-button";
import { ChangePasswordInput, changePasswordSchema } from "@/lib/schema"
import { changeClientPassword } from "@/app/user/profile/actions";
import { FormError } from "../forms/form-error";
import { useState } from "react";

export default function UserProfileSecurityEditModal(){
  const closeModal = useModalStore(store => store.closeModal)
  const showToast = useToastStore(store => store.showToast)
  const [error, setError] = useState("")

  const {register, handleSubmit, formState : {isSubmitting, errors}, reset, watch} = useForm <ChangePasswordInput>({
    resolver: zodResolver(changePasswordSchema)
  })

  const onSubmit = async (data: ChangePasswordInput) => {
        const result = await changeClientPassword(data)
        if (!result.success) {
            setError(result.message)
            return
        }

        showToast(result.message, "success")
        reset()
        closeModal()
  }

  const watchCurrentPassword = watch("currentPassword")
  const watchNewPassword = watch("newPassword")
  const watchNewPasswordRepeated = watch("repeatNewPassword")
  const isSaveButtonDisabled = (!watchCurrentPassword || !watchNewPassword.length  || !watchNewPasswordRepeated) ? true : false

  return(
   <div className="w-full h-full flex flex-col gap-10 bg-white sm:max-w-[400px] sm:h-fit sm:pb-10 sm:rounded-2xl sm:inset-shadow-glass sm:shadow-xs sm:ring sm:ring-[#D4D4D4] sm:py-5">
      <div className="w-full px-4 py-4">
        <ModalBackButton/>
      </div>
      
      <div className="px-8 flex flex-col gap-8">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl text-[#111] font-medium leading-none">Utwórz nowe hasło</h1>
          <p className="text-sm text-[#111] leading-5">Twoje hasło musi składać się przynajmniej z 8 znaków.</p>
        </div>

        <form className="w-full flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-1">
            <label htmlFor="currentPassword" className="text-[#191919] text-sm pl-1">Aktualne hasło</label>
            <input 
              type="password" 
              id="currentPassword" 
              {...register("currentPassword")} 
              className="w-full bg-[#F6F7FB] px-2 py-2 text-md text-[#191919] rounded-lg border outline-none border-transparent focus:border-[#CCC]"
            /> 
            {errors.currentPassword && <p className="text-xs text-[#FF5F58]">{errors.currentPassword.message}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="newPassword" className="text-[#191919] text-sm pl-1">Nowe hasło</label>
            <input 
              type="password" 
              id="newPassword" 
              {...register("newPassword")} 
              className="w-full bg-[#F6F7FB] px-2 py-2 text-md text-[#191919] rounded-lg border outline-none border-transparent focus:border-[#CCC]"
            /> 
            {errors.newPassword && <p className="text-xs text-[#FF5F58]">{errors.newPassword.message}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="newPassword" className="text-[#191919] text-sm pl-1">Potwierdź nowe hasło</label>
            <input 
              type="password" 
              id="repaeatNewPassword"
              {...register("repeatNewPassword")} 
             className="w-full bg-[#F6F7FB] px-2 py-2 text-md text-[#191919] rounded-lg border outline-none border-transparent focus:border-[#CCC]"
            /> 
            {errors.repeatNewPassword && <p className="text-xs text-[#FF5F58]">{errors.repeatNewPassword.message}</p>}
          </div>

           <FormError error={error}/>

          <button
            type="submit" 
            disabled={isSaveButtonDisabled || isSubmitting}
            className="w-full text-center font-semibold text-sm py-3 rounded-xl  bg-[#242426] shadow-md text-white hover:cursor-pointer hover:bg-[#333333] disabled:bg-[#CCCCCC] disabled:cursor-not-allowed active:scale-105" 
          >
            {isSubmitting ? <Spinner/> : "Zapisz"}
          </button>     
        </form>
      </div>      
    </div>
  )
}

    