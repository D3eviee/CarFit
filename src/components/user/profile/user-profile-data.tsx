'use client'
import UserProfileContainerWrapper from "./user-profile-container-wrapper"
import UserProfileHeaderEditButton from "./user-profile-data-edit-button"

type UserProfileDataProps = {
    userData: {
        id: string
        phone: string
        email: string,
        image: string,
        name: string,                
    }
}

export default function UserProfileData({userData}:UserProfileDataProps){
    return (
       <UserProfileContainerWrapper>
            <div className="w-full flex flex-col gap-3">
                <div className="w-full flex justify-end">
                    <UserProfileHeaderEditButton userData={userData}/> 
                </div>
                <div className="w-full flex flex-col gap-2 px-2">
                    <div className="w-full flex flex-col gap-0.5 text-middle text-[#111]">
                        <p className="font-semibold">Imię i nazwisko</p>
                        <p className="font-base">{userData.name}</p>
                    </div>
                    <hr className="w-full border-[0.5px] text-[#D4D4D4]"></hr>
                    <div className="w-full flex flex-col gap-0.5 text-middle text-[#111]">
                        <p className="font-semibold">Email</p>
                        <p className="font-base">{userData.email}</p>
                    </div>
                    <hr className="w-full border-[0.5px] text-[#D4D4D4]"></hr>
                    <div className="w-full flex flex-col gap-0.5 text-middle text-[#111">
                        <p className="font-semibold">Telefon</p>
                        <p className="font-base">+48 {userData.phone}</p>
                    </div>
                </div>
            </div>  
        </UserProfileContainerWrapper>
  )
}