'use client'
import { addMinutes, getMonth, getYear } from "date-fns";
import { NewReservation, Service } from "@/lib/types";
import { useAppointmentStore, useCalendarStore, useModalStore, useToastStore } from "@/lib/store";
import { addReservation } from "@/app/(landing)/actions";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { userAuth } from "@/lib/auth";
import { BookinLoginModal } from "@/components/modals/booking-login-modal";

type BookingBookVisitButtonProps = {
    services: Service[]
    businessId: string
}

export default function BookingBookVisitButton({services, businessId}:BookingBookVisitButtonProps) {
    const openModal = useModalStore(store => store.openModal)
    const showToast = useToastStore(store => store.showToast)
    const router = useRouter()

    // ZUSTAND STORE FOR SELECTED SERVICES, DATE AND TIME
    const selectedServices = useAppointmentStore((store) => store.selectedServices)
    const appointmentTime = useAppointmentStore((store) => store.appointmentTime)
    const clientMessage = useAppointmentStore((store) => store.clientMessage)
    
    // ZUSTAND STORE FOR RESETING APPOITNMENT BOOKING VALUES
    const resetClientMessage = useAppointmentStore((store) => store.resetClientMessage)
    const resetAppointmentTime = useAppointmentStore((store) => store.resetAppointmentTime)
    const resetSelectedServices = useAppointmentStore((store) => store.resetSelectedServices)
    const resetCalendarStore = useCalendarStore((store) => store.resetCalendarStore)

    const {mutateAsync} = useMutation({
        mutationKey: ["addReservation"],
        mutationFn: async () => {
            try{
                const selectedServiceObjects = services.filter(service => selectedServices.includes(service.id))
                const appointmentDuration = selectedServiceObjects.reduce((total, service) => total + service.duration, 0)
                const appointmentCharge = selectedServiceObjects.reduce((total, service) => total + parseFloat(service.price), 0)

                const newAppointmentData: NewReservation = {
                    businessId: businessId,
                    servicesIds: selectedServices,
                    reservationYear: getYear(appointmentTime),
                    reservationMonth: getMonth(appointmentTime),
                    reservationStart: appointmentTime,
                    reservationEnd: addMinutes(appointmentTime, appointmentDuration),
                    duration: appointmentDuration,
                    charge: appointmentCharge,
                    status: "Zarezerwowana",
                    clientMessage: clientMessage,
                }
                
                const response = await addReservation(newAppointmentData)
                if(response.success) {
                    showToast("Zarezerwowano wizytę", "success")
                    return response
                }
            }catch(error){
                showToast("Problem podczas dodawania rezerwacji" + error, "error")
            }
        }
    })
    
    const handleBooking = async () => {
        try {
            const user = await userAuth()
            if (!user.id) {
                openModal(<BookinLoginModal/>)
                return
            }

            const result = await mutateAsync()

            if(result) {
                showToast("Zarezerwowano wizytę", "success")
                resetClientMessage()
                resetAppointmentTime()
                resetSelectedServices()
                resetCalendarStore()
                router.push('/')
            }
            else console.warn("Rezerwacja nie powiodła się."); 
        } catch (error) {
            console.log("Wystąpił błąd" + error)
        }
    }
    
    return (
        <button 
            onClick={handleBooking}
            className="w-full text-center font-normal text-base rounded-xl md:w-full py-3 bg-linear-to-b from-[#313131] to-[#141414] text-[#FFFFFF] hover:bg-[#333] hover:cursor-pointer"
        >
            Zarezerwuj
        </button>
    )
}
      