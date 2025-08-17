'use client'
import { ServiceServicesListItem } from "@/components/service/service-services-list-item"
import { Category } from "@/lib/types"
import { cn } from "@/utils"
import { useRef, useState } from "react"

export const ServiceServicesList = ({ categoriesData }: { categoriesData: Category[] }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(categoriesData[0].id)
  const indicatorRef = useRef<HTMLDivElement>(null)

  // handles movement of the indicator
  const handleClick = (id: string, element: HTMLDivElement) => {
    // change category
    setSelectedCategory(id)

    // get element and move bg to this element
    const offsetLeft = element.offsetLeft-7
    const offsetWidth = element.offsetWidth
    indicatorRef.current.style.transform = `translateX(${offsetLeft}px)`
    indicatorRef.current.style.width = `${offsetWidth}px`

    // scroll into view
    element.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest'})
  }

  return (
    <div className="w-full flex flex-col gap-3">
      <h1 className="text-2xl text-[#111] font-semibold">Usługi</h1>

      {/* SELECT BAR */}
      <div className="relative w-full py-2 px-2 flex items-center gap-4 overflow-x-scroll scrollbar-none bg-[#FFF] border border-[#F2F2F8] shadow-inner rounded-2xl">
        {/* SELECTED CATEGORY INDICATOR */}
        <div
          ref={indicatorRef}
          className="w-[64px] translate-x-[7px] absolute left-0 top-2 bottom-2 z-10 bg-linear-to-b from-[#313131] to-[#141414] rounded-xl transition-all duration-500 ease-in-out shadow-[0px_1px_0px_0.5px_#313131]"
        />

        {/* CATEGORY OPTIONS */}
        {categoriesData.map((item) => (
          <div
            key={item.id}
            onClick={(e) => handleClick(item.id, e.currentTarget)}
            className={cn("relative z-10 bg-transparent px-2 py-1.5 whitespace-nowrap flex items-center justify-center text-[15px] font-medium text-[#191919] cursor-pointer transition-colors duration-300", selectedCategory == item.id && "text-[#FFF]")}>
            {item.name}
          </div>
        ))}
      </div>

      {/* LISTA USŁUG */}
      <div className="flex flex-col justify-center gap-2 px-0.5 ">
        {categoriesData.map((category) =>
        category.services
          .filter((service) => service.categoryId === selectedCategory)
          .map((filteredService) => ( <ServiceServicesListItem key={filteredService.id} service={filteredService} />))
      )}
      </div>
    </div>
  )
}
