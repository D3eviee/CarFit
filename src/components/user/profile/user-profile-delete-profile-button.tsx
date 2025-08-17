'use client'
import UserProfileDeleteAccountModal from "@/components/modals/user-profile-delete-account-modal"
import { useModalStore } from "@/lib/store"

export default function UserProfileDeleteProfileButton(){
    const openModal = useModalStore(store => store.openModal)
    const handleOpeningDeleteModal = () => openModal(<UserProfileDeleteAccountModal/>)

    return (
        <div 
            onClick={handleOpeningDeleteModal}
            className="mt-4 w-fit px-3 py-1 mx-auto rounded-2xl text-[#FF453A] text-middle hover:cursor-pointer hover:text-[#EE564B] active:bg-[#F2F2F7] active:scale-105"
        >
            Usuń konto
        </div>
    )
}