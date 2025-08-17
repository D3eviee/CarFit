'use client'
import { addNewCategory } from "@/app/dashboard/services/actions";
import { CategoryName, categoryNameSchema } from "@/lib/schema";
import { useModalStore, useToastStore } from "@/lib/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import TextLabel from "../forms/text-label";
import TextInput from "../forms/text-input";
import { FormError } from "../forms/form-error";
import { Spinner } from "../spinner";

export const DasboardServicesAddCategoryModal = () =>  {
  const queryClient = useQueryClient()
  const closeModal = useModalStore(store => store.closeModal)
  const showToast = useToastStore(store => store.showToast) 

  const {register, handleSubmit, formState} = useForm<CategoryName>({
    resolver: zodResolver(categoryNameSchema),
    defaultValues: {
      categoryName: ""
    }
  })

  const { mutate: addCategoryMutation, isPending:addCategoryMutationisPending } = useMutation({
    mutationFn: async (categorName: string) => {
      const categoryNameFormatted = categorName.trim()
      const response = await addNewCategory(categoryNameFormatted)
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

  const onCategoryEditSubmit = (data: CategoryName) => {
    addCategoryMutation(data.categoryName)
  }
  
  return (
    <div className="w-[360px] flex flex-col px-3 pt-5 pb-3 bg-white ring-1 ring-white inset-shadow-white rounded-2xl text-black space-y-5">
      <form onSubmit={handleSubmit(onCategoryEditSubmit)} className="flex flex-col gap-5">
        <div className="w-full flex flex-col gap-1">
          <TextLabel htmlFor="categoryName" text="Nazwa kategorii"/> 
          <TextInput 
            id="categoryName"
            type="text"
            {...register("categoryName")}
          />
          <FormError error={formState.errors.categoryName?.message}/>
        </div>
        
        <div className="w-full flex flex-row gap-2.5">
          <button 
            onClick={closeModal}
            className="w-full text-center justify-center py-2 bg-[#F2F2F7] backdrop-blur-sm text-[#0C0C0C] rounded-3xl shadow-bnw-y-small shadow-inner-glass  hover:cursor-pointer hover:bg-[#E1E1E6] active:scale-105"
          >
            Wyjdź
          </button>
          
          <button 
            type="submit"
            className="w-full text-center justify-center py-2 bg-[#333] backdrop- text-white rounded-3xl shadow-inner-glass hover:cursor-pointer hover:bg-[#333] active:scale-105"
          >
           {addCategoryMutationisPending ? <Spinner/> : "Dodaj"} 
          </button>
        </div>
      </form>
    </div>
  )
}