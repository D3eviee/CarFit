'use client'
import { useModalStore } from "@/lib/store";
import { CloseButton } from "../buttons/close-button";

export default function OnboardingClientPolicyModal(){
  const closeModal = useModalStore(store => store.closeModal)
  

  return(
   <div className="w-full h-full flex flex-col gap-5 bg-white sm:max-w-[400px] sm:h-fit sm:pb-10 sm:rounded-2xl sm:inset-shadow-glass sm:shadow-xs sm:ring sm:ring-[#D4D4D4] sm:py-5">
      <div className="w-full px-8 py-8 flex justify-end">
        <CloseButton onCloseFn={closeModal}/>
      </div>
      
      <div className="px-6 flex flex-col gap-8">
       POLICY
      </div>      
    </div>
  )
}

    