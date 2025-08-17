'use client'
import { useMobileNavigationStore } from "@/lib/store";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

type DashboardMobileNavbarMenuItemProps = {
    label: string
    path: string
}

export default function DashboardMobileNavbarMenuItem({label, path}:DashboardMobileNavbarMenuItemProps) {
    const router = useRouter()
    const closeMenu = useMobileNavigationStore(store => store.closeMenu)

    const handleClick = async () => {
        router.push(path)     
        closeMenu()          
    }

    return (
        <button
            onClick={handleClick}
            className="w-full flex flex-row justify-between px-3 py-4.5 rounded-xl hover:cursor-pointer hover:bg-[#F2F2F7] active:scale-[0.98] active:bg-[#F2F2F7]"
        >
            <p className="text-md text-[#191919] font-medium">{label}</p>
            <ChevronRight strokeWidth={1.5} color="#191919"/>
        </button>
    )
}

