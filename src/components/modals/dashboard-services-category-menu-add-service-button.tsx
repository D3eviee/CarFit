'use client'
import { addNewService } from "@/app/dashboard/services/actions";
import { AddService, addServiceSchema } from "@/lib/schema";
import { useModalStore, useToastStore } from "@/lib/store";
import { Service, ServicesCategory } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import TextLabel from "../forms/text-label";
import TextInput from "../forms/text-input";
import { FormError } from "../forms/form-error";
import { Spinner } from "../spinner";

 const timeOptions = [
  {time: "30min", value: 30}, 
  {time: "45min", value: 45}, 
  {time: "1h", value: 60}, 
  {time: "1h 15min", value: 75},
  {time: "1h 30min", value: 90}, 
  {time:  "1h 45min", value: 105}, 
  {time: "2h", value: 120}, 
  {time: "2h 15min", value: 135},
  {time: "2h 30min" , value: 150}, 
  {time:"2h 45min" , value: 165}, 
  {time: "3h", value: 180}, 
  {time: "3h 15min", value: 195}, 
  {time: "3h 30min", value: 210} , 
  {time: "3h 30min", value: 225}, 
  {time: "3h 45min", value: 240}, 
  {time: "4h", value: 255}, 
  {time: "4h 15min", value: 270},
  {time: "4h 30min" , value: 285}, 
  {time:"4h 45min" , value: 300}, 
  {time: "5h", value: 315}, 
  {time: "5h 15min", value: 330}, 
  {time: "5h 30min" , value: 345}, 
  {time:"5h 45min" , value: 360}, 
  {time:"6h" , value: 375}
]

export const ServiecAddServiceModal = ({categories}:{categories:ServicesCategory[]}) => {
  const queryClient = useQueryClient()
  const closeModal = useModalStore(store => store.closeModal)
  const showToast = useToastStore(store => store.showToast)

  const { register, handleSubmit, reset, formState, watch} = useForm<AddService>({
    resolver: zodResolver(addServiceSchema),
    defaultValues: {
      name: "",
      categoryId: "",
      price: "",
      description: "",
      duration: 0,
    }
  })  
  
  const {mutate: addingNewServiceMutation, isPending: addingNewServiceIsPending} = useMutation({
    mutationFn: async (data:Service) => {
      const addNewServiceResult = await addNewService(data)
      if(!addNewServiceResult.success){
        showToast(addNewServiceResult.message, "error")
        return null
      }
      showToast(addNewServiceResult.message, "success")
      return addNewServiceResult.data
    }, 
    onSuccess: () =>{
      queryClient.invalidateQueries({ queryKey: ["getServicesForBusiness"] })
      reset()
      closeModal()
    } 
  })

  const onAddNewService = (newServiceData:Service) => addingNewServiceMutation(newServiceData)

  return (
    <form 
      className="w-[380px] gap-1 bg-white px-4 pb-4 pt-8 flex flex-col rounded-2xl"
      onSubmit={handleSubmit(onAddNewService)}
    >
      {/* CONTAINER FOR INPUTS */}
      <div className="w-full pb-8 flex flex-col gap-4">
        {/* SERVICE NAME INPUT */}
        <div className="w-full flex flex-col gap-1">
          <div className="flex flex-row justify-between items-end">
            <TextLabel htmlFor="name" text="Nazwa usługi"/>
            <p className="text-[10px] text-[#999] font-normal mt-1.5">{watch('name').length} / 100</p>
          </div>
          <TextInput 
            type="text"
            id="name"
            {...register("name")}  
          />
          <FormError error={formState.errors.name?.message}/>
        </div>
        
        {/* DESCRPTION */}
        <div className="w-full flex flex-col gap-1">
          <div className="flex flex-row justify-between items-end">
            <TextLabel  htmlFor="description" text="Opis usługi"/>
            <p className="text-[10px] text-[#999] font-normal mt-1.5">{watch('name').length} / 100</p>
          </div>
          <textarea 
            maxLength={250} 
            id="description" 
            className="w-full bg-[#F6F7FB] px-2 py-1.5 text-md text-[#191919] rounded-lg border outline-none border-transparent focus:border-[#CCC]"
            rows={5} 
            {...register('description')}>
          </textarea>
           <FormError error={formState.errors.description?.message}/>
        </div>
          
        {/* SERVICE CATEGORY AND PRICE INPUTS ROW*/}
        <div className="flex flex-col gap-1">
          <TextLabel htmlFor="categoryId" text="Kategoria"/>
          <select 
            className="w-full bg-[#F6F7FB] px-2 py-2 text-md text-[#191919] rounded-lg border outline-none border-transparent focus:border-[#CCC]"
            id="categoryId" 
            {...register('categoryId')} 
            required
          >
            <option value="" disabled hidden>Wybierz kategorię</option>
            {categories && categories.map((category, index) => <option key={index} value={category.id}>{category.name}</option> )}
          </select>
          <FormError error={formState.errors.categoryId?.message}/>
        </div>

        {/* SERVICE DURATION AND PRICE */}
        <div className="w-full flex flex-row gap-5">
          {/* PRICE */}
          <div className="w-1/2 flex flex-col gap-1">
            <TextLabel htmlFor="price" text="Cena"/>
            <div className="relative box-border">
              <input
                type="text"
                {...register("price")}
                id="price"
                className="w-full bg-[#F6F7FB] px-2 py-2 text-md text-[#191919] rounded-lg border outline-none border-transparent focus:border-[#CCC]"
              />  
              <div className="h-[85%] absolute right-1  top-1 flex items-center px-2 leading-none text-[#363638]">PLN</div>
            </div>
            <FormError error={formState.errors.price?.message}/>
          </div>

          {/* DURATION */}
          <div className="w-1/2 flex flex-col gap-1">
            <TextLabel htmlFor="duration" text="Czas trwania"/>
            <select 
              className="w-full bg-[#F6F7FB] px-2 py-2 text-md text-[#191919] rounded-lg border outline-none border-transparent focus:border-[#CCC]" 
              id="duration" 
              {...register('duration', {valueAsNumber:true})}
            >
              <option value={15}>15 min</option>
              {timeOptions.map((item, index) => <option key={index} value={item.value}>{item.time}</option>)}
            </select>

             <FormError error={formState.errors.duration?.message}/>
          </div>
        </div>
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
           {addingNewServiceIsPending ? <Spinner/> : "Dodaj"} 
          </button>
        </div>
    </form>
  )
}