'use server'
import { businessAuth } from "@/lib/auth";
import prisma from "@/lib/db";
import { addMinutes, getMonth, getYear } from "date-fns";

type NewReservationManual =  {
  clientName: string
  clientPhone: string
  reservationStart: Date 
  duration: number
  charge: number
  servicesIds: string[]
}

// getting appointments for calendar week view
export const getAppointmentsForWeekInterval = async (weekInterval: Date[]) => {
    try{
        const business = await businessAuth()
        if(business.success == false) return {success: false, message: "No-authenticated user. Log-in!"} 

        const weekReservations =  await prisma.reservation.findMany({
            where: {
                businessId: business.id,
                reservationStart: {
                    gte: weekInterval[0], // Start tygodnia
                    lte: weekInterval[weekInterval.length - 1], // Koniec tygodnia
                },
                status: "Zarezerwowana"
            },
            select: {
                id: true,
                clientName: true, 
                clientPhone: true,
                clientMessage: true,
                duration : true,
                reservationStart: true,
                charge: true,
                clientId:true,
                status: true,
                client:{
                    select: {
                        name:true,
                        phone: true,
                        image: true,
                        email: true,
                    }
                },
                services: {
                    select: {
                        service: {
                            select: {
                                name:true,
                                price: true,
                            }
                        }
                    }
                }
            }
        })

        const reservations = weekReservations.map((item) => {
            const servicesData = item.services.map((service) => ({name:service.service.name, price: service.service.price}))

            if(item.clientId == null){
                return {
                    appointmentId: item.id,
                    clientName: item.clientName,
                    clientPhone: item.clientPhone,
                    clientImage: null,
                    clientMessage: item.clientMessage,
                    reservationStart: item.reservationStart,
                    duration : item.duration,
                    charge: item.charge,
                    status: item.status,
                    service: servicesData
                }
            }else{
                return {
                    appointmentId: item.id,
                    clientPhone: item.client.phone, 
                    clientName: item.client.name, 
                    clientImage: item.client.image,
                    clientMessage: item.clientMessage,
                    reservationStart: item.reservationStart,
                    duration : item.duration,
                    charge: item.charge,
                    status: item.status,
                    service: servicesData
                }
            }
        })

        return {success: true, data: reservations}
    }catch(error){
        return {success: false, message: "Server error while getting week reservations" + error}
    }
}

// DASHBOARD/CALEMDAR -> MODAL
// THIS FUNCTION GETS EXISTING APPOINTMETS FOR MONTH OF SELECTED DATE
// IT'S USED IN MODAL TO FILTER THE AVAILABLE APPOINTMENT HOURS
export const getActiveMonthAppointments = async(activeDate:Date) => {
    const activeDateYear = activeDate.getFullYear()
    const activeDateMonth = activeDate.getMonth()+1
    
    try{
        const business = await businessAuth()
        if(business.success == false) return {success: false, message: "Brak autoryzacji. Zaloguj się"} 


        const reservationForSelectedMonth = await prisma.reservation.findMany({
            where: {
                businessId: business.id,
                reservationYear:activeDateYear,
                reservationMonth: activeDateMonth,
                status: "Zarezerwowana"
            },
            select: {
                reservationStart: true,
                reservationEnd: true,
                duration: true
           }
        })

        if(!reservationForSelectedMonth) return {success: false, message: "Wystąpił problem podczas pobierania danych"}
        return  {success: true, data: reservationForSelectedMonth }
    }catch(error){
       return {success: false, message: "Wystąpił problem podczas pobierania danych"+ error}
    }
}

//FUNCTION FOR ADDING RESERVATION MANUALLY
export const addNewAppointmentManual = async (reservation:NewReservationManual) => {
  const {clientName, clientPhone, reservationStart, duration, charge, servicesIds } = reservation

  try{
      const businessData = await businessAuth()
      if(!businessData.success) return {success: false, message: "Brak dostępu. Zaloguj się"}

      const addReservationResult = await prisma.reservation.create({
          data: {
            businessId: businessData.id,
            reservationYear: getYear(reservationStart),
            reservationMonth: getMonth(reservationStart) + 1,
            reservationStart: reservationStart,
            reservationEnd: addMinutes(reservationStart, duration),
            duration: duration,
            charge: charge,
            status: "Zarezerwowana",
            clientName: clientName,
            clientPhone: clientPhone,
            isAddedByBusiness: true,
          }
        })
        if(!addReservationResult) return {success: false, message: "Wystąpił problem podczas dodwania rezerwacji"}
        
        const addServicesResult =  await Promise.all(
          servicesIds.map((serviceId) =>
            prisma.reservationServices.create({
              data: {
                reservationId: addReservationResult.id,
                serviceId: serviceId
              }
          }))
        )
        if(!addServicesResult) return {success: false, message: "Wystąpił problem podczas dodwania rezerwacji"}
        return {success: true, message: "Dodano rezerwację"}
  }catch(error){
      return {success: false, message: "There was a server error with adding appointment" + error}
  }
}