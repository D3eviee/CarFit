'use client'
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useModalStore, useToastStore } from "@/lib/store";
import { ModalBackButton } from "@/components/buttons/modal-back-button";
import { Spinner } from "@/components/spinner";
import { FormError } from "@/components/forms/form-error";
import { updateBusinessSocialMediaLinks } from "@/app/dashboard/settings/actions";
import { BusinessSocialLinks, businessSocialLinksSchema } from "@/lib/schema";

type DashboardSettingsEditLinksModalProps = {
  facebookUrl:string            
  instagramUrl:string            
  websiteUrl:string            
}

export const DashboardSettingsEditLinksModal = ({facebookUrl, instagramUrl, websiteUrl}:DashboardSettingsEditLinksModalProps) => {
  const queryClient = useQueryClient()
  const closeModal = useModalStore(store => store.closeModal)
  const showToast = useToastStore(store => store.showToast)

  const {register, formState, handleSubmit, watch} = useForm<BusinessSocialLinks>({
    resolver: zodResolver(businessSocialLinksSchema),
    defaultValues: {
      facebookUrl: facebookUrl,
      instagramUrl: instagramUrl,
      websiteUrl: websiteUrl,
    }
  })

  const watchFb = watch("facebookUrl")
  const watchIg = watch("instagramUrl")
  const watchWebsite = watch("websiteUrl")

  const {mutate: editLinksMutation, isPending:editLinksIsPending} = useMutation({
    mutationKey: ["editBusinessLocation"],
    mutationFn: async (data:BusinessSocialLinks) => {
      const result = await updateBusinessSocialMediaLinks(data)
      if(!result.success) {
        showToast(result.message, "error")
        return null
      }
      showToast("Zapisano", "success")
      closeModal()
      return result.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["getBusinessInformationForSettings"]})
    }
  })
  
  const onEditLinksSubmit: SubmitHandler<BusinessSocialLinks> = async (data) => {
    editLinksMutation(data)
  }
  
  const isSaveButtonDisabled = (watchFb === facebookUrl && watchIg === instagramUrl && watchWebsite === websiteUrl)

  return(
    <div className="w-full h-full flex flex-col gap-10 bg-white sm:max-w-[400px] sm:h-fit sm:rounded-2xl sm:inset-shadow-glass sm:shadow-xs sm:ring sm:ring-[#D4D4D4] sm:py-5">
      {/* NAV */}
      <div className="w-full px-4 py-4">
        <ModalBackButton/>
      </div>

      {/* EDIT FIELDS */}
      <div className="px-8 flex flex-col gap-10">

        <form onSubmit={handleSubmit(onEditLinksSubmit)} className="w-full flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-[#191919] text-sm pl-1">Facebook</label>
             <input 
              id="town"
              {...register("facebookUrl")}
              type="text"
              className="w-full bg-[#F6F7FB] px-2 py-2 text-md text-[#191919] rounded-lg border outline-none border-transparent focus:border-[#CCC]"
            />
            <FormError error={formState.errors.facebookUrl?.message}/>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-[#191919] text-sm pl-1">Instagram</label>
             <input 
              id="district"
              {...register("instagramUrl")}
              type="text"
              className="w-full bg-[#F6F7FB] px-2 py-2 text-md text-[#191919] rounded-lg border outline-none border-transparent focus:border-[#CCC]"
            />
            <FormError error={formState.errors.instagramUrl?.message}/>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-[#191919] text-sm pl-1">Strona internetowa</label>
             <input 
              id="zipcode"
              {...register("websiteUrl")}
              type="text"
              className="w-full bg-[#F6F7FB] px-2 py-2 text-md text-[#191919] rounded-lg border outline-none border-transparent focus:border-[#CCC]"
            />
            <FormError error={formState.errors.websiteUrl?.message}/>
          </div>

          <button
            type="submit" 
            disabled={isSaveButtonDisabled || editLinksIsPending}
            className="w-full text-center font-semibold text-sm py-3 rounded-xl bg-[#242426] shadow-md text-white hover:cursor-pointer hover:bg-[#333333] disabled:bg-[#CCCCCC] disabled:cursor-not-allowed active:scale-105" 
          >
            {editLinksIsPending ? <Spinner/> : "Zapisz"}
          </button> 
        </form>
      </div>
    </div>
  )
}