'use client'
import { logout } from "@/lib/auth"
import { useMobileNavigationStore, useModalStore, useToastStore } from "@/lib/store"
import { useRouter } from "next/navigation"

export const LogoutModal = () => {
    const router = useRouter()
    const showToast = useToastStore(store => store.showToast)
    const closeModal = useModalStore(store => store.closeModal)
    const closeMenu = useMobileNavigationStore(store => store.closeMenu)

    const handleLogout = async () => {
        await logout()
        router.push('/')
        closeModal()
        closeMenu()
        showToast("Wylogowano", "success")
    }
    
    return (
        <div className="w-fit flex flex-col gap-5 px-8 pt-5 pb-3 bg-white rounded-2xl">
            <p className="text-sm text-[#363638] text-center leading-4">Czy napewno chcesz zostać wylogowanym?</p>
            <div className="w-full flex flex-row justify-end gap-3">
                <button 
                    onClick={closeModal}  
                    className="w-full py-2 bg-[#F2F2F7] text-sm text-[#363638] font-normal ring-[0.5px] ring-[#D4D4D4] rounded-xl hover:cursor-pointer inset-shadow-glass active:scale-95"
                >
                    Anuluj
                </button>
                <button  
                    onClick={handleLogout} 
                    className="w-full py-2 bg-[#FF5F58] text-sm text-white font-medium ring-[0.5px] ring-[#EE4E47] rounded-xl  hover:cursor-pointer inset-shadow-glass active:scale-95"
                >
                    Wyloguj
                </button> 
            </div>
        </div>
  )
}