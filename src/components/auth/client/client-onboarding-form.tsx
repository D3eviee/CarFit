'use client'
import { FormHeader } from "@/components/auth/form-header";
import { useForm} from 'react-hook-form'
import { useRouter } from "next/navigation";
import TextInput from "@/components/forms/text-input";
import TextLabel from "@/components/forms/text-label";
import { clientOnboardingData, ClientOnboardingData } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Spinner } from "@/components/spinner";
import { useToastStore } from "@/lib/store";
import { FormError } from "@/components/forms/form-error";
import { createClientProfile } from "@/app/(auth)/(client)/onboarding/actions";
import OnboardingClientPolicy from "./client-onboarding-policy";
import { useState } from "react";

export const ClientOnboardingForm = () => {
  const showToast = useToastStore(store => store.showToast)
  const [error, setError] = useState("")
  const router = useRouter()
  
  const {register, handleSubmit, formState} = useForm<ClientOnboardingData>({
    resolver: zodResolver(clientOnboardingData),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: ''
    }
  })

  const onSubmit = async (data: ClientOnboardingData) => {
    try {
      const response = await createClientProfile(data)
      if(!response.success){
        setError(response.message)
        return
      }
      router.push('/')
      showToast(response.message, "success")
      return
    }catch (error) {
      setError("Wystąpił błąd:" + error)
      return 
    } 
  }
  
  return (
    <div className="w-full flex flex-col items-center justify-center px-8 gap-10 sm:w-[380px] sm:px-10 sm:ring-[0.5px]  sm:ring-[#D4D4D4] sm:py-13 sm:rounded-3xl sm:shadow-lg">
        <FormHeader title="Witamy w Carfit" subtitle="Załóż konto i korzystaj z łatwych rezerwacji"/>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-6">
            {/* INPUT BOX */}
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                    <TextLabel htmlFor="name" text="Imię i nazwisko"/>
                    <TextInput 
                    type="text"
                    id="name"
                    placeholder="Jacky Macky"
                    {...register("name")}
                    />
                    <FormError error={formState.errors.name?.message}/>
                </div>

                <div className="flex flex-col gap-1">
                    <TextLabel htmlFor="phone" text="Numer telefonu"/>
                    <TextInput 
                    type="text"
                    id="phone"
                    placeholder="111 111 222"
                    {...register("phone", {
                        onChange: (e) => {
                        const raw = e.target.value.replace(/\D/g, "").slice(0, 9)
                        const formatted = raw.replace(/(\d{3})(\d{0,3})(\d{0,3})/, (_, a, b, c) => [a, b, c].filter(Boolean).join(" "))
                        e.target.value = formatted;
                        },
                    })}
                    />
                    <FormError error={formState.errors.phone?.message}/>
                </div>

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
                {formState.isSubmitting ? <Spinner/> : "Utwórz konto"}
            </button> 

            {/* POLICY */}
            <OnboardingClientPolicy/>
        </form>
      </div> 
  );
}

