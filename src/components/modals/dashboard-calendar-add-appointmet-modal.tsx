'use client'
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getWorkingTimeDataForNewAppointmet } from "@/actions/actions";
import { getServicesForBusiness } from "@/app/dashboard/services/actions";
import { Spinner } from "@/components/spinner";
import { Error } from "@/components/error";
import { useModalStore, useToastStore } from "@/lib/store";
import { DashboardCalendarModalCategorySelect } from "../dashboard/calendar/modal/dashabord-calendar-modal-category-select";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddNewAppointmentManual, addNewAppointmentManualSchema } from "@/lib/schema";
import { DashboardCalendarModalServiceSelect } from "../dashboard/calendar/modal/dashboard-calendar-modal-service-select";
import { DashboardCalendarModalDatePicker } from "../dashboard/calendar/modal/dashabord-calendar-modal-date-picker";
import { DashboardCalendarModalTimeSelect } from "../dashboard/calendar/modal/dashabord-calendar-modal-time-select";
import { DashboardCalendarModalNameInput } from "../dashboard/calendar/modal/dashabord-calendar-modal-name-input";
import { DashboardCalendarModalPhoneInput } from "../dashboard/calendar/modal/dashabord-calendar-modal-phone-input";
import { addNewAppointmentManual } from "@/app/dashboard/calendar/actions";

export const DashboardCalendarAddAppointmetModal = () => {
  const queryClient = useQueryClient() 
  const closeModal = useModalStore(store => store.closeModal)
  const showToast = useToastStore(store => store.showToast)
  
  // FORM STATE
  const { register, handleSubmit, watch, formState} = useForm<AddNewAppointmentManual>({
    resolver: zodResolver(addNewAppointmentManualSchema),
    defaultValues: {
      category: "",
      service: "",
      time: "",
      date: new Date().toISOString().split("T")[0],
      clientName: "",
      clientPhone: ""
    }
  }) 
  
  // STATES FOR RENDERING RELATABLE VALUES
  const selectedCategory = watch("category", "select")
  const selectedService = watch("service",  "select")
  const selectedDate = watch("date", new Date().toISOString().split("T")[0])

  //GETTING SERVICES FOR SELECT - SERVICES AND CATEGORIES
  const { data: businessCategoriesData, status: businessCategoriesStatus} = useQuery({
    queryKey: ["getServicesForBusiness"],
    queryFn: async () => {
      const response =  await getServicesForBusiness()
      if(!response.success) return null
      return response.data
    } 
  })

  //GETTING SERVICE WORKING DAYS DATA
  const { data: workingHoursData, status: workingDaysDataStatus } = useQuery({
    queryKey: ["getWorkingHoursData"],
    queryFn: async () => {
      const response =  await getWorkingTimeDataForNewAppointmet()
      if(!response.success) return null
      return response.data
    } 
  })

  const selectedServiceData = businessCategoriesData && businessCategoriesData
    .find((category) => category.id === selectedCategory)
    ?.services.find((service) => service.id === selectedService)

  const {mutate: addApointmentMutation, isPending: addApointmentIsPending} = useMutation({
    mutationKey: ["addAppointmentManual"],
    mutationFn: async (data: AddNewAppointmentManual) => {    
      const trimmedClientName = data.clientName.trim().replace(/\s+/g, " ");
      const formattedClientName = trimmedClientName.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
      const appointmentData = {
        servicesIds: [data.service],
        reservationStart: new Date(data.time),
        duration: selectedServiceData.duration,
        charge: Number(selectedServiceData.price),
        clientName: formattedClientName,
        clientPhone: data.clientPhone.trim().replace(/\s+/g, ""),
      }
      
      const addNewAppointmentResult = await addNewAppointmentManual(appointmentData)
      
      if(!addNewAppointmentResult.success){
        showToast(addNewAppointmentResult.message, "error")
        return 
      }

      showToast(addNewAppointmentResult.message, "success")
      closeModal()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["getAppointmentsForWeekInterval"]}) 
    }
  })

  const handleAddingAppointment = (data) => addApointmentMutation(data)

  if(workingDaysDataStatus === "pending") return <Spinner/>
  if(workingDaysDataStatus === "error") return <Error/>
  if(businessCategoriesStatus == "pending") return <Spinner/>
  if(businessCategoriesStatus == "error") return <Error/>

  return (
    <form 
      onSubmit={handleSubmit(handleAddingAppointment)}
      className="w-[360px] flex flex-col px-3 pt-5 pb-3 bg-white ring-1 ring-white inset-shadow-white rounded-2xl text-black space-y-5"
    >
      {/* CATEGORY SELECT */}
      <DashboardCalendarModalCategorySelect
        register={register}
        businessCategoriesData={businessCategoriesData}
        error={formState.errors.category?.message}
      />

      {/* SERVICE SELECT */}
      <DashboardCalendarModalServiceSelect
        register={register}
        businessCategoriesData={businessCategoriesData}
        selectedCategory={selectedCategory}
        error={formState.errors.service?.message}
      />
      
      {/* DATE AND HOUR */}
      <div className="flex flex-row gap-4 justify-between">
        {/* DATE PICKER */}
        <DashboardCalendarModalDatePicker 
          register={register}
          error={formState.errors.date?.message}
        />

        {/* TIME SELECT */}
        {(selectedDate && selectedService && selectedServiceData) &&  
          <DashboardCalendarModalTimeSelect 
            selectedDate={selectedDate}
            workingHoursData={workingHoursData}
            register={register}
            selectedServiceDuration={selectedServiceData.duration}
            error={formState.errors.time?.message}
          />
        }
      </div>

      {/* Client name */}
      <DashboardCalendarModalNameInput 
        register={register}
        error={formState.errors.clientName?.message}
      />

      {/* Client phone */}
      <DashboardCalendarModalPhoneInput 
        register={register}
        error={formState.errors.clientPhone?.message}
      />
      
      <div className="w-full flex flex-row gap-2.5">
        <button 
          onClick={closeModal}
          className="w-full text-center justify-center py-2 bg-[#F2F2F7] backdrop-blur-sm text-[#0C0C0C] rounded-3xl shadow-bnw-y-small shadow-inner-glass  hover:cursor-pointer hover:bg-[#E1E1E6] active:scale-105"
        >
          Wyjdź
        </button>
        
        <button 
          type="submit"
          className="w-full text-center justify-center py-2 bg-[#333] backdrop- text-white rounded-3xl shadow-inner-glass hover:cursor-pointer hover:bg-[#333] active:scale-105"
        >
          {addApointmentIsPending ? <Spinner/> : "Dodaj" }
        </button>
      </div>
    </form>
  )
}