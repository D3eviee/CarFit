import z, { boolean, string } from 'zod'

export const businessOnboardingSchema = z.object({
    email: z
        .string()
        .email(({ message: "Wrong email format" }))
        .min(1)
        .max(40),
    password: z
        .string()
        .min(1, ({ message: "Password is too short" })),
    businessCategory: z
        .string(({ message: "Category for business was not provided" }),),
    businessName: z
        .string()
        .min(1, ({ message: "Business name was not provided" }))
        .max(40),
    businessOwner: z
        .string(({ message: "Owner for business was not provided" }))
        .min(1, ({ message: "Business owner was not provided"}))
        .max(40),
    businessPhone: z
        .string()
        .length(9, ({ message: "Invalid phone number format" }),),
    
    policyAcceptance: boolean(({ message: "Policy and privacy rules not accepted" }),),
    businessTown: string().min(1, { message: "Town for business was not provided" }),
    businessZipcode: string().min(1, { message: "Zipcode for business was not provided" }),
    businessDistrict: string().min(1, { message: "District for business was not provided" }),
    businessStreet: string().min(1, { message: "Street for business was not provided" } ),
    businessDescription: string()
})

export type BusinessOnboardingSchema = z.infer<typeof businessOnboardingSchema>

export const categoryName = z.string().min(1)

export const newServiceSchema = z.object({
    name : z.string().min(1, "Service name needs to be provided").max(120),
    category: z.string().nonempty(),
    price: z.string().nonempty("Provide value"),
    description: z.string().max(400),
    durationType: z.string().nonempty("Provide value"),
    from: z.number(),
    to:  z.number(),
    duration: z.number(),
})