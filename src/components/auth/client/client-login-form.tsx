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
import { signInUser } from "@/app/(auth)/(client)/sign-in/actions";
import LoginClientToOnboarding from "./login-client-to-onboarding";
import { useState } from "react";

export const ClientLoginForm = () => {
  const [error, setError] = useState("")
  const setToast = useToastStore(store => store.showToast)
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
      const response = await signInUser(data)
      if(!response.success){
        setError(response.message)
        return
      }
      setToast(response.message, "success")
      router.push('/')
      return
    }catch (error) {
       setError("Wystąpił błąd:" + error)
      return 
    }
  }
  
  return (
    <div className="w-full flex flex-col items-center justify-center px-8 gap-10 sm:w-[380px] sm:px-10 sm:ring-[0.5px]  sm:ring-[#D4D4D4] sm:py-13 sm:rounded-3xl sm:shadow-lg">
        <FormHeader title="Carfit" subtitle="Witamy ponownie"/>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-8">
            {/* INPUT BOX */}
            <div className="flex flex-col gap-6">
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

            <LoginClientToOnboarding/> 
        </form>
      </div> 
  );
}