'use client'
import { FormError } from "@/components/forms/form-error";
import TextLabel from "@/components/forms/text-label";
import { AddNewAppointmentManual } from "@/lib/schema";
import { UseFormRegister } from "react-hook-form";


type DashboardCalendarModalCategorySelectProps = {
  businessCategoriesData:{
    id: string
    name: string
    services: {
      id: string
      name: string
      duration: number
      price: string
      description: string
    }[]
  }[]
  register: UseFormRegister<AddNewAppointmentManual>
  error:string
}

export const DashboardCalendarModalCategorySelect = ({businessCategoriesData, register, error}:DashboardCalendarModalCategorySelectProps) => {
  return (
    <div className="flex flex-col w-full gap-1">
      <TextLabel htmlFor="category" text="Kategoria" />
      <select 
        className="px-2 py-2 border border-[#e5e7eb] text-sm w-3/4" 
        id="category" 
        {...register('category')} 
      >
        <option key="0" value="select" disabled>Wybierz</option>
        {businessCategoriesData?.map((category)=> <option key={category.id} value={category.id}>{category.name}</option> )}
      </select>

      <FormError error={error}/>    
    </div>
  )
}

