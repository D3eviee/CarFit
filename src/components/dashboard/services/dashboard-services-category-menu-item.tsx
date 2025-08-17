'use client'
import { MoreVertical, Pen, TrashIcon } from "lucide-react"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { ServicesCategory } from "@/lib/types"
import { useModalStore } from "@/lib/store"
import { DashboardServicesDeleteCategoryModal } from "@/components/modals/dashboard-services-delete-category-modal"
import { DashboardServiecsEditCategoryModal } from "@/components/modals/dashboard-services-edit-category-modal"

export const DashboardServicesCategoryMenuItem = ({category}: {category: ServicesCategory}) => {
  const openModal = useModalStore(store => store.openModal)
  const handleOpeningDeleteCategoryModal = () => openModal(<DashboardServicesDeleteCategoryModal categoryId={category.id}/>)
  const handleOpeningEditCategoryModal =  () => openModal(<DashboardServiecsEditCategoryModal categoryId={category.id} categoryName={category.name}/>)

  return (
    <div className="w-full flex flex-row justify-between items-center px-2 py-2 rounded-lg border-[0.5px] border-[#D4D4D4]">
      <p className="text-sm text-[#2B2B2B] font-normal ">{category.name}</p>
      
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <div className="hover:bg-[#F2F2F7] active:scale-90 p-1 rounded-md">
            <MoreVertical color="#999999" size={15}/>
          </div>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className="p-1 bg-[#FFF] outline-none ring-[1px] ring-[#D4D4D4] shadow-[0px_0px_0px_1px_#D4D4D480] rounded-xl"
            align="end"
            sideOffset={3}
          >
            <DropdownMenu.Item 
              className="py-2 pl-1 pr-10 flex flex-row justify-start items-center gap-2 rounded-lg outline-none hover:bg-[#F2F2F7] hover:cursor-pointer"
              onClick={handleOpeningEditCategoryModal}>
              <Pen color="#2B2B2B" strokeWidth={1.5} size={15}/>
              <p className="text-[#2B2B2B] text-xs font-medium">Edytuj</p>
            </DropdownMenu.Item>
            <DropdownMenu.Separator className="h-[0.5px] bg-[#D4D4D4] my-1" />
            <DropdownMenu.Item
              className="py-2 pl-1 pr-10 flex flex-row justify-start items-center gap-2 rounded-lg outline-none hover:bg-[#F2F2F7] hover:cursor-pointer"
              onClick={handleOpeningDeleteCategoryModal}
            >
              <TrashIcon color="#FF383C" strokeWidth={1.5} size={15}/>
              <p className="text-[#FF383C] text-xs font-medium">Usuń</p>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  )
}
