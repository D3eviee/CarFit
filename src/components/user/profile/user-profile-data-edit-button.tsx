'use client'
import UserProfileDataEditModal from "@/components/modals/user-profile-data-edit-modal"
import { useModalStore } from "@/lib/store"

type UserProfileHeaderEditButtonProps = {
    userData: {
        id: string
        phone: string
        email: string,
        image: string,
        name: string,                
    }
}

export default function UserProfileDataEditButton({userData}: UserProfileHeaderEditButtonProps){
    const openModal = useModalStore(store => store.openModal)
    const handleOpeningEdit = () => openModal( 
        <UserProfileDataEditModal name={userData.name} phone={userData.phone} email={userData.email}/>
    )

    return (
        <div 
            onClick={handleOpeningEdit}
            className="w-fit text-center text-sm px-4 py-2 rounded-2xl bg-linear-to-b  from-[#313131] to-[#141414] shadow-md text-[#F2F2F7] hover:cursor-pointer hover:bg-[#333333]"
        >
            Edytuj profil
        </div>
    )
}