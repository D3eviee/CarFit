'use server'
import prisma from "@/lib/db";
import { createSession } from "@/lib/session";
import bcrypt from "bcryptjs";
import { LoginDataSchema, loginDataSchema } from "@/lib/schema";

export async function signInUser(signInData:LoginDataSchema) {
    const { email, password } = signInData
    const isDataValid = loginDataSchema.safeParse(signInData)
    if(!isDataValid.success)  return {success: false, message: "Wpisane dane nie spełniają wymagań"}

    try {
        // Check if user already exists
        const user = await prisma.client.findUnique({where: { email: email }})
        if(!user) return {success: false, message: "Użytkownik nie istnieje"}

        const isPasswordValid = await bcrypt.compare(password, user.password as string)
        if(!isPasswordValid) return {success: false, message: "Nieprawidłowe dane logowania"}

        const session = await createSession(user)
        if (!session.success) return { success: false, message: "Wystąpił problem podczas tworzenia logowania" }
        return { success: true, message: "Zalogowano" }  
    } catch (error) {
        return { success:false, message: "Wystąpił problem podczas logowania:" + error}
    }
}
