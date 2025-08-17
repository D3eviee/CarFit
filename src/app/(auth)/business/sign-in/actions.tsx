'use server'
import prisma from "@/lib/db";
import { createBusinessSession } from "@/lib/session";
import bcrypt from "bcryptjs";
import { LoginDataSchema, loginDataSchema } from "@/lib/schema";

export async function signInBusiness(signInData:LoginDataSchema) {
    const isDataValid = loginDataSchema.safeParse(signInData)
    if(!isDataValid.success)  return {success: false, message: "Wpisane dane nie spełniają wymagań"}

    const { email, password } = signInData

    try {
        // Check if user already exists
        const user = await prisma.business.findUnique({where: { email: email }})
        if(!user) return {success: false, message: "Użytkownik nie istnieje"}

        const isPasswordValid = await bcrypt.compare(password, user.password as string)
        if(!isPasswordValid) return {success: false, message: "Błędne dane logowania"}

        const session = await createBusinessSession(user)
        if (!session.success) return { success: false, message: "Wystąpił problem podczas tworzenia twojego konta:" }
        return { success: true, message: "Zalogowano" }  
    } catch (error) {
        return { success:false, message: "Wystąpił problem podczas logowania:" + error }
    }
}
