import { useBusinessOnboardingStore } from '@/lib/store';
import { SERVICES_CATEGORIES } from '@/lib/data'; 
import { BusinessOnboardingCategoryItem } from './business-onboarding-category-item';

type OnboardingCategory = {
  businessCategory: string
}
export default function BusinessOnboardingCategory({onNextStepFn}:{onNextStepFn: () => void}) {
    const setBusinessOnboardingData = useBusinessOnboardingStore((state)=>state.setBusinessOnboardingData)

    //FUNCTION FOR HANDLING FORM
    const handleChoosingCategory = (category: string) => {
      const selectedCategory: OnboardingCategory = { businessCategory: category }
      setBusinessOnboardingData(selectedCategory)
      onNextStepFn()
  }

  return(
    <div className='w-full flex flex-col gap-3'>
      <p className='text-sm text-[#363638] font-light'>Kategoria</p>
      <div className='flex flex-col gap-1 overflow-scroll'>
        {SERVICES_CATEGORIES.map((category) => 
          <BusinessOnboardingCategoryItem
            key={category.name} 
            categoryName={category.name} 
            onClick={()=>handleChoosingCategory(`${category.name}`)} 
          /> 
        )}
      </div>
    </div>    
  )
}