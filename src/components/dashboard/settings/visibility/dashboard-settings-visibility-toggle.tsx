'use client'
import { toggleBusinessPublicStatus } from "@/app/dashboard/settings/actions"
import { useToastStore } from "@/lib/store"
import { useMutation, useQueryClient } from "@tanstack/react-query"

type DashboardSettingsVisibilityToggle = {
    isPublic: boolean
    isDisabled: boolean 
}

export const DashboardSettingsVisibilityToggle = ({isDisabled, isPublic}:DashboardSettingsVisibilityToggle) => {
    const queryClient = useQueryClient()
    const showToast = useToastStore(store => store.showToast) 
    
    const { mutate: toggleVisibility, isPending } = useMutation({
        mutationKey: ["toggleBusinessVisibility"],
        mutationFn: async (currentPublicState: boolean) => {
            const result = await toggleBusinessPublicStatus(currentPublicState)
            if (!result.success) {
            showToast(result.message, "error")
            return
        }
        if(!result.isPublic) showToast("Twój biznes nie jest juź publiczny", "info")
        if(result.isPublic)showToast("Twój biznes został upubliczniony", "success")
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["getDataForPublicityCheck"] })}
  })

  const handleToggle = () => toggleVisibility(isPublic)

  return (
    <label className="relative cursor-pointer inline-block h-6.5">
        <input 
            type="checkbox" 
            className="sr-only" 
            checked={isPublic} 
            disabled={isDisabled || isPending}
            onChange={handleToggle}
        />
        <div
            className={`w-14 h-6 rounded-full transition-colors duration-300 ${
            isPublic ? "bg-[#31D158]" : "bg-gray-300"
            }`}
        />
        <div
        className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
            isPublic ? "translate-x-8" : ""
        }`}
        />
    </label>
  )
}