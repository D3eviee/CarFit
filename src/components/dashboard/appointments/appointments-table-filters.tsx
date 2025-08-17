'use client'
import { Filter } from "lucide-react";

export const AppointmentsTableFilters = () => {
    return (
      <div className="flex flex-row gap-3 items-center">
        {/* SEARCH */}
        
        <input
        id="search"
        placeholder="Szukaj"
        className="max-w-72 w-full bg-[#F6F7FB] px-2 py-1.5 text-md text-[#191919] rounded-lg border outline-none border-transparent focus:border-[#CCC]"
    />
        {/* FILTERS */}
        <div className="flex flex-row items-center gap-1 border border-[#D4D4D4] rounded px-2 py-1.5 hover:bg-[#EEE] hover:cursor-pointer">
          <Filter color="#D4D4D4" size={20} strokeWidth={2}/>
          <p className="text-sm font-normal text-[#999]">Filtry</p>
        </div>
      </div>
    )
}