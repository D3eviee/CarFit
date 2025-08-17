'use client'
import { FormError } from "@/components/forms/form-error";
import TextLabel from "@/components/forms/text-label";
import { AddNewAppointmentManual } from "@/lib/schema";
import { UseFormRegister } from "react-hook-form";

type DashboardCalendarModalCategorySelectProps = {
  register: UseFormRegister<AddNewAppointmentManual>
  error: string
}

export const DashboardCalendarModalDatePicker = ({register, error}:DashboardCalendarModalCategorySelectProps) => {
  return (
    <div className="flex flex-col w-3/5">
      <TextLabel htmlFor="date" text="Dzień"/>
      <input 
        type="date" 
        id="date" 
        {...register('date')} 
        required 
        className="border px-1 py-2 rounded" 
      />
      <FormError error={error}/>
    </div>
  )
}

