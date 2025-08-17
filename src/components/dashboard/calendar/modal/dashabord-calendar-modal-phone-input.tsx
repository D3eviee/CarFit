'use client'
import { FormError } from "@/components/forms/form-error";
import TextInput from "@/components/forms/text-input";
import TextLabel from "@/components/forms/text-label";
import { AddNewAppointmentManual } from "@/lib/schema";
import { UseFormRegister } from "react-hook-form";

type DashboardCalendarModalPhoneInputProps = {
  register: UseFormRegister<AddNewAppointmentManual> 
  error:string
}

export const DashboardCalendarModalPhoneInput = ({ register, error }:DashboardCalendarModalPhoneInputProps) => {
  return (
    <div className="flex flex-col gap-1">
      <TextLabel htmlFor="clientPhone" text="Numer telefonu klienta" />
      <div className="w-fit flex flex-row h-full gap-1 border border-[#e5e7eb]">
        <div className="flex justify-center items-center h-full py-2 px-0.5">
          <p className="text-sm text-[#777] leading-0">+48</p>
        </div>
        <TextInput className="w-full px-2 py-2  text-sm" type="text" id="clientPhone" {...register("clientPhone")}/> 
      </div>
      <FormError error={error}/>  
    </div>
  )
}

