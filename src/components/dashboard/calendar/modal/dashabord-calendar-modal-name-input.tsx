'use client'
import { FormError } from "@/components/forms/form-error";
import TextInput from "@/components/forms/text-input";
import TextLabel from "@/components/forms/text-label";
import { AddNewAppointmentManual } from "@/lib/schema";
import { UseFormRegister } from "react-hook-form";

type DashboardCalendarModalNameInputProps = {
  register: UseFormRegister<AddNewAppointmentManual>
  error:string
}

export const DashboardCalendarModalNameInput = ({ register, error }:DashboardCalendarModalNameInputProps) => {
  return (
    <div className="flex flex-col gap-1">
      <TextLabel htmlFor="clientName" text="Klient" />
      <TextInput className="px-2 py-2 border border-[#e5e7eb] text-sm" type="text" id="clientName" {...register("clientName")} />
      <FormError error={error}/>  
    </div>
  )
}

