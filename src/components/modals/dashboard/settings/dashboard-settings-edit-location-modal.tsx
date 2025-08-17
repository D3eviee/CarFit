'use client'
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useModalStore, useToastStore } from "@/lib/store";
import { ModalBackButton } from "@/components/buttons/modal-back-button";
import { Spinner } from "@/components/spinner";
import { FormError } from "@/components/forms/form-error";
import { updateBusinessLocation } from "@/app/dashboard/settings/actions";
import { LocationSettings, locationSettingsSchema } from "@/lib/schema";

type DashboardSettingsEditLocationModalProps = {
  town: string
  district: string
  street: string
  zipcode: string               
}

export const DashboardSettingsEditLocationModal = ({district, street, town, zipcode}:DashboardSettingsEditLocationModalProps) => {
  const queryClient = useQueryClient()
  const closeModal = useModalStore(store => store.closeModal)
  const showToast = useToastStore(store => store.showToast)

  const {register, formState, handleSubmit, watch} = useForm<LocationSettings>({
    resolver: zodResolver(locationSettingsSchema),
    defaultValues: {
      district: district,
      street: street, 
      town: town,
      zipcode: zipcode
    }
  })

  const watchDistrict = watch("district")
  const watchStreet = watch("street")
  const watchTown = watch("town")
  const watchZipcode = watch("zipcode")

  const {mutate: editLocationMutation, isPending:editBusinessLocationIsPending} = useMutation({
    mutationKey: ["editBusinessLocation"],
    mutationFn: async (data:LocationSettings) => {
      const result = await updateBusinessLocation(data)
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
  
  const onEditLocationSubmit: SubmitHandler<LocationSettings> = async (data) => {
    editLocationMutation(data)
  }
  
  const isSaveButtonDisabled = watchDistrict == district && watchStreet == street && watchTown == town && watchZipcode == zipcode

  return(
    <div className="w-full h-full flex flex-col gap-10 bg-white sm:max-w-[400px] sm:h-fit sm:rounded-2xl sm:inset-shadow-glass sm:shadow-xs sm:ring sm:ring-[#D4D4D4] sm:py-5">
      {/* NAV */}
      <div className="w-full px-4 py-4">
        <ModalBackButton/>
      </div>

      {/* EDIT FIELDS */}
      <div className="px-8 flex flex-col gap-10">

        <form onSubmit={handleSubmit(onEditLocationSubmit)} className="w-full flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-[#191919] text-sm pl-1">Miasto</label>
             <input 
              id="town"
              {...register("town")}
              type="text"
              className="w-full bg-[#F6F7FB] px-2 py-2 text-md text-[#191919] rounded-lg border outline-none border-transparent focus:border-[#CCC]"
            />
            <FormError error={formState.errors.town?.message}/>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-[#191919] text-sm pl-1">Dzielnica</label>
             <input 
              id="district"
              {...register("district")}
              type="text"
              className="w-full bg-[#F6F7FB] px-2 py-2 text-md text-[#191919] rounded-lg border outline-none border-transparent focus:border-[#CCC]"
            />
            <FormError error={formState.errors.district?.message}/>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-[#191919] text-sm pl-1">Kod pocztowy</label>
             <input 
              id="zipcode"
              {...register("zipcode")}
              type="text"
              className="w-full bg-[#F6F7FB] px-2 py-2 text-md text-[#191919] rounded-lg border outline-none border-transparent focus:border-[#CCC]"
            />
            <FormError error={formState.errors.zipcode?.message}/>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="phone" className="text-[#191919] text-sm pl-1">Ulica</label>
             <input 
              id="street"
              {...register("street")}
              type="text"
              className="w-full bg-[#F6F7FB] px-2 py-2 text-md text-[#191919] rounded-lg border outline-none border-transparent focus:border-[#CCC]"
            />
            <FormError error={formState.errors.street?.message}/>
          </div>

          <button
            type="submit" 
            disabled={isSaveButtonDisabled || editBusinessLocationIsPending}
            className="w-full text-center font-semibold text-sm py-3 rounded-xl bg-[#242426] shadow-md text-white hover:cursor-pointer hover:bg-[#333333] disabled:bg-[#CCCCCC] disabled:cursor-not-allowed active:scale-105" 
          >
            {editBusinessLocationIsPending ? <Spinner/> : "Zapisz"}
          </button> 
        </form>
      </div>
    </div>
  )
}