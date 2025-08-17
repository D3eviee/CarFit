import { businessOnboardingSchema } from '@/lib/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useBusinessOnboardingStore } from '@/lib/store';
import { BusinessOnboardingButton } from './business-onboarding-button';
import { FormError } from '@/components/forms/form-error';
import TextInput from '@/components/forms/text-input';
import TextLabel from '@/components/forms/text-label';
import { useRef } from 'react';

export default function BusinessOnboardingAdress({onNextStepFn}:{onNextStepFn: () => void}) {
  const businessOnboardingAdress = businessOnboardingSchema.pick({ businessTown: true, businessZipcode: true, businessDistrict: true, businessStreet: true})
  type BusinessOnboardingAdress = z.infer<typeof businessOnboardingAdress>

  const businessTown= useBusinessOnboardingStore(store=>store.businessTown)
  const businessDistrict = useBusinessOnboardingStore(store=>store.businessDistrict)
  const businessZipcode = useBusinessOnboardingStore(store=>store.businessZipcode)
  const businessStreet = useBusinessOnboardingStore(store=>store.businessStreet)
  const setBusinessOnboardingData = useBusinessOnboardingStore(store=>store.setBusinessOnboardingData)

  const previousZipCodeValue = useRef("");

  //DEFINING USEFORM HOOK
  const { register, handleSubmit, formState } = useForm<BusinessOnboardingAdress>({
    resolver: zodResolver(businessOnboardingAdress),
      defaultValues: {
        businessTown: businessTown,
        businessDistrict: businessDistrict,
        businessZipcode: businessZipcode,
        businessStreet: businessStreet
      },
    });

    // HANDLING DATA AND MOVING TO NEXT STEP
    const submitAdressForm = async (data: BusinessOnboardingAdress) => {
      setBusinessOnboardingData(data)
      onNextStepFn()
    }

  return(
    <form onSubmit={handleSubmit(submitAdressForm)} className="w-full flex flex-col gap-7">
      <div className="flex flex-col gap-1">
        <TextLabel htmlFor="businessTown" text="Miasto"/>
        <TextInput
          type="text"
          id="businessTown"
          {...register("businessTown")}
        />
        <FormError error={formState.errors.businessTown?.message}/>
      </div>

      <div className="flex flex-col gap-1">
        <TextLabel htmlFor="businessDistrict" text="Dzielnica"/>
        <TextInput
          type="text"
          id="businessDistrict"
          {...register("businessDistrict")}
        />
        <FormError error={formState.errors.businessDistrict?.message}/>
      </div>

      <div className="flex flex-col gap-1">
        <TextLabel htmlFor="businessZipcode" text="Kod pocztowy"/>
        <TextInput
          type="text"
          id="businessZipcode"
          inputMode='numeric'
          {...register("businessZipcode", {
            onChange: (e) => {
              let value = e.target.value.replace(/\D/g, "")
              const isDeleting = previousZipCodeValue.current.length > value.length;

              if (value.length > 2) {
                value = value.slice(0, 5)
                value = `${value.slice(0, 2)}-${value.slice(2)}`;
              } else if (value.length === 2 && !isDeleting) value = `${value}-`

              previousZipCodeValue.current = value;
              e.target.value = value;
            }  
          })}
        />
        <FormError error={formState.errors.businessZipcode?.message}/>
      </div>

      <div className="flex flex-col gap-1">
        <TextLabel htmlFor="businessStreet" text="Ulica"/>
        <TextInput
          type="text"
          id="businessStreet"
          {...register("businessStreet")}
        />
        <FormError error={formState.errors.businessStreet?.message}/>
      </div>

      <BusinessOnboardingButton label="Dalej" disabled={formState.isValidating}/>
    </form>    
  )
}