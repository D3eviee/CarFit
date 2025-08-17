'use server'
import prisma from "@/lib/db";
import { createSession } from "@/lib/session"
import { clientOnboardingData, ClientOnboardingData } from "@/lib/schema";
import bcrypt from "bcryptjs";

export async function createClientProfile(userOnboardingData:ClientOnboardingData) {
    const isDataValid = clientOnboardingData.safeParse(userOnboardingData)
    if(!isDataValid.success)  return {success: false, message: "Wpisane dane nie spełniają wymagań"}

    const { name, phone, email, password } = userOnboardingData

    try {
        // check whether the user with that phone, email exsists
        const isEmailInUse = await prisma.client.findUnique({ where: {email: email }})
        if(isEmailInUse) return {success: false, message: "Użytkownik z tym podanym adresem e-mail już istnieje"}
        const isPhoneInUse = await prisma.client.findUnique({ where: {phone: phone}})
        if(isPhoneInUse) return {success: false, message: "Użytkownik z tym numerem telefonu już istnieje"}


        // if user does not exist: hash password and create user in the database
        const securePassword = await bcrypt.hash(password, 10)
        const newUser = await prisma.client.create({
            data: {
                name: name,
                email,
                phone,
                password: securePassword
            }
        })

        //create sesssion
        const session = await createSession(newUser)
        if (!session.success) return { success: false, message: "Wystąpił problem podczas tworzenia twojego konta" }
        return { success: true, message: "Twoje konto zostało utworzone" }
    } catch (error) {
        return { success:false, message: "Wystąpił problem podczas tworzenia twojego konta:" + error }
    }
}
