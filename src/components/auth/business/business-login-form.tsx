'use client'
import { FormHeader } from "@/components/auth/form-header";
import { useForm} from 'react-hook-form'
import { useRouter } from "next/navigation";
import TextInput from "@/components/forms/text-input";
import TextLabel from "@/components/forms/text-label";
import { loginDataSchema, LoginDataSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Spinner } from "@/components/spinner";
import { useToastStore } from "@/lib/store";
import { FormError } from "@/components/forms/form-error";
import LoginBusinessToOnboarding from "./business-switch-form";
import { signInBusiness } from "@/app/(auth)/business/sign-in/actions";
import { useState } from "react";

export const BusinessLoginForm = () => {
  const setToast = useToastStore(store => store.showToast)
  const [error, setError] = useState("")
  const router = useRouter()
  
  const {register, handleSubmit, formState} = useForm<LoginDataSchema>({
    resolver: zodResolver(loginDataSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async (data: LoginDataSchema) => {
    try {
      const response = await signInBusiness(data)
      if(!response.success){
        setError(response.message)
        return
      }
      router.push('/dashboard')
      setToast(response.message, "success")
      return
    }catch (error) {
      setError("Podczas tworzenia konta, wystąpił błąd: " + error)
      return 
    }
  }
  
  return (
    <div className="w-full flex flex-col items-center justify-center px-8 gap-10 sm:w-[380px] sm:px-10 sm:ring-[0.5px]  sm:ring-[#D4D4D4] sm:py-13 sm:rounded-3xl sm:shadow-lg">
        <FormHeader title="Carfit" subtitle="Zaloguj się do konta biznesowego i zarządzaj swoim serwisem"/>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-8">
            {/* INPUT BOX */}
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                    <TextLabel htmlFor="email" text="Email"/>
                    <TextInput 
                    type="email"
                    id="email"
                    placeholder="carfit@gmail.com"
                    {...register("email")}
                    />
                    <FormError error={formState.errors.email?.message}/>
                </div>

                <div className="flex flex-col gap-1">
                    <TextLabel htmlFor="password" text="Hasło"/>
                    <TextInput 
                    type="password"
                    id="password"
                    placeholder="********"
                    {...register("password")}
                    />
                    <FormError error={formState.errors.password?.message}/>
                </div>

                <FormError error={error}/>
            </div>

            {/* SUBMIT BUTTON */}
            <button 
                type="submit"
                disabled={formState.isSubmitting}
                className="w-full text-center font-semibold text-sm py-3 rounded-xl bg-[#242426] shadow-md text-white hover:cursor-pointer hover:bg-[#333333] disabled:bg-[#CCCCCC] disabled:cursor-not-allowed active:scale-105" 
            >
                {formState.isSubmitting ? <Spinner/> : "Zaloguj"}
            </button>

            <LoginBusinessToOnboarding/> 
        </form>
      </div> 
  );
}