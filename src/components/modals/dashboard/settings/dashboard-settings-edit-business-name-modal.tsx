'use client'
import { useModalStore, useToastStore } from "@/lib/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import z from "zod";
import { editBusinessName } from "@/app/dashboard/settings/actions";
import TextLabel from "@/components/forms/text-label";
import TextInput from "@/components/forms/text-input";
import { FormError } from "@/components/forms/form-error";
import { Spinner } from "@/components/spinner";

const businessNameSchema = z.object({businessName: z.string().min(1, ({ message: "Brak nazwy biznesu" })).max(50)})
type BusinessName = z.infer<typeof businessNameSchema>

export const DashboardSettingsEditBusinessNameModal = ({businessName}:{businessName:string}) =>  {
  const queryClient = useQueryClient()
  const closeModal = useModalStore(store => store.closeModal)
  const showToast = useToastStore(store => store.showToast) 

  const {register, handleSubmit, formState} = useForm<BusinessName>({
    resolver: zodResolver(businessNameSchema),
    defaultValues: { businessName: businessName }
  })

  const { mutate: editCategoryNameMutation, isPending:editCategoryNameisPending } = useMutation({
    mutationFn: async (businessName: string) => {
      const businessNameFormatted = businessName.trim()
      const response = await editBusinessName(businessNameFormatted)
      if(!response.success) {
        showToast(response.message, "error")
        return 
      }
      closeModal()
      showToast(response.message, "success")
      return response.data
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["getBusinessInformationForSettings"] })
  })

  const onBusinessNameEditSubmit = (data: BusinessName) => {
    editCategoryNameMutation(data.businessName)
  }
  
  return (
    <div className="w-[360px] flex flex-col px-3 pt-5 pb-3 bg-white ring-1 ring-white inset-shadow-white rounded-2xl text-black space-y-5">
      <form onSubmit={handleSubmit(onBusinessNameEditSubmit)} className="flex flex-col gap-5">
        <div className="w-full flex flex-col gap-1">
          <TextLabel htmlFor="categoryName" text="Nazwa kategorii"/> 
          <TextInput 
            id="businessName"
            type="text"
            {...register("businessName")}
          />
          <FormError error={formState.errors.businessName?.message}/>
        </div>
        
        <div className="w-full flex flex-row gap-2.5">
          <button 
            type="button"
            onClick={closeModal}
            className="w-full text-center justify-center py-2 bg-[#F2F2F7] backdrop-blur-sm text-[#0C0C0C] rounded-3xl shadow-bnw-y-small shadow-inner-glass  hover:cursor-pointer hover:bg-[#E1E1E6] active:scale-105"
          >
            Wyjdź
          </button>
          
          <button 
            type="submit"
            className="w-full text-center justify-center py-2 bg-[#333] backdrop- text-white rounded-3xl shadow-inner-glass hover:cursor-pointer hover:bg-[#333] active:scale-105"
          >
           {editCategoryNameisPending ? <Spinner/> : "Zapisz"} 
          </button>
        </div>
      </form>
    </div>
  )
}