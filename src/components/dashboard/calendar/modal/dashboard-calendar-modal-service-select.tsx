'use client'
import { FormError } from "@/components/forms/form-error";
import TextLabel from "@/components/forms/text-label";
import { AddNewAppointmentManual } from "@/lib/schema";
import { UseFormRegister } from "react-hook-form";

type DashboardCalendarModalServiceSelectProps = {
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
  selectedCategory: string
  error: string
}

export const DashboardCalendarModalServiceSelect = ({businessCategoriesData, register, selectedCategory, error}:DashboardCalendarModalServiceSelectProps) => {
  return (
    <div className="flex flex-col gap-1">
      <TextLabel htmlFor="service" text="Usługa" />
      <select className="px-2 py-2 border border-[#e5e7eb] text-sm" id="service" {...register('service')}>
        <option value="select" disabled>Wybierz</option>
        {selectedCategory && businessCategoriesData?.map((category)=> (
          selectedCategory == category.id && category.services.map((service) => 
          <option className="flex flex-row justify-between" key={service.id} value={service.id}>{service.name}</option>
          )))}
      </select>
      <FormError error={error}/>
    </div>
  )
}

