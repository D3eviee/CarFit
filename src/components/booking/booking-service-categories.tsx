'use client'
import { Category } from "@/lib/types"
import { cn } from "@/utils"
import { useEffect, useRef, useState } from "react"
import { BookingServicesCategoryItem } from "./booking-services-category-item"

type BookingServicesCategories = {
  categoriesData: Category[]
  defaultSelectedCategory: string
}

export const BookingServicesCategories = ({categoriesData, defaultSelectedCategory}:BookingServicesCategories) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(defaultSelectedCategory)
  const indicatorRef = useRef<HTMLDivElement>(null)
  
  // handles marking correct category
  useEffect(() => {
    const selectedElement = document.getElementById(`category-${selectedCategory}`)
    if (!selectedElement || !indicatorRef.current) return

    const offsetLeft = selectedElement.offsetLeft
    const offsetWidth = selectedElement.offsetWidth
    indicatorRef.current.style.transform = `translateX(${offsetLeft}px)`
    indicatorRef.current.style.width = `${offsetWidth}px`
  }, [selectedCategory])

  // handles movement of the indicator and sets category
  const handleClick = (id: string, element: HTMLDivElement) => {
    // change category
    setSelectedCategory(id)
    // scroll into view
    element.scrollIntoView({ behavior: 'smooth', inline: 'nearest', block: 'nearest'})
  }

  return (
    <div className="relative w-full h-full flex flex-col gap-3 overflow-hidden">
      {/* SELECT BAR */}
      <div className="relative w-full py-2 px-2 flex items-center gap-4 overflow-x-scroll scrollbar-none bg-[#FFF] border border-[#F2F2F8] shadow-inner  rounded-2xl">
        {/* SELECTED CATEGORY INDICATOR */}
        <div
          ref={indicatorRef}
          className="absolute left-0 top-2 bottom-2 z-10 bg-linear-to-b from-[#313131] to-[#141414] rounded-xl transition-all duration-500 ease-in-out shadow-[0px_1px_0px_0.5px_#313131]"
        />

        {/* CATEGORY OPTIONS */}
        {categoriesData.map((item) => (
          <div
            id={`category-${item.id}`}
            key={item.id}
            onClick={(e) => handleClick(item.id, e.currentTarget)}
            className={cn("relative z-20 bg-transparent px-2 py-1.5 whitespace-nowrap flex items-center justify-center text-[15px] font-medium text-[#191919] cursor-pointer transition-colors duration-300", selectedCategory == item.id && "text-[#FFF]")}
          >
            {item.name}
          </div>
        ))}
      </div>

      {/* SERVICES FOR SELECTED CATEGORY*/}
      <div className="flex-1 w-full flex flex-col justify-start gap-3 px-0.5 overflow-y-scroll pb-4 scrollbar-none p-1">
        {categoriesData.map((category) =>
        category.services
          .filter((service) => service.categoryId === selectedCategory)
          .map((filteredService) => <BookingServicesCategoryItem key={filteredService.id} service={filteredService} />)
      )}
      </div>
    </div>
  )
}
