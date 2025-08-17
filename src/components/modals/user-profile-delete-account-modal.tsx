'use client'
import { deleteClientAccount } from "@/app/user/profile/actions";
import { useModalStore, useToastStore } from "@/lib/store";
import { useRouter } from "next/navigation";

export default function UserProfileDeleteAccountModal(){
  const router = useRouter()
  const closeModal = useModalStore(store => store.closeModal)
  const showToast = useToastStore(store => store.showToast)

  const handleDeletingAccount = async () => {
    const result = await deleteClientAccount()
    if(!result.success){
      showToast(result.message, "error")
      return null
    }

    closeModal()
    router.push("/")
    showToast(result.message, "success")
  }

  return(
   <div className="flex flex-col px-3 pt-6 pb-3 bg-white backdrop-blur-[3px] ring-1 ring-white inset-shadow-white rounded-2xl max-w-[300px] text-black space-y-5">
        <p className="px-1 text-[#191919] text-middle text-pretty text-left font-normal tracking-tighter">Czy na pewno usunąć konto? Czynność ta jest nieodwracalna</p>
      
      {/* CONTENT */}
      <div className="w-full flex flex-row gap-2.5">
        <div 
          onClick={closeModal}
          className="w-full text-center justify-center py-2 bg-[#F2F2F7] backdrop-blur-sm text-[#0C0C0C] rounded-3xl shadow-bnw-y-small shadow-inner-glass  hover:cursor-pointer hover:bg-[#E1E1E6] active:scale-105"
        >
          Anuluj
        </div>
        
        <div 
          onClick={handleDeletingAccount}
          className="w-full text-center justify-center py-2 bg-[#FF453A] backdrop- text-white rounded-3xl shadow-inner-glass hover:cursor-pointer hover:bg-[#333] active:scale-105"
        >
          Usuń
        </div>
      </div>
    </div>
  )
}

    