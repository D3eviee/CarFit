'use client'
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Spinner } from "../spinner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useModalStore, useToastStore } from "@/lib/store";
import { LoginDataSchema, loginDataSchema } from "@/lib/schema";
import { signInUser } from "@/app/(auth)/(client)/sign-in/actions";


export const BookingLoginForm = () =>  {
  const [error, setError] = useState("")
  const showToast = useToastStore(store => store.showToast);
  const closeModal = useModalStore(store => store.closeModal)
  
  const {register, handleSubmit, formState} = useForm<LoginDataSchema>({
        resolver: zodResolver(loginDataSchema),
        defaultValues: {
          email: '',
          password: ''
        }
      })
    
  const onSubmit = async (data: LoginDataSchema) => {
    try {
      const response = await signInUser(data)
      if(!response.success){
        setError(response.message)
        return
      }
      
      showToast("Zalogowano pomyślnie!", "success")
      closeModal()
      return
    }catch (error) {
      setError("Wystąpił błąd:" + error)
      return 
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-[#333] text-xs">Email</label>
        <input
          {...register('email')}
          type="text"
          id="email"
          placeholder="carfit@gmail.com"
          className="w-full bg-[#F6F7FB] px-2 py-2 text-md text-[#191919] rounded-lg border outline-none border-transparent focus:border-[#CCC]"
        />
        {/* {formState.errors.email.message && <p className="text-red-500 text-xs">{formState.errors.email.message}</p>} */}
      </div>
      
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-[#191919] text-sm">Hasło</label>
        <input
          {...register('password')}
          type="password"
          id="password"
          placeholder="***********"
          className="w-full bg-[#F6F7FB] px-2 py-2 text-md text-[#191919] rounded-lg border outline-none border-transparent focus:border-[#CCC]"
        />
        {/* {formState.errors.password.message && <p className="text-red-500 text-xs">{formState.errors.password.message}</p>} */}
      </div>
      
      <p className="text-red-500 text-xs">{error || ""}</p>
      
      <button
        disabled={formState.isSubmitting}
        className="w-full flex justify-center py-2.5 bg-black text-white text-md font-normal  rounded-lg shadow-md hover:cursor-pointer hover:bg-[#111]"
      >
        {formState.isSubmitting ? <Spinner/> : "Zaloguj"}
      </button>   
    </form>
  )
}