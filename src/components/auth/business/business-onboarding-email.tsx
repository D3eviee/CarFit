import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useBusinessOnboardingStore, useToastStore } from "@/lib/store";
import TextLabel from "../../forms/text-label";
import TextInput from "../../forms/text-input";
import { FormError } from "../../forms/form-error";
import { BusinessOnboardingButton } from "./business-onboarding-button";
import { businessOnboardingEmailSchema, BusinessOnboardingEmailSchema } from "@/lib/schema";
import { isBusinessEmailAvailable } from "@/app/(auth)/business/onboarding/actions";

export default function BusinessOnboardingEmail({onNextStepFn}:{onNextStepFn: () => void}) {
  const setBusinessOnboardingData = useBusinessOnboardingStore((state)=>state.setBusinessOnboardingData)
  const showToast = useToastStore(store => store.showToast)
  const {email, password, repeatedPassword} = useBusinessOnboardingStore(store => store)

  //DEFINING USEFORM HOOK
  const { register, handleSubmit, formState } = useForm<BusinessOnboardingEmailSchema>({
    resolver: zodResolver(businessOnboardingEmailSchema),
    defaultValues: {
      email: email,
      password: password,
      repeatedPassword: repeatedPassword
    }
  })

  // HANDLING DATA AND MOVING TO NEXT STEP
  const submitEmailForm = async (data: BusinessOnboardingEmailSchema) => {
    const isEmailAvailable = await isBusinessEmailAvailable(data.email)
    if(!isEmailAvailable.isAvailable){
      showToast(isEmailAvailable.message, "error")
      return 
    }

    setBusinessOnboardingData(data)
    onNextStepFn()
  }

  return (
    <div className="w-full flex flex-col gap-10">
      <form onSubmit={handleSubmit(submitEmailForm)} className="flex flex-col gap-8">
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
          
          <div className="flex flex-col gap-1">
            <TextLabel htmlFor="repeatedPassword" text="Powtórz hasło"/>
            <TextInput 
              type="password"
              id="repeatedPassword"
              placeholder="********"
              {...register("repeatedPassword")}
            />
            <FormError error={formState.errors.repeatedPassword?.message}/>
          </div>
        </div>

        <BusinessOnboardingButton label="Dalej" disabled={formState.isValidating}/>
      </form>

      <p className="text-center text-[#333] text-sm font-light">Masz już konto? 
        <Link href='/business/sign-in'><span className="text-[#007AFF] font-semibold ml-1">Zaloguj</span></Link>
      </p> 
    </div>
  )
}

