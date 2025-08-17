"use client";
import { useQuery } from "@tanstack/react-query";
import { DashboardServicesCategoryMenu } from "@/components/dashboard/services/dashboard-services-category-menu";
import { getServicesForBusiness } from "./actions";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { Spinner } from "@/components/spinner";
import { Error } from "@/components/error";
import { DashboardServicesServiceMenu }  from "@/components/dashboard/services/dashboard-services-service-menu";

export default function ServicePage() {
  const { data: servicesForBusinessData, status: servicesForBusinessStatus } = useQuery({
    queryKey: ["getServicesForBusiness"],
    queryFn: async () => {
      const response =  await getServicesForBusiness()
      if(!response.success) return null
      return response.data
    } 
  })

  if(servicesForBusinessStatus == "pending") return <Spinner/>
  if(servicesForBusinessStatus == "error") return <Error/>

  const categories = servicesForBusinessData &&  servicesForBusinessData.map((item) => ({id: item.id, name: item.name}))
  
  return (
    <div className="h-full w-full flex flex-col gap-5 overflow-hidden">
      <DashboardPageHeader
        title="Usługi" 
        subtitle="Dodawaj, zmieniaj i usuwaj dane o oferowanych przez Twój serwis usługach."
      />

      {/*SERVICES AND CATEGORIES SECTION*/}
      <div className="flex flex-col gap-4 md:flex-row h-full overflow-hidden">
        {/* MENU FOR CATEGORIES*/}
        <DashboardServicesCategoryMenu categories={categories!} />
        {/* MENU FOR SERVICEs*/}
        <DashboardServicesServiceMenu servicesData={servicesForBusinessData}/>
      </div>
    </div>
  )
}