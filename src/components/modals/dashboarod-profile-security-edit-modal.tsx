'use client'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Spinner } from "@/components/spinner";
import { useModalStore, useToastStore } from "@/lib/store";
import { ModalBackButton } from "../buttons/modal-back-button";
import { ChangePasswordInput, changePasswordSchema } from "@/lib/schema"
import TextLabel from "../forms/text-label";
import TextInput from "../forms/text-input";
import { FormError } from "../forms/form-error";
import { changeDasboardProfilePassword } from "@/app/dashboard/profile/actions";

export const DashboardProfileSecurityEditModal = () => {
  const closeModal = useModalStore(store => store.closeModal)
  const showToast = useToastStore(store => store.showToast)

  const {register, handleSubmit, formState : {isSubmitting, errors}, reset, watch} = useForm <ChangePasswordInput>({
    resolver: zodResolver(changePasswordSchema)
  })

  const onSubmit = async (data: ChangePasswordInput) => {
        const result = await changeDasboardProfilePassword(data)
        if (!result.success) {
            showToast(result.message, "error")
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
            <TextLabel htmlFor="currentPassword" text="Aktualne hasło"/>
            <TextInput
              type="password" 
              id="currentPassword" 
              {...register("currentPassword")} 
            />
            <FormError error={errors.currentPassword?.message}/>
          </div>

          <div className="flex flex-col gap-1">
            <TextLabel htmlFor="newPassword" text="Nowe hasło"/>
            <TextInput
              type="password" 
              id="newPassword" 
              {...register("newPassword")} 
            />
            <FormError error={errors.newPassword?.message}/>
          </div>

          <div className="flex flex-col gap-1">
            <TextLabel htmlFor="repeatNewPassword" text="Powtórz nowe hasło"/>
            <TextInput
              type="password" 
              id="repeatNewPassword" 
              {...register("repeatNewPassword")} 
            />
            <FormError error={errors.repeatNewPassword?.message}/>
          </div>

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

    