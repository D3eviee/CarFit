"use client";
import { useState } from "react";
import OnboardingAdress from "@/components/auth/business/business-onboarding-adress";
import OnboardingDescription from "@/components/auth/business/business-onboarding-about";
import { OnboardingNav } from "@/components/auth/onboarding-nav";
import BusinessOnboardingEmail from "@/components/auth/business/business-onboarding-email";
import BusinessOnboardingFormHeader from "@/components/auth/business/business-onboarding-form-header";
import BusinessOnboardingCategory from "@/components/auth/business/business-onboarding-category";
import BusinessOnboardingInformation from "./business-onboarding-information";
import BusinessOnboardingWorkingDays from "@/components/auth/business/business-onboarding-working-days";

export default function BusinessOnboardingForm() {
    const [activePage, setActivePage] = useState<number>(0)
    const handleNextStep = () => setActivePage((prev) => prev + 1)
    const handlePreviousStep = () => setActivePage((prev) => prev - 1)
    
    return (
        <div className="w-full h-full flex flex-col items-center justify-center px-8 gap-10 sm:w-[430px] sm:px-10 sm:ring-[0.5px]  sm:ring-[#D4D4D4] sm:py-13 sm:h-fit sm:rounded-3xl sm:shadow-lg">
            {/*FORM NAVIGATION*/}
            {activePage != 0 &&  <OnboardingNav onClick={handlePreviousStep} />}

            {/*FORM HEADER*/}
            <BusinessOnboardingFormHeader formPage={activePage}/>

            {activePage == 0 && <BusinessOnboardingEmail onNextStepFn={handleNextStep}/>}
            {activePage == 1 && <BusinessOnboardingCategory onNextStepFn={handleNextStep}/>}
            {activePage == 2 && <BusinessOnboardingInformation onNextStepFn={handleNextStep} />}
            {activePage == 3 && <OnboardingAdress onNextStepFn={handleNextStep} />}
            {activePage == 4 && <OnboardingDescription onNextStepFn={handleNextStep} />}
            {activePage == 5 && <BusinessOnboardingWorkingDays />}
        </div>
    )
}