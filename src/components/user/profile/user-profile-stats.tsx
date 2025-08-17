'use client'

import UserProfileContainerWrapper from "./user-profile-container-wrapper"

type UserProfileStatsProps = {
    reservationsData: {
        charge: number
    }[]
}

export default function UserProfileStats({reservationsData}: UserProfileStatsProps){
    const userVisits = reservationsData.length
    const userSpendings = reservationsData.reduce((sum, i) => sum += i.charge, 0)
    return (
        <UserProfileContainerWrapper>
             <div className="w-full flex flex-col gap-3 px-2">
                <div className="w-full flex flex-row justify-between items-start text-middle text-[#191919]">
                    <p className="w-full">Umówionych wizyt</p>
                    <p className="w-full text-3xl font-light text-right">{userVisits}</p>
                </div>

                <hr className="w-full border-[0.5px] text-[#D4D4D4]"></hr>

                <div className="w-full flex flex-row justify-between items-start text-middle text-[#191919]">
                    <p className="w-full">Wydano na wizyty</p>
                    <p className="w-full text-3xl font-light text-right">{userSpendings} PLN</p>
                </div>
            </div>
        </UserProfileContainerWrapper>
    )
}