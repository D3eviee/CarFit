import { businessOnboardingSchema } from '@/lib/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useBusinessOnboardingStore } from '@/lib/store';
import { BusinessOnboardingButton } from './business-onboarding-button';
import { FormError } from '@/components/forms/form-error';

export default function BusinessOnboardingAbout({onNextStepFn}:{onNextStepFn: () => void}) {
  //DEFINING FORM TYPES
  const businessOnboardingAbout = businessOnboardingSchema.pick({ businessDescription:true })
  type BusinessOnboardingAbout = z.infer<typeof businessOnboardingAbout>;
  const setBusinessOnboardingData = useBusinessOnboardingStore(store => store.setBusinessOnboardingData)
  const businessDescritpion = useBusinessOnboardingStore(store => store.businessDescription)

  //DEFINING USEFORM HOOK
  const { register, handleSubmit, formState } = useForm<BusinessOnboardingAbout>({
    resolver: zodResolver(businessOnboardingAbout),
    defaultValues: { businessDescription: businessDescritpion }
  })

  const onBusinessAboutSubmit = async (data: BusinessOnboardingAbout) => {
    setBusinessOnboardingData(data)
    onNextStepFn()
  }

  return(
    <form onSubmit={handleSubmit(onBusinessAboutSubmit)} className="w-full flex flex-col gap-4">
      <div className='flex flex-row justify-end items-baseline'>
         <p className='text-xs text-[#8A8A8A] pr-1'>{businessDescritpion?.length}/400 </p>
      </div>
      <div className="w-full flex flex-col gap-1">
        <textarea 
          maxLength={400}
          rows={12}
          id="businessDescription" 
          placeholder="Opowiedz nam o sobie"
          className="text-md w-full p-3 ring-[0.5px] ring-[#D4D4D4] text-[#191919] rounded-xl mb-2 focus:ring-[#8A8A8A]"
          {...register("businessDescription")}
        ></textarea>
        <FormError error={formState.errors.businessDescription?.message}/>
      </div>
      <BusinessOnboardingButton label="Dalej" disabled={formState.isValidating}/>
    </form>    
  )
}