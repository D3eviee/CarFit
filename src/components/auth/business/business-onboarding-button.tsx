import { Spinner } from "@/components/spinner"
import { cn } from "@/utils"
import { ButtonHTMLAttributes } from "react"

interface BusinessOnboardingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    label: string
}

export const BusinessOnboardingButton = ({label, disabled, className, onClick }: BusinessOnboardingButtonProps) => {
    return (
        <button 
            type="submit" 
            disabled={disabled}
            className={cn("w-full flex text-white bg-[#111111] py-2 justify-center items-center rounded-[7px] font-medium text-sm", className)}
            onClick={onClick}
        >
            {disabled ? <Spinner/> : `${label}`}
        </button>
    )
}