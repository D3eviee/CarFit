import { BusinessPageWeAreForuSection } from "@/components/business/business-foru-section";
import { BusinessPageHeader } from "@/components/business/business-header";
import { BusinessIntorductionSection } from "@/components/business/business-intorduction-section";
import { BusinessPageProfitsSection } from "@/components/business/business-profits-section";
import { BusinessSupportSection } from "@/components/business/business-support-section";
import { BusinessTrySection } from "@/components/business/business-try-section";

export default function BusinessPage() {
  return (
   <div className="flex flex-col overflow-hidden">
      <div className="bg-gradient-to-t from-[#F2F2F7] from-5% to-[#FFF] blur-sm absolute top-0 h-9/12 sm:h-2/3 lg:h-5/12 2xl:h-7/12 w-full -z-10"/>
      <BusinessPageHeader/>
      <BusinessPageProfitsSection/>
      <BusinessPageWeAreForuSection/>
      <BusinessIntorductionSection/>
      <BusinessSupportSection/>
      <BusinessTrySection/>
    </div>
  )
}
