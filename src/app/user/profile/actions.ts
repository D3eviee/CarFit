'use server'
import { logout, userAuth } from "@/lib/auth";
import prisma from "@/lib/db"
import { deleteImageFromS3, uploadToS3 } from "@/lib/s3";
import { ChangeClientProfileData, ChangePasswordInput, changePasswordSchema } from "@/lib/schema";
import bcrypt from "bcryptjs"

// PROFILE -> getting user profile information 
export const getClientProfileData = async () => {
    try {
        const user = await userAuth()
        if(!user.success) return {success: false, message: "No-authenticated user. Log in"}
        
        const userData = await prisma.client.findUnique({
            where: { id: user.id },
            select: {
                id: true,
                email: true,
                image: true,
                name: true,
                phone: true,
                createdAt: true,
                Reservation: {
                    select: {
                        charge: true,
                    }
                }
            }
        })

         return {success: true, data: userData}
    }catch(error){
        return {success: false, message: "Server error occured while getting data: " + error}
    }
}

// PROFILE -> get user photo for modal view
export const getClientPhotoEditModal = async () => {
    try {
        const user = await userAuth()
        if(!user.success) return {success: false, message: "Brak dostępu. Zaloguj się"}
        
        const userImage = await prisma.client.findUnique({
            where: { id: user.id },
            select: { image: true }
        })

        if(!userImage) return {success: false, message: "Wystąpił problem podczas pobierania zdjęcia"}
        return {success: true, data: userImage.image}
    }catch(error){
        return {success: false, message: "Server error occured while getting data: " + error}
    }
}

// PROFILE -> updating client profile information 
export const updateClientProfileData = async (oldData:ChangeClientProfileData, newData:ChangeClientProfileData) => {
    try {
        const user = await userAuth()
        if(!user.success) return {success: false, message: "Brak dostępu. Zaloguj się"}

        if(oldData.email == newData.email && oldData.phone == newData.phone){
            const updateUserName = await prisma.client.update({
                where: { id: user.id},
                data: { name: newData.name }
            })
            if(updateUserName) return {success: true, data: updateUserName}
        }

        if(oldData.email == newData.email){
            const phoneExists = await prisma.client.findUnique({ where: {phone: newData.phone} })
            if(phoneExists) return {success: false, message: "Konto z tym numerem telefonu istnieje"}
            const updateUserName = await prisma.client.update({
                where: { id: user.id},
                data: { name: newData.name, phone: newData.phone }
            })
            if(updateUserName) return {success: true, data: updateUserName}
        }

        if(oldData.phone == newData.phone){
            const emailExists = await prisma.client.findUnique({ where: {email: newData.email} })
            if(emailExists) return {success: false, message: "Konto z tym adresem email istnieje"}
            const updateUserEmail = await prisma.client.update({
                where: { id: user.id},
                data: { name: newData.name, email: newData.email }
            })
            if(updateUserEmail) return {success: true, data: updateUserEmail}
        }
        
        const updateUserDataResult = await prisma.client.update({
            where: {
                id: user.id
            },
            data: {
                name: newData.name,
                phone: newData.phone,
                email: newData.email,
            },
        })

        if(!updateUserDataResult) return {success: false, message: "Wystąpił problem podczas zapisaywania danych."}
        return {success: true, data: updateUserDataResult}
    } catch (error) {
        return {success: false, message: "Wystąpił problem servera:" + error}
    }
}

// PROFILE function for changing client password 
export async function changeClientPassword(data: ChangePasswordInput) {
    try{
        const auth = await userAuth()
        if (!auth.success) return { success: false, message: "Dostęp zablokowany. Zaloguj się" }

        const parsed = changePasswordSchema.safeParse(data)
        if (!parsed.success) return { success: false, message: "Wypełnij pola poprawnie"}

        const { currentPassword, newPassword } = parsed.data
        
        // getting old password from db and checking whether user exists
        const user = await prisma.client.findUnique({ where: { id: auth.id }, select: { password: true }})
        if (!user) return { success: false, message: "Nie znaleziono użytkownika" }

        // checking is current password correct, and whether is the new password the same as old
        const isMatch = await bcrypt.compare(currentPassword, user.password)
        if (!isMatch) return { success: false, message: "Aktualne hasło jest nieprawidłowe" }
        const isSameAsCurrent = await bcrypt.compare(newPassword, user.password)
        if(isSameAsCurrent) return { success: false, message: "Nowe hasło nie może być takie samo jak aktualne." }

        // hashing new password and updating
        const newHashedPassword = await bcrypt.hash(newPassword, 10)
        const updatePassword = await prisma.client.update({ where: { id: auth.id }, data: { password: newHashedPassword }})

        if(!updatePassword) return { success: false, message: "Wystąpił problem podczas zmiany hasła" }
        return { success: true, message: "Hasło zostało zmienione" }

    }catch(error){
        return { success: false, message: "Wystąpił problem serwera podczas zmiany hasła" + error }
    }
}

// PROFILE ->  creates link to client profile photo and puts it into database
export const uploadNewClientProfileImage = async (formData: FormData) => {
    try {
        const user = await userAuth()
        const userId = user.id

        if(!user.success) return {success: false, message:"Odmowa dostępu. Użytkownik niezalogowany"}

        const file = formData.get('image') as File;
        if (!file) return {success: false, message:"Brak pliku"}

        const {error, key} = await uploadToS3({file, userId})
        if(error) return  {success: false, message:"Wystąpił problem podczas przesyłania pliku na serwer"}
        const s3Link = `https://carfitapp.s3.eu-north-1.amazonaws.com/${key}`
        
        const putImage  = await prisma.client.update({
            where: { id: userId},
            data: { image: s3Link }
        })
        return {success: true, data:putImage.image}
    }catch(error){
        return {success: false, message:`Wystąpił problem podczas przesyłania pliku na serwer ${error}`}
    }
}

// PROFILE -> deletes client profile photo
export const deleteClientProfileImage = async (imageUrl:string) => {
    try {
        if(!imageUrl) return { success: false, message: "Brak zdjęcia do usunięcia" }

        const user = await userAuth()
        const userId = user.id
        if(!user.success) return {success: false, message:"Odmowa dostępu. Użytkownik niezalogowany"}

        const deleteResult = deleteImageFromS3(imageUrl)
        if(!deleteResult) return {success: false, message:"Wystąpił problem z podczas usuwania zdjęcia"}
        
        const result = await prisma.client.update({ where: { id: userId }, data: { image: null }})
        return { success: true, data: result.image }
    }catch(error){
        return {success: false, message:`Wystąpił problem podczas usuwania zdjęcia ${error}`}
    }
}

// PROFILE -> deletes client profile photo
export const deleteClientAccount = async () => {
    try {
        const user = await userAuth()
        if(!user.success) return {success: false, message:"Odmowa dostępu. Użytkownik niezalogowany"}

        const result = await prisma.client.delete({ where: { id: user.id }})
        if(!result) return {success: false, message:`Wystąpił problem podczas usuwania konta`}
        logout()
        return { success: true, message:`Twoje konto zostało usunięte`}
    }catch(error){
        return {success: false, message: `Wystąpił problem podczas usuwania konta ${error}`}
    }
}