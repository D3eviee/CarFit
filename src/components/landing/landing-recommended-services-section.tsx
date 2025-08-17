import { getRecommendedServices } from "@/app/(landing)/actions";
import { BusinessCard } from "./business-card";
import { LandingSectionLayoutProvider } from "./landing-section-layout-provider";

export const LandingRecommendedServicesSection = async () =>  {
  const recommendedServices = await getRecommendedServices()
  const services = recommendedServices.data

  if (!recommendedServices.success) return <p>{recommendedServices.message}</p>

  return (
    <LandingSectionLayoutProvider sectionHeader="Polecane">
      <div className="w-full flex flex-row gap-5 overflow-x-scroll pr-4 border-none scrollbar-none">
        {services && services.length > 0 ? (
          services.map((service) => <BusinessCard data-testid={service.category} key={service.id} serviceData={service} /> )
        ) : (
          <p className="text-sm text-[#333] font-light">{recommendedServices.message}</p>
        )}
      </div>
    </LandingSectionLayoutProvider>
  )
}