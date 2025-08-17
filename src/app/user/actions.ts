'use server'
import { userAuth } from "@/lib/auth";
import prisma from "@/lib/db"

// APPOINTMENTS -> getting all client appointments
export const getClientAppointments = async () => {
    try {
        const user = await userAuth()

        if(!user.success) return {success: false, message: "No-authenticated user. Log in."}

        const clientAppointments =  await prisma.reservation.findMany({
        where: { clientId: user.id },
        select: {
            id: true,
            reservationStart: true,
            duration: true,
            status: true,
            clientMessage: true,
            services: {
                select: {
                    serviceId: true,
                    service: {
                        select: {
                            name: true,
                            price: true,
                        }
                    }
                }
            },
            business: {
                select: {
                    name: true,
                    street: true,
                    district: true,
                    town: true,
                }
            },
        },
        orderBy: {reservationStart: "desc"}
        })
        return {success: true, data: clientAppointments}
    }catch(error){
        return {success: false, message: "Server problem occured." + error}
    }
}

// APPOINTMENTS -> deleting user appointment
export const deleteAppointment = async (appointmentId:string) => {
    try {
        const user = await userAuth()
        if(!user.success) return {success: false, message: "No-authenticated user. Log in"}

        const deletedAppointment = await prisma.reservation.update({
            where: {
                id: appointmentId,
                clientId : user.id
            },
            data: { status: "Odwołana" }
        })


        return {success: true, data: deletedAppointment}
    } catch (error) {
        return {success: false, message: "Wystąpił problem podczas próby odwołania wizyty" + error}
    }
}