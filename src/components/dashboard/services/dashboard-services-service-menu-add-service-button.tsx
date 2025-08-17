'use client'
import { ServicesCategory } from "@/lib/types";
import { ServiecAddServiceModal } from "../../modals/dashboard-services-category-menu-add-service-button";
import { useModalStore } from "@/lib/store";

export function DashboardServicesServiceMenuAddServiceButton({categories}:{categories: ServicesCategory[]}){
  const openModal = useModalStore(store => store.openModal)
  const hanldeOpeningModal = () => openModal(<ServiecAddServiceModal categories={categories}/>)

    return(
      <button 
        type="button" 
        className="w-fit text-center text-sm px-3 py-1.5 rounded-xl bg-linear-to-b  from-[#313131] to-[#141414] shadow-md text-[#F2F2F7] hover:cursor-pointer hover:bg-[#333333] active:scale-[0.95]"
        onClick={hanldeOpeningModal}
      >
        Dodaj usługę
      </button>
    )
  }

 