import { ServicesServiceList}  from "./services-service-list";
import { ServicesServiceListItem } from "./services-service-list-item";
import { DashboardServicesServiceMenuAddServiceButton } from "./dashboard-services-service-menu-add-service-button";

type DashboardServicesServiceMenuProps = {
  servicesData: {
    id: string
    name: string
    services: {
      id: string
      name: string
      duration: number
      description: string
      categoryId:string,
      price: string
    }[]
  }[]
}

export const DashboardServicesServiceMenu = ({servicesData}:DashboardServicesServiceMenuProps) => {
  const categories = servicesData && servicesData.map((item) => ({id: item.id, name: item.name}))

  return (
    <div className="w-full h-fit max-h-full flex flex-col gap-4 p-4 border-[0.5px] border-[#D4D4D4] shadow-lg rounded-2xl xl:w-1/2">
      <div className="w-full flex flex-row justify-between items-center">
         <p className="text-[#191919] text-md font-medium lg:text-xl lg:font-normal px-0.5">Usługi</p>
          {categories.length > 0 &&  <DashboardServicesServiceMenuAddServiceButton categories={categories}/>} 
      </div>

      <div className="h-full flex flex-col gap-8 overflow-scroll">
        {servicesData.length > 0
          ? (servicesData.map((category) =>  
            <ServicesServiceList key={category.id} categoryName={category.name}>
              {category.services && category.services.length > 0 
                ? category.services.map((service) => <ServicesServiceListItem key={service.id} service={service} categories={categories}/>) 
                : <p className="text-sm font- text-[#555] text-center py-3">Brak usług w tej kategorii</p>
              }
            </ServicesServiceList>))
          : <p className="text-sm text-[#8A8A8A] text-center">Brak usług. Stwórz kategorię aby dodawać usługi.</p>
        }
      </div>
    </div>
  )
}