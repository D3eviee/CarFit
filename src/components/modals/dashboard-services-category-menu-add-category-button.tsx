"use client";
import { DasboardServicesAddCategoryModal } from "./dashboard-services-add-category-modal";
import { Plus } from "lucide-react";
import { useModalStore } from "@/lib/store";

export function DashboardServicesCategoryMenuAddCategoryButton() {
    const openModal = useModalStore(store => store.openModal)
    const hanldeOpeningModal = () => openModal(<DasboardServicesAddCategoryModal/>)

  return (
    <div 
      className="w-fit text-center text-sm px-1.5 py-1.5 rounded-xl bg-linear-to-b  from-[#313131] to-[#141414] shadow-md text-[#F2F2F7] hover:cursor-pointer hover:bg-[#333333] active:scale-[0.95]"
      onClick={hanldeOpeningModal}
    >
      <Plus size={18} color="white" strokeWidth={2}/>
    </div>
  )
}