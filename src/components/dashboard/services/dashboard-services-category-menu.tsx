import { DashboardServicesCategoryMenuAddCategoryButton } from "@/components/modals/dashboard-services-category-menu-add-category-button";
import { DashboardServicesCategoryMenuItem } from "./dashboard-services-category-menu-item";
import { ServicesCategory } from "@/lib/types";

export const DashboardServicesCategoryMenu = ({categories}: {categories: ServicesCategory[]}) => {
  return (
    <div className="h-fit w-full flex flex-col gap-4 p-4 border-[0.5px] border-[#D4D4D4] shadow-lg rounded-2xl md:w-1/3 lg:w-[215px]">
      <div className="w-full flex flex-row justify-between items-center">
         <p className="text-[#191919] text-md font-medium lg:text-xl lg:font-normal px-0.5">Kategorie</p>
          <DashboardServicesCategoryMenuAddCategoryButton />
      </div>
     
      <div className="flex flex-col gap-2">
        {categories.length > 0 
          ? categories.map((category, index) =>  <DashboardServicesCategoryMenuItem key={index} category={category}/> ) 
          : <p className="text-sm text-[#8A8A8A] text-center">Brak kategorii</p>
        }
      </div>
    </div>
  )
}